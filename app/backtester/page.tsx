import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Icon } from "../../components/Icons";
import { Badge, Button, Card, EmptyState, SectionTitle, Stat } from "../../components/UI";

const fields = [
  ["Fonte", "Selecionar fonte"],
  ["Símbolo", "XAUUSD"],
  ["Período", "Últimos 30 dias"],
  ["Modo de risco", "Risco %"],
  ["Valor de risco", "1.00%"],
];

export default function BacktesterPage() {
  return (
    <Shell>
      <PageHeader eyebrow="Pesquisa" title="Backtest" description="Reproduza o mesmo pipeline de sinais, validação e risco sobre dados históricos de mercado." />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Operações" value="0" note="Execute um backtest" icon={<Icon name="trades" size={18} />} />
        <Stat label="Taxa de acerto" value="—" icon={<Icon name="trophy" size={18} />} accent="green" />
        <Stat label="Fator de lucro" value="—" icon={<Icon name="analytics" size={18} />} />
        <Stat label="P&L líquido" value="$0.00" icon={<Icon name="dollar" size={18} />} accent="green" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Novo backtest" description="Configuração ainda não conectada ao motor de backtest." />
          <dl className="mt-5 space-y-4">
            {fields.map(([l, v]) => (
              <div key={l}>
                <dt className="text-xs text-fg-subtle">{l}</dt>
                <dd className="control mt-1.5 flex items-center text-fg-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <Button variant="primary" disabled className="mt-5 w-full" title="Disponível em breve">Executar backtest</Button>
        </Card>
        <Card className="flex flex-col p-5 sm:p-6">
          <SectionTitle title="Resultados" action={<Badge>Aguardando</Badge>} />
          <EmptyState
            className="mt-5 min-h-64 flex-1"
            title="Nenhum backtest executado"
            description="Os resultados usarão o mesmo pipeline do núcleo da execução real, mantendo backtest e copiador alinhados."
          />
        </Card>
      </div>
    </Shell>
  );
}
