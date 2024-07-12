import { useState } from 'react';

function GameBoard({ gameBoard, placeSymbol }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => placeSymbol(rowIndex, colIndex)}
                    disabled={playerSymbol}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default GameBoard;
