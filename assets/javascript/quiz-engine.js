//------------------Document Handles------------------------
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time");
var preface = document.getElementById("preface");
var quizContent = document.getElementById("quiz-content");
var staticQuestionTitle = document.getElementById("static-question");
var dynamicQuestionTitle = document.getElementById("dynamic-question")
var answerBox = document.getElementById("answer-box");
var codeBox = document.getElementById("code-box");
var validationBox = document.getElementById("validation-box");
var validationContent =document.getElementById("validation-content");
var startQuiz = document.getElementById("start-quiz");
var results = document.getElementById("results");
var finalScore = document.getElementById("score");
var scoreButton = document.getElementById("score-button");
var scoreName = document.getElementById("score-name");
var submitCode = document.getElementById("submit-code");
var dynamicContentBox = document.getElementById("dynamic-content-box");
var staticContentBox = document.getElementById("static-content-box");
const Editor = CodeMirror.fromTextArea(codeBox, { lineNumbers: true, mode:"javascript",theme:"vscode-dark" });
Editor.refresh();

//Global Variables
var time = 300; //in seconds
var timePenalty = 75; //in Seconds
var popupTime = 2000; //in milliseconds
var staticQuestionArray = Object.keys(quizSource);
var dynamicQuestionArray = Object.keys(quizSourceDynamic);
var isdynamic = true;
//placholders
var randomQuestionNumber;
var popup;
var score;
var codeBox;

//---------------------------functions---------------------


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
    //---------select static or dynamic question--------------------
    var randomN = Math.random();
    var combinationNumber = staticQuestionArray.length + dynamicQuestionArray.length;
    console.log("randomNumber"+randomN);
    console.log("check"+staticQuestionArray.length/combinationNumber);
    if (randomN < (staticQuestionArray.length/combinationNumber)){
        //---------generate a static question----------------------------
        staticContentBox.setAttribute("class" , "show");
        dynamicContentBox.setAttribute("class", "hide");
        isdynamic = false;
        randomQuestionNumber = Math.floor(Math.random()*staticQuestionArray.length);
        var selectedQuestion = staticQuestionArray[randomQuestionNumber];
        var questionProperties = quizSource[selectedQuestion];
        
        var options = [];
        options = options.concat(questionProperties.incorrectOptions, questionProperties.correctAnswer);

        var iterationCount = options.length;
        for (let i = 0; i < iterationCount; i++) {
            var randomNumber = Math.floor(Math.random()*options.length);
            var liEl = document.createElement("li");
            liEl.textContent =options[randomNumber];
            options.splice(randomNumber,1);
            answerBox.appendChild(liEl);
        }
        staticQuestionTitle.textContent = questionProperties.questionTitle;

    } else {
        //-------------generate a dynamic question----------------------
        staticContentBox.setAttribute("class" , "hide");
        dynamicContentBox.setAttribute("class", "show");
        isdynamic = true;
        randomQuestionNumber = Math.floor(Math.random()*dynamicQuestionArray.length);
        var selectedQuestion = dynamicQuestionArray[randomQuestionNumber];
        console.log(selectedQuestion);
        var questionProperties = quizSourceDynamic[selectedQuestion];
        dynamicQuestionTitle.textContent = questionProperties.questionTitle;
    }
    
}


function checkAndUpdate(event){
    // --------- if a static question, do a static check ---------
    if (isdynamic === false){
        var answer = event.target;
        var parent = answer.parentElement;
        var selectedQuestion = staticQuestionArray[randomQuestionNumber];
        var questionProperties = quizSource[selectedQuestion];

        if (answer.matches("li")){
            answer = answer.textContent;
            validate(answer,questionProperties);
            removeChildren(parent);

            questionsLeft = staticQuestionArray.length
            if(questionsLeft === 0) {
                switchToResults();
                return;
            }
            staticQuestionArray = staticQuestionArray.filter(function(element,index,array){
                return element !== selectedQuestion;
            });
            createQuestion();
        }
    } else {
        // ------ else if a dynamic question, run the code and do a dynamic check----------
            
            var selectedQuestion = dynamicQuestionArray[randomQuestionNumber];
            var questionProperties = quizSourceDynamic[selectedQuestion];
            var answer = runCode(questionProperties);

            validate(answer,questionProperties);

            Editor.setValue("");
            Editor.clearHistory();

            questionsLeft = dynamicQuestionArray.length
            if(questionsLeft === 0) {
                switchToResults();
                return;
            }
            dynamicQuestionArray = dynamicQuestionArray.filter(function(element,index,array){
                return element !== selectedQuestion;
            });
            createQuestion();
        }
    } 
    
    
function runCode(questionProperties){
    check = questionProperties.check
    console.log("-------RunCode Properties-----");
    console.log("the check value:"+check);
    var code = Editor.getValue();
    console.log("raw code: "+code);
    args = findArguments(code);
    console.log("function arguments"+args);
    functionCode = findCode(code);
    console.log("executable code"+functionCode);
    var userFunction = new Function(...args,functionCode);
    console.log("userAnswer: "+userFunction(check));
    userAnswer = passAppropriateArguments(userFunction,check);
    console.log("--------END runCode Properties------");
    return userAnswer;
}

function passAppropriateArguments(userFunction,check){
    if (typeof(check) === "number"){
        return userFunction(check);
    }
    if (typeof(check) === "string"){
        return userFunction(check);
    }
    if (typeof(check) === "object"){
        return userFunction(...check);
    }
}

function findArguments(code){
    const findFunction = code.indexOf('function');
    const fOpeningBracket = code.indexOf("(",(findFunction+8));
    const fClosingBracket = code.indexOf(")",(findFunction+8));
    const argumentString = code.substring(fOpeningBracket,fClosingBracket);
    const containsSemicolons = (argumentString.match(/;/g) || []).length;
    if (containsSemicolons > 0){
     throw "semicolons found in arguments"
    }

    function findBreakPoints(argumentString) {
        const breakPoints = [0];
        var position = 0;
        while (position >= 0){
            position = argumentString.indexOf(',',position+1);
            if (position >= 0){
                breakPoints.push(position);
            } else {
                breakPoints.push(argumentString.length);
            }
        }    
         return breakPoints;
    }
    var breakPoints = findBreakPoints(argumentString);
    console.log("break points: "+breakPoints);
    function extractArguments(argumentString,breakPoints){
        const functionArguments = [];
        for (let i = 0; i < (breakPoints.length-1); i++) {
                functionArguments[i] = argumentString.substring(breakPoints[i]+1,breakPoints[i+1]);
        }
        return functionArguments;
    }
    const functionArguments = extractArguments(argumentString,breakPoints)
    return functionArguments;
}

function findCode(code){
    const fOpeningBracket = code.indexOf("{");
    const fClosingBracket = code.lastIndexOf("}");
    const NumberOfOpeneningBrackets = (code.match(/{/g) || []).length;
    const NumberOfClosingBrackets = (code.match(/}/g) || []).length;
        if (NumberOfClosingBrackets !== NumberOfOpeneningBrackets){
            return;
        }
    functionCode = code.substring(fOpeningBracket+1,fClosingBracket);
    return functionCode;
}


function validate(answer,questionProperties) {
    validationBox.setAttribute("class","show");
    if(compare(answer,questionProperties.correctAnswer)){
        validationContent.setAttribute("class", "correct");
        validationContent.textContent = "Correct!";
        if (isdynamic === true){
            score += 5;
        } else {
            score++;
        }
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

function compare(item1,item2) {
    if (JSON.stringify(item1)===JSON.stringify(item2)){
        return true;
    }
    return false;
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
submitCode.addEventListener("click",checkAndUpdate);
