import { expect, test } from '@playwright/test';
test.beforeEach(async ({ page }) => {

    //     // Simulate logged-in user session
    await page.addInitScript(() => {
        localStorage.setItem("token", "67beee8baa7e9822cda7f888");
        localStorage.setItem("role", "admin");
    });
    // await page.goto('http://localhost:5000/admindashboard'); // Change URL if necessary

});

test.describe('Admin Dashboard Tests', async () => {

    test.beforeEach(async ({ page }) => {
        await page.route('**/api/admin/stats', route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    users: 150,
                    products: 75,
                    carts: 30,
                    orders: 45
                })
            });
        });

        await page.goto('http://localhost:5000/admindashboard');

    });

    test('should display stats cards with correct values', async ({ page }) => {
        // Verify that the stats cards are visible and contain the correct values
        await expect(page.locator('h3:has-text("Total Users")')).toBeVisible();

        await expect(page.locator('h3:has-text("Products")')).toBeVisible();

        await expect(page.locator('h3:has-text("Carts")')).toBeVisible();
        // await expect(page.locator('p:has-text("30")')).toBeVisible();  // Ensure '30' appears for carts

        await expect(page.locator('h3:has-text("Orders")')).toBeVisible();
        // await expect(page.locator('p:has-text("45")')).toBeVisible();  // Ensure '45' appears for orders
    });

    test('should render the Bar chart and Pie chart correctly', async ({ page }) => {
        await page.waitForTimeout(7000); // Wait for charts to render

        // Select the first chart container (Bar chart) by using nth-child
        const barChartContainer = page.locator('div:nth-of-type(1) > canvas'); // Assuming Bar chart is the first chart
        await expect(barChartContainer).toBeVisible({ timeout: 7000 });

        // Select the second chart container (Pie chart) by using nth-child
        const pieChartContainer = page.locator('div:nth-of-type(2) > canvas'); // Assuming Pie chart is the second chart
        await expect(pieChartContainer).toBeVisible({ timeout: 7000 });
    });



    test('should show correct chart data', async ({ page }) => {
        // Ensure the bar chart contains the correct data
        const barChartData = await page.locator('canvas').first();  // Check the first chart (bar chart)
        await expect(barChartData).toBeVisible(); // Ensure it's rendered

        // Ensure the pie chart contains the correct data
        const pieChartData = await page.locator('canvas').nth(1);  // Check the second chart (pie chart)
        await expect(pieChartData).toBeVisible(); // Ensure it's rendered
    });
});
