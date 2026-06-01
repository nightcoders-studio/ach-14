# UI/UX & User Flow - Gampong Alert Hub

## 1. Prinsip Desain
- **Warga:** *Zero UI*. UX sepenuhnya berbasis percakapan (*Conversational Interface*) via WhatsApp.
- **Geuchik / Admin:** *Glassmorphism*, Bersih, Informatif, Responsif. Warna yang digunakan harus kontras (misal: *Dark Mode* dengan aksen merah muda/oranye untuk peringatan).

## 2. User Flow: Warga (Conversational)

### 2.1 Menerima Peringatan
1. Warga sedang beraktivitas.
2. Masuk notifikasi WhatsApp dari "Gampong Alert Hub".
3. **Pesan:**
   ```
   🚨 PERINGATAN DINI GEMPA 🚨
   
   Telah terjadi gempa bumi!
   Kekuatan: 5.6 SR
   Lokasi: 12km Barat Daya Banda Aceh
   Waktu: 12:45 WIB
   
   ⚠️ Tetap tenang, hindari bangunan tinggi, dan ikuti arahan dari perangkat gampong.
   ```
4. Warga membaca pesan dan mengambil tindakan.

### 2.2 Membuat Laporan
1. Warga melihat kejadian darurat.
2. Warga membuka nomor kontak "Gampong Alert Hub".
3. Warga mengetik: `!lapor Terjadi kebakaran alang-alang di dekat kuburan lorong B`
4. Bot secara otomatis merespons:
   ```
   ✅ Laporan Anda telah diterima oleh perangkat Gampong dan sedang ditindaklanjuti. Terima kasih atas kepedulian Anda.
   (ID Laporan: #LP-0012)
   ```

## 3. User Flow: Geuchik/Admin (Dashboard UI)

### 3.1 Pemantauan Harian
1. Admin membuka URL Dashboard (misal: `admin.gampong.local`).
2. Masuk ke halaman **Beranda (Overview)**.
3. Terdapat kartu ringkasan (*Cards*):
   - Total Warga Terdaftar: 450
   - Laporan Hari Ini: 2
   - Status API WA: 🟢 Connected
4. Di bagian bawah terdapat Tabel Laporan Terbaru yang bisa di-klik untuk melihat rinciannya.

### 3.2 Menanggapi Laporan
1. Di tabel Laporan Terbaru, admin melihat "Kebakaran alang-alang...".
2. Admin mengklik baris tersebut.
3. Terbuka modal berisi detail: Nama Pelapor, Nomor WA Pelapor, Waktu.
4. Admin menekan tombol aksi "Ubah Status: DIPROSES" dan "Kirim Notif ke Damkar".

### 3.3 Wireframe Tampilan Dashboard (Mental Model)

```text
+-------------------------------------------------------------+
|  [Logo GAH]   Beranda   Warga   Laporan   Pengaturan        |
+-------------------------------------------------------------+
|                                                             |
|  RINGKASAN STATUS                                           |
|  +--------------+  +--------------+  +-------------------+  |
|  | Warga Aktif  |  | Laporan Baru |  | WhatsApp Gateway  |  |
|  |     450      |  |      2       |  |    🟢 CONNECTED    |  |
|  +--------------+  +--------------+  +-------------------+  |
|                                                             |
|  LAPORAN TERKINI                                            |
|  ---------------------------------------------------------  |
|  Waktu       | Pelapor    | Pesan                | Status   |
|  ---------------------------------------------------------  |
|  14:00 WIB   | M. Ali     | !lapor Kebakaran...  | MASUK    |
|  10:15 WIB   | Siti       | !lapor Listrik mati  | SELESAI  |
|  ---------------------------------------------------------  |
|                                                             |
+-------------------------------------------------------------+
```
