import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import DetailPanel from "./DetailPanel";
import { tradeCandles, tradeLevels, tradeTimeframes } from "../../lib/trade-details-demo";

const MIN = 2637;
const MAX = 2649;
const T0 = 11 * 60 + 50;
const SPAN = 260;
const GRID = "#15304a";

const y = (v: number) => ((MAX - v) / (MAX - MIN)) * 100;
const candleX = (i: number) => ((5 + i * 5 + 2.5) / SPAN) * 100;
const priceTicks = [2648, 2646, 2644, 2642, 2640, 2638];
const timeLabels = Array.from({ length: 9 }, (_, i) => {
  const minutes = 12 * 60 + i * 30;
  return {
    left: ((minutes - T0) / SPAN) * 100,
    label: `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
  };
});

const fmt = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const toolbar: ReactNode[] = [
  <svg key="cross" width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><circle cx="12" cy="12" r=".6" fill="currentColor" /></svg>,
  <svg key="line" width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="5.5" cy="18.5" r="1.8" /><circle cx="18.5" cy="5.5" r="1.8" /><path d="m7 17 10-10" /></svg>,
  <svg key="fib" width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M4 6h16M4 11h16M4 16h16M4 21h10" /></svg>,
  <svg key="brush" width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="m14 5 5 5-8 8-5 1 1-5 7-9Z" /><path d="m4 20 3-3" /></svg>,
  <svg key="text" width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M5 6V4h14v2M12 4v16M9 20h6" /></svg>,
  <svg key="nodes" width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m7 7 10 10M17 7 7 17" /></svg>,
  <svg key="ruler" width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="5" cy="7" r="1.6" /><circle cx="5" cy="17" r="1.6" /><path d="M10 7h10M10 17h10M10 12h6" /></svg>,
  <svg key="clock" width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
];

function Tag({ tone, children, style, className }: { tone: "green" | "red"; children: ReactNode; style: React.CSSProperties; className?: string }) {
  return (
    <span
      className={cx(
        "absolute whitespace-nowrap rounded-[5px] border text-[10.5px] font-semibold leading-[13px] tabular",
        tone === "green" ? "border-success/70 bg-[#073a33]/90 text-success" : "border-danger/70 bg-[#3a1620]/90 text-danger",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

function Dot({ x, yy, tone }: { x: number; yy: number; tone: "green" | "red" }) {
  return (
    <span
      aria-hidden
      className={cx("absolute size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#06111d]", tone === "green" ? "bg-success" : "bg-danger")}
      style={{ left: `${x}%`, top: `${yy}%` }}
    />
  );
}

export default function TradeChartCard() {
  const { entry, stopLoss, takeProfit, entryIndex, exitIndex } = tradeLevels;
  const slot = (5 / SPAN) * 100;
  const entryX = candleX(entryIndex);
  const exitX = candleX(exitIndex);

  return (
    <DetailPanel
      title="Gráfico da Operação"
      icon={<Icon name="analytics" size={20} />}
      action={
        <div role="group" aria-label="Timeframe" className="flex items-center rounded-md border border-[#17344b] bg-[#091a2a] p-0.5">
          {tradeTimeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              aria-pressed={tf === "M5"}
              className={cx(
                "h-7 min-w-[34px] rounded px-2 text-[12px] font-medium transition-colors",
                tf === "M5" ? "border border-brand-strong bg-brand-soft text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      }
    >
      <div className="mx-3.5 mb-3.5 mt-2 overflow-hidden rounded-lg border border-[#17344b] bg-[#071827]">
        <div className="relative h-[320px]">
          <div aria-hidden className="absolute inset-y-0 left-0 flex w-10 flex-col items-center gap-1 border-r border-[#17344b] pt-9 text-fg-muted">
            {toolbar.map((t, i) => (
              <span key={i} className="flex size-8 items-center justify-center rounded hover:text-fg">{t}</span>
            ))}
          </div>

          <div className="absolute left-12 right-[72px] top-2 z-10 flex flex-wrap items-center gap-x-2 text-[12px] tabular">
            <span className="font-semibold text-fg">XAUUSD · 5 · OANDA</span>
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            <span className="text-success">
              <span className="text-fg-muted">O</span>2641.98 <span className="text-fg-muted">H</span>2646.12 <span className="text-fg-muted">L</span>2641.80 <span className="text-fg-muted">C</span>2645.90 +3.92 (+0.15%)
            </span>
          </div>

          <div role="img" aria-label="Gráfico de candles de XAUUSD em M5 com entrada em 2.642,15, stop loss em 2.640,15 e TP3 em 2.645,90" className="absolute bottom-7 left-10 right-[72px] top-9">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {priceTicks.map((t) => (
                <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              {timeLabels.map((t) => (
                <line key={t.label} x1={t.left} x2={t.left} y1="0" y2="100" stroke={GRID} strokeWidth="1" opacity=".6" vectorEffect="non-scaling-stroke" />
              ))}
              {tradeCandles.map((c, i) => {
                const up = c.c >= c.o;
                const color = up ? "#12d99e" : "#ff5d6d";
                return (
                  <g key={i}>
                    <line x1={candleX(i)} x2={candleX(i)} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x={candleX(i) - slot * 0.3} width={slot * 0.6} y={y(Math.max(c.o, c.c))} height={Math.max(Math.abs(y(c.o) - y(c.c)), 0.5)} fill={color} />
                  </g>
                );
              })}
              <line x1="0" x2="100" y1={y(takeProfit)} y2={y(takeProfit)} stroke="#12d99e" strokeWidth="1.2" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
              <line x1="0" x2="100" y1={y(entry)} y2={y(entry)} stroke="#37b9ff" strokeWidth="1" strokeDasharray="3 4" opacity=".55" vectorEffect="non-scaling-stroke" />
              <line x1="0" x2="100" y1={y(stopLoss)} y2={y(stopLoss)} stroke="#ff5d6d" strokeWidth="1.2" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
              <line x1={entryX} x2={entryX} y1={y(takeProfit)} y2={y(entry)} stroke="#12d99e" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <line x1={entryX} x2={entryX} y1={y(entry)} y2={y(stopLoss)} stroke="#ff5d6d" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>

            <Tag tone="green" className="px-2 py-[3px] text-[11px]" style={{ left: `${exitX}%`, top: `${y(takeProfit)}%`, transform: "translate(-50%, calc(-100% - 10px))" }}>
              TP3
            </Tag>
            <Dot x={exitX} yy={y(takeProfit)} tone="green" />
            <Dot x={entryX} yy={y(entry)} tone="green" />
            <Dot x={entryX} yy={y(stopLoss)} tone="red" />

            <Tag tone="green" className="flex items-center gap-1.5 px-2 py-1" style={{ left: `calc(${entryX}% + 10px)`, top: `calc(${y(entry)}% - 30px)` }}>
              <span aria-hidden className="text-[13px] leading-none">↑</span>
              <span className="flex flex-col font-medium text-success/90">
                <span>Entrada</span>
                <span>{fmt(entry)}</span>
              </span>
            </Tag>
            <Tag tone="red" className="flex items-center gap-1.5 px-2 py-1" style={{ left: `calc(${entryX}% + 10px)`, top: `calc(${y(stopLoss)}% + 6px)` }}>
              <span aria-hidden className="text-[13px] leading-none">↑</span>
              <span className="flex flex-col font-medium">
                <span>SL</span>
                <span>{fmt(stopLoss)}</span>
              </span>
            </Tag>
          </div>

          <div aria-hidden className="absolute bottom-7 right-0 top-9 w-[72px]">
            {priceTicks.map((t) => (
              <span key={t} className="absolute left-3 -translate-y-1/2 text-[11px] tabular text-fg-muted" style={{ top: `${y(t)}%` }}>
                {fmt(t)}
              </span>
            ))}
            <span
              className="absolute left-0 right-0 -translate-y-1/2 bg-success px-1.5 py-[2px] text-center text-[11px] font-semibold tabular text-[#032a22]"
              style={{ top: `${y(takeProfit)}%` }}
            >
              {fmt(takeProfit)}
            </span>
          </div>

          <div aria-hidden className="absolute inset-x-0 bottom-0 h-7">
            <div className="absolute inset-y-0 left-10 right-[72px] border-t border-[#17344b]">
              {timeLabels.map((t) => (
                <span key={t.label} className="absolute top-2 -translate-x-1/2 text-[11px] tabular text-fg-muted" style={{ left: `${t.left}%` }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DetailPanel>
  );
}
