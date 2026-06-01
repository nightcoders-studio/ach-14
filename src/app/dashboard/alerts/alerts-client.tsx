"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellRing, ShieldAlert, Plus, Search, Megaphone, Info, AlertTriangle, Loader2 } from "lucide-react";
import { createAlert } from "@/app/actions/alert";
import type { Alert } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AlertsClient({ initialAlerts }: { initialAlerts: Alert[] }) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    source: "GEUCHIK",
    severity: "INFO",
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <Badge className="bg-red-500 hover:bg-red-600 text-white"><AlertTriangle className="w-3 h-3 mr-1" /> Kritis</Badge>;
      case "WARNING": return <Badge className="bg-amber-500 hover:bg-amber-600 text-white"><ShieldAlert className="w-3 h-3 mr-1" /> Waspada</Badge>;
      case "INFO": return <Badge className="bg-blue-500 hover:bg-blue-600 text-white"><Info className="w-3 h-3 mr-1" /> Info</Badge>;
      default: return <Badge>{severity}</Badge>;
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const form = new FormData();
    form.append("title", formData.title);
    form.append("message", formData.message);
    form.append("source", formData.source);
    form.append("severity", formData.severity);

    startTransition(async () => {
      const res = await createAlert(form);
      if (res.success && res.data) {
        setAlerts([res.data, ...alerts]);
        setIsModalOpen(false);
        setFormData({ title: "", message: "", source: "GEUCHIK", severity: "INFO" });
      } else {
        setError(res.error || "Terjadi kesalahan");
      }
    });
  };

  return (
    <>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manajemen Peringatan</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Kendalikan distribusi informasi darurat dan siaran warga.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shrink-0 shadow-lg bg-primary hover:bg-primary/90 text-white" disabled={isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Buat Peringatan Baru
          </Button>
        </div>

        <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Riwayat Siaran</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input type="search" placeholder="Cari peringatan..." className="pl-9 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 border border-dashed rounded-xl border-zinc-300 dark:border-zinc-700">
                  Belum ada riwayat peringatan disiarkan.
                </div>
              ) : alerts.map((alert) => (
                <motion.div key={alert.id} variants={itemVariants}>
                  <div className="p-5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/40 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full mt-1 shrink-0 ${
                          alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                          alert.severity === 'WARNING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                        }`}>
                          {alert.source === 'BMKG' ? <BellRing className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                            {alert.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300">Sumber: {alert.source}</span>
                            <span>•</span>
                            <span>{format(new Date(alert.createdAt), "dd MMM yyyy, HH:mm 'WIB'", { locale: id })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center self-start">
                        {getSeverityBadge(alert.severity)}
                      </div>
                    </div>
                    <div className="pl-0 sm:pl-16">
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal Peringatan */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Siarkan Peringatan Baru</h3>
                <p className="text-sm text-zinc-500 mb-6">Pesan ini akan disiarkan dan tercatat dalam sistem log peringatan gampong.</p>
                
                {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-lg border border-red-200 dark:border-red-800/30">{error}</div>}
                
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Peringatan</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="Cth: Peringatan Banjir Kilat" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">Sumber Info</Label>
                      <select id="source" value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <option value="GEUCHIK">Aparatur Gampong</option>
                        <option value="BMKG">BMKG</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Tingkat Bahaya</Label>
                      <select id="severity" value={formData.severity} onChange={(e) => setFormData({...formData, severity: e.target.value})} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <option value="INFO">Info</option>
                        <option value="WARNING">Waspada (Warning)</option>
                        <option value="CRITICAL">Kritis (Critical)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan Siaran</Label>
                    <textarea 
                      id="message" 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      required 
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Masukkan detail pesan peringatan yang akan disiarkan..." 
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Batal</Button>
                    <Button type="submit" className="flex-1" disabled={isPending}>
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Siarkan Sekarang"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
