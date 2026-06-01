# 💰 Analisis Biaya & Kelayakan Finansial — Gampong Alert Hub

> **Tanggal:** 1 Juni 2026  
> **Tujuan:** Menguraikan total cost of ownership, kelayakan finansial, dan justifikasi investasi untuk implementasi Gampong Alert Hub.

---

## 1. Total Cost of Ownership (TCO)

### 1.1 Biaya Setup Awal (CAPEX) — Per Gampong

| Komponen | Spesifikasi | Harga (Rp) | Keterangan |
|----------|------------|-----------|-----------|
| Mini PC / Server | Intel N100, RAM 16GB, SSD 256GB | 3.500.000 | Harga pasar mid-2026 |
| UPS (Backup Battery) | 650VA | 500.000 | Proteksi mati listrik |
| Kabel LAN + Switch | Cat6 + Switch 8-port | 300.000 | Koneksi ke router Balai Desa |
| Instalasi & Konfigurasi | Proxmox + Coolify + Docker + n8n + Evolution API | 1.500.000 | Jasa teknisi (1 hari kerja) |
| Training Perangkat Desa | 2 sesi × 3 jam | 500.000 | Materi + konsumsi |
| Nomor WhatsApp Baru | SIM Card + registrasi | 50.000 | Nomor dedicated |
| **TOTAL CAPEX** | | **Rp 6.350.000** | **One-time cost** |

### 1.2 Biaya Operasional Bulanan (OPEX) — Per Gampong

| Komponen | Biaya/Bulan (Rp) | Keterangan |
|----------|-----------------|-----------|
| Listrik tambahan server | 30.000 | Mini PC ~30W × 24/7 |
| Internet (share Balai Desa) | 0 | Sudah ada di Balai Desa |
| Maintenance & Support | 200.000 | Tier Dasar langganan |
| Domain & DNS (opsional) | 15.000 | Share antar-gampong |
| Kuota WA (jika pakai data) | 0 | Via WiFi Balai Desa |
| **TOTAL OPEX** | **Rp 245.000/bulan** | **Rp 2.940.000/tahun** |

### 1.3 TCO Tahun Pertama

```
┌─────────────────────────────────────────────────┐
│         TCO Tahun Pertama Per Gampong            │
├─────────────────────────────────────────────────┤
│                                                 │
│  CAPEX (Setup)           : Rp  6.350.000        │
│  OPEX (12 bulan)         : Rp  2.940.000        │
│  ─────────────────────────────────────          │
│  TOTAL                   : Rp  9.290.000        │
│                                                 │
│  Per bulan (amortisasi)  : Rp    774.167        │
│  Per warga/bulan (450)   : Rp      1.720        │
│                                                 │
└─────────────────────────────────────────────────┘
```

> 💡 **Kurang dari Rp 2.000 per warga per bulan** — lebih murah dari satu bungkus mie instan.

---

## 2. Sumber Pendanaan

### 2.1 Alokasi Anggaran Dana Desa (ADD)

Berdasarkan **Permendesa PDTT No. 21 Tahun 2015**, Dana Desa dapat dialokasikan untuk:

| Bidang ADD | Pos yang Relevan | Justifikasi |
|-----------|-----------------|-------------|
| **Pembangunan Desa** | Pengadaan sarana prasarana TIK | Server & perangkat keras |
| **Pemberdayaan Masyarakat** | Peningkatan kapasitas aparatur | Training dashboard |
| **Penanggulangan Bencana** | Sistem peringatan dini | Seluruh sistem GAH |
| **Keadaan Darurat** | Tanggap darurat desa | Operasional broadcast |

**Rata-rata Dana Desa per Gampong di Aceh (2025):** Rp 800 juta – Rp 1,2 miliar  
**Alokasi GAH (Rp 9,3 juta):** = **~1% dari Dana Desa** ← sangat terjangkau

### 2.2 Sumber Lain

| Sumber | Potensi (Rp) | Status | Effort |
|--------|-------------|--------|--------|
| Dana Desa (ADD) | 6–10 juta/gampong | Paling realistis | Proposal ke Musrenbang |
| CSR PLN Aceh | 20–50 juta | Sedang | Proposal CSR |
| CSR Bank Aceh | 10–30 juta | Sedang | Kemitraan |
| Hibah Kominfo (Desa Digital) | 50–100 juta | Potensial | Kompetisi/seleksi |
| BPBD Aceh | 20–50 juta | Potensial | Kolaborasi riset |
| Hackathon Prize | 5–50 juta | Aktif | Partisipasi |

---

## 3. Analisis ROI (Return on Investment)

### 3.1 Penghematan Langsung

| Kategori Penghematan | Per Bulan (Rp) | Per Tahun (Rp) |
|---------------------|---------------|----------------|
| Biaya pulsa admin untuk broadcast manual | 300.000 | 3.600.000 |
| Waktu kerja admin (broadcast + laporan manual) | 250.000 | 3.000.000 |
| Pembuatan laporan pertanggungjawaban | 200.000 | 2.400.000 |
| Biaya cetak surat edaran & pengumuman | 200.000 | 2.400.000 |
| Potensi kerugian akibat respons lambat | 500.000 | 6.000.000 |
| **TOTAL PENGHEMATAN** | **1.450.000** | **17.400.000** |

### 3.2 Kalkulasi ROI

```
ROI = (Total Penghematan - Total Biaya) / Total Biaya × 100%

Tahun 1:
ROI = (17.400.000 - 9.290.000) / 9.290.000 × 100%
ROI = 87,3%

Tahun 2 (tanpa CAPEX):
ROI = (17.400.000 - 2.940.000) / 2.940.000 × 100%
ROI = 491,8%
```

### 3.3 Break-Even Point

```
Break-Even = CAPEX / (Penghematan Bulanan - OPEX Bulanan)
           = 6.350.000 / (1.450.000 - 245.000)
           = 6.350.000 / 1.205.000
           = 5,3 bulan

✅ Break-even dalam ~5 bulan setelah implementasi
```

### 3.4 Visualisasi ROI

```
Rp (Juta)
  20 ┤
     │                                    ╱ Kumulatif Penghematan
  15 ┤                              ╱───╱
     │                        ╱───╱
  10 ┤                  ╱───╱
     │  ┌─────────╱───╱
   5 ┤  │   ╱───╱  Break-even
     │  │ ╱      (Bulan 5-6)
   0 ┤──┼────────────────────────────────
     │  │ ╲───╲
  -5 ┤  │      ╲───╲
     │  └─────────╲  Kumulatif Biaya
 -10 ┤              ╲───╲
     └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
        1  2  3  4  5  6  7  8  9  10 11 12  Bulan
```

---

## 4. Perbandingan Biaya dengan Alternatif

### 4.1 GAH vs Cloud-Based Solution

| Aspek | GAH (Self-Hosted) | Cloud-Based (Tipikal) |
|-------|-------------------|----------------------|
| Setup awal | Rp 6.350.000 | Rp 500.000 |
| Biaya bulanan | Rp 245.000 | Rp 1.500.000 – 3.000.000 |
| Biaya tahun 1 | **Rp 9.290.000** | **Rp 18.500.000 – 36.500.000** |
| Biaya tahun 2 | **Rp 2.940.000** | **Rp 18.000.000 – 36.000.000** |
| Biaya 3 tahun | **Rp 15.170.000** | **Rp 54.500.000 – 108.500.000** |
| Kontrol data | ✅ Penuh (lokal) | ❌ Di tangan vendor |
| Vendor lock-in | ❌ Tidak ada | ⚠️ Tinggi |

> 💡 Dalam 3 tahun, GAH menghemat **Rp 39–93 juta** dibanding solusi cloud tipikal.

### 4.2 GAH vs Manual (Tanpa Sistem)

| Aspek | GAH | Tanpa Sistem |
|-------|-----|-------------|
| Biaya tahunan | Rp 9.290.000 (tahun 1) | Rp 0 (langsung) |
| Biaya tersembunyi | Minimal | Rp 17.400.000/tahun (waktu, pulsa, cetak) |
| Risiko bencana | Termitigasi | Tidak termitigasi |
| Nilai nyawa yang terselamatkan | **Tak ternilai** | — |

---

## 5. Sensitivitas & Skenario

### 5.1 Analisis Sensitivitas

| Variabel | Optimistis | Base Case | Pesimistis |
|----------|-----------|-----------|-----------|
| Jumlah warga terdaftar | 400 | 250 | 100 |
| Laporan per bulan | 30 | 15 | 5 |
| Penghematan per bulan | Rp 2.000.000 | Rp 1.450.000 | Rp 800.000 |
| ROI Tahun 1 | 158% | 87% | 3% |
| Break-even | 3,6 bulan | 5,3 bulan | 11,4 bulan |

### 5.2 Skenario Terburuk

Bahkan dalam skenario **pesimistis** (100 warga, 5 laporan/bulan), sistem masih mencapai **break-even dalam 1 tahun** dan memberikan ROI positif.

Faktor kritis: **Jika sistem berhasil menyelamatkan 1 nyawa dari bencana, nilai investasi Rp 9,3 juta sudah tidak bisa diukur dengan uang.**

---

## 6. Rekomendasi Finansial

### 6.1 Untuk Pemerintah Gampong

1. **Alokasikan Rp 10 juta dari Dana Desa** untuk setup + operasional tahun pertama
2. Masukkan dalam pos **Penanggulangan Bencana** atau **Peningkatan Kapasitas TIK**
3. ROI terbukti positif dari bulan ke-6 → **investasi yang justified**

### 6.2 Untuk Investor/Sponsor

1. Total investasi untuk **pilot 10 Gampong**: Rp 63,5 juta (setup) + Rp 2,45 juta/bulan (operasional)
2. Potensi pasar Aceh: 6.517 Gampong × Rp 200.000/bulan = **Rp 1,3 miliar/bulan**
3. Social impact yang terukur + revenue stream yang jelas → **investable social enterprise**

### 6.3 Untuk Tim Hackathon

1. Gunakan data biaya ini dalam **Pitch Deck slide bisnis**
2. Highlight: **"Kurang dari Rp 2.000 per warga per bulan"** — headline yang kuat
3. Highlight: **"Break-even 5 bulan, ROI 87% tahun pertama"** — meyakinkan juri
