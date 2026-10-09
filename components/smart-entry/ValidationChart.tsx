"use client";
import { useMemo, useState } from "react";
import { cx } from "../UI";
import { Panel } from "../risk-management/RiskFields";
import { buildChart, signal, timeframes, type Timeframe } from "../../lib/smart-entry-demo";

const W = 640;
const H = 300;
const PLOT = { left: 6, right: W - 72, top: 12, bottom: H - 24 };
const COLORS = { up: "#12d99e", down: "#ff5d6d", ema50: "#159af2", ema200: "#f59e0b", entry: "#159af2", grid: "#18344b", text: "#8197ac" };

function niceTicks(min: number, max: number, count: number) {
  const step = Math.max(0.5, Math.ceil((max - min) / count / 0.5) * 0.5);
  const first = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = first; v <= max; v += step) ticks.push(v);
  return ticks;
}

function ChartCanvas({ timeframe }: { timeframe: Timeframe }) {
  const chart = useMemo(() => buildChart(timeframe), [timeframe]);
  const { candles, ema50, ema200, signalIndex, times } = chart;

  const lows = candles.map((c) => c.low);
  const highs = candles.map((c) => c.high);
  const min = Math.min(...lows, ...ema50, ...ema200, signal.stopLoss) - 0.8;
  const max = Math.max(...highs, ...ema50, ...ema200, signal.takeProfit) + 0.8;
  const y = (value: number) => PLOT.top + ((max - value) / (max - min)) * (PLOT.bottom - PLOT.top);
  const slot = (PLOT.right - PLOT.left) / candles.length;
  const x = (index: number) => PLOT.left + slot * (index + 0.5);
  const line = (values: number[]) => values.map((value, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");

  const levels = [
    { id: "tp", value: signal.takeProfit, label: "TP", color: COLORS.up, textColor: "#06111d" },
    { id: "entry", value: signal.entry, label: "Entrada", color: COLORS.entry, textColor: "#ffffff" },
    { id: "sl", value: signal.stopLoss, label: "SL", color: COLORS.down, textColor: "#ffffff" },
  ];
  const ticks = niceTicks(min, max, 6).filter((tick) => levels.every((level) => Math.abs(y(tick) - y(level.value)) > 13));
  const labelEvery = Math.ceil(candles.length / 6);

  return (
    <svg
      role="img"
      aria-label={`Gráfico candlestick de ${signal.symbol} em ${timeframe} com EMA 50, EMA 200, entrada em ${signal.entry}, take profit e stop loss`}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={PLOT.left} x2={PLOT.right} y1={y(tick)} y2={y(tick)} stroke={COLORS.grid} strokeWidth="1" />
          <text x={PLOT.right + 6} y={y(tick) + 3.5} fill={COLORS.text} fontSize="10.5">
            {tick.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </text>
        </g>
      ))}

      {times.map((time, i) =>
        i % labelEvery === 0 ? (
          <text key={`${time}-${i}`} x={x(i)} y={H - 6} textAnchor="middle" fill={COLORS.text} fontSize="10.5">
            {time}
          </text>
        ) : null,
      )}

      {candles.map((c, i) => {
        const color = c.close >= c.open ? COLORS.up : COLORS.down;
        const bodyTop = y(Math.max(c.open, c.close));
        const bodyHeight = Math.max(1.5, Math.abs(y(c.open) - y(c.close)));
        const width = Math.max(2, slot * 0.62);
        return (
          <g key={i}>
            <line x1={x(i)} x2={x(i)} y1={y(c.high)} y2={y(c.low)} stroke={color} strokeWidth="1.2" />
            <rect x={x(i) - width / 2} y={bodyTop} width={width} height={bodyHeight} fill={color} rx="0.5" />
          </g>
        );
      })}

      <path d={line(ema200)} fill="none" stroke={COLORS.ema200} strokeWidth="2" strokeLinejoin="round" />
      <path d={line(ema50)} fill="none" stroke={COLORS.ema50} strokeWidth="2" strokeLinejoin="round" />

      {levels.map((level) => (
        <g key={level.id}>
          <line x1={PLOT.left} x2={PLOT.right} y1={y(level.value)} y2={y(level.value)} stroke={level.color} strokeWidth="1.2" strokeDasharray="5 4" />
          <rect x={PLOT.right + 2} y={y(level.value) - 8} width={W - PLOT.right - 4} height="16" rx="2" fill={level.color} />
          <text x={PLOT.right + 6} y={y(level.value) + 3.8} fill={level.textColor} fontSize="10" fontWeight="600">
            {level.label} {level.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </text>
        </g>
      ))}

      <circle cx={x(signalIndex)} cy={y(signal.entry)} r="6" fill={COLORS.up} stroke="#06111d" strokeWidth="2" />
      <text x={x(signalIndex)} y={y(signal.entry) - 11} textAnchor="middle" fill={COLORS.up} fontSize="10.5" fontWeight="600">
        Sinal
      </text>
    </svg>
  );
}

const legend = [
  { label: "EMA 50", color: COLORS.ema50, shape: "bar" },
  { label: "EMA 200", color: COLORS.ema200, shape: "bar" },
  { label: "Sinal", color: COLORS.up, shape: "dot" },
  { label: "Entrada", color: COLORS.entry, shape: "dot" },
  { label: "TP", color: COLORS.up, shape: "dot" },
  { label: "SL", color: COLORS.down, shape: "dot" },
];

export default function ValidationChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("M5");

  return (
    <Panel
      title="Gráfico com Validação"
      icon="candle"
      className="flex-1"
      action={
        <div role="group" aria-label="Timeframe do gráfico" className="flex overflow-hidden rounded-md border border-line">
          {timeframes.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === timeframe}
              onClick={() => setTimeframe(item)}
              className={cx(
                "h-7 min-w-9 px-2 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                item === timeframe ? "bg-brand-strong text-white" : "bg-canvas text-fg-muted hover:text-fg",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      }
    >
      <div className="rounded-lg border border-line bg-canvas/60 p-2">
        <ChartCanvas timeframe={timeframe} />
      </div>
      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-fg-muted">
        {legend.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-1.5">
            <span aria-hidden className={item.shape === "bar" ? "h-[3px] w-3.5 rounded-full" : "size-2.5 rounded-full"} style={{ background: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
