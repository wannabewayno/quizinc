//Quiz Source Object, contains all quiz questions and allowed responses.
quizSource = {
    question1:{
        questionTitle:"What will the following code return: Boolean(10 > 9)",
        correctAnswer:"true",
        incorrectOptions:["NaN","false","undefined","-1","string"]
    },
    question2:{
        questionTitle:"what operator do you use to indicate the end of a line",
        correctAnswer:"Semicolon ; ",
        incorrectOptions:["Colon : ","Asterix * ","dollar sign $ "]
    },
    question3:{
        questionTitle:"Which operator is used to assign a value to a variable?",
        correctAnswer:"=",
        incorrectOptions:["*","-","x"]
    },
    question4:{
        questionTitle:"Inside which HTML element do we put the JavaScript?",
        correctAnswer:"<script>",
        incorrectOptions:["<js>","<luke.js>","<javascript>","<scripting>"]
    },
    question5:{
        questionTitle:"What is the correct JavaScript syntax to change the content of this HTML element      '<p id=\"demo\">This is a demonstration.</p>'",
        correctAnswer:"document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
        incorrectOptions:[" #demo.innerHTML = \"Hello World!\";"," document.getElement(\"p\").innerHTML = \"Hello World!\";"," document.getElementByName(\"p\").innerHTML = \"Hello World!\";"]
    },
    question6:{
        questionTitle:"How does a FOR loop start?",
        correctAnswer:"for (i = 0; i<=5; i++);",
        incorrectOptions:["for (i = 0; i <= 5);","for (i <= 5; i++);","for i = 1 to 5;"]
    },
    question7:{
        questionTitle:"Where is the correct place to insert a JavaScript?",
        correctAnswer:"Both the <head> section and the <body> section",
        incorrectOptions:["The <head> section","The <body> section"]
    },
    question8:{
        questionTitle:"What is the correct syntax for referring to an external script called \"xxx.js\"?",
        correctAnswer:"<script src=\"xxx.js\"",
        incorrectOptions:["<script href=\"xxx.js\">","<script name=\"xxx.js\">"]
    },
    question9:{
        questionTitle:"The external JavaScript file must contain the <script> tag.",
        correctAnswer:"False",
        incorrectOptions:["True"]
    },
    question10:{
        questionTitle:"How do you write \"Hello World\" in an alert box?",
        correctAnswer:"alert(\"Hello World\");",
        incorrectOptions:["msg(\"Hello World\");","msgBox(\"Hello World\");","alertBox(\"Hello World\");"]
    },
    question11:{
        questionTitle:"How do you create a function in JavaScript?",
        correctAnswer:"function myFunction();",
        incorrectOptions:["function = myFunction();","function:myFunction();"]
    },
    question12:{
        questionTitle:"How do you call a function named \"myFunction\"?",
        correctAnswer:"myFunction();",
        incorrectOptions:["call myFunction();","call function myFunction();"]
    },
    question13:{
        questionTitle:"How to write an IF statement in JavaScript?",
        correctAnswer:"if (i == 5);",
        incorrectOptions:["if i = 5;","if i = 5 then;","if i == 5 then;"]
    },
    question14:{
        questionTitle:"How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        correctAnswer:"if (i != 5);",
        incorrectOptions:["if i <> 5;","if (i <> 5);","if i =! 5 then;"]
    },
    question15:{
        questionTitle:"How does a WHILE loop start?",
        correctAnswer:"while (i <= 10);",
        incorrectOptions:["while (i <= 10; i++);","while i = 1 to 10;"]
    },
    question16:{
        questionTitle:"How can you add a comment in JavaScript?",
        correctAnswer:"//This is a comment",
        incorrectOptions:["'This is a comment","<!--This is a comment-->"]
    },
    question17:{
        questionTitle: "How to insert a comment that has more than one line?",
        correctAnswer: "/* This comment has more than one line*/",
        incorrectOptions:["<!-- This comment has more than one line-->","//This comment has more than one line//"]
    },
    question18:{
        questionTitle:"What is the correct way to write a JavaScript array",
        correctAnswer:"var colors =[\"red\",\"green\",\"blue\"]",
        incorrectOptions:["var colors = (1:\"red\", 2:\"green\", 3:\"blue\")","var colors = \"red\", \"green\", \"blue\"","var colors = \"red\", \"green\", \"blue\""]
    },
    question19:{
        questionTitle:"How do you round the number 7.25, to the nearest integer?",
        correctAnswer:"Math.round(7.25);",
        incorrectOptions:["rnd(7.25);","round(7.25);","Math.rnd(7.25);"]
    },
    question20:{
        questionTitle:"How do you find the number with the highest value of x and y?",
        correctAnswer:"Math.max(x,y);",
        incorrectOptions:["Math.ceil(x,y);","ceil(x,y);","top(x,y);"]
    },
    question21:{
        questionTitle:"What is the correct JavaScript syntax for opening a new window called \"w2\" ?",
        correctAnswer:"w2 = window.open(\"http://www.quizinc.com\");",
        incorrectOptions:["w2 = window.new(\"http://www.quizinc.com\");"]
    },
    question22:{
        questionTitle:"JavaScript is the same as Java.",
        correctAnswer:"False",
        incorrectOptions:["True"]
    },
    question23:{
        questionTitle:"How can you detect the client's browser name?",
        correctAnswer:"navigator.appName",
        incorrectOptions:["client.navName","browser.name"]
    },
    question24:{
        questionTitle:"Which event occurs when the user clicks on an HTML element?",
        correctAnswer:"onclick",
        incorrectOptions:["onmouseover","onmouseclick","onchange"]
    },
    question25:{
        questionTitle:"How do you declare a JavaScript variable?",
        correctAnswer:"var carName;",
        incorrectOptions:["variable carName;","v carName;"]
    },
    question26:{
        questionTitle:"what operator do you use to indicate the start of a line",
        correctAnswer:"none",
        incorrectOptions:["Colon : ","Asterix * ","dollar sign $ ","exclamation mark !"]
    }
}   

// --------------------------------------------- DYNAMIC QUIZ SOURCE---------------------------------------------------------------------

quizSourceDynamic = {
    question1:{
        questionTitle:"write a function that takes in two numbers, x and y as arguments and returns the sum of those numbers",
        correctAnswer:63,
        check:[21,42],
    },
    question2:{
        questionTitle:"write a function whose argument takes in an Array of numbers and outputs only the even numbers in that array",
        correctAnswer:[2,138,22],
        check:[[2,5,37,138,9,22]],
    },
    question3:{
        questionTitle:"write a function whose argument takes in a number N, and outputs an array of sequential numbers from 1 to N",
        correctAnswer:[1,2,3,4,5,6,7,8,9,10,11,12,13],
        check:13,
    },
    question4:{
        questionTitle:"write a function whose argument takes in an array of numbers and returns an array with all numbers above 22",
        correctAnswer:[42,23,32,1003],
        check:[[42,0,4,18,23,21,9,4.5,6,32,1003]],
    },
    question5:{
        questionTitle:"Write a function whose argument takes a number and returns the reverse of that number E.g. 56789 -> 98765",
        correctAnswer:374895,
        check:598473,
    },
    question6:{
        questionTitle:"Write a function whose argument takes an array of strings and returns an array of booleans to check if they're palindromes or not. E.g [\"chair\",\"Hannah\"] would return [false,true]",
        correctAnswer:[false,true,false,true,false,false,false],
        check:[["football field","taco cat","this is not a palindrome","nurses run","airplane","Ducati","wine bottle"]],
    },
    question7:{
        questionTitle:"Write a function whose argument takes a string and returns that string in alphabetical order without spaces. e.g \"this example\" = \"aeehilmpstx\"",
        correctAnswer:"eeeehhhinrrrstttuy",
        check:"hey there return this",
    },
    question8:{
        questionTitle:"Write a function whose arguments takes a string and returns a string with the first letter of each word converted to upper case",
        correctAnswer:"The Quick Red Ferrari Got Outperformed By The Tesla",
        check:"the quick red ferrari got outperformed by the tesla",
    },
    question9:{
        questionTitle:"Write a function whose argument takes a string and returns the longest word within the string",
        correctAnswer:"jdhshdhkjfnksjdfnksjfdn",
        check:"some words in this sentance aren't that long but this gibberish is jdhshdhkjfnksjdfnksjfdn",
    },
    question10:{
        questionTitle:"Write a function whose argument takes a whole function as a string and returns the function name.",
        correctAnswer:"whenButtonIsPressed",
        check:"function whenButtonIsPressed(){ run all this erroneous code; and then return the answer;}",
    },
    question11:{
        questionTitle:"Write a function whose argument accepts a string and returns the number of vowels within the string",
        correctAnswer:9,
        check:"a nice simple vowel count",
    },
    question12:{
        questionTitle:"Write a function whose argument is an array of numbers and returns an array with only the prime numbers in that array",
        correctAnswer:[2,17,193],
        check:[[35,17,2,88,16,193,15]],
    },
    question13:{
        questionTitle:"Write a function whose argument is a number N, and returns the N rows by N columns identity matrix",
        correctAnswer:[[1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,1]],
        check:8,
    },
    question14:{
        questionTitle:"Write a function whose argument takes a string and returns the first non-repeated character",
        correctAnswer:"g",
        check:"a lot of repeated characters in english except for bordeaux",
    },
    question15:{
        questionTitle:"Write a function whose argument takes a string and character choice(as a string also) => '(string, character)' and returns the string with all of the 'character' elements removed",
        correctAnswer:"gve ths a shot mate",
        check:["give this a shot mate","i"],
    }
}