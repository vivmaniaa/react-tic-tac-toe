import Player from './Player';
import GameBoard from './GameBoard';
import { useState } from 'react';
import Logs from './Logs';
import GameOver from './GameOver';

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const WINNING_SETS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length && gameTurns[0].symbol === 'X') activePlayer = 'O';
  return activePlayer;
}

function derivedHasWinner(gameBoard) {
  for (const set of WINNING_SETS) {
    const firstSquare = gameBoard[set[0].row][set[0].col];
    const secondSquare = gameBoard[set[1].row][set[1].col];
    const thirdSquare = gameBoard[set[2].row][set[2].col];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      secondSquare === thirdSquare
    ) {
      return { winner: true, player: firstSquare };
    }
  }
  return { winner: false, player: null };
}

function derivedGameBoard(turns) {
  const gameBoard = [...INITIAL_BOARD.map((row) => [...row])];
  for (const turn of turns) {
    const { position, symbol } = turn;
    const { row, col } = position;
    gameBoard[row][col] = symbol;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const hasWinner = derivedHasWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !hasWinner.winner;

  function placeSymbol(rowIndex, colIndex) {
    setGameTurns((prev) => {
      const activePlayer = deriveActivePlayer(prev);
      const updatedTurns = [
        { position: { row: rowIndex, col: colIndex }, symbol: activePlayer },
        ...prev,
      ];
      return updatedTurns;
    });
  }

  function rematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevNames) => {
      return { ...prevNames, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        {(hasWinner.winner || hasDraw) && (
          <GameOver
            winner={playerName[hasWinner.player]}
            rematch={rematch}
          />
        )}

        <ol
          id="players"
          className="highlight-player"
        >
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            nameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            nameChange={handlePlayerNameChange}
          />
        </ol>
        <GameBoard
          gameBoard={gameBoard}
          placeSymbol={placeSymbol}
        />
      </div>

      <Logs logs={gameTurns} />
    </main>
  );
}

export default App;
