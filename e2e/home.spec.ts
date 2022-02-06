import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || '';

test.describe('home', () => {
  test.beforeAll(() => {
    expect(BASE_URL).not.toBe('');
  });

  test('home is shown correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/abekoh's tech note/);
    await expect(page.locator('h1')).toHaveText(/abekoh's tech note/);

    await expect(page.locator('text=Recent Posts').first()).toBeVisible();
    await expect(
      page.locator('a:has-text("Privacy Policy")').first(),
    ).toHaveAttribute('href', '/privacy');
  });
});
