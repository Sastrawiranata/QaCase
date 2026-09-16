import { defineConfig } from '@playwright/test';

// Konfigurasi dasar, arahkan baseURL ke environment staging saat run beneran
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: process.env.WEMINE_OFFICE_URL || 'https://staging.wemineoffice.example.com',
  },
});
