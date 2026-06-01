"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, LayoutDashboard, BellRing, FileText, Users, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export default function SidebarClient({ session, children }: { session: any, children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Peringatan", icon: BellRing, path: "/dashboard/alerts" },
    { name: "Laporan Warga", icon: FileText, path: "/dashboard/reports" },
    { name: "Warga", icon: Users, path: "/dashboard/citizens" },
    { name: "Galeri PDF", icon: FileText, path: "/dashboard/documents" },
    { name: "Pengaturan", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="h-screen bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/50 flex flex-col z-20 shrink-0 transition-all duration-300"
      >
        <div className="h-16 flex items-center px-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <Link href="/dashboard" className={`flex items-center gap-2 overflow-hidden ${isSidebarOpen ? '' : 'justify-center'}`}>
            <div className="p-1.5 bg-primary rounded-lg shrink-0">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            {isSidebarOpen && <span className="font-bold text-lg whitespace-nowrap">Gampong Hub</span>}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 mb-4 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="font-bold text-primary">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="font-bold text-primary">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
          
          <Button
            variant="destructive"
            className={`w-full justify-start ${!isSidebarOpen && 'px-0 justify-center'}`}
            onClick={handleLogout}
          >
            <LogOut className={`w-4 h-4 ${isSidebarOpen ? 'mr-2' : ''}`} />
            {isSidebarOpen && "Keluar"}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        <header className="h-16 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center px-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {menuItems.find(i => i.path === pathname)?.name || "Dashboard"}
          </h1>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
