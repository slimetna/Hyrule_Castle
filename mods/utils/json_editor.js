"use strict";
exports.__esModule = true;
var fs = require("fs");
var rl = require("readline-sync");
var menu_1 = require("./menu");
function launch() {
    selectFolder(function (folder) {
        selectContent(folder);
    });
}
exports["default"] = launch;
function selectFolder(callback) {
    var folders = fs.readdirSync('./json');
    var excludesFolder = [
        'leaderboard.json'
    ];
    var counter = 1;
    var foldersIndex = [];
    console.log("JSON Editor");
    console.log('');
    var _loop_1 = function (i) {
        var folder = folders[i];
        if (!excludesFolder.find(function (x) { return x === folder; })) {
            console.log("[".concat(counter, "] - \"").concat(folder, "\""));
            foldersIndex.push({
                id: counter,
                folder: folder
            });
            counter += 1;
        }
    };
    for (var i = 0; i < folders.length; i += 1) {
        _loop_1(i);
    }
    ;
    console.log('');
    console.log("Type the number corresponding to the file or type 'quit' for leave the JSON Editor and return to menu.");
    var answer = rl.question("\x1B[36m=> \x1B[37m");
    answer = parseInt(answer);
    switch (isNaN(answer)) {
        case true:
            (0, menu_1["default"])();
            break;
        case false:
            var folderFind = foldersIndex.find(function (x) { return x.id === answer; });
            if (folderFind) {
                callback(folderFind.folder);
            }
            else {
                console.log('Folder not found. Please try again.');
                launch();
            }
            ;
            break;
        default:
            launch();
    }
}
function selectContent(folder) {
    console.clear();
    console.log("JSON Editor > ".concat(folder));
    console.log('');
    var content = fs.readFileSync("./json/".concat(folder), 'utf-8');
    content = JSON.parse(content);
    for (var i = 0; i < content.length; i += 1) {
        var object = content[i];
        console.log("[".concat(object.id, "] - \"").concat(object.name, "\""));
    }
    ;
    var answer = rl.question("\x1B[36m=> \x1B[37m");
    answer = parseInt(answer);
    switch (isNaN(answer)) {
        case true:
            (0, menu_1["default"])();
            break;
        case false:
            var data = content.find(function (x) { return x.id === answer; });
            if (data) {
                editData(data, folder);
            }
            else {
            }
            break;
        default:
            launch();
    }
}
function editData(data, folder) {
    console.clear();
    console.log(data);
    console.log('You can edit a data in this way : e.g "=> hp 300" for edit the HP of a player/enemie/boss...');
    var answer = rl.question("\x1B[36m=> \x1B[37m");
    answer = answer.split(' ');
    var keyFind = data.find(function (x) { return Object.keys(x) === answer[0]; });
    console.log(keyFind);
}
