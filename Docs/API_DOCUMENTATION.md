# 📡 API Documentation — Gampong Alert Hub

> **Versi API:** v1.0  
> **Base URL:** `http://localhost:3000/api` (Development)  
> **Base URL:** `http://admin.gampong.local/api` (Production)  
> **Format:** JSON  
> **Autentikasi:** Bearer Token (Better Auth Session)

---

## Daftar Isi

1. [Autentikasi](#1-autentikasi)
2. [Warga](#2-warga)
3. [Laporan](#3-laporan)
4. [Peringatan & Broadcast](#4-peringatan--broadcast)
5. [Pengaturan](#5-pengaturan)
6. [Webhook (Evolution API)](#6-webhook-evolution-api)
7. [Health Check](#7-health-check)
8. [Error Codes](#8-error-codes)

---

## 1. Autentikasi

Semua endpoint (kecuali webhook dan health check) memerlukan autentikasi via **Better Auth session cookie** atau **Bearer Token**.

### `POST /api/auth/login`

Login dan mendapatkan session token.

**Request Body:**
```json
{
  "email": "admin@gampong.local",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "name": "Admin Gampong",
      "email": "admin@gampong.local",
      "role": "ADMIN"
    },
    "session": {
      "token": "ses_xyz789...",
      "expiresAt": "2026-06-02T05:00:00Z"
    }
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Email atau password salah."
  }
}
```

---

### `POST /api/auth/logout`

Logout dan menghapus session.

**Headers:**
```
Authorization: Bearer ses_xyz789...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Session berhasil dihapus."
}
```

---

### `GET /api/auth/me`

Mendapatkan informasi user yang sedang login.

**Headers:**
```
Authorization: Bearer ses_xyz789...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "name": "Admin Gampong",
    "email": "admin@gampong.local",
    "role": "ADMIN",
    "createdAt": "2026-01-15T08:00:00Z"
  }
}
```

---

## 2. Warga

### `GET /api/warga`

Mendapatkan daftar seluruh warga terdaftar.

**Headers:**
```
Authorization: Bearer ses_xyz789...
```

**Query Parameters:**

| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `page` | number | 1 | Halaman pagination |
| `limit` | number | 20 | Jumlah data per halaman (max: 100) |
| `search` | string | — | Pencarian berdasarkan nama atau nomor WA |
| `lorong` | string | — | Filter berdasarkan lorong/dusun |
| `aktif` | boolean | — | Filter berdasarkan status aktif |
| `sortBy` | string | `createdAt` | Kolom sorting: `nama`, `lorong`, `createdAt` |
| `sortOrder` | string | `desc` | Urutan: `asc` atau `desc` |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "wrg_001",
      "nama": "Muhammad Ali",
      "nomorWA": "6281234567890",
      "lorong": "Lorong A",
      "alamat": "Jl. Masjid Raya No. 12",
      "aktif": true,
      "createdAt": "2026-05-01T08:00:00Z",
      "updatedAt": "2026-05-01T08:00:00Z",
      "_count": {
        "laporan": 3
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 450,
    "totalPages": 23
  }
}
```

---

### `GET /api/warga/:id`

Mendapatkan detail satu warga beserta riwayat laporannya.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "wrg_001",
    "nama": "Muhammad Ali",
    "nomorWA": "6281234567890",
    "lorong": "Lorong A",
    "alamat": "Jl. Masjid Raya No. 12",
    "aktif": true,
    "createdAt": "2026-05-01T08:00:00Z",
    "laporan": [
      {
        "id": "lpr_010",
        "jenis": "LISTRIK",
        "pesan": "Tiang listrik roboh",
        "status": "SELESAI",
        "createdAt": "2026-05-20T14:30:00Z"
      }
    ]
  }
}
```

---

### `POST /api/warga`

Menambahkan warga baru.

**Akses:** ADMIN, OPERATOR

**Request Body:**
```json
{
  "nama": "Siti Aminah",
  "nomorWA": "6281234567891",
  "lorong": "Lorong B",
  "alamat": "Jl. Kuburan Lama No. 5"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "wrg_002",
    "nama": "Siti Aminah",
    "nomorWA": "6281234567891",
    "lorong": "Lorong B",
    "alamat": "Jl. Kuburan Lama No. 5",
    "aktif": true,
    "createdAt": "2026-06-01T10:00:00Z"
  }
}
```

**Validation Errors (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid.",
    "details": [
      { "field": "nomorWA", "message": "Nomor WhatsApp sudah terdaftar." }
    ]
  }
}
```

---

### `PUT /api/warga/:id`

Mengupdate data warga.

**Akses:** ADMIN, OPERATOR

**Request Body (partial update):**
```json
{
  "nama": "Siti Aminah Putri",
  "lorong": "Lorong C"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "wrg_002",
    "nama": "Siti Aminah Putri",
    "nomorWA": "6281234567891",
    "lorong": "Lorong C",
    "aktif": true,
    "updatedAt": "2026-06-01T12:00:00Z"
  }
}
```

---

### `DELETE /api/warga/:id`

Menonaktifkan warga (soft delete — set `aktif = false`).

**Akses:** ADMIN

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Warga berhasil dinonaktifkan.",
  "data": {
    "id": "wrg_002",
    "aktif": false
  }
}
```

---

### `POST /api/warga/import`

Import warga secara massal dari CSV.

**Akses:** ADMIN

**Request:** `multipart/form-data`

| Field | Tipe | Deskripsi |
|-------|------|-----------|
| `file` | File (CSV) | File CSV dengan kolom: nama, nomorWA, lorong |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "berhasil": 48,
    "gagal": 2,
    "errors": [
      { "baris": 12, "alasan": "Nomor WA sudah terdaftar: 6281234567890" },
      { "baris": 35, "alasan": "Format nomor WA tidak valid: 081xxx" }
    ]
  }
}
```

---

## 3. Laporan

### `GET /api/laporan`

Mendapatkan daftar laporan warga.

**Query Parameters:**

| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `page` | number | 1 | Halaman pagination |
| `limit` | number | 20 | Jumlah per halaman |
| `status` | string | — | Filter: `TERKIRIM`, `DIPROSES`, `SELESAI`, `DITOLAK` |
| `jenis` | string | — | Filter: `KEBAKARAN`, `LISTRIK`, `KEAMANAN`, `BENCANA`, `LAINNYA` |
| `startDate` | string | — | Filter tanggal mulai (ISO 8601) |
| `endDate` | string | — | Filter tanggal akhir (ISO 8601) |
| `wargaId` | string | — | Filter berdasarkan ID warga |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "lpr_013",
      "wargaId": "wrg_001",
      "jenis": "KEBAKARAN",
      "pesan": "Terjadi kebakaran alang-alang di dekat kuburan Lorong B",
      "lokasi": "Lorong B, dekat kuburan",
      "status": "TERKIRIM",
      "catatanAdmin": null,
      "createdAt": "2026-06-01T14:30:00Z",
      "updatedAt": "2026-06-01T14:30:00Z",
      "warga": {
        "id": "wrg_001",
        "nama": "Muhammad Ali",
        "nomorWA": "6281234567890",
        "lorong": "Lorong A"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 87,
    "totalPages": 5
  }
}
```

---

### `GET /api/laporan/:id`

Mendapatkan detail satu laporan.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "lpr_013",
    "wargaId": "wrg_001",
    "jenis": "KEBAKARAN",
    "pesan": "Terjadi kebakaran alang-alang di dekat kuburan Lorong B",
    "lokasi": "Lorong B, dekat kuburan",
    "status": "DIPROSES",
    "catatanAdmin": "Tim damkar sudah dihubungi.",
    "createdAt": "2026-06-01T14:30:00Z",
    "updatedAt": "2026-06-01T15:00:00Z",
    "warga": {
      "id": "wrg_001",
      "nama": "Muhammad Ali",
      "nomorWA": "6281234567890",
      "lorong": "Lorong A"
    }
  }
}
```

---

### `PATCH /api/laporan/:id/status`

Mengubah status laporan.

**Akses:** ADMIN, OPERATOR

**Request Body:**
```json
{
  "status": "DIPROSES",
  "catatanAdmin": "Sudah dikoordinasikan dengan PLN. Teknisi datang besok pagi."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "lpr_013",
    "status": "DIPROSES",
    "catatanAdmin": "Sudah dikoordinasikan dengan PLN. Teknisi datang besok pagi.",
    "updatedAt": "2026-06-01T15:00:00Z"
  }
}
```

---

### `POST /api/laporan/:id/notify`

Mengirim notifikasi/update ke pelapor via WhatsApp.

**Akses:** ADMIN, OPERATOR

**Request Body:**
```json
{
  "pesan": "Laporan Anda (#LP-0013) sedang ditindaklanjuti oleh perangkat desa. Terima kasih atas kesabaran Anda."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notifikasi berhasil dikirim ke 6281234567890."
}
```

---

## 4. Peringatan & Broadcast

### `GET /api/peringatan`

Mendapatkan riwayat peringatan bencana.

**Query Parameters:**

| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `page` | number | 1 | Halaman |
| `limit` | number | 20 | Jumlah per halaman |
| `jenis` | string | — | Filter: `GEMPA`, `TSUNAMI`, `CUACA` |
| `startDate` | string | — | Tanggal mulai |
| `endDate` | string | — | Tanggal akhir |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "prg_005",
      "jenis": "GEMPA",
      "sumber": "BMKG",
      "magnitudo": 5.6,
      "lokasi": "12km Barat Daya Banda Aceh",
      "wilayah": "Aceh",
      "waktuKejadian": "2026-06-01T02:15:00Z",
      "createdAt": "2026-06-01T02:15:30Z",
      "broadcast": {
        "id": "brc_005",
        "totalPenerima": 450,
        "berhasilTerkirim": 447,
        "gagalTerkirim": 3,
        "waktuMulai": "2026-06-01T02:15:31Z",
        "waktuSelesai": "2026-06-01T02:15:38Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 12,
    "totalPages": 1
  }
}
```

---

### `GET /api/peringatan/:id`

Detail peringatan termasuk raw data BMKG.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "prg_005",
    "jenis": "GEMPA",
    "sumber": "BMKG",
    "magnitudo": 5.6,
    "lokasi": "12km Barat Daya Banda Aceh",
    "wilayah": "Aceh",
    "rawData": {
      "Tanggal": "01 Jun 2026",
      "Jam": "02:15:00 WIB",
      "Coordinates": "5.55,95.32",
      "Lintang": "5.55 LU",
      "Bujur": "95.32 BT",
      "Magnitude": "5.6",
      "Kedalaman": "10 km",
      "Wilayah": "Pusat gempa berada di laut 12 km Barat Daya Banda Aceh",
      "Potensi": "Tidak berpotensi tsunami"
    },
    "waktuKejadian": "2026-06-01T02:15:00Z",
    "broadcast": {
      "totalPenerima": 450,
      "berhasilTerkirim": 447,
      "gagalTerkirim": 3,
      "waktuMulai": "2026-06-01T02:15:31Z",
      "waktuSelesai": "2026-06-01T02:15:38Z",
      "durasiDetik": 7
    }
  }
}
```

---

### `POST /api/peringatan/:id/rebroadcast`

Mengirim ulang broadcast peringatan.

**Akses:** ADMIN

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Re-broadcast dimulai ke 450 warga.",
  "data": {
    "broadcastId": "brc_006",
    "totalPenerima": 450
  }
}
```

---

### `POST /api/broadcast/manual`

Mengirim broadcast manual (non-bencana).

**Akses:** ADMIN

**Request Body:**
```json
{
  "pesan": "📢 PENGUMUMAN\n\nMusyawarah desa akan dilaksanakan pada:\n📅 Sabtu, 7 Juni 2026\n🕐 Pukul 14:00 WIB\n📍 Balai Desa\n\nDiharapkan kehadiran seluruh warga.\n\n— Perangkat Gampong",
  "targetLorong": null
}
```

> `targetLorong: null` = semua warga. Set ke `"Lorong A"` untuk broadcast ke lorong tertentu.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Broadcast manual dimulai.",
  "data": {
    "broadcastId": "brc_007",
    "totalPenerima": 450
  }
}
```

---

## 5. Pengaturan

### `GET /api/pengaturan`

Mendapatkan seluruh konfigurasi sistem.

**Akses:** ADMIN

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "kunci": "bmkg_polling_interval",
      "nilai": "5",
      "deskripsi": "Interval polling BMKG dalam menit"
    },
    {
      "kunci": "template_peringatan",
      "nilai": "🚨 PERINGATAN DINI {{jenis}} 🚨\n\n{{detail}}\n\n— Gampong Alert Hub 🛡️",
      "deskripsi": "Template pesan broadcast peringatan"
    },
    {
      "kunci": "template_konfirmasi_laporan",
      "nilai": "✅ Laporan Anda telah diterima!\n📋 ID: #{{id}}\n📅 Waktu: {{waktu}}\n📍 Jenis: {{jenis}}",
      "deskripsi": "Template konfirmasi laporan warga"
    },
    {
      "kunci": "evolution_api_url",
      "nilai": "http://evolution-api:8080",
      "deskripsi": "URL Evolution API"
    },
    {
      "kunci": "evolution_api_key",
      "nilai": "***REDACTED***",
      "deskripsi": "API Key Evolution API"
    }
  ]
}
```

---

### `PUT /api/pengaturan/:kunci`

Update nilai pengaturan.

**Akses:** ADMIN

**Request Body:**
```json
{
  "nilai": "10"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "kunci": "bmkg_polling_interval",
    "nilai": "10",
    "updatedAt": "2026-06-01T16:00:00Z"
  }
}
```

---

## 6. Webhook (Evolution API)

### `POST /api/webhook/evolution`

Endpoint yang menerima pesan masuk dari Evolution API. **Tidak memerlukan autentikasi** — divalidasi via webhook secret.

**Headers:**
```
X-Webhook-Secret: whsec_abc123...
```

**Request Body (dari Evolution API):**
```json
{
  "event": "messages.upsert",
  "instance": "gampong-hub",
  "data": {
    "key": {
      "remoteJid": "6281234567890@s.whatsapp.net",
      "fromMe": false,
      "id": "msg_abc123"
    },
    "message": {
      "conversation": "!lapor Tiang listrik roboh di Lorong C"
    },
    "messageTimestamp": 1717200000,
    "pushName": "Muhammad Ali"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "action": "LAPORAN_CREATED",
  "data": {
    "laporanId": "lpr_014",
    "wargaId": "wrg_001",
    "konfirmasiTerkirim": true
  }
}
```

---

## 7. Health Check

### `GET /api/health`

Mengecek status kesehatan seluruh komponen sistem. **Tidak memerlukan autentikasi.**

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-06-01T12:00:00Z",
  "uptime": "72h 15m 30s",
  "version": "1.0.0",
  "services": {
    "database": {
      "status": "connected",
      "latency": "2ms"
    },
    "evolutionApi": {
      "status": "connected",
      "whatsappState": "open",
      "latency": "15ms"
    },
    "n8n": {
      "status": "connected",
      "activeWorkflows": 3,
      "latency": "8ms"
    }
  }
}
```

**Response (503 Service Unavailable):**
```json
{
  "status": "degraded",
  "timestamp": "2026-06-01T12:00:00Z",
  "services": {
    "database": { "status": "connected" },
    "evolutionApi": { "status": "disconnected", "error": "QR Code expired" },
    "n8n": { "status": "connected" }
  }
}
```

---

## 8. Error Codes

### Format Error Response Standar

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Pesan error yang bisa dibaca manusia.",
    "details": []
  }
}
```

### Daftar Error Codes

| HTTP Status | Code | Deskripsi |
|-------------|------|-----------|
| 400 | `VALIDATION_ERROR` | Data request tidak valid |
| 401 | `AUTH_UNAUTHORIZED` | Belum login / token expired |
| 401 | `AUTH_INVALID_CREDENTIALS` | Email atau password salah |
| 403 | `AUTH_FORBIDDEN` | Tidak punya akses (role tidak cukup) |
| 404 | `NOT_FOUND` | Resource tidak ditemukan |
| 409 | `DUPLICATE_ENTRY` | Data duplikat (misal nomor WA sudah ada) |
| 422 | `UNPROCESSABLE_ENTITY` | Request valid secara format tapi tidak bisa diproses |
| 429 | `RATE_LIMITED` | Terlalu banyak request (max 100 req/menit) |
| 500 | `INTERNAL_ERROR` | Kesalahan server internal |
| 502 | `GATEWAY_ERROR` | Evolution API / layanan eksternal tidak bisa dijangkau |
| 503 | `SERVICE_UNAVAILABLE` | Sistem sedang maintenance |

---

## 📌 Rate Limiting

| Endpoint | Limit |
|----------|-------|
| `POST /api/auth/login` | 5 request / menit / IP |
| `POST /api/broadcast/*` | 2 request / menit |
| `POST /api/webhook/*` | 100 request / menit |
| Semua endpoint lain | 60 request / menit |
