//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var questionCount = 0;
var time = 30;
var buttonArr = [];
var buttonNum;
var randomNum = function(){
    buttonNum = Math.floor(Math.random() * 4);
}


var countDown = function(){
    console.log(time);
    $("#timer").text(time);
    time--;
}

var stopTimer = function(){
    clearInterval(myTimer);
}

var myTimer = setInterval(countDown, 1000)


//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=29&type=multiple", function(data){    
    //Function that assigns each possible answer to a random button for each question
    var renderQuestion = function(){
        myTimer;
        $(".question").text(data.results[questionCount].question);
        data.results[questionCount].incorrect_answers.forEach(function(value, index){
            while (buttonArr.length <= (index + 1)){
                if (buttonArr.indexOf(buttonNum) === -1){
                    buttonArr.push(buttonNum);
                } else {
                    randomNum();
                }
            }
            $("#button" + buttonNum).text(value);
            $("#button" + buttonNum).attr("value", "incorrect");
        });
        //Puts the correct answer in the one remaining empty button
        while (buttonArr.indexOf(buttonNum) > 0){
            randomNum();
        };
        // console.log("This number should NOT be in the array logged above: " + buttonNum);
        $("#button" + buttonNum).text(data.results[questionCount].correct_answer);
        $("#button" + buttonNum).attr("value", "correct");
        buttonArr = [];
    };

    //Start button event listener that hides the start button and shows the trivia questions
    $("#startGameContainer").click(function(){
        $("#startGameContainer").hide();
        $("#triviaContainer").show();
        renderQuestion();
    })

    //Event listener for clicks on the answer buttons
    $("button").click(function(){
        //If the button is the correct answer, the correct answer count is increased, question count is increased, and the next question is rendered
        if ($(this).attr("value") == "correct"){
            console.log("clicked correct button");
            time = 30;
            correctAnswers++;
            questionCount++;
            gameOverCheck();
            renderQuestion();
            stopTimer();
        }
        //If the button clicked is the incorrect answer, incorrect answer counter is increased, question count is increased, and the next question is rendered
        else if ($(this).attr("value") == "incorrect"){
            console.log("clicked incorrect button");
            time = 30;
            incorrectAnswers++;
            questionCount++;
            gameOverCheck();
            renderQuestion();
            stopTimer();
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
        stopTimer();
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
        time = 30;
        $("#triviaContainer").show();
        $("#finalScoreContainer").hide();
        myTimer;
    })

});
//Fucntion that makes the timer count down on each questions and increases the question count when the timer hits zero.
// var countDown = function(){
//     time = 30;
//     setInterval(function(){
//         if (time > 0){
//         console.log(time);
//         $("#timer").text(time);
//         time--;
//         }
//         else if (time === 0) {
//             questionCount++;
//             clearInterval();
//         }
//     }, 1000);
// }