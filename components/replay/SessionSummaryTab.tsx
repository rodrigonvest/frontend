import { useMemo } from "react";
import { cx } from "../UI";
import { buildDistribution, fmtR, fmtShortDateTime, type ReplaySession, type ReplaySignal } from "../../lib/replay-data";

interface Props {
  session: ReplaySession;
  onSelect: (id: number) => void;
}

function Tile({ label, children, tone = "text-fg" }: { label: string; children: React.ReactNode; tone?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2/40 px-3.5 py-3">
      <div className="text-xs text-fg-muted">{label}</div>
      <div className={cx("tabular mt-1 text-lg font-semibold tracking-tight", tone)}>{children}</div>
    </div>
  );
}

function SignalLink({ signal, onSelect }: { signal: ReplaySignal | undefined; onSelect: (id: number) => void }) {
  if (!signal) return <span className="text-fg-subtle">—</span>;
  return (
    <button type="button" onClick={() => onSelect(signal.id)} className="text-left text-[15px] hover:underline focus-visible:outline-2 focus-visible:outline-brand">
      #{signal.id} · {signal.outcome} ({fmtR(signal.r, true)})
      <span className="mt-0.5 block text-xs font-normal text-fg-subtle">{fmtShortDateTime(signal.time)}</span>
    </button>
  );
}

export default function SessionSummaryTab({ session, onSelect }: Props) {
  const { summary, signals } = session;
  const dist = useMemo(() => buildDistribution(signals), [signals]);
  const executed = signals.filter((signal) => signal.status === "Executado");
  const best = executed.reduce<ReplaySignal | undefined>((acc, signal) => (!acc || signal.r > acc.r ? signal : acc), undefined);
  const worst = executed.reduce<ReplaySignal | undefined>((acc, signal) => (!acc || signal.r < acc.r ? signal : acc), undefined);
  const reasons = useMemo(() => {
    const map = new Map<string, number>();
    for (const signal of signals) if (signal.ignoredReason) map.set(signal.ignoredReason, (map.get(signal.ignoredReason) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [signals]);

  const bars: Array<{ label: string; value: number; color: string }> = [
    { label: "TP1", value: dist.TP1, color: "bg-warning" },
    { label: "TP2", value: dist.TP2, color: "bg-success" },
    { label: "TP3", value: dist.TP3, color: "bg-brand" },
    { label: "SL", value: dist.SL, color: "bg-danger" },
    { label: "Ignorados", value: dist.Ignorados, color: "bg-fg-subtle" },
  ];
  const maxBar = Math.max(1, ...bars.map((bar) => bar.value));
  const buyPct = signals.length ? Math.round((dist.buy / signals.length) * 100) : 0;

  return (
    <div className="space-y-5 p-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <Tile label="Total de sinais">{summary.total}</Tile>
        <Tile label="Executados">
          {summary.executed} <span className="text-sm font-medium text-success">({summary.executedPct.toFixed(1)}%)</span>
        </Tile>
        <Tile label="Ignorados">
          {summary.ignored} <span className="text-sm font-medium text-danger">({summary.ignoredPct.toFixed(1)}%)</span>
        </Tile>
        <Tile label="Win Rate" tone="text-success">
          {summary.winRate.toFixed(1)}%
        </Tile>
        <Tile label="R:R Médio">{summary.rrAvg.toFixed(1)}R</Tile>
        <Tile label="Resultado Total" tone="text-success">
          +{summary.resultR.toFixed(1)}R
        </Tile>
        <Tile label="Melhor sinal" tone="text-success">
          <SignalLink signal={best} onSelect={onSelect} />
        </Tile>
        <Tile label="Pior sinal" tone="text-danger">
          <SignalLink signal={worst} onSelect={onSelect} />
        </Tile>
        <Tile label="Tempo médio de execução">{dist.avgExec} min</Tile>
        <Tile label="Spread médio">{dist.avgSpread.toFixed(2)}</Tile>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-label="Distribuição de resultados">
          <h3 className="mb-3 text-sm font-semibold text-fg">Distribuição de resultados</h3>
          <ul className="space-y-2">
            {bars.map((bar) => (
              <li key={bar.label} className="grid grid-cols-[72px_1fr_44px] items-center gap-3 text-[12.5px]">
                <span className="text-fg-muted">{bar.label}</span>
                <span className="h-5 overflow-hidden rounded bg-canvas/70">
                  <span className={cx("block h-full rounded", bar.color)} style={{ width: `${(bar.value / maxBar) * 100}%` }} />
                </span>
                <span className="tabular text-right text-fg">{bar.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Direção e motivos">
          <h3 className="mb-3 text-sm font-semibold text-fg">Compra vs. Venda</h3>
          <div className="flex h-5 overflow-hidden rounded bg-canvas/70" role="img" aria-label={`${dist.buy} sinais de compra e ${dist.sell} de venda`}>
            <span className="bg-success" style={{ width: `${buyPct}%` }} />
            <span className="bg-danger" style={{ width: `${100 - buyPct}%` }} />
          </div>
          <div className="tabular mt-1.5 flex justify-between text-xs text-fg-muted">
            <span>Buy {dist.buy}</span>
            <span>Sell {dist.sell}</span>
          </div>

          <h3 className="mb-2 mt-5 text-sm font-semibold text-fg">Motivos de sinais ignorados</h3>
          {reasons.length === 0 ? (
            <p className="text-xs text-fg-subtle">Nenhum sinal ignorado neste período.</p>
          ) : (
            <ul className="space-y-1.5 text-[12.5px]">
              {reasons.map(([reason, count]) => (
                <li key={reason} className="flex justify-between gap-3 rounded-md bg-surface-2/40 px-3 py-1.5">
                  <span className="text-fg-muted">{reason}</span>
                  <span className="tabular text-fg">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
