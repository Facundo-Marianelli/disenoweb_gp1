const questions = [
    {
        question: "¿Cuál de estos animales está en peligro crítico de extinción?",
        image: "assets/preg1.jpeg",
        answers: [
            { text: "Panda gigante", correct: false },
            { text: "Rinoceronte de Java", correct: true },
            { text: "Tigre de Bengala", correct: false },
            { text: "Elefante africano", correct: false }
        ]
    },
    {
        question: "¿Cuál es una de las principales amenazas para los osos polares?",
        image: "assets/preg2.jpeg",
        answers: [
            { text: "Cambio climático", correct: true },
            { text: "Caza furtiva", correct: false },
            { text: "Deforestación", correct: false },
            { text: "Contaminación", correct: false }
        ]
    },
    {
        question: "¿Qué animal marino está en peligro debido a la contaminación plástica?",
        image: "assets/preg3.jpeg",
        answers: [
            { text: "Tortuga marina", correct: true },
            { text: "Delfín", correct: false },
            { text: "Tiburón", correct: false },
            { text: "Pulpo", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

$(document).ready(function(){
    $('.carousel').carousel({
        interval: 3000 
    });
});

const introContainer = document.getElementById('intro-container');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("sugerencias");
    var span = document.getElementsByClassName("close")[0];
    var form = document.getElementById("sugerenciasForm");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(form);
        var nombre = formData.get('nombre');
        var email = formData.get('email');
        var mensaje = formData.get('mensaje');
        

        console.log("Nombre:", nombre);
        console.log("Email:", email);
        console.log("Mensaje:", mensaje);
        
        
        alert("Formulario enviado con éxito");
        modal.style.display = "none";
    });
});



restartButton.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    introContainer.classList.remove('hidden');
    suggestionsForm.classList.add('hidden');
});

startButton.addEventListener('click', startGame);

function startGame() {
    introContainer.classList.add('hidden');
    

    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    
    document.querySelector("footer").style.display = "none";

    showQuestion();

}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Imagen de ${currentQuestion.question}"><p>${currentQuestion.question}</p>`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            btn.style.backgroundColor = correct ? 'green' : 'red';
        }
    });
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    

    resultText.textContent = `Tu puntuación fue ${score} de ${questions.length}`;

    document.querySelector("footer").style.display = "block";
}

function restartGame() {
    resultContainer.classList.add('hidden');
    introContainer.classList.remove('hidden');


    document.querySelector("footer").style.display = "block";
}

restartButton.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    introContainer.classList.remove('hidden');
});

introContainer.classList.remove('hidden');
quizContainer.classList.add('hidden');
resultContainer.classList.add('hidden');
