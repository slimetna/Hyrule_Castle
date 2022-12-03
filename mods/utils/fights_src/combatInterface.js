"use strict";
exports.__esModule = true;
function combatInterface(round, player, playerHP, playerMP, enemie, playerMaxHp, playerMaxMP, enemieMaxHp) {
    console.log("--------------------==[Fight ".concat(round, "]==--------------------"));
    console.log("You encounter a ".concat(enemie.name, "."));
    console.log();
    console.log('\x1B[31m', enemie.name);
    console.log('\x1B[37m', "".concat(getBarInterface(enemieMaxHp, enemie.hp), " ").concat(enemie.hp, "/").concat(enemieMaxHp));
    console.log();
    console.log('\x1B[34m', player.name);
    console.log('\x1B[37m', "".concat(getBarInterface(playerMaxHp, playerHP), " ").concat(playerHP, "/").concat(playerMaxHp));
    console.log();
}
function getBarInterface(healthBar, healthPlayer) {
    var healthOne = "█";
    var healtZero = "-";
    var healthLife = "";
    var barLength = 30;
    var healthMax = healthBar;
    var health = healthPlayer;
    var divide = healthMax / barLength;
    var healthMaxDivide = Math.round(healthMax / divide);
    var healthDivide = Math.round(health / divide);
    for (var i = 0; i < barLength; i += 1) {
        if (i >= healthDivide) {
            healthLife += healtZero;
        }
        else {
            healthLife += healthOne;
        }
    }
    if (healthDivide > 2 / 3 * healthMaxDivide) {
        healthLife = "\u001B[32m".concat(healthLife, "\u001B[37m");
    }
    else if (healthDivide < 1 / 3 * healthMaxDivide) {
        healthLife = "\u001B[31m".concat(healthLife, "\u001B[37m");
    }
    else {
        healthLife = "\u001B[33m".concat(healthLife, "\u001B[37m");
    }
    return "[" + healthLife + "]";
}
exports["default"] = {
    getBarInterface: getBarInterface,
    combatInterface: combatInterface
};
