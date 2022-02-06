import { test, expect } from '@playwright/test';

test('home is shown correctly', async ({ page }) => {
  await page.goto('https://blog.abekoh.dev/');
  await expect(page).toHaveTitle(/abekoh's tech note/);
  await expect(page.locator('h1')).toHaveText(/abekoh's tech note/);

  await expect(page.locator('text=Recent Posts').first()).toBeVisible();
  await expect(
    page.locator('a:has-text("Privacy Policy")').first(),
  ).toHaveAttribute('href', '/privacy');
});
