import { validateAndSanitizeUsername } from "../utils/validation.js";

class UserForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
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
            <form>
                <input type="text" placeholder="Nombre de usuario" />
                <button type="submit">Enviar</button>
            </form>
        `;
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.shadowRoot.querySelector("input");
    const username = input.value.trim();
    input.value = "";

    // Creamos el objeto de respuesta
    let result = {
      success: false,
      message: "",
    };

    // Validar el nombre de usuario
    const validUsername = validateAndSanitizeUsername(username);

    if (validUsername) {
      result.success = true;
      result.username = username;
    } else {
      result.message =
        "Nombre de usuario inválido. Debe tener al menos 3 caracteres. No se permite contenido html.";
    }

    // Emitimos el evento con el objeto `result`
    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: result,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("user-form", UserForm);
