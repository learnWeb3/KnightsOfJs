

// hp : acronyme de health points, soient points de vie. Un personnage commence avec un nombre défini de hp. S'il passe à 0 points de vie, il devient loser
// dmg : acronyme de damage, soient points de dégât. Un personnage pourra toujours effectuer une attaque simple enlevant un nombre précis de points de vie à une cible précise
// mana : les points de mana. Le mana est une ressource qui permet d'utiliser des attaques spéciales. Un personnage commence le jeu avec un nombre précis de mana qui lui permettront d'effectuer son sortilège spécial (coûtant un certain nombre de mana). Par exemple si un personnage commence avec 150 points de mana et que son sortilège spécial lui coûte 15 points de mana, il pourra effectuer 10 fois ce sortilège avant de tomber à 0 points de mana


class Character {
    constructor(name, hp, dmg, mana, image) {
        this._name = name;
        this._hp = hp;
        this._dmg = dmg;
        this._mana = mana;
        this._baseHp = hp;
        this._baseMana = mana;
        this._baseDmg = dmg;
        this._status = "playing";
        this._className = this.constructor.name;
        this._image = image;
        this._attacks = this.getAttacksCharacteristics();
        console.log(this.sayHello());
    }

    // GETTERS
    get hp() {
        return this._hp;
    }


    get dmg() {
        return this._dmg;
    }

    get mana() {
        return this._mana;
    }

    get status() {
        return this._status;
    }

    get className() {
        return this._className;
    }

    get name() {
        return this._name;
    }

    get image() {
        return this._image
    }

    get attacks() {
        return this._attacks;
    }

    get baseHp() {
        return this._baseHp;
    }

    get baseDmg() {
        return this._baseDmg;
    }

    get baseMana() {
        return this._baseMana;
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
        return this._status = status;
    }

    set name(name) {
        return this._name = name;
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




    // METHODS TO CLACULATE PERCENTAGE OF LIFE RELATIVE TO BASE POINTS

    hpPercentage() {
        return this.hp * 100 / this.baseHp;
    }

    dmgPercentage() {
        return this.dmg * 100 / this.baseDmg;
    }

    manaPercentage() {
        return this.mana * 100 / this.baseMana
    }



    // SAY HELLO METHOD TO CHARACTERS


    sayHello() {
        console.log(`Salut à toi ${this.name}, valeureux ${this.className}, puisse le sort vous être favorable`);
    }

    // INHERITED METHOD TO RENDER DATA OF PARTICULAR INSTANCE TO VIEW

    render() {
        return super.render();
    }



    // INHERITED METHOD TO DISPLAY NOT ENOUGH MANA SENTENCE TO PLAYER

    notEnoughMana(manaCost) {
        console.log(`Vous n'avez pas encore assez de point de mana pour effectuer cette action, il vous manque ${manaCost - this.mana} points de mana`);
    }

    // RETURNING CURRETNT OBJECT
    takeDamage(inflictedDamages) {
        this.hp -= inflictedDamages;
        if (this.hp <= 0) {
            this.hp = 0;
            this.status = "loser";
        }
        return this;
    }

    // RETURNING OPPONENT OBJECT TO CHECK DAMAGES;
    dealDamage(opponentCharacter) {
        let inflictedDamages = this.dmg;
        return inflictedDamages;
    }


    // rendering template card displaying character datas
    render() {
        let { name, className, image, attacks, status } = this;

        if (status == "playing") {
            return `<div class='card' id='${name}-${className}'>

                        <div class='card-body'>
                            <div class='card-front' style='background-image:url(${image});'>
                                <div class='card-characteristics'>
                                    <h5 class="card-title">Nom: <strong>${name}</strong></h5>
                                    <h5 class="card-title">classe: ${className}</h5>
                                </div>
                            </div>
                            <div class='card-back'>
                                ${this.getAttacks().map((e) => {
                                    return `<a class="dropdown-item font-weight-bold bg-light attack" href="#" data='${e}'>${e.toUpperCase()}</a>
                                    ${this.presentAttackCharacteristics(attacks[e])}`
                                })}
                            </div>
                        </div>

                        <div class='card-footer'>

                            <p class="card-text">HP:
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="${this.hpPercentage()}" aria-valuemin="0" aria-valuemax="100" style="width: ${this.hpPercentage()}%"></div>
                                </div>
                            </p>
                            <p class="card-text">MANA:
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="${this.manaPercentage()}" aria-valuemin="0" aria-valuemax="100" style="width: ${this.manaPercentage()}%"></div>
                                </div>
                            </p>
                            <p class="card-text">DEGAT: 
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="${this.dmgPercentage()}" aria-valuemin="0" aria-valuemax="100" style="width: ${this.dmgPercentage()}%"></div>
                                </div>
                            </p>

                        </div>
                    </div>`;
        }
        else if (status == "loser") {

            return `<div class='card ${status}' id='${name}-${className}'>
                        <div class='card-body'>
                            <div class='card-front' style='background-image:url(${image});'>
                                <div class='card-characteristics'>
                                    <h5 class="card-title">Nom: <strong>${name}</strong></h5>
                                    <h5 class="card-title">classe: ${className}</h5>
                                </div>
                            </div>
                            <div class="killed-character">
                                <img src='img/dead_character.png'></div>
                            </div>
                        </div>
                    </div>`;
        }
    }


    presentAttackCharacteristics(attack) {
        let attacksToString = '<ul class="list-group">';
        for (const characteristic in attack) {
            if (attack.hasOwnProperty(characteristic)) {
                attacksToString += `<li class="list-group-item">${characteristic}:${attack[characteristic]}</li>`;
            }
        }

        attacksToString += `</ul>`;

        return attacksToString;
    }





}