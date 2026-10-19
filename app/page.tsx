import type { Metadata } from "next";
import "../components/landing/landing.css";
import { Background } from "../components/landing/Background";
import { Hero } from "../components/landing/Hero";
import { Metrics } from "../components/landing/Metrics";
import { Navbar } from "../components/landing/Navbar";
import { PlatformStrip } from "../components/landing/PlatformStrip";
import { ContinuationSections } from "../components/landing/ContinuationSections";

export const metadata: Metadata = {
  title: { absolute: "Copytrix — Sinais do Telegram em resultados reais com IA" },
  description:
    "Copie, analise, teste e automatize sinais do Telegram em MT4, MT5 e mais de 38 plataformas, com IA, backtest, gerenciamento de risco e Copytrix MCP.",
};

export default function HomePage() {
  return (
    <div className="lp">
      <noscript>
        <style>{`.lp-reveal{opacity:1!important;transform:none!important}.lp-line{stroke-dashoffset:0!important}.lp-barv,.lp-barh{transform:none!important}.lp-candle{opacity:1!important}`}</style>
      </noscript>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <PlatformStrip />
        <Metrics />
        <ContinuationSections />
      </main>
    </div>
  );
}
