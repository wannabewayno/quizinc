// ------------------------document handles------------------
var clearHighScores = document.getElementById("clear-scores");
var highScores = document.getElementById("highscores");

//-------------------------global variables----------------------
//placeholders
var storageKeys = [];
var sortedHighScores = [];

//-------------------------functions---------------------------
function getLocalStorageKeys (){
    storageKeys = Object.keys(localStorage); 
}

function sortKeys(){
    var sortScores = [];
    storageKeys.forEach(element => {
        sortScores.push([element,localStorage.getItem(element)]);
    });
    sortScores.sort(function(a,b){
        return b[1]-a[1];
    });
  sortedHighScores = sortScores;
}

function addHighScores(){
    var count = 0;
    sortedHighScores.forEach(element => {
        count++;
        liEl = document.createElement("li");
        liEl.textContent = element[0]+" - "+element[1];
        if (count%2 === 0){
            liEl.setAttribute("class","white-background");
        } else {
            liEl.setAttribute("class","grey-background");
        }
        highScores.appendChild(liEl);
    });
}


function clearScores(){
    iterationCount = highScores.childElementCount
    for (let i = 0; i < iterationCount; i++) {
        child = highScores.lastElementChild 
        highScores.removeChild(child);
    }
    localStorage.clear();
}
//-------------------------event listeners--------------------
clearHighScores.addEventListener("click",clearScores)

//------------------------onload characteristics---------------
document.body.onload = function(){
    getLocalStorageKeys();
    sortKeys();
    addHighScores();
}