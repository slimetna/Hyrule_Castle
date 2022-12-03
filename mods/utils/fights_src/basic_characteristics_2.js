"use strict";
exports.__esModule = true;
var fs = require('fs');
function specialMovePlayer(player, usedOrNot) {
    if (usedOrNot === true) {
        console.log(" You can't use your spcial move now, wait until the next fight !");
        return false;
    }
    var data = fs.readFileSync('./json/classes.json', 'utf8');
    var contentJson = JSON.parse(data);
    console.log(" ".concat(player.name, " is using his special move ! ").concat(player.name, "'s body is surrounded by ").concat(contentJson[player["class"]].alignment, " aura ! "));
    return true;
}
exports["default"] = { specialMovePlayer: specialMovePlayer };
