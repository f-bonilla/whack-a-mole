// viewManager.js
export default class ViewManager {
  constructor(container) {
    this.container = container;
    this.initializeComponents();
  }

  initializeComponents() {
    if (!customElements.get("home-view")) {
      import("../views/homeView.js");
    }
    if (!customElements.get("game-view")) {
      import("../views/gameView.js");
    }
  }

  loadView(viewName) {
    this.container.innerHTML = `<${viewName}></${viewName}>`;
  }
}
