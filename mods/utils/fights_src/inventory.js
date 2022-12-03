"use strict";
exports.__esModule = true;
var readline = require("readline-sync");
function displayInventory(player) {
    for (var i = 0; i < player.inventory.length; i += 1) {
        console.log(" ".concat(i + 1, " - ").concat(player.inventory[i]));
    }
}
function useItems(player) {
    var question = readline.question(' Which item do you want to use ? ');
    if (player.inventory[question] === 'Low-level Potion') {
        player.hp += 15;
        player.inventory.splice(question - 1, 1);
        return;
    }
    if (player.inventory[question] === 'Potion') {
        player.hp += 30;
        player.inventory.splice(question - 1, 1);
        return;
    }
    if (player.inventory[question] === 'High-level Potion') {
        player.hp += 60;
        player.inventory.splice(question - 1, 1);
        return;
    }
    if (player.inventory[question] === 'Holy Potion') {
        player.hp += 100;
        player.inventory.splice(question - 1, 1);
        return;
    }
}
exports["default"] = { displayInventory: displayInventory, useItems: useItems };
