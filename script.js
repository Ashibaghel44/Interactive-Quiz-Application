const questions = [{
    question: 'Javascript is an _______ language?',
    options: [
        { text: "Object-oriented", correctAnswer: true },
        { text: "Object-based", correctAnswer: false },
        { text: "Procedural", correctAnswer: false },
        { text: "None of the above", correctAnswer: false }],
},
{
    question: 'What is the capital of France?',
    options: [
        { text: "Paris", correctAnswer: true },
        { text: "London", correctAnswer: false, },
        { text: "Berlin", correctAnswer: false },
        { text: "Madrid", correctAnswer: false }],
},
{
    question: 'Which planet is known as the Red Planet?',
    options: [
        { text: "Mars", correctAnswer: false },
        { text: "Venus", correctAnswer: false },
        { text: "Jupiter", correctAnswer: true },
        { text: "Saturn", correctAnswer: false }],
},
{
    question: 'What is the largest mammal in the world?',
    options: [
        { text: "Elephant", correctAnswer: false },
        { text: "Blue Whale", correctAnswer: true },
        { text: "Giraffe", correctAnswer: false, },
        { text: "Hippopotamus", correctAnswer: false }],
}
];

const questionEle = document.getElementById('questions')
const answerButton = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentIndex = 0;
let score = 0

function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestions();
}
function showQuestions() {
    resetState();
    let currentQuestion = questions[currentIndex];
    let questionNo = currentIndex + 1;
    questionEle.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correctAnswer) {
            button.dataset.correctAnswer = answer.correctAnswer
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correctAnswer === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correctAnswer === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}
function handleNextButton(
) {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionEle.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again"
    nextButton.style.display = "block"
}
nextButton.addEventListener("click", () => {
    if (currentIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})
startQuiz();
