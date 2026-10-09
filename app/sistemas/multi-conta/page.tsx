import type { Metadata } from "next";
import MultiAccountView from "../../../components/multi-account/MultiAccountView";

export const metadata: Metadata = {
  title: "Multi-Conta Avançado — Copytrix",
  description: "Gerencie múltiplas contas, defina alocação de risco, sincronize operações e acompanhe o desempenho em tempo real.",
};

export default function MultiAccountPage() {
  return <MultiAccountView />;
}
