# 🧪 Testing Plan — Gampong Alert Hub

> **Versi:** 1.0  
> **Tanggal:** 1 Juni 2026  
> **Tujuan:** Memastikan kualitas, stabilitas, dan performa sistem sebelum deployment produksi.

---

## 1. Strategi Testing

### 1.1 Piramida Testing

```
                    ╱╲
                   ╱  ╲
                  ╱ E2E╲          ← 10% (Critical User Journeys)
                 ╱──────╲
                ╱        ╲
               ╱Integration╲      ← 30% (API, Database, Webhook)
              ╱──────────────╲
             ╱                ╲
            ╱   Unit Tests     ╲   ← 60% (Functions, Parsing, Validation)
           ╱────────────────────╲
```

### 1.2 Lingkup Testing

| Layer | Tool | Coverage Target |
|-------|------|----------------|
| **Unit Test** | Vitest / Jest | ≥ 70% |
| **Integration Test** | Vitest + Prisma Test Utils | ≥ 50% |
| **API Test** | Vitest + Supertest | Semua endpoint |
| **E2E Test** | Playwright | 5 critical flows |
| **Load Test** | k6 / Artillery | 1.000 concurrent messages |
| **Manual Test** | Checklist | Semua fitur MVP |

---

## 2. Unit Tests

### 2.1 Modul Parsing Pesan WhatsApp

**File:** `__tests__/unit/parseMessage.test.ts`

| # | Test Case | Input | Expected Output |
|---|-----------|-------|----------------|
| 1 | Parse command `!lapor` valid | `"!lapor Kebakaran di Lorong C"` | `{ command: "lapor", jenis: "KEBAKARAN", pesan: "Kebakaran di Lorong C", lokasi: "Lorong C" }` |
| 2 | Parse command `!lapor` tanpa lokasi | `"!lapor Listrik mati"` | `{ command: "lapor", jenis: "LISTRIK", pesan: "Listrik mati", lokasi: null }` |
| 3 | Parse command `!status` | `"!status LP-0013"` | `{ command: "status", laporanId: "LP-0013" }` |
| 4 | Parse command `!bantuan` | `"!bantuan"` | `{ command: "bantuan" }` |
| 5 | Parse pesan tanpa command | `"Halo, apa kabar?"` | `{ command: null }` |
| 6 | Parse command case-insensitive | `"!LAPOR Api di pasar"` | `{ command: "lapor", ... }` |
| 7 | Parse command dengan spasi berlebih | `"!lapor   Banjir   di   Lorong A"` | `{ command: "lapor", pesan: "Banjir di Lorong A" }` |
| 8 | Parse command tidak dikenal | `"!random something"` | `{ command: "unknown" }` |

### 2.2 Modul Filter Data BMKG

**File:** `__tests__/unit/bmkgFilter.test.ts`

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Gempa di Aceh → lolos filter | `{ Wilayah: "12km BaratDaya Banda Aceh" }` | `true` |
| 2 | Gempa di Jawa → tidak lolos | `{ Wilayah: "10km Selatan Jakarta" }` | `false` |
| 3 | Gempa besar (>5 SR) → flag urgent | `{ Magnitude: "6.2", Wilayah: "Aceh" }` | `{ pass: true, urgent: true }` |
| 4 | Gempa kecil (<3 SR) → skip | `{ Magnitude: "2.1", Wilayah: "Aceh" }` | `false` (di bawah threshold) |
| 5 | Data duplikat → skip | Data yang sudah ada di DB | `false` (deduplicated) |
| 6 | Data BMKG format tidak valid | `{ invalid: "data" }` | `throw ParseError` |
| 7 | Data BMKG kosong | `null` | `false` |

### 2.3 Modul Validasi Data Warga

**File:** `__tests__/unit/wargaValidation.test.ts`

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Nomor WA valid (62...) | `"6281234567890"` | `true` |
| 2 | Nomor WA dengan prefix 08 | `"081234567890"` | Auto-convert ke `"6281234567890"` |
| 3 | Nomor WA terlalu pendek | `"628123"` | `throw ValidationError` |
| 4 | Nomor WA dengan karakter non-digit | `"62-812-3456-7890"` | Auto-strip ke `"6281234567890"` |
| 5 | Nama kosong | `""` | `throw ValidationError` |
| 6 | Lorong tidak valid | `"Lorong Z99"` | `throw ValidationError` (jika enum) |

### 2.4 Modul Format Pesan

**File:** `__tests__/unit/messageFormatter.test.ts`

| # | Test Case | Expected |
|---|-----------|----------|
| 1 | Format pesan peringatan gempa | Berisi emoji 🚨, magnitudo, lokasi, waktu, instruksi |
| 2 | Format konfirmasi laporan | Berisi ✅, ID laporan, waktu, jenis |
| 3 | Format penolakan (nomor tidak terdaftar) | Berisi ⚠️, instruksi untuk mendaftar |
| 4 | Template dengan variabel kosong | Variabel kosong diganti dengan "-" |

---

## 3. Integration Tests

### 3.1 Database Operations (Prisma)

**File:** `__tests__/integration/database.test.ts`

| # | Test Case | Deskripsi |
|---|-----------|-----------|
| 1 | Create Warga | Insert warga baru → verifikasi data di DB |
| 2 | Create Warga duplikat | Insert nomor WA yang sama → expect error unique constraint |
| 3 | Create Laporan dengan relasi | Insert laporan → verifikasi FK ke warga |
| 4 | Create Laporan tanpa warga valid | Insert dengan wargaId palsu → expect FK error |
| 5 | Update status Laporan | TERKIRIM → DIPROSES → verifikasi `updatedAt` berubah |
| 6 | Soft delete Warga | Set `aktif = false` → verifikasi data masih ada |
| 7 | Query filter Laporan | Filter by status + jenis + date range → verifikasi hasil |
| 8 | Pagination Warga | Request page 2, limit 10 → verifikasi offset correct |
| 9 | Create LogPeringatan | Insert dengan rawData JSON → verifikasi JSON tersimpan |
| 10 | LogBroadcast statistics | Insert broadcast log → hitung berhasil vs gagal |

### 3.2 API Routes (Next.js)

**File:** `__tests__/integration/api/*.test.ts`

| # | Endpoint | Method | Test Case | Expected |
|---|----------|--------|-----------|----------|
| 1 | `/api/auth/login` | POST | Login dengan kredensial valid | 200 + session token |
| 2 | `/api/auth/login` | POST | Login dengan password salah | 401 |
| 3 | `/api/warga` | GET | Tanpa auth | 401 |
| 4 | `/api/warga` | GET | Dengan auth valid | 200 + data warga |
| 5 | `/api/warga` | GET | Dengan query search | 200 + filtered results |
| 6 | `/api/warga` | POST | Tambah warga valid | 201 + warga data |
| 7 | `/api/warga` | POST | Tambah warga duplikat | 409 |
| 8 | `/api/warga/:id` | PUT | Update warga | 200 + updated data |
| 9 | `/api/warga/:id` | DELETE | Soft delete | 200 + aktif=false |
| 10 | `/api/laporan` | GET | Filter by status | 200 + filtered |
| 11 | `/api/laporan/:id/status` | PATCH | Ubah status | 200 + new status |
| 12 | `/api/laporan/:id/notify` | POST | Kirim notif ke pelapor | 200 |
| 13 | `/api/peringatan` | GET | List peringatan | 200 + data |
| 14 | `/api/webhook/evolution` | POST | Pesan `!lapor` masuk | 200 + laporan created |
| 15 | `/api/webhook/evolution` | POST | Pesan biasa (bukan command) | 200 + ignored |
| 16 | `/api/health` | GET | Health check | 200 + status services |

### 3.3 Webhook Integration

**File:** `__tests__/integration/webhook.test.ts`

| # | Test Case | Deskripsi |
|---|-----------|-----------|
| 1 | Webhook valid dari Evolution API | Payload valid → laporan tersimpan → konfirmasi terkirim |
| 2 | Webhook dari nomor tidak terdaftar | Payload valid, nomor asing → penolakan terkirim |
| 3 | Webhook dengan secret salah | Header X-Webhook-Secret tidak cocok → 403 |
| 4 | Webhook dengan payload rusak | JSON tidak valid → 400 |
| 5 | Webhook duplikat (idempotency) | Pesan yang sama dikirim 2x → hanya 1 laporan tersimpan |

---

## 4. End-to-End Tests

### 4.1 Critical User Journeys

**Tool:** Playwright  
**File:** `__tests__/e2e/*.spec.ts`

#### E2E-01: Login → Dashboard → Logout

```
1. Buka halaman /login
2. Isi email + password
3. Klik "Masuk"
4. Verifikasi redirect ke /dashboard
5. Verifikasi kartu metrik muncul (Warga, Laporan, Gateway Status)
6. Klik "Logout"
7. Verifikasi redirect ke /login
```

#### E2E-02: CRUD Warga

```
1. Login sebagai ADMIN
2. Navigasi ke /dashboard/warga
3. Klik "Tambah Warga"
4. Isi form (nama, nomor WA, lorong)
5. Klik "Simpan"
6. Verifikasi warga muncul di tabel
7. Klik Edit → ubah nama → Simpan
8. Verifikasi nama berubah
9. Klik Nonaktifkan → Konfirmasi
10. Verifikasi badge "Nonaktif" muncul
```

#### E2E-03: Laporan Masuk → Dashboard Update

```
1. Login sebagai ADMIN
2. Buka /dashboard (catat jumlah laporan)
3. Trigger webhook (simulate pesan !lapor masuk)
4. Refresh dashboard
5. Verifikasi jumlah laporan bertambah 1
6. Verifikasi laporan baru muncul di tabel
```

#### E2E-04: Detail Laporan → Ubah Status

```
1. Login sebagai OPERATOR
2. Navigasi ke /dashboard/laporan
3. Klik laporan berstatus "TERKIRIM"
4. Verifikasi detail modal terbuka (nama, pesan, waktu)
5. Klik "Proses" → status berubah ke "DIPROSES"
6. Isi catatan admin
7. Klik "Simpan"
8. Verifikasi badge status berubah di tabel
```

#### E2E-05: Role-Based Access Control

```
1. Login sebagai VIEWER
2. Navigasi ke /dashboard/warga
3. Verifikasi tombol "Tambah" dan "Edit" TIDAK muncul
4. Navigasi ke /dashboard/pengaturan
5. Verifikasi halaman menampilkan "Akses Ditolak" atau redirect
```

---

## 5. Performance & Load Tests

### 5.1 Load Test: Broadcast 1.000 Pesan

**Tool:** k6  
**File:** `__tests__/load/broadcast.js`

```javascript
// Skenario: Simulasi broadcast ke 1.000 nomor
export const options = {
  scenarios: {
    broadcast: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 1000,
      maxDuration: '60s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% request < 500ms
    http_req_failed: ['rate<0.05'],     // Error rate < 5%
  },
};
```

**Target:**
| Metrik | Threshold |
|--------|-----------|
| Total 1.000 pesan terkirim | < 60 detik |
| Error rate | < 5% |
| P95 latency per pesan | < 500ms |
| Tidak ada crash/OOM | ✅ |

### 5.2 Stress Test: Dashboard dengan 10.000 Rows

**Skenario:**
1. Seed database dengan 10.000 data laporan
2. Buka halaman `/dashboard/laporan`
3. Ukur waktu loading halaman
4. Test scrolling & pagination
5. Test filter & search performance

**Target:**
| Metrik | Threshold |
|--------|-----------|
| Initial page load (20 rows) | < 2 detik |
| Filter/search response | < 1 detik |
| Pagination (next page) | < 500ms |
| Browser memory usage | < 200 MB |

### 5.3 Soak Test: 24 Jam Operasi

**Skenario:**
1. Jalankan seluruh sistem selama 24 jam
2. n8n polling BMKG setiap 5 menit (288 polls)
3. Simulasi 50 laporan warga masuk (acak)
4. Monitor resource usage setiap jam

**Target:**
| Metrik | Threshold |
|--------|-----------|
| Memory leak | Tidak ada peningkatan > 20% |
| CPU average | < 30% |
| All workflows successful | > 95% |
| Database connection pool | Stabil, tidak exhausted |

---

## 6. Security Tests

### 6.1 Checklist Keamanan

| # | Test | Metode | Expected |
|---|------|--------|----------|
| 1 | SQL Injection pada search | Input `'; DROP TABLE warga; --` | Sanitized, no effect |
| 2 | XSS pada input nama warga | Input `<script>alert('xss')</script>` | Escaped, not executed |
| 3 | CSRF pada form submit | Request tanpa CSRF token | 403 Forbidden |
| 4 | Unauthorized API access | Request tanpa auth token | 401 |
| 5 | Role escalation | VIEWER mencoba POST /api/warga | 403 Forbidden |
| 6 | Brute force login | 10 login attempts dengan password salah | Rate limited setelah 5 |
| 7 | Webhook tanpa secret | POST ke /api/webhook tanpa X-Webhook-Secret | 403 |
| 8 | Path traversal | Request ke `/api/../../../etc/passwd` | 404 / blocked |
| 9 | Sensitive data exposure | GET /api/pengaturan | API key di-redact |
| 10 | Session hijacking | Gunakan expired token | 401 |

---

## 7. Manual Testing Checklist

### 7.1 Functional Testing (Pre-Release)

#### Modul Autentikasi
- [ ] Login dengan kredensial valid → redirect ke dashboard
- [ ] Login dengan password salah → pesan error muncul
- [ ] Logout → session dihapus, redirect ke login
- [ ] Akses /dashboard tanpa login → redirect ke login
- [ ] Session expired → auto-redirect ke login

#### Modul Dashboard Beranda
- [ ] Kartu "Warga Aktif" menampilkan angka yang benar
- [ ] Kartu "Laporan Hari Ini" reset setiap tengah malam
- [ ] Indikator Gateway menampilkan status yang benar (🟢/🔴)
- [ ] Tabel "Laporan Terkini" menampilkan 10 data terakhir
- [ ] Klik baris tabel → navigasi ke detail

#### Modul Warga
- [ ] Tabel warga menampilkan data lengkap
- [ ] Search by nama berfungsi
- [ ] Filter by lorong berfungsi
- [ ] Pagination berfungsi (next/prev/jump)
- [ ] Tambah warga → form valid → data tersimpan
- [ ] Tambah warga → nomor duplikat → error message
- [ ] Edit warga → data terupdate
- [ ] Nonaktifkan warga → badge berubah
- [ ] Import CSV → preview data → import berhasil

#### Modul Laporan
- [ ] Tabel laporan menampilkan data dengan badge status
- [ ] Filter by status berfungsi
- [ ] Filter by jenis berfungsi
- [ ] Filter by tanggal berfungsi
- [ ] Klik detail → modal terbuka dengan data lengkap
- [ ] Ubah status TERKIRIM → DIPROSES → badge berubah
- [ ] Ubah status DIPROSES → SELESAI → badge berubah
- [ ] Tambah catatan admin → tersimpan
- [ ] Kirim notifikasi ke pelapor → pesan WA terkirim

#### Modul Peringatan
- [ ] Tabel peringatan menampilkan riwayat BMKG
- [ ] Detail menampilkan raw data gempa
- [ ] Statistik broadcast (berhasil/gagal) akurat
- [ ] Re-broadcast berfungsi

#### Modul WhatsApp (Two-Way)
- [ ] Kirim `!lapor Kebakaran di Lorong C` → konfirmasi diterima
- [ ] Kirim `!lapor` tanpa deskripsi → pesan error
- [ ] Kirim dari nomor tidak terdaftar → pesan penolakan
- [ ] Kirim `!status LP-0013` → status laporan diterima
- [ ] Kirim `!bantuan` → daftar command diterima
- [ ] Kirim pesan biasa (tanpa command) → tidak ada respons

### 7.2 Cross-Browser Testing

| Browser | Desktop | Tablet |
|---------|---------|--------|
| Chrome (latest) | [ ] | [ ] |
| Firefox (latest) | [ ] | [ ] |
| Edge (latest) | [ ] | [ ] |
| Safari (latest) | [ ] | [ ] |

### 7.3 Responsive Testing

| Breakpoint | Resolusi | Status |
|-----------|---------|--------|
| Desktop (Large) | 1920×1080 | [ ] |
| Desktop (Medium) | 1366×768 | [ ] |
| Tablet (Landscape) | 1024×768 | [ ] |
| Tablet (Portrait) | 768×1024 | [ ] |

---

## 8. Test Environment

### 8.1 Environment Matrix

| Environment | Database | Evolution API | n8n | URL |
|-------------|----------|--------------|-----|-----|
| **Development** | PostgreSQL (Docker) | Mock / Sandbox | Lokal | `localhost:3000` |
| **Testing** | PostgreSQL (Docker, isolated) | Mock server | Lokal | `localhost:3001` |
| **Staging** | PostgreSQL (Coolify) | Real (nomor test) | Coolify | `staging.gampong.local` |
| **Production** | PostgreSQL (Coolify) | Real (nomor resmi) | Coolify | `admin.gampong.local` |

### 8.2 Test Data

| Entitas | Jumlah Seed | Catatan |
|---------|------------|---------|
| User (Admin) | 3 | 1 ADMIN, 1 OPERATOR, 1 VIEWER |
| Warga | 50 | Spread di 5 lorong berbeda |
| Laporan | 100 | Berbagai status & jenis |
| LogPeringatan | 20 | Data gempa historis |
| LogBroadcast | 20 | Statistik broadcast |

---

## 9. Bug Reporting Template

```markdown
### 🐛 Bug Report

**Judul:** [Deskripsi singkat bug]
**Severity:** Critical / Major / Minor / Cosmetic
**Reporter:** [Nama]
**Tanggal:** [YYYY-MM-DD]

**Langkah Reproduksi:**
1. ...
2. ...
3. ...

**Expected Behavior:**
[Apa yang seharusnya terjadi]

**Actual Behavior:**
[Apa yang terjadi]

**Screenshot/Video:**
[Lampirkan jika ada]

**Environment:**
- Browser: Chrome 126
- OS: Windows 11
- Resolusi: 1920x1080

**Catatan Tambahan:**
[Info lain yang relevan]
```

---

## 10. Definition of Done (Testing)

Sebuah fitur dianggap **selesai di-test** jika:

- [ ] Semua unit test terkait **PASS**
- [ ] Integration test endpoint terkait **PASS**
- [ ] Manual testing checklist **100% centang**
- [ ] Cross-browser test minimal Chrome + Firefox **PASS**
- [ ] Responsive test di Desktop + Tablet **PASS**
- [ ] Tidak ada bug severity **Critical** atau **Major** yang terbuka
- [ ] Security checklist yang relevan **PASS**
- [ ] Performance threshold terpenuhi
