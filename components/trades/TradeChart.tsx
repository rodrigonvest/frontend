"use client";
import { useEffect, useRef, useState } from "react";
import type { TradeRecord } from "../../lib/api";
import { EXIT_KEYS, fmt, nmeta, time } from "../../lib/trade-format";
import { Icon } from "../Icons";
import { cx } from "../UI";

type Level = { key: string; label: string; value: number; tone: "danger" | "brand" | "success" | "muted" };

const toneStyles = {
  danger: { line: "#ff5d6d", chip: "border-danger/60 bg-[#3a1620] text-[#ff8a96]" },
  brand: { line: "#37b9ff", chip: "border-brand/60 bg-[#0b3a5c] text-[#7cd0ff]" },
  success: { line: "#19d6a0", chip: "border-success/60 bg-[#073a33] text-[#5be8bf]" },
  muted: { line: "#a9bacb", chip: "border-line-strong bg-surface-3 text-fg" },
};

function ChartBody({ trade }: { trade: TradeRecord }) {
  const exit = nmeta(trade, EXIT_KEYS);
  const levels: Level[] = [
    trade.stop_loss != null && { key: "sl", label: "SL", value: trade.stop_loss, tone: "danger" as const },
    trade.entry_price != null && { key: "entry", label: "Entrada", value: trade.entry_price, tone: "brand" as const },
    trade.take_profit != null && { key: "tp", label: "TP", value: trade.take_profit, tone: "success" as const },
    exit != null && { key: "exit", label: "Saída", value: exit, tone: "muted" as const },
  ].filter(Boolean) as Level[];

  if (levels.length === 0) {
    return (
      <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-2 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-surface-3 text-fg-subtle">
          <Icon name="candle" size={18} />
        </span>
        <p className="text-sm text-fg-muted">Níveis de preço não informados</p>
        <p className="text-xs text-fg-subtle">Esta operação não possui entrada, SL ou TP registrados.</p>
      </div>
    );
  }

  const values = levels.map((l) => l.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const span = rawMax - rawMin || Math.max(Math.abs(rawMax) * 0.002, 1);
  const min = rawMin - span * 0.22;
  const max = rawMax + span * 0.22;
  const y = (v: number) => ((max - v) / (max - min)) * 100;
  const ticks = Array.from({ length: 5 }, (_, i) => max - ((max - min) / 4) * i);
  const decimals = span < 1 ? 4 : 2;

  const entry = trade.entry_price;
  const sl = trade.stop_loss;
  const tp = trade.take_profit;
  const outcome = exit != null && entry != null ? (trade.side === "SELL" ? entry - exit : exit - entry) : null;

  return (
    <div className="flex h-full min-h-[260px] flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-y-3 left-4 right-[84px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {ticks.map((t) => (
              <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} stroke="#17334b" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line key={x} x1={x} x2={x} y1="0" y2="100" stroke="#10283d" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            {entry != null && sl != null && (
              <rect x="0" width="100" y={Math.min(y(entry), y(sl))} height={Math.abs(y(entry) - y(sl))} fill="#ff5d6d" opacity="0.08" />
            )}
            {entry != null && tp != null && (
              <rect x="0" width="100" y={Math.min(y(entry), y(tp))} height={Math.abs(y(entry) - y(tp))} fill="#19d6a0" opacity="0.08" />
            )}
            {levels.map((l) => (
              <line
                key={l.key}
                x1="0"
                x2="100"
                y1={y(l.value)}
                y2={y(l.value)}
                stroke={toneStyles[l.tone].line}
                strokeWidth="1.5"
                strokeDasharray={l.key === "entry" ? "0" : "6 5"}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {entry != null && exit != null && (
              <line
                x1="8"
                x2="92"
                y1={y(entry)}
                y2={y(exit)}
                stroke={outcome != null && outcome < 0 ? "#ff5d6d" : "#19d6a0"}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
          {entry != null && exit != null && (
            <>
              <span aria-hidden className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-surface" style={{ left: "8%", top: `${y(entry)}%` }} />
              <span aria-hidden className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fg bg-surface" style={{ left: "92%", top: `${y(exit)}%` }} />
            </>
          )}
          {levels.map((l) => (
            <span
              key={l.key}
              className={cx("absolute right-2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium tabular shadow-sm", toneStyles[l.tone].chip)}
              style={{ top: `${y(l.value)}%` }}
            >
              {l.label} {fmt(l.value, decimals)}
            </span>
          ))}
        </div>
        <div className="absolute inset-y-3 right-0 w-[76px] border-l border-line" aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute left-2 -translate-y-1/2 text-[10.5px] tabular text-fg-subtle" style={{ top: `${y(t)}%` }}>
              {fmt(t, decimals)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-fg-subtle tabular">
        <span>Abertura {time(trade.opened_at || trade.created_at)}</span>
        <span>{trade.closed_at ? `Fechamento ${time(trade.closed_at)}` : "Em andamento"}</span>
      </div>
    </div>
  );
}

export default function TradeChart({ trade }: { trade: TradeRecord | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === ref.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void ref.current?.requestFullscreen?.();
  };

  return (
    <section
      ref={ref}
      id="trade-chart"
      aria-label="Gráfico da operação"
      className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-surface"
    >
      <header className="flex items-center justify-between gap-3 px-5 pb-2 pt-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-fg">Gráfico da operação</h2>
          <p className="mt-0.5 text-xs text-fg-subtle">
            {trade ? `${trade.symbol} · níveis registrados pelo executor` : "Aguardando seleção"}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            title="Disponível em breve"
            className="hidden h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs text-fg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:inline-flex"
          >
            <Icon name="external" size={13} />
            Abrir no MT5
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            disabled={!trade}
            aria-label={isFullscreen ? "Sair da tela cheia" : "Ver em tela cheia"}
            className="flex size-8 items-center justify-center rounded-lg border border-line text-fg-muted hover:border-line-strong hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name={isFullscreen ? "shrink" : "expand"} size={14} />
          </button>
        </div>
      </header>
      <div className="flex-1 bg-[#071522]/60">
        {trade ? (
          <ChartBody trade={trade} />
        ) : (
          <div className="flex h-full min-h-[260px] items-center justify-center text-sm text-fg-subtle">Selecione uma operação na tabela</div>
        )}
      </div>
    </section>
  );
}
