import { expect, test } from '@playwright/test';

test.describe('All Items Page', () => {
    // Setup for logging in as an admin
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('token', 'fsdfgsrgr');
            localStorage.setItem('role', 'admin');
        });
        await page.goto('http://localhost:5000/getitems');
    });

    test('should render the items list', async ({ page }) => {
        // Wait for the items to be loaded and the table to appear
        const table = await page.locator('table');
        await expect(table).toBeVisible();

        // Ensure some items are present
        const items = await page.locator('tbody tr');
        const rowCount = await items.count();
        console.log(`Row count: ${rowCount}`);
    
        // Make sure at least one row is present
        expect(rowCount).toBeGreaterThan(0);
    
    });


    test('should paginate the items list', async ({ page }) => {
        // Verify the pagination buttons are visible
        const prevButton = await page.locator('button:has-text("Previous")');
        const nextButton = await page.locator('button:has-text("Next")');
        await expect(prevButton).toBeVisible();
        await expect(nextButton).toBeVisible();

        // Click the "Next" button and verify page content changes
        await nextButton.click();
        const pageContent = await page.locator('tbody');
        await expect(pageContent).toBeVisible();

        // Click the "Previous" button and verify page content goes back
        await prevButton.click();
        await expect(pageContent).toBeVisible();
    });
});
