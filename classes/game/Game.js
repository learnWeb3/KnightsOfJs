


// Grace sera le personnage de la classe Fighter
// Ulder sera le personnage de la classe Paladin
// Moana sera le personnage de la classe Monk
// Draven sera le personnage de la classe Draven
// Carl sera le personnage de la classe Carl



class Game {
    constructor(teamMates, ennemies) {
        this._teamMates = teamMates;
        this._ennemies = ennemies;
        this._characters = this.ennemies.concat(this.teamMates);
    }

    // ENNEMIES
    get ennemies() {
        return this._ennemies;
    }

    set ennemies(ennemies) {
        return this._ennemies = ennemies
    }

    // TEAMATES
    get teamMates() {
        return this._teamMates;
    }

    set teamMates(teamMates) {
        return this._teamMates = teamMates;
    }


    // CHARACTERS
    get characters() {
        return this._characters;
    }

    set characters(characters) {
        return this._characters = characters;
    }


    // getting alive characters by filtering out characetrs by status which does not match 'playing' status
    getAliveCharacters() {
        return this.characters.filter((e) => {
            return (e.status == 'playing');
        });
    }

    // sentence wichi is displayed by auto type function in prompt-actions during the game after an attack has been made
    showAttackResult(attack, opponent) {
        console.log(`${attack.name} is attacking ${opponent.name}. He deals him ${attack.dmg} damages. ${opponent.name} got ${opponent.hp} lifepoints left.`)
    }

    // removing main to construct ingame view
    removeCharactersChoiceForms() {
        document.querySelector('main').remove()
    }

    // updating board after an attck has been done to display status and various characetristics of player according their new states
    updateGameBoard() {
        $("#teamMates .card").remove();
        $("#ennemies .card").remove();

        this.ennemies.map((e) => {
            $("#ennemies").append(e.render());
        });

        this.teamMates.map((e) => {
            $("#teamMates").append(e.render());
        });

        this.listenAttackClick();
    }

    // constructing in game view 
    appendInGameBoard() {

        $('body').removeClass('bg-classic').addClass('bg-arena')
        let main = document.createElement('main');
        main.setAttribute('class', 'container-fluid');

        let characterContainer = document.createElement('div')
        characterContainer.setAttribute('class', 'row col-12 p-4');
        characterContainer.setAttribute('style', 'max-height:75vh;overflow:auto');

        let colTeamMates = document.createElement('div')
        colTeamMates.setAttribute('class', 'col');
        colTeamMates.setAttribute('id', 'teamMates')

        let colEnnemies = document.createElement('div');
        colEnnemies.setAttribute('class', 'col');
        colEnnemies.setAttribute('id', 'ennemies');


        let prompterActionContainer = document.createElement('div');

        prompterActionContainer.setAttribute('class', 'row col-12 p-4');
        prompterActionContainer.setAttribute('id', 'prompter-actions')

        // calling character render methods to display their attributes
        colTeamMates.innerHTML =
            `${this.teamMates.map((e) => {
                return e.render();
            })}`

        // calling character render methods to display their attributes
        colEnnemies.innerHTML =
            `${this.ennemies.map((e) => {
                return e.render();
            })}`

        characterContainer.appendChild(colTeamMates);
        characterContainer.appendChild(colEnnemies);


        [characterContainer, prompterActionContainer].map((e) => {
            main.appendChild(e);

        })

        document.querySelector('body').appendChild(main)
    }

    // appending modal with form select of opponent to choose target of an attack
    appendModalOpponentChoice() {

        let modalContent;


        modalContent =
            `<div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Choisir votre cible</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" method="post" id="form-opponent-choice">

                        <div class='form-group'>
                            <select class='form-control' id='opponent-select' name='opponent-select'>
                                ${this.ennemies.concat(this.teamMates).map((e) => {
                return `<option value='${e.name}'>${e.name}</option>`
            })}
                            </select>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                        <button type="submit" form="form-opponent-choice" class="btn btn-success">valider</button>
                </div>
            </div>
        </div>`

        let modal;
        if (document.querySelector('.modal') == null) {
            modal = document.createElement('div');
        } else {
            modal = document.querySelector('.modal')
        }
        modal.setAttribute('class', 'modal');
        modal.innerHTML = modalContent;
        document.querySelector('main').appendChild(modal);

        $('.modal').modal('show');

        $('.modal .btn.btn-success').click(function () {
            $("#form-opponent-choice").submit();
            $('.modal #close').click();
        })

    }



    // listening click aka new attack after player has chosen the attack he wanted to perform
    listenAttackClick() {

        let self = this;
        document.addEventListener('click', function (event) {


            event.preventDefault()
            event.stopPropagation();

            let clickedDiv = event.target

            if (clickedDiv.className.split(' ').includes('attack')) {


                let attackName = clickedDiv.getAttribute('data');
                let playerName = $(clickedDiv).parents('.card-body').find('.card-title strong').text();

                let playerType = $(clickedDiv).parents('.col').attr('id');


                self.appendModalOpponentChoice(playerType);


                $('#form-opponent-choice').submit(function (event) {
                    event.preventDefault();
                    let opponentName = $('#opponent-select').val();

                    let opponentObj = self.findOpponentByName(opponentName);
                    let playerObj = self.findOpponentByName(playerName);

                    self.executeAttack(playerObj, opponentObj, attackName)

                })

            }
        })
    }

    // finding opponent by name by filtering out players not ùatching the name searched
    findOpponentByName(opponentName) {

        let player = this.characters.filter((e) => {
            return (e.name == opponentName)
        });

        return player[0];

    }

    // performing the attack according user input through select form
    executeAttack(playerObj, opponentObj, attackName) {


        let inflictedDamages;
        switch (attackName) {
            case 'dealDamage':

                inflictedDamages = playerObj.dealDamage(opponentObj)

                break;
            case 'shadowHit':

                inflictedDamages = playerObj.shadowHit(opponentObj)

                break;
            case 'rage':

                inflictedDamages = playerObj.rage(opponentObj)

                break;
            case 'darkVision':

                inflictedDamages = playerObj.darkVision(opponentObj)

                break;
            case 'heal':

                inflictedDamages = playerObj.heal(opponentObj)

                break;
            case 'healingLighting':

                inflictedDamages = playerObj.healingLighting(opponentObj)

                break;
            case 'fireball':

                inflictedDamages = playerObj.fireball(opponentObj)

                break;

            default:
                break;
        }

        opponentObj.takeDamage(inflictedDamages);

        console.log(opponentObj);

        this.promptMessage(`${playerObj.name} is attacking ${opponentObj.name}, attaks succeeds and ${playerObj.name} inflicts ${opponentObj.name} ${inflictedDamages} damage points. ${opponentObj.name} has ${opponentObj.hp} HP left`)

    }

    // methdo to display stats
    watchStats() {
        let prompterSentence = '';
        prompterSentence += this.characters.map((e) => {
            let { name, hp, dmg, mana, status } = e;
            return ` ${name} has a status of ${status} and has ${hp} life points left.\nHe can attack with his basic attacks causing ${dmg} damage points to his ennemis.\nHe has ${mana} MANA.`;
        });

        return prompterSentence;

    }



    // DEALING WITH END OF GAME 

    // CHECK IF ONE PLAYER IS STILL LIVING TO ATTRBUTE VICTORY
    checkEndOfGame() {

        let playingCharacters = this.characters.filter((e) => {
            return (e.status == 'playing');
        });

        if (playingCharacters.length > 1) {
            return false;
        } else {
            return true;
        }
    }

    // UDPATING WINNER STATUS OF LAST SURVIVAL PLAYER
    updateWinnerStatus() {

        let playingCharacters = this.characters.filter((e) => {
            return (e.status == 'playing')
        });

        playingCharacters.map((e) => {
            e.status = 'Winner';
        });

        return playingCharacters[0]
    }


    // LOOKING FOR NAME OF SIDE WHERE THE LAST PLAYER IS STILL LIVING
    findWinnerSide(winner)
    {

       let ennemiesNames =  this.ennemies.map((e)=>{
            return e.name;
        });

        let teamMatesNames = this.teamMates.map((e)=>{
            return e.name;
        });
        if (teamMatesNames.includes(winner.name))
        {
            return "teamMates";
        }else{
            return "ennemies"
        }
    }

    welcomeEnnemies(){

        let sentence='';
        this.ennemies.map((ennemy)=>{
            let {name, className} = ennemy;
            let message = `Welcome to ${name} a ${className} FROM the ennemies side. `

            sentence+=message;
            

        });

       return sentence

    }

    welcomeTeamMates()
    {

        let sentence='';
        this.teamMates.map((teamMate)=>{
            let {name, className} = teamMate;
            let message = `Welcome to ${name} a ${className} FROM the teamMates side. `

            sentence+=message
        });

        return sentence;

    }


    welcomePlayers()
    {
        let sentence = this.welcomeEnnemies() + " " + this.welcomeTeamMates();

        this.promptMessage(sentence);
    }





    // STATIC METHODS


    // ALERT DISPLAYED ON FIRST SCREEN WHEN CHOOSING PLAYERS TO HAVE EQUAL TEAMS IN NUMBER AND NO GAME LAUNCHED WITHOUT ANY PLAYERS
    static playerNumberAlert(teamMates, ennemies) {
        let messages =
            [
                `Vous n'avez que ${teamMates.length} personnage(s) dans votre équipe et ${ennemies.length} adversaire(s). <br> Pour commencer à jouer veuillez composer des équipe de taille identiques.`,
                `Le nombre de joueurs dans chacune des équipe doit être supérieur à 0`
            ];
        let type = 'info';
        let alert = new Alert(messages, type);
        document.querySelector('main').appendChild(alert.appendTemplate());
    }


    // DELAING WITH INSERTING MESSAGE IN PROMPTER-ACTIONS DURING THE GAME DISPLAYING THE ATTACKS OF THE CHARCATERS
    promptMessage(message) {

        self = this;
        var i = 0;
        var txt = message;
        var speed = 50;
        document.getElementById("prompter-actions").innerHTML = "";

        const typeWriter = () => {
            if (i < txt.length) {
                document.getElementById("prompter-actions").innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
            if (i == txt.length)
            {
                // updating board at end of the prompt auto type with new data for characters
                self.updateGameBoard();
                // checking end of game aka one last standing characetr
                if (self.checkEndOfGame())
                {
                    // updating winner status
                    let winner = self.updateWinnerStatus();
                    // find winner side 
                    let winnerSide = self.findWinnerSide(winner);
                    // passing last two gathered informations to method to display victory TO BE BEAUTIFIED WITH ANIMATIONS
                    self.displayVictory(winnerSide,winner);
                }
                
            }
        }

        typeWriter();

    }


    // DISPLAYING VICTROY SCREEN
    displayVictory(winnerSide,winner)
    {

        $('main').css({
            'display': 'flex',
            'flex-direction':'column',
            'justify-content': 'center',
            'align-items': 'center'
        })
        
        $('main').html(`

            <h1>VICTORY FOR ${winnerSide} THANKS TO ${winner.name}</h1>


            <a href="#" class="btn btn-lg btn-success col-8 my-4" id="new-game">NOUVELLE PARTIE</a>
        
        `);

        $("#new-game").click(function(event){
            event.preventDefault();
            location.reload();
        })
    }

}






