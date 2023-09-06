// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.
// The game plays until whoever reaches a score of 5 first, which then is declared the winner


// Player Selection
let pick = document.querySelector('.pick');

let playerSelection = ["rockSelection", "paperSelection", "scissorsSelection"];
rockSelection = document.querySelector('.rock-text');
paperSelection = document.querySelector('.paper-text');
scissorsSelection = document.querySelector('.scissors-text');

// Computer Selection
let choice = ["rockRight", "paperRight", "scissorsRight"];
rockRight = document.getElementById('rock-right');
paperRight = document.getElementById('paper-right');
scissorsRight = document.getElementById('scissors-right');

// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    return choice[Math.floor(Math.random() * choice.length)];
}

const computerSelection = getComputerChoice();

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

    container: rockRight,
    path: './assets/rock.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let paperRightAnim = bodymovin.loadAnimation({

    container: paperRight,
    path: './assets/paper.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

let scissorsRightAnim = bodymovin.loadAnimation({

    container: scissorsRight,
    path: './assets/scissors.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
});

// Declaring variables that change value in Event Listeners so that it can be called in function playRound()
let rockClicked = false;
let paperClicked = false;
let scissorsClicked = false;

// Event Listener
rockSelection.addEventListener('click', () => {
    rockClicked = true;
    rockLeft.classList.remove('hide');
    paperLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer'); // Removes pointer events while animation is playing
    rockLeftAnim.playSegments([0, 90], true);
    playRound();
    rightAnim();
});

rockLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer'); // Add back pointer events after animation is complete
});
/////////////////////////////////////////////////////
paperSelection.addEventListener('click', () => {
    paperClicked = true;
    paperLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    scissorsLeft.classList.add('hide');
    pick.classList.add('pointer');
    paperLeftAnim.playSegments([0, 90], true);
    playRound();
    rightAnim();
});

paperLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
});
/////////////////////////////////////////////////////
scissorsSelection.addEventListener('click', () => {
    scissorsClicked = true;
    scissorsLeft.classList.remove('hide');
    rockLeft.classList.add('hide');
    paperLeft.classList.add('hide');
    pick.classList.add('pointer');
    scissorsLeftAnim.playSegments([0, 90], true);
    playRound();
    rightAnim();
});

scissorsLeftAnim.addEventListener('complete', () => {
    pick.classList.remove('pointer');
});

// Function which plays an animation on the right hand depending on the specific choice, which is random
function rightAnim() {
    if (computerSelection === getComputerChoice(choice[0])) {
        rockRightAnim.playSegments([0, 90], true);
        rockRight.classList.remove('hide');
        paperRight.classList.add('hide');
        scissorsRight.classList.add('hide');

    } else if (computerSelection === getComputerChoice(choice[1])) {
        paperRightAnim.playSegments([0, 90], true);
        paperRight.classList.remove('hide');
        rockRight.classList.add('hide');
        scissorsRight.classList.add('hide');

    } else {
        scissorsRightAnim.playSegments([0, 90], true);
        scissorsRight.classList.remove('hide');
        rockRight.classList.add('hide');
        paperRight.classList.add('hide');

    }
}

// Score
let playerScore = 0;
let computerScore = 0;

let result = ["win", "lose", "tie"];

// Function which plays a round and returns win, lose or tie based on specific combinations
function playRound() {

    if ((rockClicked === true) && (computerSelection === getComputerChoice(choice[2]))) {
        result = "win";

    } else if ((scissorsClicked === true) && (computerSelection === getComputerChoice(choice[1]))) {
        result = "win";

    } else if ((paperClicked === true) && (computerSelection === getComputerChoice(choice[0]))) {
        result = "win";

    } else if ((scissorsClicked === true) && (computerSelection === getComputerChoice(choice[0]))) {
        result = "lose";
 
    } else if ((paperClicked === true) && (computerSelection === getComputerChoice(choice[2]))) {
        result = "lose";
 
    } else if ((rockClicked === true) && (computerSelection === getComputerChoice(choice[1]))) {
        result = "lose";
  
    } else {
        result = "tie"; // The only combinations left are draws
        
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

// game(); // Plays the loop