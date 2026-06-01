# ⚖️ Legal, Privasi & Kepatuhan — Gampong Alert Hub

> **Tanggal:** 1 Juni 2026  
> **Tujuan:** Memastikan Gampong Alert Hub beroperasi sesuai regulasi hukum Indonesia dan praktik terbaik perlindungan data.

---

## 1. Kerangka Regulasi yang Berlaku

### 1.1 Undang-Undang dan Peraturan

| Regulasi | Relevansi | Status Kepatuhan |
|----------|-----------|-----------------|
| **UU No. 27/2022 — Pelindungan Data Pribadi (UU PDP)** | Pengumpulan & penyimpanan nomor WA warga | ⚠️ Perlu implementasi |
| **UU No. 11/2008 jo. UU No. 19/2016 — ITE** | Penyebaran informasi elektronik | ✅ Konten dari sumber resmi (BMKG) |
| **UU No. 24/2007 — Penanggulangan Bencana** | Sistem peringatan dini | ✅ Mendukung amanat UU |
| **PP No. 71/2019 — Penyelenggaraan Sistem Elektronik** | Registrasi sistem elektronik | ⚠️ Perlu registrasi |
| **Permendesa PDTT No. 21/2015** | Penggunaan Dana Desa | ✅ Dapat dialokasikan |
| **Peraturan BMKG** | Penggunaan data terbuka BMKG | ✅ Open Data, bebas digunakan |
| **Terms of Service WhatsApp** | Penggunaan WhatsApp untuk broadcast | ⚠️ Gunakan WhatsApp Business API untuk skala besar |

### 1.2 Risiko Hukum

| Risiko | Probabilitas | Dampak | Mitigasi |
|--------|-------------|--------|----------|
| Pelanggaran UU PDP (data warga) | Sedang | Tinggi | Implementasi consent, minimisasi data, enkripsi |
| Pemblokiran nomor WA oleh Meta | Sedang | Tinggi | Migrasi ke WhatsApp Business API resmi |
| Penyebaran informasi keliru | Rendah | Tinggi | Data 100% dari sumber resmi (BMKG) |
| Tuntutan warga atas privasi | Rendah | Sedang | Kebijakan privasi transparan, opt-out tersedia |

---

## 2. Kepatuhan UU Pelindungan Data Pribadi (UU PDP)

### 2.1 Data Pribadi yang Dikumpulkan

| Data | Kategori UU PDP | Dasar Hukum Pemrosesan | Retensi |
|------|----------------|----------------------|---------|
| Nama lengkap | Data Pribadi Umum | Persetujuan (consent) | Selama aktif + 1 tahun |
| Nomor WhatsApp | Data Pribadi Umum | Persetujuan + kepentingan vital (darurat) | Selama aktif + 1 tahun |
| Lorong/Dusun | Data Pribadi Umum | Persetujuan | Selama aktif + 1 tahun |
| Alamat | Data Pribadi Umum | Persetujuan | Selama aktif + 1 tahun |
| Isi pesan laporan | Bukan data pribadi | Kepentingan umum | 3 tahun (audit Dana Desa) |
| IP address admin | Data Pribadi Umum | Kepentingan sah (keamanan) | 90 hari |

### 2.2 Kewajiban Berdasarkan UU PDP

| Kewajiban | Pasal | Implementasi di GAH |
|-----------|-------|-------------------|
| **Dasar pemrosesan yang sah** | Pasal 20 | Consent saat registrasi + kepentingan vital (peringatan bencana) |
| **Pemberitahuan** | Pasal 21 | Kebijakan Privasi ditampilkan saat registrasi |
| **Persetujuan** | Pasal 22–26 | Form consent eksplisit (WA: "Ketik SETUJU untuk mendaftar") |
| **Pembatasan pemrosesan** | Pasal 27 | Data hanya digunakan untuk tujuan yang dinyatakan |
| **Akurasi data** | Pasal 28 | Warga bisa request update data via admin |
| **Keamanan data** | Pasal 35 | Enkripsi, RBAC, audit log, server lokal |
| **Pemberitahuan pelanggaran** | Pasal 46 | Prosedur notifikasi breach dalam 3×24 jam |
| **Penghapusan data** | Pasal 43 | Warga bisa request penghapusan (right to erasure) |
| **DPO (Data Protection Officer)** | Pasal 53 | Geuchik atau Sekdes sebagai DPO tingkat desa |

### 2.3 Formulir Persetujuan (Consent)

**Via WhatsApp (saat registrasi):**

```
📋 PENDAFTARAN GAMPONG ALERT HUB

Assalamu'alaikum, [Nama Warga].

Anda akan didaftarkan ke sistem Gampong Alert Hub untuk:
✅ Menerima peringatan dini bencana
✅ Melaporkan insiden/masalah di gampong

Data yang kami simpan:
• Nama lengkap
• Nomor WhatsApp
• Lorong/Dusun

Data Anda disimpan secara aman di server Balai Desa dan TIDAK
akan dibagikan ke pihak ketiga.

Anda bisa berhenti kapan saja dengan mengirim: !berhenti

Balas SETUJU untuk mendaftar.
```

**Via Dashboard (input admin):**

Checkbox: *"Saya telah mendapatkan persetujuan lisan dari warga untuk menyimpan data mereka dalam sistem Gampong Alert Hub sesuai kebijakan privasi yang berlaku."*

---

## 3. Kebijakan Privasi

### 3.1 Template Kebijakan Privasi (Ringkasan)

```
KEBIJAKAN PRIVASI — GAMPONG ALERT HUB

Terakhir diperbarui: [Tanggal]

1. PENGELOLA DATA
   Perangkat Gampong [Nama Gampong], Kecamatan [Nama], Kabupaten [Nama], Provinsi Aceh.

2. DATA YANG KAMI KUMPULKAN
   - Nama lengkap
   - Nomor WhatsApp
   - Lorong/Dusun tempat tinggal
   - Isi pesan laporan yang Anda kirim

3. TUJUAN PENGGUNAAN
   - Mengirimkan peringatan dini bencana
   - Mencatat dan menindaklanjuti laporan warga
   - Administrasi data kependudukan gampong

4. PENYIMPANAN DATA
   - Data disimpan di server lokal Balai Desa
   - Data TIDAK disimpan di cloud/server luar negeri
   - Data dilindungi dengan enkripsi dan kontrol akses

5. PEMBAGIAN DATA
   - Data TIDAK dijual atau dibagikan ke pihak ketiga
   - Data dapat dibagikan ke instansi darurat (BPBD, Damkar)
     HANYA dalam situasi darurat yang mengancam keselamatan

6. HAK ANDA
   - Mengakses data pribadi Anda: hubungi perangkat desa
   - Memperbarui data: hubungi perangkat desa
   - Menghapus data: kirim "!berhenti" via WhatsApp
   - Menarik persetujuan: kirim "!berhenti" via WhatsApp

7. KEAMANAN
   - Akses sistem dibatasi dengan autentikasi & otorisasi
   - Setiap akses admin tercatat dalam log audit

8. KONTAK
   Perangkat Gampong [Nama] — [Nomor Kontak]
```

---

## 4. Keamanan Data (Technical Compliance)

### 4.1 Langkah-Langkah Keamanan

| Layer | Implementasi | Status |
|-------|-------------|--------|
| **Network** | Firewall (UFW), akses hanya via LAN/VPN, HTTPS | ⚠️ Perlu setup |
| **Application** | Better Auth session, RBAC (ZenStack), CSRF protection | ⚠️ Perlu implementasi |
| **Database** | Password auth, connection via internal network only | ⚠️ Perlu setup |
| **Data at Rest** | PostgreSQL encryption, SSD encryption (LUKS) | ⚠️ Opsional |
| **Data in Transit** | HTTPS (TLS 1.3) via Caddy reverse proxy | ⚠️ Perlu setup |
| **Logging** | Audit log setiap aksi admin (create, update, delete) | ⚠️ Perlu implementasi |
| **Backup** | Backup harian terenkripsi, retensi 7 hari | ⚠️ Perlu setup |
| **Access Control** | RBAC 3-tier (Admin, Operator, Viewer) | ⚠️ Perlu implementasi |

### 4.2 Audit Log Schema

```prisma
model AuditLog {
  id        String   @id @default(uuid())
  userId    String
  aksi      String   // CREATE, UPDATE, DELETE, LOGIN, LOGOUT, BROADCAST
  entitas   String   // Warga, Laporan, Pengaturan, etc.
  entitasId String?
  detail    Json?    // Data sebelum & sesudah perubahan
  ipAddress String?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([entitas])
  @@index([createdAt])
  @@map("audit_log")
}
```

---

## 5. Kepatuhan WhatsApp / Meta

### 5.1 Terms of Service WhatsApp

| Aturan WhatsApp | Status GAH | Mitigasi |
|----------------|-----------|----------|
| Dilarang spam/pesan massal tanpa consent | ✅ Warga mendaftar sukarela | Consent saat registrasi |
| Dilarang menggunakan unofficial API | ⚠️ Evolution API = unofficial | Migrasi ke WA Business API (long-term) |
| Rate limiting pengiriman pesan | ⚠️ Potensi throttle | Batch sending, delay antar-pesan |
| Nomor bisa diblokir jika banyak yang report | ⚠️ Risiko jika warga tidak paham | Edukasi warga, opt-out mudah |

### 5.2 Rencana Migrasi ke WhatsApp Business API

| Fase | Timeline | Aksi |
|------|---------|------|
| **Sekarang (MVP)** | Bulan 1–6 | Gunakan Evolution API (Baileys) — cukup untuk pilot |
| **Short-term** | Bulan 6–12 | Ajukan WhatsApp Business API via BSP (Business Solution Provider) |
| **Long-term** | Tahun 2+ | Full compliance dengan WhatsApp Cloud API |

---

## 6. Hak Kekayaan Intelektual (HAKI)

### 6.1 Lisensi Software

| Komponen | Lisensi | Boleh Komersial? |
|----------|---------|-----------------|
| Next.js | MIT | ✅ Ya |
| Prisma | Apache 2.0 | ✅ Ya |
| ZenStack | MIT | ✅ Ya |
| n8n | Sustainable Use License | ⚠️ Perlu cek untuk komersial |
| Evolution API | Apache 2.0 | ✅ Ya |
| PostgreSQL | PostgreSQL License | ✅ Ya |
| Tailwind CSS | MIT | ✅ Ya |
| shadcn/ui | MIT | ✅ Ya |

### 6.2 Lisensi Gampong Alert Hub

**Rekomendasi:** Gunakan lisensi **AGPL-3.0** (GNU Affero General Public License) — open-source dengan kewajiban membagikan modifikasi jika di-deploy sebagai layanan jaringan.

**Alasan:**
- Mendukung transparansi (cocok untuk proyek pemerintahan)
- Mencegah pihak lain mengambil kode tanpa kontribusi balik
- Komunitas bisa berkontribusi dan mengaudit

---

## 7. Rekomendasi Compliance Checklist

### Pre-Launch

- [ ] Buat dan publikasikan Kebijakan Privasi
- [ ] Implementasi mekanisme consent (WA + Dashboard)
- [ ] Implementasi fitur `!berhenti` (opt-out / right to erasure)
- [ ] Setup HTTPS (TLS) untuk dashboard
- [ ] Implementasi audit log
- [ ] Tunjuk DPO tingkat desa (Geuchik/Sekdes)
- [ ] Dokumentasi DPIA (Data Protection Impact Assessment)

### Post-Launch

- [ ] Review kebijakan privasi setiap 6 bulan
- [ ] Audit keamanan tahunan
- [ ] Latihan prosedur penanganan data breach
- [ ] Update consent jika ada perubahan penggunaan data
- [ ] Monitor regulasi baru terkait PDP
