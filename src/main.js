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
    const logoutResponse = await mockApi.logout({ token: refreshResponse.token });
    console.log(logoutResponse);
  } catch (error) {
    console.error(error.message);
  }
}

testApi();