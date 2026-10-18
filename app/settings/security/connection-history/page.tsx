import type { Metadata } from "next";
import ConnectionsView from "../../../../components/connections/ConnectionsView";

export const metadata: Metadata = {
  title: "Histórico de Conexões",
  description: "Veja todos os acessos à sua conta, dispositivos conectados e atividades de segurança.",
};

export default function ConnectionsHistoryPage() {
  return <ConnectionsView />;
}
