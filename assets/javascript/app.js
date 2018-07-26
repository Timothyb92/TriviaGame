//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var questionCount = 0;
var time = 20;
var answerIsCorrect;
var timeout;
var myTimer;
var stopTimer;





//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=29&type=multiple", function(data){
    
    var renderQuestion = function(){
        //Initializes time for each question and immediately displays it on the screen for the user
        time = 20;
        $("#timer").text(time);

        //Variables to hold the value of each possible answer (randomly assigned with each question asked)
        var buttonNum;
        var randomNum = function(){
            buttonNum = Math.floor(Math.random() * 4);
        }
        //Empty array to house randomly assigned buttons for each question
        var buttonArr = [];
        
        //Function that counts time down to zero. Each second it updates the time remaining in the DOM. Once it hits zero, it reveals the answer screen
        var countDown = function(){
            console.log(time);
            time--;
            $("#timer").text(time);
            if (time === 0){
                timeout = true;
                revealAnswer();
            }
        }

        $("#triviaContainer").show();
        $("#answer").hide();
        //Function that stops the countdown timer
        stopTimer = function(){
            clearInterval(myTimer);
        };

        //starts count down timer for the question
        myTimer = setInterval(function(){
            if (questionCount < 10 && time >= 0){
                countDown();
            }
        }, 1000)
        
        //Puts the question at the current index in the Div displayed to the user
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
            $("#button" + buttonNum).text(value);
            $("#button" + buttonNum).attr("value", "incorrect");
        });

        //Puts the correct answer in the one remaining empty button
        while (buttonArr.indexOf(buttonNum) > 0){
            randomNum();
        };
        $("#button" + buttonNum).text(data.results[questionCount].correct_answer);
        $("#button" + buttonNum).attr("value", "correct");
        buttonArr = [];
    };

    //Start button event listener. Once clicked, hides the start button and shows the trivia questions
    $("#startGameContainer").click(function(){
        $("#startGameContainer").hide();
        $("#triviaContainer").show();
        renderQuestion();
    })

    //Event listener for clicks on the answer buttons
    $("button").click(function(){
        //If the button is the correct answer, the correct answer count is increased and the answer screen is shown
        if ($(this).attr("value") == "correct"){
            console.log("clicked correct button");
            correctAnswers++;
            answerIsCorrect = true;
            revealAnswer();
        }
        //If the button clicked is the incorrect answer, incorrect answer counter is increased and the answer screen is shown
        else if ($(this).attr("value") == "incorrect"){
            console.log("clicked incorrect button");
            incorrectAnswers++;
            answerIsCorrect = false;
            revealAnswer();
        }
    });

    //Function that tells the user if they got the answer right or wrong
    var revealAnswer = function(){
        stopTimer();
        //Hides the trivia questions
        $("#triviaContainer").hide();
        //If the answer the user clicked is correct, it tell them so and Deadpool gives them a thumbs up
        if (answerIsCorrect === true){
            $("#result").html("<h3>Correct!</h3>");
            $("#correctAnswer").text("");
            $("#answerImg").html("<img src='assets/images/deadpoolThumbsUp.jpg'>");

            //If the answer the user click is wrong, it tell them so and shows the correct answer. Deadpool gives them a thumbs down
        } else if (answerIsCorrect === false){
            $("#result").html("<h3>Nope!</h3>");
            $("#correctAnswer").text("The correct answer is " + data.results[questionCount].correct_answer);
            $("#answerImg").html("<img src='assets/images/deadpoolThumbsDown.gif'>");

            //If the user doesn't pick an answer in time, Deadpool gives them a thumbs down and show them the correct answer.
        } else if (timeout === true){
            unanswered++;
            $("#result").html("<h3>Times up!</h3>");
            $("#correctAnswer").text("The correct answer is " + data.results[questionCount].correct_answer);
            $("#answerImg").html("<img src='assets/images/deadpoolThumbsDown.gif'>");
        }
        //Shows the answer screen and increased the question count
        $("#answer").show();
        answerIsCorrect = null;
        timeout = null;
        setTimeout(function(){
            if (questionCount === 9){
                gameOverCheck();
            } else {
                questionCount++;
                renderQuestion();
            }
        }, 3000);
    };

    //Listens for click on the play again button at the final score screen
    //If clicked, the game restarts
    $("#playAgain").click(function(){
        questionCount = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        time = 20;
        $("#triviaContainer").show();
        $("#finalScoreContainer").hide();
        stopTimer();
        renderQuestion();
    })

    //Checks to see if the game is over. If it's over, the final score screen will be shown.
    var gameOverCheck = function(){
        if (questionCount === 9){
            $("#correctAnswersDiv").text("Correct answers: " + correctAnswers);
            $("#incorrectAnswersDiv").text("Incorrect answers: " + incorrectAnswers);
            $("#unansweredDiv").text("Unanswered questions: " + unanswered);
            $("#triviaContainer").hide();
            $("#answer").hide();
            $("#finalScoreContainer").show();
            stopTimer;
        }
    }
})


//Hides the questions,score and answer screen on load
$(document).ready(function(){
    $("#triviaContainer").hide();
    $("#finalScoreContainer").hide();
    $("#answer").hide();
    

});