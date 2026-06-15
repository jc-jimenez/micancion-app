import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiCancionAPP — Crea canciones personalizadas con IA",
  description: "Crea canciones únicas para tus seres queridos en minutos. Bodas, cumpleaños, mamá, bebé y más. Desde $39 MXN.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
