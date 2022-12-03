function combatInterface(round, player, playerHP, playerMP, enemie, playerMaxHp, playerMaxMP, enemieMaxHp) {
    console.log(`--------------------==[Fight ${round}]==--------------------`);
    console.log(`You encounter a ${enemie.name}.`);
    console.log();
    console.log('\x1B[31m', enemie.name);
    console.log('\x1B[37m', `${getBarInterface(enemieMaxHp, enemie.hp)} ${enemie.hp}/${enemieMaxHp}`);
    console.log();
    console.log('\x1B[34m', player.name);
    console.log('\x1B[37m', `${getBarInterface(playerMaxHp, playerHP)} ${playerHP}/${playerMaxHp}`);
    console.log();
}

function getBarInterface(healthBar: number, healthPlayer: number) {
    const healthOne: string = "█";
    const healtZero: string = "-";

    let healthLife: string = "";
    const barLength: number = 30;
    const healthMax: number = healthBar;
    const health: number = healthPlayer;
    const divide: number = healthMax/barLength;
    const healthMaxDivide: number = Math.round(healthMax/divide);
    const healthDivide: number = Math.round(health/divide);

    for(let i = 0; i < barLength; i += 1) {
        if(i >= healthDivide) {
            healthLife += healtZero;
        } else {
            healthLife += healthOne;
        }
    }

    if(healthDivide > 2/3 * healthMaxDivide) {
        healthLife = `\x1B[32m${healthLife}\x1B[37m`;
    } else if(healthDivide < 1/3 * healthMaxDivide) {
        healthLife = `\x1B[31m${healthLife}\x1B[37m`;

    } else {
        healthLife = `\x1B[33m${healthLife}\x1B[37m`;

    }

    return "["+ healthLife + "]";
}

export default {
    getBarInterface,
    combatInterface
}