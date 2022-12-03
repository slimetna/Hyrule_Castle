import fight from './fights_src/fight';
import getHeros from './fights_src/generatePlayer';
import * as interfaces from './interfaces';

export default function game(difficulty: number, floor: number, name: string) {
    console.clear();
    getHeros(function(heroe) {
        fight.main(heroe, difficulty, floor, name, function() {
        })
    });
}
