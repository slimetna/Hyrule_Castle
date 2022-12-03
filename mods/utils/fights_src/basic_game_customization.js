"use strict";
exports.__esModule = true;
function difficultyChanger(enemie, difficulty) {
    if (difficulty === 2) {
        enemie.hp *= 1.5;
        enemie.mp *= 1.5;
        enemie.str *= 1.5;
        enemie.int *= 1.5;
        enemie.def *= 1.5;
        enemie.res *= 1.5;
        enemie.spd *= 1.5;
        enemie.luck *= 1.5;
        return enemie;
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
exports["default"] = { difficultyChanger: difficultyChanger };
