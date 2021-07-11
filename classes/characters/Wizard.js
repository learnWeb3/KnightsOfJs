class Wizard extends Character {
    // Le Paladin commence avec 16 points de vie et 160 points de mana. Il a 3 points de dégât.
    constructor(name, hp = 10, mana = 200, dmg = 2, image = 'https://i.pinimg.com/originals/bd/bb/33/bdbb3326ce0f4467b9e8c1bb139a5688.jpg') {
        super(name, hp, dmg, mana, image);
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
    set name(name) {
        return this._name = name;
    }

    set status(status) {
        return this._status = status
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

    // INHERITED METHOD TO RENDER DATA OF PARTICULAR INSTANCE TO VIEW

    render() {
        return super.render();
    }


    // INHERITED METHOD TO DISPLAY NOT ENOUGH MANA SENTENCE TO PLAYER
    notEnoughMana(manaCost) {
        return super.notEnoughMana(manaCost);
    }

    // INHERITED METHODS TO DEAL WITH DAMAGES TO OPPONENT AND DAMAGES TO CURRENT CHARACTER

    takeDamage(inflictedDamages) {
        return super.takeDamage(inflictedDamages)
    }

    dealDamage(opponentCharacter) {
        return super.dealDamage(opponentCharacter);
    }

    // SPECIAL ATTACK

    // Le wizard a une attaque spéciale Fireball qui inflige 7 points de dégât et qui coûte 25 points de mana.
    fireball(opponentCharacter, dmg = 7, manaCost = 25) {
        if (this.mana >= manaCost) {
            this.mana -= manaCost;
            let inflictedDamages = dmg;
            return inflictedDamages;
        } else {
            this.notEnoughMana(manaCost);
        }
    }

    getAttacks() {
        return ['dealDamage', 'fireball'];
    }

    getAttacksCharacteristics() {
        return {
            fireball: { manaCost: 25, dmg: 7 },
            dealDamage: { dmg: this.dmg }
        }

    }

}