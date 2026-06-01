import { getAlerts } from "@/app/actions/alert";
import AlertsClient from "./alerts-client";

export default async function AlertsPage() {
  const response = await getAlerts();
  
  // Jika gagal atau data tidak ada, pass array kosong
  const initialAlerts = response.success && response.data ? response.data : [];

  return <AlertsClient initialAlerts={initialAlerts} />;
}
