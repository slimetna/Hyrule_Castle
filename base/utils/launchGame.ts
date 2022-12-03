import * as figlet from 'figlet';

export default async function launchGame(callback) {
    console.clear();
    let result: boolean = false;
    
    figlet('Hyrule Castle', function(err, data) {
        if (err) {
            console.error(err);
            result = false;
        };
        console.log(data);
        console.log("\x1B[3mA Game designed by Ethan & Slim\x1B[0m");

        if(!process.argv.find((x: string) => x === "--force")) {
            console.log("\n")
            console.log("\x1B[3m\x1B[38;2;214;214;214mThe game will be launch in few seconds...\x1B[37m\x1B[0m")
            setTimeout(function(){
                callback();
            }, 2000);
        } else {
            callback();
        }
    });
}