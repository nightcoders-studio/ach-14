"use server";

import prisma from "@/lib/prisma";

export interface DailyForecast {
  time: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

export interface WeatherInfo {
  temperature: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  villageName: string;
  forecasts: DailyForecast[];
}

export async function getVillageWeather() {
  try {
    // 1. Ambil koordinat desa dari pengaturan database
    const settings = await prisma.systemSetting.findMany({
      where: {
        key: {
          in: ["GAMPONG_LATITUDE", "GAMPONG_LONGITUDE", "GAMPONG_NAME"]
        }
      }
    });

    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const latitude = settingsMap["GAMPONG_LATITUDE"] || "5.2415"; // Default Balee
    const longitude = settingsMap["GAMPONG_LONGITUDE"] || "96.2570";
    const villageName = settingsMap["GAMPONG_NAME"] || "Gampong";

    // 2. Fetch data cuaca dari Open-Meteo (API gratis, tanpa key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;
    const res = await fetch(url, { next: { revalidate: 300 } }); // Cache 5 menit

    if (!res.ok) {
      throw new Error(`Weather API responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data && data.current) {
      const current = data.current;
      
      const daily = data.daily;
      const forecasts: DailyForecast[] = [];
      
      // index 0 is today, so we take index 1, 2, 3 for the next 3 days
      if (daily && daily.time && daily.time.length >= 4) {
        for (let i = 1; i <= 3; i++) {
          forecasts.push({
            time: daily.time[i],
            tempMax: daily.temperature_2m_max[i],
            tempMin: daily.temperature_2m_min[i],
            weatherCode: daily.weather_code[i]
          });
        }
      }

      const weatherInfo: WeatherInfo = {
        temperature: current.temperature_2m,
        windSpeed: current.wind_speed_10m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        villageName,
        forecasts
      };

      return { success: true, data: weatherInfo };
    }

    return { success: false, error: "Format data cuaca tidak sesuai" };
  } catch (error) {
    console.error("Failed to fetch Weather Data:", error);
    return { success: false, error: "Gagal menyambung ke server cuaca" };
  }
}
