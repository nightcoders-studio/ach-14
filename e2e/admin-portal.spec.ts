import { test, expect } from '@playwright/test';

// Catatan: Karena kita tidak punya user login statis untuk testing saat ini (Auth mengandalkan email/magic link),
// Tes ini bisa digunakan secara mock atau mensimulasikan sesi yang sudah login (bypass auth).
// Untuk tujuan demonstrasi Fase 4, kita akan mencoba mengakses root landing page.

test.describe('Fase 4: E2E Admin Portal & Rendering', () => {
  test('Landing Page harus terender dengan baik dan memuat tagline utama', async ({ page }) => {
    await page.goto('/');

    // Memastikan judul utama (tagline) aplikasi muncul
    await expect(page.locator('h1')).toContainText(/Sistem Peringatan Dini/i);

    // Memastikan tombol interaktif ada (Mulai atau Dashboard)
    const buttonRegex = /Masuk|Mulai|Dashboard|Get Started/i;
    const hasButton = await page.getByRole('button', { name: buttonRegex }).isVisible() || 
                      await page.getByRole('link', { name: buttonRegex }).isVisible();
    expect(hasButton).toBeTruthy();
  });

  test('Halaman registrasi harus memiliki field yang sesuai standar', async ({ page }) => {
    await page.goto('/register');
    
    await expect(page.getByLabel(/Nama/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/^Password$/i, { exact: true })).toBeVisible();
  });
});
