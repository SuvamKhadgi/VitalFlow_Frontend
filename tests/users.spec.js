import { expect, test } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5000'); // Change URL if necessary

    //     // Simulate logged-in user session
    await page.evaluate(() => {
        localStorage.setItem("id", "67beee8baa7e9822cda7f888");
        //         localStorage.setItem("name", "qqqq");
        localStorage.setItem("role", "");
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I0YjE2MjEzYjM1NTlhMzUzMzRiYjYiLCJlbWFpbCI6InZpdGFsZmxvd0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3NDA1NzI4NTAsImV4cCI6MTc0MDYwODg1MH0.QUBbhsC8T1vslL8nH3i-Q1JhByDkuaJc2PHlMLThpj0"); // Example token
    });

    //     // Reload the page so the app picks up the session
    //     await page.reload();
});
test.describe('Users page', () => {
    test('should render the table with user data', async ({ page }) => {
        // Navigate to the users page hosted on your local server
        await page.goto('http://localhost:5000/allusers');

        // Wait for user data to appear and verify that the user names are visible
        // await expect(page.locator('text=Admin')).toBeVisible();
        // await expect(page.locator('text=Jane Smith')).toBeVisible();

        // Check if the table headers are visible
        await expect(page.locator('text=ID')).toBeVisible();
        await expect(page.locator('text=Username')).toBeVisible();
        await expect(page.locator('text=Email')).toBeVisible();
        await expect(page.locator('text=Authority')).toBeVisible();
    });

    

    test('should redirect to login if no token is found', async ({ page }) => {
       
        await page.addInitScript(() => {
            localStorage.removeItem('token');
            
          });
        await page.goto('http://localhost:5000/allusers');
        await expect(page).toHaveURL('http://localhost:5000/login');
    });

    test('should redirect to home if the role is user', async ({ page }) => {
        // Set the user role to 'user' in localStorage
        await page.addInitScript(() => {
            localStorage.setItem('role', 'user');
        });

        await page.goto('http://localhost:5000/allusers');
        await expect(page).toHaveURL('http://localhost:5000/');
    });
});
