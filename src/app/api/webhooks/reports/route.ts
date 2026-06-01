import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
    const { phone, type, description, location } = body;

    if (!phone || !type || !description || !location) {
      return NextResponse.json({ success: false, error: "Payload tidak lengkap. Membutuhkan: phone, type, description, location" }, { status: 400 });
    }

    // 3. Bersihkan Nomor HP
    // Menghapus format seperti "@s.whatsapp.net" atau "+"
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("08")) {
      cleanPhone = "628" + cleanPhone.substring(2);
    }

    // 4. Cari Warga berdasarkan Nomor HP
    const citizen = await prisma.citizen.findUnique({
      where: { phone: cleanPhone }
    });

    if (!citizen) {
      return NextResponse.json({ success: false, error: "Nomor telepon belum terdaftar sebagai warga" }, { status: 404 });
    }

    // 5. Validasi tipe laporan (KEBAKARAN, LISTRIK, KEAMANAN, BANJIR, LAINNYA)
    const validTypes = ["KEBAKARAN", "LISTRIK", "KEAMANAN", "BANJIR", "LAINNYA"];
    const reportType = validTypes.includes(type.toUpperCase()) ? type.toUpperCase() : "LAINNYA";

    // 6. Buat Laporan di Database
    const newReport = await prisma.report.create({
      data: {
        type: reportType as any,
        description,
        location,
        citizenId: citizen.id,
        status: "PENDING",
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Laporan berhasil dibuat",
      data: newReport
    }, { status: 201 });

  } catch (error: any) {
    console.error("Report Webhook Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
