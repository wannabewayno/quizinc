//------------------Document Handles------------------------
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time");
var preface = document.getElementById("preface");
var quizContent = document.getElementById("quiz-content");
var questionTitle = document.getElementById("question");
var answerBox = document.getElementById("answer-box");
var validationBox = document.getElementById("validation-box");
var validationContent =document.getElementById("validation-content");
var startQuiz = document.getElementById("start-quiz");
var results = document.getElementById("results");
var finalScore = document.getElementById("score");
var scoreButton = document.getElementById("score-button");
var scoreName = document.getElementById("score-name");


//Global Variables
var time = 75; //in seconds
var timePenalty = 15; //in Seconds
var popupTime = 1500; //in milliseconds
var questionArray = Object.keys(quizSource);
//placholders
var randomQuestionNumber;
var popup;
var score;
var theInstruction = "alert('hello world');"

//---------------------------functions---------------------

function F(string){
    return(string);
}


function startQuizProcess(){
    score = 0;
    startTimer();
    switchToQuiz();
    createQuestion();
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


function createQuestion() {
    randomQuestionNumber = Math.floor(Math.random()*questionArray.length);
    var selectedQuestion = questionArray[randomQuestionNumber];
    var questionProperties = quizSource[selectedQuestion];
    
    options = [];
    options = options.concat(questionProperties.incorrectOptions, questionProperties.correctAnswer);

    var iterationCount = options.length;
    for (let i = 0; i < iterationCount; i++) {
        var randomNumber = Math.floor(Math.random()*options.length);
        liEl = document.createElement("li");
        liEl.textContent =options[randomNumber];
        options.splice(randomNumber,1);
        answerBox.appendChild(liEl);
    }
    questionTitle.textContent = questionProperties.question;
}


function checkAndUpdate(event){
    var answer = event.target;
    var parent = answer.parentElement;
    var selectedQuestion = questionArray[randomQuestionNumber];
    var questionProperties = quizSource[selectedQuestion];

    if (answer.matches("li")){
        validate(answer,questionProperties);
        removeChildren(parent);

        questionsLeft = questionArray.length
        if(questionsLeft === 0) {
            switchToResults();
            return;
        }
        questionArray = questionArray.filter(function(element,index,array){
            return element !== selectedQuestion;
        });
        createQuestion();
    }
}

function validate(answer,questionProperties) {
    validationBox.setAttribute("class","show");
    if(answer.textContent === questionProperties.correctAnswer[0]){
        validationContent.setAttribute("class", "correct");
        validationContent.textContent = "Correct!";
        score++;
    } else {
        validationContent.setAttribute("class", "incorrect");
        validationContent.textContent = "no no no, you naughty goose";
        time -= timePenalty;
    }

    clearInterval(popup);
    popup = setInterval(function(){
        validationBox.setAttribute("class","hide");
        clearInterval(popup);
    },2000);
}


function removeChildren(parent){
    iterationCount = parent.childElementCount;
    for (let i = 0; i < iterationCount; i++) {
        child = parent.lastElementChild ;
        parent.removeChild(child);
    }
}

function storeScore(){
    var currentScore = score;
    var userAlias = scoreName.value;
    var overide;
    var storageKeys = Object.keys(localStorage);
    storageKeys.forEach(element => {
        var highscore = localStorage.getItem(element);
        if(element ===  userAlias && currentScore <= highscore ){
           
            if(confirm("This score is lower than your current highscore. Overide "+userAlias+"'s previous high score with this lower score?") === true){
                localStorage.setItem(userAlias,currentScore);

            } else {
                overide = false;
            }
        } 
    });

    if (overide === false){
        window.location="./assets/html/highscores.html";
    } else {
        localStorage.setItem(userAlias,currentScore);
    }
    window.location="./assets/html/highscores.html";
}

//-----------------------event listeners-------------------
startQuiz.addEventListener("click", startQuizProcess);
answerBox.addEventListener("click", checkAndUpdate);
scoreButton.addEventListener("click", storeScore);
