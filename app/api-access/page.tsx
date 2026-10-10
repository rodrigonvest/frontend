import type { Metadata } from "next";
import Shell from "../../components/Shell";
import ApiAccessView from "../../components/api-access/ApiAccessView";

export const metadata: Metadata = {
  title: "Acesso à API — Copytrix",
  description: "Integre o Copytrix com suas próprias aplicações, robôs e sistemas externos via API REST, webhooks e MCP.",
};

export default function ApiAccessPage() {
  return (
    <Shell>
      <ApiAccessView />
    </Shell>
  );
}
