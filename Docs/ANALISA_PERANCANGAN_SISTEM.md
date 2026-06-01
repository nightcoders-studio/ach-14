# 📐 Analisa Perancangan Sistem — Gampong Alert Hub

> **Versi:** 1.0  
> **Tanggal:** 1 Juni 2026  
> **Status:** Draft  

---

## 1. Pendahuluan

### 1.1 Latar Belakang
Gampong (Desa) di Aceh memiliki tantangan unik dalam hal distribusi informasi darurat dan pelaporan warga. Sistem komunikasi yang ada saat ini (grup WhatsApp informal) rentan terhadap *hoax*, lambat, dan tidak terstruktur. Gampong Alert Hub hadir sebagai solusi *Smart Village* yang memanfaatkan infrastruktur WhatsApp yang sudah dimiliki 99% warga, dikombinasikan dengan automasi data bencana dari BMKG.

### 1.2 Tujuan Sistem
- Menyediakan sistem peringatan dini bencana otomatis berbasis data BMKG.
- Memungkinkan komunikasi dua arah antara warga dan perangkat desa via WhatsApp.
- Memberikan *dashboard* eksekutif untuk pemantauan dan pengambilan keputusan.
- Menekan biaya operasional dengan arsitektur *self-hosted* / *edge computing*.

### 1.3 Ruang Lingkup
Sistem mencakup 4 modul utama: **Ingestion Data**, **Broadcast Darurat**, **Laporan Warga**, dan **Dashboard Admin**.

---

## 2. Analisis Kebutuhan

### 2.1 Kebutuhan Fungsional

| ID   | Kebutuhan | Prioritas | Modul |
|------|-----------|-----------|-------|
| FR1  | Polling data BMKG setiap 5 menit secara otomatis | Tinggi | Ingestion |
| FR2  | Parsing XML BMKG ke JSON dan filter wilayah Aceh | Tinggi | Ingestion |
| FR3  | Broadcast peringatan dini ke seluruh nomor warga terdaftar | Tinggi | Broadcast |
| FR4  | Menerima pesan WhatsApp masuk via webhook Evolution API | Tinggi | Laporan Warga |
| FR5  | Parsing perintah `!lapor` dari pesan masuk | Tinggi | Laporan Warga |
| FR6  | Menyimpan laporan warga ke database PostgreSQL | Tinggi | Laporan Warga |
| FR7  | Menampilkan ringkasan data (kartu metrik) di dashboard | Tinggi | Dashboard |
| FR8  | Menampilkan tabel riwayat peringatan dan laporan warga | Tinggi | Dashboard |
| FR9  | Autentikasi admin (login/logout) | Sedang | Dashboard |
| FR10 | Manajemen data kontak warga (CRUD) | Sedang | Dashboard |
| FR11 | Ubah status laporan (TERKIRIM → DIPROSES → SELESAI) | Sedang | Dashboard |
| FR12 | Generate laporan PDF otomatis untuk akuntabilitas Dana Desa | Rendah | Dashboard |

### 2.2 Kebutuhan Non-Fungsional

| ID   | Kebutuhan | Target |
|------|-----------|--------|
| NFR1 | Waktu pengiriman broadcast sejak data BMKG masuk | ≤ 10 detik |
| NFR2 | Waktu tampil laporan warga di dashboard sejak pesan masuk | ≤ 3 detik |
| NFR3 | Kapasitas broadcast simultan | ≥ 1.000 pesan |
| NFR4 | Ketersediaan sistem (uptime) | ≥ 99% |
| NFR5 | Responsivitas UI dashboard | Desktop + Tablet |
| NFR6 | Keamanan data warga | Enkripsi + RBAC |

---

## 3. Arsitektur Sistem

### 3.1 Diagram Arsitektur Tingkat Tinggi

```mermaid
graph TB
    subgraph "🌐 Sumber Eksternal"
        BMKG["🏛️ BMKG Open Data<br/>(XML/JSON API)"]
        WA_NETWORK["📱 WhatsApp Network"]
    end

    subgraph "🖥️ Edge Server - Balai Desa (Proxmox VE + Coolify)"
        subgraph "🔄 Layer Orkestrasi"
            N8N["⚙️ n8n<br/>Workflow Engine"]
        end

        subgraph "📡 Layer Gateway"
            EVO["📲 Evolution API<br/>WhatsApp Gateway"]
        end

        subgraph "🗄️ Layer Data"
            PG["🐘 PostgreSQL<br/>(Supabase)"]
            PRISMA["🔷 Prisma + ZenStack<br/>ORM & Auth Layer"]
        end

        subgraph "🖼️ Layer Presentasi"
            NEXT["⚡ Next.js<br/>Admin Dashboard"]
            PUPPET["🖨️ Puppeteer<br/>PDF Generator"]
        end
    end

    BMKG -->|"Cron 5 menit"| N8N
    N8N -->|"Query nomor warga"| PG
    N8N -->|"API Send Message"| EVO
    EVO -->|"Broadcast"| WA_NETWORK
    WA_NETWORK -->|"Webhook pesan masuk"| EVO
    EVO -->|"Trigger workflow"| N8N
    N8N -->|"INSERT laporan"| PG
    NEXT -->|"Prisma Client"| PRISMA
    PRISMA -->|"Query/Mutation"| PG
    NEXT -->|"Generate PDF"| PUPPET

    style BMKG fill:#1e3a5f,stroke:#4a90d9,color:#fff
    style WA_NETWORK fill:#25D366,stroke:#128C7E,color:#fff
    style N8N fill:#FF6D00,stroke:#E65100,color:#fff
    style EVO fill:#7C4DFF,stroke:#6200EA,color:#fff
    style PG fill:#336791,stroke:#1B4F72,color:#fff
    style NEXT fill:#000000,stroke:#333333,color:#fff
```

### 3.2 Pola Arsitektur

| Aspek | Pendekatan | Justifikasi |
|-------|-----------|-------------|
| **Deployment** | Edge Computing (On-Premise) | Menekan biaya cloud, data sensitif tetap di lokal |
| **Orkestrasi** | Event-Driven (n8n Workflows) | Fleksibel, visual, mudah dimodifikasi non-developer |
| **Database** | Relational (PostgreSQL) | ACID compliance, cocok untuk data terstruktur |
| **ORM** | Prisma + ZenStack | Type-safe, auto-generate CRUD, built-in RBAC |
| **Auth** | Better Auth | Ringan, self-hosted, mendukung berbagai strategi |
| **Gateway** | REST API (Evolution API) | Open-source, stabil, fitur lengkap untuk WhatsApp |
| **Frontend** | SSR + CSR Hybrid (Next.js App Router) | SEO untuk halaman publik, interaktif untuk dashboard |

---

## 4. Perancangan Data (Entity Relationship Diagram)

### 4.1 ERD

```mermaid
erDiagram
    USER ||--o{ SESSION : "memiliki"
    USER {
        string id PK "UUID"
        string name
        string email "UNIQUE"
        string hashedPassword
        string role "ADMIN | OPERATOR | VIEWER"
        datetime createdAt
        datetime updatedAt
    }

    SESSION {
        string id PK
        string userId FK
        string token
        datetime expiresAt
    }

    WARGA ||--o{ LAPORAN : "membuat"
    WARGA {
        string id PK "UUID"
        string nama
        string nomorWA "UNIQUE"
        string lorong
        string alamat
        boolean aktif "default: true"
        datetime createdAt
        datetime updatedAt
    }

    LAPORAN {
        string id PK "UUID"
        string wargaId FK
        string jenis "KEBAKARAN | LISTRIK | KEAMANAN | BENCANA | LAINNYA"
        string pesan
        string lokasi
        string status "TERKIRIM | DIPROSES | SELESAI | DITOLAK"
        string catatanAdmin
        datetime createdAt
        datetime updatedAt
    }

    LOG_PERINGATAN ||--o{ LOG_BROADCAST : "menghasilkan"
    LOG_PERINGATAN {
        string id PK "UUID"
        string jenis "GEMPA | TSUNAMI | CUACA"
        string sumber "BMKG"
        float magnitudo
        string lokasi
        string wilayah
        json rawData
        datetime waktuKejadian
        datetime createdAt
    }

    LOG_BROADCAST {
        string id PK "UUID"
        string peringatanId FK
        int totalPenerima
        int berhasilTerkirim
        int gagalTerkirim
        datetime waktuMulai
        datetime waktuSelesai
    }

    PENGATURAN {
        string id PK "UUID"
        string kunci "UNIQUE"
        string nilai
        string deskripsi
        datetime updatedAt
    }
```

### 4.2 Deskripsi Entitas

| Entitas | Deskripsi | Relasi |
|---------|-----------|--------|
| **User** | Pengguna dashboard (admin/operator) | Has many Session |
| **Session** | Sesi login aktif | Belongs to User |
| **Warga** | Data warga terdaftar di Gampong | Has many Laporan |
| **Laporan** | Laporan darurat/insiden dari warga | Belongs to Warga |
| **LogPeringatan** | Catatan peringatan yang diterima dari BMKG | Has many LogBroadcast |
| **LogBroadcast** | Catatan statistik pengiriman broadcast | Belongs to LogPeringatan |
| **Pengaturan** | Konfigurasi sistem (key-value store) | Standalone |

---

## 5. Perancangan Proses (Sequence Diagram)

### 5.1 Alur Peringatan Dini Bencana

```mermaid
sequenceDiagram
    participant BMKG as 🏛️ BMKG API
    participant N8N as ⚙️ n8n Engine
    participant DB as 🐘 PostgreSQL
    participant EVO as 📲 Evolution API
    participant WA as 📱 WhatsApp Warga

    loop Setiap 5 Menit
        N8N->>BMKG: HTTP GET /autogempa.json
        BMKG-->>N8N: Response (XML/JSON data gempa)
    end

    N8N->>N8N: Parse & Filter (wilayah == "Aceh")

    alt Gempa Relevan Ditemukan
        N8N->>DB: INSERT LogPeringatan
        DB-->>N8N: OK (peringatan_id)
        N8N->>DB: SELECT * FROM Warga WHERE aktif = true
        DB-->>N8N: Daftar nomor WA warga

        loop Untuk setiap warga
            N8N->>EVO: POST /message/sendText
            EVO->>WA: Kirim pesan peringatan
        end

        N8N->>DB: INSERT LogBroadcast (statistik pengiriman)
    else Tidak ada gempa relevan
        N8N->>N8N: Skip, tunggu cron berikutnya
    end
```

### 5.2 Alur Pelaporan Warga

```mermaid
sequenceDiagram
    participant W as 📱 Warga (WhatsApp)
    participant EVO as 📲 Evolution API
    participant N8N as ⚙️ n8n Engine
    participant DB as 🐘 PostgreSQL
    participant DASH as 🖥️ Dashboard

    W->>EVO: Kirim pesan "!lapor Kebakaran di Lorong C"
    EVO->>N8N: Webhook (payload pesan masuk)

    N8N->>N8N: Parse command "!lapor"
    N8N->>N8N: Ekstrak jenis="KEBAKARAN", lokasi="Lorong C"

    N8N->>DB: SELECT * FROM Warga WHERE nomorWA = pengirim
    DB-->>N8N: Data warga (atau null)

    alt Warga terdaftar
        N8N->>DB: INSERT Laporan (wargaId, jenis, pesan, lokasi)
        DB-->>N8N: OK (laporan_id)
        N8N->>EVO: POST /message/sendText (konfirmasi)
        EVO->>W: "✅ Laporan diterima! ID: #LP-0012"
    else Warga tidak terdaftar
        N8N->>EVO: POST /message/sendText (tolak)
        EVO->>W: "⚠️ Nomor Anda belum terdaftar. Hubungi perangkat desa."
    end

    DASH->>DB: Query laporan terbaru (polling/realtime)
    DB-->>DASH: Data laporan baru muncul
```

### 5.3 Alur Autentikasi Dashboard

```mermaid
sequenceDiagram
    participant A as 👤 Admin
    participant NEXT as ⚡ Next.js
    participant AUTH as 🔐 Better Auth
    participant DB as 🐘 PostgreSQL

    A->>NEXT: Akses /dashboard
    NEXT->>AUTH: Check session
    AUTH->>DB: Verify token

    alt Session Valid
        DB-->>AUTH: User data + role
        AUTH-->>NEXT: Authorized (role: ADMIN)
        NEXT-->>A: Render Dashboard
    else Session Invalid / Expired
        AUTH-->>NEXT: Unauthorized
        NEXT-->>A: Redirect ke /login
        A->>NEXT: Submit credentials
        NEXT->>AUTH: POST /auth/login
        AUTH->>DB: Verify credentials
        DB-->>AUTH: User found
        AUTH->>DB: CREATE Session
        AUTH-->>NEXT: Set cookie + redirect
        NEXT-->>A: Render Dashboard
    end
```

---

## 6. Perancangan Antarmuka (Interface Design)

### 6.1 Peta Halaman (Sitemap)

```mermaid
graph TD
    LOGIN["🔐 /login"] --> DASH["📊 /dashboard"]
    DASH --> WARGA["👥 /dashboard/warga"]
    DASH --> LAPORAN["📋 /dashboard/laporan"]
    DASH --> PERINGATAN["🚨 /dashboard/peringatan"]
    DASH --> SETTING["⚙️ /dashboard/pengaturan"]

    WARGA --> WARGA_ADD["➕ /dashboard/warga/tambah"]
    WARGA --> WARGA_DETAIL["🔍 /dashboard/warga/[id]"]
    LAPORAN --> LAPORAN_DETAIL["🔍 /dashboard/laporan/[id]"]
    PERINGATAN --> PERINGATAN_DETAIL["🔍 /dashboard/peringatan/[id]"]
```

### 6.2 Spesifikasi Halaman

| Halaman | Komponen Utama | Aksi |
|---------|---------------|------|
| `/login` | Form email + password | Login via Better Auth |
| `/dashboard` | Kartu metrik, Tabel laporan terkini, Grafik tren | Overview cepat |
| `/dashboard/warga` | Tabel warga (TanStack Table), Search, Filter | CRUD warga |
| `/dashboard/laporan` | Tabel laporan, Filter status/jenis, Badge status | Ubah status, lihat detail |
| `/dashboard/peringatan` | Timeline peringatan, Statistik broadcast | Lihat riwayat, re-broadcast |
| `/dashboard/pengaturan` | Form konfigurasi (interval BMKG, template pesan) | Update settings |

### 6.3 Prinsip UI/UX

- **Tema:** Dark mode utama dengan aksen warna peringatan (merah/oranye/kuning)
- **Gaya:** Glassmorphism — blur backdrop, transparansi, border halus
- **Tipografi:** Inter (heading), Roboto (body)
- **Animasi:** Framer Motion — transisi halaman, hover kartu, notifikasi slide-in
- **Responsif:** Mobile-first, breakpoint utama di 768px dan 1024px

---

## 7. Perancangan Keamanan

### 7.1 Matriks Kontrol Akses (RBAC)

| Resource | ADMIN | OPERATOR | VIEWER |
|----------|-------|----------|--------|
| Dashboard (baca) | ✅ | ✅ | ✅ |
| Warga (CRUD) | ✅ | ✅ | ❌ |
| Laporan (baca) | ✅ | ✅ | ✅ |
| Laporan (ubah status) | ✅ | ✅ | ❌ |
| Peringatan (baca) | ✅ | ✅ | ✅ |
| Peringatan (re-broadcast) | ✅ | ❌ | ❌ |
| Pengaturan sistem | ✅ | ❌ | ❌ |
| Manajemen user | ✅ | ❌ | ❌ |

### 7.2 Strategi Keamanan

- **Autentikasi:** Better Auth dengan session-based tokens
- **Otorisasi:** ZenStack policy rules (deklaratif di level ORM)
- **Data Sensitif:** Nomor WA warga di-hash/enkripsi saat penyimpanan
- **API Protection:** Rate limiting pada endpoint Evolution API webhook
- **Infrastructure:** Jaringan lokal (LAN Balai Desa), akses publik via reverse proxy + SSL

---

## 8. Perancangan Deployment

### 8.1 Stack Infrastruktur

```mermaid
graph TB
    subgraph "Hardware - Balai Desa"
        PC["🖥️ Mini PC / Server<br/>RAM: 8-16GB, SSD: 256GB"]
    end

    subgraph "Virtualisasi"
        PROX["Proxmox VE<br/>(Hypervisor)"]
    end

    subgraph "Container Orchestration"
        COOL["Coolify<br/>(Self-hosted PaaS)"]
    end

    subgraph "Docker Containers"
        C1["📦 Next.js App"]
        C2["📦 PostgreSQL"]
        C3["📦 n8n"]
        C4["📦 Evolution API"]
        C5["📦 Browserless<br/>(Puppeteer)"]
    end

    PC --> PROX
    PROX --> COOL
    COOL --> C1
    COOL --> C2
    COOL --> C3
    COOL --> C4
    COOL --> C5
```

### 8.2 Estimasi Sumber Daya

| Container | RAM (min) | CPU | Storage | Port |
|-----------|----------|-----|---------|------|
| Next.js | 512 MB | 0.5 core | 500 MB | 3000 |
| PostgreSQL | 1 GB | 0.5 core | 5 GB | 5432 |
| n8n | 512 MB | 0.5 core | 1 GB | 5678 |
| Evolution API | 512 MB | 0.5 core | 500 MB | 8080 |
| Browserless | 1 GB | 1 core | 500 MB | 3300 |
| **Total** | **~3.5 GB** | **~3 core** | **~7.5 GB** | — |

---

## 9. Analisis Risiko

| Risiko | Dampak | Probabilitas | Mitigasi |
|--------|--------|-------------|----------|
| Internet mati di Balai Desa | Tidak bisa broadcast/terima laporan | Sedang | Fallback ke jaringan lokal, buffer pesan offline |
| BMKG API berubah/down | Tidak ada data gempa | Rendah | Monitoring endpoint, notifikasi ke admin |
| WhatsApp nomor diblokir | Gateway tidak berfungsi | Sedang | Backup nomor, rotasi, compliance dengan ToS |
| Server hardware rusak | Seluruh sistem down | Rendah | Backup database terjadwal, dokumentasi recovery |
| Serangan siber (DDoS/intrusion) | Data bocor, sistem lumpuh | Rendah | Firewall, fail2ban, akses via VPN |

---

## 10. Kesimpulan

Gampong Alert Hub dirancang dengan arsitektur modular yang memisahkan concern antara **orkestrasi** (n8n), **gateway** (Evolution API), **penyimpanan** (PostgreSQL), dan **presentasi** (Next.js). Pendekatan *edge computing* memastikan biaya operasional rendah dan data sensitif warga tetap berada di lingkungan lokal Balai Desa. Sistem ini siap untuk dikembangkan secara bertahap dimulai dari MVP hingga fitur lanjutan.
