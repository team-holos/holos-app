// @ts-check
import { test, expect } from "@playwright/test";

test("user can register", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Click the register link.
  await page.getByTestId("register-button").click();

  await expect(page).toHaveURL("http://localhost:5173/register");

  await page.getByLabel('Vorname:').fill('testuser');

  await expect(page.getByLabel('Vorname:')).
    toHaveValue('testuser');

    
});
