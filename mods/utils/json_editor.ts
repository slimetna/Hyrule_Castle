import * as fs from 'fs';
import * as rl from 'readline-sync';
import menu from './menu';

export default function launch() {
    selectFolder(function(folder) {
        selectContent(folder);
    });
}

function selectFolder(callback) {
    const folders: string[] = fs.readdirSync('./json');

    const excludesFolder: string[] = [
        'leaderboard.json'
    ];

    let counter: number = 1;
    const foldersIndex: any = [];

    console.log("JSON Editor")
    console.log('')

    for(let i = 0; i < folders.length; i += 1) {
        const folder: string = folders[i];

        if(!excludesFolder.find((x: string) => x === folder)) {
            console.log(`[${counter}] - "${folder}"`)

            foldersIndex.push({
                id: counter,
                folder: folder
            });
            counter += 1;
        }
    }; 
    console.log('')
    console.log("Type the number corresponding to the file or type 'quit' for leave the JSON Editor and return to menu.");

    let answer: any = rl.question("\x1B[36m=> \x1B[37m");
    answer = parseInt(answer);

    switch(isNaN(answer)) {
        case true: 
            menu();
        break;  
        case false:
            const folderFind: any = foldersIndex.find((x: any) => x.id === answer)
            if(folderFind) {
                callback(folderFind.folder);
            } else {
                console.log('Folder not found. Please try again.')
                launch()
            };
        break;
        default:
            launch();
    }
}

function selectContent(folder) {
    console.clear();

    console.log(`JSON Editor > ${folder}`);
    console.log('')

    let content: any = fs.readFileSync(`./json/${folder}`, 'utf-8');
    content = JSON.parse(content);

    for(let i = 0; i < content.length; i += 1) {
        const object: any = content[i];

        console.log(`[${object.id}] - "${object.name}"`)
    }; 

    let answer: any = rl.question("\x1B[36m=> \x1B[37m");
    answer = parseInt(answer);


    switch(isNaN(answer)) {
        case true: 
            menu();
        break;  
        case false:
            const data: any = content.find((x: any) => x.id === answer);
            if(data) {
                editData(data, folder);
            } else {

            }
        break;
        default:
            launch();
    }
}

function editData(data, folder) {
    console.clear()

    console.log(data);
    console.log('You can edit a data in this way : e.g "=> hp 300" for edit the HP of a player/enemie/boss...');
    let answer: any = rl.question("\x1B[36m=> \x1B[37m");
    answer = answer.split(' ');

    const keyFind: any = data.find((x: any) => Object.keys(x) === answer[0]);
    console.log(keyFind)
}