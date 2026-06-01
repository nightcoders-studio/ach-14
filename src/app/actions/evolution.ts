"use server";

import prisma from "@/lib/prisma";

async function getEvolutionSettings() {
  const settings = await prisma.systemSetting.findMany({
    where: { 
      key: { 
        in: ["EVOLUTION_API_URL", "EVOLUTION_INSTANCE_NAME", "EVOLUTION_GLOBAL_KEY"] 
      } 
    }
  });
  
  return settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function checkEvolutionConnection() {
  try {
    const settings = await getEvolutionSettings();
    const url = settings["EVOLUTION_API_URL"]?.replace(/\/$/, "");
    const instance = settings["EVOLUTION_INSTANCE_NAME"];
    const apiKey = settings["EVOLUTION_GLOBAL_KEY"];
    
    if (!url || !instance || !apiKey) {
      return { success: false, error: "Konfigurasi Evolution API belum lengkap" };
    }
    
    const response = await fetch(`${url}/instance/connectionState/${instance}`, {
      headers: { "apikey": apiKey },
      cache: "no-store"
    });
    
    if (!response.ok) {
      return { success: false, error: "Gagal terhubung ke server Evolution API" };
    }
    
    const data = await response.json();
    return { success: true, state: data?.instance?.state || data?.state || "unknown" };
  } catch (error: any) {
    return { success: false, error: error.message || "Terjadi kesalahan jaringan" };
  }
}

export async function getEvolutionQRCode() {
  try {
    const settings = await getEvolutionSettings();
    const url = settings["EVOLUTION_API_URL"]?.replace(/\/$/, "");
    const instance = settings["EVOLUTION_INSTANCE_NAME"];
    const apiKey = settings["EVOLUTION_GLOBAL_KEY"];
    
    if (!url || !instance || !apiKey) {
      return { success: false, error: "Konfigurasi Evolution API belum lengkap" };
    }
    
    const response = await fetch(`${url}/instance/connect/${instance}`, {
      headers: { "apikey": apiKey },
      cache: "no-store"
    });
    
    if (!response.ok) {
      return { success: false, error: "Gagal mendapatkan QR Code dari server" };
    }
    
    const data = await response.json();
    return { success: true, base64: data?.base64 };
  } catch (error: any) {
    return { success: false, error: error.message || "Terjadi kesalahan jaringan" };
  }
}

export async function testEvolutionMessage(targetNumber: string) {
  try {
    const settings = await getEvolutionSettings();
    const url = settings["EVOLUTION_API_URL"]?.replace(/\/$/, "");
    const instance = settings["EVOLUTION_INSTANCE_NAME"];
    const apiKey = settings["EVOLUTION_GLOBAL_KEY"];
    
    if (!url || !instance || !apiKey) {
      return { success: false, error: "Konfigurasi Evolution API belum lengkap" };
    }
    
    const response = await fetch(`${url}/message/sendText/${instance}`, {
      method: "POST",
      headers: { 
        "apikey": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        number: targetNumber,
        text: "✅ *TESTING BERHASIL*\n\nPesan ini adalah pesan uji coba dari Gampong Alert Hub. Jika Anda menerima pesan ini, artinya integrasi Evolution API telah berfungsi dengan baik!",
        options: {
          delay: 1200,
          presence: "composing"
        }
      }),
      cache: "no-store"
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { success: false, error: errData?.message?.message || errData?.message || errData?.response?.message || "Gagal mengirim pesan test ke server Evolution API" };
    }
    
    return { success: true, message: "Pesan test berhasil dikirim!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Terjadi kesalahan jaringan" };
  }
}
