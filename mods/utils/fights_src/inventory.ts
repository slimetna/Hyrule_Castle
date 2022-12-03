import * as interfaces from '../interfaces';
import * as readline from 'readline-sync';

function displayInventory (player: interfaces.players) {
    for (let i = 0; i < player.inventory.length; i += 1) {
        console.log(` ${i+1} - ${player.inventory[i]}`);
    }
}

function useItems (player: interfaces.players) {
    let question = readline.question(' Which item do you want to use ? ');
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

export default {displayInventory, useItems};