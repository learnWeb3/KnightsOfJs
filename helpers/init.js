// selecting select input for choice of character class TEAMMATES
const selectCharactersTeamMates =
{
        selectMarkup: document.getElementById("select-characters-teamMates"),
        playerType: "teamMates"
};
// selecting select input for choice of character class ENNEMIES
const selectCharactersEnnemies =
{
        selectMarkup: document.getElementById("select-characters-ennemies"),
        playerType: "ennemies"
};


// selecting form markup to add event on submit on it later on
const formTeamMates =
{
        formMarkup: document.getElementById("form-character-gen-teamMates"),
        playerType: "teamMates"
};
const formEnnemies =
{
        formMarkup: document.getElementById("form-character-gen-ennemies"),
        playerType: "ennemies"
};


// GROUPED AS ARRAY IN ORDER TO LOOP THROUGH IT
const formsCharacterCreation = [formTeamMates, formEnnemies];
const selectCharacters = [selectCharactersTeamMates, selectCharactersEnnemies];

// instantiating characterFactory class to access methods
const characterCreation = new CharacterFactory();

//adding event listener on "change" of selected option in select input
selectCharacters.map((obj) => {
        obj.selectMarkup.addEventListener('change', function (event) {
                // instantiating charcaterCharacteristics class which deals with display and update of div showing up the class charcateristics
                let characterSettings = new CharacterCharacteristics(event.target.value);
                // appending template on change 
                characterSettings.appendTemplate(obj.playerType);
        });
})

// adding event submit on form to instantiate correct classes based on user inputs aka classe type and player name
formsCharacterCreation.map((obj) => {
        obj.formMarkup.addEventListener('submit', function (event) {
                event.preventDefault();
                // selecting character name input
                let characterNameInput = document.getElementById(`character-name-${obj.playerType}`);
                // getting value
                let characterName = characterNameInput.value;
                // capitalizing it
                let characterType = capitalize(selectCharacters.filter((e)=>{
                       return e.playerType == obj.playerType;
                })[0].selectMarkup.value);

                // initializing new variable which will store the new instance of the correct classe based on the analysis of the input
                let newCharacter;
                // conditions to analize inputs
                if (characterType == 'Assassin') {
                        newCharacter = new Assassin(characterName)
                }
                else if (characterType == 'Berzerker') {
                        newCharacter = new Berzerker(characterName)
                }
                else if (characterType == 'Fighter') {
                        newCharacter = new Fighter(characterName)
                }
                else if (characterType == 'Monk') {
                        newCharacter = new Monk(characterName)
                }
                else if (characterType == 'Paladin') {
                        newCharacter = new Paladin(characterName);
                }
                else if (characterType == 'Wizard') {
                        newCharacter = new Wizard(characterName);
                }
                // addingPlayer to array of ennemies || teamMates
                if (obj.playerType == 'ennemies') {
                        characterCreation.addEnnemi(newCharacter);
                } else if (obj.playerType == "teamMates") {
                        characterCreation.addTeamMate(newCharacter);
                }

                // displaying  card to users to show him what he will deals with during the game
                let cardContainer = `fighters-${obj.playerType}`;
                characterCreation.displayChoosenPlayers(cardContainer, obj.playerType);
                // selecting cards 
                let cards = document.getElementsByClassName('card');



        });

});

const launchGame = document.getElementById("lauch-game");

launchGame.addEventListener('click', function(event){

        
        event.preventDefault();

        if (characterCreation.ennemies.length == characterCreation.teamMates.length && characterCreation.ennemies.length > 0)
        {
                const GAME = new Game(characterCreation.teamMates, characterCreation.ennemies);
                GAME.removeCharactersChoiceForms();
                GAME.appendInGameBoard();
                GAME.welcomePlayers();
                GAME.listenAttackClick();
        }else{
             Game.playerNumberAlert(characterCreation.teamMates, characterCreation.ennemies);
        }
})
