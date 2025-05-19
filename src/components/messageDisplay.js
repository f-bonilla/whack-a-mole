class MessageDisplay extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div id="message"></div>`;
    this.messageTimeout = null;
  }

  showMessage(text) {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => this.hideMessage(), 3000);
    this.querySelector("#message").innerText = text;
    this.style.display = "block";
  }

  hideMessage() {
    this.style.display = "none";
  }
}

customElements.define("message-display", MessageDisplay);
