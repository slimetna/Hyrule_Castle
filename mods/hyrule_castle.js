"use strict";
exports.__esModule = true;
var launchGame_1 = require("./utils/launchGame");
var menu_1 = require("./utils/menu");
function game() {
    (0, launchGame_1["default"])(function () {
        (0, menu_1["default"])();
    });
}
game();
