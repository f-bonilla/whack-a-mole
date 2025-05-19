// src/router/router.js
import { routes } from "./routes.js";
import ViewManager from "./viewManager.js";

const container = document.getElementById("app");

if (!container) {
  console.error("El contenedor del router (app) no fue encontrado.");
}

const viewManager = new ViewManager(container);

function onRouteChange() {
  const path = window.location.pathname;
  const viewName = routes[path] || "home-view"; // Carga Home por defecto

  if (!routes[path]) {
    window.history.replaceState({}, "", "/home"); // Cambia la URL a /home si no es válida
  }

  viewManager.loadView(viewName);
}

export function initializeRouter() {
  // Evita duplicar eventos si se inicializa más de una vez
  window.removeEventListener("popstate", onRouteChange);
  document.removeEventListener("click", handleLinkClick);

  window.addEventListener("popstate", onRouteChange);
  document.addEventListener("click", handleLinkClick);

  // Ejecutar inmediatamente al cargar
  onRouteChange();
}

function handleLinkClick(event) {
  const { target } = event;

  // Verificamos si el click fue en un enlace con data-link o dentro de uno
  const link = target.closest("a[data-link]");
  if (link) {
    event.preventDefault();
    const href = link.getAttribute("href");
    if (href) {
      navigateTo(href);
    }
  }
}

export function navigateTo(path) {
  if (!path.startsWith("/")) {
    console.error("La ruta debe comenzar con '/'.");
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
