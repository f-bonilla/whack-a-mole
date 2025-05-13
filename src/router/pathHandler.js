export default function pathHandler({ view, app, attachLinkHandlers }) {
    return () => {
      // Renderiza la vista
      app.innerHTML = view();
  
      // Intercepta los clics en los enlaces después de renderizar
      attachLinkHandlers();
  
      // Aquí puedes agregar lógica adicional, como registro de eventos, autenticación, etc.
      console.log("Ruta cargada:", view.name || "sin nombre");
    };
  }