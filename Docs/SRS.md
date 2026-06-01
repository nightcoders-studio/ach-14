# Software Requirements Specification (SRS) - Gampong Alert Hub

## 1. Lingkup Sistem
Sistem ini menggunakan arsitektur modular yang memadukan automasi *workflow*, *backend database*, dan *frontend dashboard*. Semua layanan direncanakan agar bisa di-*deploy* secara lokal (*self-hosted*).

## 2. Kebutuhan Fungsional (Functional Requirements)
- **FR1 (Data Ingestion):** Sistem harus menarik data BMKG setiap 5 menit.
- **FR2 (Data Processing):** Sistem harus menguraikan format XML menjadi JSON dan memfilter berdasarkan `Provinsi == Aceh`.
- **FR3 (Notification):** Sistem harus menembakkan *API call* ke Evolution API untuk mengirim pesan ke nomor yang ada di *database* (atau daftar n8n).
- **FR4 (Receiving Webhook):** Sistem harus mengekspos endpoint *webhook* untuk menerima muatan (*payload*) pesan WhatsApp yang dikirim ke nomor Evolution API.
- **FR5 (Dashboard Authentication):** *Dashboard* harus memiliki perlindungan (minimal *password*) untuk mencegah warga biasa melihat data *log*. (Bisa ditambahkan kemudian untuk MVP jika perlu cepat).
- **FR6 (Data Display):** *Dashboard* harus menampilkan *list* warga, dan tabel laporan.

## 3. Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **NFR1 (Availability):** Sistem backend (Supabase lokal/Docker) dan Evolution API harus selalu *up* (ketersediaan tinggi).
- **NFR2 (Performance):** Pengiriman *broadcast* ke warga tidak boleh memakan waktu lebih dari 10 detik sejak data BMKG diterbitkan/diterima oleh n8n.
- **NFR3 (Scalability):** Evolution API dan antrean n8n harus mampu menangani 1.000 pesan serentak tanpa *crash*.
- **NFR4 (UI/UX):** Penggunaan *framework* Tailwind CSS dengan desain *glassmorphism* modern.

## 4. Stack Teknologi & Spesifikasi Komponen
- **Sistem Operasi (Server):** Proxmox VE (Debian)
- **Containerization:** Docker + Coolify
- **Workflow Automation:** n8n
- **WhatsApp Gateway:** Evolution API (Node.js)
- **Database / Backend:** Supabase (PostgreSQL, Go/Node.js) + Prisma ORM
- **Frontend / Dashboard:** Next.js (React), Tailwind CSS, TypeScript

## 5. Data Model (Schema Prisma - Konseptual)

```prisma
model Warga {
  id        String   @id @default(uuid())
  nama      String
  nomorWA   String   @unique
  lorong    String
  createdAt DateTime @default(now())
}

model Laporan {
  id        String   @id @default(uuid())
  wargaId   String
  pesan     String
  status    String   @default("TERKIRIM") // TERKIRIM, DIPROSES, SELESAI
  createdAt DateTime @default(now())
  
  warga     Warga    @relation(fields: [wargaId], references: [id])
}

model LogPeringatan {
  id        String   @id @default(uuid())
  jenis     String   // GEMPA, TSUNAMI
  detail    Json
  waktu     DateTime @default(now())
}
```
