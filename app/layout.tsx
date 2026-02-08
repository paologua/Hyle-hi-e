import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
