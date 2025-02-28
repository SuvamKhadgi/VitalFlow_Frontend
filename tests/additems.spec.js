import { test, expect } from '@playwright/test';

test.describe('Additems Form', () => {
  
  test.beforeEach(async ({ page }) => {
    // Setup: Ensure the user is logged in with an admin role
    await page.addInitScript(() => {
      localStorage.setItem('token', 'mockAdminToken');
      localStorage.setItem('role', 'admin');
    });

    // Navigate to the Add Items page
    await page.goto('http://localhost:5000/additems');  // Adjust URL accordingly
  });

  test('should render the Add Items form correctly', async ({ page }) => {
    // Ensure the form is visible
    const form = await page.locator('form');
    await expect(form).toBeVisible();

    // Ensure the required fields are present
    await expect(page.locator('input[name="item_name"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(page.locator('input[name="item_quantity"]')).toBeVisible();
    await expect(page.locator('input[name="item_price"]')).toBeVisible();
    await expect(page.locator('select[name="item_type"]')).toBeVisible();
  });

  test('should select category and subcategory correctly', async ({ page }) => {
    // Select "Personal care" category
    const categorySelect = await page.locator('select[name="item_type"]');
    await categorySelect.selectOption('Personal care');
    
    // Wait for subcategory options to be visible
    const subcategorySelect = await page.locator('select[name="sub_item_type"]');
    await expect(subcategorySelect).toBeVisible();
    
    // Select a subcategory
    await subcategorySelect.selectOption('Body Care');
  });

  test('should allow file upload', async ({ page }) => {
    const fileInput = await page.locator('input[type="file"]');
    // Upload a mock image file
    await fileInput.setInputFiles('../VITALFLOW FRONTEND/src/assets/images/cour2.jpeg');  // Adjust path to a mock image file
    const uploadedFile = await fileInput.inputValue();
    expect(uploadedFile.length).toBeGreaterThan(0);  // Ensure the file is uploaded
  });

  test('should show error if category or subcategory is not selected', async ({ page }) => {
    const submitButton = await page.locator('button[type="submit"]');
    
    // Submit form without selecting a category
    await submitButton.click();
    
    // Expect an error message to be shown
    await expect(page.locator('.Toastify__toast--error')).toHaveText('Please select a category and subcategory!');
  });

  test('should submit the form and show success toast', async ({ page }) => {
    // Fill in the form
    await page.fill('input[name="item_name"]', 'Test Item');
    await page.fill('textarea[name="description"]', 'Test description');
    await page.fill('input[name="item_quantity"]', '10');
    await page.fill('input[name="item_price"]', '100');
    
    // Select category and subcategory
    await page.selectOption('select[name="item_type"]', 'Personal care');
    await page.selectOption('select[name="sub_item_type"]', 'Body Care');
    
    // Upload a file
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles('../VITALFLOW FRONTEND/src/assets/images/cour2.jpeg');  // Adjust path to mock image
    
    // Submit the form
    const submitButton = await page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Expect success toast
    await expect(page.locator('.Toastify__toast--success')).toHaveText('Product added successfully!');
    
    // You can also check if the API request was triggered correctly by mocking the save API call
    // Assuming you use a method to mock API calls, you can test it here
  });
  
});
