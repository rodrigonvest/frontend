"use client";
import { useId } from "react";
import type { ChartVariant } from "../../lib/marketplace-data";

const GREEN = "#12d99e";
const RED = "#ff5d6d";

export function StrategyChart({
  series,
  variant,
  height = 64,
  grid = false,
  label,
}: {
  series: number[];
  variant: ChartVariant;
  height?: number;
  grid?: boolean;
  label: string;
}) {
  const gradientId = useId();
  const count = series.length;
  const range = Math.max(...series) - Math.min(...series) || 1;
  const wickAt = (index: number) => (((index * 37) % 7) + 1) * 0.045 * range;

  const high = Math.max(...series.map((value, index) => value + wickAt(index)));
  const low = Math.min(...series.map((value, index) => value - wickAt(index)));
  const span = variant === "candles" ? high - low || 1 : range;
  const floor = variant === "candles" ? low : Math.min(...series);
  const scaleY = (value: number) => 36 - ((value - floor) / span) * 32;
  const scaleX = (index: number) => (index / (count - 1)) * 100;

  const up = series[count - 1] >= series[0];
  const color = up ? GREEN : RED;

  const linePath = series.map((value, index) => `${index === 0 ? "M" : "L"}${scaleX(index).toFixed(2)} ${scaleY(value).toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L100 40 L0 40 Z`;
  const candleWidth = (100 / count) * 0.55;

  return (
    <svg role="img" aria-label={label} viewBox="0 0 100 40" preserveAspectRatio="none" style={{ height }} className="block w-full overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid &&
        [8, 16, 24, 32].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#18344b" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 4" />)}
      {variant === "line" ? (
        <>
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </>
      ) : (
        <>
          <path d={linePath} fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {series.slice(1).map((close, offset) => {
            const index = offset + 1;
            const open = series[index - 1];
            const bullish = close >= open;
            const candleColor = bullish ? GREEN : RED;
            const x = scaleX(index);
            const top = scaleY(Math.max(open, close));
            const bottom = scaleY(Math.min(open, close));
            return (
              <g key={index}>
                <line x1={x} x2={x} y1={scaleY(Math.max(open, close) + wickAt(index))} y2={scaleY(Math.min(open, close) - wickAt(index))} stroke={candleColor} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <rect x={x - candleWidth / 2} y={top} width={candleWidth} height={Math.max(bottom - top, 0.6)} fill={candleColor} />
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}
