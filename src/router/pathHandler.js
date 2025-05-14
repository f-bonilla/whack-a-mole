export default function pathHandler({ view, app, attachLinkHandlers, path }) {
  return async () => {
    console.log(`Procesando ruta: ${path}`);

    // Ejemplo: Validación de autenticación
    /* if (path === "/dashboard" && !isUserAuthenticated()) {
      console.log("Redirigiendo a /login...");
      router.navigate("/login");
      return;
    } */

    // Ejemplo: Carga de datos dinámica basada en la ruta
    /* if (path.startsWith("/product/")) {
      const productId = path.split("/")[2];
      const productData = await fetchProductData(productId);
      app.innerHTML = view(productData); // Renderiza la vista con los datos cargados
    } else {
      // Renderiza la vista normal
      app.innerHTML = view();
    } */

    /* if (path === "/game" && !isUserAuthenticated()) {
        console.log("Redirigiendo a /login...");
        router.navigate("/login");
        return;
      } */

    if (path === "/game") {
      app.innerHTML = view({ score: 30 });
    } else {
      app.innerHTML = view();
    }

    // Intercepta los clics en los enlaces después de renderizar
    attachLinkHandlers();
  };
}
