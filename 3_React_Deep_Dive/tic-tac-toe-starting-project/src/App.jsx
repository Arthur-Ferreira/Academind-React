import React, { useState } from "react";

import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./WinnningCombinations";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  
  return currentPlayer;
}


const initGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstSquare && 
      firstSquare === secondSquare && 
      firstSquare === thirdSquare) {
      winner = firstSquare
      break;
    }
  }
    

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player symbol="X" initialName="Player 1" isActive={activePlayer === "X"} />
          <Player symbol="O" initialName="Player 2" isActive={activePlayer === "O"} />
        </ol>
        {winner && <h2>{winner} wins!</h2>}
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
