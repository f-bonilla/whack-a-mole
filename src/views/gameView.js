import "../components/gameHeader.js";
import "../components/gameBoard.js";

class GameView extends HTMLElement {
  constructor() {
    super();
    this._score = 0;
    this.tpl = `
      <style>
        .game-container {
          width: 480px;
          max-width: 100%;
          margin: 0 auto;
          padding: 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
        }
      </style>
      <div class="game-container">
        <game-header></game-header>
        <game-board></game-board>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.gameBoard = this.querySelector("game-board");
    const levelChangeCallback = this.levelChange.bind(this);
    this.addEventListener("level-change", levelChangeCallback);
  }

  levelChange(event) {
    this.gameBoard.updateLevel(event.detail.level);
  }

  set score(value) {
    this._score = value;
    this.updateScore();
  }

  get score() {
    return this._score;
  }

  render() {
    this.innerHTML = this.tpl;
    this.updateScore();
  }

  updateScore() {
    const scoreElement = this.querySelector("#score");
    if (scoreElement) {
      scoreElement.textContent = this._score;
    }
  }
}

customElements.define("game-view", GameView);
