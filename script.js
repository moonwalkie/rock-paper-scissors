'use strict';

// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.
// The game plays until whoever reaches a score of 5 first, which then is declared the winner

// Player Selection
let pick = document.querySelector('.pick');

let playerSelection = ['rockSelection', 'paperSelection', 'scissorsSelection'];
playerSelection[0] = document.querySelector('.rock-text');
playerSelection[1] = document.querySelector('.paper-text');
playerSelection[2] = document.querySelector('.scissors-text');

// Computer Selection
let choice = ['rockRight', 'paperRight', 'scissorsRight'];
choice[0] = document.getElementById('rock-right');
choice[1] = document.getElementById('paper-right');
choice[2] = document.getElementById('scissors-right');

// Animation
let rockLeft = document.getElementById('rock-left');
let paperLeft = document.getElementById('paper-left');
let scissorsLeft = document.getElementById('scissors-left');

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

// Declaring variables that change value in Event Listeners so that it can be called in function playRound()
let rockClicked = false;
let paperClicked = false;
let scissorsClicked = false;

// Event Listener for rock
playerSelection[0].addEventListener('click', () => {
    if (rockClicked) return; // Prevent multiple clicks
    rockClicked = true;
    rockLeft.classList.remove('hide');
    paperLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer'); // Removes pointer events while animation is playing
    rockLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    playRound(computerChoice);
    rightAnim(computerChoice); // Pass the same computerChoice here
});

rockLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer'); // Add back pointer events after animation is complete
    rockClicked = false; // Reset the flag
});

// Event Listener for paper
playerSelection[1].addEventListener('click', () => {
    if (paperClicked) return; // Prevent multiple clicks
    paperClicked = true;
    paperLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer');
    paperLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    playRound(computerChoice);
    rightAnim(computerChoice); // Pass the same computerChoice here
});

paperLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
    paperClicked = false; // Reset the flag
});

// Event Listener for scissors
playerSelection[2].addEventListener('click', () => {
    if (scissorsClicked) return; // Prevent multiple clicks
    scissorsClicked = true;
    scissorsLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    paperLeft.classList.add('hide');
    pick.classList.add('pointer');
    scissorsLeftAnim.playSegments([0, 90], true);
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    playRound(computerChoice);
    rightAnim(computerChoice); // Pass the same computerChoice here
});

scissorsLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
    scissorsClicked = false; // Reset the flag
});

//

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

    // Update the score display
    updateScoreDisplay();

    // Check if either player or computer has reached a score of 5
    if (currentPlayerScore === 5 || currentComputerScore === 5) {
        // Implement end of game logic here, e.g., show the winner
        if (currentPlayerScore === 5) {
            console.log('Player wins!');
        } else {
            console.log('Computer wins!');
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