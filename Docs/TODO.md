# ✅ TODO — Gampong Alert Hub

> **Terakhir diperbarui:** 1 Juni 2026  
> **Legenda:** `[ ]` Belum · `[/]` Sedang Dikerjakan · `[x]` Selesai

---

## 🏗️ Fase 0 — Setup Fondasi & Infrastruktur

### 0.1 Repository & Tooling
- [ ] Inisialisasi monorepo (atau single Next.js project)
- [ ] Setup ESLint + Prettier + Husky (pre-commit hooks)
- [ ] Setup `.env.example` dengan seluruh variabel yang dibutuhkan
- [ ] Buat `docker-compose.yml` untuk development lokal (PostgreSQL, n8n, Evolution API)
- [ ] Dokumentasi setup lokal di `README.md` (langkah-langkah lengkap)

### 0.2 Database & ORM
- [ ] Install Prisma + ZenStack
- [ ] Definisi schema `prisma/schema.prisma` (User, Warga, Laporan, LogPeringatan, LogBroadcast, Pengaturan)
- [ ] Buat seed data (`prisma/seed.ts`) — data dummy warga, admin user
- [ ] Jalankan migrasi awal (`prisma migrate dev`)
- [ ] Konfigurasi ZenStack access policies (RBAC rules)

### 0.3 Autentikasi
- [ ] Install & konfigurasi Better Auth
- [ ] Buat halaman `/login` dengan form email + password
- [ ] Implementasi middleware proteksi route `/dashboard/*`
- [ ] Setup role-based session (ADMIN, OPERATOR, VIEWER)

---

## 📡 Fase 1 — Modul Ingestion Data BMKG (Backend)

### 1.1 Workflow n8n — Polling BMKG
- [ ] Setup instance n8n (Docker container)
- [ ] Buat workflow: **Cron Trigger** → setiap 5 menit
- [ ] Node **HTTP Request**: GET ke `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`
- [ ] Node **XML to JSON** (jika format XML) atau langsung parse JSON
- [ ] Node **IF/Filter**: Cek apakah wilayah gempa termasuk "Aceh" atau radius tertentu
- [ ] Node **Deduplication**: Cek apakah gempa ini sudah pernah diproses (bandingkan dengan LogPeringatan terakhir)
- [ ] Node **Database Insert**: Simpan ke tabel `LogPeringatan` via Supabase/PostgreSQL node

### 1.2 Testing Ingestion
- [ ] Test manual dengan data BMKG real
- [ ] Verifikasi data tersimpan dengan benar di database
- [ ] Test edge case: tidak ada gempa baru, API BMKG down, format data berubah

---

## 📲 Fase 2 — Modul Broadcast Darurat (WhatsApp Gateway)

### 2.1 Setup Evolution API
- [ ] Deploy Evolution API via Docker
- [ ] Konfigurasi instance WhatsApp (scan QR Code)
- [ ] Verifikasi koneksi API (endpoint `/instance/connectionState`)
- [ ] Test kirim pesan manual via API (`POST /message/sendText`)

### 2.2 Workflow n8n — Broadcast
- [ ] Sambungkan workflow BMKG dengan modul broadcast
- [ ] Node **Database Query**: Ambil seluruh nomor `Warga` yang `aktif = true`
- [ ] Node **Loop/SplitInBatches**: Iterasi per-warga
- [ ] Node **HTTP Request**: `POST` ke Evolution API `/message/sendText` dengan template peringatan
- [ ] Node **Aggregate**: Hitung total berhasil vs gagal
- [ ] Node **Database Insert**: Simpan statistik ke tabel `LogBroadcast`

### 2.3 Template Pesan
- [ ] Desain template pesan peringatan gempa (emoji, format rapi)
- [ ] Desain template konfirmasi laporan warga
- [ ] Desain template penolakan (nomor tidak terdaftar)
- [ ] Simpan template di tabel `Pengaturan` agar bisa diedit admin

### 2.4 Testing Broadcast
- [ ] Test broadcast ke 5 nomor dummy
- [ ] Test broadcast ke 50+ nomor (load test)
- [ ] Ukur latensi end-to-end (BMKG → pesan sampai ke HP warga)

---

## 💬 Fase 3 — Modul Laporan Warga (Two-Way Communication)

### 3.1 Webhook Penerimaan Pesan
- [ ] Konfigurasi webhook di Evolution API → arahkan ke n8n endpoint
- [ ] Buat workflow n8n: **Webhook Trigger** → menerima payload pesan masuk
- [ ] Node **IF/Switch**: Deteksi apakah pesan dimulai dengan `!lapor`

### 3.2 Parsing & Penyimpanan Laporan
- [ ] Node **Code/Function**: Parse pesan `!lapor [jenis] di [lokasi]`
- [ ] Node **Database Query**: Lookup pengirim di tabel `Warga` berdasarkan `nomorWA`
- [ ] Node **IF**: Cek apakah warga terdaftar
- [ ] Node **Database Insert**: Simpan ke tabel `Laporan`
- [ ] Node **HTTP Request**: Kirim pesan konfirmasi via Evolution API

### 3.3 Command Tambahan (Opsional untuk MVP)
- [ ] Command `!status [ID]` — Cek status laporan
- [ ] Command `!info` — Informasi umum tentang Gampong Alert Hub
- [ ] Command `!bantuan` — Daftar command yang tersedia

### 3.4 Testing Laporan
- [ ] Test kirim `!lapor` dari nomor terdaftar
- [ ] Test kirim `!lapor` dari nomor TIDAK terdaftar
- [ ] Test format pesan yang salah / tidak lengkap
- [ ] Verifikasi data masuk ke database dengan benar

---

## 🖥️ Fase 4 — Dashboard Admin (Frontend)

### 4.1 Setup Project Next.js
- [ ] Inisialisasi Next.js 14+ (App Router, TypeScript)
- [ ] Install dependencies: Tailwind CSS, shadcn-ui, Zustand, TanStack Query, TanStack Table, Framer Motion
- [ ] Setup tema dark mode + design tokens (warna, tipografi, spacing)
- [ ] Buat layout utama: Sidebar + Header + Content area
- [ ] Implementasi navigasi (Beranda, Warga, Laporan, Peringatan, Pengaturan)

### 4.2 Halaman Beranda (`/dashboard`)
- [ ] Komponen **StatCard**: Kartu metrik (Total Warga, Laporan Hari Ini, Status Gateway)
- [ ] Komponen **RecentReports**: Tabel 10 laporan terkini
- [ ] Komponen **AlertTimeline**: Timeline 5 peringatan terakhir
- [ ] Komponen **ConnectionStatus**: Indikator real-time status Evolution API
- [ ] Animasi masuk (Framer Motion stagger)

### 4.3 Halaman Warga (`/dashboard/warga`)
- [ ] Tabel data warga dengan TanStack Table
- [ ] Fitur: search, filter (lorong), sort, pagination
- [ ] Modal/Drawer: Tambah warga baru
- [ ] Modal/Drawer: Edit data warga
- [ ] Konfirmasi: Hapus/nonaktifkan warga
- [ ] Bulk action: Import CSV nomor warga

### 4.4 Halaman Laporan (`/dashboard/laporan`)
- [ ] Tabel laporan warga dengan TanStack Table
- [ ] Filter: status (TERKIRIM, DIPROSES, SELESAI), jenis, tanggal
- [ ] Badge warna per status
- [ ] Detail laporan (modal/slide-over): info pelapor, pesan lengkap, timeline status
- [ ] Aksi: Ubah status, tambah catatan admin
- [ ] Aksi: Kirim notifikasi balik ke pelapor via WhatsApp

### 4.5 Halaman Peringatan (`/dashboard/peringatan`)
- [ ] Tabel riwayat peringatan BMKG yang telah di-broadcast
- [ ] Detail: data gempa lengkap, statistik broadcast (berhasil/gagal)
- [ ] Aksi: Re-broadcast manual (jika diperlukan)

### 4.6 Halaman Pengaturan (`/dashboard/pengaturan`)
- [ ] Form: Interval polling BMKG
- [ ] Form: Template pesan WhatsApp (peringatan, konfirmasi, penolakan)
- [ ] Form: Konfigurasi Evolution API (URL, API Key, Instance Name)
- [ ] Form: Manajemen user admin (invite, ubah role, hapus)

### 4.7 Glassmorphism & Polish
- [ ] Implementasi efek glassmorphism (backdrop-blur, border, gradien)
- [ ] Dark mode konsisten di seluruh halaman
- [ ] Hover effects & micro-interactions pada kartu dan tombol
- [ ] Loading skeletons untuk semua tabel dan kartu
- [ ] Toast notifications (sukses, error, info)
- [ ] Empty states (ilustrasi + pesan ketika data kosong)
- [ ] Responsive layout: tablet + desktop

---

## 🖨️ Fase 5 — Modul Generate Laporan PDF

### 5.1 Setup Puppeteer/Browserless
- [ ] Deploy Browserless container via Docker
- [ ] Buat API route Next.js: `POST /api/reports/generate`
- [ ] Desain template HTML untuk laporan PDF (header desa, tabel data, footer)

### 5.2 Jenis Laporan
- [ ] Laporan Bulanan Insiden Warga (rekap per bulan)
- [ ] Laporan Riwayat Peringatan Bencana
- [ ] Laporan Data Warga Terdaftar

### 5.3 Testing PDF
- [ ] Verifikasi output PDF: layout, data, format tanggal
- [ ] Test dengan data banyak (pagination di PDF)
- [ ] Download dari dashboard berfungsi

---

## 🧪 Fase 6 — Testing & QA

### 6.1 Unit & Integration Tests
- [ ] Unit test: parsing command `!lapor`
- [ ] Unit test: filter data BMKG
- [ ] Integration test: alur webhook → database → dashboard
- [ ] API route tests (Next.js routes)

### 6.2 End-to-End Test
- [ ] E2E: Login → Dashboard → Lihat laporan
- [ ] E2E: Kirim `!lapor` → Muncul di dashboard
- [ ] E2E: BMKG trigger → Broadcast terkirim

### 6.3 Performance & Load Test
- [ ] Load test broadcast 1.000 pesan
- [ ] Stress test dashboard dengan 10.000 rows data
- [ ] Measure & optimize Core Web Vitals

---

## 🚀 Fase 7 — Deployment & Go-Live

### 7.1 Infrastruktur Produksi
- [ ] Setup Proxmox VE di server Balai Desa
- [ ] Install Coolify sebagai container manager
- [ ] Deploy seluruh container (Next.js, PostgreSQL, n8n, Evolution API, Browserless)
- [ ] Konfigurasi reverse proxy + SSL (Coolify/Caddy)
- [ ] Setup domain/subdomain (misal: `admin.gampong.local`)

### 7.2 Monitoring & Backup
- [ ] Setup health check endpoint (`/api/health`)
- [ ] Konfigurasi auto-backup database (harian)
- [ ] Setup alert jika container down (via n8n → WhatsApp admin)
- [ ] Dokumentasi prosedur recovery

### 7.3 Go-Live Checklist
- [ ] Migrasi database produksi
- [ ] Import data warga asli
- [ ] Scan QR Code WhatsApp produksi di Evolution API
- [ ] Verifikasi seluruh workflow n8n aktif
- [ ] Sosialisasi ke warga tentang nomor WhatsApp resmi Gampong
- [ ] Training perangkat desa menggunakan dashboard
