import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Sedang melakukan seeding (pengisian awal) System Settings...');

  const settingsToSeed = [
    // --- Kategori: Identitas & Geografi Gampong ---
    { key: "GAMPONG_NAME", value: "Balee", description: "Nama Desa/Gampong" },
    { key: "GAMPONG_KECAMATAN", value: "Meureudu", description: "Nama Kecamatan" },
    { key: "GAMPONG_KABUPATEN", value: "Pidie Jaya", description: "Nama Kabupaten/Kota" },
    { key: "GAMPONG_PROVINSI", value: "Aceh", description: "Nama Provinsi" },
    { key: "GAMPONG_LATITUDE", value: "5.2415", description: "Titik koordinat Latitude (Garis Lintang)" },
    { key: "GAMPONG_LONGITUDE", value: "96.2570", description: "Titik koordinat Longitude (Garis Bujur)" },
    { key: "GAMPONG_RADIUS_KM", value: "50", description: "Radius terdampak maksimal (dalam KM). Gempa di luar radius ini diabaikan." },

    // --- Kategori: Messaging (WhatsApp) ---
    { key: "ACTIVE_WHATSAPP_PROVIDER", value: "EVOLUTION", description: "Provider WhatsApp utama yang digunakan sistem (FONNTE, EVOLUTION, WAHA, WATI)" },
    { key: "FONNTE_API_KEY", value: "masukkan_token_fonnte_anda", description: "API Key untuk provider Fonnte" },
    { key: "EVOLUTION_INSTANCE_NAME", value: "gampong-hub-1", description: "Nama instance Evolution API" },
    { key: "EVOLUTION_API_URL", value: "http://localhost:8080", description: "URL Endpoint Evolution API" },
    { key: "EVOLUTION_GLOBAL_KEY", value: "secret_evolution_key", description: "Global API Key Evolution" },
    { key: "WAHA_API_URL", value: "http://waha.local:3000", description: "URL Endpoint WAHA" },
    { key: "WAHA_SESSION_ID", value: "default", description: "Session ID untuk WAHA" },
    { key: "WATI_ACCESS_TOKEN", value: "wati_bearer_token", description: "Access Token WATI" },
    { key: "WATI_API_ENDPOINT", value: "https://live-server.wati.io", description: "API Endpoint WATI" },
    
    // --- Kategori: Public APIs ---
    { key: "BMKG_ENDPOINT_GEMPA", value: "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json", description: "URL Data Gempa Bumi BMKG Terkini" },
    { key: "BMKG_MIN_MAGNITUDE", value: "5.0", description: "Ambang batas SR untuk menyalakan peringatan otomatis" },
    { key: "WEBHOOK_SECRET", value: "gampong_rahasia_123", description: "Token untuk memvalidasi request dari instansi luar (PLN/Damkar)" },

    // --- Kategori: Alert Templates ---
    { key: "ALERT_HEADER_CRITICAL", value: "🚨 *PERINGATAN DARURAT GAMPONG* 🚨", description: "Teks judul peringatan darurat" },
    { key: "ALERT_HEADER_INFO", value: "ℹ️ *PENGUMUMAN GAMPONG*", description: "Teks judul pengumuman biasa" },
    { key: "ALERT_TEMPLATE", value: "{header}\n\nSumber Info: {source}\nLokasi/Kejadian: *{title}*\n\n{message}\n\nHarap segera mengevakuasi diri sesuai arahan aparat desa jika diperlukan.\n\n_Pesan otomatis Gampong Alert Hub_", description: "Template dasar pengiriman pesan siaran (Broadcast)" },
  ];

  for (const setting of settingsToSeed) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ Seeding berhasil! Data pengaturan bawaan (default) telah dimuat ke database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
