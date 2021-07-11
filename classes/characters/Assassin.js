
class Assassin extends Character {
    // L'Assassin commence avec 6 points de vie et 20 points de mana. Il a 6 points de dégât.
    constructor(name, hp = 6, mana = 20, dmg = 6,image='https://media.moddb.com/cache/images/groups/1/2/1636/thumb_620x2000/ACfinsmall.jpg') {
        super(name, hp, dmg, mana,image);
        this._shield = false;
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

    get shield() {
        return this._shield;
    }

    get class()
    {
        return super.class;
    }

    get name()
    {
        return super.name;
    }

    get className()
    {
        return  super.className
    }

    get image()
    {
        return super.image;
    }

    get attacks()
    {
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

    set name(name)
    {
        return this._name = name;
    }

    set status(status) {
        return this._status = status
    }

    set shield(shieldState) {
        return this._shield = shieldState;
    }

    // METHODS TO CLACULATE PERCENTAGE OF LIFE RELATIVE TO BASE POINTS

     hpPercentage()
     {
         return super.hpPercentage();
     }

     dmgPercentage()
     {
         return super.dmgPercentage();
     }

     manaPercentage()
     {
         return super.manaPercentage()
     }

    
     // INHERITED METHOD TO SAY HELLO TO PLAYER

     sayHello()
     {
         super.sayHello();
     }


     // INHERITED METHOD TO RENDER DATA OF PARTICULAR INSTANCE TO VIEW

     render()
     {
         return super.render();
     }


    // INHERITED METHOD TO DISPLAY NOT ENOUGH MANA SENTENCE TO PLAYER
    notEnoughMana(manaCost) {
        return super.notEnoughMana(manaCost);
    }

    // INHERITED METHODS TO DEAL WITH DAMAGES TO OPPONENT AND DAMAGES TO CURRENT CHARACTER

    takeDamage(inflictedDamages) {
        if (!this.protected) {
            return super.takeDamage(inflictedDamages)
        } else {
            this.protected = false;
            return this;
        }
    }

    dealDamage(opponentCharacter) {
        return super.dealDamage(opponentCharacter);
    }

    // SPECIAL ATTACK 


    // L'Assassin aura une attaque spéciale Shadow hit lui permettant de ne pas prendre de dégâts lors du prochain tour. 
    // Il portera alors une attaque spéciale infligeant 7 dégâts puis, si l'adversaire n'est pas mort, 
    // l'assassin perdra 7 dégâts à son tour. Cette attaque coûte 20 mana.

    shadowHit(opponentCharacter,manaCost=20) {

        if (manaCost >= 20)
        {
            this.shield = true;
            this.dmg = 7;
            this.mana -= manaCost
            let inflictedDamages = this.dealDamage(opponentCharacter);
            if (opponentCharacter.status != 'loser')
            {
                this.hp -= 7;
                if (this.hp <= 0) {
                    this.hp = 0;
                    this.status = "loser";
                    this.render();
                }
            }
            return inflictedDamages;
        }else{
            this.notEnoughMana(manaCost);
        }
    }

    getAttacksCharacteristics()
    {
        return {
            shadowHit:{manaCost:20, dmg:7},
            dealDamage:{dmg:this.dmg},
        }

    }


    getAttacks()
    {
        return ['dealDamage', 'shadowHit'];
    }


}