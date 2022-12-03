import * as fs from 'fs';
import * as interfaces from '../interfaces';
import getRandomInt from './randomInt';

export default function getEnemy(): interfaces.enemies {
    const data: any = fs.readFileSync('./json/enemies.json', 'utf8');
    const contentJson = JSON.parse(data);
    const random = getRandomInt.getRandomInt(99);
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
return contentJson[6];
}