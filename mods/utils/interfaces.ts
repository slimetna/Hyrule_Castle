import leaderboard from "./leaderboard";

interface bosses {
    id: number;
    name: string;
    hp: number;
    mp: number;
    str: number;
    int: number;
    def: number;
    res: number;
    spd: number;
    luck: number;
    race: number;
    class: number;
    rarity: number;
}

interface leaderboard {
    id: number;
    name: string;
    score: number;
}

interface classes {
    id: number;
    name: string;
    strengths: number[];
    weaknesses: number[];
    attack_type: string;
    alignment: string;
    rarity: number;
}

interface enemies {
    id: number;
    name: string;
    hp: number;
    mp: number;
    str: number;
    int: number;
    def: number;
    res: number;
    spd: number;
    luck: number;
    race: number;
    class: number;
    rarity: number;
}


interface players {
    id: number;
    name: string;
    lvl: number;
    xp: number;
    nextlvl: number;
    money: number;
    hp: number;
    mp: number;
    str: number;
    int: number;
    def: number;
    res: number;
    spd: number;
    luck: number;
    race: number;
    class: number;
    rarity: number;
    inventory: string[];
}

interface Question {
    question: string,
    answer: boolean,
  };

interface races {
    id: number;
    name: string;
    strength: any;
    weakness: number[];
    rarity: string;
}

interface spells {
    id: number;
    name: string;
    cost: any;
    dmg: any;
    effect: string;
    cooldown: any;
    race: string;
    class: string;
    rarity: number;
}

interface traps {
    id: number;
    name: string;
    requirement: string;
    rarity: number;
}

export {
    traps,
    leaderboard,
    spells,
    races,
    players,
    enemies,
    classes,
    bosses
}





