import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4321');
});

test.describe('Frontpage', () => {
  test('Shows login when visiting first time', async ({ page }) => {
    const loginButton = page.getByText('LOGGA IN');
    await loginButton.click();
    await expect(page.getByLabel('Användare')).toContainText('Kim Fransman');
  });
});
