"use strict";
exports.__esModule = true;
var fs = require('fs');
function displayCaracteristics(player) {
    var data = fs.readFileSync('./json/classes.json', 'utf8');
    var data2 = fs.readFileSync('./json/races.json', 'utf8');
    var contentJson = JSON.parse(data);
    var contentJson2 = JSON.parse(data2);
    console.log("NAME: ".concat(player.name));
    console.log("CLASS: ".concat(contentJson[player["class"] - 1].name));
    console.log("ALIGNMENT: ".concat(contentJson[player["class"] - 1].alignment));
    console.log("RACE: ".concat(contentJson2[player.race - 1].name));
    console.log("LVL: ".concat(player.lvl));
    console.log("MONEY: ".concat(player.money));
    console.log("XP: ".concat(player.xp));
    console.log("HP: ".concat(player.hp));
    console.log("MP: ".concat(player.mp));
    console.log("STR: ".concat(player.str));
    console.log("INT: ".concat(player.int));
    console.log("DEF: ".concat(player.def));
    console.log("RES: ".concat(player.res));
    console.log("SPD: ".concat(player.spd));
}
function strongAgainst(attack, attacked) {
    var result = 1;
    var data = fs.readFileSync('./json/classes.json', 'utf8');
    var data2 = fs.readFileSync('./json/races.json', 'utf8');
    var contentJson = JSON.parse(data);
    var contentJson2 = JSON.parse(data2);
    var attackRaceIndex = attack.race - 1;
    var attackClassIndex = attack["class"] - 1;
    if (contentJson[attackClassIndex].strengths.includes(attacked["class"])) {
        result *= 2;
    }
    if (contentJson[attackClassIndex].weaknesses.includes(attacked["class"])) {
        result /= 2;
    }
    if (contentJson2[attackRaceIndex].strength.includes(attacked.race)) {
        result *= 2;
    }
    if (contentJson2[attackRaceIndex].weakness.includes(attacked.race)) {
        result /= 2;
    }
    return result;
}
function strongAgainstEnnemie(attack, attacked) {
    var result = 1;
    var data = fs.readFileSync('./json/classes.json', 'utf8');
    var data2 = fs.readFileSync('./json/races.json', 'utf8');
    var contentJson = JSON.parse(data);
    var contentJson2 = JSON.parse(data2);
    var attackRaceIndex = attack.race - 1;
    var attackClassIndex = attack["class"] - 1;
    if (contentJson[attackClassIndex].strengths.includes(attacked["class"])) {
        result *= 2;
    }
    if (contentJson[attackClassIndex].weaknesses.includes(attacked["class"])) {
        result /= 2;
    }
    if (contentJson2[attackRaceIndex].strength.includes(attacked.race)) {
        result *= 2;
    }
    if (contentJson2[attackRaceIndex].weakness.includes(attacked.race)) {
        result /= 2;
    }
    return result;
}
exports["default"] = { displayCaracteristics: displayCaracteristics, strongAgainst: strongAgainst, strongAgainstEnnemie: strongAgainstEnnemie };
