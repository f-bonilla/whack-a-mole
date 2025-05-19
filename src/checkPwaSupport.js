/**
 * Verifica si el navegador soporta características clave de PWA.
 * Lanza una excepción si no hay soporte o si ocurre un error durante la inicialización.
 * @returns {Promise<boolean>} `true` si el soporte e inicialización son exitosos.
 * @throws {Error} Si el navegador no soporta PWA o falla el registro del Service Worker.
 */
export default async function checkPwaSupport() {
  const supportsServiceWorker = "serviceWorker" in navigator;
  const supportsCacheAPI = "caches" in window;
  const supportsIndexedDB = "indexedDB" in window;

  const support =
    supportsServiceWorker && supportsCacheAPI && supportsIndexedDB;

  if (!support) {
    throw new Error("El navegador no soporta características clave de PWA.");
  }

  try {
    await initializePwaFeatures();
    return true;
  } catch (error) {
    throw new Error(`Error durante la inicialización de PWA: ${error.message}`);
  }
}

/**
 * Inicializa las características PWA (e.g., registro del Service Worker).
 * @returns {Promise<boolean>} `true` si se inicializó con éxito.
 * @throws {Error} Si falla el registro del Service Worker.
 */
async function initializePwaFeatures() {
  try {
    await registerServiceWorker();
    console.log("Service Worker registrado con éxito.");
    return true;
  } catch (error) {
    throw new Error(`Error al registrar el Service Worker: ${error.message}`);
  }
}

/**
 * Registra el Service Worker y maneja actualizaciones.
 * @returns {Promise<void>} Promesa que se resuelve cuando el registro es exitoso o se rechaza en caso de error.
 */
async function registerServiceWorker() {
  // Descomentar para desregistrar Service Workers antiguos
  /* navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister().then(() => {
                console.log("Service Worker desregistrado:", registration.scope);
              });
            });
          }); */

  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker no soportado en este navegador.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("Service Worker registrado correctamente:", registration.scope);

    // Manejar actualizaciones del Service Worker
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      console.log("Nueva versión del Service Worker detectada.");

      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          // Notifica al usuario sobre la nueva versión
          notifyUserForUpdate();
        }
      });
    });

    // Opcional: Esperar hasta que el Service Worker esté listo
    await navigator.serviceWorker.ready;
    console.log("Service Worker listo para manejar solicitudes.");
  } catch (error) {
    console.error("Error al registrar el Service Worker:", error);
    throw new Error(
      `Fallo en el registro del Service Worker: ${error.message}`
    );
  }
}

/**
 * Notifica al usuario sobre una nueva versión.
 */
function notifyUserForUpdate() {
  alert(
    "¡Hay una nueva versión disponible! Por favor, cierra y vuelve a abrir la aplicación."
  );
}
