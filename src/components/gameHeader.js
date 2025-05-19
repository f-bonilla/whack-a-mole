class GameHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const username = sessionStorage.getItem("username") || "Invitado";

    this.shadowRoot.innerHTML = `
            <style>
                header {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #f5f5f5;
                }
                select {
                    padding: 0.3rem;
                    border-radius: 4px;
                }
            </style>
            <header>
                <div>Jugador: <strong>${username}</strong></div>
                <div>
                    <label for="difficulty">Dificultad:</label>
                    <select id="difficulty">
                        <option value="low">Bajo</option>
                        <option value="medium" selected>Medio</option>
                        <option value="high">Alto</option>
                    </select>
                </div>
            </header>
        `;

    this.shadowRoot
      .querySelector("#difficulty")
      .addEventListener("change", this.handleLevelChange.bind(this));
  }

  handleLevelChange(event) {
    this.dispatchEvent(
      new CustomEvent("level-change", {
        detail: { level: event.target.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("game-header", GameHeader);
