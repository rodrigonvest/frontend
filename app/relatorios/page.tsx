import type { Metadata } from "next";
import ReportsView from "../../components/reports/ReportsView";

export const metadata: Metadata = {
  title: "Relatórios",
  description: "Analise seus resultados, exporte dados e acompanhe a performance em detalhes.",
};

export default function ReportsPage() {
  return <ReportsView />;
}
