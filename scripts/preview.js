import { exec } from "child_process";

// Ejecuta el servidor de Vite
const vite = exec("vite preview");

vite.stdout.on("data", (data) => {
  console.log(`[VITE]: ${data}`);
});

vite.stderr.on("data", (data) => {
  console.error(`[VITE ERROR]: ${data}`);
});

vite.on("close", (code) => {
  console.log(`[VITE] Servidor finalizado con código ${code}`);
});

// Exponer el puerto 4173 con Localtunnel
const localtunnel = exec("npx localtunnel --port 4173 --subdomain whackamole");

localtunnel.stdout.on("data", (data) => {
  console.log(`[LOCALTUNNEL]: ${data}`);
});

localtunnel.stderr.on("data", (data) => {
  console.error(`[LOCALTUNNEL ERROR]: ${data}`);
});

localtunnel.on("close", (code) => {
  console.log(`[LOCALTUNNEL] Proceso finalizado con código ${code}`);
});
