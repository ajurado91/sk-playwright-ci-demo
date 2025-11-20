import { test, expect } from '@playwright/test';

// Este test está diseñado para FALLAR intencionalmente
// Úsalo durante la demo para mostrar cómo funcionan los retries y traces en UI testing

test.describe('SauceDemo - Demo de Trace Viewer', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('Demo: Fallo intencional en checkout', async ({ page }) => {
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

        // ❌ Este expect FALLARÁ intencionalmente
        await expect(page.locator('.complete-header')).toHaveText('TEXTO_INCORRECTO');

        // Playwright automáticamente:
        // 1. Reintentará el test (retries: 1)
        // 2. Generará un trace en el reintento con:
        //    - Screenshots de cada paso
        //    - Video de la ejecución
        //    - DOM snapshots
        //    - Network requests
        //    - Console logs
        //    - Timeline visual de acciones
    });

    test('Demo: Fallo intencional en login', async ({ page }) => {
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        // ❌ Este expect FALLARÁ intencionalmente
        await expect(page.locator('.title')).toHaveText('TITULO_INCORRECTO');

        // El trace mostrará:
        // - Screenshot del momento del fallo
        // - El selector que estaba buscando
        // - El texto real vs el esperado
        // - El estado del DOM en ese momento
    });
});

// 🎤 Para la demo en vivo:
// 1. Este archivo ya está activo (sin .skip())
// 2. El workflow de GitHub Actions ejecutará estos tests
// 3. Los tests fallarán pero el workflow continuará (continue-on-error: true)
// 4. Descarga los artifacts desde GitHub Actions
// 5. Abre el reporte: npx playwright show-report
// 6. Haz clic en el test fallido
// 7. Muestra el Trace Viewer con:
//    - Video de la ejecución completa
//    - Screenshots en cada paso
//    - Timeline interactivo
//    - DOM explorer
//    - Network tab
//    - Console logs
