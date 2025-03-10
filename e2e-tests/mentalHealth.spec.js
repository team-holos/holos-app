const { test, expect } = require('@playwright/test');

test.describe('Mental Health Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('http://localhost:5173/login');
    await page.getByTestId("email-input").fill(generatedEmail);
    await page.getByTestId("password-input").fill(password);
    await page.getByRole("button", { name: "Login" }).click();  
    await page.waitForNavigation();
    await page.goto('http://localhost:5173/mental-health');
  });

  test('TC-MH-001: Journal-Eintrag speichern', async ({ page }) => {
    await page.click('.react-calendar__tile'); // Select a date
    await page.fill('textarea', 'Mein erster Eintrag');
    await page.click('button:has-text("Speichern")');
    await expect(page).toHaveText('Eintrag gespeichert!');
  });

  test('TC-MH-002: Journal-Eintrag laden', async ({ page }) => {
    await page.click('.react-calendar__tile'); // Select a date with an entry
    await expect(page.locator('textarea')).toHaveValue('Mein erster Eintrag');
  });

  test('TC-MH-003: Meditationstimer starten', async ({ page }) => {
    await page.click('button:has-text("Start Timer")');
    await expect(page.locator('.timer')).toHaveText('09:59');
  });

  test('TC-MH-004: Sound abspielen', async ({ page }) => {
    await page.selectOption('select[name="sound"]', 'rain');
    await page.click('button:has-text("Play Sound")');
    // Verify sound is playing (this might require additional setup or mocking)
  });
});
