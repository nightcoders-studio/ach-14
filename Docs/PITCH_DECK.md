# 🎤 Pitch Deck — Gampong Alert Hub

> **Durasi Presentasi:** 5–7 Menit  
> **Format:** Slide-by-Slide Script  
> **Tanggal:** 1 Juni 2026

---

## Slide 1 — Cover

### 🚨 Gampong Alert Hub
**Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi berbasis WhatsApp untuk Gampong di Aceh**

*"Gampong Sigap, Warga Selamat."*

**Tim:** NightCoders Studio  
**Hackathon:** ACH-14

---

## Slide 2 — Masalah (The Problem)

### ❌ Masalah yang Kami Selesaikan

> *"Ketika gempa 5.6 SR mengguncang Aceh pada pukul 2 pagi, berapa banyak warga desa yang mendapat peringatan tepat waktu?"*

**Fakta Lapangan:**

| Masalah | Dampak |
|---------|--------|
| 🕐 Informasi bencana terlambat sampai ke warga desa | Korban jiwa & kepanikan tidak terarah |
| 📱 Grup WhatsApp desa penuh hoax & misinformasi | Warga tidak tahu mana info yang valid |
| 📝 Laporan warga (tiang rubuh, kebakaran) tidak tercatat | Tidak ada tindak lanjut, tidak ada akuntabilitas |
| 💸 Aplikasi smart village yang ada mahal & rumit | Warga malas download, desa tidak mampu bayar cloud |

**Insight Kunci:** 99% warga sudah punya WhatsApp. Kita tidak perlu memaksa mereka mengunduh aplikasi baru.

---

## Slide 3 — Solusi (The Solution)

### ✅ Gampong Alert Hub

Sistem otomatis yang menghubungkan **data bencana resmi (BMKG)** dengan **WhatsApp warga** — tanpa warga perlu mengunduh apa pun.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  🏛️ BMKG API  │────▶│  ⚙️ n8n Engine │────▶│  📲 WhatsApp  │
│  (Data Resmi) │     │  (Otomatis)  │     │  (Warga)     │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴──────┐
                     │  🖥️ Dashboard │
                     │  (Geuchik)   │
                     └─────────────┘
```

**3 Pilar Solusi:**
1. **🌍 Auto-Broadcast Bencana** — Data BMKG → WhatsApp warga dalam < 10 detik
2. **💬 Two-Way Reporting** — Warga kirim `!lapor` via WA → masuk database
3. **📊 Dashboard Eksekutif** — Geuchik pantau semua data real-time

---

## Slide 4 — Demo / Cara Kerja

### 🎬 Cara Kerja (Live Demo)

#### Skenario 1: Peringatan Dini Gempa
1. BMKG merilis data gempa 5.6 SR di wilayah Aceh
2. **n8n** mendeteksi otomatis (polling setiap 5 menit)
3. Sistem mengirim broadcast ke **seluruh warga terdaftar** via WhatsApp:

```
🚨 PERINGATAN DINI GEMPA 🚨

Telah terjadi gempa bumi!
Kekuatan: 5.6 SR
Lokasi: 12km Barat Daya Banda Aceh
Waktu: 02:15 WIB

⚠️ Tetap tenang, hindari bangunan tinggi,
dan ikuti arahan perangkat gampong.

— Gampong Alert Hub 🛡️
```

#### Skenario 2: Laporan Warga
1. Warga melihat tiang listrik roboh
2. Kirim WA: `!lapor Tiang listrik roboh di Lorong C`
3. Sistem membalas: `✅ Laporan diterima! ID: #LP-0012`
4. Laporan langsung muncul di **Dashboard Geuchik**

#### Skenario 3: Dashboard Admin
- Geuchik buka dashboard → lihat kartu metrik → tabel laporan → ambil keputusan

---

## Slide 5 — Teknologi

### 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    GAMPONG ALERT HUB                     │
├─────────────────┬─────────────────┬─────────────────────┤
│   🖼️ Frontend    │   🔧 Backend     │   📡 Gateway        │
├─────────────────┼─────────────────┼─────────────────────┤
│ Next.js 14      │ PostgreSQL      │ Evolution API       │
│ Tailwind CSS    │ Prisma+ZenStack │ n8n Workflows       │
│ shadcn/ui       │ Better Auth     │ BMKG Open Data      │
│ TanStack Query  │ Puppeteer       │                     │
│ Framer Motion   │                 │                     │
├─────────────────┴─────────────────┴─────────────────────┤
│   🏗️ Infrastructure: Docker + Coolify + Proxmox VE      │
│   📦 Self-Hosted Edge Computing (Server Balai Desa)      │
└─────────────────────────────────────────────────────────┘
```

**Mengapa Stack Ini?**
- **Self-hosted** → Biaya bulanan Rp 0 (setelah setup awal)
- **Open-source** → Tidak ada vendor lock-in
- **Modular** → Setiap komponen bisa diganti tanpa merombak total

---

## Slide 6 — Keunggulan Kompetitif

### 🏆 Mengapa Kami Berbeda?

| Aspek | Aplikasi Smart Village Lain | Gampong Alert Hub |
|-------|----------------------------|-------------------|
| **Akses Warga** | Download app baru | WhatsApp ✅ |
| **Biaya Bulanan** | Rp 500rb–2jt/bulan (cloud) | Rp 0 (self-hosted) ✅ |
| **Data Bencana** | Manual/input petugas | Otomatis dari BMKG ✅ |
| **Deploy** | Setup rumit, butuh DevOps | Docker + Coolify (1-click) ✅ |
| **Bahasa** | Indonesia formal | Bisa adaptasi bahasa Aceh ✅ |

**USP:** *Zero-Install, Zero-Cloud-Cost, 100% Otomatis*

---

## Slide 7 — Model Bisnis

### 💰 Business Model

**Model:** SaaS B2G (Business to Government) — Berlangganan per Gampong

| Tier | Harga/bulan | Fitur |
|------|-------------|-------|
| 🟢 Dasar | Rp 200.000 | Broadcast BMKG + Laporan + Dashboard |
| 🟡 Pro | Rp 500.000 | + Peta GIS + PDF Report + Multi-admin |
| 🔴 Enterprise | Rp 1.000.000 | + AI Parsing + Eskalasi + Analytics |

**Sumber Dana Potensial:**
- ✅ Anggaran Dana Desa (ADD) — pos Peningkatan TIK
- ✅ CSR Perusahaan (PLN, Bank Aceh)
- ✅ Hibah Kominfo (Program Desa Digital)

**Potensi Pasar:** 6.517 Gampong di Aceh × Rp 200.000/bulan = **Rp 1,3 Miliar/bulan**

---

## Slide 8 — Impact & Validasi

### 🌟 Dampak Sosial

```
SEBELUM                          SESUDAH
──────                          ───────
❌ Gempa → warga tahu 30 menit  ✅ Gempa → warga tahu < 10 DETIK
   kemudian dari grup WA

❌ Laporan warga hilang di       ✅ Laporan tercatat, terlacak,
   tengah chat grup                tereskalasi otomatis

❌ Geuchik tidak punya data      ✅ Dashboard real-time untuk
   untuk laporan Dana Desa         akuntabilitas Dana Desa

❌ Sistem digital mahal &        ✅ Self-hosted, biaya tetap,
   membebani anggaran desa         dikelola mandiri
```

**Target MVP:**
- 1 Gampong pilot → 50 warga terdaftar → 10 laporan/bulan
- Waktu broadcast < 10 detik
- Uptime ≥ 95%

---

## Slide 9 — Roadmap

### 🗺️ Rencana Pengembangan

```
    Juni-Juli 2026          Agustus 2026         September 2026
   ┌─────────────┐      ┌──────────────┐      ┌──────────────┐
   │   MVP       │      │   PILOT      │      │   SCALE      │
   │             │      │              │      │              │
   │ • Broadcast │─────▶│ • 1 Gampong  │─────▶│ • 10 Gampong │
   │ • Laporan   │      │ • 50 warga   │      │ • Peta GIS   │
   │ • Dashboard │      │ • Feedback   │      │ • AI Parsing │
   └─────────────┘      └──────────────┘      └──────────────┘

    Oktober 2026+
   ┌──────────────┐
   │   EXPAND     │
   │              │
   │ • 1 Kecamatan│
   │ • Multi-tenant│
   │ • Mobile App │
   └──────────────┘
```

---

## Slide 10 — Tim

### 👥 Tim NightCoders Studio

| Peran | Tanggung Jawab |
|-------|---------------|
| **Project Lead** | Arsitektur sistem, koordinasi, presentasi |
| **Full-Stack Developer** | Next.js dashboard, API, database |
| **DevOps Engineer** | Docker, Coolify, Proxmox, n8n workflows |
| **UI/UX Designer** | Desain dashboard, user flow, branding |

---

## Slide 11 — Penutup & Call to Action

### 🚀 Apa yang Kami Butuhkan

> *"Dengan dukungan Anda, kami bisa mengubah cara 6.517 Gampong di Aceh menghadapi bencana — menggunakan teknologi yang sudah ada di genggaman setiap warga."*

**Yang Kami Minta:**
1. 🏆 Dukungan untuk melanjutkan ke tahap pilot
2. 🤝 Koneksi dengan Pemerintah Gampong untuk uji coba
3. 💡 Feedback untuk menyempurnakan produk

---

**Terima Kasih! 🙏**

*Gampong Alert Hub — Gampong Sigap, Warga Selamat.*

---

## 📎 Lampiran: Tips Presentasi

- **Pembukaan:** Mulai dengan cerita/skenario nyata (gempa tengah malam)
- **Demo Live:** Siapkan video backup jika live demo gagal
- **Closing:** Akhiri dengan angka dampak (6.517 Gampong, Rp 0 cloud cost)
- **Q&A Prep:** Siapkan jawaban untuk: "Bagaimana jika internet mati?", "Bagaimana dengan privasi data?", "Apa bedanya dengan Qlue/Lapor?"
