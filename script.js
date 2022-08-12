var startBtn = document.querySelector("#start-btn");
var page = document.querySelectorAll(".page");
var questions = document.querySelectorAll(".questions");
var score = document.querySelector("#score");
var form = document.querySelector("form");
var input = document.querySelector("#input");
var backBtn = document.querySelector("#back");
var resetBtn = document.querySelector("#reset");
var highScoreList = document.querySelector("#high-score-list");
var highScoresBtn = document.querySelector("#view-high-scores")
var header = document.querySelector("header");
var timer = document.querySelector("#timer");

var timeLeft = 100;
var pageNumber = 0;
var highScores = [];

//Renders the next "page" and hides the current one
function renderPage() {
    pageNumber++;
    page[pageNumber-1].style.display = "none";
    page[pageNumber].style.display = "flex";
    //displays high score on end screen
    if (pageNumber === page.length-2) {
        score.textContent = timeLeft;
    }
    console.log("page number is " + pageNumber);
};

//performs logic depending on if the user picks the correct answer
function answerPicked(event) {
    var userChoice = event.target;
    if (userChoice.matches("button")) {
        if(userChoice.dataset.correct === "true") {
            console.log("correct");
        } else {
            timeLeft -= 10;
            console.log("incorrect");
        }
        renderPage();
    }  
}

//Saves the players initials and highscore
function submit(event) {
    event.preventDefault();
    inputText = input.value.trim();
    highScores.push(inputText + " " + timeLeft);
    input.value = "";
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

//displays the high scores page which can be accessed at any point in the game
function showHighScores() {
    header.style.display = "none";
    page[pageNumber].style.display = "none";
    page[page.length-1].style.display = "flex";
    backBtn.addEventListener("click", goBack);
    resetBtn.addEventListener("click", resetHighScores);
    renderHighScores();
}

//renders the list of saved high scores
function renderHighScores() {
    highScoreList.innerHTML = "";
    highScores = JSON.parse(localStorage.getItem("highScores"));
    for (var i = 0; i < highScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScores[i];
        highScoreList.appendChild(li);
    }
}

//logic for the reset high score button
function resetHighScores() {
    localStorage.clear();
    highScores = [];
    highScoreList.innerHTML = "";
}

//logic for the back button, returns the "page" you came from
function goBack() {
    header.style.display = "flex";
    page[page.length-1].style.display = "none";
    if (pageNumber === page.length-2) {
        pageNumber = 0;
        startBtn.addEventListener("click", runQuiz);
    } 
    page[pageNumber].style.display = "flex";
    highScoresBtn.addEventListener("click", showHighScores);
}

//login for the start quiz button
function runQuiz() {
    renderPage();
    for (var i = 0; i < questions.length; i++){
        questions[i].addEventListener("click", answerPicked);
    }
    form.addEventListener("submit", submit);
    timeLeft = 100;
    startTimer();
}

//timer function
function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
        };
        if(pageNumber === page.length-2) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

startBtn.addEventListener("click", runQuiz);
highScoresBtn.addEventListener("click", showHighScores);


