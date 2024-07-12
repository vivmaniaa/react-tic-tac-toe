import React from 'react';

function GameOver({ winner, rematch }) {
  console.log({ winner });
  return (
    <div id="game-over">
      <h2>Game over</h2>
      {winner && <h3>Player {winner} is the winner!</h3>}
      {!winner && <h3>It's a draw!</h3>}
      <button onClick={rematch}>Play Again!</button>
    </div>
  );
}

export default GameOver;
