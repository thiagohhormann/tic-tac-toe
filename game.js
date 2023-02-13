class Player {
  constructor(name, mark, wins = 0, loses = 0) {
    this.name = name;
    this.mark = mark;
    this.wins = wins;
    this.loses = loses;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getMark() {
    return this.mark;
  }

  setMark(mark) {
    this.mark = mark;
  }

  getWins() {
    return this.wins;
  }

  increaseWins() {
    this.wins++;
  }

  getLoses() {
    return this.loses;
  }

  increaseLoses() {
    this.loses++;
  }
}

class Game {
  constructor(status = 0, currentPlayer = "x") {
    this.status = status;
    this.currentPlayer = currentPlayer;
  }

  getStatus() {
    switch (this.status) {
      case 0:
        return "Not Started";
      case 1:
        return "Playing";
      case 2:
        return "Finished";
    }
  }

  setStatus(_status) {
    this.status = _status;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(currentPlayer) {
    this.currentPlayer = currentPlayer;
  }
}

function sortMarks() {
  let player1Mark = Math.random() >= 0.5 ? "x" : "o";
  let player2Mark = player1Mark == "x" ? "o" : "x";

  return [player1Mark, player2Mark];
}

const squares = document.querySelectorAll(".square");
const scoreLeft = document.getElementsByClassName("score-left");
const scoreRight = document.getElementsByClassName("score-right");
const gameStatus = document.getElementsByClassName("status");

const labelScoreLeft = scoreLeft[0].children;
const labelScoreRight = scoreRight[0].children;
const gameStatusLabel = gameStatus[0].children[0];

function cleanBoard() {
  squares.forEach((e) => {
    e.textContent = "";
  });
}

function setNames(player1 = "Player 1", player2 = "Player 2") {
  labelScoreLeft[0].textContent = player1;
  labelScoreRight[0].textContent = player2;
}

function setMarks(player1Mark, player2Mark) {
  labelScoreLeft[1].textContent = player1Mark.toUpperCase();
  labelScoreRight[1].textContent = player2Mark.toUpperCase();
}

function setGameStatus(game) {
  gameStatusLabel.textContent = game.getStatus();
}

let currentPlayer = "o";

function handlePlayerChange() {
  currentPlayer = currentPlayer == "x" ? "o" : "x";
  return currentPlayer;
}

function endGame(game) {
  game.setStatus(2);
  setGameStatus(game);
  rounds = 0;
  setTimeout(() => {
    resetGame();
  }, 2500);
}

function resetGame() {
  cleanBoard();
  [player1Mark, player2Mark] = sortMarks();
  player1.setMark(player1Mark);
  player2.setMark(player2Mark);
  setMarks(player1.getMark(), player2.getMark());
}

const game = new Game(1);

const urlParams = new URLSearchParams(window.location.search);
const player1Name = urlParams.get("player1");
const player2Name = urlParams.get("player2");

let [player1Mark, player2Mark] = sortMarks();

const player1 = new Player(player1Name || "Player 1", player1Mark);
const player2 = new Player(player2Name || "Player 2", player2Mark);

setNames(player1.getName(), player2.getName());
setMarks(player1.getMark(), player2.getMark());
setGameStatus(game);

let moves = [];
let rounds = 0;

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.textContent == "") {
      square.textContent = handlePlayerChange();
      rounds = moves.push(square.getAttribute("cell-index"));
    }
    if (rounds == 9) {
      endGame(game);
    }
  });
});
