import prisma from "@/lib/prisma";

export interface WhatsAppResponse {
  success: boolean;
  detail?: string;
  ids?: string[];
}

export async function sendWhatsAppMessage(targetNumbers: string[], message: string): Promise<WhatsAppResponse> {
  try {
    // 1. Ambil konfigurasi dari database
    const settingsRaw = await prisma.systemSetting.findMany({
      where: { 
        key: { 
          in: ["EVOLUTION_API_URL", "EVOLUTION_INSTANCE_NAME", "EVOLUTION_GLOBAL_KEY"] 
        } 
      }
    });
    
    const settings = settingsRaw.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const url = settings["EVOLUTION_API_URL"]?.replace(/\/$/, "");
    const instance = settings["EVOLUTION_INSTANCE_NAME"];
    const apiKey = settings["EVOLUTION_GLOBAL_KEY"];

    // 2. Jika tidak ada API KEY, jalankan Mode Simulasi (Mock)
    if (!url || !instance || !apiKey) {
      console.log("🛠️ [MOCK WHATSAPP] Memulai siaran simulasi (Evolution API belum dikonfigurasi)...");
      console.log(`📡 Target: ${targetNumbers.join(", ")}`);
      console.log(`✉️ Pesan:\n${message}`);
      return { success: true, detail: "SIMULATED_SUCCESS_NO_CONFIG" };
    }

    // 3. Kirim via Evolution API secara berurutan agar tidak diblokir
    console.log(`🚀 [EVOLUTION API] Memulai pengiriman ke ${targetNumbers.length} nomor...`);
    let successCount = 0;
    
    for (const number of targetNumbers) {
      try {
        // Pastikan nomor berformat internasional (628...)
        let formattedNumber = number.replace(/\D/g, "");
        if (formattedNumber.startsWith("08")) {
          formattedNumber = "628" + formattedNumber.substring(2);
        }

        const response = await fetch(`${url}/message/sendText/${instance}`, {
          method: "POST",
          headers: { 
            "apikey": apiKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            number: formattedNumber,
            text: message,
            options: {
              delay: 1200,
              presence: "composing"
            }
          }),
        });
        
        if (response.ok) {
          successCount++;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error(`❌ Gagal mengirim ke ${formattedNumber}, status: ${response.status}, error:`, errData);
        }
      } catch (err: any) {
        console.error(`❌ Gagal mengirim ke ${number}:`, err.message);
      }
    }

    console.log(`✅ [EVOLUTION API] Selesai. Berhasil mengirim pesan ke ${successCount}/${targetNumbers.length} nomor.`);
    return { success: true, detail: `SENT_${successCount}` };

  } catch (error: any) {
    console.error(`❌ [WHATSAPP CATCH] Terjadi kesalahan:`, error.message);
    return { success: false, detail: error.message };
  }
}

