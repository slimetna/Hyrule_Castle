import * as interfaces from './interfaces';
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
    console.log(`MONEY: ${player.money}`);
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

    function createCustomCharacter () : interfaces.players {
        let custom: interfaces.players = {
            id: 0,
            name: "",
            lvl: 1,
            xp: 0,
            nextlvl: 60,
            money: 12,
            hp: 0,
            mp: 0,
            str: 0,
            int: 0,
            def: 0,
            res: 0,
            spd: 0,
            luck: 0,
            race: 0,
            class: 0,
            rarity: 0,
            inventory: [],
            }
        const data: any = fs.readFileSync('./json/classes.json', 'utf8');
        const data2: any = fs.readFileSync('./json/races.json', 'utf8');
        const classes = JSON.parse(data);
        const races = JSON.parse(data2);
        let maximumPoint = 120;
        let nameQuestion = readline.question(' What is your name ? ');
        custom.name = nameQuestion;
        for (let i = 0; i < classes.length; i += 1) {
            console.log(`${i+1} - ${classes[i].name}`);
        }
        let classQuestion = readline.question(' Which class do you want ?\n');
        while (classQuestion < 1 || classQuestion > classes.length || isNaN(+classQuestion)) {
        classQuestion = readline.question(' Wrong input ! Which class do you want ?\n ');
        }
        custom.class = classQuestion;
        for (let i = 0; i < races.length; i += 1) {
            console.log(`${i+1} - ${races[i].name}`);
        }
        let raceQuestion = readline.question(' Which race do you want ?\n');
        while (raceQuestion < 1 || raceQuestion > races.length || isNaN(+raceQuestion)) {
        raceQuestion = readline.question(' Wrong input ! Which race do you want ?\n ');
        }
        custom.race = raceQuestion;
        let hpQuestion = readline.question(` How many points do you want to put in HP ? You have ${maximumPoint} points left.\n`);
        if (hpQuestion < 0) {
            custom.hp = 0;
        }
        if (hpQuestion > maximumPoint || isNaN(+hpQuestion)) {
            custom.hp = 0;
        } else {
        maximumPoint -= hpQuestion;
        custom.hp = hpQuestion;
        }
        let mpQuestion = readline.question(` How many points do you want to put in MP ? You have ${maximumPoint} points left.\n`);
        if (mpQuestion < 0) {
            custom.mp = 0;
        }
        if (mpQuestion > maximumPoint || isNaN(+mpQuestion)) {
            custom.mp = 0;
        } else {
        maximumPoint -= mpQuestion;
        custom.mp = mpQuestion;
        }
        let strQuestion = readline.question(` How many points do you want to put in STR ? You have ${maximumPoint} points left.\n`);
        if (strQuestion < 0) {
            custom.str = 0;
        } if (strQuestion > maximumPoint || isNaN(+strQuestion)) {
            custom.str = 0;
        } else {
        maximumPoint -= strQuestion;
        custom.str = strQuestion;
        }
        let intQuestion = readline.question(` How many points do you want to put in INT ? You have ${maximumPoint} points left.\n`);
        if (intQuestion < 0) {
            custom.int = 0;
        }if (intQuestion > maximumPoint || isNaN(+intQuestion)) {
            custom.int = 0;
        } else {
        maximumPoint -= intQuestion;
        custom.int = intQuestion;
        }
        let defQuestion = readline.question(` How many points do you want to put in DEF ? You have ${maximumPoint} points left.\n`);
        if (defQuestion < 0) {
            custom.def = 0;
        }if (defQuestion > maximumPoint || isNaN(+defQuestion)) {
            custom.def = 0;
        } else {
        maximumPoint -= defQuestion;
        custom.def = defQuestion;
        }
        let resQuestion = readline.question(` How many points do you want to put in RES ? You have ${maximumPoint} points left.\n`);
        if (resQuestion < 0) {
            custom.res = 0;
        }if (resQuestion > maximumPoint || isNaN(+resQuestion)) {
            custom.res = 0;
        } else {
        maximumPoint -= resQuestion;
        custom.res = resQuestion;
        }
        let spdQuestion = readline.question(` How many points do you want to put in SPD ? You have ${maximumPoint} points left.\n`);
        if (spdQuestion < 0) {
            custom.spd = 0;
        }if (spdQuestion > maximumPoint || isNaN(+spdQuestion)) {
            custom.spd = 0;
        } else {
        maximumPoint -= spdQuestion;
        custom.spd = spdQuestion;
        }
        let luckQuestion = readline.question(` How many points do you want to put in LUCK ? You have ${maximumPoint} points left.\n`);
        if (luckQuestion < 0) {
            custom.luck = 0;
        }if (luckQuestion > maximumPoint || isNaN(+luckQuestion)) {
            custom.luck = 0;
        } else {
        maximumPoint -= luckQuestion;
        custom.luck = luckQuestion;
        }
        displayCaracteristics(custom);
        let confirmQuestion = readline.question(` Do you want to play with this player ? [y/n]\n `);
            while (confirmQuestion !== 'y' && confirmQuestion !== 'n') {
                let confirmQuestion = readline.question(` Wrong input ! Do you want to play with this player ? [y/n]\n `);
            }
        if (confirmQuestion === 'n') {
            createCustomCharacter();
        }
        return custom;
        }

    


export default {displayCaracteristics, strongAgainst, createCustomCharacter};