import * as boxen from 'boxen';
import * as fs from 'fs';
import menu from './menu';
import * as rl from 'readline-sync';
import * as Table from 'cli-table';

export default async function leaderboard() {
    console.clear();
    try {
        let lb: any = fs.readFileSync('./json/leaderboard.json', 'utf-8');
        lb = JSON.parse(lb);

        const stats : any = lb.sort(function (a, b) {
            return b.score - a.score;
        });

        console.log(boxen('Leaderboard', {padding: 1}));
        console.log('');

        const table: any = new Table({
            head: ['Rank', 'Player', 'Score']
          , colWidths: [6, 20, 15]
        });
        for(let i = 0; i < stats.length; i += 1) {
            const player: any = stats[i];
            table.push(
                [`\x1B[1m${i + 1}\x1B[0m`, player.name, `\x1B[3m${player.score}\x1B[0m`]
            );
        }
        console.log(table.toString());
        console.log('')
        console.log('Type \'menu\' to return to the menu, or \'quit\' to leave the game');
        const answer: string = rl.question("\x1B[36m=> \x1B[37m");

        switch(answer.toLowerCase()) {
            case 'menu':
                menu();
                break;
            case 'quit':
                console.log('Bye bye !');
                break;
            default:
                leaderboard()
        }
        } catch(e) {
        console.error(e);
    }
}