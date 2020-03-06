//------------------Document Handles------------------------
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

//Quiz Source Object, contains all quiz questions and allowed responses.
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
        incorrectOptions:["Karen","Fran","Michelle"]
    }
}   

//Global Variables
var time = 75; //in seconds
var timePenalty = 15; //in Seconds
var popupTime = 1500; //in milliseconds
//placholders
var questionNumber;
var popup;
var score;


//---------------------------functions---------------------

function startQuizProcess(){
    score = 0;
    questionNumber = 1
    startTimer();
    switchToQuiz();
    createQuestion(questionNumber);
}


function startTimer(){
    timeLeft.textContent = time;
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


function createQuestion(questionNumber) {
    var selectQuestion ="question"+questionNumber;
    var thisQuestion = quizSource[selectQuestion];

    options = [];
    options = options.concat(thisQuestion.incorrectOptions, thisQuestion.correctAnswer)

    var iterationCount = options.length
    for (let i = 0; i < iterationCount; i++) {
        var randomNumber = Math.floor(Math.random()*options.length)
        liEl = document.createElement("li");
        liEl.textContent =options[randomNumber];
        options.splice(randomNumber,1);
        answerBox.appendChild(liEl);
    }
    question.textContent = thisQuestion.question;
}


function validate(answer,whichQuestion) {
    validationBox.setAttribute("class","show")
    if(answer.textContent === quizSource[whichQuestion].correctAnswer[0]){
        validationContent.setAttribute("class", "correct")
        validationContent.textContent = "Correct!"
        score++;
    } else {
        validationContent.setAttribute("class", "incorrect")
        validationContent.textContent = "no no no, you naughty goose"
        time -= timePenalty;
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

    if (answer.matches("li")){
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

function storeScore(){
    var overide;
    var storageKeys = Object.keys(localStorage);
    storageKeys.forEach(element => {
        if(element ===  scoreName.value){
           
            if(confirm("overide "+scoreName.value+"'s previous score?") === true){
                localStorage.setItem(scoreName.value,score);

            } else {

                overide = false;
                return;
            }
        } 
    });

    if (overide === false){
        return;
    } else {
        localStorage.setItem(scoreName.value,score);
    }
    window.location="./assets/html/highscores.html"
}

//-----------------------event listeners-------------------
startQuiz.addEventListener("click", startQuizProcess);
answerBox.addEventListener("click", checkAndUpdate);
scoreButton.addEventListener("click", storeScore);
