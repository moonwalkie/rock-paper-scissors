'use strict';

// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.
// The game plays until whoever reaches a score of 5 first, which then is declared the winner

// Player Selection
let playerSelection = ['rockSelection', 'paperSelection', 'scissorsSelection'];
playerSelection[0] = document.querySelector('.rock-text');
playerSelection[1] = document.querySelector('.paper-text');
playerSelection[2] = document.querySelector('.scissors-text');

// Animation selection left
let rockLeft = document.getElementById('rock-left');
let paperLeft = document.getElementById('paper-left');
let scissorsLeft = document.getElementById('scissors-left');

// Animation selection right
let choice = ['rockRight', 'paperRight', 'scissorsRight'];
choice[0] = document.getElementById('rock-right');
choice[1] = document.getElementById('paper-right');
choice[2] = document.getElementById('scissors-right');

// Left hand
let rockLeftAnim = bodymovin.loadAnimation({
    container: rockLeft,
    path: './assets/rock-flipped.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let paperLeftAnim = bodymovin.loadAnimation({
    container: paperLeft,
    path: './assets/paper-flipped.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let scissorsLeftAnim = bodymovin.loadAnimation({
    container: scissorsLeft,
    path: './assets/scissors-flipped.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

// Right hand
let rockRightAnim = bodymovin.loadAnimation({
    container: choice[0],
    path: './assets/rock.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let paperRightAnim = bodymovin.loadAnimation({
    container: choice[1],
    path: './assets/paper.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let scissorsRightAnim = bodymovin.loadAnimation({
    container: choice[2],
    path: './assets/scissors.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

// Flags
let rockClicked = false;
let paperClicked = false;
let scissorsClicked = false;

// Flag to track if animations are playing
let animationsPlaying = false;

// Event Listener for rock
playerSelection[0].addEventListener('click', () => {
    if (animationsPlaying) return;
    animationsPlaying = true;
    rockClicked = true;
    rockLeft.classList.remove('hide');
    paperLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    rockLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    playRound(computerChoice);
    rightAnim(computerChoice);
});

rockLeftAnim.addEventListener('complete', () => {
    animationsPlaying = false;
    rockClicked = false; // Reset the flag
});

// Event Listener for paper
playerSelection[1].addEventListener('click', () => {
    if (animationsPlaying) return;
    animationsPlaying = true;
    paperClicked = true;
    paperLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    paperLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    playRound(computerChoice);
    rightAnim(computerChoice);
});

paperLeftAnim.addEventListener('complete', () => {
    animationsPlaying = false;
    paperClicked = false; // Reset the flag
});

// Event Listener for scissors
playerSelection[2].addEventListener('click', () => {
    if (animationsPlaying) return;
    animationsPlaying = true;
    scissorsClicked = true;
    scissorsLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    paperLeft.classList.add('hide');
    scissorsLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    playRound(computerChoice);
    rightAnim(computerChoice);
});

scissorsLeftAnim.addEventListener('complete', () => {
    animationsPlaying = false;
    scissorsClicked = false; // Reset the flag
});

let computerChoice;

// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choice.length);
    return choice[randomIndex].id; // Use the id of the elements as computerChoice
}

// Function which plays an animation on the right hand depending on the specific choice, which is random
function rightAnim(computerChoice) {
    if (computerChoice === 'rock-right') {
        rockRightAnim.playSegments([0, 90], true);
        choice[0].classList.remove('hide');
        choice[1].classList.add('hide');
        choice[2].classList.add('hide');
    } else if (computerChoice === 'paper-right') {
        paperRightAnim.playSegments([0, 90], true);
        choice[1].classList.remove('hide');
        choice[0].classList.add('hide');
        choice[2].classList.add('hide');
    } else {
        scissorsRightAnim.playSegments([0, 90], true);
        choice[2].classList.remove('hide');
        choice[0].classList.add('hide');
        choice[1].classList.add('hide');
    }
}

// Function which plays a round and returns win, lose or tie based on specific combinations
function playRound(computerChoice) {
    let result = 'tie'; // Default to tie

    if (rockClicked) {
        if (computerChoice === 'paper-right') {
            result = 'lose';
        } else if (computerChoice === 'scissors-right') {
            result = 'win';
        }
    } else if (paperClicked) {
        if (computerChoice === 'rock-right') {
            result = 'win';
        } else if (computerChoice === 'scissors-right') {
            result = 'lose';
        }
    } else if (scissorsClicked) {
        if (computerChoice === 'rock-right') {
            result = 'lose';
        } else if (computerChoice === 'paper-right') {
            result = 'win';
        }
    }

    // Update the player and computer scores based on the result
    if (result === 'win') {
        currentPlayerScore++;
    } else if (result === 'lose') {
        currentComputerScore++;
    }

    // Update the score display with a delay of 1000 milliseconds (1 second)
    setTimeout(updateScoreDisplay, 1000);

    // Check if either player or computer has reached a score of 5
    if (currentPlayerScore === 5 || currentComputerScore === 5) {
        // Implement end of game logic here, e.g., show the winner
        if (currentPlayerScore === 5) {
            displayWinner('player');
        } else {
            displayWinner('computer');
        }
        // You may want to reset the scores and the game at this point
    }
}

// Function to initialize the score display
function initializeScoreDisplay() {
    // Hide all player and computer score images
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`player-score-${i}`).classList.add('hide');
        document.getElementById(`computer-score-${i}`).classList.add('hide');
    }

    // Show the initial score of 0 for both player and computer
    document.getElementById('player-score-0').classList.remove('hide');
    document.getElementById('computer-score-0').classList.remove('hide');
}

// Variables to track the current score for both player and computer
let currentPlayerScore = 0;
let currentComputerScore = 0;
initializeScoreDisplay();

// Function to update the score display
function updateScoreDisplay() {
    // Hide all player and computer score images
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`player-score-${i}`).classList.add('hide');
        document.getElementById(`computer-score-${i}`).classList.add('hide');
    }

    // Show the player and computer score images based on the current score
    document.getElementById(`player-score-${currentPlayerScore}`).classList.remove('hide');
    document.getElementById(`computer-score-${currentComputerScore}`).classList.remove('hide');
}

// Function to update the score based on the result of the round
function updateScore(result) {
    if (result === 'win') {
        currentPlayerScore++;
    } else if (result === 'lose') {
        currentComputerScore++;
    }

    // Update the score display
    updateScoreDisplay();
}

// Function to display the winner message with a delay and transition
function displayWinner(winner) {
    const winnerMessage = document.querySelector('.winner');
    const youWinMessage = document.querySelector('.you-win');
    const compWinsMessage = document.querySelector('.comp-wins');
    const playAgainButton = document.querySelector('.play-again');

    if (winner === 'player') {
        youWinMessage.classList.remove('hide');
        compWinsMessage.classList.add('hide');
    } else if (winner === 'computer') {
        compWinsMessage.classList.remove('hide');
        youWinMessage.classList.add('hide');
    }

    setTimeout(() => {
        winnerMessage.classList.remove('hide'); // Remove the 'hide' class to display the message
        winnerMessage.classList.add('fade-in'); // Apply the fade-in class for transition

        // Hide the pick section by adding 'hide' class and fading it out
        const pickSection = document.querySelector('.pick');
        pickSection.classList.add('fade-out');
        setTimeout(() => {
            pickSection.classList.add('hide'); // Hide the pick section after fade-out
        }, 500); // Delay the hiding of pick section to match the fade duration

        // Show the "Play Again" button by removing 'hide' class and fading it in
        playAgainButton.classList.remove('hide');
        setTimeout(() => {
            playAgainButton.classList.add('fade-in'); // Apply the fade-in class for transition
        }, 1000); // Delay the fading in of "Play Again" button after 1 second
    }, 1000); // Delay the appearance of the winner message for 1 second (1000 milliseconds)
}

// Add an event listener to the "Play Again" button to reset the game
const playAgainButton = document.querySelector('.play-again');
playAgainButton.addEventListener('click', () => {
    resetGame(); // Implement the resetGame function to reset the game
});

function resetGame() {
    const winnerMessage = document.querySelector('.winner');
    const pickSection = document.querySelector('.pick');
    const playAgainButton = document.querySelector('.play-again');

    // Hide the winner message and remove the fade-in class
    winnerMessage.classList.add('hide');
    winnerMessage.classList.remove('fade-in');

    // Reset the scores
    currentPlayerScore = 0;
    currentComputerScore = 0;
    updateScoreDisplay();

    // Show the pick section and remove the hide and fade-out classes
    pickSection.classList.remove('hide', 'fade-out');

    // Hide the "Play Again" button and remove the fade-in class
    playAgainButton.classList.add('hide');
    playAgainButton.classList.remove('fade-in');
}

// Call resetGame to initialize the game state
resetGame();


document.addEventListener('DOMContentLoaded', () => {
    const theme = document.querySelector('.theme');
    const body = document.body;
    let isAlternateTheme = false;

    theme.addEventListener('click', () => {
        if (isAlternateTheme) {
            // Toggle back to the default theme
            body.classList.remove('alt-theme');
            toggleTheme('warm');
        } else {
            // Toggle to the alternate theme
            body.classList.add('alt-theme');
            toggleTheme('cold');
        }

        // Update the theme state
        isAlternateTheme = !isAlternateTheme;
    });

    function toggleTheme(theme) {
        const themeWarm = document.querySelector('.theme-warm');
        const themeCold = document.querySelector('.theme-cold');

        if (theme === 'warm') {
            themeCold.classList.add('hide');
            themeWarm.classList.remove('hide');
        } else {
            themeWarm.classList.add('hide');
            themeCold.classList.remove('hide');
        }
    }
});