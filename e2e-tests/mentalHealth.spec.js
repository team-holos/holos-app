import { test, expect } from '@playwright/test';

test.describe('Mental Health Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('http://localhost:5173/');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('Test123!');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Navigate to Mental Health page
    await page.goto('http://localhost:5173/mental-health');
  });

  test('TC-MH-001: should save journal entry', async ({ page }) => {
    // Select today's date in calendar (it's selected by default)
    const journalText = 'This is a test journal entry';
    
    // Fill journal entry
    await page.getByPlaceholder('Schreibe deine Gedanken hier rein...').fill(journalText);
    
    // Click save button
    await page.getByRole('button', { name: 'Speichern' }).click();
    
    // Verify success message
    const alert = page.locator('text=Eintrag gespeichert!');
    await expect(alert).toBeVisible();
    
    // Verify entry was saved by reloading page
    await page.reload();
    const savedText = await page.getByPlaceholder('Schreibe deine Gedanken hier rein...').inputValue();
    await expect(savedText).toBe(journalText);
  });

  test('TC-MH-002: should load existing journal entry', async ({ page }) => {
    // First create an entry
    const journalText = 'This is a test journal entry';
    await page.getByPlaceholder('Schreibe deine Gedanken hier rein...').fill(journalText);
    await page.getByRole('button', { name: 'Speichern' }).click();
    
    // Reload page
    await page.reload();
    
    // Verify entry is loaded
    const loadedText = await page.getByPlaceholder('Schreibe deine Gedanken hier rein...').inputValue();
    await expect(loadedText).toBe(journalText);
  });

  test('TC-MH-003: should start meditation timer', async ({ page }) => {
    // Find and click start timer button
    await page.getByRole('button', { name: 'Start' }).click();
    
    // Verify timer is counting down
    const timerDisplay = page.locator('.timer-display');
    await expect(timerDisplay).toBeVisible();
    
    // Wait a second and check if time changed
    const initialTime = await timerDisplay.textContent();
    await page.waitForTimeout(1000);
    const updatedTime = await timerDisplay.textContent();
    
    await expect(initialTime).not.toBe(updatedTime);
  });

  test('TC-MH-004: should play audio', async ({ page }) => {                   
    // Click play button
    await page.getByRole('button', { name: 'Play' }).click();
    
    // Verify audio element is playing
    const audio = page.locator('audio');
    const isPlaying = await audio.evaluate((element) => !element.paused);
    await expect(isPlaying).toBeTruthy();
  });
});