import { test, expect } from "@playwright/test";
test.describe("Registration and Login Tests", () => {
  let generatedEmail;
  const password = "Test123!"; // Passwort bleibt konstant für Login
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/register");
  });
  test("TC-REG-001: successful registration and login", async ({ page }) => {
    const randomNumber = Math.round(Math.random() * 10000);
    generatedEmail = `testuser${randomNumber}@example.com`;
    // Registrierung durchführen
    await page.getByLabel("Vorname:").fill("Max Mustermann");
    await page.getByLabel("Email:").fill(generatedEmail);
    await page.getByLabel("Geburtsdatum:").fill("2000-01-01");
    await page.getByLabel("Gewicht:").fill("75");
    await page.getByLabel("Größe:").fill("180");
    await page.getByRole("radio", { name: "Männlich" }).check();
    await page.locator("#register-password").fill(password);
    await page.locator("#register-password-retype").fill(password);
    await page.getByRole("button", { name: "Register" }).click();
    // Erfolgreiche Registrierung prüfen
    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 10000 });
    // **Warte, bis die Login-Seite vollständig geladen ist**
    await page.goto("http://localhost:5173/login");
    await page.waitForLoadState("domcontentloaded");
    // **Login durchführen (korrektes Lokalisieren der Felder)**
    await page.getByPlaceholder("E-Mail-Adresse").fill(generatedEmail);
    await page.getByPlaceholder("Passwort").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    // Prüfen, ob Login erfolgreich war (Dashboard oder Begrüßung)
    await expect(page).toHaveURL("http://localhost:5173/dashboard"); // Falls das Ziel anders ist, anpassen
    await expect(page.getByText("Willkommen")).toBeVisible();
  });
});