"use strict";
exports.__esModule = true;
var fs = require('fs');
var readline = require('readline-sync');
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var getHeros = function (heros) {
    var data = fs.readFileSync('./json/players.json', 'utf8');
    var contentJson = JSON.parse(data);
    var random = getRandomInt(99);
    console.log(random);
    if (random === 0) {
        console.log('Je suis 0');
        return contentJson[4];
    }
    if (random > 0 && random <= 50) {
        console.log('Je suis 50');
        return contentJson[0];
    }
    if (random > 50 && random <= 80) {
        console.log('Je suis 80');
        return contentJson[1];
    }
    if (random > 80 && random <= 95) {
        console.log('Je suis 95');
        return contentJson[2];
    }
    if (random > 95 && random <= 98) {
        console.log('Je suis 98');
        return contentJson[3];
    }
    return heros;
};
function main() {
    fs.readFile('./json/players.json', 'utf8', function (err, data) {
        fs.readFile('./json/enemies.json', 'utf8', function (err, data2) {
            fs.readFile('./json/bosses.json', 'utf8', function (err, data3) {
                var contentJson = JSON.parse(data);
                var contentJson2 = JSON.parse(data2);
                var contentJson3 = JSON.parse(data3);
<<<<<<< HEAD
                var herosStock = getHeros(contentJson[0]);
                var bossStock = getBosses(contentJson3[0]);
                for (var i = 0; i < 10; i += 1) {
                    var enemieStock = getEnemies(contentJson2[0]);
=======
                for (var i = 0; i < 10; i += 1) {
                    var herosStock = getHeros(contentJson[0]);
                    var enemieStock = getHeros(contentJson2[0]);
                    var bossStock = getHeros(contentJson3[0]);
>>>>>>> 4932018 (step)
                    var heros = Object.assign({}, herosStock);
                    var enemie = Object.assign({}, enemieStock);
                    var boss = Object.assign({}, bossStock);
                    console.log(enemie.hp);
                    if (i <= 8) {
                        var result = fight(heros, enemie, i + 1);
                        if (result === 0) {
                            console.log(" You lost at floor ".concat(i + 1, " ! Try again..."));
                            return;
                        }
                        console.log(" You beat the ".concat(i + 1, " floor !"));
                    }
                    if (i > 8) {
                        var result = fight(heros, boss, i + 1);
                        if (result === 0) {
                            console.log(" Ganon beat you... Try again to save the princess !");
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
    console.log("======= FIGHT ".concat(number, " ======="));
    console.log();
    console.log("You encounter a ".concat(enemies.name, "."));
    console.log();
    var playersMaxHP = players.hp;
    var enemieMaxHP = enemies.hp;
    while (players.hp > 0 && enemies.hp > 0) {
        console.log('\x1B[31m', enemies.name);
        console.log('\x1B[32m', "".concat(enemies.hp, "/").concat(enemieMaxHP));
        console.log();
        console.log('\x1B[31m', players.name);
        console.log('\x1B[32m', "".concat(players.hp, "/").concat(playersMaxHP));
        console.log();
        console.log('\x1B[35m', 'What do you want to do ?');
        var question = readline.question(' Attack or Heal ? [A/H]');
        if (question === 'A') {
            enemies.hp -= players.str;
            if (enemies.hp <= 0) {
                console.log(" ".concat(enemies.name, " just died !"));
                return 1;
            }
        }
        if (question === 'H') {
            players.hp += playersMaxHP / 2;
            if (players.hp > 60) {
                players.hp = 60;
            }
        }
<<<<<<< HEAD
        players.hp -= enemies.str;
=======
        players.hp -= 30;
>>>>>>> 4932018 (step)
        if (players.hp <= 0) {
            console.log(' Oh no ! You just died...');
            return 0;
        }
        console.log("".concat(players.name, " lost ").concat(enemies.str, "hp !"));
    }
}
<<<<<<< HEAD
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
=======
var getHeros = function (heros) {
    fs.readFile('./json/players.json', 'utf8', function (err, data) {
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
    });
    return heros;
>>>>>>> 4932018 (step)
};
main();
