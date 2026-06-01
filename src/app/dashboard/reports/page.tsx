import { getReports } from "@/app/actions/report";
import ReportsClient from "./reports-client";

export default async function ReportsPage() {
  const response = await getReports();
  
  // Jika gagal atau data tidak ada, pass array kosong
  const initialReports = response.success && response.data ? response.data : [];

  return <ReportsClient initialReports={initialReports as any} />;
}
