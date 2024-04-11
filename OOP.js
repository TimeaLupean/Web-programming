const questions = [
    {
        question: "Which characteristics are suitable for an abstract class?",
        answers: [
            { text: "An abstract class can not be instantiated and it is forbidden for it to have a constructor", correct: false},
            { text: "An abstract class can not be instantiated. It is possible for an abstract class to contain both attributes and methods", correct: true},
            { text: "Abstract classes are the same as interfaces.", correct: false},
            { text: "Abstract classes can not be instantiated and they have only virtual methods, which enable abstraction.", correct: false}
        ]
    },
    {
        question: "What does OOP stand for?",
        answers: [
            { text: "Object Oriented Paradigm", correct: false},
            { text: "Outstanding Object Protocol", correct: false},
            { text: "Online Operation Processing", correct: false},
            { text: "Object Oriented Programming", correct: true}
        ]
    },
    {
        question: "Which sentence defines inheritance?",
        answers: [
            { text: "A programming feature that isolates individual features in a standalone module", correct: false},
            { text: "The process of optimizing ode to run more efficiently", correct: false},
            { text: "A concept where a class acquires the properties and behaviors of another class", correct: true},
            { text: "The practice of copying code from one part of the program to another", correct: false}
        ]
    },
    {
        question: "Which sentence describes method overriding?",
        answers: [
            { text: "Creating a method in a child class with the same name and parameters as a method in the parent class, allowing the child class to provide its own implementation.", correct: true},
            { text: "Increasing the efficiency of a method by changing its algorithm while keeping its functionality the same.", correct: false},
            { text: "Extending the functionality of a method by adding new parameters to it.", correct: false},
            { text: "Copying the behavior of a method from one class to another unrelated class.", correct: false}
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
        window.location.href = 'homePage.html';
    };
    answerButtons.appendChild(homeButton);

    updateUserScore(score);

}


const userId = firebase.auth().currentUser.uid;

const db = firebase.firestore();
const userScoresCollection = db.collection('userScores');

function updateUserScore(score) {

    userScoresCollection.doc(userId).set({
        score: score
    }, { merge: true })
        .then(() => {
            console.log('User score updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating user score:', error);
        });
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