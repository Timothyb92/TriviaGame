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
    // console.log(data.results[0].question)
    // console.log(data.results[0].incorrect_answers[0]);
    
    $(".question").text(data.results[questionCount].question);
    
    data.results[questionCount].incorrect_answers.forEach(function(value, index){
        console.log("Index: " + index + "Value: " + value);
        $("#button" + (index + 1)).text(value);
    })
})

$(document).ready(function(){
$("#triviaContainer").hide();


$("#startGameContainer").click(function(){
    $("#startGameContainer").hide();
    $("#triviaContainer").show();
  })

});