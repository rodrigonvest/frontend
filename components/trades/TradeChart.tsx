"use client";
import { useEffect, useRef, useState } from "react";
import type { TradeRecord } from "../../lib/api";
import { demoCandles, type Candle } from "../../lib/demo-data";
import { EXIT_KEYS, fmt, meta, nmeta, time } from "../../lib/trade-format";
import { Icon } from "../Icons";
import { cx } from "../UI";

type Level = { key: string; label: string; value: number; tone: "danger" | "brand" | "success" | "muted" };

const toneStyles = {
  danger: { line: "#ff5d6d", chip: "border-danger/70 bg-[#3a1620] text-[#ffb0b8]" },
  brand: { line: "#37b9ff", chip: "border-brand/70 bg-[#0b3a5c] text-[#a8e0ff]" },
  success: { line: "#19d6a0", chip: "border-success/70 bg-[#073a33] text-[#8ff0d2]" },
  muted: { line: "#a9bacb", chip: "border-line-strong bg-surface-3 text-fg" },
};

function isCandle(x: unknown): x is Candle {
  if (!x || typeof x !== "object") return false;
  const c = x as Record<string, unknown>;
  return ["o", "h", "l", "c"].every((k) => typeof c[k] === "number") && typeof c.t === "string";
}

function candleSeries(trade: TradeRecord): { timeframe: string; candles: Candle[] } | null {
  const m = meta(trade);
  if (Array.isArray(m.candles)) {
    const candles = m.candles.filter(isCandle);
    if (candles.length > 1) return { timeframe: typeof m.timeframe === "string" ? m.timeframe : "", candles };
  }
  if (m.demo === true) return demoCandles(trade);
  return null;
}

function ChartBody({ trade }: { trade: TradeRecord }) {
  const m = meta(trade);
  const exit = nmeta(trade, EXIT_KEYS);
  const series = candleSeries(trade);
  const candles = series?.candles ?? [];
  const tpLabel = typeof m.tp_label === "string" && m.tp_label.startsWith("TP") ? m.tp_label : "TP";
  const levels: Level[] = [
    trade.stop_loss != null && { key: "sl", label: "SL", value: trade.stop_loss, tone: "danger" as const },
    trade.entry_price != null && { key: "entry", label: "Entry", value: trade.entry_price, tone: "brand" as const },
    trade.take_profit != null && { key: "tp", label: tpLabel, value: trade.take_profit, tone: "success" as const },
    !candles.length && exit != null && { key: "exit", label: "Saída", value: exit, tone: "muted" as const },
  ].filter(Boolean) as Level[];

  if (levels.length === 0 && !candles.length) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-surface-3 text-fg-subtle">
          <Icon name="candle" size={18} />
        </span>
        <p className="text-sm text-fg-muted">Níveis de preço não informados</p>
        <p className="text-xs text-fg-subtle">Esta operação não possui entrada, SL ou TP registrados.</p>
      </div>
    );
  }

  const values = [...levels.map((l) => l.value), ...candles.flatMap((c) => [c.h, c.l])];
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const span = rawMax - rawMin || Math.max(Math.abs(rawMax) * 0.002, 1);
  const min = rawMin - span * 0.12;
  const max = rawMax + span * 0.12;
  const y = (v: number) => ((max - v) / (max - min)) * 100;
  const ticks = Array.from({ length: 5 }, (_, i) => max - ((max - min) / 4) * i);
  const decimals = span < 1 ? 4 : 2;

  const n = candles.length;
  const slot = n ? 100 / n : 0;
  const cx_ = (i: number) => (i + 0.5) * slot;
  const entry = trade.entry_price;
  const outcome = exit != null && entry != null ? (trade.side === "SELL" ? entry - exit : exit - entry) : null;
  const entryIdx = n ? candles.findIndex((c) => c.t >= (trade.opened_at || trade.created_at)) : -1;
  const exitIdx = n && trade.closed_at ? candles.findIndex((c) => c.t >= (trade.closed_at as string)) : -1;
  const xLabels = n ? candles.map((c, i) => ({ i, t: c.t })).filter((_, i) => i % 5 === 0) : [];

  return (
    <div className="flex h-full min-h-[280px] flex-col">
      <p className="px-4 pt-1 text-[11px] font-medium text-fg-muted">
        {trade.symbol}
        {series?.timeframe ? ` • ${series.timeframe}` : ""}
      </p>
      <div className="relative flex-1">
        <div className="absolute inset-y-3 left-4 right-[76px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {ticks.map((t) => (
              <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} stroke="#17334b" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            {!n && entry != null && trade.stop_loss != null && (
              <rect x="0" width="100" y={Math.min(y(entry), y(trade.stop_loss))} height={Math.abs(y(entry) - y(trade.stop_loss))} fill="#ff5d6d" opacity="0.08" />
            )}
            {!n && entry != null && trade.take_profit != null && (
              <rect x="0" width="100" y={Math.min(y(entry), y(trade.take_profit))} height={Math.abs(y(entry) - y(trade.take_profit))} fill="#19d6a0" opacity="0.08" />
            )}
            {candles.map((c, i) => {
              const up = c.c >= c.o;
              const color = up ? "#19d6a0" : "#ff5d6d";
              const top = y(Math.max(c.o, c.c));
              const h = Math.max(Math.abs(y(c.o) - y(c.c)), 0.4);
              return (
                <g key={c.t + i}>
                  <line x1={cx_(i)} x2={cx_(i)} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <rect x={cx_(i) - slot * 0.32} width={slot * 0.64} y={top} height={h} fill={color} />
                </g>
              );
            })}
            {levels.map((l) => (
              <line
                key={l.key}
                x1="0"
                x2="100"
                y1={y(l.value)}
                y2={y(l.value)}
                stroke={toneStyles[l.tone].line}
                strokeWidth="1.25"
                strokeDasharray="5 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {!n && entry != null && exit != null && (
              <line x1="8" x2="92" y1={y(entry)} y2={y(exit)} stroke={outcome != null && outcome < 0 ? "#ff5d6d" : "#19d6a0"} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            )}
          </svg>
          {entry != null && (n ? entryIdx >= 0 : exit != null) && (
            <span aria-hidden className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-surface" style={{ left: `${n ? cx_(entryIdx) : 8}%`, top: `${y(entry)}%` }} />
          )}
          {exit != null && (n ? exitIdx >= 0 : entry != null) && (
            <span aria-hidden className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fg bg-surface" style={{ left: `${n ? cx_(exitIdx) : 92}%`, top: `${y(exit)}%` }} />
          )}
          {levels.map((l) => (
            <span
              key={l.key}
              className={cx("absolute right-1 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium tabular shadow-sm", toneStyles[l.tone].chip)}
              style={{ top: `${y(l.value)}%` }}
            >
              {l.label} {fmt(l.value, decimals)}
            </span>
          ))}
        </div>
        <div className="absolute inset-y-3 right-0 w-[68px] border-l border-line" aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute left-2 -translate-y-1/2 text-[10.5px] tabular text-fg-subtle" style={{ top: `${y(t)}%` }}>
              {fmt(t, decimals)}
            </span>
          ))}
        </div>
      </div>
      {n ? (
        <div className="relative mr-[68px] ml-4 h-7 border-t border-line text-[10.5px] tabular text-fg-subtle" aria-hidden>
          {xLabels.map(({ i, t }) => (
            <span key={t} className="absolute top-1.5 -translate-x-1/2" style={{ left: `${cx_(i)}%` }}>
              {time(t)}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-fg-subtle tabular">
          <span>Abertura {time(trade.opened_at || trade.created_at)}</span>
          <span>{trade.closed_at ? `Fechamento ${time(trade.closed_at)}` : "Em andamento"}</span>
        </div>
      )}
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
      <header className="flex items-center justify-between gap-3 px-4 pb-2 pt-4 sm:px-5">
        <h2 className="text-[15px] font-semibold text-fg">Gráfico da Operação</h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-disabled
            title="Integração com o terminal MT5 disponível em breve"
            className="hidden h-8 cursor-not-allowed items-center gap-1.5 rounded-lg border border-brand/40 px-2.5 text-xs text-[#7cd0ff] opacity-80 sm:inline-flex"
          >
            <Icon name="external" size={13} />
            Abrir no MT5
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            disabled={!trade}
            aria-label={isFullscreen ? "Sair da tela cheia" : "Ver em tela cheia"}
            className="flex size-8 items-center justify-center rounded-lg border border-brand/40 text-[#7cd0ff] hover:border-brand hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name={isFullscreen ? "shrink" : "expand"} size={14} />
          </button>
        </div>
      </header>
      <div className="flex-1">
        {trade ? (
          <ChartBody trade={trade} />
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-fg-subtle">Selecione uma operação na tabela</div>
        )}
      </div>
    </section>
  );
}
