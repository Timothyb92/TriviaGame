//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var questionCount = 0;
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
    var renderQuestion = function(){
        buttonArr = [];
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
            $("#button" + buttonNum).attr("value", "incorrect");

        });

        //Puts the correct answer in the one remaining empty button
        while (buttonArr.indexOf(buttonNum) > 0){
            randomNum();
        };
        console.log("This number should NOT be in the array logged above: " + buttonNum);
        $("#button" + buttonNum).text(data.results[questionCount].correct_answer);
        $("#button" + buttonNum).attr("value", "correct");
    };

    //Start button event listener that hides the start button and shows the trivia questions
    $("#startGameContainer").click(function(){
        $("#startGameContainer").hide();
        $("#triviaContainer").show();
        renderQuestion();
    })

    $("button").click(function(){
        if ($(this).attr("value") == "correct"){
            console.log("clicked correct button");
        }
        else if ($(this).attr("value") == "incorrect"){
            console.log("clicked incorrect button");
        }
    })
})

//Checks to see if the game is over. If it's over, the final score screen will be shown.
var gameOverCheck = function(){
    if (questionCount === 10){
        $("#correctAnswersDiv").text("Correct answers: " + correctAnswers);
        $("#incorrectAnswersDiv").text("Incorrect answers: " + incorrectAnswers);
        $("#unansweredDiv").text("Correct answers: " + unanswered);
        $("#triviaContainer").hide();
        $("#finalScoreContainer").show();
    }
}


//Hides the questions and score screen on load
$(document).ready(function(){
    $("#triviaContainer").hide();
    $("#finalScoreContainer").hide();
    
    $("#playAgain").click(function(){
        console.log("Play again clicked")
        questionCount = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        $("#triviaContainer").show();
        $("#finalScoreContainer").hide();
    })

});