// Simulación de almacenamiento de tokens en memoria
const tokenStore = new Map(); // Usamos un Map para almacenar tokens y sus datos asociados

const tokenManager = {
  generateToken(data = {}) {
    // Genera un token único
    const token = Math.random().toString(36).substr(2);
    tokenStore.set(token, { ...data, createdAt: Date.now() });
    return token;
  },

  validateToken(token) {
    // Verifica si el token es válido
    if (!tokenStore.has(token)) {
      throw new Error("Token inválido o ya expirado.");
    }
    return tokenStore.get(token); // Retorna los datos asociados al token
  },

  invalidateToken(token) {
    // Invalida un token
    if (!tokenStore.has(token)) {
      throw new Error("Token inválido o ya expirado.");
    }
    tokenStore.delete(token);
  },

  refreshToken(token) {
    // Renueva un token (genera uno nuevo y elimina el anterior)
    if (!tokenStore.has(token)) {
      throw new Error("Token inválido o ya expirado.");
    }
    const oldData = tokenStore.get(token);
    this.invalidateToken(token); // Invalida el token antiguo
    return this.generateToken(oldData); // Genera un nuevo token con los mismos datos
  },
};

export default tokenManager;
