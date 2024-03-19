import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Jack Moore's Blog/);
  await expect(
    page.getByRole('heading', { name: /jtmthf/, level: 1 }),
  ).toBeVisible();
});
