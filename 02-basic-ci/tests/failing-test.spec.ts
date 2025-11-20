import { test, expect } from '@playwright/test';

test.describe('Intentional Failure Demo', () => {

  test('should fail intentionally to show trace', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    console.log('Attempting to find non-existent element...');
    await page.fill('#non-existent-selector', 'standard_user');

    await page.click('[data-test="login-button"]');
  });

  test('should fail assertion intentionally', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle('Incorrect Title');
  });
});
