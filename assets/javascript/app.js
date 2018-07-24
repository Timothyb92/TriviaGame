//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var timeoutAnswers = 0;
var questionCount = 0;
var gameIsRunning = false;
var buttonArr = [];
var buttonNum;
var randomNum = function(){
    buttonNum = Math.floor(Math.random() * 4);
}


//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=29&type=multiple", function(data){
    // console.log(data);
    console.log(data.results);
    // console.log(data.results[0].question)
    // console.log(data.results[0].incorrect_answers[0]);
    
    $(".question").text(data.results[questionCount].question);
    

    //Function that assigns each possible answer to a random button for each question
    data.results[questionCount].incorrect_answers.forEach(function(value, index){
        while (buttonArr.length <= (index + 1)){
            if (buttonArr.indexOf(buttonNum) === -1){
                buttonArr.push(buttonNum);
            } else {
                randomNum();
            }
        }
        console.log(buttonArr);
        $("#button" + buttonNum).text(value);
    });

    while (buttonArr.indexOf(buttonNum) > 0){
        randomNum();
    };
    console.log("This number should NOT be in the array logged above: " + buttonNum);
    $("#button" + buttonNum).text(data.results[questionCount].correct_answer);
})

$(document).ready(function(){
$("#triviaContainer").hide();


$("#startGameContainer").click(function(){
    $("#startGameContainer").hide();
    $("#triviaContainer").show();
  })

});