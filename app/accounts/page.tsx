import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Icon } from "../../components/Icons";
import { Badge, Button, Card, Notice, Stat } from "../../components/UI";

const accounts = [
  { name: "Funded MT5 — Principal", broker: "MT5", equity: "$0.00", risk: "1.00%" },
  { name: "Receptor demo", broker: "MT5", equity: "$0.00", risk: "0.50%" },
];

export default function AccountsPage() {
  return (
    <Shell>
      <PageHeader eyebrow="Workspace" title="Contas" description="Gerencie as contas de destino e o perfil de execução atribuído a cada receptor." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Contas" value="0" note="Nenhuma conexão ativa" icon={<Icon name="accounts" size={18} />} />
        <Stat label="Conectadas" value="0" note="MT4 / MT5 / outros destinos" icon={<Icon name="telegram" size={18} />} accent="green" />
        <Stat label="Capacidade de risco" value="0.00%" note="Entre contas conectadas" icon={<Icon name="analytics" size={18} />} accent="amber" />
      </div>
      <div className="mt-4">
        <Notice>Os cartões abaixo são exemplos de configuração. A conexão de contas ainda não está disponível nesta interface.</Notice>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {accounts.map((a) => (
          <Card key={a.name} className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{a.name}</h2>
                <p className="mt-0.5 text-xs text-fg-subtle">{a.broker} · Perfil receptor</p>
              </div>
              <Badge tone="amber">Não conectada</Badge>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div><dt className="text-xs text-fg-subtle">Patrimônio</dt><dd className="mt-1 text-lg font-semibold tabular">{a.equity}</dd></div>
              <div><dt className="text-xs text-fg-subtle">Risco por operação</dt><dd className="mt-1 text-lg font-semibold tabular">{a.risk}</dd></div>
            </dl>
            <Button disabled className="mt-5 w-full" title="Disponível em breve">Conectar conta</Button>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
