# Product Requirements Document (PRD) - Gampong Alert Hub

## 1. Pendahuluan
**Nama Produk:** Gampong Alert Hub
**Deskripsi:** Platform cerdas tingkat Gampong (Desa) yang mengintegrasikan sistem peringatan dini bencana dan komunikasi dua arah berbasis WhatsApp untuk keamanan, tanggap darurat, dan pelaporan warga.
**Visi:** Membangun ekosistem desa yang responsif, aman, dan terkoneksi secara efisien tanpa memberatkan warga dengan instalasi aplikasi baru.

## 2. Target Audience
- **Warga Gampong:** Pengguna akhir yang menerima notifikasi darurat dan melaporkan kejadian.
- **Geuchik & Perangkat Gampong:** Pengguna administrator yang memantau *dashboard* dan mengambil keputusan berdasarkan data yang masuk.

## 3. Fitur Utama

### 3.1 Integrasi Peringatan Dini (BMKG)
- Menarik data otomatis dari BMKG.
- Memproses dan memfilter wilayah relevan (fokus Aceh).
- Mentransmisikan peringatan ke sistem *broadcast*.

### 3.2 WhatsApp Broadcast & Notifikasi
- Mengirim pesan peringatan secara serentak ke semua nomor warga yang terdaftar.
- Kustomisasi format pesan (waktu kejadian, episentrum, magnitudo, instruksi keselamatan).

### 3.3 Sistem Pelaporan Warga (Two-Way)
- *Webhook* yang mendengarkan masuknya pesan ke nomor WhatsApp resmi Gampong.
- Parsing kata kunci `!lapor`.
- Pencatatan laporan langsung ke sistem *database* dengan nomor pengirim sebagai pengenal.

### 3.4 Dashboard Manajemen (Admin)
- Menampilkan grafik dan jumlah laporan.
- Tampilan tabel riwayat gempa (yang dibroadcast).
- Tampilan tabel laporan warga terkini.
- Manajemen data kontak warga.

## 4. User Stories

**Warga:**
1. *Sebagai warga*, saya ingin menerima pesan WhatsApp segera setelah gempa bumi terdeteksi agar saya bisa mengevakuasi keluarga.
2. *Sebagai warga*, saya ingin melaporkan tiang listrik yang rubuh dengan mengirim WhatsApp ke nomor Gampong agar cepat diperbaiki.

**Admin (Geuchik/Perangkat):**
3. *Sebagai Geuchik*, saya ingin melihat seluruh daftar laporan masuk secara *real-time* di *dashboard* tanpa harus membuka *handphone*.
4. *Sebagai admin IT desa*, saya ingin menambahkan nomor WhatsApp baru ke dalam sistem jika ada warga baru, agar ia bisa mendapat *broadcast*.

## 5. Kriteria Penerimaan (Acceptance Criteria)
- Sistem harus bisa mengirimkan pesan ke minimal 10 nomor dalam hitungan kurang dari 5 detik setelah *trigger* BMKG aktif.
- Pesan masuk dengan *command* `!lapor` harus muncul di *dashboard* admin dalam waktu kurang dari 3 detik.
- *Dashboard* harus menampilkan antarmuka *responsive* yang bisa diakses dengan baik melalui laptop maupun tablet perangkat desa.
- Data warga dan laporan harus tersimpan dengan aman di dalam *database* PostgreSQL.
