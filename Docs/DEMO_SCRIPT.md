# 🎬 Demo Script — Gampong Alert Hub

> **Durasi Demo:** 3–5 Menit  
> **Tanggal:** 1 Juni 2026  
> **Catatan:** Siapkan video backup (screen recording) untuk setiap skenario jika live demo gagal.

---

## 📋 Checklist Persiapan Demo

### Perangkat & Akses
- [ ] Laptop presenter terhubung ke proyektor/screen share
- [ ] Browser terbuka di halaman Dashboard (tab 1)
- [ ] n8n Workflow editor terbuka (tab 2)
- [ ] HP/emulator WhatsApp siap untuk demo kirim pesan (bisa pakai HP kedua)
- [ ] Koneksi internet stabil (siapkan tethering backup)

### Data & Konfigurasi
- [ ] Seed data: minimal 10 warga dummy terdaftar
- [ ] Evolution API aktif dan terkoneksi (status: 🟢)
- [ ] Workflow n8n: BMKG polling aktif
- [ ] Workflow n8n: Webhook laporan warga aktif
- [ ] Nomor HP demo sudah terdaftar di tabel Warga

### Backup
- [ ] Video recording Skenario 1 (broadcast bencana) — durasi 30 detik
- [ ] Video recording Skenario 2 (laporan warga) — durasi 30 detik
- [ ] Video recording Skenario 3 (dashboard walkthrough) — durasi 60 detik
- [ ] Screenshot setiap halaman dashboard sebagai fallback

---

## 🎯 Skenario 1: Auto-Broadcast Peringatan Dini

**Durasi:** ~90 detik  
**Tujuan:** Menunjukkan alur otomatis dari data BMKG hingga pesan sampai di HP warga.

### Narasi & Aksi

> **Presenter:** *"Bayangkan sekarang pukul 2 pagi. Gempa bumi terjadi di pesisir Aceh. Warga di gampong masih tertidur. Bagaimana sistem kami bekerja?"*

**Langkah 1 — Tunjukkan Workflow n8n**
1. Buka tab n8n
2. Tunjukkan workflow: `BMKG Earthquake Monitor`
3. Highlight node-node:
   - ⏰ Cron Trigger (setiap 5 menit)
   - 🌐 HTTP Request (ke BMKG API)
   - 🔍 Filter (wilayah Aceh)
   - 📊 Database (simpan LogPeringatan)
   - 📲 Evolution API (broadcast)

> **Presenter:** *"Setiap 5 menit, n8n secara otomatis menarik data dari BMKG. Jika terdeteksi gempa di wilayah Aceh..."*

**Langkah 2 — Trigger Manual (atau tunggu cron)**
1. Klik **"Execute Workflow"** secara manual
2. Tunjukkan data yang masuk dari BMKG
3. Tunjukkan proses filter dan formatting pesan

> **Presenter:** *"...sistem langsung memformat pesan peringatan dan mengirimkan broadcast ke seluruh warga terdaftar."*

**Langkah 3 — Tunjukkan HP Penerima**
1. Angkat HP demo / tampilkan emulator
2. Tunjukkan notifikasi WhatsApp yang masuk:

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

> **Presenter:** *"Dalam waktu kurang dari 10 detik, seluruh warga yang terdaftar sudah menerima peringatan ini. Tidak perlu buka aplikasi baru — langsung di WhatsApp."*

**⏱️ Transisi:** *"Tapi sistem kami bukan hanya satu arah. Warga juga bisa melapor balik..."*

---

## 🎯 Skenario 2: Laporan Warga (Two-Way Communication)

**Durasi:** ~60 detik  
**Tujuan:** Menunjukkan bahwa warga bisa melapor insiden melalui WhatsApp dan langsung tercatat di sistem.

### Narasi & Aksi

> **Presenter:** *"Sekarang, seorang warga melihat tiang listrik roboh di Lorong C. Dia cukup membuka WhatsApp dan mengetik..."*

**Langkah 1 — Kirim Pesan dari HP Demo**
1. Buka WhatsApp di HP demo
2. Buka kontak "Gampong Alert Hub"
3. Ketik: `!lapor Tiang listrik roboh di Lorong C, membahayakan pejalan kaki`
4. Kirim

**Langkah 2 — Tunjukkan Balasan Otomatis**
1. Tunggu 2-3 detik
2. Sistem otomatis membalas:

```
✅ Laporan Anda telah diterima oleh perangkat Gampong
dan sedang ditindaklanjuti.

📋 ID Laporan: #LP-0013
📅 Waktu: 01 Jun 2026, 14:30 WIB
📍 Jenis: LISTRIK

Terima kasih atas kepedulian Anda!
— Gampong Alert Hub 🛡️
```

> **Presenter:** *"Warga langsung mendapat konfirmasi bahwa laporan diterima. Sekarang mari kita lihat dari sisi admin..."*

**Langkah 3 — Buka Dashboard**
1. Pindah ke tab browser Dashboard
2. Tunjukkan bahwa laporan baru muncul di tabel "Laporan Terkini"
3. Highlight: waktu, nama pelapor, pesan, status "TERKIRIM"

> **Presenter:** *"Dalam hitungan detik, laporan sudah muncul di dashboard Geuchik. Semuanya tercatat, terlacak, dan siap ditindaklanjuti."*

---

## 🎯 Skenario 3: Dashboard Admin Walkthrough

**Durasi:** ~90 detik  
**Tujuan:** Menunjukkan fitur-fitur dashboard yang digunakan oleh Geuchik dan perangkat desa.

### Narasi & Aksi

> **Presenter:** *"Sekarang mari kita lihat dashboard yang digunakan oleh Geuchik untuk memantau gampongnya."*

**Langkah 1 — Halaman Beranda**
1. Tunjukkan kartu-kartu metrik:
   - Total Warga Terdaftar: **450**
   - Laporan Hari Ini: **3**
   - Status WhatsApp Gateway: **🟢 Connected**
2. Scroll ke tabel laporan terkini
3. Scroll ke timeline peringatan

> **Presenter:** *"Di beranda, Geuchik langsung bisa melihat ringkasan: berapa warga, berapa laporan hari ini, dan apakah sistem WhatsApp aktif."*

**Langkah 2 — Halaman Laporan**
1. Klik navigasi "Laporan"
2. Tunjukkan tabel lengkap dengan filter
3. Klik salah satu laporan → buka detail modal
4. Ubah status dari "TERKIRIM" → "DIPROSES"
5. Tambahkan catatan admin: "Sudah dikoordinasikan dengan PLN"

> **Presenter:** *"Admin bisa melihat detail setiap laporan, mengubah status, dan menambahkan catatan. Semua perubahan tercatat — ini penting untuk akuntabilitas Dana Desa."*

**Langkah 3 — Halaman Warga**
1. Klik navigasi "Warga"
2. Tunjukkan tabel data warga (nama, nomor WA, lorong)
3. Demonstrasi search/filter
4. (Opsional) Tambah warga baru

> **Presenter:** *"Data warga dikelola di sini. Admin bisa menambah, mengedit, atau menonaktifkan warga dari daftar broadcast."*

**Langkah 4 — Highlight Desain**
1. Tunjukkan efek glassmorphism
2. Hover pada kartu untuk micro-animation
3. Toggle dark mode (jika ada)

> **Presenter:** *"Dashboard dirancang dengan standar UI modern — glassmorphism, animasi halus, dan responsive. Karena perangkat desa juga layak mendapatkan tools yang premium."*

---

## 🎯 Skenario Bonus: PDF Report (Jika Waktu Cukup)

**Durasi:** ~30 detik

1. Klik tombol "Download Laporan PDF"
2. Tunjukkan file PDF yang ter-generate
3. Buka PDF — highlight header desa, tabel data, footer

> **Presenter:** *"Untuk kebutuhan pertanggungjawaban, admin bisa generate laporan PDF otomatis. Tidak perlu buat manual di Word — satu klik, selesai."*

---

## 🛑 Troubleshooting Live Demo

| Masalah | Solusi Cepat |
|---------|-------------|
| WhatsApp tidak terkirim | Putar video backup Skenario 1/2 |
| n8n workflow error | Tunjukkan screenshot hasil sukses sebelumnya |
| Dashboard loading lambat | Buka tab yang sudah pre-loaded |
| Internet mati total | Gunakan video recording offline |
| Evolution API disconnect | Tunjukkan screenshot status connected + jelaskan secara verbal |

---

## 💬 Antisipasi Pertanyaan Juri

| Pertanyaan | Jawaban Singkat |
|------------|----------------|
| *"Bagaimana jika internet di desa mati?"* | Sistem self-hosted di LAN lokal. Laporan warga ke server tetap jalan via jaringan lokal. Pesan broadcast akan di-queue dan dikirim saat internet kembali. |
| *"Apa bedanya dengan aplikasi Lapor! atau Qlue?"* | Lapor/Qlue butuh install app baru. Kami 100% via WhatsApp — zero learning curve. Plus, kami fokus bencana alam (auto-BMKG), bukan hanya aduan umum. |
| *"WhatsApp bisa memblokir nomor yang spam broadcast."* | Kami menggunakan Evolution API yang mensimulasikan pengiriman organik. Long-term, kami akan migrasi ke WhatsApp Business API resmi. |
| *"Data warga aman?"* | Data tersimpan di server lokal (edge), bukan cloud publik. Akses dashboard dilindungi autentikasi + RBAC. |
| *"Berapa biaya setup untuk 1 desa?"* | Hardware: ~Rp 3-5 juta (mini PC). Software: Rp 0 (open-source). Maintenance: Rp 200rb/bulan. Bisa dianggarkan dari Dana Desa. |
| *"Sudah dicoba di desa nyata?"* | Ini masih MVP/prototipe. Rencana pilot di 1 gampong dalam 2 bulan ke depan setelah hackathon. |
