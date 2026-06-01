import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

// Kunci rahasia sederhana untuk autentikasi instansi (Dalam produksi, gunakan Bearer Token)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "gampong_alert_webhook_2026_xyz";

export async function POST(req: Request) {
  try {
    // 1. Autentikasi Permintaan
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parsing Payload
    const body = await req.json();
    const { title, message, source, severity } = body;

    if (!title || !message || !source || !severity) {
      return NextResponse.json({ success: false, error: "Payload tidak lengkap. Membutuhkan: title, message, source, severity" }, { status: 400 });
    }

    // 3. Simpan Alert ke Database
    const newAlert = await prisma.alert.create({
      data: { 
        title, 
        message, 
        source: source === "BMKG" ? "BMKG" : "GEUCHIK", // Mapping sederhana
        severity 
      },
    });

    // 4. Siarkan via WhatsApp
    const activeCitizens = await prisma.citizen.findMany({
      where: { isActive: true },
      select: { phone: true }
    });

    if (activeCitizens.length > 0) {
      const targetNumbers = activeCitizens.map(c => c.phone);
      
      const waMessage = `*🚨 ALERT DARI ${source.toUpperCase()} 🚨*\n\n` +
                        `*${title.toUpperCase()}*\n\n` +
                        `${message}\n\n` +
                        `⚠️ *Tingkat Bahaya:* ${severity}\n` +
                        `\n_Pesan Otomatis Gampong Alert Hub_`;

      // Eksekusi siaran tanpa ditunggu (fire-and-forget logic bisa dilakukan, 
      // tapi kita await untuk mencatat log)
      const waResponse = await sendWhatsAppMessage(targetNumbers, waMessage);
      const status = waResponse.success ? "SENT" : "FAILED";

      // Catat log
      const logEntries = targetNumbers.map(phone => ({
        alertId: newAlert.id,
        phone: phone,
        status: status,
      }));

      await prisma.alertLog.createMany({ data: logEntries });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Webhook diterima dan siaran berhasil dieksekusi",
      data: newAlert
    }, { status: 201 });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
