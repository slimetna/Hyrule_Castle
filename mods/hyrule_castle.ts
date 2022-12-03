import launchGame from './utils/launchGame';
import menu from './utils/menu'

function game() {
    launchGame(function() {
        menu();
    });

}
game()
