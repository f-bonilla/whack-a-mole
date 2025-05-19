import "../components/userForm.js";
import "../components/messageDisplay.js";

class HomeView extends HTMLElement {
  constructor() {
    super();
    this._username = sessionStorage.getItem("username") || null;
    this.tpl = `
      <h1>Whack a mole!</h1>
      <div id="content">
        <user-form></user-form>
        <message-display></message-display>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("submit", this.sendAuthForm.bind(this));
  }

  sendAuthForm(event) {
    const { success, message, username } = event.detail;
    if (success) {
      this.username = username;
      sessionStorage.setItem("username", this.username);
    } else {
      this.showMessage(message);
    }
  }

  showMessage(message) {
    const messageDisplay = this.querySelector("message-display");
    messageDisplay.showMessage(message);
  }

  set username(value) {
    this._username = value;
    this.updateContent();
  }

  get username() {
    return this._username;
  }

  render() {
    this.innerHTML = this.tpl;
    this.updateContent();
  }

  updateContent() {
    const content = this.querySelector("#content");
    if (this._username) {
      content.innerHTML = `
        <p>Bienvenido: "${this._username}"</p>
        <a href="/game" data-link>Jugar</a>`;
    }
  }
}

customElements.define("home-view", HomeView);
