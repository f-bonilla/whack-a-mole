export default function gameView(data = {}) {
  const { score = 0 } = data; // Por ejemplo, un valor dinámico como la puntuación

  return `
      <h1>Game</h1>
      <p>Bienvenido al juego mas guay y molon de toda la historia del mundo mundial.</p>
      <p>Puntuación actual: ${score}</p>
      <nav>
        <img src="/images/mole.png" alt="It's a mole" />
        <a href="/home">Home</a>
        <a href="/game">Game</a>
      </nav>
    `;
}
