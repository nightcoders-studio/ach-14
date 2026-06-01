"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.systemSetting.findMany();
    // Convert array of {key, value} to an object
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
    
    return { success: true, data: settingsObj };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return { success: false, error: "Gagal mengambil pengaturan" };
  }
}

export async function updateSettings(newSettings: Record<string, string>) {
  try {
    // Gunakan transaksi untuk update banyak setting sekaligus
    await prisma.$transaction(
      Object.entries(newSettings).map(([key, value]) => {
        return prisma.systemSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      })
    );

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Pengaturan berhasil disimpan" };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Gagal menyimpan pengaturan" };
  }
}
