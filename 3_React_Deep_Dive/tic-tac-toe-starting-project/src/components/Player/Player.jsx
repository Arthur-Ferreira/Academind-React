import React, { useState } from "react";
export default function Player({ initialName, symbol, isActive }) {
  const [newName, setNewName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setNewName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            placeholder="Player name"
            value={newName}
            onChange={handleChange}
            required
          />
        ) : (
          <span className="player-name">{newName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
