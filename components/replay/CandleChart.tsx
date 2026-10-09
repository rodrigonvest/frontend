"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { bollinger, ema, niceTicks, sma, SIGNAL_INDEX, type Candle } from "../../lib/replay-chart";
import { fmtClock, fmtDate, fmtPrice, fmtShortDateTime, type IndicatorId, type ReplaySignal, type TimeframeId } from "../../lib/replay-data";

export interface ChartSettings {
  grid: boolean;
  crosshair: boolean;
  signalNote: boolean;
}

export const defaultChartSettings: ChartSettings = { grid: true, crosshair: true, signalNote: true };

const PAD = { top: 12, right: 70, bottom: 26, left: 8 };
const UP = "#12d99e";
const DOWN = "#ff5d6d";

interface Props {
  signal: ReplaySignal;
  tf: TimeframeId;
  candles: Candle[];
  visibleCount: number;
  replayActive: boolean;
  showAllTps: boolean;
  indicators: IndicatorId[];
  settings: ChartSettings;
}

function linePath(values: Array<number | null>, count: number, x: (i: number) => number, y: (v: number) => number) {
  let d = "";
  let pen = false;
  for (let i = 0; i < Math.min(count, values.length); i++) {
    const value = values[i];
    if (value === null) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${x(i).toFixed(1)} ${y(value).toFixed(1)} `;
    pen = true;
  }
  return d;
}

export default function CandleChart({ signal, tf, candles, visibleCount, replayActive, showAllTps, indicators, settings }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<{ index: number; y: number } | null>(null);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ w: Math.floor(entry.contentRect.width), h: Math.floor(entry.contentRect.height) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const closes = useMemo(() => candles.map((candle) => candle.close), [candles]);
  const series = useMemo(
    () => ({
      ma20: sma(closes, 20),
      ema50: ema(closes, 50),
      bb: bollinger(closes, 20, 2),
    }),
    [closes],
  );

  const domain = useMemo(() => {
    const levels = [signal.entry, signal.sl, ...signal.tps];
    const lo = Math.min(...candles.map((candle) => candle.low), ...levels);
    const hi = Math.max(...candles.map((candle) => candle.high), ...levels);
    const pad = (hi - lo) * 0.07;
    return { min: lo - pad, max: hi + pad };
  }, [candles, signal]);

  const withVolume = indicators.includes("vol");
  const plotW = Math.max(0, size.w - PAD.left - PAD.right);
  const plotH = Math.max(0, size.h - PAD.top - PAD.bottom);
  const volumeH = withVolume ? Math.round(plotH * 0.16) : 0;
  const priceH = plotH - volumeH - (withVolume ? 8 : 0);
  const step = plotW / candles.length;
  const x = (i: number) => PAD.left + (i + 0.5) * step;
  const y = (price: number) => PAD.top + ((domain.max - price) / (domain.max - domain.min)) * priceH;
  const decimals = signal.decimals >= 5 ? 4 : 2;
  const ticks = useMemo(() => niceTicks(domain.min, domain.max, Math.max(3, Math.round(priceH / 46))), [domain, priceH]);

  const signalVisible = !replayActive || visibleCount > SIGNAL_INDEX;
  const maxVolume = Math.max(...candles.map((candle) => candle.volume));
  const intraday = tf === "M1" || tf === "M5" || tf === "M15" || tf === "M30";
  const labelEvery = Math.max(1, Math.ceil((intraday ? 70 : 96) / Math.max(step, 1)));
  const timeLabels: number[] = [];
  for (let i = SIGNAL_INDEX; i < candles.length; i += labelEvery) timeLabels.push(i);
  for (let i = SIGNAL_INDEX - labelEvery; i >= 0; i -= labelEvery) timeLabels.push(i);

  const levels: Array<{ key: string; label: string; price: number; kind: "entry" | "sl" | "tp" }> = [
    { key: "tp3", label: "TP3", price: signal.tps[2], kind: "tp" },
    { key: "tp2", label: "TP2", price: signal.tps[1], kind: "tp" },
    { key: "tp1", label: "TP1", price: signal.tps[0], kind: "tp" },
    { key: "entry", label: "Entrada", price: signal.entry, kind: "entry" },
    { key: "sl", label: "SL", price: signal.sl, kind: "sl" },
  ];
  const shownLevels = levels.filter((level) => showAllTps || level.key !== "tp2" && level.key !== "tp3");

  const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const index = Math.floor((px - PAD.left) / step);
    if (index < 0 || index >= visibleCount) {
      setHover(null);
      return;
    }
    setHover({ index, y: event.clientY - rect.top });
  };

  const hovered = hover ? candles[hover.index] : null;
  const readoutCandle = hovered ?? candles[Math.max(0, visibleCount - 1)];
  const noteX = Math.max(PAD.left + 4, x(SIGNAL_INDEX) - 140);
  const noteY = Math.max(PAD.top + 6, y(signal.entry) - 92);

  return (
    <div ref={wrapRef} className="relative h-full w-full select-none">
      {size.w > 0 && size.h > 0 && (
        <svg
          width={size.w}
          height={size.h}
          role="img"
          aria-label={`Gráfico de candles ${signal.asset} em ${tf}. Sinal ${signal.direction} com entrada em ${fmtPrice(signal.entry, signal.decimals)}, stop loss em ${fmtPrice(signal.sl, signal.decimals)} e alvos em ${signal.tps.map((tp) => fmtPrice(tp, signal.decimals)).join(", ")}.`}
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
          className="block"
        >
          {settings.grid &&
            ticks.map((tick) => (
              <line key={tick} x1={PAD.left} x2={PAD.left + plotW} y1={y(tick)} y2={y(tick)} stroke="#18344b" strokeOpacity={0.7} />
            ))}
          {settings.grid &&
            timeLabels.map((i) => (
              <line key={`v${i}`} x1={x(i)} x2={x(i)} y1={PAD.top} y2={PAD.top + plotH} stroke="#18344b" strokeOpacity={0.45} />
            ))}

          {ticks.map((tick) => (
            <text key={`t${tick}`} x={PAD.left + plotW + 8} y={y(tick) + 4} fill="#8197ac" fontSize={11} className="tabular">
              {fmtPrice(tick, decimals)}
            </text>
          ))}

          {indicators.includes("bb") && (
            <g>
              <path
                d={`${linePath(series.bb.upper, visibleCount, x, y)}`}
                fill="none"
                stroke="#5cc2ff"
                strokeWidth={1}
                strokeOpacity={0.8}
              />
              <path d={linePath(series.bb.lower, visibleCount, x, y)} fill="none" stroke="#5cc2ff" strokeWidth={1} strokeOpacity={0.8} />
              <path d={linePath(series.bb.middle, visibleCount, x, y)} fill="none" stroke="#5cc2ff" strokeWidth={1} strokeDasharray="3 3" strokeOpacity={0.55} />
            </g>
          )}

          {signalVisible &&
            shownLevels.map((level) => {
              const color = level.kind === "tp" ? UP : level.kind === "sl" ? DOWN : "#159af2";
              return (
                <line
                  key={level.key}
                  x1={x(SIGNAL_INDEX)}
                  x2={PAD.left + plotW}
                  y1={y(level.price)}
                  y2={y(level.price)}
                  stroke={color}
                  strokeWidth={1.2}
                  strokeDasharray="5 4"
                  strokeOpacity={0.95}
                />
              );
            })}

          {withVolume &&
            candles.slice(0, visibleCount).map((candle, i) => {
              const h = Math.max(1, (candle.volume / maxVolume) * volumeH);
              return (
                <rect
                  key={`vol${candle.time}`}
                  x={x(i) - step * 0.3}
                  width={Math.max(1, step * 0.6)}
                  y={PAD.top + plotH - h}
                  height={h}
                  fill={candle.close >= candle.open ? UP : DOWN}
                  fillOpacity={0.35}
                />
              );
            })}

          {candles.slice(0, visibleCount).map((candle, i) => {
            const up = candle.close >= candle.open;
            const color = up ? UP : DOWN;
            const top = y(Math.max(candle.open, candle.close));
            const bottom = y(Math.min(candle.open, candle.close));
            const bodyW = Math.max(2, step * 0.62);
            return (
              <g key={candle.time}>
                <line x1={x(i)} x2={x(i)} y1={y(candle.high)} y2={y(candle.low)} stroke={color} strokeWidth={1} />
                <rect x={x(i) - bodyW / 2} y={top} width={bodyW} height={Math.max(1.5, bottom - top)} fill={color} rx={0.5} />
              </g>
            );
          })}

          {indicators.includes("ma20") && (
            <path d={linePath(series.ma20, visibleCount, x, y)} fill="none" stroke="#f0c35c" strokeWidth={1.5} />
          )}
          {indicators.includes("ema50") && (
            <path d={linePath(series.ema50, visibleCount, x, y)} fill="none" stroke="#a78bfa" strokeWidth={1.5} />
          )}

          {replayActive && visibleCount < candles.length && (
            <g>
              <line x1={x(visibleCount - 1)} x2={x(visibleCount - 1)} y1={PAD.top} y2={PAD.top + plotH} stroke="#159af2" strokeOpacity={0.55} />
              <path d={`M${x(visibleCount - 1) - 4} ${PAD.top} h8 l-4 6 z`} fill="#159af2" />
            </g>
          )}

          {signalVisible && (
            <g>
              <line
                x1={x(SIGNAL_INDEX)}
                x2={x(SIGNAL_INDEX)}
                y1={PAD.top}
                y2={PAD.top + plotH}
                stroke="#e3edf5"
                strokeOpacity={0.55}
                strokeDasharray="3 4"
              />
              {shownLevels.map((level) => {
                const label = `${level.label} (${fmtPrice(level.price, signal.decimals)})`;
                const width = 16 + label.length * 6.3;
                const px = PAD.left + plotW - width - 4;
                const py = y(level.price) - 9;
                const fill = level.kind === "tp" ? "#073a2c" : level.kind === "sl" ? "#e5384b" : "#087ff0";
                const stroke = level.kind === "tp" ? UP : level.kind === "sl" ? "#ff8a96" : "#5cc2ff";
                return (
                  <g key={`label-${level.key}`}>
                    <rect x={px} y={py} width={width} height={18} rx={3} fill={fill} stroke={stroke} strokeWidth={1} />
                    <text x={px + width / 2} y={py + 12.5} textAnchor="middle" fill="#ffffff" fontSize={11} fontWeight={500} className="tabular">
                      {label}
                    </text>
                  </g>
                );
              })}
              {settings.signalNote && (
                <g>
                  <rect x={noteX} y={noteY} width={132} height={40} rx={6} fill="#0e2438" stroke="#2a4c68" />
                  <text x={noteX + 12} y={noteY + 17} fill="#f2f6fa" fontSize={12} fontWeight={600}>
                    Sinal Recebido
                  </text>
                  <text x={noteX + 12} y={noteY + 32} fill="#8197ac" fontSize={11} className="tabular">
                    {fmtShortDateTime(signal.time)}
                  </text>
                </g>
              )}
              <g transform={`translate(${x(SIGNAL_INDEX)} ${y(signal.entry)})`}>
                <circle r={12} fill="#087ff0" stroke="#ffffff" strokeWidth={2} />
                <path d="M-5.5 0.2 L5.5 -4.8 L3.2 5 L-0.2 2.4 L-2.6 4.6 L-2.4 1.4 Z" fill="#ffffff" />
              </g>
            </g>
          )}

          {settings.crosshair && hover && hovered && (
            <g pointerEvents="none">
              <line x1={x(hover.index)} x2={x(hover.index)} y1={PAD.top} y2={PAD.top + plotH} stroke="#b7c8d9" strokeOpacity={0.5} strokeDasharray="2 3" />
              <line x1={PAD.left} x2={PAD.left + plotW} y1={hover.y} y2={hover.y} stroke="#b7c8d9" strokeOpacity={0.35} strokeDasharray="2 3" />
            </g>
          )}

          {timeLabels.map((i) => {
            const time = candles[i].time;
            const isSignal = i === SIGNAL_INDEX;
            return (
              <text
                key={`x${i}`}
                x={x(i)}
                y={size.h - 8}
                textAnchor="middle"
                fill={isSignal ? "#159af2" : "#8197ac"}
                fontSize={11}
                fontWeight={isSignal ? 600 : 400}
                className="tabular"
              >
                {intraday ? fmtClock(time) : `${fmtDate(time).slice(0, 5)} ${fmtClock(time)}`}
              </text>
            );
          })}
        </svg>
      )}

      {settings.crosshair && readoutCandle && (
        <div
          aria-hidden
          className="tabular pointer-events-none absolute left-3 top-2 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-x-3 gap-y-0.5 rounded-md bg-canvas/70 px-2 py-1 text-[11px] text-fg-subtle backdrop-blur-sm"
        >
          <span>{fmtShortDateTime(readoutCandle.time)}</span>
          <span>A <b className="font-medium text-fg-muted">{fmtPrice(readoutCandle.open, signal.decimals)}</b></span>
          <span>Máx <b className="font-medium text-fg-muted">{fmtPrice(readoutCandle.high, signal.decimals)}</b></span>
          <span>Mín <b className="font-medium text-fg-muted">{fmtPrice(readoutCandle.low, signal.decimals)}</b></span>
          <span>F <b className={readoutCandle.close >= readoutCandle.open ? "font-medium text-success" : "font-medium text-danger"}>{fmtPrice(readoutCandle.close, signal.decimals)}</b></span>
        </div>
      )}
    </div>
  );
}
