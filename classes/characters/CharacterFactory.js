
class CharacterFactory {

        constructor() {
                this._ennemies = [];
                this._teamMates = [];
        }

        get ennemies() {
                return this._ennemies;
        }

        get teamMates() {
                return this._teamMates;
        }

        set ennemies(ennemies) {
                return this._ennemies = ennemies;
        }

        set teamMates(teamMates) {
                return this._teamMates = teamMates;
        }


        addEnnemi(ennemi) {
                let ennemies = this.ennemies;
                ennemies.push(ennemi);
                return this.ennemies = ennemies;
        }

        addTeamMate(teamMate) {
                let teamMates = this.teamMates;
                teamMates.push(teamMate);
                return this.teamMates = teamMates;
        }


        displayChoosenPlayers(cardContainer, playerType) {

                // targeting container to display card of choosen fighter

                let cardcontainerChildrens = Array.from(document.querySelectorAll(`#${cardContainer} .card`));

                cardContainer = document.querySelectorAll(`#${cardContainer}`)[0];


                if (cardcontainerChildrens.length > 0) {

                        cardcontainerChildrens.map((e) => {
                                e.remove();
                        });
                }

                let playerGroup;

                if (playerType == "ennemies") {
                        playerGroup = this.ennemies;

                } else if (playerType == "teamMates") {

                        playerGroup = this.teamMates;
                }

                playerGroup.map((e) => {


                        let card = document.createElement('div');
                        card.setAttribute('class', 'card');
                        card.setAttribute('style', `background-image:url(${e.image});background-size:cover;background-position:top;`)
                        card.innerHTML = this.getCardTemplate(e);
                        cardContainer.appendChild(card);


                        let self = this;

                        card.addEventListener('click', function (event) {
                                event.preventDefault();

                                if (event.target.className.split(' ').includes('delete')) {
                                        playerType = this.parentNode.getAttribute('data')
                                        let clickedPlayerName = this.childNodes[0].childNodes[1].childNodes[1].innerHTML;
                                        this.remove();
                                        self.deletePlayer(clickedPlayerName, playerType);
                                        self.updatePlayerCount(playerType)
                                }


                        });

                });

                this.updatePlayerCount(playerType)
        }

        // DELETING PLAYER BY ITS NAME IN THE CORRECT GROUP OF PLAYER
        deletePlayer(clickedPlayerName, playerType) {

                if (playerType == "ennemies") {
                        this.ennemies = this.ennemies.filter((e) => {
                                return e.name != clickedPlayerName
                        })

                } else if (playerType == "teamMates")

                        return this.teamMates = this.teamMates.filter((e) => {
                                return e.name != clickedPlayerName
                        });


        }


        updatePlayerCount(playerType) {
                let playerCount;

                if (playerType == "ennemies") {
                        playerCount = this.ennemies.length;

                } else if (playerType == "teamMates") {
                        playerCount = this.teamMates.length;
                }
                document.querySelector(`#fighters-container-${playerType} .player-count`).innerHTML = `(${playerCount} personnages)`;

        }

        getCardTemplate(player) {
                let { name, className, hp, mana, dmg, image } = player;
                return `<div class="card-body" style="background-color:rgba(255,255,255,.66)">
                        <h5 class="card-title">Nom: <strong>${name}</strong></h5>
                        <h5 class="card-title">classe: ${className}</h5>
                        <p class="card-text">HP: ${hp}</p>
                        <p class="card-text">MANA: ${mana}</p>
                        <p class="card-text">DEGAT: ${dmg}</p>
                        <a href="#" class="btn btn-danger delete">Supprimer</a>
                   </div>`
        }

}