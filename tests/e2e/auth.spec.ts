import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test.describe('Login Page', () => {
    test('should load login page', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByRole('heading', { name: /log ?in|sign ?in|welcome/i })).toBeVisible();
    });

    test('should have email and password fields', async ({ page }) => {
      await page.goto('/login');
      
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
    });

    test('should have submit button', async ({ page }) => {
      await page.goto('/login');
      
      await expect(page.getByRole('button', { name: /log ?in|sign ?in|submit/i })).toBeVisible();
    });

    test('should have link to signup page', async ({ page }) => {
      await page.goto('/login');
      
      const signupLink = page.getByRole('link', { name: /sign ?up|create|register/i });
      await expect(signupLink).toBeVisible();
    });

    test('should show validation on empty submit', async ({ page }) => {
      await page.goto('/login');
      
      // Click submit without filling fields
      await page.getByRole('button', { name: /log ?in|sign ?in|submit/i }).click();
      
      // Check for HTML5 validation or custom validation
      const emailField = page.getByLabel(/email/i);
      await expect(emailField).toHaveAttribute('required', '');
    });
  });

  test.describe('Signup Page', () => {
    test('should load signup page', async ({ page }) => {
      await page.goto('/signup');
      await expect(page.getByRole('heading', { name: /sign ?up|create|register|get started/i })).toBeVisible();
    });

    test('should have required form fields', async ({ page }) => {
      await page.goto('/signup');
      
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i).first()).toBeVisible();
    });

    test('should have submit button', async ({ page }) => {
      await page.goto('/signup');
      
      await expect(page.getByRole('button', { name: /sign ?up|create|register|get started/i })).toBeVisible();
    });

    test('should have link to login page', async ({ page }) => {
      await page.goto('/signup');
      
      const loginLink = page.getByRole('link', { name: /log ?in|sign ?in|already have/i });
      await expect(loginLink).toBeVisible();
    });
  });
});
