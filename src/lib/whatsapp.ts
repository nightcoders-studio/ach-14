/**
 * WhatsApp Messaging Service
 * Terintegrasi dengan Fonnte API (atau Evolution API)
 */

export interface WhatsAppResponse {
  success: boolean;
  detail?: string;
  ids?: string[];
}

export async function sendWhatsAppMessage(targetNumbers: string[], message: string): Promise<WhatsAppResponse> {
  const API_KEY = process.env.FONNTE_API_KEY;
  const API_URL = "https://api.fonnte.com/send"; // Bisa diganti ke endpoint Evolution API

  // Jika tidak ada API KEY, kita jalankan Mode Simulasi (Mock)
  if (!API_KEY) {
    console.log("🛠️ [MOCK WHATSAPP] Memulai siaran simulasi...");
    console.log(`📡 Target: ${targetNumbers.join(", ")}`);
    console.log(`✉️ Pesan:\n${message}`);
    console.log("✅ [MOCK WHATSAPP] Siaran simulasi berhasil dikirim.");
    return { success: true, detail: "SIMULATED_SUCCESS" };
  }

  try {
    // Fonnte mendukung pengiriman masal dengan memisahkan nomor menggunakan koma
    const targets = targetNumbers.join(",");

    const formData = new FormData();
    formData.append("target", targets);
    formData.append("message", message);
    formData.append("delay", "2"); // Jeda 2 detik antar pesan agar tidak diblokir WhatsApp

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
      },
      body: formData,
    });

    const data = await response.json();

    if (data.status) {
      console.log(`✅ [WHATSAPP] Berhasil mengirim pesan ke ${targetNumbers.length} nomor.`);
      return { success: true, detail: "SENT", ids: data.id };
    } else {
      console.error(`❌ [WHATSAPP ERROR] Fonnte API Error:`, data.reason);
      return { success: false, detail: data.reason };
    }
  } catch (error: any) {
    console.error(`❌ [WHATSAPP CATCH] Terjadi kesalahan saat fetch API:`, error.message);
    return { success: false, detail: error.message };
  }
}
