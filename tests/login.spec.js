import { expect, test } from '@playwright/test';

test.describe('Login Page Tests', () => {

    // Test 1: Should load the login page successfully
    test('should load the login page successfully', async ({ page }) => {
        await page.goto('http://localhost:5000/login'); // Update with your correct URL

        // Check if the page title or form elements are present
        await expect(page).toHaveTitle(/VitalFlow/i);
        await expect(page.locator('h2')).toHaveText(/USER LOGIN/);
    });

    // Test 2: Should allow a user to type in the email and password input fields
    test('should allow a user to type in the email and password fields', async ({ page }) => {
        await page.goto('http://localhost:5000/login');

        // Fill email and password fields
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'password123');

        // Assert that the email and password values are filled correctly
        await expect(page.locator('input[type="email"]')).toHaveValue('testuser@example.com');
        await expect(page.locator('input[type="password"]')).toHaveValue('password123');
    });

    // Test 3: Should show an error message for invalid credentials
    test('should show an error message for invalid credentials', async ({ page }) => {
        await page.goto('http://localhost:5000/login');

        // Enter invalid credentials
        await page.fill('input[type="email"]', 'invaliduser@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for error to appear (you can adjust this based on the actual error message in the app)
        await expect(page.locator('.error-message')).toHaveText('Invalid email or password', { timeout: 10000 });
    });

    // Test 4: Should redirect to the correct dashboard based on user role (assuming admin role)
    test('should redirect to admin dashboard for admin users', async ({ page }) => {
        // Simulate successful login with mock API response (you can mock backend response for testing purposes)
        await page.goto('http://localhost:5000/login');

        await page.fill('input[type="email"]', 'vitalflow@gmail.com');
        await page.fill('input[type="password"]', 'vital123');

        // Mock the backend response for login (you can mock this part to simulate a successful login)
        await page.click('button[type="submit"]');

        // Wait for the redirect to happen
        await page.waitForURL('http://localhost:5000/admindashboard'); // Ensure the URL matches the dashboard path for admin
        await expect(page).toHaveURL('http://localhost:5000/admindashboard');
    });

    // Test 5 (FAIL): Should redirect to user dashboard for regular users (intentional failure for testing)
    test('should redirect to user dashboard for regular users', async ({ page }) => {
        // Simulate successful login for a regular user
        await page.goto('http://localhost:5000/login');

        await page.fill('input[type="email"]', 'suvu@gmail.com');
        await page.fill('input[type="password"]', 'pass');

        await page.click('button[type="submit"]');

        // Intentional failure: Expecting admin dashboard redirection
        await expect(page).toHaveURL('http://localhost:5000/'); // This should fail for non-admin users
    });

});
