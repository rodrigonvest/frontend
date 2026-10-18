import type { Metadata } from "next";
import ChannelAnalysisView from "../../../components/channel-analysis/ChannelAnalysisView";

export const metadata: Metadata = {
  title: "Análise Automática de Canais — Copytrix",
  description: "Analise o histórico dos canais do Telegram de forma automática. Descubra a qualidade, consistência e o potencial de cada canal.",
};

export default function ChannelAnalysisPage() {
  return <ChannelAnalysisView />;
}
