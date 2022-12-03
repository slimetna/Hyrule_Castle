"use strict";
exports.__esModule = true;
var fs = require("fs");
var randomInt_1 = require("./randomInt");
function getBoss() {
    var random = randomInt_1["default"].getRandomInt(99);
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
    return contentJson[6];
}
exports["default"] = getBoss;
