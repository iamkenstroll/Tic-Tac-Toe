const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const clearBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const addMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  return { getBoard, clearBoard, addMark };
})();

const playerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};

const game = (() => {
  let player1, player2, currentPlayer, gameOver;
  const boardCells = document.querySelectorAll(".board-cell");
  const message = document.querySelector(".message");
  const restartBtn = document.querySelector(".restart-btn");

  const initialize = () => {
    player1 = playerFactory("Player1", "X");
    player2 = playerFactory("Player2", "O");
    currentPlayer = player1;
    gameOver = false;
    boardCells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameOver && gameBoard.addMark(index, currentPlayer.getMark())) {
          cell.textContent = currentPlayer.getMark();
          if (checkWinner()) {
            message.textContent = `${currentPlayer.getName()} Wins!`;
            gameOver = true;
          } else if (checkTie()) {
            message.textContent = "It's a tie!";
            gameOver = true;
          } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            message.textContent = `${currentPlayer.getName()}'s turn`;
          }
        }
      });
    });

    restartBtn.addEventListener("click", restartGame);
  };

  const checkWinner = () => {
    const board = gameBoard.getBoard();
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkTie = () => {
    const board = gameBoard.getBoard();
    return board.every((cell) => cell !== "");
  };

  const restartGame = () => {
    gameBoard.clearBoard();
    boardCells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = player1;
    message.textContent = `${currentPlayer.getName()}'s turn`;
    gameOver = false;
  };

  return { initialize };
})();

game.initialize();
