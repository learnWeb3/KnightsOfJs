

class Berzerker extends Character {

    // Le Berzerker commence avec 8 points de vie et 0 points de mana. Il a 4 points de dégât.

    constructor(name, hp = 8, mana = 0, dmg = 4, image = 'https://db4sgowjqfwig.cloudfront.net/campaigns/96861/assets/774734/Berserker.jpg?1504512222') {
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


    // INHERITED METHOD TO DISPLAY NOT ENOUGH MANA SENTENCE TO PLAYER
    notEnoughMana(manaCost) {
        return super.notEnoughMana(manaCost);
    }

    // INHERITED METHOD TO RENDER DATA OF PARTICULAR INSTANCE TO VIEW

    render() {
        return super.render();
    }


    // INHERITED METHODS TO DEAL WITH DAMAGES TO OPPONENT AND DAMAGES TO CURRENT CHARACTER

    takeDamage(inflictedDamages) {
        return super.takeDamage(inflictedDamages);
    }

    dealDamage(opponentCharacter) {
        return super.dealDamage(opponentCharacter);
    }



    // SPECIAL ATTACK;


    // Le Berzerker aura une attaque spéciale Rage lui donnant +1 attaque pour tout le reste de la partie mais lui enlevant 1 hp. Elle coûte 0 mana.

    rage() {
        this.dmg += 1;
        this.hp -= 1;
        return 0;
    }

    getAttacks() {
        return ['dealDamage', 'rage'];
    }

    getAttacksCharacteristics() {
        return {
            rage: { dmg: this.dmg + 1, hpLoss: 1 },
            dealDamage: { dmg: this.dmg },
        }

    }


}