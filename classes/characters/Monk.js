class Monk extends Character {

    // Le Monk commence avec 8 points de vie et 200 points de mana. Il a 2 points de dégât.
    constructor(name, hp = 8, mana = 200, dmg = 2, image = 'https://i.pinimg.com/originals/d5/8b/85/d58b859be4b004a6e1eb4d2bf10d2778.jpg') {
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

    // Le Monk, quand a lui, aura une attaque spéciale heal rendant 8 pv. Elle coute 25 mana.
    heal(opponentCharacter, healingPower = 8, manaCost = 25) {
        if (this.mana >= manaCost) {
            opponentCharacter.hp += healingPower;
            this.mana -= manaCost;
            return 0;
        } else {
            this.notEnoughMana(manaCost);
        }
    }

    getAttacks() {
        return ['dealDamage', 'heal'];
    }


    getAttacksCharacteristics() {
        return {
            heal: { manaCost: 25, healingPower: 8 },
            dealDamage: { dmg: this.dmg },
        }

    }



}