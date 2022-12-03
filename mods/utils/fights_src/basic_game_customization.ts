import * as readline from 'readline-sync';
import combatInterface from './combatInterface';
import basic_caracteristics from './basic_caracteristics';
import basic_characteristics_2 from './basic_characteristics_2';
import character_creation from './character_creation';
import * as interfaces from '../interfaces';
import * as figlet from 'figlet';
import getBoss from './generateBoss';
import getEnemy from './generateEnemies';
import getRandomInt from './randomInt';

function difficultyChanger (enemie: interfaces.enemies, difficulty: number): interfaces.enemies {
    if (difficulty === 2) {
        enemie.hp *= 1.5;
        enemie.mp *= 1.5;
        enemie.str *= 1.5;
        enemie.int *= 1.5;
        enemie.def *= 1.5;
        enemie.res *= 1.5;
        enemie.spd *= 1.5;
        enemie.luck *= 1.5;
        return enemie
    }
    if (difficulty === 3) {
            enemie.hp *= 2;
            enemie.mp *= 2;
            enemie.str *= 2;
            enemie.int *= 2;
            enemie.def *= 2;
            enemie.res *= 2;
            enemie.spd *= 2;
            enemie.luck *= 2;
            return enemie;
        }
        return enemie;
}

export default {difficultyChanger};