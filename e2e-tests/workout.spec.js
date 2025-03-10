// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Workout Page Tests", () => {
  let generatedEmail;
  const password = "Test123!";

  test.beforeEach(async ({ page }) => {
    const randomNumber = Math.round(Math.random() * 10000);
    generatedEmail = `testuser${randomNumber}@example.com`;

    // **Registrierung**
    await page.goto("http://localhost:5173/register");
    await page.getByLabel("Vorname:").fill("Max Mustermann");
    await page.getByLabel("Email:").fill(generatedEmail);
    await page.getByLabel("Geburtsdatum:").fill("2000-01-01");
    await page.getByLabel("Gewicht:").fill("75");
    await page.getByLabel("Größe:").fill("180");
    await page.getByRole("radio", { name: "Männlich" }).check();
    await page.locator("#register-password").fill(password);
    await page.locator("#register-password-retype").fill(password);
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 10000 });

    // **Login**
    await page.goto("http://localhost:5173/login");
    await page.getByPlaceholder("E-Mail-Adresse").fill(generatedEmail);
    await page.getByPlaceholder("Passwort").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/dashboard");
  });

  test("TC-WORKOUT-001: Nutzer kann zur Workout-Seite navigieren", async ({ page }) => {
    // **Direkt zur Workout-Seite springen**
    await page.goto("http://localhost:5173/workout");
    await page.waitForLoadState("domcontentloaded");

    // **Überprüfen, ob die Workout-Seite geladen ist**
    await expect(page).toHaveURL("http://localhost:5173/workout");
    await expect(page.getByText("Trainingsplan & Kalender")).toBeVisible();
  });

// Replace your existing test with this:
test("TC-WORKOUT-002: Nutzer kann ein Workout eintragen", async ({ page }) => {
    await page.goto("http://localhost:5173/workout");
    await page.waitForLoadState("domcontentloaded");
  
    // **Warte auf die Tabelle**
    await page.waitForSelector("table");
  
    // **Daten für die erste Übung eintragen**
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.locator("td:nth-child(2) input").fill("4");  // Sätze
    await firstRow.locator("td:nth-child(3) input").fill("10"); // Wiederholungen
    await firstRow.locator("td:nth-child(4) input").fill("80"); // Gewicht
  
    // Handle the dialog before clicking the button
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Training erfolgreich gespeichert');
      await dialog.accept();
    });
  
    // Click save and wait for response
    const [response] = await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes("/api/training/workout-log") && response.status() === 200
      ),
      page.getByRole("button", { name: "Training speichern" }).click(),
    ]);
  
    // Verify the response status
    expect(response.ok()).toBeTruthy();
  });
  
});
