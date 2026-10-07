import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Copytrix — Telegram to Results",
    template: "%s · Copytrix",
  },
  description: "Plataforma de automação e cópia de sinais de trading do Telegram para contas MT5.",
};

export const viewport: Viewport = {
  themeColor: "#06111d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable} bg-canvas`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
