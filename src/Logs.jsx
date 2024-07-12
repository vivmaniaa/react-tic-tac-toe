import React from 'react';

function Logs({ logs }) {
  return (
    <ol id="logs">
      {logs.map(({ position: { row, col }, symbol }) => {
        return (
          <li key={`${row}${col}`}>{`${symbol} selected ${row}, ${col} `}</li>
        );
      })}
    </ol>
  );
}

export default Logs;
