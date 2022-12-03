import * as interfaces from '../../../base/utils/interfaces';
import * as readline from 'readline-sync';
const fs = require('fs');

function specialMovePlayer (player: interfaces.players, usedOrNot: boolean) {
    if (usedOrNot === true) {
        console.log(` You can't use your spcial move now, wait until the next fight !`);
        return false;
    }
    const data: any = fs.readFileSync('./json/classes.json', 'utf8');
    const contentJson = JSON.parse(data);
    console.log(` ${player.name} is using his special move ! ${player.name}'s body is surrounded by ${contentJson[player.class].alignment} aura ! `);
    return true;
}

export default {specialMovePlayer};
