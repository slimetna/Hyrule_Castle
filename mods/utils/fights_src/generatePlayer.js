"use strict";
exports.__esModule = true;
var fs = require("fs");
var randomInt_1 = require("./randomInt");
var character_creation_1 = require("./character_creation");
var rl = require("readline-sync");
function getHeros(callback) {
    var data = fs.readFileSync('./json/players.json', 'utf8');
    console.log('Do you want play with your own custom character ? [y/n]');
    var answer = rl.question('\x1B[36m=> \x1B[37m');
    switch (answer) {
        case 'y':
            callback(character_creation_1["default"].createCustomCharacter());
            break;
        case 'n':
            var contentJson = JSON.parse(data);
            var random = randomInt_1["default"].getRandomInt(99);
            if (random === 0) {
                callback(contentJson[4]);
            }
            if (random > 0 && random <= 50) {
                callback(contentJson[0]);
            }
            if (random > 50 && random <= 80) {
                callback(contentJson[1]);
            }
            if (random > 80 && random <= 95) {
                callback(contentJson[2]);
            }
            if (random > 95 && random <= 98) {
                callback(contentJson[3]);
            }
            break;
        default:
            console.log('You cannot do that.');
    }
}
exports["default"] = getHeros;
