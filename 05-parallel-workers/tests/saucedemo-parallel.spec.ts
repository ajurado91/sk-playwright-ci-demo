import { test, expect } from '@playwright/test';

test.describe('SauceDemo E-commerce Flow - Parallel Tests', () => {

    test('Test 1: Login and verify products page', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page.locator('.title')).toHaveText('Products');
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    test('Test 2: Add items to cart', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('Test 3: View cart', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');

        await expect(page.locator('.title')).toHaveText('Your Cart');
        await expect(page.locator('.cart_item')).toHaveCount(1);
    });

    test('Test 4: Complete checkout flow', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'Playwright');
        await page.fill('[data-test="lastName"]', 'User');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        await expect(page.locator('.summary_total_label')).toBeVisible();
        await page.click('[data-test="finish"]');

        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    test('Test 5: Locked out user error', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
    });

    test('Test 6: Remove item from cart', async ({ page }) => {
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.click('[data-test="remove-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });
});
