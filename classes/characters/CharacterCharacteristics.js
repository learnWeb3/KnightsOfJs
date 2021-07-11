class CharacterCharacteristics {
    constructor(className) {
            this._className = capitalize(className);
            this._template = this.makeTemplate(capitalize(className))
    }

    get className() {
            return this._className;
    }
    set className(className) {
            return this._className = className;
    }

    get template() {
            return this._template;
    }

    set template(template) {
            return this._template = template
    }


    makeTemplate(className) {

            if (className == 'Assassin') {
                    return ` <li class="list-group-item bg-danger text-white">VIE: 6</li>
                    <li class="list-group-item bg-info text-white">MANA: 20</li>
                    <li class="list-group-item bg-warning text-dark">DOMMAGE: 6</li>`;
            }
            else if (className == 'Berzerker') {
                    return ` <li class="list-group-item bg-danger text-white">VIE: 8</li>
                    <li class="list-group-item bg-info text-white">MANA: 0</li>
                    <li class="list-group-item bg-warning text-dark">DOMMAGE: 4</li>`;
            }
            else if (className == 'Fighter') {
                    return ` <li class="list-group-item bg-danger text-white">VIE: 12</li>
                    <li class="list-group-item bg-info text-white">MANA: 40</li>
                    <li class="list-group-item bg-warning text-dark">DOMMAGE: 15</li>`;
            }
            else if (className == 'Monk') {
                    return ` <li class="list-group-item bg-danger text-white">VIE: 8</li>
                    <li class="list-group-item bg-info text-white">MANA: 200</li>
                    <li class="list-group-item bg-warning text-dark">DOMMAGE: 2</li>`;
            }
            else if (className == 'Paladin') {
                    return ` <li class="list-group-item bg-danger text-white">VIE: 16</li>
                    <li class="list-group-item bg-info text-white">MANA: 160</li>
                    <li class="list-group-item bg-warning text-dark">DOMMAGE: 3</li>`;
            }
            else if (className == 'Wizard') {
                return ` <li class="list-group-item bg-danger text-white">VIE: 10</li>
                <li class="list-group-item bg-info text-white">MANA: 200</li>
                <li class="list-group-item bg-warning text-dark">DOMMAGE: 2</li>`;
            }
            else {
                    return `<li class="list-group-item bg-primary text-white">La classe demandée n'existe pas</li>`;
            }
    }

    appendTemplate(playerType) {

            let characterName = document.getElementById(`character-name-group-${playerType}`);
            if (characterName != null) {
                    characterName.remove();
            }
            document.getElementById(`class-skills-${playerType}`).innerHTML = this.template;
            let divFormGroup = document.createElement(`div`);
            divFormGroup.setAttribute(`class`, `form-group`);
            divFormGroup.setAttribute(`id`, `character-name-group-${playerType}`)
            divFormGroup.innerHTML = `<label for="character-name-${playerType}" id="character-name-label-${playerType}">Nom de votre personnage</label>
            <input type="text" class="form-control" id="character-name-${playerType}" name="character-name">`
            document.getElementById(`form-character-gen-${playerType}`).appendChild(divFormGroup);
    }




}