var currentWordDisplay = document.getElementById("current-word-display");
var guessesLeftDisplay = document.getElementById("guesses-left-display");
var guessedDisplay = document.getElementById("guessed-display");

var guessedLetters = [];

var game = {
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    wordBank: ["espresso", "pour over", "chemex"],
    guessedLetters: [],
    currentWord: "",
    currentWordArray: [],
    hiddenWord: "",
    // Select random word from wordBank and assign it to current word
    pullWord: function () {
        this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.wordSplit(this.currentWord);
    },
    //Splits the current word up into an array of each character
    wordSplit: function (word) {
        for (i = 0; i < word.length; i++) {
            this.currentWordArray.push(word.charAt(i));
        }

        this.hideWord(this.currentWordArray);
    },
    // Creates a string that replaces every element in an array with an underscore
    hideWord: function (array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === " ") {
                this.hiddenWord += "  ";
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
    },
}


game.pullWord();
console.log(`${game.currentWord}`);
console.log(`${game.currentWordArray}`);
console.log(`${game.hiddenWord}`);

document.onkeyup = function (event) {
    var input = event.key.toLowerCase();


    if (game.alphabet.indexOf(input) >= 0) {
        console.log(`You typed an appropriate character!`);
        if (guessedLetters.indexOf(input) == -1) {
            console.log(`You haven't guessed this letter!`);
            if (game.currentWordArray.indexOf(input) >= 0) {
                console.log(`This letter is in your word!`);

            } else {
                console.log(`This letter is not in your word`);
                guessedLetters.push(input);
            }

        } else {
            console.log(`You've already guessed this letter`);
        }
    } else {
        console.log(`Character is not valid...`);

    }
}





