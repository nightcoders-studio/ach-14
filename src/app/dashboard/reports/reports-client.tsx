"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertTriangle, Flame, Zap, Waves, CheckCircle2, MoreVertical, Eye, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { updateReportStatus } from "@/app/actions/report";
import type { Report, Citizen } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";

type ReportWithCitizen = Report & { citizen: Citizen };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ReportsClient({ initialReports }: { initialReports: ReportWithCitizen[] }) {
  const [reports, setReports] = useState<ReportWithCitizen[]>(initialReports);
  const [isPending, startTransition] = useTransition();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "KEBAKARAN": return <Flame className="w-5 h-5 text-red-500" />;
      case "LISTRIK": return <Zap className="w-5 h-5 text-amber-500" />;
      case "BANJIR": return <Waves className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-zinc-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RESOLVED": return <Badge variant="outline" className="border-green-500/30 text-green-600 bg-green-500/10 dark:bg-green-500/10"><CheckCircle2 className="w-3 h-3 mr-1" /> Selesai</Badge>;
      case "IN_PROGRESS": return <Badge variant="outline" className="border-blue-500/30 text-blue-600 bg-blue-500/10 dark:bg-blue-500/10"><AlertTriangle className="w-3 h-3 mr-1" /> Diproses</Badge>;
      case "PENDING": return <Badge variant="outline" className="border-amber-500/30 text-amber-600 bg-amber-500/10 dark:bg-amber-500/10"><AlertTriangle className="w-3 h-3 mr-1" /> Menunggu</Badge>;
      case "REJECTED": return <Badge variant="outline" className="border-red-500/30 text-red-600 bg-red-500/10 dark:bg-red-500/10">Ditolak</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, newStatus: any) => {
    startTransition(async () => {
      const res = await updateReportStatus(id, newStatus);
      if (res.success && res.data) {
        setReports(reports.map(r => r.id === id ? { ...r, status: res.data!.status } : r));
      }
    });
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Laporan Warga</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Pusat kendali untuk memantau dan menangani insiden dari warga.
          </p>
        </div>
        <Button 
          variant="default" 
          onClick={() => window.open("/api/reports/pdf", "_blank")}
          className="shrink-0 shadow-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          Unduh Laporan (PDF)
        </Button>
      </div>

      <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle>Daftar Insiden</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input type="search" placeholder="Cari ID, Lokasi, atau Tipe..." className="pl-9 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 bg-white dark:bg-zinc-950">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.length === 0 ? (
              <div className="col-span-full p-8 text-center text-zinc-500 border border-dashed rounded-xl border-zinc-300 dark:border-zinc-700">
                Belum ada laporan dari warga.
              </div>
            ) : reports.map((report) => (
              <motion.div key={report.id} variants={itemVariants}>
                <div className="flex flex-col p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/40 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 transition-colors h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm tracking-tight">{report.type}</h4>
                        <p className="text-xs text-zinc-500">{report.id.substring(0,8).toUpperCase()} • {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: idLocale })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusBadge(report.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 h-8 w-8 ml-1" disabled={isPending}>
                          <MoreVertical className="w-4 h-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, "PENDING")}>Tandai Menunggu</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, "IN_PROGRESS")}>Tandai Diproses</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, "RESOLVED")}>Tandai Selesai</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, "REJECTED")} className="text-red-500">Tolak Laporan</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 flex-grow">
                    <p className="line-clamp-2">{report.description}</p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-wrap justify-between items-center text-xs text-zinc-500 gap-2">
                    <span className="font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">Pelapor: {report.citizen.name}</span>
                    <span className="flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> {report.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
