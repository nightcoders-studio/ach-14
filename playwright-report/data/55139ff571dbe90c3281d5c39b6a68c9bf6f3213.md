# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-portal.spec.ts >> Fase 4: E2E Admin Portal & Rendering >> Halaman registrasi harus memiliki field yang sesuai standar
- Location: e2e/admin-portal.spec.ts:18:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel(/Password/i)
Expected: visible
Error: strict mode violation: getByLabel(/Password/i) resolved to 2 elements:
    1) <input value="" required="" id="password" type="password" data-slot="input" placeholder="••••••••" class="h-8 w-full min-w-0 rounded-lg border border-input px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50…/> aka getByRole('textbox', { name: 'Password', exact: true })
    2) <input value="" required="" type="password" data-slot="input" id="confirmPassword" placeholder="••••••••" class="h-8 w-full min-w-0 rounded-lg border border-input px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-i…/> aka getByRole('textbox', { name: 'Konfirmasi Password' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel(/Password/i)

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Gampong Alert Hub" [ref=e4] [cursor=pointer]:
    - /url: /
    - img [ref=e6]
    - generic [ref=e8]: Gampong Alert Hub
  - generic [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]: Buat Akun Baru
      - generic [ref=e12]: Daftarkan diri Anda untuk mengelola peringatan dini.
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Nama Lengkap
          - textbox "Nama Lengkap" [ref=e17]:
            - /placeholder: Geuchik Gampong
        - generic [ref=e18]:
          - generic [ref=e19]: Email
          - textbox "Email" [ref=e20]:
            - /placeholder: admin@gampong.id
        - generic [ref=e21]:
          - generic [ref=e22]: Password
          - textbox "Password" [ref=e23]:
            - /placeholder: ••••••••
        - generic [ref=e24]:
          - generic [ref=e25]: Konfirmasi Password
          - textbox "Konfirmasi Password" [ref=e26]:
            - /placeholder: ••••••••
      - generic [ref=e27]:
        - button "Daftar" [ref=e28]
        - generic [ref=e29]:
          - text: Sudah punya akun?
          - link "Masuk di sini" [ref=e30] [cursor=pointer]:
            - /url: /login
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
  12 |     await expect(page.locator('h1')).toContainText(/Gampong|Alert/i);
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
> 23 |     await expect(page.getByLabel(/Password/i)).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  24 |   });
  25 | });
  26 | 
```