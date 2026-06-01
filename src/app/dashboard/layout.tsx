import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SidebarClient from "./sidebar-client";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Ambil session langsung di server, kebal terhadap Invalid Hook Call
  const sessionData = await auth.api.getSession({
    headers: await headers()
  });

  if (!sessionData?.session) {
    redirect("/login");
  }

  return (
    <SidebarClient session={sessionData.session}>
      {children}
    </SidebarClient>
  );
}
