import { test, expect } from '@playwright/test';

// This test is designed to FAIL intentionally

test.describe('SauceDemo - Trace Viewer Demo', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Demo: Intentional failure in checkout', async ({ page }) => {
        // 1. Login
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        // Verify login success
        await expect(page.locator('.title')).toHaveText('Products');

        // 2. Add items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

        // Verify cart badge
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // 3. Go to Cart
        await page.click('.shopping_cart_link');
        await expect(page.locator('.title')).toHaveText('Your Cart');

        // 4. Checkout
        await page.click('[data-test="checkout"]');

        // 5. Fill Information
        await page.fill('[data-test="firstName"]', 'Playwright');
        await page.fill('[data-test="lastName"]', 'User');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        // 6. Verify Overview
        await expect(page.locator('.summary_total_label')).toBeVisible();
        await expect(page.locator('.complete-header')).toHaveText('Incorrect Text');

    });

    test('Demo: Intentional failure in login', async ({ page }) => {
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('.title')).toHaveText('Incorrect Title');

    });
});
