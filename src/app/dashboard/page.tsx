import { getLatestEarthquake } from "@/app/actions/bmkg";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const bmkgRes = await getLatestEarthquake();
  const bmkgData = bmkgRes.success && bmkgRes.data ? bmkgRes.data : null;

  return <DashboardClient bmkgData={bmkgData} />;
}
