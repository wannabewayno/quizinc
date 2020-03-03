// Document Handles
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time");
var preface = document.getElementById("preface");
var quizContent = document.getElementById("quiz-content");
var question = document.getElementById("question");
var answerBox = document.getElementById("answer-box");
var validationBox = document.getElementById("validation-box");
var validationContent =document.getElementById("validation-content");

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
    },1000);
}

//event listeners