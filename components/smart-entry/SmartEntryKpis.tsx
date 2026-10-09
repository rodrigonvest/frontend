import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { Panel } from "../risk-management/RiskFields";
import { smartEntryStats } from "../../lib/smart-entry-demo";

const shell = "flex min-h-[96px] items-center gap-4 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4";

function IconTile({ accent, children }: { accent: string; children: ReactNode }) {
  return <div className={cx("flex size-14 shrink-0 items-center justify-center rounded-xl", accent)}>{children}</div>;
}

export function SmartEntryKpis({ received, approved, filtered }: { received: number; approved: number; filtered: number }) {
  const pct = (value: number) => ((value / received) * 100).toFixed(1);
  return (
    <section aria-label="Resumo de sinais" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className={shell}>
        <IconTile accent="bg-brand/12 text-brand">
          <Icon name="target" size={30} />
        </IconTile>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Sinais Recebidos</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">{received}</div>
          <div className="mt-0.5 text-[13px] text-fg-muted">Últimos 7 dias</div>
        </div>
      </div>
      <div className={shell}>
        <IconTile accent="bg-success/12 text-success">
          <Icon name="filter" size={30} />
        </IconTile>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Sinais Aprovados</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-success">
            {approved} ({pct(approved)}%)
          </div>
          <div className="mt-0.5 text-[13px] text-fg-muted">Executados automaticamente</div>
        </div>
      </div>
      <div className={shell}>
        <IconTile accent="bg-danger/12 text-danger">
          <Icon name="x" size={30} stroke={2.4} />
        </IconTile>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Sinais Filtrados</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-danger">
            {filtered} ({pct(filtered)}%)
          </div>
          <div className="mt-0.5 text-[13px] text-fg-muted">Não executados</div>
        </div>
      </div>
      <div className={shell}>
        <IconTile accent="bg-brand/12 text-brand">
          <Icon name="signal" size={30} />
        </IconTile>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Tempo Médio de Execução</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">1.3 segundos</div>
          <div className="mt-0.5 text-[13px] text-fg-muted">Após aprovação do sinal</div>
        </div>
      </div>
    </section>
  );
}

function ApprovalRing({ ratio }: { ratio: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative size-[68px] shrink-0">
      <svg aria-hidden viewBox="0 0 68 68" className="size-[68px] -rotate-90">
        <circle cx="34" cy="34" r={radius} fill="none" stroke="#122d46" strokeWidth="6" />
        <circle cx="34" cy="34" r={radius} fill="none" stroke="#12d99e" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${ratio * circumference} ${circumference}`} />
      </svg>
      <span className="tabular absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-fg">{(ratio * 100).toFixed(1)}%</span>
    </div>
  );
}

export function SmartEntryStats({ received, approved }: { received: number; approved: number }) {
  const ratio = approved / received;
  return (
    <Panel title="Estatísticas de Smart Entry" icon="barsFilled">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className={shell}>
          <ApprovalRing ratio={ratio} />
          <div className="min-w-0">
            <div className="text-xs leading-4 text-fg-muted">Taxa de Aprovação</div>
            <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-success">{(ratio * 100).toFixed(1)}%</div>
            <div className="mt-0.5 text-[13px] text-fg-muted">
              {approved} de {received} sinais
            </div>
          </div>
        </div>
        <div className={shell}>
          <IconTile accent="bg-success/12 text-success">
            <Icon name="trendUp" size={30} />
          </IconTile>
          <div className="min-w-0">
            <div className="text-xs leading-4 text-fg-muted">Melhoria no Win Rate</div>
            <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-success">+{smartEntryStats.winRateGain.toFixed(1)}%</div>
            <div className="mt-0.5 text-[13px] text-fg-muted">Com Smart Entry</div>
          </div>
        </div>
        <div className={shell}>
          <IconTile accent="bg-danger/12 text-danger">
            <Icon name="trendDown" size={30} />
          </IconTile>
          <div className="min-w-0">
            <div className="text-xs leading-4 text-fg-muted">Redução de Falsos Sinais</div>
            <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-danger">-{smartEntryStats.falseSignalReduction.toFixed(1)}%</div>
            <div className="mt-0.5 text-[13px] text-fg-muted">Entradas evitadas</div>
          </div>
        </div>
        <div className={shell}>
          <IconTile accent="bg-brand/12 text-brand">
            <Icon name="barsFilled" size={30} />
          </IconTile>
          <div className="min-w-0">
            <div className="text-xs leading-4 text-fg-muted">Risco Médio por Operação</div>
            <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">{smartEntryStats.avgRisk.toFixed(2)}%</div>
            <div className="mt-0.5 text-[13px] text-fg-muted">Dentro do limite</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
