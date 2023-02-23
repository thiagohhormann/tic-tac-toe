class Player {
  constructor(name, mark, color, wins = 0, loses = 0) {
    this.name = name;
    this.mark = mark;
    this.color = color;
    this.wins = wins;
    this.loses = loses;
    this.moves = [];
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

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
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

  getMoves() {
    return this.moves;
  }

  addMove(move) {
    this.moves.push(move);
  }

  cleanMoves() {
    this.moves = [];
  }
}

class Game {
  constructor(status = 0, currentPlayer, rounds = []) {
    this.status = status;
    this.currentPlayer = currentPlayer;
    this.rounds = rounds;
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

  getRounds() {
    return this.rounds;
  }

  addRound(round) {
    this.rounds.push(round);
  }

  cleanRounds() {
    this.rounds = [];
  }
}

let player1Mark;
let player2Mark;

function sortMarks() {
  player1Mark = Math.random() >= 0.5 ? "x" : "o";
  player2Mark = player1Mark == "x" ? "o" : "x";

  return player1Mark, player2Mark;
}

if (document.getElementsByClassName("board").length) {
  const squares = document.querySelectorAll(".square");
  const scoreLeft = document.getElementById("score-left");
  const scoreRight = document.getElementById("score-right");
  const gameStatus = document.getElementById("status");

  const labelScoreLeft = scoreLeft.children;
  const labelScoreRight = scoreRight.children;
  const gameStatusLabel = gameStatus.children[0];

  function cleanBoard() {
    squares.forEach((e) => {
      e.textContent = "";
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const player1Name = urlParams.get("player1");
  const player1color = urlParams.get("player1color");
  const player2Name = urlParams.get("player2");
  const player2color = urlParams.get("player2color");

  const player1 = new Player(
    player1Name || "Player 1",
    player1Mark,
    player1color
  );
  const player2 = new Player(
    player2Name || "Player 2",
    player2Mark,
    player2color
  );

  function defineFirstPlayer(player1, player2) {
    if (player1.getMark() == "x") {
      return player1;
    }
    return player2;
  }

  function setNewMarks(player1, player2) {
    player1Mark, (player2Mark = sortMarks());
    player1.setMark(player1Mark);
    player2.setMark(player2Mark);
  }

  const game = new Game(1, defineFirstPlayer(player1, player2));

  function setNamesLabels(player1, player2) {
    labelScoreLeft[0].textContent = player1.getName();
    labelScoreRight[0].textContent = player2.getName();
  }

  function setMarksLabels(player1, player2) {
    labelScoreLeft[1].textContent = player1.getMark().toUpperCase();
    labelScoreLeft[1].style.color = player1.getColor();
    labelScoreRight[1].textContent = player2.getMark().toUpperCase();
    labelScoreRight[1].style.color = player2.getColor();
  }

  function setPlayersColor(player1, player2) {
    scoreLeft.style.border = "2px solid " + player1.getColor();
    scoreLeft.style.background = player1.getColor();

    scoreRight.style.border = "2px solid " + player2.getColor();
    scoreRight.style.background = player2.getColor();
  }

  function setGameStatusLabel(game, message) {
    gameStatusLabel.textContent = message;
    gameStatus.style.border = "5px solid" + game.getCurrentPlayer().getColor();
    gameStatus.style.borderInline = 0;
    
  }

  setNamesLabels(player1, player2);
  setPlayersColor(player1, player2);

  function startGame(game, player1, player2) {
    cleanBoard();

    game.cleanRounds();
    player1.cleanMoves();
    player2.cleanMoves();

    setPlayersColor(player1, player2);
    setNewMarks(player1, player2);
    setMarksLabels(player1, player2);
    game.setCurrentPlayer(defineFirstPlayer(player1, player2));
    setGameStatusLabel(game, game.getCurrentPlayer().getName() + "'s turn");
  }

  function endGame(game, message) {
    game.setStatus(3);
    setGameStatusLabel(game, message);
  }

  function handlePlayerChange(game, player1, player2) {
    return game.getCurrentPlayer() == player1 ? player2 : player1;
  }

  function checkForDraw(game) {
    if (game.getRounds().length >= 9) {
      game.cleanRounds();
      return true;
    }

    return false;
  }

  const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let count = 0;
  const equalCheck = (arr, moves) => {
    count = 0;

    moves.forEach((el) => {
      if (arr.includes(el)) {
        count++;
      }
    });

    if (count >= 3) {
      return true;
    }

    return false;
  };

  function checkForWinner(currentPlayer) {
    const moves = currentPlayer.getMoves();
    let status = false;

    moves.sort((a, b) => {
      return a - b;
    });

    if (moves.length >= 3) {
      winningConditions.forEach((arr) => {
        console.log(equalCheck(arr, moves));
        console.log(arr, moves);
        if (equalCheck(arr, moves)) {
          status = true;
          return;
        }
      });
    }

    return status;
  }

  startGame(game, player1, player2);

  squares.forEach((square) => {
    square.addEventListener("click", (event) => {
      let currentPlayer = game.getCurrentPlayer();
      let currentPlayerName = currentPlayer.getName();
      let currentPlayerMark = currentPlayer.getMark();
      let currentPlayerColor = currentPlayer.getColor();

      if (square.textContent === "") {
        square.style.color = currentPlayerColor;
        square.textContent = currentPlayerMark;

        let cellIndex = parseInt(square.getAttribute("cell-index"));

        game.addRound(cellIndex);
        currentPlayer.addMove(cellIndex);

        let winner = checkForWinner(currentPlayer);

        if (winner) {
          let message = currentPlayerName + " Wins!";
          endGame(game, message);

          setTimeout(() => {
            startGame(game, player1, player2);
          }, 1000);

          return;
        }

        if (checkForDraw(game)) {
          endGame(game, "Draw!");

          setTimeout(() => {
            startGame(game, player1, player2);
          }, 1000);

          return;
        }

        game.setCurrentPlayer(handlePlayerChange(game, player1, player2));
        setGameStatusLabel(game, game.getCurrentPlayer().getName() + "'s turn");
      }
    });
  });
}
