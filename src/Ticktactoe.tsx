import { useState } from "react";

const generateBoard = (size: number) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

// type Board = Array<undefined | string>;
// type Board = undefined[][] | string[][];
type Row = (string | undefined)[];
type Board = Row[];

/**
 * Tic Tac Toe game component.
 */
const Ticktactoe = () => {
  // Define the number of cells on the board
  const NUMBER_OF_CELLS = 3;

  // Generate the initial board state
  // const [board, setBoard] = useState(generateBoard(NUMBER_OF_CELLS));
  const [board, setBoard] = useState<Array<Array<string | undefined>>>(
    generateBoard(NUMBER_OF_CELLS)
  );
  // Track the current player
  const [currentPlayer, setCurrentPlayer] = useState("X");

  /**
   * Check if any row in the board contains identical non-empty values.
   * @param board - The board to check.
   * @returns True if there is a winning row, otherwise false.
   */
  function checkHorizontal(board: Board) {
    for (const row of board) {
      const rowSet = new Set(row);
      if (rowSet.size === 1 && !rowSet.has(undefined)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Convert rows to columns in the board.
   *
   * @param board - The board to convert.
   * @returns The converted board with columns instead of rows.
   */
  function rowsToCols(board: Board): Board {
    const newBoard = []; // Initialize an empty array to store the converted board
    let column = 0; // Initialize a variable to keep track of the column index

    // Iterate over the columns of the board
    while (column < board.length) {
      const newRow = []; // Initialize an empty array to store the new row

      // Iterate over the rows of the board
      for (let row = 0; row < board.length; row++) {
        newRow.push(board[row][column]); // Push the element at the current row and column to the new row
      }

      newBoard.push(newRow); // Push the new row to the converted board
      column++; // Increment the column index
    }

    return newBoard; // Return the converted board
  }

  /**
   * Convert diagonal elements of the board to rows.
   * @param board - The board to convert.
   * @returns The converted board with diagonal elements as rows.
   */
  function diagToRows(board: Board): Board {
    const convertedBoard: Board = [[], []]; // Create a new 2D array to store the converted board

    let increment = 0; // Initialize variable for incrementing the indices
    let decrement = board.length - 1; // Initialize variable for decrementing the indices

    while (increment < board.length) {
      // Convert diagonal elements to rows
      convertedBoard[0].push(board[increment][increment]);
      convertedBoard[1].push(board[increment][decrement]);

      increment++;
      decrement--;
    }

    return convertedBoard; // Return the converted board
  }

  /**
   * Check if there is a winning combination in the board.
   * @param board - The board to check.
   * @returns True if there is a winning combination, otherwise false.
   */
  function checkForWin(board: Board): boolean {
    // Check rows
    if (checkHorizontal(board)) return true;
    // Check columns
    if (checkHorizontal(rowsToCols(board))) return true;
    // Check diagonals
    if (checkHorizontal(diagToRows(board))) return true;

    return false;
  }

  /**
   * Handle click event on a cell.
   * @param r - The row index of the clicked cell.
   * @param c - The column index of the clicked cell.
   */
  function handleClick(r: number, c: number) {
    // Create a copy of the board
    const newBoard = [...board];
    // Update the clicked cell with the current player's symbol
    newBoard[r][c] = currentPlayer;
    // Update the board state
    setBoard(newBoard);

    // Check if there is a winning combination
    if (checkForWin(newBoard)) {
      console.log(currentPlayer + " wins!");
      // Reset the board and current player
      setBoard(generateBoard(NUMBER_OF_CELLS));
      setCurrentPlayer("X");
    }
  }

  return (
    <div>
      {board.map((row, r) => {
        return (
          <div key={r} className="row">
            {row.map((cell, c) => (
              <div className="cell" key={c} onClick={() => handleClick(r, c)}>
                {cell}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default Ticktactoe;
