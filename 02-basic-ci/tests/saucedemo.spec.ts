import { test, expect } from '@playwright/test';

test.describe('SauceDemo E-commerce Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('should complete a purchase flow', async ({ page }) => {
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
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // 4. Checkout
    await page.click('[data-test="checkout"]');
    
    // 5. Fill Information
    await page.fill('[data-test="firstName"]', 'Playwright');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // 6. Verify Overview and Finish
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await page.click('[data-test="finish"]');

    // 7. Verify Success
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('should show error for locked out user', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
  });
});
