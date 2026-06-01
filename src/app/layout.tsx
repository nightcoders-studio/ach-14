import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Gampong Alert Hub — Sistem Peringatan Dini & Tata Kelola Cerdas",
  description:
    "Sistem Peringatan Dini & Tata Kelola Cerdas Terintegrasi berbasis WhatsApp untuk Gampong di Aceh. Gampong Sigap, Warga Selamat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
