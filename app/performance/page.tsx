import type { Metadata } from "next";
import PerformanceView from "../../components/performance/PerformanceView";

export const metadata: Metadata = {
  title: "Desempenho",
  description: "Analise a performance do seu trading com estatísticas detalhadas.",
};

export default function DesempenhoPage() {
  return <PerformanceView />;
}
