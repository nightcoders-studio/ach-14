"use server";

export interface GempaInfo {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
  Dirasakan: string;
  Shakemap: string;
}

export async function getLatestEarthquake() {
  try {
    const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
    const res = await fetch(url, { next: { revalidate: 300 } }); // Cache 5 menit

    if (!res.ok) {
      throw new Error(`BMKG API responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data && data.Infogempa && data.Infogempa.gempa) {
      const gempa: GempaInfo = data.Infogempa.gempa;
      return { success: true, data: gempa };
    }

    return { success: false, error: "Format data BMKG tidak sesuai" };
  } catch (error) {
    console.error("Failed to fetch BMKG Data:", error);
    return { success: false, error: "Gagal menyambung ke server BMKG" };
  }
}
