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

//Quiz Source Object
quizSource = {
    question1:{
        question:"how do you define a function argument?",
        correctAnswer:["With rounded brackets ()"],
        incorrectAnswers:["With curly Brackets {}","With square brackets []","With Double quotes"]
    },
    question2:{
        question:"what operator do you use to indicate the end of a line",
        correctAnswer:["Semicolon ; "],
        incorrectAnswers:["Colon : ","Asterix * ","dollar sign $ "]
    },
    question3:{
        question:"who is who in the zoo?",
        correctAnswer:["Denise"],
        incorrectAnswers:["Karen","Fran","quasimoto"]
    }
}   


//Variables
var time = 1;
var questionNumber = 1;

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