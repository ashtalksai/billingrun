import { test, expect } from '@playwright/test';

test.describe('Dashboard Pages', () => {
  test('should load dashboard page', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Dashboard should load (may show login redirect in real auth scenario)
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should have sidebar navigation', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for sidebar or navigation elements
    const sidebar = page.locator('[role="navigation"], aside, nav').first();
    await expect(sidebar).toBeVisible();
  });

  test('should display claims overview', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for dashboard content indicators
    await expect(page.getByText(/claims|overview|dashboard/i).first()).toBeVisible();
  });

  test('should navigate to import page', async ({ page }) => {
    await page.goto('/dashboard/import');
    
    await expect(page).toHaveURL(/import/);
    await expect(page.getByText(/import|upload|csv/i).first()).toBeVisible();
  });

  test('should navigate to new claim page', async ({ page }) => {
    await page.goto('/dashboard/claims/new');
    
    await expect(page).toHaveURL(/claims\/new/);
    await expect(page.getByText(/new claim|create|add claim/i).first()).toBeVisible();
  });

  test('should navigate to denials page', async ({ page }) => {
    await page.goto('/dashboard/denials');
    
    await expect(page).toHaveURL(/denials/);
    await expect(page.getByText(/denial|rejected|failed/i).first()).toBeVisible();
  });

  test('should load claim detail page', async ({ page }) => {
    // Test with a sample claim ID
    await page.goto('/dashboard/claims/NEMT-10920');
    
    await expect(page).toHaveURL(/claims\/NEMT-10920/);
  });
});

test.describe('Static Pages', () => {
  test('should load pricing page', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.getByRole('heading', { name: /pricing|plans/i })).toBeVisible();
    // Check for pricing tiers
    await expect(page.getByText(/starter|basic|pro|enterprise/i).first()).toBeVisible();
  });

  test('should load about page', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.getByRole('heading', { name: /about|our story|mission/i })).toBeVisible();
  });

  test('should load pitch page', async ({ page }) => {
    await page.goto('/pitch');
    
    await expect(page).toHaveURL(/pitch/);
  });

  test('should load docs page', async ({ page }) => {
    await page.goto('/docs');
    
    await expect(page).toHaveURL(/docs/);
    await expect(page.getByText(/documentation|docs|resources/i).first()).toBeVisible();
  });
});

test.describe('API Health', () => {
  test('should return 200 from health endpoint', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
  });
});
