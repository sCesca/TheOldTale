import XpPorRaridade from "../constants/XpPorRaridade";

class Player {
    constructor(
        name = 'Default Player',
        money = 5,
        xp = 0,
        xpToNextLevel = 100,
        level = 1,
        dano = 1,
        agilidade = 1
    ) {
        this._name = name;
        this._money = money;
        this._xp = xp; 
        this._xpToNextLevel = xpToNextLevel || this.calculateXpToNextLevel(level);
        this._level = level;
        this._dano = dano;
        this._agilidade = agilidade;
    }

    static createNew(name) {
        return new Player(name);
    }

    static calculateXpToNextLevel(level = this._level) {
        if (level <= 1) {
            return 100;
        } else if (level === 2) {
            return 200;
        } else if (level === 3) {
            return 300;
        } else if (level === 4) {
            return 400;
        } else if (level === 5) {
            return 500;
        } else if (level === 6) {
            return 600;
        } else if (level === 7) {
            return 700;
        } else if (level === 8) {
            return 800;
        } else if (level === 9) {
            return 900;
        } else if (level === 10) {
            return 1000;
        }
    }

    addXP(raridadeMonstro) {
        const xpMonster = XpPorRaridade[raridadeMonstro];
        
        if (xpMonster !== undefined) {
            this._xp += xpMonster;
            console.log('XP Atual: ', this._xp);
            this.levelUp();
        } else {
            console.error('Raridade do monstro inválida:', raridadeMonstro);
        }
    }

    earnMoney(amount) {
        this._money += amount;
    }

    levelUp() {
        if (this._xp >= this._xpToNextLevel) { 
            if (this._level === 10) {
                this._xp = 0;
                this._money += 10;
            } else {
                this._xp = 0; 
                this._level += 1;
                this._money += 1;
                this._xpToNextLevel = Player.calculateXpToNextLevel(this._level);
            }
        }
    }
}

export default Player;