import { test, expect } from '@playwright/test';

let testUserEmail;
const testUserPassword = "Test123!";

async function waitForNavigation(page, url, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await page.goto(url, { timeout: 5000 });
      return;
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await page.waitForTimeout(1000); 
    }
  }
}

async function loginAsTestUser(page) {
  await waitForNavigation(page, "http://localhost:5173/login");
  await page.getByPlaceholder("E-Mail-Adresse").fill(testUserEmail);
  await page.getByPlaceholder("Passwort").fill(testUserPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:5173/nutrition");
}

test.describe('Registration and Nutrition Tests', () => {
  test("TC-REG-001: Register test user", async ({ page }) => {
    const randomNumber = Math.round(Math.random() * 10000);
    testUserEmail = `testuser${randomNumber}@example.com`;
    
    await waitForNavigation(page, "http://localhost:5173/register");
    await page.getByLabel("Vorname:").fill("Max Mustermann");
    await page.getByLabel("Email:").fill(testUserEmail);
    await page.getByLabel("Geburtsdatum:").fill("2000-01-01");
    await page.getByLabel("Gewicht:").fill("75");
    await page.getByLabel("Größe:").fill("180");
    await page.getByRole("radio", { name: "Männlich" }).check();
    await page.locator("#register-password").fill(testUserPassword);
    await page.locator("#register-password-retype").fill(testUserPassword);
    await page.getByRole("button", { name: "Register" }).click();
    
    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 10000 });
  });

  test.describe('Nutrition Tracker Tests', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsTestUser(page);
      await waitForNavigation(page, 'http://localhost:5173/nutrition');
    });

    test('TC-NUT-001: should add a meal successfully', async ({ page }) => {
      // Add a new meal
      await page.fill('input[name="name"]', 'Frühstück');
      await page.fill('input[name="calories"]', '300');
      await page.fill('input[name="protein"]', '20');
      await page.fill('input[name="carbs"]', '50');
      await page.fill('input[name="fats"]', '10');
      
      await page.click('button:text("Mahlzeit hinzufügen")');
  
      // Verify meal appears in the table
      const mealRow = page.locator('tbody tr', { hasText: 'Frühstück' });
      await expect(mealRow).toBeVisible();
      await expect(mealRow.locator('td').nth(1)).toHaveText('300');
      await expect(mealRow.locator('td').nth(2)).toHaveText('20');
      await expect(mealRow.locator('td').nth(3)).toHaveText('50');
      await expect(mealRow.locator('td').nth(4)).toHaveText('10');
    });
  
    test('TC-NUT-002: should validate required fields', async ({ page }) => {
      // Try to add meal without filling any fields
      await page.click('button:text("Mahlzeit hinzufügen")');
      
      // Verify error message
      await expect(page.getByText('Bitte alle Felder ausfüllen')).toBeVisible();
    });
  
    test('TC-NUT-003: should delete a meal', async ({ page }) => {
      // First add a meal
      await page.fill('input[name="name"]', 'Test Meal');
      await page.fill('input[name="calories"]', '300');
      await page.fill('input[name="protein"]', '20');
      await page.fill('input[name="carbs"]', '50');
      await page.fill('input[name="fats"]', '10');
      await page.click('button:text("Mahlzeit hinzufügen")');
  
      // Get initial number of meals
      const initialMealCount = await page.locator('tbody tr').count();
  
      // Delete the meal
      await page.locator('tbody tr').first().getByText('Löschen').click();
  
      // Verify meal was deleted
      const finalMealCount = await page.locator('tbody tr').count();
      expect(finalMealCount).toBe(initialMealCount - 1);
    });
  });
});
