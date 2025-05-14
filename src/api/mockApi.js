import tokenManager from "./tokenManager.js";

// Simulación de una "base de datos" en memoria
const db = {
  users: [], // Lista de usuarios registrados
};

const mockApi = {
  async register({ username, password }) {
    // Verifica si el usuario ya existe
    const userExists = db.users.some((user) => user.username === username);
    if (userExists) {
      throw new Error("El usuario ya está registrado.");
    }

    // Registra el nuevo usuario
    db.users.push({ username, password });
    return { message: "Usuario registrado con éxito." };
  },

  async login({ username, password }) {
    // Verifica si las credenciales son correctas
    const user = db.users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      throw new Error("Credenciales incorrectas.");
    }

    // Genera un token de sesión
    const token = tokenManager.generateToken({ username });
    return { message: "Inicio de sesión exitoso.", token };
  },

  async logout({ token }) {
    // Invalida el token
    tokenManager.invalidateToken(token);
    return { message: "Cierre de sesión exitoso." };
  },

  async refresh({ token }) {
    // Renueva el token
    const newToken = tokenManager.refreshToken(token);
    return { message: "Token renovado con éxito.", token: newToken };
  },
};

export default mockApi;
