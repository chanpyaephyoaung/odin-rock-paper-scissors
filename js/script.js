"use strict";

// Selecting DOM Elements

// Section -- Start
const sectionStart = document.querySelector(".section--start");
const formRound = document.querySelector(".form--round");
const formRoundInput = document.querySelector(".form--round__input");
const formRoundControls = document.querySelector(".form--round__controls");
const btnStart = document.querySelector(".btn--start");
const formRoundErrorText = document.querySelector(".form__round__error-text");

// Main
const gameContainer = document.querySelector(".main");

// Computer Section
const computerChoiceImg = document.querySelector(".computer__choice__img");
const computerScoreAmountText = document.querySelector(".computer__score__win__amount");
const computerDrawAmountText = document.querySelector(".computer__score__draw__amount");

// Player Section
const playerChoiceImg = document.querySelector(".player__choice__img");
const playerScoreAmountText = document.querySelector(".player__score__win__amount");
const playerDrawAmountText = document.querySelector(".player__score__draw__amount");

// Weapons Options
const choicesWrapper = document.querySelector(".choices__option__wrapper");
const btnChoices = Array.from(document.querySelectorAll(".btn--choices__option"));
const rockChoice = document.querySelector(".btn--choices__option--rock");
const paperChoice = document.querySelector(".btn--choices__option--paper");
const scissorsChoice = document.querySelector(".btn--choices__option--scissors");

// Judge Section

// Judge -- In-Game
const sectionJudgeInGame = document.querySelector(".section--judge--in-game");
const totalRoundNumText = document.querySelector(".round__number__max");
const roundText = document.querySelector(".round__number");
const currentRoundText = document.querySelector(".round__number__current");
const roundDecisionText = document.querySelector(".round__decision");
const roundDecisionVerbText = document.querySelector(".round__decision__verb");
const roundDecisionWinnerText = document.querySelector(".round__winner__text");
const roundDecisionWinnerChoiceText = document.querySelector(".round__winner--choice");
const roundDecisionLoserChoiceText = document.querySelector(".round__loser--choice");

class App {
  choices = [
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
  roundAmount = {
    currentRound: 1,
    totalRound: 0,
  };

  computer = {
    type: "computer",
    score: 0,
    drawAmount: 0,
    currentChoice: "",
  };

  player = {
    type: "player",
    score: 0,
    drawAmount: 0,
    currentChoice: "",
  };

  // States
  hasRoundInputError = false;
  isWeaponChosen = false;
  constructor() {
    formRound.addEventListener("submit", this._startGame.bind(this));
    choicesWrapper.addEventListener("click", this._playRound.bind(this));
  }

  // Get random number
  _randomChoice() {
    return Math.floor(Math.random() * 3);
  }

  // Get random computer choice
  _getComputerChoice() {
    return this.choices[this._randomChoice()].name;
  }

  // Capitalize first letter of the word
  _capitalizeWord(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }

  // Round Input Validation
  _validateRoundInput(input) {
    const showError = (errorText = "Invalid Input") => {
      this.hasRoundInputError = true;
      formRoundErrorText.classList.remove("hide");
      formRoundErrorText.textContent = errorText;
    };
    if (!input) {
      showError("Please enter an input.");
    } else if (input < 1 || input > 50) {
      showError("Please enter a number between 1 and 50.");
    } else {
      this.hasRoundInputError = false;
      formRoundErrorText.classList.add("hide");
    }
  }

  // Start the game after submitting the round input
  _startGame(e) {
    e.preventDefault();
    // Retrieve the input value for the number of round
    this.roundAmount.totalRound = formRoundInput.value;
    // Validate input
    this._validateRoundInput(+this.roundAmount.totalRound);
    if (this.hasRoundInputError) return;

    this._zoomOut(sectionStart, 400, formRoundControls, btnStart);
    gameContainer.classList.remove("hide");
    sectionJudgeInGame.classList.remove("hide");

    roundText.style.animation = "zoomIn 0.3s ease-in";
    totalRoundNumText.textContent = this.roundAmount.totalRound;
  }

  // Zoom out animation for the list of elements
  _zoomOut(tohideContainer, hideTime, ...elArr) {
    elArr.forEach(el => (el.style.animation = "zoomOut 0.3s ease-in forwards"));
    setTimeout(() => {
      tohideContainer.classList.add("hide");
    }, hideTime);
  }

  // Animation for choices' initiation
  _animatePlayersInitiation() {
    setTimeout(() => {
      computerChoiceImg.style.animation =
        "computerChoiceInitiation var(--choice-initiation-speed) var(--choice-initiation-count)";
      playerChoiceImg.style.animation =
        "playerChoiceInitiation var(--choice-initiation-speed) var(--choice-initiation-count)";
    }, 300);
  }

  // Select choice for the player
  _choosePlayerWeapon(e) {
    if (!this.isWeaponChosen) {
      const chosenWeapon = e.target.closest(".btn--choices__option");
      if (!chosenWeapon) return;
      this.isWeaponChosen = true;
      return chosenWeapon.dataset.choice;
    }
  }

  // Change the weapon choice
  _changeWeapon(choice, player) {
    setTimeout(() => {
      player.src = `img/${choice}-choice.svg`;
    }, 1600);
  }

  // Update the scores of both computer and player
  _updateScores() {
    computerScoreAmountText.textContent = this.computer.score;
    computerDrawAmountText.textContent = this.computer.drawAmount;

    playerScoreAmountText.textContent = this.player.score;
    playerDrawAmountText.textContent = this.player.drawAmount;
  }

  // Update the decision text after each round
  _updateWinner(winner, winChoice, loseChoice) {
    roundDecisionText.classList.remove("hide");
    if (!winner) {
      roundDecisionWinnerText.textContent = "Draw!";
      roundDecisionVerbText.textContent = "🤝";
    } else if (winner === "computer") {
      roundDecisionWinnerText.textContent = "You lose!";
      roundDecisionVerbText.textContent = "beats";
    } else if (winner === "player") {
      roundDecisionWinnerText.textContent = "You win!";
      roundDecisionVerbText.textContent = "beats";
    }
    roundDecisionWinnerChoiceText.textContent = this._capitalizeWord(winChoice);
    roundDecisionLoserChoiceText.textContent = this._capitalizeWord(loseChoice);
  }

  // Decide winner based on choices
  _decideWinner() {
    setTimeout(() => {
      const computerChoice = this.choices.find(
        choice => choice.name === this.computer.currentChoice
      );
      console.log(computerChoice);
      if (this.player.currentChoice === computerChoice.winChoice) {
        this.computer.score++;
        this._updateWinner(
          this.computer.type,
          this.computer.currentChoice,
          this.player.currentChoice
        );
        console.log(this.computer.type, this.computer.currentChoice, this.player.currentChoice);
        console.log("computer wins!");
      }
      if (this.player.currentChoice === computerChoice.loseChoice) {
        this.player.score++;
        this._updateWinner(
          this.player.type,
          this.player.currentChoice,
          this.computer.currentChoice
        );
        console.log(this.player.type, this.player.currentChoice, this.computer.currentChoice);
        console.log("player wins");
      }
      if (this.player.currentChoice === computerChoice.name) {
        this.player.drawAmount++;
        this.computer.drawAmount++;
        this._updateWinner(null, this.computer.currentChoice, this.player.currentChoice);
        console.log("draw!");
      }
      this._updateScores();
    }, 1800);
  }

  // Play a round of rps
  _playRound(e) {
    const playerWeapon = this._choosePlayerWeapon(e);
    if (!playerWeapon) return;
    this.player.currentChoice = playerWeapon;
    this._animatePlayersInitiation();

    // Change player weapon
    this._changeWeapon(this.player.currentChoice, playerChoiceImg);

    // Change computer weapon
    this.computer.currentChoice = this._getComputerChoice();
    this._changeWeapon(this.computer.currentChoice, computerChoiceImg);

    console.log(this.computer, this.player);
    // console.log(this.player);
    this._decideWinner();
  }
}

const app = new App();
