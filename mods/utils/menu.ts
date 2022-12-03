import * as rl from 'readline-sync';
import * as boxen from 'boxen';
import leaderboard from './leaderboard';
import save from './fights_src/save';
import selectDifficulty from './fights_src/selectDifficulty';
import launch from './json_editor';

export default function menu() {
    console.clear();
    //figlet('--= Menu =--', function(err, data) {
    //    console.log(data);
    //});
    console.log(boxen('Welcome to Hyrule Castle', {title: 'Menu', titleAlignment: 'right', textAlignment: 'center'}));
    console.log('\x1B[1mSelect an option\x1B[0m')
    console.log("");
    console.log('[1] Start the game.');
    console.log('[2] Start the game. \x1B[3m(competition mode)\x1B[0m');
    console.log('[3] See leaderboard');
    console.log('[4] JSON Editor');
    //console.log('[4] Load a save');
    console.log('[quit] Leave the game');
    console.log('');

    const answer: string = rl.question("\x1B[36m=> \x1B[37m");
    
    console.clear();
    switch(answer.toLowerCase()) {
        case '1':
            selectDifficulty("0")
            break;
        case '2':
            console.log('Choose a pseudo before start.')
            const name: string = rl.question("\x1B[36m=> \x1B[37m");
            selectDifficulty(name)
            break;
        case '3':
            leaderboard();
            break;
        case '4':
            launch();
            break;
        case 'quit':
            console.log('Bye bye !');
            break;
        default:
            console.log('This option is not recognize.');
    }
    return;
}