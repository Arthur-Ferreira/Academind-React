export default function GameOver({ winner, onResetGame }) {

  return (
    <aside id="game-over">
      {winner && <h2>{winner} wins!</h2>}
      {!winner && <h2>It's a draw!</h2>}
      <button onClick={onResetGame}>Play Again</button>
    </aside>
  );
}