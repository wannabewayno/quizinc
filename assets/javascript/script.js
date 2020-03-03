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
    preface.setAttribute("class", "hide");
    quizContent.setAttribute("class", "show")
}


function startQuizProcess(){
    startTimer();
    collapsePreface();
    createQuestion(questionNumber);
}



function createQuestion(questionNumber) {
    var selector ="question"+questionNumber;
    var thisQuestion = quizSource[selector];
    answers = [];
    answers = answers.concat(thisQuestion.incorrectAnswers, thisQuestion.correctAnswer)
    var iterationCount = answers.length

    for (let i = 0; i < iterationCount; i++) {
        var randomNumber = Math.floor(Math.random()*answers.length)
        dlEl = document.createElement("button");
        dlEl.textContent = answers[randomNumber];
        answers.splice(randomNumber,1);
        answerBox.appendChild(dlEl);
    }
    question.textContent = thisQuestion.question;
}

function validateQuestion(){
    var element = event.target;
    var parent = element.parentElement;
    selector = "question"+questionNumber

    if (element.matches("button")){
        removeChildren(parent);
        validationBox.setAttribute("class","show")

        if(element.textContent === quizSource[selector].correctAnswer[0]){
            validationContent.textContent = "Correct!"
        } else {
            validationContent.textContent = "Wrong bitch!"
        }

        if(questionNumber === Object.keys(quizSource).length){
            return
        }
        createQuestion(questionNumber+1);
        questionNumber++;

        var popup = setInterval(function(){
            validationBox.setAttribute("class","hide")
            clearInterval(popup);
        },2000);
    }
}

function removeChildren(parent){
    iterationCount = parent.childElementCount
    for (let i = 0; i < iterationCount; i++) {
        child = parent.lastElementChild 
        parent.removeChild(child);
    }
}

//event listeners
startQuiz.addEventListener("click", startQuizProcess);
answerBox.addEventListener("click", validateQuestion);
