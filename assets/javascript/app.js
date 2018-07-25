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
var answerIsCorrect;

//Function that counts time down to zero
var countDown = function(){
    console.log(time);
    $("#timer").text(time);
    time--;
}
//Function that stops the countdown timer
var stopTimer = function(){
    clearInterval(myTimer);
    time = 30;
}

//Function that calls countDown() and runs it every second
var myTimer = setInterval(function(){
    if (time >= 0){
        countDown();
    }
}, 1000)


//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=29&type=multiple", function(data){    
    //Function that assigns each possible answer to a random button for each question
    var renderQuestion = function(){
        //Puts the question at the current index in the Div displayed to the user
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
            answerIsCorrect = true;
            revealAnswer();
            //!!!!!!!!! NEED TO PUT THESE ON THE ANSWER RESULT SCREEN WHEN IT'S ADDED !!!!!!!!!
            // questionCount++;
            // gameOverCheck();
            // renderQuestion();
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        //If the button clicked is the incorrect answer, incorrect answer counter is increased, question count is increased, and the next question is rendered
        else if ($(this).attr("value") == "incorrect"){
            console.log("clicked incorrect button");
            time = 30;
            incorrectAnswers++;
            answerIsCorrect = false;
            revealAnswer();
            //!!!!!!!!! NEED TO PUT THESE ON THE ANSWER RESULT SCREEN WHEN IT'S ADDED !!!!!!!!!
            // questionCount++;
            // gameOverCheck();
            // renderQuestion();
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    });
    var revealAnswer = function(){
        stopTimer();
        $("#triviaContainer").hide();
        if (answerIsCorrect){
            $("#result").text("Correct!")
            $("#answerImg").text() //IMAGE FOR CORRECT GUESS WILL GO HERE
        } else if (!answerIsCorrect){
            $("#result").text("Nope!")
            $("#correctAnswer").text("The correct answer is " + data.results[questionCount].correct_answer);
            $("#answerImg").text() //IMAGE FOR INCORRECT GUESS WILL GO HERE
        } else {
            $("#result").text("Times up!")
            $("#correctAnswer").text("The correct answer is " + data.results[questionCount].correct_answer);
            $("#answerImg").text() //IMAGE FOR INCORRECT GUESS WILL GO HERE
        }
        $("#answer").show();
        questionCount++;
    };
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
    $("#answer").hide();
    
    $("#playAgain").click(function(){
        console.log("Play again clicked")
        questionCount = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        time = 30;
        $("#triviaContainer").show();
        $("#finalScoreContainer").hide();
    })

});