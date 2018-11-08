// Global Variables that hook into HTML Document ========================================================================== ===========================================================================================================================

var currentWordDisplay = document.getElementById("current-word-display");
var guessesLeftDisplay = document.getElementById("guesses-left-display");
var guessedDisplay = document.getElementById("guessed-display");
var winsDisplay = document.getElementById("w");
var lossesDisplay = document.getElementById("l");

// The main game object ===================================================================================================
// ========================================================================================================================

var game = {
    // An array of characters that the user can only input
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    // All possible words that can be selected randomly
    wordBank: ["espresso", "pour over", "chemex"],
    // An array that fills as the user guesses characters to prevent them from guessing the same character twice
    guessedLetters: [],
    // An array that displays to the user every character that was guessed incorrectly when the length reaches a specified number the user loses
    incorrectLetters: [],
    // This string gets assigned to a word that is randomly chosen from the wordBank array
    currentWord: "",
    // This array is filled with every character that is in currentWord as the user guesses letters in this array they are removed
    // When the array is empty the user wins
    currentWordArray: [],
    // A copy of currentWordArray, but this array's elements never get removed. This is used to update the hidden word string to display to the user
    // as they guess correct characters
    revealWordArray: [],
    // A string that is displayed to the user that reveals what correct letters they've guessed and hides the one's they have with "_ "
    hiddenWord: "",
    // Wins and loss counters to keep track of score
    wins: 0,
    losses: 0,

    // Select random word from wordBank and assign it to current word
    pullWord: function () {
        this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.wordSplit(this.currentWord);

    },

    //Splits the current word up into an array of each character
    wordSplit: function (word) {
        for (i = 0; i < word.length; i++) {
            this.currentWordArray.push(word.charAt(i));
            this.revealWordArray.push(word.charAt(i));
        }

        this.hideWord(this.currentWordArray);
    },

    // Creates a string that replaces every element that is not a " " in an array with an underscore
    hideWord: function (array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === " ") {
                this.hiddenWord += " ";
            } else {
                this.hiddenWord += "_ ";
            }
        }

        // Deletes every space element in currentWordArray so the game doesn't expect you to guess the space
        for (let i = array.length - 1; i >= 0, i--;) {
            if (array[i] === " ") {
                array.splice(i, 1);
            }
        }
        this.currentWordArray = array;

        //Display the hidden word to the user and how many guesses they have remaining as well as updating the score
        //This is placed at the end of the chain of functions so that it gets executed after the game starts
        currentWordDisplay.innerHTML = game.hiddenWord;
        guessesLeftDisplay.innerHTML = (10 - game.incorrectLetters.length);
        updateScore();
    },

    // Loop over the hidden word string and convert it to an array of "_" and " " elements and compares it to the revealWordArray
    // Checks what index the user's input is in revealWordArray and replaces the underscore at that index in hiddenWord with the user input
    revealLetter: function (x) {

        // Split the string into an array
        let array = this.hiddenWord.split(" ");

        // Loop over new array
        for (let i = array.length - 1; i >= 0; i--) {

            // Check if the current index of revealWordArray equals the user's input
            if (this.revealWordArray[i] === x) {

                //If it does the replace the underscore at the same index with the user input
                array.splice(i, 1, x);

            }
        }

        // Convert the hiddenWord array back to a string
        this.hiddenWord = array.join(" ");

    },

    //Resets the game's properties back to empty to set up for a new game and then start the new game
    reset: function () {
        this.guessedLetters = [];
        this.incorrectLetters = [];
        this.currentWord = "";
        this.currentWordArray = [];
        this.revealWordArray = [];
        this.hiddenWord = "";
        this.pullWord();
    }
}

// Displays the current wins and losses to the user
function updateScore() {
    winsDisplay.innerHTML = game.wins;
    lossesDisplay.innerHTML = game.losses;
}

// Main Game Logic =================================================================================================================================
// =================================================================================================================================================

//Start the game
game.pullWord();

console.log(`${game.currentWord}`);

// Checks when a key is pressed then executes the function
document.onkeyup = function (event) {

    //Assigns the what key was pressed to "input"
    var input = event.key.toLowerCase();

    //Check if the input is in the array of approved characters
    if (game.alphabet.indexOf(input) >= 0) {

        // Then Check if the input is NOT in the array of already guessed characters
        if (game.guessedLetters.indexOf(input) == -1) {

            // Then check if the input is in the currentWordArray, if it is then that character is correct
            if (game.currentWordArray.indexOf(input) >= 0) {

                // Reveal the character in the hiddenWord string and add it to the array of guessed characters
                game.revealLetter(input);
                game.guessedLetters.push(input);

                // Loop through the currentWordArray and remove any and all instances of that character
                for (let i = game.currentWordArray.length; i >= 0; i--) {
                    if (game.currentWordArray[i] === input) {
                        game.currentWordArray.splice(i, 1);
                    }
                }
            
            // If the character is not in the currentWordArray the add it to the array of guessed characters and the array of incorrectly guessed characters and display the number of remaining guesses the user has
            } else {
                game.guessedLetters.push(input);
                game.incorrectLetters.push(input);
                guessesLeftDisplay.innerHTML = (10 - game.incorrectLetters.length);
            }


        }

        // Check if there are any characters left to guess in the currentWordArray
        if (game.currentWordArray.length === 0) {
            // Tell the user they won, add 1 to the wins score, and reset the game
            alert(`You win!`);
            game.wins++
            game.reset();

        // Check if the array of incorrect guesses is 10 characters long
        } else if (game.incorrectLetters.length === 10) {
            // Tell the user they lost, add 1 to the losses score, and reset the game
            alert(`You have lost...`);
            game.losses++
            game.reset();
        }

        // Update the hiddenWord string, incorrect guess array, and score displays
        currentWordDisplay.innerHTML = game.hiddenWord;
        guessedDisplay.innerHTML = game.incorrectLetters;
        updateScore();
    }
}





