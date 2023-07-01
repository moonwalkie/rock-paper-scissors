// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.
// The game plays until whoever reaches a score of 3 first, which then is declared the winner

const choices = ["Rock", "Paper", "Scissors"];

// Score
let playerScore = 0;
let computerScore = 0;

let result = ["win", "lose", "tie"]

// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    return choices[Math.floor(Math.random() * Math.floor(choices.length))]
}
  
// Function which plays a round and returns win or lose
function playRound(playerSelection, computerSelection) {
    // Gets the index number of the array elements and returns a message based on specific combinations between the user and the computer's move
    if ((playerSelection === choices[0]) && (computerSelection === choices[2])) {
        result = "win";
        return "You Win! Rock beats Scissors";
    } else if ((playerSelection === choices[2]) && (computerSelection === choices[1])) {
        result = "win";
        return "You Win! Scissors beat Paper"; 
    } else if ((playerSelection === choices[1]) && (computerSelection === choices[0])) {
        result = "win";
        return "You Win! Paper beats Rock";
    } else if ((playerSelection === choices[2]) && (computerSelection === choices[0])) {
        result = "lose";
        return "You Lose! Rock beats Scissors";
    } else if ((playerSelection === choices[1]) && (computerSelection === choices[2])) {
        result = "lose";
        return "You Lose! Scissors beat Paper";
    } else if ((playerSelection == choices[0]) && (computerSelection === choices[1])) {
        result = "lose";
        return "You Lose! Paper beats Rock";
    } else {
        result = "tie";
        return "Tie! Play another round"; // The only combinations left are draws
    }
}

// Game loop
function game() {
    while (playerScore < 3 && computerScore < 3) { // Loops until who between the user and the computer reaches first a score of 3

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

        let playerSelection = prompt("Make your pick (rock, paper or scissors): ", '');
            playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase(); // The user inputs one of the three choices, which is case-insensitive, and always returns it with the first letter capitalized and the remaining lowercase
        const computerSelection = getComputerChoice();
        console.log("You chose: " + playerSelection);
        console.log("The computer has chosen: " + computerSelection);

        console.log(playRound(playerSelection, computerSelection)); // Logs the result of each round
        console.log(trackScore()); // Logs the score of each round
    }
}

function winner() {
    if (playerScore === 3 && playerScore > computerScore) {
        return "You Won! Congrats";
    } else {
        return "You Lost! Refresh the page to try again";
    }
}

game(); // Plays the loop
console.log(winner()); // Declares the user as winner or loser at the end of the game