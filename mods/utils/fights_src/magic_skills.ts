import * as readline from 'readline-sync';
import * as fs from 'fs';
import combatInterface from './combatInterface';
import basic_caracteristics from './basic_caracteristics';
import basic_characteristics_2 from './basic_characteristics_2';
import * as interfaces from '../interfaces';
import * as customize from './basic_game_customization';
import * as figlet from 'figlet';
import getBoss from './generateBoss';
import getEnemy from './generateEnemies';
import getRandomInt from './randomInt';
import secretRoom from './random_game_events';

function magicskills (player: interfaces.players, ennemie: interfaces.enemies, maxHP: number, maxMP: number) {
    let result: number[] = [];
    console.log();
    console.log(`    ${player.name} is using his magic power... `);
    console.log();
    console.log('    [H] Cheat Heal         [R] Cheat Restore');
    console.log('    [F] Cheat Fireball     [S] Secret Spell');
    console.log();
    let question = readline.question('  => ');
    if (question.toLowerCase() === 'h') {
        if (player.mp >= 20) {
        if (player.hp <= (maxHP - 100)) {
            player.hp += 100;
            player.mp -= 20;
        } else {
            player.hp = maxHP;
            player.mp -= 20;
        }
    }
    }
    if (question.toLowerCase() === 'r') {
        if (player.mp <= (maxMP - 100)) {
            player.mp += 100;
        } else {
            player.mp = maxMP;
        }
    }
    if (question.toLowerCase() === 'f') {
        if (player.mp >= 20) {
            if (ennemie.hp >= 200) {
                ennemie.hp -= 200 - (200 *(ennemie.res/100));
                player.mp -= 20;
        } else {
            ennemie.hp = 0;
        }
    }
    
    }
}
export default {magicskills}