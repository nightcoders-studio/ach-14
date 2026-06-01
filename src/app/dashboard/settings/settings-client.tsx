"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Settings, MessageCircle, Save, CheckCircle2, Zap, Server, Shield, Globe, BellRing, Webhook } from "lucide-react";
import { updateSettings } from "@/app/actions/settings";

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [activeCategory, setActiveCategory] = useState<"GENERAL" | "MESSAGING" | "PUBLIC_APIS" | "ALERT_PARAMS">("GENERAL");
  const [activeProvider, setActiveProvider] = useState<"FONNTE" | "EVOLUTION" | "WAHA" | "WATI">("EVOLUTION");
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateSettings(settings);
      if (res.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pusat Kendali Integrasi</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Kelola konfigurasi API Publik, Parameter Pesan, dan Webhooks lintas instansi.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isPending} className="shadow-lg">
          {isPending ? "Menyimpan..." : isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2"/> Tersimpan</> : <><Save className="w-4 h-4 mr-2"/> Simpan Perubahan</>}
        </Button>
      </div>

      {/* Top Level Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Button 
          variant={activeCategory === "GENERAL" ? "default" : "ghost"} 
          onClick={() => setActiveCategory("GENERAL")}
          className="rounded-b-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={activeCategory === "GENERAL"}
        >
          <Settings className="w-4 h-4 mr-2" />
          Identitas & Geografi
        </Button>
        <Button 
          variant={activeCategory === "MESSAGING" ? "default" : "ghost"} 
          onClick={() => setActiveCategory("MESSAGING")}
          className="rounded-b-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={activeCategory === "MESSAGING"}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Sistem Pesan (WA)
        </Button>
        <Button 
          variant={activeCategory === "PUBLIC_APIS" ? "default" : "ghost"} 
          onClick={() => setActiveCategory("PUBLIC_APIS")}
          className="rounded-b-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={activeCategory === "PUBLIC_APIS"}
        >
          <Globe className="w-4 h-4 mr-2" />
          Integrasi API Publik
        </Button>
        <Button 
          variant={activeCategory === "ALERT_PARAMS" ? "default" : "ghost"} 
          onClick={() => setActiveCategory("ALERT_PARAMS")}
          className="rounded-b-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={activeCategory === "ALERT_PARAMS"}
        >
          <BellRing className="w-4 h-4 mr-2" />
          Parameter Peringatan (Alerts)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* GENERAL CATEGORY */}
        {activeCategory === "GENERAL" && (
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="h-full backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader>
                  <CardTitle className="text-xl">Identitas Daerah</CardTitle>
                  <CardDescription>Profil resmi Gampong untuk keperluan kop surat dan header aplikasi.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Gampong / Desa</label>
                    <Input 
                      type="text" 
                      value={settings["GAMPONG_NAME"] || ""} 
                      onChange={(e) => handleSettingChange("GAMPONG_NAME", e.target.value)} 
                      placeholder="Contoh: Balee" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kecamatan</label>
                      <Input 
                        type="text" 
                        value={settings["GAMPONG_KECAMATAN"] || ""} 
                        onChange={(e) => handleSettingChange("GAMPONG_KECAMATAN", e.target.value)} 
                        placeholder="Contoh: Meureudu" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kabupaten / Kota</label>
                      <Input 
                        type="text" 
                        value={settings["GAMPONG_KABUPATEN"] || ""} 
                        onChange={(e) => handleSettingChange("GAMPONG_KABUPATEN", e.target.value)} 
                        placeholder="Contoh: Pidie Jaya" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Provinsi</label>
                    <Input 
                      type="text" 
                      value={settings["GAMPONG_PROVINSI"] || ""} 
                      onChange={(e) => handleSettingChange("GAMPONG_PROVINSI", e.target.value)} 
                      placeholder="Contoh: Aceh" 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Globe className="w-5 h-5" /> Geofencing (Titik Pusat)
                  </CardTitle>
                  <CardDescription>Menentukan wilayah perlindungan dari BMKG berdasarkan lokasi.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Latitude (Lintang)</label>
                      <Input 
                        type="number" step="0.0001"
                        value={settings["GAMPONG_LATITUDE"] || ""} 
                        onChange={(e) => handleSettingChange("GAMPONG_LATITUDE", e.target.value)} 
                        placeholder="Contoh: 5.2415" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Longitude (Bujur)</label>
                      <Input 
                        type="number" step="0.0001"
                        value={settings["GAMPONG_LONGITUDE"] || ""} 
                        onChange={(e) => handleSettingChange("GAMPONG_LONGITUDE", e.target.value)} 
                        placeholder="Contoh: 96.2570" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <label className="text-sm font-medium text-amber-600 dark:text-amber-400">Radius Terdampak (Kilometer)</label>
                    <div className="flex gap-3 items-center">
                      <Input 
                        type="number" 
                        value={settings["GAMPONG_RADIUS_KM"] || "50"} 
                        onChange={(e) => handleSettingChange("GAMPONG_RADIUS_KM", e.target.value)} 
                        className="w-32 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20"
                      />
                      <span className="text-sm text-zinc-500">KM</span>
                    </div>
                    <p className="text-xs text-zinc-500 pt-2">
                      Notifikasi otomatis BMKG <b>hanya</b> akan disiarkan ke warga jika titik pusat gempa berada di dalam radius {settings["GAMPONG_RADIUS_KM"] || "50"} KM dari balai desa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* MESSAGING CATEGORY */}
        {activeCategory === "MESSAGING" && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-500 mb-3 ml-2 uppercase">Provider Integrasi</h3>
              <Button variant={activeProvider === "FONNTE" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveProvider("FONNTE")}>
                <MessageCircle className="w-4 h-4 mr-2" /> Fonnte API
              </Button>
              <Button variant={activeProvider === "EVOLUTION" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveProvider("EVOLUTION")}>
                <Zap className="w-4 h-4 mr-2" /> Evolution API
              </Button>
              <Button variant={activeProvider === "WAHA" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveProvider("WAHA")}>
                <Server className="w-4 h-4 mr-2" /> Waha (WhatsApp HTTP API)
              </Button>
              <Button variant={activeProvider === "WATI" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveProvider("WATI")}>
                <Shield className="w-4 h-4 mr-2" /> WATI (Meta Official)
              </Button>
            </div>

            <div className="md:col-span-3">
              {activeProvider === "FONNTE" && (
                <motion.div variants={itemVariants} key="FONNTE">
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">Fonnte API Configuration</CardTitle>
                          <CardDescription>Gateway WhatsApp Cloud pihak ketiga yang andal.</CardDescription>
                        </div>
                        {settings["ACTIVE_WHATSAPP_PROVIDER"] === "FONNTE" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">Dipilih (Aktif)</Badge>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/30">Nonaktif</Badge>
                            <Button variant="outline" size="sm" onClick={() => handleSettingChange("ACTIVE_WHATSAPP_PROVIDER", "FONNTE")}>Jadikan Utama</Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fonnte API Key</label>
                        <Input 
                          type="password" 
                          value={settings["FONNTE_API_KEY"] || ""} 
                          onChange={(e) => handleSettingChange("FONNTE_API_KEY", e.target.value)} 
                          placeholder="Masukkan token Fonnte..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Endpoint URL</label>
                        <Input type="text" value="https://api.fonnte.com/send" disabled />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              {activeProvider === "EVOLUTION" && (
                <motion.div variants={itemVariants} key="EVOLUTION">
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">Evolution API (Self-Hosted)</CardTitle>
                          <CardDescription>Solusi mandiri berbasis Baileys untuk kustomisasi penuh.</CardDescription>
                        </div>
                        {settings["ACTIVE_WHATSAPP_PROVIDER"] === "EVOLUTION" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">Dipilih (Aktif)</Badge>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/30">Nonaktif</Badge>
                            <Button variant="outline" size="sm" onClick={() => handleSettingChange("ACTIVE_WHATSAPP_PROVIDER", "EVOLUTION")}>Jadikan Utama</Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Instance Name</label>
                        <Input 
                          type="text" 
                          value={settings["EVOLUTION_INSTANCE_NAME"] || ""} 
                          onChange={(e) => handleSettingChange("EVOLUTION_INSTANCE_NAME", e.target.value)} 
                          placeholder="Contoh: gampong-hub" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Evolution API URL</label>
                        <Input 
                          type="text" 
                          value={settings["EVOLUTION_API_URL"] || ""} 
                          onChange={(e) => handleSettingChange("EVOLUTION_API_URL", e.target.value)} 
                          placeholder="http://ip-address:8080" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Global API Key</label>
                        <Input 
                          type="password" 
                          value={settings["EVOLUTION_GLOBAL_KEY"] || ""} 
                          onChange={(e) => handleSettingChange("EVOLUTION_GLOBAL_KEY", e.target.value)} 
                          placeholder="Masukkan kunci global Evolution..." 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeProvider === "WAHA" && (
                <motion.div variants={itemVariants} key="WAHA">
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">Waha (WhatsApp HTTP API)</CardTitle>
                          <CardDescription>Mesin session perpesanan ringan berbasis REST API.</CardDescription>
                        </div>
                        {settings["ACTIVE_WHATSAPP_PROVIDER"] === "WAHA" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">Dipilih (Aktif)</Badge>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/30">Nonaktif</Badge>
                            <Button variant="outline" size="sm" onClick={() => handleSettingChange("ACTIVE_WHATSAPP_PROVIDER", "WAHA")}>Jadikan Utama</Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Waha Endpoint URL</label>
                        <Input 
                          type="text" 
                          value={settings["WAHA_API_URL"] || ""} 
                          onChange={(e) => handleSettingChange("WAHA_API_URL", e.target.value)} 
                          placeholder="http://waha-server:3000" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Session ID</label>
                        <Input 
                          type="text" 
                          value={settings["WAHA_SESSION_ID"] || ""} 
                          onChange={(e) => handleSettingChange("WAHA_SESSION_ID", e.target.value)} 
                          placeholder="default" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeProvider === "WATI" && (
                <motion.div variants={itemVariants} key="WATI">
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">WATI (Official Meta API)</CardTitle>
                          <CardDescription>Integrasi resmi Meta untuk WhatsApp Business Account (WABA).</CardDescription>
                        </div>
                        {settings["ACTIVE_WHATSAPP_PROVIDER"] === "WATI" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">Dipilih (Aktif)</Badge>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">Premium</Badge>
                            <Button variant="outline" size="sm" onClick={() => handleSettingChange("ACTIVE_WHATSAPP_PROVIDER", "WATI")}>Jadikan Utama</Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Access Token</label>
                        <Input 
                          type="password" 
                          value={settings["WATI_ACCESS_TOKEN"] || ""} 
                          onChange={(e) => handleSettingChange("WATI_ACCESS_TOKEN", e.target.value)} 
                          placeholder="Bearer Token..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Endpoint</label>
                        <Input 
                          type="text" 
                          value={settings["WATI_API_ENDPOINT"] || ""} 
                          onChange={(e) => handleSettingChange("WATI_API_ENDPOINT", e.target.value)} 
                          placeholder="https://live-server-XXXX.wati.io" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </>
        )}

        {/* PUBLIC APIS CATEGORY */}
        {activeCategory === "PUBLIC_APIS" && (
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="h-full backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-blue-200 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Globe className="w-5 h-5" /> BMKG Open Data
                  </CardTitle>
                  <CardDescription>Sumber peringatan dini cuaca dan gempa bumi real-time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Endpoint Gempa Terkini</label>
                    <Input 
                      type="text" 
                      value={settings["BMKG_ENDPOINT_GEMPA"] || "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"} 
                      onChange={(e) => handleSettingChange("BMKG_ENDPOINT_GEMPA", e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Batas Magnitudo (Minimum SR)</label>
                    <Input 
                      type="number" step="0.1"
                      value={settings["BMKG_MIN_MAGNITUDE"] || "5.0"} 
                      onChange={(e) => handleSettingChange("BMKG_MIN_MAGNITUDE", e.target.value)} 
                    />
                    <p className="text-xs text-zinc-500">Gempa di atas batas ini akan memicu alarm Command Center.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Webhook className="w-5 h-5" /> Webhook PLN & Damkar
                  </CardTitle>
                  <CardDescription>Rahasia kredensial untuk menerima notifikasi pasif dari instansi lain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL Gampong Anda</label>
                    <Input type="text" value="https://[domain_anda]/api/webhooks/external" disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bearer Secret Key</label>
                    <Input 
                      type="password" 
                      value={settings["WEBHOOK_SECRET"] || ""} 
                      onChange={(e) => handleSettingChange("WEBHOOK_SECRET", e.target.value)} 
                      placeholder="Masukkan Secret Key..." 
                    />
                    <p className="text-xs text-zinc-500">Berikan Secret Key ini kepada teknisi PLN/Damkar untuk ditanam di Header saat mengirim HTTP POST.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* ALERT PARAMS CATEGORY */}
        {activeCategory === "ALERT_PARAMS" && (
          <div className="md:col-span-4">
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-red-200 dark:border-red-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <BellRing className="w-5 h-5" /> Konfigurasi Notifikasi Warga
                  </CardTitle>
                  <CardDescription>Atur tata letak (template) pesan yang akan diterima warga di WhatsApp mereka.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Header Pesan Darurat (CRITICAL)</label>
                      <Input 
                        type="text" 
                        value={settings["ALERT_HEADER_CRITICAL"] || "🚨 *PERINGATAN DARURAT GAMPONG* 🚨"} 
                        onChange={(e) => handleSettingChange("ALERT_HEADER_CRITICAL", e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Header Pemberitahuan (INFO)</label>
                      <Input 
                        type="text" 
                        value={settings["ALERT_HEADER_INFO"] || "ℹ️ *PENGUMUMAN GAMPONG*"} 
                        onChange={(e) => handleSettingChange("ALERT_HEADER_INFO", e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template Dasar Pesan (*Gunakan tag {"{title}"} dan {"{message}"}*)</label>
                    <Textarea 
                      rows={6}
                      value={settings["ALERT_TEMPLATE"] || "{header}\n\nSumber Info: {source}\nLokasi/Kejadian: *{title}*\n\n{message}\n\nHarap segera mengevakuasi diri sesuai arahan aparat desa jika diperlukan.\n\n_Pesan otomatis Gampong Alert Hub_"}
                      onChange={(e) => handleSettingChange("ALERT_TEMPLATE", e.target.value)} 
                      className="font-mono text-sm leading-relaxed"
                    />
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
