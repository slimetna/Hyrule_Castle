"use strict";
exports.__esModule = true;
var rl = require("readline-sync");
var boxen = require("boxen");
var leaderboard_1 = require("./leaderboard");
var selectDifficulty_1 = require("./fights_src/selectDifficulty");
var json_editor_1 = require("./json_editor");
function menu() {
    console.clear();
    //figlet('--= Menu =--', function(err, data) {
    //    console.log(data);
    //});
    console.log(boxen('Welcome to Hyrule Castle', { title: 'Menu', titleAlignment: 'right', textAlignment: 'center' }));
    console.log('\x1B[1mSelect an option\x1B[0m');
    console.log("");
    console.log('[1] Start the game.');
    console.log('[2] Start the game. \x1B[3m(competition mode)\x1B[0m');
    console.log('[3] See leaderboard');
    console.log('[4] JSON Editor');
    //console.log('[4] Load a save');
    console.log('[quit] Leave the game');
    console.log('');
    var answer = rl.question("\x1B[36m=> \x1B[37m");
    console.clear();
    switch (answer.toLowerCase()) {
        case '1':
            (0, selectDifficulty_1["default"])("0");
            break;
        case '2':
            console.log('Choose a pseudo before start.');
            var name_1 = rl.question("\x1B[36m=> \x1B[37m");
            (0, selectDifficulty_1["default"])(name_1);
            break;
        case '3':
            (0, leaderboard_1["default"])();
            break;
        case '4':
            (0, json_editor_1["default"])();
            break;
        case 'quit':
            console.log('Bye bye !');
            break;
        default:
            console.log('This option is not recognize.');
    }
    return;
}
exports["default"] = menu;
