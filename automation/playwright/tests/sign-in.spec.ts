import { test, expect } from '@playwright/test';

test('progress sync menampilkan semua endpoint master data', async ({ page }) => {
  await page.goto('/sync');

  const masterResponse = await page.waitForResponse((r) => r.url().includes('/tenant/master'));
  const master = await masterResponse.json();
  const endpointKeys: string[] = master.endpoints.map((e: { key: string }) => e.key);

  for (const key of endpointKeys) {
    await expect(page.getByTestId(`sync-row-${key}`)).toHaveText(/100%/, { timeout: 20_000 });
  }
});
