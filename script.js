var startBtn = document.querySelector("#start-btn");
var page = document.querySelectorAll(".page");
var questions = document.querySelectorAll(".questions");

var timeLeft = 100;
var pageNumber = 0;

function renderPage() {
    pageNumber++;
    page[pageNumber-1].style.display = "none";
    page[pageNumber].style.display = "flex";

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

function runQuiz() {
    renderPage();
    for (var i = 0; i < questions.length; i++){
        questions[i].addEventListener("click", answerPicked);
    }
}

startBtn.addEventListener("click", runQuiz);


