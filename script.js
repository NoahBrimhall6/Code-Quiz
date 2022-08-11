var startBtn = document.querySelector("#start-btn");
var page = document.querySelectorAll(".page");
var questions = document.querySelectorAll(".questions");
var score = document.querySelector("#score");
var form = document.querySelector("form");
var input = document.querySelector("#input");

var timeLeft = 100;
var pageNumber = 0;
var highScores = [];

function renderPage() {
    pageNumber++;
    page[pageNumber-1].style.display = "none";
    page[pageNumber].style.display = "flex";

    if (pageNumber === 6) {
        score.textContent = timeLeft;
    }

    console.log("page number is " + pageNumber);
};

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

function submit(event) {
    event.preventDefault();
    inputText = input.value.trim();
    if (inputText === "") {return;}

    highScores.push(inputText);
    input.value = "";
    localStorage.setItem("highScores", JSON.stringify(highScores));
    renderPage();
}

function runQuiz() {
    renderPage();
    for (var i = 0; i < questions.length; i++){
        questions[i].addEventListener("click", answerPicked);
    }
    form.addEventListener("submit", submit);
}

startBtn.addEventListener("click", runQuiz);


