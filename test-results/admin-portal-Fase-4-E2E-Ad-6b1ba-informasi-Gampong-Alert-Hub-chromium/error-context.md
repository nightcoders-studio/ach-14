# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-portal.spec.ts >> Fase 4: E2E Admin Portal & Rendering >> Landing Page harus terender dengan baik dan memuat informasi Gampong Alert Hub
- Location: e2e/admin-portal.spec.ts:8:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /Gampong|Alert/i
Received string:  "Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    14 × locator resolved to <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">…</h1>
       - unexpected value "Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi"

```

```yaml
- heading "Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Catatan: Karena kita tidak punya user login statis untuk testing saat ini (Auth mengandalkan email/magic link),
  4  | // Tes ini bisa digunakan secara mock atau mensimulasikan sesi yang sudah login (bypass auth).
  5  | // Untuk tujuan demonstrasi Fase 4, kita akan mencoba mengakses root landing page.
  6  | 
  7  | test.describe('Fase 4: E2E Admin Portal & Rendering', () => {
  8  |   test('Landing Page harus terender dengan baik dan memuat informasi Gampong Alert Hub', async ({ page }) => {
  9  |     await page.goto('/');
  10 | 
  11 |     // Memastikan judul utama aplikasi muncul
> 12 |     await expect(page.locator('h1')).toContainText(/Gampong|Alert/i);
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  13 | 
  14 |     // Memastikan tombol interaktif ada
  15 |     await expect(page.getByRole('button', { name: /Mulai|Dashboard/i })).toBeVisible();
  16 |   });
  17 | 
  18 |   test('Halaman registrasi harus memiliki field yang sesuai standar', async ({ page }) => {
  19 |     await page.goto('/register');
  20 |     
  21 |     await expect(page.getByLabel(/Nama/i)).toBeVisible();
  22 |     await expect(page.getByLabel(/Email/i)).toBeVisible();
  23 |     await expect(page.getByLabel(/Password/i)).toBeVisible();
  24 |   });
  25 | });
  26 | 
```