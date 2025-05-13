export default function gameView(data = {}) {
    const { score = 0 } = data; // Por ejemplo, un valor dinámico como la puntuación
  
    return `
      <h1>Game</h1>
      <p>Bienvenido al juego.</p>
      <p>Puntuación actual: ${score}</p>
      <nav>
        <a href="/home">Home</a>
        <a href="/game">Game</a>
      </nav>
    `;
  }