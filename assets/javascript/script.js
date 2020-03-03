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
var results = document.getElementById("results");
var finalScore = document.getElementById("score");
var scoreButton = document.getElementById("score-button");
var scoreName = document.getElementById("score-name");

//Quiz Source Object, contains all quiz questiosn and allowed responses.
quizSource = {
    question1:{
        question:"how do you define a function argument?",
        correctAnswer:["With rounded brackets ()"],
        incorrectOptions:["With curly Brackets {}","With square brackets []","With Double quotes"]
    },
    question2:{
        question:"what operator do you use to indicate the end of a line",
        correctAnswer:["Semicolon ; "],
        incorrectOptions:["Colon : ","Asterix * ","dollar sign $ "]
    },
    question3:{
        question:"who is who in the zoo?",
        correctAnswer:["Denise"],
        incorrectOptions:["Karen","Fran","quasimoto"]
    }
}   


//Variables
var time = 75;
var questionNumber;
var popup;
var score;

//functions
function startTimer(){
    interval = setInterval(function(){
        time--;
        if (time <= 0){
            clearInterval(interval);
            switchToResults();
            timeLeft.textContent = ""
            return;
        }
        timeLeft.textContent = time;
    },1000);
}


function switchToQuiz(){
    preface.setAttribute("class", "hide");
    quizContent.setAttribute("class", "show");
}


function switchToResults(){
    quizContent.setAttribute("class", "hide");
    results.setAttribute("class", "show");
    finalScore.textContent = score;
}


function startQuizProcess(){
    score = 0;
    questionNumber = 1
    startTimer();
    switchToQuiz();
    createQuestion(questionNumber);
}


function createQuestion(questionNumber) {
    var selectQuestion ="question"+questionNumber;
    var thisQuestion = quizSource[selectQuestion];

    options = [];
    options = options.concat(thisQuestion.incorrectOptions, thisQuestion.correctAnswer)

    var iterationCount = options.length
    for (let i = 0; i < iterationCount; i++) {
        var randomNumber = Math.floor(Math.random()*options.length)
        dlEl = document.createElement("button");
        dlEl.textContent = options[randomNumber];
        options.splice(randomNumber,1);
        answerBox.appendChild(dlEl);
    }
    question.textContent = thisQuestion.question;
}


function validate(answer,whichQuestion) {
    validationBox.setAttribute("class","show")
    if(answer.textContent === quizSource[whichQuestion].correctAnswer[0]){
        validationContent.textContent = "Correct!"
        score++;
    } else {
        validationContent.textContent = "no no no, you naughty goose"
        time -= 10;
    }

    clearInterval(popup);
    popup = setInterval(function(){
        validationBox.setAttribute("class","hide")
        clearInterval(popup);
    },2000);
}


function checkAndUpdate(event){
    var answer = event.target;
    var parent = answer.parentElement;
    whichQuestion = "question"+questionNumber

    if (answer.matches("button")){
        removeChildren(parent);
        validate(answer,whichQuestion);

        numberOfQuestions = Object.keys(quizSource).length
        if(questionNumber === numberOfQuestions) {
            switchToResults();
            return;
        }
        createQuestion(questionNumber+1);
        questionNumber++;
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
answerBox.addEventListener("click", checkAndUpdate);
