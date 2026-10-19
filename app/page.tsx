import type { Metadata } from "next";
import "../components/landing/landing.css";
import { Background } from "../components/landing/Background";
import { BacktestSection } from "../components/landing/BacktestSection";
import { Benefits } from "../components/landing/Benefits";
import { CompleteIntro, Features } from "../components/landing/Features";
import { Faq } from "../components/landing/Faq";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Intelligence } from "../components/landing/Intelligence";
import { IntegrationsSection } from "../components/landing/IntegrationsSection";
import { Metrics } from "../components/landing/Metrics";
import { MultiPlatform } from "../components/landing/MultiPlatform";
import { Navbar } from "../components/landing/Navbar";
import { Pipeline } from "../components/landing/Pipeline";
import { PlatformStrip } from "../components/landing/PlatformStrip";
import { Pricing } from "../components/landing/Pricing";
import { RiskSection } from "../components/landing/RiskSection";
import { Testimonials } from "../components/landing/Testimonials";

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
        <Metrics />
        <PlatformStrip />
        <CompleteIntro />
        <HowItWorks />
        <Features />
        <Pipeline />
        <MultiPlatform />
        <Intelligence />
        <BacktestSection />
        <RiskSection />
        <IntegrationsSection />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
