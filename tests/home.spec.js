import { expect, test } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5000'); // Change URL if necessary

//     // Simulate logged-in user session
    await page.evaluate(() => {
        localStorage.setItem("id", "67beee8baa7e9822cda7f888");
//         localStorage.setItem("name", "qqqq");
//         localStorage.setItem("role", "user");
//         localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQi"); // Example token
    });

//     // Reload the page so the app picks up the session
//     await page.reload();
});

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5000'); // Change URL if necessary
    });

    test('should display navbar, search bar, and footer', async ({ page }) => {
        await expect(page.locator('nav')).toBeVisible();
        await expect(page.locator('textarea[placeholder="Search..."]')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
    });

    test('should perform a search and display results', async ({ page }) => {
        await page.fill('textarea[placeholder="Search..."]', 'Baby Vicks'); // Sample query
        await page.waitForTimeout(6000); // Wait for search results

        const searchResults = page.locator('.grid.grid-cols-1').first();
        await expect(searchResults).toBeVisible();

    });

    test('should increase and decrease quantity of an item', async ({ page }) => {
        await page.fill('textarea[placeholder="Search..."]', 'device');
        await page.waitForTimeout(2000);

        const increaseButton = page.locator('button:has-text("+")').first();
        const decreaseButton = page.locator('button:has-text("-")').first();
        const quantityText = page.locator('span.text-lg').first();

        await increaseButton.click();
        await expect(quantityText).toContainText('2');

        await decreaseButton.click();
        await expect(quantityText).toContainText('1');
    });

    test('should add an item to the cart and show success toast', async ({ page }) => {
        await page.fill('textarea[placeholder="Search..."]', 'baby');
        await page.waitForTimeout(2000);

        const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
        await addToCartButton.click();
        await page.waitForTimeout(2000); // Adjust time if necessary

        const successToast = page.locator('.Toastify__toast--success', { hasText: 'Item added to cart successfully!' }).first();
        await expect(successToast).toBeVisible({ timeout: 10000 });


    });
});
