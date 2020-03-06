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
        question:"What will the following code return: Boolean(10 > 9)",
        correctAnswer:["true"],
        incorrectOptions:["NaN","false","undefined","-1","string"]
    },
    question2:{
        question:"what operator do you use to indicate the end of a line",
        correctAnswer:["Semicolon ; "],
        incorrectOptions:["Colon : ","Asterix * ","dollar sign $ "]
    },
    question3:{
        question:"Which operator is used to assign a value to a variable?",
        correctAnswer:["="],
        incorrectOptions:["*","-","x"]
    },
    question4:{
        question:"Inside which HTML element do we put the JavaScript?",
        correctAnswer:["<script>"],
        incorrectOptions:["<js>","<luke.js>","<javascript>","<scripting>"]
    },
    question5:{
        question:"What is the correct JavaScript syntax to change the content of this HTML element      '<p id=\"demo\">This is a demonstration.</p>'",
        correctAnswer:["document.getElementById(\"demo\").innerHTML = \"Hello World!\";"],
        incorrectOptions:[" #demo.innerHTML = \"Hello World!\";"," document.getElement(\"p\").innerHTML = \"Hello World!\";"," document.getElementByName(\"p\").innerHTML = \"Hello World!\";"]
    },
    question6:{
        question:"How does a FOR loop start?",
        correctAnswer:["for (i = 0; i<=5; i++);"],
        incorrectOptions:["for (i = 0; i <= 5);","for (i <= 5; i++);","for i = 1 to 5;"]
    },
    question7:{
        question:"Where is the correct place to insert a JavaScript?",
        correctAnswer:["Both the <head> section and the <body> section"],
        incorrectOptions:["The <head> section","The <body> section"]
    },
    question8:{
        question:"What is the correct syntax for referring to an external script called \"xxx.js\"?",
        correctAnswer:["<script src=\"xxx.js\""],
        incorrectOptions:["<script href=\"xxx.js\">","<script name=\"xxx.js\">"]
    },
    question9:{
        question:"The external JavaScript file must contain the <script> tag.",
        correctAnswer:["False"],
        incorrectOptions:["True"]
    },
    question10:{
        question:"How do you write \"Hello World\" in an alert box?",
        correctAnswer:["alert(\"Hello World\");"],
        incorrectOptions:["msg(\"Hello World\");","msgBox(\"Hello World\");","alertBox(\"Hello World\");"]
    },
    question11:{
        question:"How do you create a function in JavaScript?",
        correctAnswer:["function myFunction();"],
        incorrectOptions:["function = myFunction();","function:myFunction();"]
    },
    question12:{
        question:"How do you call a function named \"myFunction\"?",
        correctAnswer:["myFunction();"],
        incorrectOptions:["call myFunction();","call function myFunction();"]
    },
    question13:{
        question:"How to write an IF statement in JavaScript?",
        correctAnswer:["if (i == 5);"],
        incorrectOptions:["if i = 5;","if i = 5 then;","if i == 5 then;"]
    },
    question14:{
        question:"How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        correctAnswer:["if (i != 5);"],
        incorrectOptions:["if i <> 5;","if (i <> 5);","if i =! 5 then;"]
    },
    question15:{
        question:"How does a WHILE loop start?",
        correctAnswer:["while (i <= 10);"],
        incorrectOptions:["while (i <= 10; i++);","while i = 1 to 10;"]
    },
    question16:{
        question:"How can you add a comment in a JavaScript?",
        correctAnswer:["//This is a comment"],
        incorrectOptions:["'This is a comment","<!--This is a comment-->"]
    },
    question17:{
        question:"How to insert a comment that has more than one line?",
        correctAnswer:["/* This comment has more than one line*/"],
        incorrectOptions:["<!-- This comment has more than one line-->","//This comment has more than one line//"]
    },
    question18:{
        question:"What is the correct way to write a JavaScript array",
        correctAnswer:["var colors =[\"red\",\"green\",\"blue\"]"],
        incorrectOptions:["var colors = (1:\"red\", 2:\"green\", 3:\"blue\")","var colors = \"red\", \"green\", \"blue\"","var colors = \"red\", \"green\", \"blue\""]
    },
    question19:{
        question:"How do you round the number 7.25, to the nearest integer?",
        correctAnswer:["Math.round(7.25);"],
        incorrectOptions:["rnd(7.25);","round(7.25);","Math.rnd(7.25);"]
    },
    question20:{
        question:"How do you find the number with the highest value of x and y?",
        correctAnswer:["Math.max(x,y);"],
        incorrectOptions:["Math.ceil(x,y);","ceil(x,y);","top(x,y);"]
    },
    question21:{
        question:"What is the correct JavaScript syntax for opening a new window called \"w2\" ?",
        correctAnswer:["w2 = window.open(\"http://www.quizinc.com\");"],
        incorrectOptions:["w2 = window.new(\"http://www.quizinc.com\");"]
    },
    question22:{
        question:"JavaScript is the same as Java.",
        correctAnswer:["False"],
        incorrectOptions:["True"]
    },
    question23:{
        question:"How can you detect the client's browser name?",
        correctAnswer:["navigator.appName"],
        incorrectOptions:["client.navName","browser.name"]
    },
    question24:{
        question:"Which event occurs when the user clicks on an HTML element?",
        correctAnswer:["onclick"],
        incorrectOptions:["onmouseover","onmouseclick","onchange"]
    },
    question25:{
        question:"How do you declare a JavaScript variable?",
        correctAnswer:["var carName;"],
        incorrectOptions:["variable carName;","v carName;"]
    },
    question26:{
        question:"what operator do you use to indicate the start of a line",
        correctAnswer:["none"],
        incorrectOptions:["Colon : ","Asterix * ","dollar sign $ ","exclamation mark !"]
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


function removeChildren(parent){
    iterationCount = parent.childElementCount
    for (let i = 0; i < iterationCount; i++) {
        child = parent.lastElementChild 
        parent.removeChild(child);
    }
}

function storeScore(){
    var currentScore = score;
    var userAlias = scoreName.value;
    var overide;
    var storageKeys = Object.keys(localStorage);
    storageKeys.forEach(element => {
        var highscore = localStorage.getItem(element)
        if(element ===  userAlias && currentScore <= highscore ){
           
            if(confirm("This score is lower than your current highscore. Overide "+userAlias+"'s previous high score with this lower score?") === true){
                localStorage.setItem(userAlias,currentScore);

            } else {
                overide = false;
            }
        } 
    });

    if (overide === false){
        window.location="./assets/html/highscores.html"
    } else {
        localStorage.setItem(userAlias,currentScore);
    }
    window.location="./assets/html/highscores.html"
}

//-----------------------event listeners-------------------
startQuiz.addEventListener("click", startQuizProcess);
answerBox.addEventListener("click", checkAndUpdate);
scoreButton.addEventListener("click", storeScore);
