import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BillingRun/);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation elements exist
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sign ?up|get started/i })).toBeVisible();
  });

  test('should have hero section with CTA', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading and CTA buttons
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('link', { name: /get started|sign up|start free/i }).first()).toBeVisible();
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /pricing/i }).first().click();
    await expect(page).toHaveURL(/pricing/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  test('should have no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('third-party')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});
