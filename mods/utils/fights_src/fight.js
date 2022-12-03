"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.launch = exports.main = void 0;
var readline = require("readline-sync");
var fs = require("fs");
var combatInterface_1 = require("./combatInterface");
var basic_caracteristics_1 = require("./basic_caracteristics");
var basic_characteristics_2_1 = require("./basic_characteristics_2");
var customize = require("./basic_game_customization");
var generateBoss_1 = require("./generateBoss");
var generateEnemies_1 = require("./generateEnemies");
var randomInt_1 = require("./randomInt");
var magic_skills_1 = require("./magic_skills");
var inventory_1 = require("./inventory");
var playerHP = 0;
var playerMP = 0;
var leaderboard = true;
var xp = 0;
var alreadyEscaped = false;
function main(players, difficulty, floor, name, callback) {
    if (name === "0") {
        leaderboard = false;
    }
    ;
    var heros = players;
    playerHP = players.hp;
    for (var i = 0; i < floor; i += 1) {
        console.clear();
        if (i != 0) {
            var randomItem = randomInt_1["default"].getRandomInt(99);
            if (randomItem >= 0 && randomItem < 50) {
                (heros.inventory).push("Low-level Potion");
            }
            if (randomItem >= 50 && randomItem < 80) {
                (heros.inventory).push("Potion");
            }
            if (randomItem >= 80 && randomItem < 95) {
                (heros.inventory).push("High-level Potion");
            }
            if (randomItem >= 95) {
                (heros.inventory).push("Holy Potion");
            }
            heros.money += 1;
            heros.xp += Math.floor(randomInt_1["default"].getRandomArbitrary(15, 50));
            if (leaderboard) {
                var lb = fs.readFileSync('./json/leaderboard.json', 'utf-8');
                lb = JSON.parse(lb);
                xp += heros.xp;
                if (!lb.find(function (x) { return x && x.name === name; })) {
                    lb.push({
                        name: name,
                        score: xp,
                        id: "0"
                    });
                }
                var newArr = lb.map(function (x) {
                    if (x && x.name === name) {
                        return __assign(__assign({}, x), { score: xp });
                    }
                    return x;
                });
                newArr = JSON.stringify(newArr);
                fs.writeFileSync('./json/leaderboard.json', newArr);
            }
            if (heros.xp >= heros.nextlvl) {
                heros.hp += 5;
                heros.lvl += 1;
                heros.mp += 3;
                heros.str += 2;
                heros.def += 3;
                heros.res += 3;
                heros.spd += 2;
                heros.int += 1;
                heros.luck += 1;
                heros.xp -= Math.round(heros.nextlvl);
                heros.nextlvl *= Math.round(1.25);
            }
        }
        var enemie = customize["default"].difficultyChanger((0, generateEnemies_1["default"])(), difficulty);
        var boss = (0, generateBoss_1["default"])();
        if ((i + 1) % 10 === 0 && i != 0) {
            var result = launch(heros, boss, i + 1);
            if (result === 0) {
                console.log(" ".concat(boss.name, " beat you... Try again to save the princess !"));
                return;
            }
        }
        else {
            var result = launch(heros, enemie, i + 1);
            if (result === 0) {
                console.log(" A ".concat(enemie.name, " beat you... Try again to save the princess !"));
                return;
            }
        }
    }
    callback();
}
exports.main = main;
function launch(players, enemies, number) {
    var attackModifier = 1;
    var usedOrNot = false;
    var playersMaxHP = players.hp;
    var playersMaxMP = players.mp;
    var enemieMaxHP = enemies.hp;
    var lastQuestion = '';
    while (playerHP > 0 && enemies.hp > 0) {
        if (lastQuestion.toLowerCase() === 'c') {
            basic_caracteristics_1["default"].displayCaracteristics(players);
        }
        else {
            combatInterface_1["default"].combatInterface(number, players, playerHP, playerMP, enemies, playersMaxHP, playersMaxMP, enemieMaxHP);
        }
        console.log('\x1B[35m', '       What do you want to do ?\x1B[37m');
        console.log();
        console.log('    [A] Attack         [S] Special');
        console.log('    [M] Magic          [P] Protect');
        console.log('    [E] Escape         [C] Caracteristics');
        console.log('            [I] Inventory');
        console.log();
        var question = readline.question('  => ');
        if (question.toLowerCase() === 'i') {
            inventory_1["default"].displayInventory(players);
            var inventoryQuestion = readline.question(' Do you want to use an item ? [y/n]');
            if (inventoryQuestion === 'y') {
                inventory_1["default"].useItems(players);
            }
        }
        if (question.toLowerCase() === 'e') {
            if (alreadyEscaped === true) {
                return 0;
            }
            else {
                alreadyEscaped = true;
                return 1;
            }
        }
        if (question.toLowerCase() === 'm') {
            var result = magic_skills_1["default"].magicskills(players, enemies, playersMaxHP, playersMaxMP);
            playerHP = players.hp;
            playerMP = players.mp;
            if (enemies.hp <= 0) {
                console.log(" ".concat(enemies.name, " died."));
                return 1;
            }
        }
        if (question.toLowerCase() === 's') {
            if (basic_characteristics_2_1["default"].specialMovePlayer(players, usedOrNot) === true) {
                usedOrNot = true;
                attackModifier *= 2;
                question = 'a';
            }
        }
        if (question.toLowerCase() === 'a') {
            attackModifier = basic_caracteristics_1["default"].strongAgainst(players, enemies);
            if (attackModifier > 1) {
                console.log(' You hit him with a Crushing hit !');
            }
            if (attackModifier < 1) {
                console.log(' You hit him with a Glancing hit...');
            }
            enemies.hp -= players.str * basic_caracteristics_1["default"].strongAgainst(players, enemies);
            if (enemies.hp <= 0) {
                return 1;
            }
        }
        if (question.toLowerCase() === 'a' || question.toLowerCase() === 'h') {
            attackModifier = basic_caracteristics_1["default"].strongAgainstEnnemie(enemies, players);
            if (attackModifier > 1) {
                console.log(' He hit you with a Crushing hit... Be careful !');
            }
            if (attackModifier < 1) {
                console.log('He hit you with a Glancing hit !');
            }
            playerHP -= enemies.str * attackModifier;
            if (playerHP <= 0) {
                console.log(' Oh no ! You just died...');
                return 0;
            }
            console.log(" ".concat(players.name, " lost ").concat(enemies.str, "hp !"));
        }
        if (question.toLowerCase() === 'p') {
            playerHP -= ((enemies.str * attackModifier) * (players.def / 100)) / 2;
        }
        lastQuestion = question;
    }
}
exports.launch = launch;
exports["default"] = {
    main: main,
    launch: launch
};
