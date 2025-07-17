// Quiz data for all topics in a single string (can be moved to another file)
const quizData = {
  python: `[
    {
      "question": "What is the correct file extension for Python files?",
      "options": [".pt", ".pyt", ".py", ".python"],
      "answer": ".py"
    },
    {
      "question": "Which keyword is used for function in Python?",
      "options": ["func", "define", "def", "function"],
      "answer": "def"
    }
  ]`,
  java: `[
    {
      "question": "What is the size of int in Java?",
      "options": ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
      "answer": "4 bytes"
    },
    {
      "question": "Which keyword is used to inherit a class?",
      "options": ["inherits", "extends", "implement", "super"],
      "answer": "extends"
    }
  ]`,
  c: `[
    {
      "question": "Which symbol is used to end a statement in C?",
      "options": [".", ":", ";", "#"],
      "answer": ";"
    },
    {
      "question": "Which header file is required for printf()?",
      "options": ["stdio.h", "stdlib.h", "string.h", "math.h"],
      "answer": "stdio.h"
    }
  ]`,
  javascript: `[
    {
      "question": "What is the keyword for declaring variables in JavaScript?",
      "options": ["int", "var", "let", "both var and let"],
      "answer": "both var and let"
    },
    {
      "question": "Which method converts JSON to a JS object?",
      "options": ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
      "answer": "JSON.parse()"
    }
  ]`
};


let selectedTopic = null;
let questions = [];
let currentIndex = 0;
let score = 0;

const topicButtons = document.querySelectorAll(".topic-btn");
const startBtn = document.getElementById("start-btn");
const quizArea = document.getElementById("quiz-area");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const goBackBtn = document.getElementById("go-back-btn");



topicButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedTopic = btn.dataset.topic;
    startBtn.disabled = false;


    topicButtons.forEach(b => b.style.backgroundColor = "#007BFF");
    btn.style.backgroundColor = "#28a745";
  });
});


startBtn.addEventListener("click", () => {
  if (!selectedTopic) return;

  questions = JSON.parse(quizData[selectedTopic]);
  currentIndex = 0;
  score = 0;

  document.getElementById("topics").style.display = "none";
  startBtn.style.display = "none";
  quizArea.style.display = "block";
topic.innerHTML = selectedTopic;
  showQuestion();
});

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.answer, btn);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}


function checkAnswer(selected, correct, btnClicked) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "green";
    } else if (btn === btnClicked) {
      btn.style.backgroundColor = "red";
    }
  });

  if (selected === correct) score++;
  nextBtn.style.display = "inline-block";
}


nextBtn.addEventListener("click", () => {
topic.innerHTML = selectedTopic;
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});


goBackBtn.addEventListener("click", () => {
  quizArea.style.display = "none";
  goBackBtn.style.display = "none";
  document.getElementById("topics").style.display = "block";
  startBtn.style.display = "inline-block";
  startBtn.disabled = true;
  selectedTopic = null;
    topic.innerHTML = "Select a topic";

  topicButtons.forEach(btn => btn.style.backgroundColor = "#007BFF");
});



function showFinalScore() {
  questionEl.textContent = `Quiz completed! Your score is ${score}/${questions.length}`;
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  goBackBtn.style.display = "inline-block";
}

var topic = document.getElementById('topic')

topic.addEventListerner('click', function (e){
   e.target.innerHTML = data-topic.value
})

console.log(data-topic.value)