// ! button_Color is an array that stores the color name of the buttons
var button_Color = ["red", "blue", "green", "yellow"];

// ! game_Pattern stores the color flashed by the game in the array
var game_Pattern = [];

// ! user_Clicked_Pattern stores the color pressed by the user in the array
var user_Clicked_Pattern = [];

// ! variable to keep a track of whether if the game has started or not  
var started = false;

// ! variable to indicate the current level of game
var level = 0;

// ! The keypress action to start the game
$(document).keypress(function () {

    if (!started) {

        $("#level-title").text(`Level ${level}`);
        next_Sequence();
        started = true;
    }
});

// ! This event listener detects the players key press
$(".btn").click(function () {

    var user_Chosen_Color = $(this).attr("id");
    user_Clicked_Pattern.push(user_Chosen_Color);

    play_Sound(user_Chosen_Color);
    animate_Press(user_Chosen_Color);

    check_Answer(user_Clicked_Pattern.length - 1);

});

// ! Function to check the answer of user with that of the game pattern
function check_Answer(current_Level) {

    if (game_Pattern[current_Level] === user_Clicked_Pattern[current_Level]) {

        if (user_Clicked_Pattern.length === game_Pattern.length) {
            setTimeout(function () {
                next_Sequence();
            }, 1000);
        }
    } else {

        play_Sound("wrong");

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")

        start_Over();
    }
}

// ! next_sequence function that produce new color sequence in the game
function next_Sequence() {

    user_Clicked_Pattern = [];

    // ! Level increments, every time next_sequence is called
    level++;

    $("#level-title").text(`Level ${level}`);

    // ! Random number generator that acts as index to select a color from array button_Color
    var random_Number = Math.floor(Math.random() * 4);

    // ! Randomly choses color from button_Color array
    var random_Chosen_Color = button_Color[random_Number];
    game_Pattern.push(random_Chosen_Color);

    // ! Animation for button flash
    $(`#${random_Chosen_Color}`).fadeIn(200).fadeOut(200).fadeIn(200);
    play_Sound(random_Chosen_Color);

}

// ! This function plays the sound associated to the button that is flashed by the game and when the player presses the button
function play_Sound(name) {

    var button_sound = new Audio(`sounds/${name}.mp3`);
    button_sound.play();
}

// ! This function animates the button pressed
function animate_Press(current_Color) {

    $(`#${current_Color}`).addClass("pressed");

    setTimeout(function () {
        $(`#${current_Color}`).removeClass("pressed");;
    }, 100);

}

// ! This function restarts the game
function start_Over() {

    level = 0;
    game_Pattern = [];
    started = false;
}