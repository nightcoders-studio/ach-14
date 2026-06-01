import { getCitizens } from "@/app/actions/citizen";
import CitizensClient from "./citizens-client";

export default async function CitizensPage() {
  const response = await getCitizens();
  
  // Jika gagal atau data tidak ada, kita pass array kosong
  const initialCitizens = response.success && response.data ? response.data : [];

  return <CitizensClient initialCitizens={initialCitizens} />;
}
