"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BellRing, 
  MessageSquare, 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function LandingClient({ session }: { session: any }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      title: "Auto-Broadcast Mitigasi Bencana",
      description: "Integrasi langsung dengan BMKG. Peringatan dini dikirim otomatis via WhatsApp saat terjadi anomali (gempa, dll).",
      icon: <BellRing className="w-8 h-8 text-rose-500" />
    },
    {
      title: "Two-Way WhatsApp Gateway",
      description: "Lapor kejadian darurat langsung dari WhatsApp tanpa perlu install aplikasi tambahan.",
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Dashboard Eksekutif Geuchik",
      description: "Pemantauan real-time kondisi gampong dan laporan warga dengan antarmuka yang bersih dan interaktif.",
      icon: <LayoutDashboard className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Granular Access Control",
      description: "Keamanan tingkat lanjut dan RBAC untuk memastikan hanya pihak berwenang yang dapat mengakses data sensitif.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />
    },
    {
      title: "Auto-Generate Reports",
      description: "Buat laporan pertanggungjawaban dalam format PDF secara otomatis untuk kebutuhan administrasi Gampong.",
      icon: <FileText className="w-8 h-8 text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-primary/30 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] opacity-50 pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Gampong Alert Hub</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#features" className="hover:text-primary transition-colors">Fitur</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">Cara Kerja</Link>
          </nav>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm font-medium hidden sm:block mr-2 text-zinc-600 dark:text-zinc-400">
                  Hai, {session.user.name.split(" ")[0]}
                </span>
                <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className={buttonVariants({ variant: "ghost", className: "hidden sm:flex" })}>
                  Masuk
                </Link>
                <Link href="/register" className={buttonVariants({ variant: "default" })}>
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4">
          <div className="container mx-auto max-w-6xl flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 px-3 py-1 rounded-full text-sm backdrop-blur-md bg-zinc-200/50 dark:bg-zinc-800/50 border-zinc-300/50 dark:border-zinc-700/50">
                🚀 Solusi Smart Village Aceh
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Sistem Peringatan Dini & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Tata Kelola Cerdas</span> Terintegrasi
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Solusi cerdas berkonsep Edge Computing untuk memecahkan masalah distribusi informasi darurat dan pelaporan warga tingkat desa melalui WhatsApp.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-8 h-12 text-base group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/10 dark:bg-black/10">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-zinc-100/50 dark:bg-zinc-900/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Fitur Unggulan</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Dirancang khusus untuk memenuhi kebutuhan administrasi gampong dan keselamatan warga secara mandiri.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-4 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 w-fit">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-zinc-600 dark:text-zinc-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-4 relative">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cara Kerja Sistem</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Alur terstruktur yang memastikan informasi tersebar cepat dan akurat.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              {['Ingestion', 'Processing', 'Storage', 'Distribution', 'Monitoring'].map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1 relative group">
                  <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative z-10">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-center">{step}</h3>
                  {/* Connector Line */}
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Siap Mengubah Gampong Anda?</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
              Tingkatkan responsibilitas dan keselamatan warga dengan teknologi terpusat, hemat biaya, dan mudah digunakan.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                Akses Dashboard Geuchik
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 px-4 bg-white dark:bg-black text-center text-zinc-500 text-sm">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
            <Activity className="w-4 h-4" />
            Gampong Alert Hub
          </div>
          <p>© {new Date().getFullYear()} Gampong Alert Hub. Dibuat untuk masyarakat Aceh.</p>
        </div>
      </footer>
    </div>
  );
}
