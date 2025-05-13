import Navigo from "navigo";
import routes from "./routes.js";

const app = document.getElementById("app");

// Configura el enrutador
const router = new Navigo("/", { hash: false });

// Registra las rutas
Object.entries(routes).forEach(([path, view]) => {
  router.on(path, () => {
    app.innerHTML = view();
    attachLinkHandlers(); // Intercepta los clics después de renderizar la vista
  });
});

// Maneja rutas no válidas y redirige a /home
router.notFound(() => {
  router.navigate("/home");
});

// Intercepta los clics en los enlaces para evitar recarga de página
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

// Inicializa el enrutador
router.resolve();

export default router;