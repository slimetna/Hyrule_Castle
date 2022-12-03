import * as interfaces from './utils/interfaces';
import launchGame from './utils/launchGame';
import fight from './utils/fight';

function game() {
    launchGame(function() {
        fight();
    });

}
game()
