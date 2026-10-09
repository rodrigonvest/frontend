"use client";
import { Icon } from "../Icons";
import { Badge, cx } from "../UI";
import { ChannelAvatar } from "./ChannelHeader";
import {
  AssetBadge,
  AssetsPanel,
  ChPanel,
  HeatmapPanel,
  MetricsPanel,
  MonthlyPanel,
  PerformancePanel,
  QualityPanel,
  SignalTypesPanel,
} from "./Panels";
import ChannelOverviewCard from "./ChannelOverviewCard";
import { DAYS, HOURS, assetPalette, formatInt, heatWinRate, percentOf, recommendation, statusColor, type Channel } from "../../lib/channel-analysis-demo";
import type { AnalysisTab } from "./ChannelHeader";

const grid3 = "grid gap-3 md:grid-cols-2 xl:grid-cols-3";

function BestWindows({ channel }: { channel: Channel }) {
  const cells = channel.heat
    .flatMap((row, h) => row.map((value, d) => ({ value, h, d })))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
  return (
    <ChPanel title="Melhores Janelas de Operação" icon="trophy" className="h-full">
      <ol className="space-y-2">
        {cells.map((cell, i) => {
          const end = HOURS[(cell.h + 1) % HOURS.length];
          return (
            <li key={`${cell.d}-${cell.h}`} className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 px-3 py-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[12px] font-semibold text-brand">{i + 1}</span>
              <span className="min-w-0 flex-1 text-[13px] text-fg">
                {DAYS[cell.d]} · {HOURS[cell.h]} – {end}
              </span>
              <span className="tabular text-[13px] font-semibold text-success">{heatWinRate(cell.value)}%</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] leading-5 text-fg-muted">Win rate estimado por janela de 3 horas, no fuso horário de Brasília (BRT).</p>
    </ChPanel>
  );
}

function DataTable({ head, children, label }: { head: string[]; children: React.ReactNode; label: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-left text-[13px]" aria-label={label}>
        <thead>
          <tr className="border-b border-line text-[12px] text-fg-muted">
            {head.map((title, i) => (
              <th key={title} scope="col" className={cx("px-2 py-2 font-medium", i > 0 && "text-right")}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const assetOffsets = [4.2, -2.8, -5.1, 1.7, -3.6, -6.4, -8.2];

function AssetsTable({ channel }: { channel: Channel }) {
  const net = channel.monthly.reduce((sum, m) => sum + m.profit + m.loss, 0);
  return (
    <ChPanel title="Detalhamento por Ativo" icon="candle" className="h-full">
      <DataTable label="Detalhamento por ativo" head={["Ativo", "Participação", "Sinais", "Win Rate", "Resultado (R)"]}>
        {channel.assets.map((asset, i) => {
          const result = (net * asset.pct) / 100;
          return (
            <tr key={asset.symbol} className="border-b border-line/60 last:border-0">
              <th scope="row" className="px-2 py-2.5 font-normal text-fg">
                <span className="flex items-center gap-2">
                  <AssetBadge symbol={asset.symbol} color={assetPalette[i % assetPalette.length]} />
                  {asset.symbol}
                </span>
              </th>
              <td className="tabular px-2 py-2.5 text-right text-fg-muted">{asset.pct.toFixed(1)}%</td>
              <td className="tabular px-2 py-2.5 text-right text-fg">{formatInt(Math.round((asset.pct / 100) * channel.validSignals))}</td>
              <td className="tabular px-2 py-2.5 text-right text-fg">{Math.min(90, Math.max(35, channel.winRate + assetOffsets[i])).toFixed(1)}%</td>
              <td className={cx("tabular px-2 py-2.5 text-right font-medium", result >= 0 ? "text-success" : "text-danger")}>
                {result >= 0 ? "+" : ""}
                {result.toFixed(1)} R
              </td>
            </tr>
          );
        })}
      </DataTable>
    </ChPanel>
  );
}

function TypesTable({ channel }: { channel: Channel }) {
  return (
    <ChPanel title="Detalhamento por Tipo de Sinal" icon="signal" className="h-full">
      <DataTable label="Detalhamento por tipo de sinal" head={["Tipo", "Participação", "Sinais"]}>
        {channel.signalTypes.map((slice) => (
          <tr key={slice.label} className="border-b border-line/60 last:border-0">
            <th scope="row" className="px-2 py-2.5 font-normal text-fg">
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-2.5 rounded-full" style={{ background: slice.color }} />
                {slice.label}
              </span>
            </th>
            <td className="tabular px-2 py-2.5 text-right text-fg-muted">{slice.pct.toFixed(1)}%</td>
            <td className="tabular px-2 py-2.5 text-right text-fg">{formatInt(Math.round((slice.pct / 100) * channel.validSignals))}</td>
          </tr>
        ))}
      </DataTable>
    </ChPanel>
  );
}

function ConsistencyPanel({ channel }: { channel: Channel }) {
  const c = channel.consistency;
  const stats = [
    { label: "Dias Lucrativos", value: `${c.profitableDays}%`, tone: "text-success" },
    { label: "Semanas Positivas", value: c.positiveWeeks, tone: "text-success" },
    { label: "Maior Sequência de Ganhos", value: `${c.bestStreak} dias`, tone: "text-fg" },
    { label: "Maior Sequência de Perdas", value: `${c.worstStreak} dias`, tone: "text-danger" },
  ];
  const stabilityColor = c.stability >= 75 ? "#12d99e" : c.stability >= 55 ? "#f0c35c" : "#ff5d6d";
  return (
    <ChPanel title="Consistência" icon="check" className="h-full">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-line bg-canvas/50 px-3 py-3">
            <p className="text-[12px] text-fg-muted">{stat.label}</p>
            <p className={cx("tabular mt-1 text-[22px] font-semibold leading-7", stat.tone)}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col items-center rounded-xl border border-line bg-canvas/50 px-4 py-5 text-center">
          <p className="text-[12px] text-fg-muted">Índice de Estabilidade</p>
          <p className="tabular mt-1 text-[40px] font-bold leading-10" style={{ color: stabilityColor }}>
            {c.stability}
          </p>
          <p className="text-[12px] text-fg-muted">de 100</p>
        </div>
        <ul className="space-y-3">
          {c.dimensions.map((dimension) => (
            <li key={dimension.label}>
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span className="text-fg-muted">{dimension.label}</span>
                <span className="tabular font-medium text-fg">{dimension.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#12304a]" role="presentation">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-strong to-success" style={{ width: `${dimension.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ChPanel>
  );
}

function ComparePanel({ channel, channels, onSelect }: { channel: Channel; channels: Channel[]; onSelect: (id: string) => void }) {
  const canceledPct = (c: Channel) => Number(percentOf(c.canceledSignals, c.totalSignals));
  const validPct = (c: Channel) => Number(percentOf(c.validSignals, c.totalSignals));
  const columns = [
    { label: "Score", get: (c: Channel) => c.score, show: (c: Channel) => c.score.toFixed(1), best: "max" },
    { label: "Win Rate", get: (c: Channel) => c.winRate, show: (c: Channel) => `${c.winRate}%`, best: "max" },
    { label: "Fator de Lucro", get: (c: Channel) => c.profitFactor, show: (c: Channel) => c.profitFactor.toFixed(2), best: "max" },
    { label: "RR Médio", get: (c: Channel) => c.rrAvg, show: (c: Channel) => c.rrAvg.toFixed(2), best: "max" },
    { label: "Drawdown", get: (c: Channel) => c.drawdown, show: (c: Channel) => `${c.drawdown}%`, best: "min" },
    { label: "Sinais Válidos", get: validPct, show: (c: Channel) => `${formatInt(c.validSignals)} (${validPct(c)}%)`, best: "max" },
    { label: "Cancelamento", get: canceledPct, show: (c: Channel) => `${canceledPct(c)}%`, best: "min" },
  ] as const;
  const bestValue = (column: (typeof columns)[number]) => {
    const values = channels.map(column.get);
    return column.best === "max" ? Math.max(...values) : Math.min(...values);
  };
  return (
    <ChPanel title="Comparar Canais" icon="layers">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[13px]" aria-label="Comparação entre canais">
          <thead>
            <tr className="border-b border-line text-[12px] text-fg-muted">
              <th scope="col" className="px-3 py-2.5 font-medium">
                Canal
              </th>
              {columns.map((column) => (
                <th key={column.label} scope="col" className="px-3 py-2.5 text-right font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {channels.map((item) => (
              <tr key={item.id} className={cx("border-b border-line/60 last:border-0", item.id === channel.id && "bg-brand-soft/25")}>
                <th scope="row" className="px-3 py-2.5 font-normal">
                  <button type="button" onClick={() => onSelect(item.id)} className="flex items-center gap-2.5 rounded-md text-left focus-visible:outline-2 focus-visible:outline-brand">
                    <ChannelAvatar channel={item} size={32} />
                    <span>
                      <span className="block text-[13px] font-semibold text-fg">{item.name}</span>
                      <span className="block text-[12px] text-fg-muted">{item.handle}</span>
                    </span>
                  </button>
                </th>
                {columns.map((column) => (
                  <td key={column.label} className={cx("tabular px-3 py-2.5 text-right", column.get(item) === bestValue(column) ? "font-semibold text-success" : "text-fg")}>
                    {column.show(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12px] text-fg-muted">Valores em verde indicam o melhor resultado entre os canais comparados. Clique em um canal para selecioná-lo.</p>
    </ChPanel>
  );
}

function ReportPanel({ channel, onToast }: { channel: Channel; onToast: (message: string) => void }) {
  const rec = recommendation(channel.status);
  const color = statusColor[channel.status];
  const topAsset = channel.assets[0];
  const net = channel.monthly.reduce((sum, m) => sum + m.profit + m.loss, 0);
  const action = (message: string) => (
    <button type="button" onClick={() => onToast(message)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-[#0a1b2b] px-3.5 text-[13px] font-medium text-fg hover:border-brand focus-visible:outline-2 focus-visible:outline-brand">
      <Icon name={message.includes("PDF") ? "download" : "external"} size={15} />
      {message.includes("PDF") ? "Exportar PDF" : "Compartilhar"}
    </button>
  );
  return (
    <ChPanel
      title={`Relatório de Análise — ${channel.name}`}
      icon="fileText"
      action={
        <div className="flex flex-wrap gap-2">
          {action("Relatório em PDF gerado (demonstrativo).")}
          {action("Link do relatório copiado (demonstrativo).")}
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-line bg-canvas/50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="tabular text-[34px] font-bold leading-10" style={{ color }}>
              {channel.score.toFixed(1)}
            </span>
            <div>
              <p className="text-[14px] font-semibold text-fg">Score {channel.status}</p>
              <Badge tone={rec.tone} className="mt-1">
                {rec.label}
              </Badge>
            </div>
          </div>
          <h3 className="mt-4 text-[13px] font-semibold text-fg">Resumo executivo</h3>
          <p className="mt-1.5 text-pretty text-[13px] leading-6 text-fg-muted">
            Entre 01/06/2026 e 30/09/2026, {channel.name} publicou {formatInt(channel.totalSignals)} sinais, dos quais {formatInt(channel.validSignals)} foram considerados válidos. O canal registrou win rate de {channel.winRate}%, fator de lucro {channel.profitFactor.toFixed(2)} e
            drawdown máximo de {channel.drawdown}%, com resultado líquido simulado de {net >= 0 ? "+" : ""}
            {net.toFixed(1)} R. A operação se concentra em {topAsset.symbol} ({topAsset.pct}% dos sinais).
          </p>
        </div>
        <div className="grid gap-3">
          <div className="rounded-xl border border-success/25 bg-success-soft/30 p-4">
            <h3 className="flex items-center gap-2 text-[13px] font-semibold text-success">
              <Icon name="check" size={15} />
              Pontos fortes
            </h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-fg-muted">
              {channel.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-warning/25 bg-warning-soft/30 p-4">
            <h3 className="flex items-center gap-2 text-[13px] font-semibold text-warning">
              <Icon name="info" size={15} />
              Pontos de atenção
            </h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-fg-muted">
              {channel.warnings.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ChPanel>
  );
}

export default function TabContent({
  tab,
  channel,
  channels,
  onSelect,
  onToast,
}: {
  tab: AnalysisTab;
  channel: Channel;
  channels: Channel[];
  onSelect: (id: string) => void;
  onToast: (message: string) => void;
}) {
  switch (tab) {
    case "overview":
      return (
        <div className="space-y-3">
          <div className="grid gap-3 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.6fr)]">
            <ChannelOverviewCard channel={channel} />
            <PerformancePanel channel={channel} />
          </div>
          <div className={grid3}>
            <MonthlyPanel channel={channel} />
            <HeatmapPanel channel={channel} />
            <AssetsPanel channel={channel} />
          </div>
          <div className={grid3}>
            <SignalTypesPanel channel={channel} />
            <QualityPanel channel={channel} />
            <MetricsPanel channel={channel} />
          </div>
        </div>
      );
    case "performance":
      return (
        <div className="space-y-3">
          <PerformancePanel channel={channel} chartHeight={300} />
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <MonthlyPanel channel={channel} chartHeight={240} />
            <MetricsPanel channel={channel} />
          </div>
        </div>
      );
    case "schedule":
      return (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <HeatmapPanel channel={channel} cellHeight={36} />
          <BestWindows channel={channel} />
        </div>
      );
    case "assets":
      return (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <AssetsPanel channel={channel} />
          <AssetsTable channel={channel} />
        </div>
      );
    case "types":
      return (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <SignalTypesPanel channel={channel} />
          <TypesTable channel={channel} />
        </div>
      );
    case "consistency":
      return (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <ConsistencyPanel channel={channel} />
          <MonthlyPanel channel={channel} chartHeight={230} />
        </div>
      );
    case "quality":
      return (
        <div className="grid gap-3 xl:grid-cols-2">
          <QualityPanel channel={channel} />
          <MetricsPanel channel={channel} />
        </div>
      );
    case "compare":
      return <ComparePanel channel={channel} channels={channels} onSelect={onSelect} />;
    case "report":
      return <ReportPanel channel={channel} onToast={onToast} />;
  }
}
