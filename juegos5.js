const words = [
    { word: "buitre", hint: "Ave en peligro de extinción." },
    { word: "caza", hint: "Es la causa de peligro de extinción del tigre de Sumatra." },
    { word: "chimpance", hint: "Mamífero en peligro de extinsión a causa de la minería, ganadería y tala." },
    { word: "huemul", hint: "Animal que habita la cordillera patagónica en peligro." },
    { word: "pinguino", hint: "Animal en peligro de extinción por el cambio climático" }
];

let selectedWord = '';
let selectedHint = '';
let wordDisplay = [];
let wrongGuesses = [];
let livesLeft = 6;

const wordToGuessElement = document.getElementById('wordToGuess');
const hintElement = document.getElementById('hint');
const buttonsElement = document.getElementById('buttons');
const wrongGuessesElement = document.getElementById('wrongGuesses');
const livesLeftElement = document.getElementById('livesLeft');
const resetButton = document.getElementById('resetButton');

function selectRandomWord() {
    const randomWordObj = words[Math.floor(Math.random() * words.length)];
    selectedWord = randomWordObj.word;
    selectedHint = randomWordObj.hint;
    wordDisplay = Array(selectedWord.length).fill('_');
    wordToGuessElement.textContent = wordDisplay.join(' ');
    hintElement.textContent = "Pista: " + selectedHint;
}

function createButtons() {
    buttonsElement.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = String.fromCharCode(i);
        button.addEventListener('click', handleGuess);
        buttonsElement.appendChild(button);
    }
}

function handleGuess(event) {
    const guessedLetter = event.target.textContent.toLowerCase();
    event.target.disabled = true;

    if (selectedWord.includes(guessedLetter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter) {
                wordDisplay[i] = guessedLetter;
            }
        }
        wordToGuessElement.textContent = wordDisplay.join(' ');
    } else {
        wrongGuesses.push(guessedLetter);
        wrongGuessesElement.textContent = wrongGuesses.join(', ');
        livesLeft--;
        livesLeftElement.textContent = livesLeft;
    }

    checkGameStatus();
}

function checkGameStatus() {
    if (livesLeft === 0) {
        alert('Fin del juego! La palabra era: ' + selectedWord);
        disableAllButtons();
    } else if (!wordDisplay.includes('_')) {
        alert('Felicitacones! Adivinaste la palabra: ' + selectedWord);
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = buttonsElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function resetGame() {
    livesLeft = 6;
    wrongGuesses = [];
    wrongGuessesElement.textContent = '';
    livesLeftElement.textContent = livesLeft;
    selectRandomWord();
    createButtons();
}

resetButton.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});