const questions = [
    { question: "La principal amenaza que afecta a los osos pandas es la deforestación.", answer: true, explanation: "Hoy en día los osos panda se enfrentan a la deforestación continua." },
    { question: "Los gorilas se originaron en China.", answer: false, explanation: "Se originaron en los bosques y selvas de África central." },
    { question: "El lince íberico se alimenta principalmente de conejo.", answer: true, explanation: "El lince íberico se alimenta del conejo europeo Oryctolagus cuniculus." },
    { question: "Se desconoce el origen exacto del Ajolote.", answer: true, explanation: " Se desconoce el origen exacto del Ajolote, pero se han hecho varias leyendas sobre el mismo." },
    { question: "El oso polar vive principalmente en áreas rocosas.", answer: false, explanation: "Los osos polares viven principalmente en las áreas de hielo marino del Océano Ártico." }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
}
function evaluateAnswer(userAnswer) {
    const questionInfo = questions[currentQuestionIndex];
    const correctAnswer = questionInfo.answer;
    let resultText = "";
    
    if (userAnswer === correctAnswer) {
        resultText = "Correcto!😁 " + questionInfo.explanation;
        correctCount++;
    } else {
        resultText = "Incorrecto!🙁 " + questionInfo.explanation;
        incorrectCount++;
    }

    document.getElementById('result').textContent = resultText;

    setTimeout(() => {
        document.getElementById('result').textContent = "";

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }, 3000); 
}

function endGame() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result').textContent = "Juego Terminado!👏";
    document.getElementById('score').style.display = 'block'; 
    document.getElementById('score').textContent = `Ganaste: ${correctCount} puntos. Perdiste: ${incorrectCount} puntos.`;
    document.getElementById('restart-button').style.display = 'block'; 
}
function goBack() {
    window.history.back();
}
function restartGame() {
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('score').style.display = 'none'; 
    document.getElementById('result').textContent = ""; 
    displayQuestion();
}

window.onload = function() {
    displayQuestion();
    document.getElementById('score').style.display = 'none'; 
};
