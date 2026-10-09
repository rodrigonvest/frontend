import type { Metadata } from "next";
import RiskManagementView from "../../../components/risk-management/RiskManagementView";

export const metadata: Metadata = {
  title: "Risk Management Pro — Copytrix",
  description: "Controle total do seu risco. Proteja seu capital, defina limites e opere com segurança.",
};

export default function RiskManagementProPage() {
  return <RiskManagementView />;
}
