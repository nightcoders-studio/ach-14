# Value Proposition Canvas (VPC) - Gampong Alert Hub

Dokumen ini menjabarkan *Value Proposition Canvas* untuk memastikan bahwa fitur-fitur Gampong Alert Hub secara akurat menjawab masalah dan kebutuhan pengguna.

## Customer Profile
**Target Pengguna:** Warga Gampong & Perangkat Desa (Geuchik, Kepala Lorong)

### 1. Customer Jobs (Tugas Pelanggan)
*Apa yang sedang berusaha diselesaikan oleh warga dan perangkat desa?*
- **Warga:** Melindungi diri dan keluarga dari bencana, mendapatkan informasi valid seputar kejadian di desa, serta melaporkan kondisi darurat dengan cepat.
- **Perangkat Desa (Geuchik/Aparatur):** Menjaga keselamatan dan ketertiban desa, menyebarkan informasi darurat secara merata, menampung dan menindaklanjuti laporan warga.

### 2. Pains (Masalah)
*Apa yang menghambat atau mengganggu mereka dalam menyelesaikan tugas tersebut?*
- Informasi bencana/darurat lambat sampai.
- Terlalu banyak *hoax* dan misinformasi di grup WhatsApp Gampong.
- Laporan infrastruktur desa (kebakaran, tiang listrik rubuh) sering tidak tercatat atau sulit dilacak statusnya.
- Solusi aplikasi *smart village* lain mahal, rumit, dan warga malas mengunduh aplikasi baru.

### 3. Gains (Harapan)
*Hasil atau keuntungan apa yang mereka inginkan?*
- Rasa aman karena sistem pencegahan dan peringatan yang cepat.
- Respons dan tindak lanjut yang cepat dari aparatur desa saat terjadi keadaan darurat.
- Sistem pelaporan warga yang transparan, mudah digunakan (tanpa kurva pembelajaran yang curam).
- Administrasi desa yang terlihat modern dan responsif.

---

## Value Map
**Solusi:** Gampong Alert Hub

### 1. Products & Services (Produk & Layanan)
- **Sistem Orkestrasi n8n & Evolution API:** Engine yang secara otomatis memantau ancaman dan mengatur pesan.
- **Bot WhatsApp Laporan Warga:** Antarmuka pelaporan berbasis *chat* yang selalu aktif 24/7.
- **Dashboard Manajemen Warga:** Aplikasi *web* untuk perangkat desa berbasis Next.js dan Supabase.

### 2. Pain Relievers (Pereda Masalah)
*Bagaimana produk kita mengurangi masalah pelanggan?*
- **Akurasi Tinggi:** Data peringatan ditarik langsung dari sumber resmi (BMKG), mematikan *hoax*.
- **Tanpa Aplikasi Baru:** Memanfaatkan WhatsApp yang sudah diinstal oleh 99% warga.
- **Self-Hosted & Edge Computing:** *Deployment* mandiri menggunakan Proxmox+Coolify menekan biaya langganan *cloud* yang mahal, cocok untuk dana desa.

### 3. Gain Creators (Pencipta Manfaat)
*Bagaimana produk kita menghasilkan keuntungan bagi pelanggan?*
- **Instan:** Notifikasi WhatsApp dikirim dalam hitungan detik setelah gempa/darurat terdeteksi.
- **Komunikasi Dua Arah:** *Webhook* WhatsApp memungkinkan laporan warga langsung terekam dan muncul di layar (Dashboard) aparatur desa secara *real-time*.
- **Transparansi:** Operasional Gampong menjadi terpusat, datanya terekam jelas dan mempermudah audit/evaluasi.
