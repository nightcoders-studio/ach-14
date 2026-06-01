"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCitizens() {
  try {
    const citizens = await prisma.citizen.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: citizens };
  } catch (error) {
    console.error("Failed to fetch citizens:", error);
    return { success: false, error: "Gagal mengambil data warga" };
  }
}

export async function addCitizen(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const lorong = formData.get("lorong") as string;

    if (!name || !phone || !lorong) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    const newCitizen = await prisma.citizen.create({
      data: {
        name,
        phone,
        lorong,
        isActive: true,
      },
    });

    revalidatePath("/dashboard/citizens");
    return { success: true, data: newCitizen };
  } catch (error: any) {
    console.error("Failed to add citizen:", error);
    if (error.code === 'P2002') {
      return { success: false, error: "Nomor WhatsApp sudah terdaftar" };
    }
    return { success: false, error: "Gagal menambahkan warga" };
  }
}

export async function deleteCitizen(id: string) {
  try {
    await prisma.citizen.delete({
      where: { id },
    });
    revalidatePath("/dashboard/citizens");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete citizen:", error);
    return { success: false, error: "Gagal menghapus warga" };
  }
}

export async function toggleCitizenStatus(id: string, currentStatus: boolean) {
  try {
    const updated = await prisma.citizen.update({
      where: { id },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/dashboard/citizens");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Gagal memperbarui status warga" };
  }
}
