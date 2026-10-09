import type { Metadata } from "next";
import ConfigTemplatesView from "../../../components/config-templates/ConfigTemplatesView";

export const metadata: Metadata = {
  title: "Templates de Configuração — Copytrix",
  description: "Use templates prontos ou crie os seus próprios. Configure, teste e aplique em uma ou várias contas.",
};

export default function ConfigTemplatesPage() {
  return <ConfigTemplatesView />;
}
