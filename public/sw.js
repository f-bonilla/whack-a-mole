const CACHE_NAME = "whack-a-mole-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon/icon-192x192.png",
  "/favicon/icon-512x512.png",
  "/styles.css",
  "/main.js",
  "/images/mole.png",
];

// Durante la instalación, se cachean todos los recursos necesarios
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cacheando todos los recursos necesarios para offline");
      return cache.addAll(urlsToCache);
    })
  );
});

// Durante la activación, se eliminan caches antiguos si es necesario
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Eliminando cache antiguo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta las solicitudes de red y las sirve desde la caché si es posible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en la caché, lo devuelve
      if (response) {
        return response;
      }

      // Si no está en la caché, intenta obtenerlo de la red
      return fetch(event.request).catch(() => {
        console.error(
          "El recurso no está en la caché y no hay conexión a Internet:",
          event.request.url
        );
      });
    })
  );
});
