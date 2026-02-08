import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // crea questo file se vuoi stile globale, altrimenti commenta

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HYLE Hive Simulator",
  description: "Analisi idee con flusso multi-agente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
