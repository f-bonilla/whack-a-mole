# Whack-a-Mole Game

El clásico juego de Whack-a-Mole implementado como una aplicación web
progresiva, utilizando Web Components y JavaScript vanilla.

Puedes probarlo en el siguiente enlace, en la consola se pueden ver operaciones
que no he llegado a implementar:

[Whack-a-Mole - Demo en Producción](https://whack-a-mole-zeta-two.vercel.app)

## Información Importante

Para una mejor comprensión del funcionamiento de la aplicación, se recomienda
utilizarla con la **consola del navegador abierta**.

La consola proporcionará información adicional sobre procesos que, aunque no
están completamente implementados, se simulan correctamente y generan mensajes
en los momentos oportunos. Esto incluye, por ejemplo, el envío de puntuación al
servidor o la gestión de puntuaciones pendientes en modo offline.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Comandos de Desarrollo](#comandos-de-desarrollo)
- [Despliegue en Vercel](#despliegue-en-vercel)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/whack-a-mole.git

   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd whack-a-mole
   ```

3. Instalar las dependencias necesarias:

   ```bash
   npm install
   ```

## Comandos de Desarrollo

En el archivo `package.json`, se han definido los siguientes scripts para
facilitar la ejecución del proyecto:

- **`npm run dev`**: Inicia el servidor de desarrollo usando
  [Vite](https://vitejs.dev/), lo que permite ejecutar la aplicación en modo
  desarrollo con recarga en caliente.

- **`npm run build`**: Compila el proyecto para producción utilizando Vite,
  optimizando todos los archivos para su despliegue.

- **`npm run preview`**: Inicia un servidor local para previsualizar la versión
  optimizada del proyecto generado con el comando anterior. Se utiliza para
  verificar cómo se verá la aplicación después de ser compilada y optimizada,
  este modo es necesario para ver el funcionamiento del sw.

## Despliegue en Vercel

El proyecto está vinculado a Vercel, por lo que para publicar el proyecto solo
necesitas hacer un push a la rama principal. Vercel automáticamente detectará
los cambios y desplegará la aplicación de manera inmediata:

```bash
 git add .
 git commit -m "Descripción de los cambios"
 git push origin main
```

## Dependencias

### localtunnel

Nos permite:

- Exponer temporalmente nuestro servidor local a la red, facilitando las pruebas
  en otros dispositivos (como móviles o tablets) dentro de la misma red local.
- Probar el funcionamiento real del sw.

### axios

Este paquete se instaló para solucionar un problema con las dependencias de
localtunnel que causaba errores graves durante la instalación de dependencias.

## TODO

- [ ] Utilizar [`ApiService`](./src/api/apiService.js) para simular un
      login/registro usando la URL definida en config.js.
- [ ] Implementar un temporizador para que el juego dure un tiempo definido (por
      ejemplo, 30 segundos).
- [ ] Permitir establecer el nivel de dificultad directamente en el componente:
      <game-board level="low"></game-board>.
- [ ] Reemplazar alert con una notificación más amigable (por ejemplo, banner,
      modal, o notificación push).
