import { test, expect } from '@playwright/test';


test('submit inspection offline lalu sync otomatis saat online', async ({ page, context }) => {
  await page.goto('/inspections/EQ-INSPECT-01/new');
  await page.getByLabel('Equipment ID').fill('EXC-0042');
  await page.getByLabel('Condition').selectOption('Needs Repair');

  // Matikan koneksi
  await context.setOffline(true);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Pending sync')).toBeVisible();

  // Pastikan data tidak hilang walau halaman di-refresh saat masih offline
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Pending sync')).toBeVisible();

  // Nyalakan lagi koneksinya
  await context.setOffline(false);

  // Submission yang tertunda harus otomatis ke-upload
  await expect(page.getByText('Synced')).toBeVisible({ timeout: 15_000 });
});
