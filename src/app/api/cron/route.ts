import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Di sini Anda bisa menambahkan logika Cron Job, misalnya:
    // 1. Membersihkan data sesi (session) yang sudah kadaluarsa
    // 2. Mengecek status layanan pihak ketiga (Evolution API)
    // 3. Mengirim rekap laporan harian

    // Contoh: Membersihkan Session yang kedaluwarsa
    const deletedSessions = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });

    console.log(`[CRON] Berhasil menghapus ${deletedSessions.count} sesi kedaluwarsa.`);

    return NextResponse.json({ 
      success: true, 
      message: "Cron job berhasil dieksekusi",
      deletedSessions: deletedSessions.count
    });
  } catch (error: any) {
    console.error("[CRON] Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
