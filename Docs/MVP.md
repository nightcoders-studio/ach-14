# Minimum Viable Product (MVP) - Gampong Alert Hub

Dokumen ini menguraikan ruang lingkup *Minimum Viable Product* (MVP) untuk Gampong Alert Hub, difokuskan pada fitur inti yang menunjukkan nilai utama (*core value*) dari sistem peringatan dini yang dibangun.

## 1. Modul Ingestion Data (n8n + BMKG)
**Tujuan:** Mendapatkan data peringatan bencana secara *real-time* dari sumber terpercaya tanpa intervensi manual.
- **Fitur Utama:**
  - *Cron job/scheduler* yang berjalan setiap 5 menit.
  - Memanggil *Open Data API* BMKG (format XML).
  - Mengkonversi data XML ke JSON.
  - Filter lokasi khusus (misalnya, hanya wilayah "Aceh").

## 2. Modul Broadcast Darurat (Evolution API)
**Tujuan:** Mendistribusikan peringatan dini ke perangkat yang paling banyak digunakan oleh warga (WhatsApp) secepat mungkin.
- **Fitur Utama:**
  - Integrasi n8n dengan webhook Evolution API.
  - *Template* pesan WhatsApp untuk peringatan darurat.
  - Kemampuan mengirim pesan *broadcast* secara simultan ke daftar nomor kontak warga terdaftar.

## 3. Modul Laporan Warga (Two-Way Webhook)
**Tujuan:** Memberdayakan warga untuk melaporkan insiden tingkat desa secara instan.
- **Fitur Utama:**
  - Parsing pesan masuk ke nomor WhatsApp sentral (Evolution API webhook).
  - Deteksi kata kunci pemicu seperti `!lapor`.
  - Format pelaporan sederhana: `!lapor [Jenis Insiden] di [Lokasi/Lorong]`.
  - Integrasi dengan *database* backend (Supabase) untuk menyimpan laporan warga secara *real-time*.

## 4. Dashboard Geuchik (Admin Frontend)
**Tujuan:** Memberikan visibilitas terpusat bagi kepala desa (Geuchik) dan perangkat desa.
- **Fitur Utama:**
  - **Teknologi:** Next.js + Tailwind CSS.
  - **Tampilan Utama:**
    - Metrik jumlah warga terdaftar.
    - Status koneksi API WhatsApp (*gateway connection*).
  - **Tabel Data:**
    - Riwayat *log* peringatan dini yang telah disiarkan.
    - Daftar laporan insiden masuk dari warga, berserta stempel waktu (*timestamp*) dan lokasi.
