// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.
// The game plays until whoever reaches a score of 3 first, which then is declared the winner

let choice = ["rock", "paper", "scissors"];
choice[0] = document.getElementById('rock-right');
choice[1] = document.getElementById('paper-right');
choice[2] = document.getElementById('scissors-right');

let pick = document.querySelector('.pick');

let rockSelection = document.querySelector('.rock-text');
let paperSelection = document.querySelector('.paper-text');
let scissorsSelection = document.querySelector('.scissors-text');

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

// Event Listener

rockSelection.addEventListener('click', () => {
    rockLeft.classList.remove('hide');
    paperLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer');
    rockLeftAnim.playSegments([0, 90], true);
});

rockLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
});

paperSelection.addEventListener('click', () => {
    paperLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer');
    paperLeftAnim.playSegments([0, 90], true);
});

paperLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
});

scissorsSelection.addEventListener('click', () => {
    scissorsLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    paperLeft.classList.add('hide');
    pick.classList.add('pointer');
    scissorsLeftAnim.playSegments([0, 90], true);
});

scissorsLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
});

// Score
let playerScore = 0;
let computerScore = 0;

let result = ["win", "lose", "tie"];

// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    return choice[Math.floor(Math.random() * choice.length)];
}
  
// Function which plays a round and returns win or lose
function playRound(playerSelection, computerSelection) {
    // Gets the index number of the array elements and returns a message based on specific combinations between the user and the computer's move
    if ((playerSelection === rockSelection) && (computerSelection === choice[2])) {
        result = "win";
        return "You Win! Rock beats Scissors";
    } else if ((playerSelection === scissorsSelection) && (computerSelection === choice[1])) {
        result = "win";
        return "You Win! Scissors beat Paper"; 
    } else if ((playerSelection === paperSelection) && (computerSelection === choice[0])) {
        result = "win";
        return "You Win! Paper beats Rock";
    } else if ((playerSelection === scissorsSelection) && (computerSelection === choice[0])) {
        result = "lose";
        return "You Lose! Rock beats Scissors";
    } else if ((playerSelection === paperSelection) && (computerSelection === choice[2])) {
        result = "lose";
        return "You Lose! Scissors beat Paper";
    } else if ((playerSelection == rockSelection) && (computerSelection === choice[1])) {
        result = "lose";
        return "You Lose! Paper beats Rock";
    } else {
        result = "tie";
        return "Tie! Play another round"; // The only combinations left are draws
    }
}

// Game loop
function game() {
    while (playerScore < 3 && computerScore < 3) { // Loops until who reaches first a score of 3 between the user and the computer
        function trackScore() { // Tracks the score of the user and the computer for each round
            if (result === "win") {
                playerScore++
                return `Your score is: ${playerScore}` + " | " + `Computer's score is: ${computerScore}`;
            } else if (result === "lose") {
                computerScore++
                return `Your score is: ${playerScore}` + " | " + `Computer's score is: ${computerScore}`;
            } else {
                return `Your score is: ${playerScore}` + " | " + `Computer's score is: ${computerScore}`;
            }
        }

        let playerSelection = document.querySelector('.pick');

        const computerSelection = getComputerChoice();
        console.log("You chose: " + playerSelection);
        console.log("The computer has chosen: " + computerSelection);

        console.log(playRound(playerSelection, computerSelection)); // Logs the result of each round
        console.log(trackScore()); // Logs the score of each round
    }
}

function showFinalResult() {
    if (playerScore === 3 && playerScore > computerScore) {
        return "You Won! Congrats";
    } else {
        return "You Lost! Refresh the page to try again";
    }
}
/*
game(); // Plays the loop
console.log(showFinalResult()); // Declares the user as winner or loser at the end of the game
*/
