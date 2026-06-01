import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LandingClient from "./landing-client";

export default async function LandingPage() {
  // Ambil session langsung di server untuk keamanan dan bebas Hook Call error
  const sessionData = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <LandingClient session={sessionData} />
  );
}
