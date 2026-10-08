import type { Metadata } from "next";
import AnalysisView from "../../components/analysis/AnalysisView";

export const metadata: Metadata = {
  title: "Análise de Desempenho",
  description: "Insights avançados do seu trading com métricas e estatísticas detalhadas.",
};

export default function AnaliseDesempenhoPage() {
  return <AnalysisView />;
}
