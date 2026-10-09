"use client";
import { useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { Panel, SelectBox } from "../risk-management/RiskFields";
import { Donut } from "./FilterFields";
import { evaluateSignal, periodOptions, periodStats, type FeedSignal, type SignalFiltersConfig } from "../../lib/signal-filters-demo";

const smallButton =
  "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function LiveSignalsPanel({
  feed,
  config,
  paused,
  onTogglePause,
  onClearFilters,
  onExecute,
}: {
  feed: FeedSignal[];
  config: SignalFiltersConfig;
  paused: boolean;
  onTogglePause: () => void;
  onClearFilters: () => void;
  onExecute: (signal: FeedSignal) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = feed.length > 0 && feed.every((signal) => selected.has(signal.id));

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Panel
      title="Sinais em Tempo Real (Após Filtros)"
      icon="pulse"
      className="min-w-0"
      action={
        <div className="flex gap-2">
          <button type="button" onClick={onTogglePause} aria-pressed={paused} className={cx(smallButton, "border-line-strong bg-[#0a1b2b] text-fg hover:border-brand")}>
            <Icon name={paused ? "refresh" : "minus"} size={13} />
            {paused ? "Retomar" : "Pausar"}
          </button>
          <button type="button" onClick={onClearFilters} className={cx(smallButton, "border-danger/50 bg-danger/10 text-danger hover:bg-danger/20")}>
            Limpar Filtros
          </button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th scope="col" className="w-8 py-2 pr-2 font-medium">
                <input
                  type="checkbox"
                  aria-label="Selecionar todos os sinais"
                  checked={allSelected}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(feed.map((signal) => signal.id)))}
                  className="size-4 accent-[#2b8cff]"
                />
              </th>
              {["Horário", "Canal", "Símbolo", "Direção", "Entrada", "SL (pips)", "TP1 (pips)", "RR", "Spread", "Status", "Ação"].map((label) => (
                <th key={label} scope="col" className="px-2 py-2 font-medium">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feed.map((signal) => {
              const result = evaluateSignal(signal, config);
              const rr = signal.slPips > 0 ? signal.tp1Pips / signal.slPips : 0;
              return (
                <tr key={signal.id} className="border-b border-line/40 last:border-0">
                  <td className="py-2 pr-2">
                    <input
                      type="checkbox"
                      aria-label={`Selecionar sinal ${signal.symbol} ${signal.time}`}
                      checked={selected.has(signal.id)}
                      onChange={() => toggle(signal.id)}
                      className="size-4 accent-[#2b8cff]"
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-fg-muted">
                    {signal.date} {signal.time}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-fg">{signal.channel}</td>
                  <td className="px-2 py-2 font-medium text-fg">{signal.symbol}</td>
                  <td className={cx("whitespace-nowrap px-2 py-2 font-medium", signal.side === "Buy" ? "text-success" : "text-danger")}>{signal.side}</td>
                  <td className="px-2 py-2 tabular-nums text-fg">{signal.entry.toLocaleString("en-US", { minimumFractionDigits: signal.decimals, maximumFractionDigits: signal.decimals })}</td>
                  <td className="px-2 py-2 tabular-nums text-fg">{signal.slPips}</td>
                  <td className="px-2 py-2 tabular-nums text-fg">{signal.tp1Pips}</td>
                  <td className="px-2 py-2 tabular-nums text-fg-muted">1:{rr.toFixed(1)}</td>
                  <td className="px-2 py-2 tabular-nums text-fg-muted">{signal.spread.toFixed(2)}</td>
                  <td className="min-w-[120px] px-2 py-2">
                    <span className={cx("inline-flex items-center gap-1.5", result.ok ? "text-success" : "text-danger")}>
                      <span aria-hidden className={cx("size-1.5 rounded-full", result.ok ? "bg-success" : "bg-danger")} />
                      {result.ok ? "Aprovado" : "Filtrado"}
                    </span>
                    {!result.ok && <span className="block text-[11px] leading-4 text-fg-muted">{result.reason}</span>}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      disabled={!result.ok}
                      onClick={() => onExecute(signal)}
                      className="h-7 rounded-md border border-brand-strong bg-brand-strong/20 px-3 text-[12px] font-medium text-fg transition-colors hover:bg-brand-strong/40 focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-fg-subtle"
                    >
                      Executar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export function PerformancePanel({ period, onPeriod, extraReceived, extraApproved }: { period: string; onPeriod: (value: string) => void; extraReceived: number; extraApproved: number }) {
  const base = periodStats[period] ?? periodStats["30"];
  const received = base.received + extraReceived;
  const approved = base.approved + extraApproved;
  const filtered = received - approved;
  const approvedRate = received > 0 ? (approved / received) * 100 : 0;
  const filteredRate = received > 0 ? 100 - approvedRate : 0;

  return (
    <Panel
      title="Performance dos Sinais Filtrados"
      icon="analytics"
      action={
        <div className="w-[150px]">
          <SelectBox label="Período" value={period} options={periodOptions} onChange={onPeriod} />
        </div>
      }
    >
      <dl className="grid grid-cols-3 gap-3 text-center sm:text-left">
        <div>
          <dd className="text-[24px] font-semibold leading-none text-fg tabular-nums">{received}</dd>
          <dt className="mt-1 text-[12px] text-fg-muted">Sinais recebidos</dt>
        </div>
        <div>
          <dd className="text-[24px] font-semibold leading-none text-success tabular-nums">{approved}</dd>
          <dt className="mt-1 text-[12px] text-fg-muted">Aprovados ({approvedRate.toFixed(1)}%)</dt>
        </div>
        <div>
          <dd className="text-[24px] font-semibold leading-none text-danger tabular-nums">{filtered}</dd>
          <dt className="mt-1 text-[12px] text-fg-muted">Filtrados ({filteredRate.toFixed(1)}%)</dt>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <Donut
          size={116}
          thickness={14}
          segments={[
            { value: approved, color: "#12d99e" },
            { value: filtered, color: "#ff4d6d" },
          ]}
        >
          <span className="text-[20px] font-semibold leading-none text-fg">{approvedRate.toFixed(1)}%</span>
          <span className="mt-0.5 text-[11px] text-fg-muted">Aprovados</span>
        </Donut>
        <ul className="min-w-[140px] flex-1 space-y-2 text-[13px]">
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-full bg-[#12d99e]" />
            <span className="flex-1 text-fg-muted">Aprovados</span>
            <span className="tabular-nums text-fg">{approvedRate.toFixed(1)}%</span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-full bg-[#ff4d6d]" />
            <span className="flex-1 text-fg-muted">Filtrados</span>
            <span className="tabular-nums text-fg">{filteredRate.toFixed(1)}%</span>
          </li>
        </ul>
      </div>
    </Panel>
  );
}
