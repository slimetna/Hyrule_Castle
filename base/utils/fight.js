"use strict";
exports.__esModule = true;
var fs = require("fs");
var readline = require("readline-sync");
var combatInterface_1 = require("./combatInterface");
var basic_caracteristics_1 = require("../../mods/utils/basic_caracteristics");
function main() {
    fs.readFile('./json/players.json', 'utf8', function (err, data) {
        fs.readFile('./json/enemies.json', 'utf8', function (err, data2) {
            fs.readFile('./json/bosses.json', 'utf8', function (err, data3) {
                var contentJson = JSON.parse(data);
                var contentJson2 = JSON.parse(data2);
                var contentJson3 = JSON.parse(data3);
                var bossStock = getBosses(contentJson3[0]);
                var herosStock = getHeros(contentJson[0]);
                for (var i = 0; i < 10; i += 1) {
                    var enemieStock = getEnemies(contentJson2[0]);
                    var heros = Object.assign({}, herosStock);
                    var enemie = Object.assign({}, enemieStock);
                    var boss = Object.assign({}, bossStock);
                    if (i <= 8) {
                        var result = fight(heros, enemie, i + 1);
                        if (result === 0) {
                            return;
                        }
                    }
                    if (i > 8) {
                        var result = fight(heros, boss, i + 1);
                        if (result === 0) {
                            console.log(" ".concat(boss.name, " beat you... Try again to save the princess !"));
                            return;
                        }
                        console.log(' You saved the princess !');
                    }
                }
            });
        });
    });
}
exports["default"] = main;
function fight(players, enemies, number) {
    var attackModifier = 1;
    var playersMaxHP = players.hp;
    var enemieMaxHP = enemies.hp;
    var lastQuestion = '';
    while (players.hp > 0 && enemies.hp > 0) {
        if (lastQuestion.toLowerCase() === 'c') {
            basic_caracteristics_1["default"].displayCaracteristics(players);
        }
        console.log("--------------------==[Fight ".concat(number, "]==--------------------"));
        console.log();
        console.log("You encounter a ".concat(enemies.name, "."));
        console.log();
        console.log('\x1B[31m', enemies.name);
        console.log('\x1B[37m', "".concat(combatInterface_1["default"].getBarInterface(enemieMaxHP, enemies.hp), " ").concat(enemies.hp, "/").concat(enemieMaxHP));
        console.log();
        console.log('\x1B[34m', players.name);
        console.log('\x1B[37m', "".concat(combatInterface_1["default"].getBarInterface(playersMaxHP, players.hp), " ").concat(players.hp, "/").concat(playersMaxHP));
        console.log();
        console.log('\x1B[35m', 'What do you want to do ?\x1B[37m');
        var question = readline.question(' Attack or Heal ? [A/H]\n =>');
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
        if (question.toLowerCase() === 'h') {
            players.hp += playersMaxHP / 2;
            if (players.hp > 60) {
                players.hp = 60;
            }
        }
        if (question.toLowerCase() === 'a' || question.toLowerCase() === 'h') {
            attackModifier = basic_caracteristics_1["default"].strongAgainst(enemies, players);
            if (attackModifier > 1) {
                console.log(' He hit you with a Crushing hit... Be careful !');
            }
            if (attackModifier < 1) {
                console.log('He hit you with a Glancing hit !');
            }
            players.hp -= enemies.str * attackModifier;
            if (players.hp <= 0) {
                console.log(' Oh no ! You just died...');
                return 0;
            }
            console.log(" ".concat(players.name, " lost ").concat(enemies.str, "hp !"));
        }
        lastQuestion = question;
    }
}
var getHeros = function (heros) {
    var data = fs.readFileSync('./json/players.json', 'utf8');
    var contentJson = JSON.parse(data);
    var random = getRandomInt(99);
    if (random === 0) {
        return contentJson[4];
    }
    if (random > 0 && random <= 50) {
        return contentJson[0];
    }
    if (random > 50 && random <= 80) {
        return contentJson[1];
    }
    if (random > 80 && random <= 95) {
        return contentJson[2];
    }
    if (random > 95 && random <= 98) {
        return contentJson[3];
    }
    return heros;
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var getEnemies = function (enemie) {
    var data = fs.readFileSync('./json/enemies.json', 'utf8');
    var contentJson = JSON.parse(data);
    var random = getRandomInt(99);
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
    return enemie;
};
var getBosses = function (boss) {
    var random = getRandomInt(99);
    var data = fs.readFileSync('./json/bosses.json', 'utf8');
    var contentJson = JSON.parse(data);
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
    return boss;
};
