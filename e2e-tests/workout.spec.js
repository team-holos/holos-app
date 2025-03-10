// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Workout Page Tests (Minimal Version)", () => {
  const email = "test@example.com"; // Nutze einen bestehenden Testaccount
  const password = "Test123!";

  test.beforeEach(async ({ page }) => {
    // **🔹 Login**
    await page.goto("http://localhost:5173/login");
    await page.getByPlaceholder("E-Mail-Adresse").fill(email);
    await page.getByPlaceholder("Passwort").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/dashboard");
  });

  test("TC-WORKOUT-002: Nutzer kann ein Workout eintragen", async ({ page }) => {
    await page.goto("http://localhost:5173/workout");
    await page.waitForLoadState("domcontentloaded");

    // **Workout-Daten eintragen**
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.locator("td:nth-child(2) input").fill("4");  // Sätze
    await firstRow.locator("td:nth-child(3) input").fill("10"); // Wiederholungen
    await firstRow.locator("td:nth-child(4) input").fill("80"); // Gewicht

    // ✅ Dialog behandeln
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Training erfolgreich gespeichert");
      await dialog.accept();
    });

    // ✅ Speichern und API-Antwort prüfen
    await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes("/api/training/workout-log") && response.status() === 200
      ),
      page.getByRole("button", { name: "Training speichern" }).click(),
    ]);
  });
});
