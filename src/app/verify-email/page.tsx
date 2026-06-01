"use client";

import { useState, useEffect, Suspense } from "react";
import { sendVerificationEmail } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: resendError } = await sendVerificationEmail({
        email,
        callbackURL: "/dashboard"
      });

      if (resendError) {
        setError(resendError.message || "Gagal mengirim ulang email verifikasi.");
      } else {
        setMessage("Email verifikasi telah dikirim ulang. Silakan periksa kotak masuk Anda.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Verifikasi Email</CardTitle>
        <CardDescription>
          Kami telah mengirimkan tautan verifikasi ke email Anda. Silakan periksa kotak masuk (atau folder spam).
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleResend}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md border border-red-200 dark:border-red-900">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          {message && (
            <div className="p-3 flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-900">
              <CheckCircle2 className="w-4 h-4" />
              {message}
            </div>
          )}
          
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Belum menerima email? Masukkan kembali email Anda untuk mengirim ulang tautan.
            </p>
            <div className="space-y-2">
              <Label htmlFor="email">Email Terdaftar</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gampong.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 dark:bg-black/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" variant="secondary" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Ulang Email"
            )}
          </Button>
          <div className="text-center text-sm">
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Kembali ke halaman masuk
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-primary rounded-xl">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Gampong Alert Hub</span>
        </Link>

        <Suspense fallback={
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 p-8 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </Card>
        }>
          <VerifyEmailContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
