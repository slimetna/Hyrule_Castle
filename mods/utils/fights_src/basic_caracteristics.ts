import * as interfaces from '../interfaces';
import * as readline from 'readline-sync';
const fs = require('fs');

function displayCaracteristics (player: interfaces.players) {
    const data: any = fs.readFileSync('./json/classes.json', 'utf8');
    const data2: any = fs.readFileSync('./json/races.json', 'utf8');
    const contentJson = JSON.parse(data);
    const contentJson2 = JSON.parse(data2);
    console.log(`NAME: ${player.name}`);
    console.log(`CLASS: ${contentJson[player.class - 1].name}`);
    console.log(`ALIGNMENT: ${contentJson[player.class - 1].alignment}`);
    console.log(`RACE: ${contentJson2[player.race - 1].name}`);
    console.log(`LVL: ${player.lvl}`);
    console.log(`MONEY: ${player.money}`);
    console.log(`XP: ${player.xp}`);
    console.log(`HP: ${player.hp}`);
    console.log(`MP: ${player.mp}`);
    console.log(`STR: ${player.str}`);
    console.log(`INT: ${player.int}`);
    console.log(`DEF: ${player.def}`);
    console.log(`RES: ${player.res}`);
    console.log(`SPD: ${player.spd}`);
}

function strongAgainst (attack: interfaces.players, attacked: interfaces.enemies) {
    let result = 1;
    const data: any = fs.readFileSync('./json/classes.json', 'utf8');
    const data2: any = fs.readFileSync('./json/races.json', 'utf8');
    const contentJson = JSON.parse(data);
    const contentJson2 = JSON.parse(data2);
    let attackRaceIndex = attack.race - 1;
    let attackClassIndex = attack.class - 1;
    if (contentJson[attackClassIndex].strengths.includes(attacked.class)) {
        result *= 2
    }
    if (contentJson[attackClassIndex].weaknesses.includes(attacked.class)) {
        result /= 2;
    }
    if (contentJson2[attackRaceIndex].strength.includes(attacked.race)) {
        result *= 2;
    }
    if (contentJson2[attackRaceIndex].weakness.includes(attacked.race)) {
        result /= 2;
    }
        return result;
    }

    function strongAgainstEnnemie (attack: interfaces.enemies, attacked: interfaces.players) {
        let result = 1;
        const data: any = fs.readFileSync('./json/classes.json', 'utf8');
        const data2: any = fs.readFileSync('./json/races.json', 'utf8');
        const contentJson = JSON.parse(data);
        const contentJson2 = JSON.parse(data2);
        let attackRaceIndex = attack.race - 1;
        let attackClassIndex = attack.class - 1;
        if (contentJson[attackClassIndex].strengths.includes(attacked.class)) {
            result *= 2
        }
        if (contentJson[attackClassIndex].weaknesses.includes(attacked.class)) {
            result /= 2;
        }
        if (contentJson2[attackRaceIndex].strength.includes(attacked.race)) {
            result *= 2;
        }
        if (contentJson2[attackRaceIndex].weakness.includes(attacked.race)) {
            result /= 2;
        }
            return result;
        }

export default {displayCaracteristics, strongAgainst, strongAgainstEnnemie};