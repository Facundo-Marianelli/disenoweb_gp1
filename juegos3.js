const cardsArray = [
    { name: 'buitre', img: 'assets/j3_gorila.png' },
    { name: 'koala', img: 'assets/j3_lince.png' },
    { name: 'lince', img: 'assets/j3_oso.png' },
    { name: 'tigre', img: 'assets/j3_panda.png' },
];

let gameGrid;
let game = document.querySelector('.memory-game');
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

function initializeGame() {
    game.innerHTML = '';
    gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name;

        const front = document.createElement('img');
        front.classList.add('front');
        front.src = item.img;

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);
        game.appendChild(card);
    });
}

function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });

    // Verificar si el juego ha terminado
    if (document.querySelectorAll('.match').length === gameGrid.length) {
        setTimeout(() => {
            document.getElementById('reset-button').style.display = 'block';
        }, delay);
    }
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
}

game.addEventListener('click', event => {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    initializeGame();
    document.getElementById('reset-button').style.display = 'none';
});

// Inicializar el juego al cargar la página
initializeGame();

// Inicializar el juego al cargar la página
initializeGame();

