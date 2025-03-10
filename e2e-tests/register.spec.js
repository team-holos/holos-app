// @ts-check
import { test, expect } from "@playwright/test";


test.describe("Registration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/register");
  });

  test("TC-REG-001: successful registration with valid data", async ({
    page,
  }) => {
    await page.getByLabel("Vorname:").fill("Max Mustermann");
    await page.getByLabel("Email:").fill("test@example.com");
    await page.getByLabel("Geburtsdatum:").fill("2000-01-01");
    await page.getByLabel("Gewicht:").fill("75");
    await page.getByLabel("Größe:").fill("180");
    await page.getByLabel("Männlich").check();
    await page.getByLabel("Passwort:").fill("Test123!");
    await page.getByLabel("Passwort bestätigen:").fill("Test123!");

    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByTestId("success-message")).toBeVisible();
  });

  test("TC-REG-002: validates minimum age", async ({ page }) => {
    const today = new Date();
    const futureDate = new Date(
      today.getFullYear() - 15,
      today.getMonth(),
      today.getDate()
    );
    await page
      .getByLabel("Geburtsdatum:")
      .fill(futureDate.toISOString().split("T")[0]);

    await page.getByRole("button", { name: "Register" }).click();

    await expect(
      page.getByText("Du musst mindestens 16 Jahre alt sein!")
    ).toBeVisible();
  });

  test("TC-REG-003: validates password requirements", async ({ page }) => {
    await page.getByLabel("Passwort:").fill("test123!");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(
      page.getByText("Passwort muss mindestens einen Großbuchstaben enthalten")
    ).toBeVisible();
  });

  test("TC-REG-004: validates email format", async ({ page }) => {
    await page.getByLabel("Email:").fill("invalid@email");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Invalid email address")).toBeVisible();
  });

  test("TC-REG-005: validates weight input", async ({ page }) => {
    await page.getByLabel("Gewicht:").fill("abc");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Gewicht muss eine Zahl sein")).toBeVisible();
  });

  test("TC-REG-007: validates required fields", async ({ page }) => {
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Username fehlt")).toBeVisible();
    await expect(page.getByText("Email fehlt")).toBeVisible();
    await expect(page.getByText("Passwort fehlt")).toBeVisible();
    await expect(page.getByText("Geburtsdatum fehlt")).toBeVisible();
    await expect(page.getByText("Gewicht fehlt")).toBeVisible();
    await expect(page.getByText("Größe fehlt")).toBeVisible();
    await expect(page.getByText("Geschlecht fehlt")).toBeVisible();
  });

  test("TC-REG-008: can navigate to login page", async ({ page }) => {
    await page.getByRole("link", { name: "Zurück zur Loginseite" }).click();
    await expect(page).toHaveURL("http://localhost:5173/");
  });
});
