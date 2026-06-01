# 📖 User Manual — Gampong Alert Hub

> **Versi:** 1.0  
> **Tanggal:** 1 Juni 2026  
> **Audience:** Perangkat Desa (Geuchik, Sekdes, Operator) & Warga Gampong

---

## Daftar Isi

1. [Panduan untuk Warga](#1-panduan-untuk-warga)
2. [Panduan untuk Admin (Perangkat Desa)](#2-panduan-untuk-admin-perangkat-desa)
3. [FAQ (Pertanyaan Umum)](#3-faq-pertanyaan-umum)

---

## 1. Panduan untuk Warga

### 1.1 Apa itu Gampong Alert Hub?

Gampong Alert Hub adalah sistem peringatan dini dan pelaporan warga yang bekerja sepenuhnya melalui **WhatsApp**. Anda **tidak perlu mengunduh aplikasi baru**. Cukup simpan nomor WhatsApp resmi Gampong, dan Anda akan:

- ✅ Menerima peringatan bencana secara otomatis
- ✅ Bisa melaporkan insiden/masalah di lingkungan
- ✅ Mendapat konfirmasi & update status laporan

### 1.2 Cara Mendaftar

1. Hubungi perangkat desa (Geuchik/Kepala Lorong) Anda
2. Berikan **nama lengkap** dan **nomor WhatsApp aktif**
3. Perangkat desa akan memasukkan data Anda ke sistem
4. Simpan nomor WhatsApp resmi Gampong di kontak HP Anda:
   - Nama: **Gampong Alert Hub**
   - Nomor: *(akan diberikan oleh perangkat desa)*
5. Selesai! Anda akan otomatis menerima broadcast peringatan

### 1.3 Menerima Peringatan Bencana

Ketika terjadi gempa bumi atau bencana di wilayah Aceh, Anda akan menerima pesan WhatsApp otomatis seperti ini:

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

**Yang harus Anda lakukan:**
- 📖 Baca pesan dengan saksama
- 🏃 Ikuti instruksi keselamatan yang diberikan
- 📢 Beritahu anggota keluarga dan tetangga
- ❌ Jangan sebarkan informasi yang belum terverifikasi

### 1.4 Cara Membuat Laporan

Jika Anda melihat kejadian darurat atau masalah infrastruktur di lingkungan, kirim pesan dengan format:

```
!lapor [Deskripsi Kejadian] di [Lokasi]
```

**Contoh:**
| Anda Ketik | Yang Terjadi |
|-----------|-------------|
| `!lapor Tiang listrik roboh di Lorong C` | Laporan LISTRIK, lokasi Lorong C |
| `!lapor Kebakaran lahan di belakang masjid` | Laporan KEBAKARAN, lokasi belakang masjid |
| `!lapor Jalan tergenang banjir di simpang pasar` | Laporan BANJIR, lokasi simpang pasar |
| `!lapor Ada pencurian di rumah kosong Lorong A` | Laporan KEAMANAN, lokasi Lorong A |

**Setelah mengirim, Anda akan mendapat balasan otomatis:**

```
✅ Laporan Anda telah diterima oleh perangkat Gampong
dan sedang ditindaklanjuti.

📋 ID Laporan: #LP-0013
📅 Waktu: 01 Jun 2026, 14:30 WIB
📍 Jenis: LISTRIK

Terima kasih atas kepedulian Anda!
— Gampong Alert Hub 🛡️
```

### 1.5 Command WhatsApp Lainnya

| Command | Fungsi | Contoh |
|---------|--------|--------|
| `!lapor [pesan]` | Buat laporan baru | `!lapor Lampu jalan mati di Lorong B` |
| `!status [ID]` | Cek status laporan | `!status LP-0013` |
| `!info` | Informasi tentang sistem | `!info` |
| `!bantuan` | Daftar command tersedia | `!bantuan` |

### 1.6 Hal yang Perlu Diperhatikan

- ⚠️ **Jangan kirim hoax atau laporan palsu** — penyalahgunaan akan mengakibatkan nomor Anda diblokir dari sistem
- 📍 **Sertakan lokasi yang jelas** — semakin detail, semakin cepat ditindaklanjuti
- 📱 **Pastikan nomor WA aktif** — jika ganti nomor, hubungi perangkat desa untuk update
- 🔇 **Jangan reply pesan broadcast** — pesan broadcast tidak bisa dibalas, gunakan command `!lapor` untuk melaporkan sesuatu

---

## 2. Panduan untuk Admin (Perangkat Desa)

### 2.1 Login ke Dashboard

1. Buka browser (Chrome/Firefox/Edge) di laptop/tablet
2. Akses URL dashboard: `http://admin.gampong.local` *(atau URL yang diberikan tim IT)*
3. Masukkan **Email** dan **Password** yang telah diberikan
4. Klik **"Masuk"**

> **💡 Tips:** Bookmark halaman dashboard agar mudah diakses di kemudian hari.

### 2.2 Memahami Halaman Beranda

Setelah login, Anda akan melihat halaman **Beranda** dengan informasi berikut:

#### Kartu Ringkasan (Bagian Atas)

| Kartu | Arti | Keterangan |
|-------|------|-----------|
| **Warga Aktif** | Jumlah warga yang terdaftar di sistem | Angka ini bertambah saat Anda menambahkan warga baru |
| **Laporan Hari Ini** | Jumlah laporan yang masuk hari ini | Reset setiap tengah malam |
| **WhatsApp Gateway** | Status koneksi WhatsApp | 🟢 Connected = Normal, 🔴 Disconnected = Perlu dicek |

#### Tabel Laporan Terkini (Bagian Bawah)
- Menampilkan 10 laporan terakhir
- Kolom: Waktu, Pelapor, Pesan, Status
- Klik baris untuk melihat detail

### 2.3 Mengelola Data Warga

**Navigasi:** Klik menu **"Warga"** di sidebar

#### Menambah Warga Baru
1. Klik tombol **"+ Tambah Warga"**
2. Isi form:
   - **Nama Lengkap:** Nama warga
   - **Nomor WhatsApp:** Format `628xxxxxxxxxx` (tanpa tanda +)
   - **Lorong/Dusun:** Pilih lorong tempat tinggal
   - **Alamat:** Alamat lengkap (opsional)
3. Klik **"Simpan"**
4. Warga akan otomatis masuk ke daftar broadcast

#### Mengedit Data Warga
1. Cari warga menggunakan kotak pencarian
2. Klik ikon **✏️ Edit** pada baris warga
3. Ubah data yang diperlukan
4. Klik **"Simpan Perubahan"**

#### Menonaktifkan Warga
1. Klik ikon **🚫** pada baris warga
2. Konfirmasi penonaktifan
3. Warga yang dinonaktifkan **tidak akan menerima broadcast** lagi tetapi datanya tetap tersimpan

#### Import Massal (CSV)
1. Klik tombol **"Import CSV"**
2. Pilih file CSV dengan format:
   ```
   nama,nomorWA,lorong
   Ahmad Rizki,6281234567890,Lorong A
   Siti Aminah,6281234567891,Lorong B
   ```
3. Preview data → Klik **"Import"**

### 2.4 Mengelola Laporan Warga

**Navigasi:** Klik menu **"Laporan"** di sidebar

#### Melihat Daftar Laporan
- Gunakan **filter** untuk menyaring berdasarkan:
  - Status: TERKIRIM / DIPROSES / SELESAI / DITOLAK
  - Jenis: KEBAKARAN / LISTRIK / KEAMANAN / BENCANA / LAINNYA
  - Tanggal: Range tanggal tertentu

#### Menindaklanjuti Laporan
1. Klik pada baris laporan untuk membuka **detail**
2. Lihat informasi lengkap:
   - Nama & nomor pelapor
   - Waktu laporan
   - Pesan lengkap
   - Lokasi
3. Ubah status:
   - **TERKIRIM → DIPROSES:** Klik tombol "Proses" (menandakan laporan sedang ditindaklanjuti)
   - **DIPROSES → SELESAI:** Klik tombol "Selesai" (menandakan laporan sudah ditangani)
   - **→ DITOLAK:** Klik tombol "Tolak" (jika laporan tidak valid)
4. Tambahkan **Catatan Admin** (misal: "Sudah koordinasi dengan PLN, teknisi datang besok")
5. Klik **"Simpan"**

#### Mengirim Notifikasi ke Pelapor
1. Di halaman detail laporan, klik **"Kirim Update ke Pelapor"**
2. Tulis pesan custom, atau gunakan template:
   - *"Laporan Anda sedang diproses oleh perangkat desa."*
   - *"Laporan Anda telah ditindaklanjuti. Terima kasih."*
3. Klik **"Kirim"** → pesan terkirim via WhatsApp ke pelapor

### 2.5 Melihat Riwayat Peringatan

**Navigasi:** Klik menu **"Peringatan"** di sidebar

- Melihat daftar peringatan BMKG yang telah di-broadcast
- Detail setiap peringatan: magnitudo, lokasi, waktu, data mentah
- Statistik broadcast: berapa pesan terkirim vs gagal
- Aksi **Re-Broadcast:** Jika perlu mengirim ulang peringatan

### 2.6 Pengaturan Sistem

**Navigasi:** Klik menu **"Pengaturan"** di sidebar  
**Akses:** Hanya ADMIN

| Pengaturan | Fungsi |
|-----------|--------|
| **Interval Polling BMKG** | Seberapa sering sistem mengecek data gempa (default: 5 menit) |
| **Template Pesan** | Edit format pesan peringatan, konfirmasi laporan, dll |
| **Konfigurasi WhatsApp** | URL & API Key Evolution API |
| **Manajemen User** | Tambah/hapus akun admin, ubah role |

### 2.7 Mengunduh Laporan PDF

1. Buka halaman **Laporan** atau **Peringatan**
2. Klik tombol **"📄 Download PDF"**
3. Pilih periode (bulan/tanggal)
4. File PDF akan otomatis ter-download
5. Gunakan untuk laporan pertanggungjawaban Dana Desa

---

## 3. FAQ (Pertanyaan Umum)

### Untuk Warga

**Q: Apakah saya perlu mengunduh aplikasi?**  
A: Tidak! Semua berjalan melalui WhatsApp yang sudah ada di HP Anda.

**Q: Apakah data saya aman?**  
A: Ya. Data Anda disimpan di server lokal Balai Desa, bukan di cloud publik. Hanya perangkat desa yang bisa mengakses data.

**Q: Saya ganti nomor HP, bagaimana?**  
A: Hubungi perangkat desa untuk memperbarui nomor WhatsApp Anda di sistem.

**Q: Kenapa saya tidak menerima peringatan?**  
A: Kemungkinan penyebab:
- Nomor Anda belum terdaftar → hubungi perangkat desa
- Nomor WhatsApp Anda sudah tidak aktif
- Anda memblokir nomor Gampong Alert Hub

**Q: Berapa biaya untuk warga?**  
A: Gratis. Tidak ada biaya untuk menerima peringatan atau membuat laporan.

### Untuk Admin

**Q: WhatsApp Gateway menunjukkan 🔴 Disconnected, apa yang harus dilakukan?**  
A: Langkah-langkah:
1. Buka Evolution API admin panel
2. Cek apakah sesi WhatsApp masih aktif
3. Jika perlu, scan ulang QR Code
4. Hubungi tim IT jika masalah berlanjut

**Q: Bagaimana jika server mati?**  
A: Hubungi tim IT support. Database memiliki backup harian. Setelah server restart, semua layanan akan berjalan otomatis.

**Q: Bisa mengirim broadcast manual (bukan dari BMKG)?**  
A: Ya, fitur ini tersedia di halaman Pengaturan > Broadcast Manual. Anda bisa mengirim pengumuman desa, info vaksinasi, dll.

**Q: Berapa kapasitas maksimal warga?**  
A: Sistem dirancang untuk menangani hingga 1.000 warga per gampong. Untuk skala lebih besar, hubungi tim teknis.

---

## 📞 Kontak Support

| Jenis | Kontak |
|-------|--------|
| **Masalah Teknis** | Tim IT NightCoders — *(nomor/email)* |
| **Pertanyaan Umum** | Perangkat Desa / Kepala Lorong |
| **Darurat Sistem** | WhatsApp Admin Group |
