// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.

const choices = ["Rock", "Paper", "Scissors"];

// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    return choices[Math.floor(Math.random() * Math.floor(choices.length))]
}

// Function which plays a round and returns if you win or lose
function playRound(playerSelection, computerSelection) {
    if ((playerSelection === choices[0]) && (computerSelection === choices[2])) {
        return "You Win! Rock beats Scissors";
    } else if ((playerSelection === choices[2]) && (computerSelection === choices[1])) {
        return "You Win! Scissors beat Paper"; 
    } else if ((playerSelection === choices[1]) && (computerSelection === choices[0])) {
        return "You Win! Paper beats Rock";
    } else if ((playerSelection === choices[2]) && (computerSelection === choices[0])) {
        return "You Lose! Rock beats Scissors";
    } else if ((playerSelection === choices[1]) && (computerSelection === choices[2])) {
        return "You Lose! Scissors beat Paper";
    } else if ((playerSelection == choices[0]) && (computerSelection === choices[1])) {
        return "You Lose! Paper beats Rock";
    } else {
        return "Tie! Play another round";
    }
}

const playerSelection = choices[0];
const computerSelection = getComputerChoice();
console.log("You chose: " + playerSelection);
console.log("The computer has chosen: " + computerSelection);

console.log(playRound(playerSelection, computerSelection));
