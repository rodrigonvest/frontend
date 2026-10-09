"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { money } from "../../lib/multi-account-demo";
import {
  HIGH_CORRELATION,
  capital,
  correlationMatrix,
  correlationSymbols,
  exposureRows,
  type RiskConfig,
} from "../../lib/risk-management-demo";
import { Panel, ToggleRow } from "./RiskFields";

const totalLots = exposureRows.reduce((sum, row) => sum + row.lots, 0);
const totalAmount = exposureRows.reduce((sum, row) => sum + row.amount, 0);
const totalPct = Math.ceil((totalAmount / capital) * 1000) / 10;
const roundedLegs = exposureRows.map((row) => Math.round((row.amount / capital) * 1000) / 10);

export function ExposurePanel({ exposureLimit }: { exposureLimit: number }) {
  const overLimit = totalPct > exposureLimit;
  const scale = Math.max(60, exposureLimit + 10);

  return (
    <Panel title="Exposição Atual" icon="target">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-[12px]">
          <thead>
            <tr className="text-fg-subtle">
              <th scope="col" className="py-1.5 pr-2 font-normal">Símbolo</th>
              <th scope="col" className="py-1.5 pr-2 font-normal">Direção</th>
              <th scope="col" className="py-1.5 pr-2 text-right font-normal">Lotes</th>
              <th scope="col" className="py-1.5 pr-2 text-right font-normal">Exposição</th>
              <th scope="col" className="py-1.5 pr-2 text-right font-normal">% do Capital</th>
              <th scope="col" className="py-1.5 font-normal"><span className="sr-only">Barra de exposição</span></th>
            </tr>
          </thead>
          <tbody>
            {exposureRows.map((row, index) => {
              const buy = row.side === "Buy";
              return (
                <tr key={row.symbol} className="border-t border-line/60 align-middle">
                  <th scope="row" className="py-2 pr-2 font-medium text-fg">{row.symbol}</th>
                  <td className="py-2 pr-2">
                    <span className={cx("inline-flex items-center gap-1", buy ? "text-success" : "text-danger")}>
                      <Icon name={buy ? "trendUp" : "trendDown"} size={13} stroke={2.4} />
                      {row.side}
                    </span>
                  </td>
                  <td className="tabular py-2 pr-2 text-right text-fg">{row.lots.toFixed(2)}</td>
                  <td className="tabular py-2 pr-2 text-right text-fg">{money(row.amount)}</td>
                  <td className="tabular py-2 pr-2 text-right text-fg">{roundedLegs[index].toFixed(1)}%</td>
                  <td className="w-[22%] min-w-[56px] py-2">
                    <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, (roundedLegs[index] / scale) * 100)}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-line-strong align-middle font-semibold">
              <th scope="row" className="py-2 pr-2 text-fg">Total</th>
              <td className="py-2 pr-2" />
              <td className="tabular py-2 pr-2 text-right text-fg">{totalLots.toFixed(2)}</td>
              <td className="tabular py-2 pr-2 text-right text-fg">{money(totalAmount)}</td>
              <td className={cx("tabular py-2 pr-2 text-right", overLimit ? "text-danger" : "text-fg")}>{totalPct.toFixed(1)}%</td>
              <td className="py-2">
                <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                  <div className={cx("h-full rounded-full", overLimit ? "bg-danger" : "bg-success")} style={{ width: `${Math.min(100, (totalPct / scale) * 100)}%` }} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {overLimit && (
        <p role="status" className="mt-2 flex items-center gap-1.5 text-[12px] text-danger">
          <Icon name="info" size={13} />
          Exposição total acima do limite de {exposureLimit.toFixed(1)}%.
        </p>
      )}
    </Panel>
  );
}

function cellStyle(value: number, diagonal: boolean) {
  if (diagonal) return { backgroundColor: "rgba(18,217,158,.55)" };
  if (value >= HIGH_CORRELATION) return { backgroundColor: "rgba(240,195,92,.6)" };
  if (value >= 0) return { backgroundColor: `rgba(18,217,158,${(0.1 + value * 0.45).toFixed(2)})` };
  return { backgroundColor: `rgba(255,93,109,${Math.min(0.75, 0.25 + Math.abs(value) * 1.6).toFixed(2)})` };
}

export function CorrelationMatrix() {
  return (
    <Panel title="Correlação entre Símbolos" icon="shield">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[360px] border-separate border-spacing-[3px] text-center text-[12px]">
          <thead>
            <tr>
              <td />
              {correlationSymbols.map((symbol) => (
                <th key={symbol} scope="col" className="px-1 py-1 text-[11px] font-medium text-fg-muted">
                  {symbol}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationSymbols.map((rowSymbol, row) => (
              <tr key={rowSymbol}>
                <th scope="row" className="pr-1 text-left text-[11px] font-medium text-fg-muted">
                  {rowSymbol}
                </th>
                {correlationSymbols.map((colSymbol, col) => {
                  const value = correlationMatrix[row][col];
                  return (
                    <td
                      key={colSymbol}
                      title={`${rowSymbol} x ${colSymbol}: ${value.toFixed(2)}`}
                      style={cellStyle(value, row === col)}
                      className="tabular h-8 rounded-[4px] font-medium text-white"
                    >
                      {value.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-fg-subtle" aria-label="Legenda do mapa de calor">
        <li className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-sm bg-[rgba(240,195,92,.6)]" />Alta (acima de {HIGH_CORRELATION.toFixed(2)})</li>
        <li className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-sm bg-[rgba(18,217,158,.35)]" />Positiva</li>
        <li className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-sm bg-[rgba(255,93,109,.5)]" />Negativa</li>
      </ul>
    </Panel>
  );
}

export function HighCorrelationPairs({ config, onChange }: { config: RiskConfig; onChange: (patch: Partial<RiskConfig>) => void }) {
  const pairs: { a: string; b: string; value: number }[] = [];
  correlationSymbols.forEach((a, row) => {
    correlationSymbols.forEach((b, col) => {
      if (col > row && correlationMatrix[row][col] >= HIGH_CORRELATION) pairs.push({ a, b, value: correlationMatrix[row][col] });
    });
  });

  return (
    <Panel title="Pares de Alta Correlação" icon="info">
      {pairs.length === 0 ? (
        <p className="text-[13px] text-fg-muted">Nenhum par acima de {HIGH_CORRELATION.toFixed(2)}.</p>
      ) : (
        <ul className="mb-2 divide-y divide-line/60">
          {pairs.map((pair) => (
            <li key={`${pair.a}-${pair.b}`} className="flex items-center justify-between gap-3 py-2 text-[13px]">
              <span className="text-fg">{pair.a} / {pair.b}</span>
              <span className="tabular rounded-md bg-warning/15 px-2 py-0.5 font-semibold text-warning">{pair.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="border-t border-line pt-1.5">
        <ToggleRow label="Reduzir lote em alta correlação" checked={config.reduceCorrelation} onChange={(v) => onChange({ reduceCorrelation: v })} />
        <ToggleRow label="Filtro de Correlação entre Símbolos" checked={config.correlationFilter} onChange={(v) => onChange({ correlationFilter: v })} />
      </div>
    </Panel>
  );
}

export function RiskDonut() {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const legs = exposureRows.map((row, index) => ({ label: row.symbol, pct: roundedLegs[index], color: row.color }));
  const others = Math.round((100 - roundedLegs.reduce((sum, pct) => sum + pct, 0)) * 10) / 10;
  const segments = [...legs, { label: "Outros", pct: others, color: "#8197ac" }];

  let offset = 0;
  const arcs = segments.map((segment) => {
    const length = (segment.pct / 100) * circumference;
    const arc = { ...segment, length, start: offset };
    offset += length;
    return arc;
  });

  return (
    <Panel title="Distribuição de Risco por Símbolo" icon="chart">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="relative size-[150px] shrink-0">
          <svg role="img" aria-label={`Exposição total de ${totalPct.toFixed(1)}% do capital`} viewBox="0 0 140 140" className="size-[150px] -rotate-90">
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth="18"
                strokeDasharray={`${Math.max(0, arc.length - 1.5)} ${circumference}`}
                strokeDashoffset={-arc.start}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="tabular text-[22px] font-semibold leading-none text-fg">{totalPct.toFixed(1)}%</span>
            <span className="mt-1 text-[11px] text-fg-muted">Exposição Total</span>
          </div>
        </div>
        <ul className="min-w-[150px] flex-1 space-y-2.5 text-[13px]">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2.5">
              <span aria-hidden className="size-3 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="flex-1 text-fg">{segment.label}</span>
              <span className="tabular text-fg-muted">{segment.pct.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
