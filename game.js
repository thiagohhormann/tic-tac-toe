initializeGame();

function sortMarks() {
  let markPlayer1 = Math.random() >= 0.5 ? "x" : "o";
  let markPlayer2 = markPlayer1 == "x" ? "o" : "x";

  return [markPlayer1, markPlayer2];
}

function initializeGame(player1 = "Player 1", player2 = "Player 2") {
  document.querySelectorAll(".square").forEach((e) => {
    e.innerHTML = "";
  });

  let marks = sortMarks();
  let [markPlayer1, markPlayer2] = marks;

  let labelScoreLeft =
    document.getElementsByClassName("score-left")[0].children;

  let labelScoreRight =
    document.getElementsByClassName("score-right")[0].children;

  labelScoreLeft[0].textContent = player1;
  labelScoreRight[0].textContent = player2;
  labelScoreLeft[1].textContent = markPlayer1.toUpperCase();
  labelScoreRight[1].textContent = markPlayer2.toUpperCase();
}



/*
const board = document.querySelectorAll(".square");

function getClickedIndexSquare(e) {
  e.addEventListener("click", () => {
    console.log(e.getAttribute("data-cell-index"));
  });
}
*/