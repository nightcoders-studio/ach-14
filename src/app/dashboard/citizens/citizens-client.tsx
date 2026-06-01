"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, UserPlus, CheckCircle2, XCircle, Trash2, Loader2, RefreshCw } from "lucide-react";
import { addCitizen, deleteCitizen, toggleCitizenStatus } from "@/app/actions/citizen";
import type { Citizen } from "@prisma/client";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CitizensClient({ initialCitizens }: { initialCitizens: Citizen[] }) {
  const [citizens, setCitizens] = useState<Citizen[]>(initialCitizens);
  const [isPending, startTransition] = useTransition();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", lorong: "" });
  const [error, setError] = useState("");

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("lorong", formData.lorong);

    startTransition(async () => {
      const res = await addCitizen(form);
      if (res.success && res.data) {
        setCitizens([res.data, ...citizens]);
        setIsModalOpen(false);
        setFormData({ name: "", phone: "", lorong: "" });
      } else {
        setError(res.error || "Terjadi kesalahan");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data warga ini?")) return;
    
    startTransition(async () => {
      const res = await deleteCitizen(id);
      if (res.success) {
        setCitizens(citizens.filter(c => c.id !== id));
      }
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleCitizenStatus(id, currentStatus);
      if (res.success && res.data) {
        setCitizens(citizens.map(c => c.id === id ? res.data! : c));
      }
    });
  };

  return (
    <>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Warga</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Direktori warga gampong yang terdaftar di sistem Alert Hub.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shrink-0 shadow-lg bg-primary hover:bg-primary/90 text-white" disabled={isPending}>
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Warga
          </Button>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Direktori Terdaftar</CardTitle>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input type="search" placeholder="Cari nama..." className="pl-9 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0 bg-white dark:bg-zinc-950">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Nama Warga</th>
                      <th className="px-6 py-4 font-medium">WhatsApp</th>
                      <th className="px-6 py-4 font-medium">Domisili (Lorong)</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                    {citizens.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500">Belum ada data warga terdaftar.</td></tr>
                    ) : citizens.map((citizen) => (
                      <tr key={citizen.id} className="bg-white/40 dark:bg-zinc-950/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                              {citizen.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{citizen.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-400">{citizen.phone}</td>
                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{citizen.lorong}</td>
                        <td className="px-6 py-4">
                          {citizen.isActive ? (
                            <Badge variant="outline" className="border-green-500/30 text-green-600 bg-green-500/10"><CheckCircle2 className="w-3 h-3 mr-1" /> Aktif</Badge>
                          ) : (
                            <Badge variant="outline" className="border-red-500/30 text-red-600 bg-red-500/10"><XCircle className="w-3 h-3 mr-1" /> Nonaktif</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(citizen.id, citizen.isActive)} disabled={isPending} title="Ubah Status">
                              <RefreshCw className="w-4 h-4 text-zinc-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(citizen.id)} disabled={isPending} className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Modal Tambah Warga */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Tambah Warga Baru</h3>
                <p className="text-sm text-zinc-500 mb-6">Masukkan data warga untuk mendaftarkannya ke sistem peringatan.</p>
                
                {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-lg border border-red-200 dark:border-red-800/30">{error}</div>}
                
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Cth: Budi Santoso" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. WhatsApp</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required placeholder="Cth: 628123456789" />
                    <p className="text-xs text-zinc-500">Gunakan format 628... tanpa spasi/plus.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lorong">Lorong / Domisili</Label>
                    <Input id="lorong" value={formData.lorong} onChange={(e) => setFormData({...formData, lorong: e.target.value})} required placeholder="Cth: Dusun Merpati" />
                  </div>
                  
                  <div className="flex gap-3 pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Batal</Button>
                    <Button type="submit" className="flex-1" disabled={isPending}>
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Warga"}
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
