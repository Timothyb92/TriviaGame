//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var timeoutAnswers = 0;
var questionCount = 0;
var gameIsRunning = false;


//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=29&type=multiple", function(data){
    // console.log(data);
    console.log(data.results);
    console.log(data.results[0].question)

    $(".question").text(data.results[0].question);
})

window.onload = function(){
    // $("#triviaContainer").hide();
}

$("#startGameContainer").click(function(){
    alert("Start game clicked");
})