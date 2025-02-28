import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test.describe('All Orders Page', () => {
    test.beforeEach(async ({ page }) => {
        // Simulate admin login by setting a token in localStorage
        await page.goto(`${BASE_URL}/login`);

        await page.evaluate(() => {
            localStorage.setItem("token", "effgfghjhgdyfglkgjfhghdhjkg");
            localStorage.setItem("role", "");
        },

            // Navigate to the orders page

        ); await page.goto(`${BASE_URL}/allorder`)
    });

    test('Redirects unauthorized users to login', async ({ page }) => {
        // Clear local storage to simulate no login
        await page.addInitScript(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        });

        await page.goto(`${BASE_URL}/allorder`);
        await expect(page).toHaveURL(`${BASE_URL}/login`);
        // await expect(page.locator('text=Please LOGIN')).toBeVisible();
    });

    test('Displays orders correctly', async ({ page }) => {


        await expect(page.locator('h2:text("ALL ORDERS")')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('h2').filter({ hasText: 'ALL ORDERS' })).toBeVisible();

        await expect(page.locator('table')).toBeVisible();

        const orders = page.locator('tbody tr');
        const orderCount = await orders.count();
        expect(orderCount).toBeGreaterThan(0);
    });

    test('Shows cart details in modal when clicked', async ({ page }) => {
        const cartLink = page.locator('tbody tr:first-child td:nth-child(3)'); // Clickable Cart ID
        await expect(cartLink).toBeVisible();
        await cartLink.click();

        // Verify modal appears
        await expect(page.locator('h3:has-text("Cart Items")')).toBeVisible();
    });

    test('Deletes an order successfully', async ({ page }) => {
        // Find delete button in first row
        const deleteButton = page.locator('tbody tr:first-child td:last-child button');

        // Click delete button
        await deleteButton.click();

        // Confirm success toast appears
        await expect(page.locator('text=Order deleted successfully')).toBeVisible();
    });
});
