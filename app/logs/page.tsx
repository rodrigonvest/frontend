import type { Metadata } from "next";
import LogsView from "../../components/logs/LogsView";

export const metadata: Metadata = {
  title: "Logs do Sistema",
  description: "Acompanhe em tempo real todas as atividades, eventos e operações do seu sistema.",
};

export default function LogsPage() {
  return <LogsView />;
}
