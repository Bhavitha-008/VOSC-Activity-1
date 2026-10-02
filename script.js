
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        const index = Number(cell.dataset.index);

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.disabled = true;

        let winningPattern = winningPatterns.find(function(pattern) {
            return pattern.every(function(position) {
                return board[position] === currentPlayer;
            });
        });

        if (winningPattern) {
            statusText.textContent = "Player " + currentPlayer + " wins!";

            winningPattern.forEach(function(position) {
                cells[position].classList.add("winner");
            });

            gameOver = true;
            cells.forEach(function(button) {
                button.disabled = true;
            });
            return;
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = "Player " + currentPlayer + "'s turn";
    });
});

resetButton.addEventListener("click", function() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("winner");
    });

    statusText.textContent = "Player X's turn";
});

