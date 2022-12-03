import * as readline from 'readline-sync';
import * as interfaces from '../interfaces';
import randomInt from './randomInt';
const fs = require('fs');

function secretRoom (player: interfaces.players, callback) {
    console.clear();
    const data = fs.readFileSync('./json/question.json', 'utf8');
    const contentJson = JSON.parse(data);
    let randomFind = randomInt.getRandomInt(99);
    if (randomFind >= 0 && randomFind < 35) {
        console.log(' You discovered a secret room ! ');
        const question = readline.question( ' Do you want to search into the room ? [y/n] ');
        if (question === 'y') {
            let randomType = randomInt.getRandomInt(99);
            if (randomType >= 0 && randomType < 100) {
                console.log(' That was a trap room ! Answer to the question to escape without losing HP. ');
                let index = randomInt.getRandomInt(contentJson.length);
                const questionToLeave = readline.question(` ${contentJson[index].question} `);
                if (questionToLeave === 'y' && contentJson[index].answer === false) {
                    console.log(' Wrong answer ! You lost some HP... ');
                    player.hp -= (player.hp * randomInt.getRandomArbitrary(0.05, 0.15));
                } else {
                    console.log( ' Good answer ! You left the room without losing HP. ');
                }
            } else {
                console.log(' You found a treasure room ! You got 1 coin. ');
                player.money += 1;
            }
        }
        setTimeout(() =>{
            callback();
    
        }, 3000);
    } else {
        callback();
    }

}

export default {secretRoom};