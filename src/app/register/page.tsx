"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await signUp.email({
        email,
        password,
        name,
      });

      if (signUpError) {
        setError(signUpError.message || "Gagal mendaftar. Silakan coba lagi.");
      } else {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

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

        <Card className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
            <CardDescription>
              Daftarkan diri Anda untuk mengelola peringatan dini.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Geuchik Gampong"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftar"
                )}
              </Button>
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
