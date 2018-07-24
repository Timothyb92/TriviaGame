// api url
//https://opentdb.com/api.php?amount=10


//Global variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var timeoutAnswers = 0;
var questionCount = 0;


//API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=9&type=multiple", function(data){
    // console.log(data);
    console.log(data.results);
    console.log(data.results[0].question)

    $(".question").text(data.results[0].question);
})