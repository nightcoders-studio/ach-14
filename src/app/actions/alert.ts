"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { sendEmergencyEmail } from "@/lib/email";

export async function getAlerts() {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: alerts };
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return { success: false, error: "Gagal mengambil data peringatan" };
  }
}

export async function createAlert(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const source = formData.get("source") as "BMKG" | "GEUCHIK";
    const severity = formData.get("severity") as "INFO" | "WARNING" | "CRITICAL";

    if (!title || !message || !source || !severity) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    // 1. Simpan Peringatan ke Database
    const newAlert = await prisma.alert.create({
      data: { title, message, source, severity },
    });

    // 2. Ambil Semua Warga Aktif
    const activeCitizens = await prisma.citizen.findMany({
      where: { isActive: true },
      select: { phone: true }
    });

    if (activeCitizens.length > 0) {
      const targetNumbers = activeCitizens.map(c => c.phone);
      
      // Format pesan WhatsApp agar rapi
      const waMessage = `*${title.toUpperCase()}*\n\n` +
                        `${message}\n\n` +
                        `🚨 *Tingkat Bahaya:* ${severity}\n` +
                        `📢 *Sumber:* ${source === 'BMKG' ? 'BMKG' : 'Aparatur Gampong'}\n` +
                        `\n_Pesan Otomatis Gampong Alert Hub_`;

      // 3. Siarkan Pesan WhatsApp (Tanpa memblokir thread terlalu lama)
      // Sengaja tidak di-await secara blocking penuh atau setidaknya kita tangkap responnya
      const waResponse = await sendWhatsAppMessage(targetNumbers, waMessage);

      const status = waResponse.success ? "SENT" : "FAILED";

      // 4. Catat ke dalam AlertLog untuk setiap warga
      const logEntries = targetNumbers.map(phone => ({
        alertId: newAlert.id,
        phone: phone,
        status: status,
      }));

      await prisma.alertLog.createMany({
        data: logEntries
      });
    }

    // 5. Jika tingkat bahaya CRITICAL, kirim email ke Instansi/Pusat
    if (severity === "CRITICAL") {
      // Tidak di-await penuh agar tidak memblokir UI
      sendEmergencyEmail(title, message, severity, source);
    }

    revalidatePath("/dashboard/alerts");
    return { success: true, data: newAlert };
  } catch (error) {
    console.error("Failed to create alert & broadcast:", error);
    return { success: false, error: "Gagal menyiarkan peringatan" };
  }
}
