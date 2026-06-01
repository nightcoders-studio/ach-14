"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { BellRing, ShieldAlert, FileText, CheckCircle2, AlertTriangle, ArrowUpRight, Users, MapPin, Activity, Cloud, Thermometer, Wind, Droplets, CloudRain, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { GempaInfo } from "@/app/actions/bmkg";
import type { WeatherInfo } from "@/app/actions/weather";

const stats = [
  {
    title: "Status Gampong",
    value: "Aman",
    description: "Tidak ada peringatan kritis",
    icon: ShieldAlert,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Laporan Aktif",
    value: "3",
    description: "Menunggu penanganan",
    icon: FileText,
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    title: "Peringatan Disiarkan",
    value: "12",
    description: "Dalam bulan ini",
    icon: BellRing,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const recentReports = [
  { id: "1", type: "KEBAKARAN", loc: "Dusun Merpati", status: "PENDING", time: "10 menit yang lalu" },
  { id: "2", type: "LISTRIK", loc: "Dusun Kenari", status: "IN_PROGRESS", time: "1 jam yang lalu" },
  { id: "3", type: "BANJIR", loc: "Jalan Utama", status: "RESOLVED", time: "Kemarin, 14:00" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardClient({ bmkgData, weatherData }: { bmkgData: GempaInfo | null, weatherData: WeatherInfo | null }) {
  // Parsing Magnitude to float for color coding
  const magnitude = bmkgData ? parseFloat(bmkgData.Magnitude) : 0;
  const isDanger = magnitude >= 5.0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pusat Komando</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Pantau kondisi terkini dan kendalikan respon darurat Gampong Anda.
          </p>
        </div>
        <Link href="/dashboard/alerts" className={buttonVariants({ className: "shrink-0 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white" })}>
          <BellRing className="w-4 h-4 mr-2" />
          Siarkan Peringatan
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
        {/* WIDGET KIRI - BMKG & CUACA */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
          <Card className={`backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden ${isDanger ? 'ring-2 ring-red-500' : ''}`}>
            {isDanger && (
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
            )}
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="flex items-center text-lg">
                <Activity className={`w-5 h-5 mr-2 ${isDanger ? 'text-red-500 animate-bounce' : 'text-primary'}`} /> 
                Pantauan Gempa BMKG
              </CardTitle>
              <CardDescription>Pusat gempa bumi tektonik terbaru.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {bmkgData ? (
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative shrink-0">
                    <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 ${isDanger ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30' : 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30'}`}>
                      <span className="text-4xl font-black">{bmkgData.Magnitude}</span>
                      <span className="text-xs font-bold">Magnitudo</span>
                    </div>
                  </div>
                  <div className="space-y-3 w-full">
                    <div>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-zinc-400 mt-0.5 shrink-0" />
                        <p className="font-semibold leading-tight">{bmkgData.Wilayah}</p>
                      </div>
                      <p className="text-sm text-zinc-500 ml-6 mt-1">{bmkgData.Tanggal}, {bmkgData.Jam}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm ml-6">
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                        <p className="text-xs text-zinc-500">Kedalaman</p>
                        <p className="font-semibold">{bmkgData.Kedalaman}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                        <p className="text-xs text-zinc-500">Koordinat</p>
                        <p className="font-semibold">{bmkgData.Coordinates}</p>
                      </div>
                    </div>
                    
                    <div className={`ml-6 p-2 rounded-lg text-sm font-medium ${isDanger ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                      {bmkgData.Potensi}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-zinc-500">
                  <AlertTriangle className="w-8 h-8 mb-2 opacity-50" />
                  <p>Gagal memuat data BMKG.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* WIDGET CUACA */}
          <Card className={`backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden`}>
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center">
                  <Cloud className="w-5 h-5 mr-2 text-blue-500" /> 
                  Prakiraan Cuaca Hyper-Local
                </div>
                {weatherData && (
                  <span className="text-xs font-normal text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                    {weatherData.villageName}
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Data real-time berdasarkan titik koordinat desa.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {weatherData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-around p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                      <div className="text-xs text-zinc-500">Suhu Udara</div>
                    </div>
                    <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
                    <div className="text-center">
                      <Wind className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold">{weatherData.windSpeed} <span className="text-sm">km/j</span></div>
                      <div className="text-xs text-zinc-500">Kec. Angin</div>
                    </div>
                    <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
                    <div className="text-center">
                      <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <div className="text-2xl font-bold">{weatherData.precipitation} <span className="text-sm">mm</span></div>
                      <div className="text-xs text-zinc-500">Curah Hujan</div>
                    </div>
                  </div>
                  
                  {/* FORECAST 3 HARI */}
                  {weatherData.forecasts && weatherData.forecasts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="text-sm font-semibold mb-3">Prakiraan 3 Hari Kedepan</p>
                      <div className="grid grid-cols-3 gap-2">
                        {weatherData.forecasts.map((fc, i) => {
                          const date = new Date(fc.time);
                          const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
                          const isRainy = fc.weatherCode >= 51;
                          
                          return (
                            <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                              <p className="text-xs text-zinc-500 font-medium mb-1">{i === 0 ? 'Besok' : i === 1 ? 'Lusa' : dayName}</p>
                              {isRainy ? <CloudRain className="w-5 h-5 text-blue-500 mb-1" /> : <Sun className="w-5 h-5 text-amber-500 mb-1" />}
                              <div className="flex items-center gap-1 text-xs font-bold">
                                <span className="text-blue-500">{Math.round(fc.tempMin)}°</span>
                                <span className="text-zinc-300">-</span>
                                <span className="text-orange-500">{Math.round(fc.tempMax)}°</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-zinc-500">
                  <Cloud className="w-8 h-8 mb-2 opacity-50" />
                  <p>Memuat data cuaca satelit...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* RECENT REPORTS */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <CardTitle className="text-lg">Laporan Terkini</CardTitle>
              </div>
              <Link href="/dashboard/reports" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Lihat Semua <ArrowUpRight className="ml-1 w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        report.status === 'RESOLVED' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                        report.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                        'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                      }`}>
                        {report.status === 'RESOLVED' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{report.type}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{report.loc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 inline-block mb-1">
                        {report.status}
                      </div>
                      <p className="text-[10px] text-zinc-500">{report.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
