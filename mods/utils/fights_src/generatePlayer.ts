import * as fs from 'fs';
import getRandomInt from './randomInt';
import basic_caracteristics from '../basic_caracteristics';
import character_creation from './character_creation';
import * as rl from 'readline-sync';

export default function getHeros(callback) {
    const data: any = fs.readFileSync('./json/players.json', 'utf8');

    console.log('Do you want play with your own custom character ? [y/n]');
    const answer: string = rl.question('\x1B[36m=> \x1B[37m');

    switch(answer) {
        case 'y':
            callback(character_creation.createCustomCharacter());
            break;
        case 'n':
            const contentJson = JSON.parse(data);
            let random = getRandomInt.getRandomInt(99);
            if (random === 0) {
                callback(contentJson[4]);
            }
            if (random > 0 && random <= 50) {
                callback(contentJson[0]);
            }
            if (random > 50 && random <= 80) {
                callback(contentJson[1]);
            }
            if (random > 80 && random <= 95) {
                callback(contentJson[2]);
            }
            if (random > 95 && random <= 98) {
                callback(contentJson[3]);
            }
            break;
        default: 
            console.log('You cannot do that.')
    }

}