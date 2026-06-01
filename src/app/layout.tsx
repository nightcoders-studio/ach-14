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
  openGraph: {
    title: "Gampong Alert Hub",
    description: "Sistem Peringatan Dini Berbasis WhatsApp untuk Gampong.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
