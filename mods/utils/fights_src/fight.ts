import * as readline from 'readline-sync';
import * as fs from 'fs';
import combatInterface from './combatInterface';
import basic_caracteristics from './basic_caracteristics';
import basic_characteristics_2 from './basic_characteristics_2';
import * as interfaces from '../interfaces';
import * as customize from './basic_game_customization'
import getBoss from './generateBoss';
import getEnemy from './generateEnemies';
import getRandomInt from './randomInt';
import magic_skills from './magic_skills';
import inventory from './inventory';

let playerHP: number = 0;
let playerMP: number = 0;
let leaderboard: boolean = true;
let xp: number = 0;
let alreadyEscaped: boolean = false;
export function main(players: interfaces.players, difficulty: number, floor: number, name: string, callback) {
    
    if(name === "0") {
        leaderboard = false;
    };

    let heros = players;
    playerHP = players.hp;
    for (let i = 0; i < floor; i += 1) {
        console.clear();
        if (i != 0) {
        let randomItem = getRandomInt.getRandomInt(99);
        if (randomItem >= 0 && randomItem < 50) {
            (heros.inventory).push("Low-level Potion");
        }
        if (randomItem >= 50 && randomItem < 80) {
            (heros.inventory).push("Potion");
        }
        if (randomItem >= 80 && randomItem < 95) {
            (heros.inventory).push("High-level Potion");
        }
        if (randomItem >= 95) {
            (heros.inventory).push("Holy Potion");
        }
        heros.money += 1;
        heros.xp += Math.floor(getRandomInt.getRandomArbitrary(15, 50));

        if(leaderboard) {
            let lb: any = fs.readFileSync('./json/leaderboard.json', 'utf-8');
            lb = JSON.parse(lb);

            xp += heros.xp;

            if(!lb.find((x: interfaces.leaderboard) => x && x.name === name)) {
                lb.push({
                    name: name,
                    score: xp,
                    id: "0"
                })
            }

            let newArr: any = lb.map((x: interfaces.leaderboard) => {
                if(x && x.name === name) {
                    return {...x, score: xp}
                }

                return x;
            });
            newArr = JSON.stringify(newArr);
            fs.writeFileSync('./json/leaderboard.json', newArr);
        }
        
        if (heros.xp >= heros.nextlvl) {
                heros.hp += 5;
                heros.lvl += 1
                heros.mp += 3;
                heros.str += 2;
                heros.def += 3;
                heros.res += 3;
                heros.spd += 2;
                heros.int += 1;
                heros.luck += 1;
                heros.xp -= Math.round(heros.nextlvl);
                heros.nextlvl *= Math.round(1.25);
            }
        }
        let enemie = customize.default.difficultyChanger(getEnemy(), difficulty);
        let boss = getBoss();
        if((i+1) % 10 === 0 && i != 0) {
            let result = launch(heros, boss, i+1);
            if (result === 0) {
                console.log(` ${boss.name} beat you... Try again to save the princess !`);
                return;
            }
        } else {
            let result = launch(heros, enemie, i+1);
            if (result === 0) {
                console.log(` A ${enemie.name} beat you... Try again to save the princess !`);
                return;
            }
        }
        
    }   
    callback();
}

export function launch(players: interfaces.players, enemies: interfaces.enemies, number: Number) {
    let attackModifier = 1;
    let usedOrNot: boolean = false;
    const playersMaxHP: number = players.hp;
    const playersMaxMP: number = players.mp;
    const enemieMaxHP = enemies.hp
    let lastQuestion = '';
    while (playerHP > 0 && enemies.hp > 0) {
        if (lastQuestion.toLowerCase() === 'c') {
            basic_caracteristics.displayCaracteristics(players);
        } else {
            combatInterface.combatInterface(number, players, playerHP, playerMP, enemies, playersMaxHP, playersMaxMP, enemieMaxHP);
        }
        console.log('\x1B[35m', '       What do you want to do ?\x1B[37m')
        console.log();
        console.log('    [A] Attack         [S] Special');
        console.log('    [M] Magic          [P] Protect')
        console.log('    [E] Escape         [C] Caracteristics');
        console.log('            [I] Inventory');
        console.log();
        
        let question = readline.question('  => ');
        if (question.toLowerCase() === 'i') {
            inventory.displayInventory(players);
        let inventoryQuestion = readline.question(' Do you want to use an item ? [y/n]');
        if (inventoryQuestion === 'y') {
            inventory.useItems(players);
            playerHP = players.hp;
        }
        }
        if (question.toLowerCase() === 'e') {
            if (alreadyEscaped === true) {
                return 0;
            } else {
                alreadyEscaped = true;
                return 1;
            }

        }
        if (question.toLowerCase() === 'm') {
            let result = magic_skills.magicskills(players, enemies, playersMaxHP, playersMaxMP);
            playerHP = players.hp;
            playerMP = players.mp;
            if (enemies.hp <= 0) {
                console.log(` ${enemies.name} died.`)
                return 1;
            }
        }   
        if (question.toLowerCase() === 's') {
            if (basic_characteristics_2.specialMovePlayer(players, usedOrNot) === true) {
                usedOrNot = true;
                attackModifier *= 2
                question = 'a';
            }
        }            if (question.toLowerCase() === 'a') {
                attackModifier = basic_caracteristics.strongAgainst(players, enemies);
                if (attackModifier > 1) {
                    console.log(' You hit him with a Crushing hit !');
                }
                if (attackModifier < 1) {
                    console.log(' You hit him with a Glancing hit...');
                }
                enemies.hp -= players.str*basic_caracteristics.strongAgainst(players, enemies);
                if (enemies.hp <= 0) {
                    return 1;
                }
            }
                if (question.toLowerCase() === 'a' || question.toLowerCase() === 'h') {
                attackModifier = basic_caracteristics.strongAgainstEnnemie(enemies, players);
                if (attackModifier > 1) {
                    console.log(' He hit you with a Crushing hit... Be careful !')
                }
                if (attackModifier < 1) {
                    console.log('He hit you with a Glancing hit !')
                }
                playerHP -= enemies.str * attackModifier;
                if (playerHP <= 0) {
                    console.log(' Oh no ! You just died...');
                    return 0;
                }
                console.log(` ${players.name} lost ${enemies.str}hp !`);
                }
                if (question.toLowerCase() === 'p') {
                    playerHP -= ((enemies.str * attackModifier)*(players.def/100))/2;
                }
                lastQuestion = question;
        }
}

export default {
    main,
    launch
}



