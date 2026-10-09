"use client";
import { useEffect, useId, useRef, useState } from "react";
import { DAYS, HOURS, heatColor, heatWinRate, type MonthlyPoint, type Slice } from "../../lib/channel-analysis-demo";

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

function niceStep(raw: number) {
  const exponent = Math.pow(10, Math.floor(Math.log10(raw)));
  const fraction = raw / exponent;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * exponent;
}

function niceDomain(min: number, max: number, count = 5) {
  const top = max === min ? min + 1 : max;
  const step = niceStep((top - min) / (count - 1));
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(top / step) * step;
  const ticks: number[] = [];
  for (let value = lo; value <= hi + step / 2; value += step) ticks.push(Number(value.toFixed(6)));
  return { lo, hi, ticks };
}

export type EquityPoint = { value: number; label: string; month: string };

export function EquityChart({
  points,
  color,
  height = 215,
  formatTick,
  formatValue,
  summary,
}: {
  points: EquityPoint[];
  color: string;
  height?: number;
  formatTick: (value: number) => string;
  formatValue: (value: number) => string;
  summary: string;
}) {
  const [ref, width] = useWidth();
  const gradientId = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const n = points.length;
  const padL = 52;
  const padR = 10;
  const padT = 10;
  const padB = 24;

  const values = points.map((point) => point.value);
  const { lo, hi, ticks } = niceDomain(Math.min(0, ...values), Math.max(0, ...values));
  const plotW = Math.max(width - padL - padR, 1);
  const plotH = height - padT - padB;
  const x = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (value: number) => padT + ((hi - value) / (hi - lo)) * plotH;
  const base = Math.min(hi, Math.max(lo, 0));

  const line = points.map((point, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(point.value).toFixed(1)}`).join(" ");
  const area = `${line} L${x(n - 1).toFixed(1)} ${y(base).toFixed(1)} L${x(0).toFixed(1)} ${y(base).toFixed(1)} Z`;

  const monthLabels: Array<{ month: string; index: number }> = [];
  let groupStart = 0;
  for (let i = 1; i <= n; i += 1) {
    if (i === n || points[i].month !== points[groupStart].month) {
      if (i - groupStart >= 10) monthLabels.push({ month: points[groupStart].month, index: Math.round((groupStart + i - 1) / 2) });
      groupStart = i;
    }
  }

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const index = Math.round(((event.clientX - rect.left - padL) / plotW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, index)));
  };

  const hovered = hover === null ? null : points[hover];
  const tipW = 132;
  const tipX = hover === null ? 0 : x(hover) + 12 + tipW > width ? x(hover) - 12 - tipW : x(hover) + 12;

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={summary} onPointerMove={handleMove} onPointerLeave={() => setHover(null)} className="touch-pan-y">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={padL} x2={width - padR} y1={y(tick)} y2={y(tick)} stroke={tick === 0 ? "#40576b" : "#18344b"} strokeWidth={1} />
              <text x={padL - 8} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="#b7c8d9">
                {formatTick(tick)}
              </text>
            </g>
          ))}
          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color}80)` }} />
          {monthLabels.map((item) => (
            <text key={item.month} x={x(item.index)} y={height - 6} textAnchor="middle" fontSize={11} fill="#b7c8d9">
              {item.month}
            </text>
          ))}
          {hover !== null && hovered && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={padT} y2={height - padB} stroke="#2a4c68" strokeDasharray="3 3" />
              <circle cx={x(hover)} cy={y(hovered.value)} r={4} fill={color} stroke="#06111d" strokeWidth={2} />
              <rect x={tipX} y={padT + 4} width={tipW} height={40} rx={6} fill="#0e2438" stroke="#2a4c68" />
              <text x={tipX + 10} y={padT + 20} fontSize={11} fill="#b7c8d9">
                {hovered.label}
              </text>
              <text x={tipX + 10} y={padT + 36} fontSize={13} fontWeight={600} fill={color}>
                {formatValue(hovered.value)}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}

export function MonthlyChart({ data, height = 190 }: { data: MonthlyPoint[]; height?: number }) {
  const [ref, width] = useWidth();
  const padL = 34;
  const padR = 40;
  const padT = 8;
  const padB = 24;
  const { lo, hi, ticks } = niceDomain(Math.min(0, ...data.map((d) => d.loss)), Math.max(...data.map((d) => d.profit)), 5);
  const plotW = Math.max(width - padL - padR, 1);
  const plotH = height - padT - padB;
  const y = (value: number) => padT + ((hi - value) / (hi - lo)) * plotH;
  const slot = plotW / data.length;
  const cx = (i: number) => padL + slot * i + slot / 2;
  const barW = Math.min(20, slot * 0.34);
  const rate = (value: number) => padT + (1 - value / 100) * plotH;
  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${cx(i).toFixed(1)} ${rate(d.winRate).toFixed(1)}`).join(" ");
  const summary = data.map((d) => `${d.month}: lucro ${d.profit}R, prejuízo ${Math.abs(d.loss)}R, win rate ${d.winRate}%`).join("; ");

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={`Desempenho mensal. ${summary}`}>
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={padL} x2={width - padR} y1={y(tick)} y2={y(tick)} stroke={tick === 0 ? "#40576b" : "#18344b"} />
              <text x={padL - 6} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="#b7c8d9">
                {tick}
              </text>
            </g>
          ))}
          {[0, 25, 50, 75, 100].map((tick) => (
            <text key={tick} x={width - padR + 6} y={rate(tick) + 4} fontSize={11} fill="#b7c8d9">
              {tick}%
            </text>
          ))}
          {data.map((d, i) => (
            <g key={d.month}>
              <rect x={cx(i) - barW / 2} y={y(d.profit)} width={barW} height={Math.max(y(0) - y(d.profit), 1)} rx={2} fill="#12d99e" opacity={0.92}>
                <title>{`${d.month}: lucro ${d.profit}R`}</title>
              </rect>
              <rect x={cx(i) - barW / 2} y={y(0)} width={barW} height={Math.max(y(d.loss) - y(0), 1)} rx={2} fill="#ff5d6d" opacity={0.92}>
                <title>{`${d.month}: prejuízo ${Math.abs(d.loss)}R`}</title>
              </rect>
              <text x={cx(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="#b7c8d9">
                {d.month}
              </text>
            </g>
          ))}
          <path d={line} fill="none" stroke="#159af2" strokeWidth={2} strokeLinejoin="round" />
          {data.map((d, i) => (
            <circle key={d.month} cx={cx(i)} cy={rate(d.winRate)} r={4} fill="#159af2" stroke="#06111d" strokeWidth={2}>
              <title>{`${d.month}: win rate ${d.winRate}%`}</title>
            </circle>
          ))}
        </svg>
      )}
    </div>
  );
}

export function Donut({
  slices,
  value,
  caption,
  label,
  size = 124,
  thickness = 16,
}: {
  slices: Slice[];
  value: string;
  caption: string;
  label: string;
  size?: number;
  thickness?: number;
}) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 2;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} className="shrink-0">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#12304a" strokeWidth={thickness} />
        {slices.map((slice) => {
          const length = (circumference * slice.pct) / 100;
          const dash = Math.max(length - gap, 0.5);
          const element = (
            <circle
              key={slice.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            >
              <title>{`${slice.label}: ${slice.pct}%`}</title>
            </circle>
          );
          offset += length;
          return element;
        })}
      </g>
      <text x="50%" y={size / 2 - 1} textAnchor="middle" fontSize={size > 110 ? 21 : 17} fontWeight={600} fill="#f2f6fa">
        {value}
      </text>
      <text x="50%" y={size / 2 + 15} textAnchor="middle" fontSize={11} fill="#b7c8d9">
        {caption}
      </text>
    </svg>
  );
}

export function Heatmap({ matrix, cellHeight = 22 }: { matrix: number[][]; cellHeight?: number }) {
  return (
    <div>
      <div role="img" aria-label="Mapa de calor de desempenho por dia da semana e horário (BRT)" className="grid gap-[3px]" style={{ gridTemplateColumns: "42px repeat(7, minmax(0, 1fr))" }}>
        {matrix.map((row, h) => (
          <div key={HOURS[h]} className="contents">
            <span className="flex items-center text-[11px] tabular text-fg-muted" style={{ height: cellHeight }}>
              {HOURS[h]}
            </span>
            {row.map((value, d) => (
              <span
                key={DAYS[d]}
                title={`${DAYS[d]} ${HOURS[h]} — win rate estimado ${heatWinRate(value)}%`}
                className="rounded-[3px] transition-transform hover:scale-[1.06]"
                style={{ height: cellHeight, background: heatColor(value) }}
              />
            ))}
          </div>
        ))}
        <span />
        {DAYS.map((day) => (
          <span key={day} className="pt-1 text-center text-[11px] text-fg-muted">
            {day}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2.5 text-[11px] text-fg-muted">
        <span>Menor Performance</span>
        <span aria-hidden className="h-2 w-36 rounded-full" style={{ background: `linear-gradient(90deg, ${heatColor(0)}, ${heatColor(0.25)}, ${heatColor(0.45)}, ${heatColor(0.62)}, ${heatColor(0.78)}, ${heatColor(0.9)}, ${heatColor(1)})` }} />
        <span>Maior Performance</span>
      </div>
    </div>
  );
}
