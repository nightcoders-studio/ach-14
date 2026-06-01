# 🚨 Gampong Alert Hub

**Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi berbasis WhatsApp untuk Gampong di Aceh.**

Gampong Alert Hub adalah solusi *Smart Village* berkonsep *Edge Computing* yang dirancang khusus untuk memecahkan masalah distribusi informasi darurat, pelaporan warga, dan mitigasi bencana di tingkat desa. Dibangun dengan arsitektur *self-hosted* yang mandiri, sistem ini menekan biaya operasional (*cloud*) tanpa mengorbankan performa tingkat *enterprise*.

---

## ✨ Fitur Utama (MVP)

*   **🌍 Auto-Broadcast Mitigasi Bencana (BMKG):** Menarik *Open Data* BMKG secara otomatis setiap 5 menit. Jika terdeteksi gempa bumi yang relevan dengan wilayah Aceh (atau parameter spesifik lainnya), sistem akan langsung menembakkan peringatan massal via WhatsApp warga.
*   **💬 Two-Way WhatsApp Gateway:** Warga tidak perlu mengunduh aplikasi baru. Laporan darurat (kebakaran, pemadaman listrik PLN, keamanan) dapat dikirim langsung melalui WhatsApp (contoh: `!lapor kebakaran di Lorong C`) dan akan langsung masuk ke *dashboard* perangkat desa.
*   **📊 Dashboard Eksekutif Geuchik:** Antarmuka pemantauan data warga dan laporan darurat secara *real-time* dengan estetika premium bergaya *glassmorphism*, tipografi bersih, dan interaksi mulus.
*   **🔒 Granular Access Control:** Keamanan *database* dan otorisasi tingkat lanjut (Role-Based Access Control) yang dikelola langsung di level ORM (ZenStack + Prisma).
*   **📄 Auto-Generate Reports:** Pembuatan laporan PDF otomatis menggunakan *headless browser* (Puppeteer) untuk kebutuhan pertanggungjawaban Dana Desa.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

Sistem ini dikembangkan menggunakan *stack* modern untuk memastikan *rapid development*, skalabilitas, dan stabilitas:

### Frontend & UI/UX
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS & shadcn-ui
*   **State Management:** Zustand & TanStack Query
*   **Data Grid:** TanStack Table
*   **Animations:** Framer Motion (untuk *micro-interactions* & transisi *glassmorphism*)

### Backend & Database
*   **ORM & Authorization:** Prisma & ZenStack
*   **Authentication:** Better Auth
*   **Database:** PostgreSQL (Supabase)
*   **PDF Generation:** Puppeteer (terhubung via Browserless)

### Middleware & Integrations
*   **Automation Engine:** n8n (Orkestrasi alur kerja & integrasi API eksternal)
*   **Messaging Gateway:** Evolution API (WhatsApp REST API)
*   **Public API:** Data Terbuka BMKG (XML/JSON)

### Infrastruktur & Deployment (DevOps)
*   **Containerization:** Docker & Docker Compose
*   **Hypervisor & Management:** Proxmox VE + Coolify (Ideal untuk *On-Premise / Edge Deployment* di Balai Desa)

---

## 🏗️ Arsitektur Sistem

1.  **Ingestion:** `n8n` melakukan *polling* ke API publik (BMKG) atau menerima *webhook* dari sistem eksternal.
2.  **Processing:** Logika filtering dan format pesan diproses di dalam *workflow* n8n.
3.  **Storage:** Data peringatan dan laporan warga disimpan di PostgreSQL menggunakan Prisma/ZenStack.
4.  **Distribution:** Peringatan yang memenuhi kriteria diteruskan ke `Evolution API` untuk di-*broadcast* ke nomor WhatsApp warga yang terdaftar.
5.  **Monitoring:** Perangkat Gampong memonitor status warga dan membalas laporan via `Next.js Dashboard`.

---

## 🚀 Memulai Pengembangan (Local Development)

### Prasyarat
Pastikan Anda telah menginstal:
*   [Node.js](https://nodejs.org/) (v18 atau lebih baru)
*   [Docker](https://www.docker.com/) & Docker Compose
*   Akun [Supabase](https://supabase.com/) (atau PostgreSQL lokal)

### Instalasi

1. **Kloning Repositori**
```bash
   git clone [https://github.com/username/gampong-alert-hub.git](https://github.com/username/gampong-alert-hub.git)
   cd gampong-alert-hub