import { useState } from 'react';

function Player({ initialName, symbol, isActive, nameChange }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function changeNameHandler() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
    nameChange(symbol, e.target.value);
  }

  let nameSection = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    nameSection = (
      <input
        type="text"
        onChange={handleChange}
        value={playerName}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {nameSection}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={changeNameHandler}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}

export default Player;
