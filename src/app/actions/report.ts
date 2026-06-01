"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ReportStatus } from "@prisma/client";

export async function getReports() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        citizen: true, // Sertakan data warga yang melaporkan
      }
    });
    return { success: true, data: reports };
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return { success: false, error: "Gagal mengambil data laporan" };
  }
}

export async function updateReportStatus(id: string, status: ReportStatus) {
  try {
    const updated = await prisma.report.update({
      where: { id },
      data: { status },
      include: { citizen: true }
    });
    revalidatePath("/dashboard/reports");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update report status:", error);
    return { success: false, error: "Gagal memperbarui status laporan" };
  }
}
