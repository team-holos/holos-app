import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
    let generatedEmail;
    const password = 'Test123!';
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('TC-LOGIN-001: Erfolgreicher Login', async ({ page }) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    generatedEmail = `testuser${randomNumber}@example.com`;	
    await page.getByTestId("email-input").fill(generatedEmail);
    await page.getByTestId("password-input").fill(password);
    await page.getByRole("button", { name: "Login" }).click();  

    // Überprüfen der Weiterleitung
    await expect(page).toHaveURL('http://localhost:5173/dashboard');
    // Überprüfen der Erfolgsmeldung
    const successMessage = page.locator('.bg-green-500');
    // await expect(successMessage).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Willkommen bei Holos!")).toBeVisible();
  });

  test('TC-LOGIN-002: Nicht registrierte E-Mail', async ({ page }) => {
    await page.getByTestId("email-input").fill('test@example.com');
    await page.getByTestId("password-input").fill('Test123!');
    await page.getByRole("button", { name: "Login" }).click();  
    
    await expect(page.getByText("Email ist nicht registriert")).toBeVisible();
  });

   test('TC-LOGIN-005: Leere Pflichtfelder', async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    const emailError = page.locator('text=Email fehlt');
    const passwordError = page.locator('text=Passwort fehlt');
    
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('TC-LOGIN-006: Navigation zur Registrierung', async ({ page }) => {
    await page.click('data-testid=register-button');
    await expect(page).toHaveURL('http://localhost:5173/register');
  });
});