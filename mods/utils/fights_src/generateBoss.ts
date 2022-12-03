import * as fs from 'fs';
import * as interfaces from '../interfaces';
import getRandomInt from './randomInt';

export default function getBoss(): interfaces.bosses {
    let random = getRandomInt.getRandomInt(99);
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
return contentJson[6];
}