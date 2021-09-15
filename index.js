
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];

let randColor;
let seq = 0;
let speed = 600;
let level = 1;
let started = false;

// start game
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        makeSequence();
        started = true;
    }
});

// when user clicks a button
$(".btn").click(function () {
    if (started) {
        if (gamePattern.length !== userPattern.length) {
            userPattern.push($(this).attr("id"));
            animateAndSound($(this).attr("id"));
            console.log(userPattern);
        }

        if (gamePattern.length === userPattern.length) {
            checkAnswer(userPattern);
        }
    }
});

// check for user's pattern against game pattern
function checkAnswer(pattern) {
    var ans = false;
    if (gamePattern.sort().join(',') === userPattern.sort().join(',')) {
        ans = true;
    }

    if (ans) {
        userPattern = [];
        gamePattern = [];
        level++;
        $("#level-title").text("Level " + level);
        seq = 0;
        if (speed > 200)
            speed -= 100;
        makeSequence();
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("#level-title").text("Game Over, Press Any Key to Restart.");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        resetGame();
    }
}

// generate game squence
function makeSequence() {
    setTimeout(function () {
        var randNum = Math.round(Math.random() * 3);
        randColor = buttonColors[randNum];
        gamePattern.push(randColor);
        animateAndSound(randColor);
        seq++;

        if (seq < 4) {
            makeSequence();
        }
    }, speed);
}

// animate and make sound whenever a button is clicked
function animateAndSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();

    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

// reset game when user makes wrong pattern
function resetGame() {
    gamePattern = [];
    userPattern = [];
    level = 1;
    seq = 0;
    speed = 600;
    started = false;
}