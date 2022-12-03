"use strict";
exports.__esModule = true;
var readline = require("readline-sync");
var randomInt_1 = require("./randomInt");
var fs = require('fs');
function secretRoom(player, callback) {
    console.clear();
    var data = fs.readFileSync('./json/question.json', 'utf8');
    var contentJson = JSON.parse(data);
    var randomFind = randomInt_1["default"].getRandomInt(99);
    if (randomFind >= 0 && randomFind < 35) {
        console.log(' You discovered a secret room ! ');
        var question = readline.question(' Do you want to search into the room ? [y/n] ');
        if (question === 'y') {
            var randomType = randomInt_1["default"].getRandomInt(99);
            if (randomType >= 0 && randomType < 100) {
                console.log(' That was a trap room ! Answer to the question to escape without losing HP. ');
                var index = randomInt_1["default"].getRandomInt(contentJson.length);
                var questionToLeave = readline.question(" ".concat(contentJson[index].question, " "));
                if (questionToLeave === 'y' && contentJson[index].answer === false) {
                    console.log(' Wrong answer ! You lost some HP... ');
                    player.hp -= (player.hp * randomInt_1["default"].getRandomArbitrary(0.05, 0.15));
                }
                else {
                    console.log(' Good answer ! You left the room without losing HP. ');
                }
            }
            else {
                console.log(' You found a treasure room ! You got 1 coin. ');
                player.money += 1;
            }
        }
        setTimeout(function () {
            callback();
        }, 3000);
    }
    else {
        callback();
    }
}
exports["default"] = { secretRoom: secretRoom };
