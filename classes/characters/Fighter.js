
// Le Fighter commence avec 12 points de vie (hp) et 40 points de mana (mana). Il a 4 points de dégât (dmg).


class Fighter extends Character {
    constructor(name, hp = 12, mana = 40, dmg = 4, image = 'http://www.misfit-studios.com/img/Eric-Lofgren-Shield-Up-online.jpg') {
        super(name, hp, dmg, mana, image);
        this._resistance = 0;
    }

    // GETTERS
    get hp() {
        return super.hp;
    }
    get mana() {
        return super.mana;
    }

    get dmg() {
        return super.dmg;
    }

    get status() {
        return super.status;
    }

    get resistance() {
        return this._resistance;
    }
    get className() {
        return super.className
    }
    get name() {
        return super.name;
    }
    get image() {
        return super.image;
    }


    get attacks() {
        return super.attacks;
    }
    get baseHp() {
        return super.baseHp;
    }

    get baseDmg() {
        return super.baseDmg;
    }

    get baseMana() {
        return super.baseMana;
    }




    // SETTERS
    set hp(hp) {
        return this._hp = hp;
    }

    set dmg(dmg) {
        return this._dmg = dmg;
    }

    set mana(mana) {
        return this._mana = mana;
    }

    set status(status) {
        return this._status = status
    }

    set name(name) {
        return this._name = name;
    }

    set resistance(resistance) {
        return this._resistance = resistance;
    }

    // METHODS TO CLACULATE PERCENTAGE OF LIFE RELATIVE TO BASE POINTS

    hpPercentage() {
        return super.hpPercentage();
    }

    dmgPercentage() {
        return super.dmgPercentage();
    }

    manaPercentage() {
        return super.manaPercentage()
    }


    // INHERITED METHOD TO SAY HELLO TO PLAYER

    sayHello() {
        super.sayHello();
    }

    // INHERITED METHOD TO DISPLAY NOT ENOUGH MANA SENTENCE TO PLAYER
    notEnoughMana(manaCost) {
        return super.notEnoughMana(manaCost);
    }


    // INHERITED METHOD TO RENDER DATA OF PARTICULAR INSTANCE TO VIEW

    render() {
        return super.render();
    }



    // INHERITED METHODS TO DEAL WITH DAMAGES TO OPPONENT AND DAMAGES TO CURRENT CHARACTER=
    takeDamage(inflictedDamages) {

        if (this.resistance > 0) {
            inflictedDamages -= this.resistance;
            this.resistance = 0;
        }
        return super.takeDamage(inflictedDamages)
    }

    dealDamage(opponentCharacter) {
        return super.dealDamage(opponentCharacter);
    }

    // SPECIAL ATTACK

    // Le Fighter aura une attaque spéciale Dark Vision, infligeant 5 dégâts. Lors du prochain tour, 
    // il prendra 2 dégâts de moins par coup reçu. Elle coute 20 mana.

    darkVision(opponentCharacter, dmg = 5, manaCost = 20) {
        if (this.mana >= manaCost) {
            this.resistance = 2;
            this.mana -= manaCost;
            let inflictedDamages = dmg;
            return inflictedDamages;
        } else {
            this.notEnoughMana(manaCost)
        }
    }

    getAttacks() {
        return ['dealDamage', 'darkVision'];
    }

    getAttacksCharacteristics() {
        return {
            darkVision: { manaCost: 20, dmg: 5 },
            dealDamage: { dmg: this.dmg },
        }

    }


}