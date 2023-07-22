document.addEventListener("DOMContentLoaded", function() {
  const continueButton = document.getElementById("continueButton");
  const hiddenParagraph = document.getElementById("hiddenParagraph");
  const imageButton = document.getElementById("imageButton");
  const hiddenContent = document.getElementById("hiddenContent");
  const newButton = document.getElementById("newButton");

  continueButton.addEventListener("click", function() {
    hiddenParagraph.style.display = "block"; // Show the hidden paragraph
  });

  imageButton.addEventListener("click", function() {
    hiddenContent.style.display = "block"; // Show the hidden content (paragraph and button)
  });

  newButton.addEventListener("click", function() {
    // Function to generate a new Sudoku puzzle
    function generateSudoku() {
      // Implement the Sudoku puzzle generation logic here
      // You can use Sudoku generation algorithms to create a puzzle
      // For simplicity, let's use a sample puzzle as an example
      const sudokuPuzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];

      renderSudoku(sudokuPuzzle);
    }

    // Function to render the Sudoku puzzle on the grid
    function renderSudoku(sudokuPuzzle) {
      const sudokuBoard = document.getElementById("sudokuBoard");
      sudokuBoard.innerHTML = ""; // Clear the previous grid

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cellValue = sudokuPuzzle[i][j];
          const cell = document.createElement("input");
          cell.type = "text";
          cell.value = cellValue === 0 ? "" : cellValue;
          cell.disabled = cellValue !== 0; // Disable pre-filled cells
          cell.classList.add("sudoku-cell");
          sudokuBoard.appendChild(cell);
        }
      }

      // Show the Sudoku grid
      sudokuBoard.style.display = "grid";
      sudokuBoard.style.gridTemplateColumns = "repeat(9, 30px)"; // Each cell is 30px wide
      sudokuBoard.style.gridTemplateRows = "repeat(9, 30px)";    // Each cell is 30px high
      sudokuBoard.style.gap = "1px"; // Add 1px gap between cells

      // Hide the "Start Sudoku Game" button
      newButton.style.display = "none";
    }

    // Function to check if the Sudoku puzzle is solved correctly
    function isSudokuSolved() {
      const sudokuBoard = document.getElementById("sudokuBoard");
      const cells = sudokuBoard.querySelectorAll("input");

      // Check rows
      for (let i = 0; i < 9; i++) {
        const rowValues = new Set();
        for (let j = 0; j < 9; j++) {
          const cellValue = Number(cells[i * 9 + j].value);
          if (isNaN(cellValue) || cellValue < 1 || cellValue > 9 || rowValues.has(cellValue)) {
            return false; // Invalid or duplicate number in the row
          }
          rowValues.add(cellValue);
        }
      }

      // Check columns
      for (let j = 0; j < 9; j++) {
        const colValues = new Set();
        for (let i = 0; i < 9; i++) {
          const cellValue = Number(cells[i * 9 + j].value);
          if (isNaN(cellValue) || cellValue < 1 || cellValue > 9 || colValues.has(cellValue)) {
            return false; // Invalid or duplicate number in the column
          }
          colValues.add(cellValue);
        }
      }

      // Check 3x3 subgrids
      for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
          const subgridValues = new Set();
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              const cellValue = Number(cells[(i + r) * 9 + (j + c)].value);
              if (isNaN(cellValue) || cellValue < 1 || cellValue > 9 || subgridValues.has(cellValue)) {
                return false; // Invalid or duplicate number in the subgrid
              }
              subgridValues.add(cellValue);
            }
          }
        }
      }

      return true; // Sudoku puzzle is solved correctly
    }

    // Call the generateSudoku() function to generate a new puzzle and display it on the grid
    generateSudoku();

    // Add event listener to the "Submit" button to check if the player has won
    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", function() {
      if (isSudokuSolved()) {
        alert("Congratulations! You solved the Sudoku BRYAN puzzle! i hope you are no longer upset that im always gone :))");
      } else {
        alert("Oops mali ung ginawa mo sis.. palta.");
      }
    });
    hiddenContent.appendChild(submitButton);
  });
});
