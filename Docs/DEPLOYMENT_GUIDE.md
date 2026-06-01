# 🚀 Panduan Deployment — Gampong Alert Hub

> **Versi:** 1.0  
> **Tanggal:** 1 Juni 2026  
> **Audience:** DevOps Engineer / Tim IT Desa

---

## 1. Prasyarat

### 1.1 Hardware Minimum

| Komponen | Spesifikasi Minimum | Rekomendasi |
|----------|-------------------|-------------|
| CPU | Intel N100 / AMD Ryzen 3 | Intel i3/i5 Gen 12+ |
| RAM | 8 GB | 16 GB |
| Storage | SSD 128 GB | SSD 256 GB |
| Network | Ethernet 100 Mbps | Gigabit Ethernet |
| UPS | 650 VA | 1000 VA |

### 1.2 Software

| Software | Versi | Tujuan |
|----------|-------|--------|
| Proxmox VE | 8.x | Hypervisor (opsional, bisa langsung di OS) |
| Docker | 24.x+ | Containerization |
| Docker Compose | 2.x+ | Multi-container orchestration |
| Coolify | 4.x | Self-hosted PaaS (opsional) |
| Node.js | 18.x+ | Runtime Next.js |
| Git | 2.x+ | Version control |

### 1.3 Akun & Akses

- [ ] Akun GitHub (akses ke repository)
- [ ] Domain atau subdomain (opsional, bisa pakai IP lokal)
- [ ] Nomor WhatsApp dedicated + HP untuk scan QR Code awal
- [ ] Akses SSH ke server

---

## 2. Arsitektur Deployment

```
┌─────────────────────────────────────────────────────┐
│                Server Balai Desa                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │           Docker / Coolify                    │    │
│  │                                               │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐      │    │
│  │  │ Next.js │  │  n8n    │  │Evolution│      │    │
│  │  │  :3000  │  │  :5678  │  │API :8080│      │    │
│  │  └────┬────┘  └────┬────┘  └────┬────┘      │    │
│  │       │            │            │             │    │
│  │  ┌────┴────────────┴────────────┴────┐       │    │
│  │  │         PostgreSQL :5432          │       │    │
│  │  └───────────────────────────────────┘       │    │
│  │                                               │    │
│  │  ┌─────────┐                                  │    │
│  │  │Browserless│ (opsional, untuk PDF)           │    │
│  │  │  :3300  │                                  │    │
│  │  └─────────┘                                  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  Reverse Proxy (Caddy/Nginx) :80 :443               │
└─────────────────────────────────────────────────────┘
```

---

## 3. Langkah Deployment

### 3.1 Persiapan Server

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Verifikasi
docker --version
docker compose version
```

### 3.2 Clone Repository

```bash
# Clone repo
git clone https://github.com/nightcoders-studio/ach-14.git
cd ach-14
```

### 3.3 Konfigurasi Environment

```bash
# Copy template environment
cp .env.example .env

# Edit sesuai konfigurasi lokal
nano .env
```

**File `.env` — Variabel yang perlu diisi:**

```env
# ===== DATABASE =====
DATABASE_URL="postgresql://gah_user:GANTI_PASSWORD_DB@postgres:5432/gampong_alert_hub"
POSTGRES_USER=gah_user
POSTGRES_PASSWORD=GANTI_PASSWORD_DB
POSTGRES_DB=gampong_alert_hub

# ===== NEXT.JS =====
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=GANTI_DENGAN_RANDOM_STRING_32_KARAKTER

# ===== BETTER AUTH =====
BETTER_AUTH_SECRET=GANTI_DENGAN_RANDOM_STRING_LAIN
BETTER_AUTH_URL=http://localhost:3000

# ===== EVOLUTION API =====
EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=GANTI_DENGAN_API_KEY_EVOLUTION
EVOLUTION_INSTANCE_NAME=gampong-hub

# ===== N8N =====
N8N_URL=http://n8n:5678
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=GANTI_PASSWORD_N8N

# ===== WEBHOOK =====
WEBHOOK_SECRET=GANTI_DENGAN_WEBHOOK_SECRET

# ===== BROWSERLESS (Opsional) =====
BROWSERLESS_URL=http://browserless:3000
```

> ⚠️ **PENTING:** Ganti semua nilai `GANTI_*` dengan nilai yang aman. Gunakan `openssl rand -base64 32` untuk generate random string.

### 3.4 Docker Compose

**File `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  # ===== PostgreSQL Database =====
  postgres:
    image: postgres:16-alpine
    container_name: gah-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ===== Next.js Application =====
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: gah-nextjs
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: ${DATABASE_URL}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET}
      EVOLUTION_API_URL: ${EVOLUTION_API_URL}
      EVOLUTION_API_KEY: ${EVOLUTION_API_KEY}
      WEBHOOK_SECRET: ${WEBHOOK_SECRET}
    ports:
      - "3000:3000"

  # ===== n8n Workflow Engine =====
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: gah-n8n
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_BASIC_AUTH_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_BASIC_AUTH_PASSWORD}
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${POSTGRES_DB}
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      - WEBHOOK_URL=http://n8n:5678
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

  # ===== Evolution API (WhatsApp Gateway) =====
  evolution-api:
    image: atendai/evolution-api:latest
    container_name: gah-evolution
    restart: unless-stopped
    environment:
      - AUTHENTICATION_API_KEY=${EVOLUTION_API_KEY}
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=${DATABASE_URL}
    volumes:
      - evolution_data:/evolution/instances
    ports:
      - "8080:8080"

  # ===== Browserless (PDF Generation) =====
  browserless:
    image: ghcr.io/browserless/chromium:latest
    container_name: gah-browserless
    restart: unless-stopped
    environment:
      - TOKEN=browserless_token
      - CONCURRENT=2
      - QUEUED=5
    ports:
      - "3300:3000"

volumes:
  postgres_data:
  n8n_data:
  evolution_data:
```

### 3.5 Build & Start

```bash
# Build dan jalankan semua service
docker compose up -d --build

# Cek status container
docker compose ps

# Lihat logs
docker compose logs -f

# Jalankan migrasi database
docker compose exec nextjs npx prisma migrate deploy

# Seed data awal
docker compose exec nextjs npx prisma db seed
```

### 3.6 Setup WhatsApp (Evolution API)

1. Buka browser → `http://SERVER_IP:8080`
2. Buat instance baru:

```bash
curl -X POST http://SERVER_IP:8080/instance/create \
  -H "apikey: EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "gampong-hub",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

3. Ambil QR Code:

```bash
curl http://SERVER_IP:8080/instance/connect/gampong-hub \
  -H "apikey: EVOLUTION_API_KEY"
```

4. Scan QR Code dari HP WhatsApp → WhatsApp Business → Linked Devices
5. Verifikasi koneksi:

```bash
curl http://SERVER_IP:8080/instance/connectionState/gampong-hub \
  -H "apikey: EVOLUTION_API_KEY"

# Response: { "state": "open" } ← Connected!
```

### 3.7 Setup Webhook Evolution → n8n

```bash
curl -X POST http://SERVER_IP:8080/webhook/set/gampong-hub \
  -H "apikey: EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://n8n:5678/webhook/whatsapp-incoming",
    "webhook_by_events": true,
    "events": ["MESSAGES_UPSERT"]
  }'
```

### 3.8 Import Workflow n8n

1. Buka browser → `http://SERVER_IP:5678`
2. Login dengan kredensial n8n
3. Import workflow:
   - `workflows/bmkg-monitor.json` — Polling BMKG setiap 5 menit
   - `workflows/whatsapp-incoming.json` — Handler pesan masuk warga
   - `workflows/broadcast-emergency.json` — Broadcast peringatan darurat
4. Aktifkan semua workflow

---

## 4. Verifikasi Deployment

### 4.1 Checklist Verifikasi

```bash
# 1. Cek semua container berjalan
docker compose ps
# Expected: semua service "Up" dan "healthy"

# 2. Cek koneksi database
docker compose exec nextjs npx prisma db pull
# Expected: tidak ada error

# 3. Cek dashboard accessible
curl -I http://SERVER_IP:3000
# Expected: HTTP 200 atau 302 (redirect ke login)

# 4. Cek n8n accessible
curl -I http://SERVER_IP:5678
# Expected: HTTP 200

# 5. Cek Evolution API
curl http://SERVER_IP:8080/instance/connectionState/gampong-hub \
  -H "apikey: EVOLUTION_API_KEY"
# Expected: { "state": "open" }

# 6. Cek health endpoint
curl http://SERVER_IP:3000/api/health
# Expected: { "status": "healthy", "services": {...} }

# 7. Test kirim pesan
curl -X POST http://SERVER_IP:8080/message/sendText/gampong-hub \
  -H "apikey: EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "628NOMOR_TEST",
    "text": "✅ Gampong Alert Hub berhasil di-deploy!"
  }'
# Expected: Pesan sampai ke HP
```

### 4.2 Smoke Test End-to-End

| # | Test | Langkah | Expected |
|---|------|---------|----------|
| 1 | Login dashboard | Buka browser → login | Dashboard muncul |
| 2 | Tambah warga | Dashboard → Warga → Tambah | Data tersimpan |
| 3 | Kirim `!lapor` | WA → `!lapor Test deploy` | Konfirmasi diterima + muncul di dashboard |
| 4 | Cek BMKG workflow | n8n → Execute BMKG workflow | Data BMKG masuk ke LogPeringatan |
| 5 | Broadcast test | n8n → Execute broadcast (1 nomor) | Pesan terkirim |

---

## 5. Konfigurasi Produksi

### 5.1 Reverse Proxy (Caddy)

```Caddyfile
# /etc/caddy/Caddyfile

admin.gampong.local {
    reverse_proxy nextjs:3000
}

n8n.gampong.local {
    reverse_proxy n8n:5678
}

wa.gampong.local {
    reverse_proxy evolution-api:8080
}
```

### 5.2 Firewall

```bash
# Hanya buka port yang diperlukan
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 5.3 Backup Otomatis

```bash
# Buat script backup
cat > /opt/gah-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/gah"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
docker compose exec -T postgres pg_dump -U gah_user gampong_alert_hub \
  | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Hapus backup lebih dari 7 hari
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup selesai: $BACKUP_DIR/db_$DATE.sql.gz"
EOF

chmod +x /opt/gah-backup.sh

# Jadwalkan backup harian (jam 2 pagi)
echo "0 2 * * * /opt/gah-backup.sh" | crontab -
```

### 5.4 Monitoring

```bash
# Health check setiap 5 menit via cron
echo "*/5 * * * * curl -sf http://localhost:3000/api/health || \
  curl -X POST http://localhost:8080/message/sendText/gampong-hub \
  -H 'apikey: API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{\"number\": \"628NOMOR_ADMIN\", \"text\": \"⚠️ ALERT: Dashboard GAH tidak merespons!\"}'" \
  | crontab -
```

---

## 6. Prosedur Maintenance

### 6.1 Update Aplikasi

```bash
cd /opt/ach-14

# Pull perubahan terbaru
git pull origin main

# Rebuild container
docker compose up -d --build nextjs

# Jalankan migrasi database (jika ada)
docker compose exec nextjs npx prisma migrate deploy

# Verifikasi
docker compose ps
curl http://localhost:3000/api/health
```

### 6.2 Restart Service

```bash
# Restart satu service
docker compose restart nextjs

# Restart semua service
docker compose restart

# Restart total (down + up)
docker compose down && docker compose up -d
```

### 6.3 Disaster Recovery

```bash
# 1. Stop semua service
docker compose down

# 2. Restore database dari backup
gunzip /opt/backups/gah/db_YYYYMMDD_HHMMSS.sql.gz
docker compose up -d postgres
docker compose exec -T postgres psql -U gah_user -d gampong_alert_hub \
  < /opt/backups/gah/db_YYYYMMDD_HHMMSS.sql

# 3. Start semua service
docker compose up -d

# 4. Re-scan QR Code WhatsApp (jika session expired)
# Ikuti langkah 3.6

# 5. Verifikasi
curl http://localhost:3000/api/health
```

---

## 7. Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|---------|-------|
| Container tidak start | Port sudah dipakai | `docker compose down` → cek `lsof -i :PORT` → kill proses |
| Database connection refused | PostgreSQL belum ready | Tunggu 30 detik, cek `docker compose logs postgres` |
| WhatsApp disconnected | Session expired | Re-scan QR Code via Evolution API |
| n8n workflow error | Kredensial berubah | Update credentials di n8n → Settings → Credentials |
| Dashboard 502 error | Next.js crash | `docker compose logs nextjs` → fix error → rebuild |
| Disk penuh | Log/backup menumpuk | Bersihkan: `docker system prune`, hapus backup lama |
| RAM habis | Container terlalu banyak | Nonaktifkan browserless jika tidak dipakai |
