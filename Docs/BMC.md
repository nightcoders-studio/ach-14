# Business Model Canvas (BMC) - Gampong Alert Hub

Gampong Alert Hub dirancang bukan hanya sebagai proyek *hackathon*, tetapi juga memiliki skema bisnis yang berkelanjutan (SaaS B2G/Business to Government).

### 1. Customer Segments
- **Pemerintah Gampong (Desa) di Aceh** sebagai pihak pengambil keputusan (B2G).
- **Aparatur Desa** (Geuchik, Sekretaris Desa, Kepala Lorong) sebagai operator sistem.
- **Warga Gampong** sebagai *End-User* / pemanfaat sistem.

### 2. Value Propositions
- **Sistem Peringatan Dini Hiper-Lokal:** Bekerja melalui WhatsApp tanpa perlu instalasi aplikasi tambahan bagi warga.
- **Infrastruktur Mandiri (Self-Hosted):** Menggunakan *edge servers* untuk menekan biaya *cloud* bulanan yang fluktuatif.
- **Sistem Tahan Banting:** Jika internet luar mati, sistem lokal (pelaporan warga ke server balai desa via jaringan lokal) secara teori dapat diadaptasi untuk tetap berjalan.

### 3. Channels
- **Sosialisasi Musrenbang (Musyawarah Perencanaan Pembangunan):** Demonstrasi secara langsung ke Geuchik saat penyusunan anggaran Gampong.
- **Komunitas Relawan TIK Aceh:** Sebagai agen pendistribusi teknologi.
- **Demo via WhatsApp Broadcast:** Warga langsung bisa mencoba produk dengan mengirimkan pesan ke nomor demo.

### 4. Customer Relationships
- **Layanan Pendampingan IT (Managed Service):** Membantu aparatur desa mengoperasikan *dashboard*.
- **Pemeliharaan Proaktif:** Monitor kesehatan *server* dari jarak jauh.
- **Komunitas Antar-Gampong:** Forum bagi kepala desa untuk berbagi praktik terbaik.

### 5. Revenue Streams
- **Biaya Instalasi Awal (Setup Fee):** Pemasangan *server mini* / PC di balai desa, konfigurasi perangkat lunak.
- **Langganan Bulanan / Tahunan (Maintenance & License):** Biaya rutin yang sangat terjangkau, mudah dimasukkan dalam Anggaran Dana Desa (ADD).

### 6. Key Activities
- Instalasi dan pemeliharaan server (Proxmox/Coolify).
- Pembaruan dan perbaikan alur kerja otomatisasi (n8n).
- Menjaga konektivitas API pihak ketiga (BMKG, Evolution API, Supabase).
- Dukungan pelanggan untuk perangkat desa.

### 7. Key Resources
- *Edge Servers* (Mini PC/Server Balai Desa).
- Infrastruktur *domain* dan perutean (DNS, Cloudflare).
- Talenta pengembang (*Full Stack* & *DevOps*).
- Infrastruktur nomor WhatsApp terverifikasi.

### 8. Key Partnerships
- **BMKG:** Penyedia data *open source* untuk gempa dan cuaca.
- **Dinas Kominfo Aceh:** Dukungan legalitas dan standardisasi Gampong Cerdas.
- **Instansi Darurat (PLN, Pemadam Kebakaran, BPBD):** Untuk integrasi eskalasi laporan warga di masa depan.

### 9. Cost Structure
- **Belanja Modal (CAPEX):** Biaya pembelian perangkat keras *server*.
- **Belanja Operasional (OPEX):**
  - Biaya langganan API tambahan (jika ada).
  - Biaya pemeliharaan nomor WhatsApp (hosting Evolution API).
  - Listrik dan kuota internet di Balai Desa.
  - Upah tenaga ahli IT pendamping desa.
