const board = document.getElementById('board');
const message = document.getElementById('message');
const playerXPanel = document.querySelector('.player-panel:nth-child(1) p');
const playerOPanel = document.querySelector('.player-panel:nth-child(2) p');
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];

function handleClick(index) {
  if (!cells[index]) {
    cells[index] = currentPlayer;
    render();
    if (checkWinner()) {
      message.innerText = `¡Jugador ${currentPlayer} gana!`;
      board.removeEventListener('click', handleCellClick);
    } else if (isBoardFull()) {
      message.innerText = '¡Es un empate!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updatePlayerPanel();
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function isBoardFull() {
  return cells.every(cell => cell !== '');
}

function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  render();
  board.addEventListener('click', handleCellClick);
  updatePlayerPanel();
  message.innerText = `Turno de ${currentPlayer}`;
}

function render() {
  cells.forEach((value, index) => {
    const cell = document.getElementsByClassName('cell')[index];
    cell.innerText = value;
  });
}

function handleCellClick(event) {
  const index = Array.from(event.target.parentNode.children).indexOf(event.target);
  handleClick(index);
}

function updatePlayerPanel() {
  if (currentPlayer === 'X') {
    playerXPanel.innerText = 'Tu turno';
    playerOPanel.innerText = 'Esperando...';
  } else {
    playerXPanel.innerText = 'Esperando...';
    playerOPanel.innerText = 'Tu turno';
  }
}

board.addEventListener('click', handleCellClick);
updatePlayerPanel();
message.innerText = `Turno de ${currentPlayer}`;
