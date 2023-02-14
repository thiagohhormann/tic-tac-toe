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

// If it is not the game page, the script won't load
const divs = document.querySelector(".board");

if (divs) {
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

  const urlParams = new URLSearchParams(window.location.search);
  const player1Name = urlParams.get("player1");
  const player2Name = urlParams.get("player2");

  
  const player1 = new Player(player1Name || "Player 1", player1Mark);
  const player2 = new Player(player2Name || "Player 2", player2Mark);
  
  function defineFirstPlayer(player1, player2) {
    if (player1.getMark() == "x") {
      return player1;
    }
    return player2;
  }
  
  function setNewMarks(player1, player2){
    player1Mark, player2Mark = sortMarks();
    player1.setMark(player1Mark);
    player2.setMark(player2Mark);
  }
  
  const game = new Game(1, defineFirstPlayer(player1, player2));

  function setNamesLabels(player1Name = "Player 1", player2Name = "Player 2") {
    labelScoreLeft[0].textContent = player1Name;
    labelScoreRight[0].textContent = player2Name;
  }

  function setMarksLabels(player1Mark, player2Mark) {
    labelScoreLeft[1].textContent = player1Mark.toUpperCase();
    labelScoreRight[1].textContent = player2Mark.toUpperCase();
  }

  function setGameStatusLabel(_game, message) {
    gameStatusLabel.textContent = message;
  }

  setNamesLabels(player1.getName(), player2.getName());

  function startGame(game, player1, player2) {
    cleanBoard();

    setNewMarks(player1, player2);
    setMarksLabels(player1.getMark(), player2.getMark());
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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /*  checkForWinner(){

  }*/

  
  startGame(game, player1, player2);

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent == "") {
        square.textContent = game.getCurrentPlayer().getMark();
        game.setCurrentPlayer(handlePlayerChange(game, player1, player2));
        setGameStatusLabel(game, game.getCurrentPlayer().getName() + "'s turn")
        game.addRound(square.getAttribute("cell-index"));

        if (checkForDraw(game)) {
          endGame(game, "Draw!");

          setTimeout(() => {
            startGame(game, player1, player2);
          }, 2500);
        }
      }
    });
  });
}
/*
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent == "") {
        square.textContent = ;
  
        if(game.getCurrentPlayer() == player1.getName()){
          game.setCurrentPlayer(player2.getName())
        } else {
          game.setCurrentPlayer(player1.getName())
        }
  
        message = game.getCurrentPlayer() + "'s turn";
        setGameStatus(game, message);
  
        rounds = moves.push(square.getAttribute("cell-index"));
      }
  
      if (!checkRounds(rounds)) {
        moves = [];
        endGame(game);
      }
    });
  });
}


  let moves = [];
  let rounds;
  let checkRounds = function (rounds) {
    if (rounds >= 9) {
      return 0;
    }

    return 1;
  };

// Necessário refazer lógica para ter um main chamando as funções e uma função para o primeiro a jogar
// definir primeiro player e configurar status's game
// definir current player e configurar status
// juntar primeiro player na função handler 
*/
