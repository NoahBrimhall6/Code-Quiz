var startBtn = document.querySelector("#start-btn");
var page = document.querySelectorAll(".page");
var questions = document.querySelectorAll(".questions");

var timeLeft = 100;
var pageNumber = 1;
var questionNumber = 0;

function answerPicked(event) {
    var userChoice = event.target;
    if (userChoice.matches("button")) {
        if(userChoice.dataset.correct === "true") {
            console.log("correct");
        } else {
            timeLeft -= 10;
            console.log("incorrect");
        }

        pageNumber++;
        page[pageNumber-1].style.display = "none";
        page[pageNumber].style.display = "flex";

        questionNumber++;
    }
}

function runQuiz() {
    page[0].style.display = "none";
    page[1].style.display = "flex";
}

startBtn.addEventListener("click", runQuiz);

questions[questionNumber].addEventListener("click", answerPicked);