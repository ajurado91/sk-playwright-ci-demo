import { test, expect } from '@playwright/test';

test.describe('GitHub Pages Trace Demo', () => {

    test('should fail to generate trace for GitHub Pages', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        console.log('Intentionally failing to generate trace artifact...');
        // This selector does not exist, so it will timeout and fail
        await page.fill('#this-selector-does-not-exist', 'standard_user');

        await page.click('[data-test="login-button"]');
    });
});
