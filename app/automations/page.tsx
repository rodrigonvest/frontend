import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Badge, Button, Card, Notice } from "../../components/UI";

const automations = [
  { name: "KIM Gold → Funded MT5", source: "Telegram", receivers: 2, risk: "1.00%", active: true, updated: "há 2 min" },
  { name: "Gold Scalper — Demo", source: "Telegram", receivers: 1, risk: "0.50%", active: false, updated: "Ontem" },
];

export default function AutomationsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Workspace"
        title="Sistemas"
        description="Fluxos da fonte de sinais até as contas, com risco, mapeamento de símbolos e políticas de execução independentes."
        actions={<Button variant="primary" disabled title="Disponível em breve">+ Novo sistema</Button>}
      />
      <div className="mb-4">
        <Notice>Lista demonstrativa. A criação e a persistência de sistemas serão conectadas à API em uma próxima etapa.</Notice>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-[11px] font-medium text-fg-subtle">
                {["Sistema", "Fonte", "Receptores", "Risco", "Status", "Atualizado"].map((h) => (
                  <th key={h} scope="col" className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {automations.map((a) => (
                <tr key={a.name}>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-fg">{a.name}</div>
                    <div className="mt-0.5 text-xs text-fg-subtle">Execução independente por receptor</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-fg-muted">{a.source}</td>
                  <td className="px-5 py-4 text-sm tabular text-fg-muted">{a.receivers}</td>
                  <td className="px-5 py-4 text-sm tabular text-fg">{a.risk}</td>
                  <td className="px-5 py-4"><Badge tone={a.active ? "green" : "amber"}>{a.active ? "Ativo" : "Pausado"}</Badge></td>
                  <td className="px-5 py-4 text-xs text-fg-subtle">{a.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
