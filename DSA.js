const questions = [
    {
        question: "What is a doubly-linked list?",
        answers: [
            { text: "A collection of nodes where each node contains data and two links to the next and previous nodes in the sequence. ", correct: true},
            { text: "A data structure that stores elements in a linear order, where each element points to the next, but not the previous one.", correct: false},
            { text: "A type of list where each node has multiple links to various other nodes to form a web-like structure.", correct: false},
            { text: "An advanced form of array that allows for rapid insertion and deletion at both ends.", correct: false}
        ]
    },
    {
        question: "What is the difference between a stack and a queue?",
        answers: [
            { text: "A stack allows random access to its elements, while a queue only allows access to the first and last element.", correct: false},
            { text: "There is no significant difference; both data structures are used interchangeably in programming.", correct: false},
            { text: "A queue is exclusively used for arithmetic operations, while a stack is used for storing data temporarily.", correct: false},
            { text: "A stack operates on a Last In, First Out (LIFO) principle, whereas a queue operates on a First In, First Out (FIFO) principle.", correct: true}
        ]
    },
    {
        question: "What operations can be performed on a multi-map?",
        answers: [
            { text: "Performing arithmetic operations directly on the key-value pairs.", correct: false},
            { text: "Inserting elements, erasing elements, finding elements by key, and iterating over elements. ", correct: true},
            { text: "Changing the value of an existing key directly, without inserting a new element.", correct: false},
            { text: "Applying matrix transformations to the pairs stored within.", correct: false}
        ]
    },
    {
        question: "What is multidimensional array?",
        answers: [
            { text: "A data structure that stores elements in a single dimension only.", correct: true},
            { text: "A data structure that can store elements in multiple dimensions, organized in rows and columns.", correct: false},
            { text: "A data structure that can only store elements of the same data type.", correct: false},
            { text: "A data structure used specifically for implementing graphs and trees.", correct: false}
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