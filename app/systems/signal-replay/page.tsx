import type { Metadata } from "next";
import ReplayView from "../../../components/replay/ReplayView";

export const metadata: Metadata = {
  title: "Replay de Sinais — Copytrix",
  description: "Reviva os sinais históricos e veja exatamente como foram executados. Ideal para análise, estudo e validação de estratégias.",
};

export default function ReplayPage() {
  return <ReplayView />;
}
