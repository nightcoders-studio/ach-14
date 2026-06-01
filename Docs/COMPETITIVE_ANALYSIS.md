# 🔍 Competitive Analysis — Gampong Alert Hub

> **Tanggal:** 1 Juni 2026  
> **Tujuan:** Menganalisis lanskap kompetitif untuk memposisikan Gampong Alert Hub secara strategis.

---

## 1. Peta Kompetitor

### 1.1 Kompetitor Langsung (Direct)

Solusi yang secara spesifik menangani peringatan bencana dan/atau tata kelola desa.

| Kompetitor | Deskripsi | Target | Model |
|-----------|-----------|--------|-------|
| **InaBMKG** (BMKG Official App) | Aplikasi resmi BMKG untuk notifikasi gempa & cuaca | Publik umum | Gratis |
| **SIGAP BPBD** | Sistem informasi bencana dari BPBD Aceh | Pemerintah daerah | Government |
| **OpenSID** | Sistem Informasi Desa open-source | Pemerintah desa | Open-source |
| **Digides / Sideka** | Platform tata kelola desa digital | Pemerintah desa | SaaS |

### 1.2 Kompetitor Tidak Langsung (Indirect)

Solusi yang menangani sebagian masalah yang sama tetapi dengan pendekatan berbeda.

| Kompetitor | Deskripsi | Target | Model |
|-----------|-----------|--------|-------|
| **Lapor!** (SP4N) | Platform pengaduan nasional | Publik umum | Government |
| **Qlue** | Smart city platform (pelaporan & monitoring) | Pemkot/Pemkab | SaaS B2G |
| **Jitsi / Telegram Bot** | Solusi komunikasi custom | Komunitas | Open-source |
| **Grup WhatsApp Manual** | Komunikasi informal via grup WA | Warga desa | Gratis |

---

## 2. Perbandingan Fitur Detail

### Matriks Perbandingan Fitur

| Fitur | GAH 🚨 | InaBMKG | OpenSID | Qlue | Grup WA |
|-------|:------:|:-------:|:-------:|:----:|:-------:|
| **Peringatan bencana otomatis** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Spesifik level desa** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Broadcast via WhatsApp** | ✅ | ❌ | ❌ | ❌ | ⚠️ Manual |
| **Laporan warga two-way** | ✅ | ❌ | ⚠️ Web only | ✅ | ⚠️ Informal |
| **Dashboard admin** | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Tanpa install app baru** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Self-hosted (edge)** | ✅ | ❌ | ✅ | ❌ | N/A |
| **Biaya cloud Rp 0** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Generate laporan PDF** | ✅ | ❌ | ✅ | ✅ | ❌ |
| **RBAC (multi-role)** | ✅ | N/A | ✅ | ✅ | ❌ |
| **Data tracking & audit** | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Real-time notification** | ✅ | ✅ | ❌ | ✅ | ⚠️ |
| **Konteks lokal Aceh** | ✅ | ❌ | ❌ | ❌ | ⚠️ |

**Legenda:** ✅ = Ada & lengkap · ⚠️ = Terbatas · ❌ = Tidak ada · N/A = Tidak relevan

---

## 3. Analisis Per Kompetitor

### 3.1 InaBMKG (Aplikasi BMKG)

| Aspek | Detail |
|-------|--------|
| **Kelebihan** | Data gempa resmi, notifikasi push, peta seismik, gratis |
| **Kekurangan** | Butuh install app, tidak spesifik level desa, tidak ada fitur laporan warga, tidak ada dashboard admin desa |
| **Celah GAH** | InaBMKG hanya *one-way* ke publik umum. GAH menjembatani data BMKG → WhatsApp warga desa secara otomatis + two-way reporting |

### 3.2 OpenSID (Sistem Informasi Desa)

| Aspek | Detail |
|-------|--------|
| **Kelebihan** | Open-source, fitur administrasi desa lengkap (surat, statistik), komunitas besar, self-hosted |
| **Kekurangan** | Tidak ada integrasi bencana, tidak ada WhatsApp gateway, UI lawas (PHP/jQuery), fokus di administrasi bukan darurat |
| **Celah GAH** | OpenSID fokus administrasi; GAH fokus *emergency response*. Keduanya **komplementer** — bisa diintegrasikan |

### 3.3 Qlue

| Aspek | Detail |
|-------|--------|
| **Kelebihan** | Platform matang, fitur lengkap (IoT, CCTV, analytics), sudah dipakai Pemkot Jakarta |
| **Kekurangan** | Mahal (enterprise pricing), butuh install app Qlue, overkill untuk desa, tidak ada fitur BMKG auto-broadcast |
| **Celah GAH** | Qlue dirancang untuk kota besar. GAH dirancang khusus untuk desa dengan constraint (anggaran kecil, literasi digital terbatas, infrastruktur minim) |

### 3.4 Grup WhatsApp Manual

| Aspek | Detail |
|-------|--------|
| **Kelebihan** | Gratis, sudah familiar, tidak perlu setup |
| **Kekurangan** | Tidak terstruktur, rawan hoax, laporan hilang di chat, tidak ada tracking/audit, admin overwhelmed |
| **Celah GAH** | GAH mem-*formalisasi* dan meng-*otomasi* apa yang selama ini dilakukan secara manual di grup WA. Data tercatat, terstruktur, dan bisa di-audit |

---

## 4. Positioning Map

```
                    FOKUS BENCANA
                        │
                        │     InaBMKG
                        │        ●
          GAH 🚨        │
            ●           │
                        │
 LEVEL ─────────────────┼──────────────── LEVEL
 DESA                   │                 NASIONAL
                        │
          OpenSID       │
            ●           │        Qlue
                        │         ●
                        │
                    FOKUS ADMINISTRASI
```

**Posisi GAH:** Satu-satunya solusi yang berada di kuadran **Fokus Bencana + Level Desa** — *blue ocean* yang belum diisi kompetitor.

---

## 5. Analisis SWOT

### Strengths (Kekuatan) 💪
- Zero-install untuk warga (WhatsApp)
- Self-hosted → biaya cloud Rp 0
- Data bencana otomatis dari BMKG (bukan manual)
- Stack modern & open-source (tidak ada vendor lock-in)
- Dirancang khusus untuk konteks Aceh (bencana rawan)
- UI premium (glassmorphism) — setara enterprise

### Weaknesses (Kelemahan) ⚠️
- Belum ada user base / validasi lapangan
- Masih MVP — fitur belum selengkap OpenSID (administrasi)
- Bergantung pada Evolution API (unofficial WhatsApp)
- Memerlukan hardware (mini PC) di Balai Desa
- Tim kecil — kapasitas pengembangan terbatas

### Opportunities (Peluang) 🌟
- 6.517 Gampong di Aceh — pasar besar, belum ada solusi sejenis
- Program Desa Digital Kominfo → potensi hibah/subsidi
- Aceh zona rawan bencana → kebutuhan nyata dan mendesak
- CSR perusahaan besar (PLN, Pertamina, Bank Aceh)
- Bisa diperluas ke provinsi lain yang rawan bencana

### Threats (Ancaman) 🔴
- WhatsApp mengubah kebijakan API / memblokir nomor
- BMKG mengubah format data / membatasi akses
- Pemerintah membuat solusi serupa secara nasional
- Resistensi perangkat desa terhadap teknologi baru
- Infrastruktur internet desa tidak stabil

---

## 6. Competitive Advantage Summary

### Moat (Keunggulan Kompetitif Berkelanjutan)

| Jenis Moat | Bagaimana GAH Membangunnya |
|-----------|---------------------------|
| **Network Effect** | Semakin banyak warga terdaftar → semakin bernilai sistem → semakin banyak desa tertarik |
| **Switching Cost** | Setelah data warga & laporan terakumulasi, biaya pindah ke sistem lain tinggi |
| **Local Knowledge** | Pemahaman mendalam tentang konteks Aceh (bahasa, budaya, struktur pemerintahan gampong) tidak mudah ditiru oleh kompetitor nasional |
| **Open-Source Community** | Jika di-open-source → kontributor membantu → produk makin baik → moat makin kuat |

---

## 7. Strategi Go-to-Market

### Fase 1: Validate (Bulan 1-2)
- Pilot di **1 Gampong** → kumpulkan feedback → iterasi
- Target: 50 warga terdaftar, 10 laporan/bulan

### Fase 2: Expand (Bulan 3-4)
- Scaling ke **10 Gampong** di 1 kecamatan
- Presentasi di forum **Musrenbang** kecamatan
- Jalin kemitraan dengan **Dinas Kominfo Aceh**

### Fase 3: Scale (Bulan 5-8)
- Target **100 Gampong** di 1 kabupaten
- Multi-tenant architecture
- Hire tim support & account manager

### Fase 4: Dominate (Bulan 9-12)
- Ekspansi ke **provinsi lain** yang rawan bencana (Sulawesi, NTT, Jawa)
- Ajukan sebagai **standar nasional** via Kemendes
