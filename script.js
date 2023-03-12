const choices = [
  {
    name: "rock",
    winChoice: "scissors",
    loseChoice: "paper",
  },
  {
    name: "scissors",
    winChoice: "paper",
    loseChoice: "rock",
  },
  {
    name: "paper",
    winChoice: "rock",
    loseChoice: "scissors",
  },
];

const computer = {
  score: 0,
};

const player = {
  score: 0,
};

// Get random number
const randomChoice = () => {
  return Math.floor(Math.random() * 3);
};

// Get random computer choice
const getComputerChoice = () => {
  return choices[randomChoice()].name;
};

// Play one round and decide winner of the round
const playRound = (computerSelection, playerSelection) => {
  const capitalizeWord = word => word.replace(word[0], word[0].toUpperCase());
  const capitalizedCompSelection = capitalizeWord(computerSelection);
  const capitalizedPlayerSelection = capitalizeWord(playerSelection);
  const computerChoice = choices.find(choice => choice.name === computerSelection);

  if (playerSelection === computerChoice.winChoice) {
    computer.score++;
    console.log(
      `You lose this round! ${capitalizedCompSelection} beats ${capitalizedPlayerSelection}!`
    );
    return;
  }
  if (playerSelection === computerChoice.loseChoice) {
    player.score++;
    console.log(
      `You win this round! ${capitalizedPlayerSelection} beats ${capitalizedCompSelection}!`
    );
    return;
  }
  if (playerSelection === computerChoice.name) {
    console.log(`Round is Draw! ${capitalizedCompSelection} 🤝 ${capitalizedPlayerSelection}!`);
    return;
  }
};

// Play game of nth rounds and decide winner
const game = roundsNum => {
  for (let i = 0; i < roundsNum; i++) {
    const playerChoice = prompt("Please choose your weapon.").toLowerCase();
    const computerChoice = getComputerChoice();
    playRound(computerChoice, playerChoice);
  }
  if (computer.score > player.score)
    console.log(
      `Player Score: ${player.score}, Computer Score: ${computer.score} - Computer Wins!`
    );
  else if (player.score > computer.score)
    console.log(`Player Score: ${player.score}, Computer Score: ${computer.score} - Player Wins!`);
  else console.log(`Player Score: ${player.score}, Computer Score: ${computer.score} - DRAW!!!`);
};

game(3);
