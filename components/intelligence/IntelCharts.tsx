"use client";
import { useEffect, useId, useRef, useState } from "react";
import { colors, type PerfPoint, type PeriodResult } from "../../lib/intelligence-demo";

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    setWidth(Math.round(element.clientWidth));
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

const TICKS = [-4000, 0, 4000, 8000, 12000];
const LO = -4000;
const HI = 12000;
const fmt = (value: number) => value.toLocaleString("pt-BR");

export function LegendDot({ color, label, dashed = false }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-fg-muted">
      {dashed ? (
        <span aria-hidden className="w-4 border-t-2 border-dashed" style={{ borderColor: color }} />
      ) : (
        <span aria-hidden className="size-2.5 rounded-sm" style={{ background: color }} />
      )}
      {label}
    </span>
  );
}

export function PerformanceChart({ data, height = 200 }: { data: PerfPoint[]; height?: number }) {
  const [ref, width] = useWidth();
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const n = data.length;
  const padL = 50;
  const padR = 10;
  const padT = 8;
  const padB = 24;
  const plotW = Math.max(width - padL - padR, 1);
  const plotH = height - padT - padB;
  const x = (i: number) => padL + (i / (n - 1)) * plotW;
  const y = (value: number) => padT + ((HI - value) / (HI - LO)) * plotH;

  const path = (key: "current" | "optimized") => data.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");
  const area = (key: "current" | "optimized") => `${path(key)} L${x(n - 1).toFixed(1)} ${y(0).toFixed(1)} L${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;
  const labelIndexes = [0, 7, 14, 21, n - 1];

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const index = Math.round(((event.clientX - rect.left - padL) / plotW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, index)));
  };

  const hovered = hover === null ? null : data[hover];
  const tipW = 140;
  const tipX = hover === null ? 0 : x(hover) + 12 + tipW > width ? x(hover) - 12 - tipW : x(hover) + 12;

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={`Comparação entre resultado atual (${fmt(data[n - 1].current)}) e resultado otimizado pela IA (${fmt(data[n - 1].optimized)}) entre 01/09 e 30/09`}
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
          className="touch-pan-y"
        >
          <defs>
            <linearGradient id={`${uid}-cur`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.blue} stopOpacity={0.3} />
              <stop offset="100%" stopColor={colors.blue} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id={`${uid}-opt`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.green} stopOpacity={0.28} />
              <stop offset="100%" stopColor={colors.green} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {TICKS.map((tick) => (
            <g key={tick}>
              <line x1={padL} x2={width - padR} y1={y(tick)} y2={y(tick)} stroke={tick === 0 ? "#40576b" : "#18344b"} />
              <text x={padL - 8} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="#b7c8d9">
                {fmt(tick)}
              </text>
            </g>
          ))}
          <path d={area("optimized")} fill={`url(#${uid}-opt)`} />
          <path d={area("current")} fill={`url(#${uid}-cur)`} />
          <path d={path("optimized")} fill="none" stroke={colors.green} strokeWidth={2} strokeDasharray="6 4" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${colors.green}80)` }} />
          <path d={path("current")} fill="none" stroke={colors.blue} strokeWidth={2} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${colors.blue}80)` }} />
          {labelIndexes.map((index) => (
            <text key={index} x={x(index)} y={height - 6} textAnchor={index === 0 ? "start" : index === n - 1 ? "end" : "middle"} fontSize={11} fill="#b7c8d9">
              {data[index].label}
            </text>
          ))}
          {hover !== null && hovered && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={padT} y2={height - padB} stroke="#2a4c68" strokeDasharray="3 3" />
              <circle cx={x(hover)} cy={y(hovered.current)} r={4} fill={colors.blue} stroke="#06111d" strokeWidth={2} />
              <circle cx={x(hover)} cy={y(hovered.optimized)} r={4} fill={colors.green} stroke="#06111d" strokeWidth={2} />
              <rect x={tipX} y={padT + 4} width={tipW} height={58} rx={6} fill="#0e2438" stroke="#2a4c68" />
              <text x={tipX + 10} y={padT + 20} fontSize={11} fill="#b7c8d9">
                {hovered.label}
              </text>
              <text x={tipX + 10} y={padT + 36} fontSize={12} fontWeight={600} fill={colors.blue}>
                Atual: {fmt(hovered.current)}
              </text>
              <text x={tipX + 10} y={padT + 52} fontSize={12} fontWeight={600} fill={colors.green}>
                IA: {fmt(hovered.optimized)}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}

export function ResultsChart({ data, height = 190 }: { data: PeriodResult[]; height?: number }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const n = data.length;
  const padL = 50;
  const padR = 10;
  const padT = 8;
  const padB = 24;
  const plotW = Math.max(width - padL - padR, 1);
  const plotH = height - padT - padB;
  const slot = plotW / n;
  const barW = Math.min(slot * 0.34, 34);
  const cx = (i: number) => padL + slot * (i + 0.5);
  const y = (value: number) => padT + ((HI - value) / (HI - LO)) * plotH;
  const optimizedPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${cx(i).toFixed(1)} ${y(d.optimized).toFixed(1)}`).join(" ");

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const index = Math.floor((event.clientX - rect.left - padL) / slot);
    setHover(index >= 0 && index < n ? index : null);
  };

  const hovered = hover === null ? null : data[hover];
  const tipW = 142;
  const tipX = hover === null ? 0 : cx(hover) + barW + 6 + tipW > width ? cx(hover) - barW - 6 - tipW : cx(hover) + barW + 6;

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Distribuição de lucro, prejuízo e resultado otimizado pela IA de junho a setembro de 2026"
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
          className="touch-pan-y"
        >
          {TICKS.map((tick) => (
            <g key={tick}>
              <line x1={padL} x2={width - padR} y1={y(tick)} y2={y(tick)} stroke={tick === 0 ? "#40576b" : "#18344b"} />
              <text x={padL - 8} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="#b7c8d9">
                {fmt(tick)}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <g key={d.label}>
              <rect x={cx(i) - barW / 2} y={y(d.profit)} width={barW} height={y(0) - y(d.profit)} rx={2} fill={colors.green} opacity={hover === null || hover === i ? 0.95 : 0.55} />
              <rect x={cx(i) - barW / 2} y={y(0)} width={barW} height={y(d.loss) - y(0)} rx={2} fill={colors.red} opacity={hover === null || hover === i ? 0.95 : 0.55} />
              <text x={cx(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="#b7c8d9">
                {d.label}
              </text>
            </g>
          ))}
          <path d={optimizedPath} fill="none" stroke={colors.green} strokeWidth={2} strokeDasharray="6 4" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${colors.green}80)` }} />
          {data.map((d, i) => (
            <circle key={d.label} cx={cx(i)} cy={y(d.optimized)} r={3.5} fill="#06111d" stroke={colors.green} strokeWidth={2} />
          ))}
          {hover !== null && hovered && (
            <g pointerEvents="none">
              <rect x={tipX} y={padT + 4} width={tipW} height={74} rx={6} fill="#0e2438" stroke="#2a4c68" />
              <text x={tipX + 10} y={padT + 20} fontSize={11} fill="#b7c8d9">
                {hovered.label}
              </text>
              <text x={tipX + 10} y={padT + 36} fontSize={12} fontWeight={600} fill={colors.green}>
                Lucro: +{fmt(hovered.profit)}
              </text>
              <text x={tipX + 10} y={padT + 52} fontSize={12} fontWeight={600} fill={colors.red}>
                Prejuízo: {fmt(hovered.loss)}
              </text>
              <text x={tipX + 10} y={padT + 68} fontSize={12} fontWeight={600} fill="#7ff0cd">
                IA: +{fmt(hovered.optimized)}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
