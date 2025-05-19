// jest.setup.js
import "whatwg-fetch";
import "@testing-library/jest-dom";

// Mock de Fetch global
global.fetch = jest.fn((url, options = {}) => {
  const { method = "GET" } = options;

  if (url.endsWith("/users") && method === "GET") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 16, username: "userajgh52" },
          { id: 17, username: "user_18puyf" },
        ]),
    });
  }

  if (url.endsWith("/users") && method === "POST") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 123,
          username: JSON.parse(options.body).username,
        }),
    });
  }

  if (url.match(/\/users\/\d+$/) && method === "PUT") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          ...JSON.parse(options.body),
          id: Number(url.split("/").pop()),
        }),
    });
  }

  if (url.match(/\/users\/\d+$/) && method === "DELETE") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ deleted: true }),
    });
  }

  console.warn(`fetch no mockeado para esta URL: ${url}`);
  return Promise.reject(new Error(`fetch no mockeado para esta URL: ${url}`));
});

// Mock de Service Worker y APIs relacionadas
Object.defineProperty(global, "navigator", {
  value: {
    serviceWorker: {
      register: jest.fn().mockResolvedValue({
        scope: "/",
        addEventListener: jest.fn(),
      }),
      ready: Promise.resolve(),
    },
    onLine: true, // Mockeamos el estado inicial de conexión como "online"
  },
  writable: true,
  configurable: true,
});

// Mock de window global
Object.defineProperty(global, "window", {
  value: {
    caches: {},
    indexedDB: {},
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    history: {
      pushState: jest.fn(),
      replaceState: jest.fn(),
    },
  },
  writable: true,
  configurable: true,
});
