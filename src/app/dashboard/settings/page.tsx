import { getSettings } from "@/app/actions/settings";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
  // Ambil pengaturan dari Database (Server Side)
  const res = await getSettings();
  
  // Berikan default kosong jika gagal (meskipun jarang terjadi)
  const settings = res.success && res.data ? res.data : {};

  return (
    <SettingsClient initialSettings={settings} />
  );
}
