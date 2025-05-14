import Navigo from "navigo";
import routes from "./routes.js";
import pathHandler from "./pathHandler.js";

const app = document.getElementById("app");

// Configura el enrutador
const router = new Navigo("/", { hash: false });

// Función para interceptar los clics en los enlaces
function attachLinkHandlers() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado del navegador
      const href = link.getAttribute("href");
      router.navigate(href); // Navega usando el enrutador
    });
  });
}

// Registra las rutas delegando a `pathHandler`
Object.entries(routes).forEach(([path, view]) => {
  router.on(path, pathHandler({ view, app, attachLinkHandlers, path }));
});

// Maneja rutas no válidas y redirige a /home
router.notFound(() => {
  router.navigate("/home");
});

// Inicializa el enrutador
router.resolve();

export default router;
