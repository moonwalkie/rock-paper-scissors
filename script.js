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
});

// Event Listener for paper
playerSelection[1].addEventListener('click', () => {
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
});

// Event Listener for scissors
playerSelection[2].addEventListener('click', () => {
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

//

let result = ['win', 'lose', 'tie'];

// Function which plays a round and returns win, lose or tie based on specific combinations
function playRound(computerChoice) {
    computerChoice = getComputerChoice().id; // Get the ID of the computer's choice element

    if (rockClicked) {
        if (computerChoice === 'rock-right') { // Compare with the ID
            result = 'tie';
        } else if (computerChoice === 'paper-right') {
            result = 'lose';
        } else {
            result = 'win';
        }
    } else if (paperClicked) {
        if (computerChoice === 'rock-right') {
            result = 'win';
        } else if (computerChoice === 'paper-right') {
            result = 'tie';
        } else {
            result = 'lose';
        }
    } else if (scissorsClicked) {
        if (computerChoice === 'rock-right') {
            result = 'lose';
        } else if (computerChoice === 'paper-right') {
            result = 'win';
        } else {
            result = 'tie';
        }
    }

        if (result === 'win') {
            playerScore[0].classList.add('hide');
            playerScore[1].classList.remove('hide');
            scoreTrack = 1;
            
        } else if ((result === 'win') && (scoreTrack === 1)) {
            playerScore[1].classList.add('hide');
            playerScore[2].classList.remove('hide');
            scoreTrack = 2;
        } else {

        }
    
}

// Score
let playerScore = [0, 1, 2, 3, 4, 5];
playerScore[0] = document.querySelector('.score.left .zero');
playerScore[1] = document.querySelector('.score.left .one');
playerScore[2] = document.querySelector('.score.left .two');
playerScore[3] = document.querySelector('.score.left .three');
playerScore[4] = document.querySelector('.score.left .four');
playerScore[5] = document.querySelector('.score.left .five');

let computerScore = [0, 1, 2, 3, 4, 5];
computerScore[0] = document.querySelector('.score.right .zero');
computerScore[1] = document.querySelector('.score.right .one');
computerScore[2] = document.querySelector('.score.right .two');
computerScore[3] = document.querySelector('.score.right .three');
computerScore[4] = document.querySelector('.score.right .four');
computerScore[5] = document.querySelector('.score.right .five');

let scoreTrack = 0;

/*
// Game loop
function game() {
    while (playerScore < 5 && computerScore < 5) { // Loops until who reaches first a score of 5 between the player and the computer
        
    }
}

function showFinalResult() {
    if (playerScore === 5 && playerScore > computerScore) {
        return 'You Won! Congrats';
    } else {
        return 'You Lost! Refresh the page to try again';
    }
}
*/