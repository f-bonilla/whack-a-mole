import { validateAndSanitizeUsername } from "../../src/utils/validation.js";

describe("validateAndSanitizeUsername", () => {
  it("debería devolver el nombre de usuario sanitizado y válido", () => {
    expect(validateAndSanitizeUsername("  JohnDoe  ")).toBe("JohnDoe");
  });

  it("debería devolver null para un nombre de usuario demasiado corto", () => {
    expect(validateAndSanitizeUsername("Jo")).toBeNull();
  });

  it("debería devolver null para un nombre de usuario malicioso", () => {
    expect(
      validateAndSanitizeUsername('<script>alert("Hacked!")</script>')
    ).toBeNull();
  });
});
