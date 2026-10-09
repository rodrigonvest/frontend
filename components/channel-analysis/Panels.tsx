"use client";
import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { HelpTip, SelectBox } from "../risk-management/RiskFields";
import { Donut, EquityChart, Heatmap, MonthlyChart, type EquityPoint } from "./ChannelCharts";
import { assetPalette, equityDate, formatInt, type Channel } from "../../lib/channel-analysis-demo";

export function ChPanel({ title, icon, action, className, children }: { title: string; icon: string; action?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={cx("flex min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4", className)}>
      <header className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand/12 text-brand">
          <Icon name={icon} size={16} />
        </span>
        <h2 className="min-w-0 flex-1 basis-40 truncate text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

const rangeOptions = [
  { value: "122", label: "Últimos 4 meses" },
  { value: "92", label: "Últimos 3 meses" },
  { value: "61", label: "Últimos 2 meses" },
  { value: "30", label: "Últimos 30 dias" },
];

const modeOptions = [
  { value: "capital", label: "Curva de Capital" },
  { value: "profit", label: "Lucro Acumulado (R)" },
  { value: "drawdown", label: "Drawdown" },
];

const R_UNIT = 250;

function StatCard({ icon, label, value, tone }: { icon: string; label: string; value: string; tone: "green" | "blue" | "red" }) {
  const toneClass = { green: "bg-success/12 text-success", blue: "bg-brand/12 text-brand", red: "bg-danger/12 text-danger" }[tone];
  const valueClass = { green: "text-success", blue: "text-success", red: "text-warning" }[tone];
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-3 py-2.5">
      <span className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg", toneClass)}>
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] text-fg-muted">{label}</p>
        <p className={cx("tabular text-[24px] font-semibold leading-7 tracking-tight", valueClass)}>{value}</p>
      </div>
    </div>
  );
}

export function PerformancePanel({ channel, chartHeight = 215 }: { channel: Channel; chartHeight?: number }) {
  const [mode, setMode] = useState("capital");
  const [range, setRange] = useState("122");

  const { points, color, formatTick, formatValue, summary } = useMemo(() => {
    const count = Number(range);
    const slice = channel.equity.slice(-count);
    const offset = channel.equity.length - slice.length;
    const base = slice[0];
    let peak = 0;
    const series = slice.map((raw, i) => {
      const rebased = raw - base;
      peak = Math.max(peak, rebased);
      const value = mode === "profit" ? Number((rebased / R_UNIT).toFixed(1)) : mode === "drawdown" ? rebased - peak : rebased;
      const date = equityDate(offset + i);
      return { value, label: date.label, month: date.month } satisfies EquityPoint;
    });
    const fmt = (value: number) => value.toLocaleString("pt-BR");
    const last = series[series.length - 1].value;
    const modeLabel = modeOptions.find((option) => option.value === mode)?.label ?? "";
    return {
      points: series,
      color: mode === "drawdown" ? "#ff5d6d" : "#12d99e",
      formatTick: (value: number) => (mode === "profit" ? `${value}R` : fmt(value)),
      formatValue: (value: number) => (mode === "profit" ? `${value >= 0 ? "+" : ""}${value.toFixed(1)} R` : `${value < 0 ? "-" : "+"}$ ${fmt(Math.abs(value))}`),
      summary: `${modeLabel} de ${channel.name}, ${series.length} dias, resultado final ${mode === "profit" ? `${last} R` : `$ ${fmt(last)}`}`,
    };
  }, [channel, mode, range]);

  return (
    <ChPanel
      title="Desempenho Geral"
      icon="analytics"
      className="h-full"
      action={
        <div className="flex flex-wrap gap-2">
          <div className="w-[170px]">
            <SelectBox label="Tipo de gráfico" value={mode} options={modeOptions} onChange={setMode} />
          </div>
          <div className="w-[150px]">
            <SelectBox label="Período do gráfico" value={range} options={rangeOptions} onChange={setRange} />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <StatCard icon="target" label="Win Rate" value={`${channel.winRate}%`} tone="green" />
        <StatCard icon="barsFilled" label="Fator de Lucro" value={channel.profitFactor.toFixed(2)} tone="green" />
        <StatCard icon="layers" label="RR Médio" value={channel.rrAvg.toFixed(2)} tone="blue" />
        <StatCard icon="trendDown" label="Drawdown" value={`${channel.drawdown}%`} tone="red" />
      </div>
      <div className="mt-3">
        <EquityChart points={points} color={color} height={chartHeight} formatTick={formatTick} formatValue={formatValue} summary={summary} />
      </div>
    </ChPanel>
  );
}

function LegendDot({ color, children, shape = "square" }: { color: string; children: ReactNode; shape?: "square" | "line" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-fg-muted">
      <span aria-hidden className={shape === "line" ? "h-0.5 w-4 rounded-full" : "size-2.5 rounded-sm"} style={{ background: color }} />
      {children}
    </span>
  );
}

export function MonthlyPanel({ channel, chartHeight = 190 }: { channel: Channel; chartHeight?: number }) {
  return (
    <ChPanel title="Desempenho Mensal" icon="barsFilled" className="h-full">
      <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <LegendDot color="#12d99e">Lucro (R)</LegendDot>
        <LegendDot color="#ff5d6d">Prejuízo (R)</LegendDot>
        <LegendDot color="#159af2" shape="line">
          Win Rate
        </LegendDot>
      </div>
      <MonthlyChart data={channel.monthly} height={chartHeight} />
    </ChPanel>
  );
}

export function HeatmapPanel({ channel, cellHeight = 22 }: { channel: Channel; cellHeight?: number }) {
  return (
    <ChPanel title="Melhores Horários (BRT)" icon="clock" className="h-full">
      <Heatmap matrix={channel.heat} cellHeight={cellHeight} />
    </ChPanel>
  );
}

export function AssetBadge({ symbol, color }: { symbol: string; color: string }) {
  return (
    <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold" style={{ background: `${color}30`, color }}>
      {symbol.slice(0, 2)}
    </span>
  );
}

export function AssetsPanel({ channel }: { channel: Channel }) {
  return (
    <ChPanel title="Ativos Mais Operados" icon="candle" className="h-full">
      <ul className="flex flex-1 flex-col justify-between gap-2">
        {channel.assets.map((asset, i) => {
          const color = assetPalette[i % assetPalette.length];
          return (
            <li key={asset.symbol} className="flex items-center gap-2.5">
              <AssetBadge symbol={asset.symbol} color={color} />
              <span className="w-[58px] shrink-0 text-[13px] text-fg">{asset.symbol}</span>
              <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#12304a]" role="presentation">
                <div className="h-full rounded-full" style={{ width: `${Math.max(asset.pct, 2)}%`, background: color }} />
              </div>
              <span className="tabular w-12 shrink-0 text-right text-[13px] text-fg">{asset.pct.toFixed(1)}%</span>
            </li>
          );
        })}
      </ul>
    </ChPanel>
  );
}

function Legend({ slices }: { slices: { label: string; pct: number; color: string }[] }) {
  return (
    <ul className="min-w-0 flex-1 space-y-2">
      {slices.map((slice) => (
        <li key={slice.label} className="flex items-center gap-2 text-[13px]">
          <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: slice.color }} />
          <span className="min-w-0 flex-1 truncate text-fg">{slice.label}</span>
          <span className="tabular shrink-0 text-fg-muted">{slice.pct.toFixed(1)}%</span>
        </li>
      ))}
    </ul>
  );
}

export function SignalTypesPanel({ channel }: { channel: Channel }) {
  return (
    <ChPanel title="Tipos de Sinais" icon="signal" className="h-full">
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <Donut slices={channel.signalTypes} value={formatInt(channel.validSignals)} caption="Sinais" label={`Distribuição dos tipos de sinais de ${channel.name}`} />
        <Legend slices={channel.signalTypes} />
      </div>
    </ChPanel>
  );
}

export function QualityPanel({ channel }: { channel: Channel }) {
  return (
    <ChPanel title="Qualidade dos Sinais (Score IA)" icon="shield" className="h-full" action={<HelpTip text="Pontuação de 1 a 10 calculada pela IA com base em clareza, SL/TP informados e consistência da entrada." />}>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <Donut slices={channel.quality} value={channel.score.toFixed(1)} caption="Score Médio" label={`Distribuição da qualidade dos sinais de ${channel.name}`} />
        <Legend slices={channel.quality} />
      </div>
    </ChPanel>
  );
}

export function MetricsPanel({ channel }: { channel: Channel }) {
  const canceledPct = ((channel.canceledSignals / channel.totalSignals) * 100).toFixed(1);
  const { execSeconds, entryDistance, slAvg, tpAvg } = channel.metrics;
  const rows = [
    { icon: "clock", label: "Tempo Médio de Execução", value: `${execSeconds.toFixed(1)} segundos`, tone: "blue" },
    { icon: "target", label: "Distância Média da Entrada", value: `${entryDistance.toFixed(1)} pips`, tone: "blue" },
    { icon: "trendDown", label: "Stop Loss Médio", value: `${slAvg.toFixed(1)} pips`, tone: "blue" },
    { icon: "trendUp", label: "Take Profit Médio", value: `${tpAvg.toFixed(1)} pips`, tone: "blue" },
    { icon: "layers", label: "Relação TP/SL", value: `1:${(tpAvg / slAvg).toFixed(2)}`, tone: "blue" },
    { icon: "x", label: "Taxa de Cancelamento", value: `${canceledPct}%`, tone: "red" },
  ];
  return (
    <ChPanel title="Principais Métricas" icon="analytics" className="h-full">
      <ul className="flex flex-1 flex-col justify-between gap-1.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-2.5 rounded-md border-b border-line/60 py-1.5 last:border-0">
            <span className={cx("flex size-6 shrink-0 items-center justify-center rounded-md", row.tone === "red" ? "bg-danger/15 text-danger" : "bg-brand/15 text-brand")}>
              <Icon name={row.icon} size={14} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-fg-muted">{row.label}</span>
            <span className="tabular shrink-0 text-[13px] font-medium text-fg">{row.value}</span>
          </li>
        ))}
      </ul>
    </ChPanel>
  );
}
