import * as fs from 'fs';
import * as readline from 'readline-sync';
import combatInterface from './combatInterface';
import basic_caracteristics from '../../mods/utils/basic_caracteristics';
import * as interfaces from './interfaces';

export default function main () {
    fs.readFile('./json/players.json', 'utf8', (err, data) => {
        fs.readFile('./json/enemies.json', 'utf8', (err, data2) => {
            fs.readFile('./json/bosses.json', 'utf8', (err, data3) => {
        const contentJson = JSON.parse(data);
        const contentJson2 = JSON.parse(data2);
        const contentJson3 = JSON.parse(data3);
        let bossStock: interfaces.bosses = getBosses(contentJson3[0]);
        let herosStock: interfaces.players = getHeros(contentJson[0]);
        for (let i = 0; i < 10; i += 1) {
        let enemieStock: interfaces.enemies = getEnemies(contentJson2[0]);
        let heros = Object.assign({},herosStock);
        let enemie = Object.assign({},enemieStock);
        let boss = Object.assign({},bossStock);
        if (i <= 8) {
            let result = fight(heros, enemie, i+1);
            if (result === 0) {
                return;
            }
        } 
        if(i > 8) {
            let result = fight (heros, boss, i+1);
            if (result === 0) {
                console.log(` ${boss.name} beat you... Try again to save the princess !`);
                return;
            }
            console.log(' You saved the princess !')
        }
    }   
            });
        });
    });
}

function fight (players: interfaces.players, enemies: interfaces.enemies, number: Number) {
    let attackModifier = 1;
    const playersMaxHP = players.hp;
    const enemieMaxHP = enemies.hp
    let lastQuestion = '';
    while (players.hp > 0 && enemies.hp > 0) {
        if (lastQuestion.toLowerCase() === 'c') {
            basic_caracteristics.displayCaracteristics(players);
        }
        console.log(`--------------------==[Fight ${number}]==--------------------`);
        console.log();
        console.log(`You encounter a ${enemies.name}.`);
        console.log();
        console.log('\x1B[31m', enemies.name);
        console.log('\x1B[37m', `${combatInterface.getBarInterface(enemieMaxHP, enemies.hp)} ${enemies.hp}/${enemieMaxHP}`);
        console.log();
        console.log('\x1B[34m', players.name);
        console.log('\x1B[37m', `${combatInterface.getBarInterface(playersMaxHP, players.hp)} ${players.hp}/${playersMaxHP}`);
        console.log();
        console.log('\x1B[35m', 'What do you want to do ?\x1B[37m')
        let question = readline.question(' Attack or Heal ? [A/H]\n =>');
            if (question.toLowerCase() === 'a') {
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
            if (question.toLowerCase() === 'h') {
                players.hp += playersMaxHP/2
                if (players.hp > 60) {
                    players.hp = 60;
                }
            }
                if (question.toLowerCase() === 'a' || question.toLowerCase() === 'h') {
                attackModifier = basic_caracteristics.strongAgainst(enemies, players);
                if (attackModifier > 1) {
                    console.log(' He hit you with a Crushing hit... Be careful !')
                }
                if (attackModifier < 1) {
                    console.log('He hit you with a Glancing hit !')
                }
                players.hp -= enemies.str * attackModifier;
                if (players.hp <= 0) {
                    console.log(' Oh no ! You just died...');
                    return 0;
                }
                console.log(` ${players.name} lost ${enemies.str}hp !`);
                }
                lastQuestion = question;
            }
    }

        let getHeros = function (heros: interfaces.players): interfaces.players {
        const data: any = fs.readFileSync('./json/players.json', 'utf8');
        const contentJson = JSON.parse(data);
        let random = getRandomInt(99);
        if (random === 0) {
            return contentJson[4];
        }
        if (random > 0 && random <= 50) {
            return contentJson[0];
        }
        if (random > 50 && random <= 80) {
            return contentJson[1];
        }
        if (random > 80 && random <= 95) {
            return contentJson[2];
        }
        if (random > 95 && random <= 98) {
            return contentJson[3];
        }
    return heros;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let getEnemies = function (enemie: interfaces.players): interfaces.enemies {
    const data: any = fs.readFileSync('./json/enemies.json', 'utf8');
    const contentJson = JSON.parse(data);
    const random = getRandomInt(99);
    if (random === 0) {
        return contentJson[4];
    }
    if (random > 0 && random <= 50) {
        return contentJson[6];
    }
    if (random > 50 && random <= 80) {
        return contentJson[5];
    }
    if (random > 80 && random <= 95) {
        return contentJson[0];
    }
    if (random > 95 && random <= 98) {
        return contentJson[2];
    }
return enemie;
}

let getBosses = function (boss: interfaces.bosses): interfaces.bosses {
    let random = getRandomInt(99);
    const data: any = fs.readFileSync('./json/bosses.json', 'utf8');
        const contentJson = JSON.parse(data);
        if (random === 0) {
            return contentJson[5];
        }
        if (random > 0 && random <= 50) {
            return contentJson[6];
        }
        if (random > 50 && random <= 80) {
            return contentJson[0];
        }
        if (random > 80 && random <= 95) {
            return contentJson[3];
        }
        if (random > 95 && random <= 98) {
            return contentJson[2];
        }
    return boss;
}

