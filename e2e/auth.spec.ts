import { test, expect } from '@playwright/test';

test.describe('Fase 4: E2E Auth & Route Protection', () => {
  test('harus meredirect user yang belum login dari halaman dashboard ke halaman login', async ({ page }) => {
    // Mencoba mengakses rute terlindungi
    await page.goto('/dashboard');
    
    // Harus diarahkan ke halaman login karena middleware melindungi /dashboard
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('halaman login harus memiliki struktur dan form yang benar', async ({ page }) => {
    await page.goto('/login');
    
    // Mengecek apakah form login ter-render dengan baik
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /masuk|login/i })).toBeVisible();
  });
});
