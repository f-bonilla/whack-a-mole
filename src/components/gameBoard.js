import moleHitSignal from "../utils/gameSignal.js";
import NetStatus from "../networkStatus.js"; // Asegúrate que el path sea correcto

class GameBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.level = "medium"; // Nivel por defecto
    this.points = 0;
    this.timer = null;
    this.isPlaying = false;
  }

  connectedCallback() {
    const username = sessionStorage.getItem("username");
    if (!username || username.toLowerCase() === "invitado") {
      window.history.pushState({}, "", "/home");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }
    this.render();
    this.shadowRoot
      .querySelector("#start-button")
      .addEventListener("click", this.toggleGame.bind(this));

    // Verificamos puntuación pendiente en caso de estar online
    this.sendPendingScore();
  }

  toggleGame() {
    this.isPlaying ? this.stopGame() : this.startGame();
  }

  startGame() {
    this.isPlaying = true;
    this.points = 0;
    this.updatePoints();
    this.shadowRoot.querySelector("#start-button").textContent = "Detener";
    this.runGameLoop();
  }

  async stopGame() {
    clearInterval(this.timer);
    this.isPlaying = false;
    this.clearMoles();
    this.shadowRoot.querySelector("#start-button").textContent = "Jugar";

    const username = sessionStorage.getItem("username");
    console.log("Deteniendo juego, username:", username);
    if (!username) {
      console.warn("No hay username en sessionStorage.");
      return;
    }

    console.log("NetStatus is online:", NetStatus.isOnline);
    this.handleScore(username, this.points);
  }

  async handleScore(username, score) {
    if (NetStatus.isOnline) {
      console.log(
        `ONLINE: Se enviaría la puntuación (${score}) del usuario ${username} al servidor.`
      );
    } else {
      console.warn(
        `OFFLINE: Se guardaría la puntuación (${score}) en localStorage.`
      );
      localStorage.setItem("pendingScore", score);
    }
  }

  async sendPendingScore() {
    const pendingScore = localStorage.getItem("pendingScore");
    const username = sessionStorage.getItem("username");

    if (pendingScore && username && NetStatus.isOnline) {
      console.log(
        `Reconexión detectada: Se enviaría la puntuación pendiente (${pendingScore}) del usuario ${username} al servidor.`
      );
      localStorage.removeItem("pendingScore");
    }
  }

  runGameLoop() {
    const speeds = { low: 1000, medium: 750, high: 500 };
    const points = { low: 10, medium: 20, high: 30 };
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.spawnMole(points[this.level]);
    }, speeds[this.level]);
  }

  spawnMole(points) {
    const cells = Array.from(this.shadowRoot.querySelectorAll(".cell"));
    this.clearMoles();

    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    const moleImage = document.createElement("img");
    moleImage.src = "/images/mole.png";
    moleImage.alt = "Topo";
    moleImage.draggable = false;

    randomCell.appendChild(moleImage);
    randomCell.onclick = () => {
      this.points += points;
      this.updatePoints();
      moleHitSignal(); // Signal al golpear el topo
      randomCell.innerHTML = "";
      randomCell.onclick = null;
    };
  }

  clearMoles() {
    const cells = this.shadowRoot.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.onclick = null;
    });
  }

  updatePoints() {
    this.shadowRoot.querySelector("#points").textContent = this.points;
  }

  updateLevel(level) {
    console.warn(`Cambiando nivel a: ${level}`);
    if (["low", "medium", "high"].includes(level)) {
      this.level = level;
      console.log(`Nivel actualizado a: ${this.level}`);

      if (this.isPlaying) {
        this.runGameLoop(); // Reiniciamos el bucle con el nuevo nivel
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host{
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome, Edge, Opera and Firefox */
          width: 100%;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-template-rows: repeat(3, 100px);
          gap: 10px;
          margin-bottom: 1rem;
          justify-content: center;
        }
        .cell {
          background-color: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #444;
          cursor: pointer;
          font-size: 1.5rem;
          position: relative;
        }
        .cell img {
          user-select: none;
          width: 80px;
          height: 80px;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="grid">
        ${Array.from({ length: 9 })
          .map(() => '<div class="cell"></div>')
          .join("")}
      </div>
      <p>Puntos: <span id="points">0</span></p>
      <button id="start-button">Jugar</button>
    `;
  }
}

customElements.define("game-board", GameBoard);
