import { getLatestEarthquake } from "@/app/actions/bmkg";
import { getVillageWeather } from "@/app/actions/weather";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const [bmkgRes, weatherRes] = await Promise.all([
    getLatestEarthquake(),
    getVillageWeather()
  ]);

  const bmkgData = bmkgRes.success && bmkgRes.data ? bmkgRes.data : null;
  const weatherData = weatherRes.success && weatherRes.data ? weatherRes.data : null;

  return <DashboardClient bmkgData={bmkgData} weatherData={weatherData} />;
}
