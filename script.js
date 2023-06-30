// Game rules: rock beats scissors, scissors beat paper, and paper beats rock.


// Function which randomly returns Rock, Paper or Scissors
function getComputerChoice() {
    let things = ["Rock", "Paper", "Scissors"];
    let choice = things[Math.floor(Math.random()*things.length)];
    return choice;
}

console.log(getComputerChoice());