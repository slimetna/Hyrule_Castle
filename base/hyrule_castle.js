"use strict";
exports.__esModule = true;
var launchGame_1 = require("./utils/launchGame");
var fight_1 = require("./utils/fight");
function game() {
    (0, launchGame_1["default"])(function () {
        (0, fight_1["default"])();
    });
}
game();
