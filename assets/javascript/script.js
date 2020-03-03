// Document Handles
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time");
var preface = document.getElementById("preface");
var quizContent = document.getElementById("quiz-content");
var question = document.getElementById("question");
var answerBox = document.getElementById("answer-box");
var validationBox = document.getElementById("validation-box");
var validationContent =document.getElementById("validation-content");
var startQuiz = document.getElementById("start-quiz");

//Variables
var time = 10;

//functions

function startTimer(){
    interval = setInterval(function(){
        time--;
        console.log(time);
        if (time === 0){
            clearInterval(interval);
        }
        timeLeft.textContent = time;
    },1000);
}

function collapsePreface(){
    preface.setAttribute("class", "collapse");
}

function startQuizProcess(){
    startTimer();
    collapsePreface();
}

//event listeners
startQuiz.addEventListener("click", startQuizProcess);