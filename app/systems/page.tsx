import type { Metadata } from "next";
import Shell from "../../components/Shell";
import SystemsView from "../../components/systems/SystemsView";

export const metadata: Metadata = {
  title: "Sistemas / Automações — Copytrix",
  description: "Catálogo de 54 rotas de automação: 6 fontes × 9 destinos para operar em tempo real.",
};

export default function SistemasPage() {
  return (
    <Shell>
      <SystemsView />
    </Shell>
  );
}
