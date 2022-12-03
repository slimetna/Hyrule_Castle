import * as rl from 'readline-sync';
import game from '../game';

export default function selectDifficulty(name: string) {
    let answer: number = 0;
    let answer2: number = 0;

    if(name === "0") {
        console.clear();
        console.log();
        console.log('\x1B[1mSelect difficulty\x1B[0m')
        console.log();
        console.log('[1] Normal.');
        console.log('[2] Hard.');
        console.log('[3] Insane.');
        console.log();

        answer = rl.question("\x1B[36m=> \x1B[37m");

        console.clear();
        console.log();
        console.log('\x1B[1mSelect number of floor\x1B[0m')
        console.log();
        console.log('[1] 10.');
        console.log('[2] 20.');
        console.log('[3] 50.');
        console.log('[4] 100.');
        console.log();

        answer2 = rl.question("\x1B[36m=> \x1B[37m");
    } else {
        answer = 2;
        answer2 = 999999999;
    }

    if (+answer2 === 1) {
        game(+answer, 10, name);
    }
    if (+answer2 === 2) {
        game(+answer, 20, name);
    }
    if (+answer2 === 3) {
        game(+answer, 50, name);
    }
    if (+answer2 === 4) {
        game(+answer, 100, name);
    }

    if (+answer2 === 999999999) {
        game(+answer, 999999999, name);
    }
}