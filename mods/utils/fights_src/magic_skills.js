"use strict";
exports.__esModule = true;
var readline = require("readline-sync");
function magicskills(player, ennemie, maxHP, maxMP) {
    var result = [];
    console.log();
    console.log("    ".concat(player.name, " is using his magic power... "));
    console.log();
    console.log('    [H] Cheat Heal         [R] Cheat Restore');
    console.log('    [F] Cheat Fireball     [S] Secret Spell');
    console.log();
    var question = readline.question('  => ');
    if (question.toLowerCase() === 'h') {
        if (player.mp >= 20) {
            if (player.hp <= (maxHP - 100)) {
                player.hp += 100;
                player.mp -= 20;
            }
            else {
                player.hp = maxHP;
                player.mp -= 20;
            }
        }
    }
    if (question.toLowerCase() === 'r') {
        if (player.mp <= (maxMP - 100)) {
            player.mp += 100;
        }
        else {
            player.mp = maxMP;
        }
    }
    if (question.toLowerCase() === 'f') {
        if (player.mp >= 20) {
            if (ennemie.hp >= 200) {
                ennemie.hp -= 200 - (200 * (ennemie.res / 100));
                player.mp -= 20;
            }
            else {
                ennemie.hp = 0;
            }
        }
    }
}
exports["default"] = { magicskills: magicskills };
