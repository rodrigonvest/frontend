import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Icon } from "../../components/Icons";
import { Card, PreviewBadge, SectionTitle, Stat } from "../../components/UI";

const illustrative = [12, 16, 15, 24, 22, 31, 27, 38, 35, 46, 43, 52, 49, 62, 57, 70];

export default function AnalyticsPage() {
  return (
    <Shell>
      <PageHeader eyebrow="Insights" title="Desempenho" description="Métricas de desempenho por sistema, receptor e histórico de execução." />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="P&L líquido" value="$0.00" icon={<Icon name="dollar" size={18} />} accent="green" />
        <Stat label="Fator de lucro" value="—" icon={<Icon name="analytics" size={18} />} />
        <Stat label="Taxa de acerto" value="—" icon={<Icon name="trophy" size={18} />} accent="green" />
        <Stat label="Drawdown máximo" value="0.00%" icon={<Icon name="chart" size={18} />} accent="red" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Curva de patrimônio" description="Exemplo visual; não representa resultados reais." action={<PreviewBadge label="Ilustrativo" />} />
          <div className="mt-6 flex h-64 items-end gap-1.5 border-b border-line" aria-hidden>
            {illustrative.map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-fg-subtle/20" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Card>
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Qualidade de execução" description="Indicadores ainda não fornecidos pela API." />
          <dl className="mt-4 divide-y divide-line">
            {[["Taxa de preenchimento", "—"], ["Slippage médio", "—"], ["Latência média", "—"], ["Sinais rejeitados", "0"]].map(([a, b]) => (
              <div key={a} className="flex justify-between py-3.5">
                <dt className="text-sm text-fg-muted">{a}</dt>
                <dd className="text-sm tabular text-fg">{b}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Shell>
  );
}
