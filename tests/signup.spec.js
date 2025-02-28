import { expect, test } from '@playwright/test';

test.describe('Signup Page Tests', () => {

    // Test 1: Should load the signup page successfully
    test('should load the signup page successfully', async ({ page }) => {
        await page.goto('http://localhost:5000/signup'); // Change this URL if needed
        await expect(page).toHaveTitle(/VitalFlow/i);
        await expect(page.locator('h2')).toHaveText(/USER SIGNUP/);
    });

    // Test 2: Should allow a user to type in the input fields
    test('should allow a user to type in the input fields', async ({ page }) => {
        await page.goto('http://localhost:5000/signup');

        await page.fill('input[name="full_name"]', 'John Doe');
        await page.fill('input[name="email"]', 'johndoe@example.com');
        await page.fill('input[name="password"]', 'password123');

        await expect(page.locator('input[name="full_name"]')).toHaveValue('John Doe');
        await expect(page.locator('input[name="email"]')).toHaveValue('johndoe@example.com');
        await expect(page.locator('input[name="password"]')).toHaveValue('password123');
    });

    // Test 3: Should show an error message when submitting an empty form
    test('should show an error message when submitting an empty form', async ({ page }) => {
        await page.goto('http://localhost:5000/signup');

        await page.click('button[type="submit"]');

        await expect(page.locator('p.text-red-500')).toHaveText(/Signup failed/);
    });



    // Test 5 (FAIL): Should fail when trying to sign up with an existing email
    test('should fail when trying to sign up with an existing email', async ({ page }) => {
        await page.goto('http://localhost:5000/signup');

        await page.fill('input[name="full_name"]', 'Existing User');
        await page.fill('input[name="email"]', 'existing@example.com'); // Assuming this email already exists
        await page.fill('input[name="password"]', 'password123');

        await page.click('button[type="submit"]');

        // Intentional failure: Expecting a success message when it should fail
        await expect(page.locator('.Toastify__toast-body')).toHaveText(/Signup successful/);
    });

});
