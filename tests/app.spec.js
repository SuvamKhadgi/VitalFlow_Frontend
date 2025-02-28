import { expect, test } from '@playwright/test';

const routes = [
    { path: '/', name: 'Home' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
    { path: '/admindashboard', name: 'Dashboard' },
    { path: '/additems', name: 'Add Items' },
    { path: '/getitems', name: 'All Items' },
    { path: '/allusers', name: 'All Users' },
    { path: '/allorder', name: 'All Orders' },
    { path: '/babycare', name: 'Baby Care' },
    { path: '/mycart', name: 'My Cart' },
    { path: '/first-aid', name: 'First Aid' },
];

test.describe('Navigation Tests', () => {
    routes.forEach(({ path, name }) => {
        test.beforeEach(async ({ page }) => {
            await page.addInitScript(() => {
                localStorage.setItem('token', 'fsdfgsrgr');
                localStorage.setItem('role', 'admin');
            });
            
        });
        test(`should navigate to ${name} page`, async ({ page }) => {
            await page.goto(`http://localhost:5000${path}`);
            await expect(page).not.toHaveTitle(/404/);
            // await expect(page.locator('body')).toContainText(name);
        });
    });
});
