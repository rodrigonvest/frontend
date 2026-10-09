import type { Metadata } from "next";
import IntelligenceView from "../../../components/intelligence/IntelligenceView";

export const metadata: Metadata = {
  title: "Copytrix Intelligence — Copytrix",
  description: "Inteligência Artificial para analisar, interpretar e otimizar seus sinais, canais e operações.",
};

export default function CopytrixIntelligencePage() {
  return <IntelligenceView />;
}
