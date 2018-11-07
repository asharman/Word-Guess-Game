var currentWordDisplay = document.getElementById("current-word-display");
var guessesLeftDisplay = document.getElementById("guesses-left-display");
var guessedDisplay = document.getElementById("guessed-display");


var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var wordBank = ["espresso", "pour over", "chemex"];
var guessedLetters = [];

function pullWord() {
    // Select random word from wordBank and assign it to current word
    var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    return currentWord;
}

//Splits the current word up into an array of each character
// Loop over the selected word and fill an array with each letter
function wordSplit(currentWord) {
    var currentWordArray = [];

    for (let i = 0; i < currentWord.length; i++) {
        currentWordArray.push(currentWord.charAt(i));
    }
    var hiddenWord = hideWord(currentWordArray);
    return hiddenWord;
}

function hideWord(currentWordArray) {
    var hiddenWord = "";
    for (i = 0; i < currentWordArray.length; i++) {
        if (currentWordArray[i] === " ") {
            hiddenWord += " ";
        } else {
            hiddenWord += "_ ";
        }
    }
    return hiddenWord;
}

document.onkeyup = function(event) {
    var input = event.key.toLocaleLowerCase();

    if (alphabet.indexOf(input) >= 0) {
        console.log(`You typed an appropriate character!`);
        if (guessedLetters.indexOf(input) == -1) {
            
        }        
    } else {
        console.log(`Character is not valid...`);
        
    }
}


var currentWord = pullWord();
var hiddenWord = wordSplit(currentWord); 
console.log(`${currentWord}`);
console.log(`${hiddenWord}`);


