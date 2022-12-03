"use strict";
exports.__esModule = true;
var fight_1 = require("./fights_src/fight");
var generatePlayer_1 = require("./fights_src/generatePlayer");
function game(difficulty, floor, name) {
    console.clear();
    (0, generatePlayer_1["default"])(function (heroe) {
        fight_1["default"].main(heroe, difficulty, floor, name, function () {
        });
    });
}
exports["default"] = game;
