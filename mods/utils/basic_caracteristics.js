"use strict";
exports.__esModule = true;
var readline = require("readline-sync");
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
    console.log("MONEY: ".concat(player.money));
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
function createCustomCharacter() {
    var custom = {
        id: 0,
        name: "",
        lvl: 1,
        xp: 0,
        nextlvl: 60,
        money: 12,
        hp: 0,
        mp: 0,
        str: 0,
        int: 0,
        def: 0,
        res: 0,
        spd: 0,
        luck: 0,
        race: 0,
        "class": 0,
        rarity: 0,
        inventory: []
    };
    var data = fs.readFileSync('./json/classes.json', 'utf8');
    var data2 = fs.readFileSync('./json/races.json', 'utf8');
    var classes = JSON.parse(data);
    var races = JSON.parse(data2);
    var maximumPoint = 120;
    var nameQuestion = readline.question(' What is your name ? ');
    custom.name = nameQuestion;
    for (var i = 0; i < classes.length; i += 1) {
        console.log("".concat(i + 1, " - ").concat(classes[i].name));
    }
    var classQuestion = readline.question(' Which class do you want ?\n');
    while (classQuestion < 1 || classQuestion > classes.length || isNaN(+classQuestion)) {
        classQuestion = readline.question(' Wrong input ! Which class do you want ?\n ');
    }
    custom["class"] = classQuestion;
    for (var i = 0; i < races.length; i += 1) {
        console.log("".concat(i + 1, " - ").concat(races[i].name));
    }
    var raceQuestion = readline.question(' Which race do you want ?\n');
    while (raceQuestion < 1 || raceQuestion > races.length || isNaN(+raceQuestion)) {
        raceQuestion = readline.question(' Wrong input ! Which race do you want ?\n ');
    }
    custom.race = raceQuestion;
    var hpQuestion = readline.question(" How many points do you want to put in HP ? You have ".concat(maximumPoint, " points left.\n"));
    if (hpQuestion < 0) {
        custom.hp = 0;
    }
    if (hpQuestion > maximumPoint || isNaN(+hpQuestion)) {
        custom.hp = 0;
    }
    else {
        maximumPoint -= hpQuestion;
        custom.hp = hpQuestion;
    }
    var mpQuestion = readline.question(" How many points do you want to put in MP ? You have ".concat(maximumPoint, " points left.\n"));
    if (mpQuestion < 0) {
        custom.mp = 0;
    }
    if (mpQuestion > maximumPoint || isNaN(+mpQuestion)) {
        custom.mp = 0;
    }
    else {
        maximumPoint -= mpQuestion;
        custom.mp = mpQuestion;
    }
    var strQuestion = readline.question(" How many points do you want to put in STR ? You have ".concat(maximumPoint, " points left.\n"));
    if (strQuestion < 0) {
        custom.str = 0;
    }
    if (strQuestion > maximumPoint || isNaN(+strQuestion)) {
        custom.str = 0;
    }
    else {
        maximumPoint -= strQuestion;
        custom.str = strQuestion;
    }
    var intQuestion = readline.question(" How many points do you want to put in INT ? You have ".concat(maximumPoint, " points left.\n"));
    if (intQuestion < 0) {
        custom.int = 0;
    }
    if (intQuestion > maximumPoint || isNaN(+intQuestion)) {
        custom.int = 0;
    }
    else {
        maximumPoint -= intQuestion;
        custom.int = intQuestion;
    }
    var defQuestion = readline.question(" How many points do you want to put in DEF ? You have ".concat(maximumPoint, " points left.\n"));
    if (defQuestion < 0) {
        custom.def = 0;
    }
    if (defQuestion > maximumPoint || isNaN(+defQuestion)) {
        custom.def = 0;
    }
    else {
        maximumPoint -= defQuestion;
        custom.def = defQuestion;
    }
    var resQuestion = readline.question(" How many points do you want to put in RES ? You have ".concat(maximumPoint, " points left.\n"));
    if (resQuestion < 0) {
        custom.res = 0;
    }
    if (resQuestion > maximumPoint || isNaN(+resQuestion)) {
        custom.res = 0;
    }
    else {
        maximumPoint -= resQuestion;
        custom.res = resQuestion;
    }
    var spdQuestion = readline.question(" How many points do you want to put in SPD ? You have ".concat(maximumPoint, " points left.\n"));
    if (spdQuestion < 0) {
        custom.spd = 0;
    }
    if (spdQuestion > maximumPoint || isNaN(+spdQuestion)) {
        custom.spd = 0;
    }
    else {
        maximumPoint -= spdQuestion;
        custom.spd = spdQuestion;
    }
    var luckQuestion = readline.question(" How many points do you want to put in LUCK ? You have ".concat(maximumPoint, " points left.\n"));
    if (luckQuestion < 0) {
        custom.luck = 0;
    }
    if (luckQuestion > maximumPoint || isNaN(+luckQuestion)) {
        custom.luck = 0;
    }
    else {
        maximumPoint -= luckQuestion;
        custom.luck = luckQuestion;
    }
    displayCaracteristics(custom);
    var confirmQuestion = readline.question(" Do you want to play with this player ? [y/n]\n ");
    while (confirmQuestion !== 'y' && confirmQuestion !== 'n') {
        var confirmQuestion_1 = readline.question(" Wrong input ! Do you want to play with this player ? [y/n]\n ");
    }
    if (confirmQuestion === 'n') {
        createCustomCharacter();
    }
    return custom;
}
exports["default"] = { displayCaracteristics: displayCaracteristics, strongAgainst: strongAgainst, createCustomCharacter: createCustomCharacter };
