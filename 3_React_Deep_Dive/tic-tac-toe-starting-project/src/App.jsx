import React, { useState } from "react";

import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/Log/GameOver";
import {deriveWinner, deriveGameBoard, deriveActivePlayer} from "./utils/utilitaries";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [ players, setPlayers ] =  useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
    
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerName( symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player symbol="X" initialName={PLAYERS.X} isActive={activePlayer === "X"} onChangeName={handlePlayerName}/>
          <Player symbol="O" initialName={PLAYERS.O} isActive={activePlayer === "O"} onChangeName={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onResetGame={() => setGameTurns([])} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
