import checkPwaSupport from "./checkPwaSupport.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { initializeRouter } = await import("./router/router.js");
  initializeRouter();
  await checkPwaSupport();
  console.log("Aplicación inicializada correctamente.");
});
