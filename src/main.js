import "./router/router.js";
import mockApi from "./api/mockApi";

async function testApi() {
  try {
    // Registro de usuario
    const registerResponse = await mockApi.register({
      username: "testuser",
      password: "password123",
    });
    console.log(registerResponse);

    // Inicio de sesión
    const loginResponse = await mockApi.login({
      username: "testuser",
      password: "password123",
    });
    console.log(loginResponse);

    const token = loginResponse.token;

    // Renovación de token
    const refreshResponse = await mockApi.refresh({ token });
    console.log(refreshResponse);

    // Cierre de sesión
    const logoutResponse = await mockApi.logout({
      token: refreshResponse.token,
    });
    console.log(logoutResponse);
  } catch (error) {
    console.error(error.message);
  }
}

testApi();

if ("serviceWorker" in navigator) {
  /* navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister().then(() => {
        console.log("Service Worker desregistrado:", registration.scope);
      });
    });
  }); */
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("Service Worker registrado correctamente");
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Notifica al usuario
              alert(
                "¡Hay una nueva versión disponible! Por favor, cierra y vuelve a abrir la aplicación."
              );
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error al registrar el Service Worker:", error);
    });
}
