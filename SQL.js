const questions = [
    {
        question: "What is a primary key?",
        answers: [
            { text: "A unique identifier for each record in a database table, ensuring no two rows have the same value in this column.", correct: true},
            { text: "A visual key used primarily in graphical user interfaces to navigate between fields.", correct: false},
            { text: "A special keyword in programming languages to give primary importance to a variable or function.", correct: false},
            { text: "An encryption key that is primarily used before all other keys.", correct: false}
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Sequential Query Language", correct: false},
            { text: "Standard Query List", correct: false},
            { text: "Simple Query Language", correct: false},
            { text: "Structured Query Language", correct: true}
        ]
    },
    {
        question: "Which sentence defines inheritance?",
        answers: [
            { text: "A collection of interconnected web pages designed to display information.", correct: false},
            { text: "A structured set of data held in a computer, especially one that is accessible in various ways.", correct: true},
            { text: "A system used to manage and organize desktop icons and applications.", correct: false},
            { text: "An online platform for social media interaction and content sharing.", correct: false}
        ]
    },
    {
        question: "What is the difference between DDL and DML?",
        answers: [
            { text: "DML (Data Manipulation Language) is used for managing data within schema objects, while DDL (Data Definition Language) is used for defining and modifying the database structure. ", correct: true},
            { text: "DML stands for Database Modeling Language, used for designing database schemas, and DDL stands for Data Deployment Language, used for deploying database changes.", correct: false},
            { text: "DML is used for creating connections to databases, and DDL is used for disconnecting from databases.", correct: false},
            { text: "There is no significant difference; DML and DDL are interchangeable terms used in SQL.", correct: false}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.innerHTML = "Next";
    } else {
        nextButton.innerHTML = "Show score";
    }

    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    const retryButton = document.createElement("button");
    retryButton.innerHTML = "Take the quiz again.";
    retryButton.classList.add("btn");
    retryButton.onclick = function() {
        startQuiz();
    };
    answerButtons.appendChild(retryButton);

    const homeButton = document.createElement("button");
    homeButton.innerHTML = "Back to Home Page";
    homeButton.classList.add("btn");
    homeButton.onclick = function() {
        window.location.href = 'index.html';
    };
    answerButtons.appendChild(homeButton);
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();