// Function to create a random solvable Lights Out puzzle
function createRandomBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = Math.random() < 0.5 ? 0 : 1;
      }
    }
    return board;
  }
  
  // Function to toggle lights and update the board
  function toggleLights(row, col) {
    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);
  
    renderBoard(); // Update the visual representation of the board
    checkWin();
  }
  
  // Function to toggle a single cell
  function toggleCell(row, col) {
    if (row >= 0 && row < size && col >= 0 && col < size) {
      board[row][col] = 1 - board[row][col];
    }
  }
  
  // Function to check if the puzzle is solved
  function checkWin() {
    if (board.every(row => row.every(cell => cell === 0))) {
      playWinGif();
      window.alert("You win!");
    }
  }
  
  // Function to render the board
  function renderBoard() {
    const table = document.getElementById('lightsOutBoard');
    table.innerHTML = '';
  
    for (let i = 0; i < size; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < size; j++) {
        const cell = document.createElement('td');
        cell.classList.toggle('active', board[i][j] === 1);
        cell.addEventListener('click', () => toggleLights(i, j));
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  
  // Function to play the win GIF
  function playWinGif() {
    const winGif = document.getElementById('winGif');
    winGif.classList.remove('hidden');
  }
  
  // Function to activate cheat mode
  function activateCheat() {
    // Set all cells to lights off
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board[i][j] = 0;
      }
    }
    renderBoard();
    checkWin(); // Instant win when cheat is activated
  }
  
  const size = 5; // Adjust the size of the board as needed
  let board = createRandomBoard(size);
  renderBoard();
  
  // Attach event listener to the cheat button
  const cheatButton = document.getElementById('cheatButton');
  cheatButton.addEventListener('click', activateCheat);
  