var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// Next Sequence for game
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    console.log("gamePattern = " + gamePattern);

    playSound(randomChosenColour);

}

// User chosen colors
$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    console.log("userClickedPattern = " + userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})



// To play sound for nextSequence or user clicked keys
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}



// To animate the color divs
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");

    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);

}

// User keypress to start the game
$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
            nextSequence();
            }, 1000);
    }
    }



    else{
        console.log("Wrong");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
        $("body").removeClass("game-over");

        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// Restart the game

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}