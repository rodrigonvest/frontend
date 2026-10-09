"use client";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge, cx } from "../UI";
import { statusColor, type Channel } from "../../lib/channel-analysis-demo";

export function ChannelAvatar({ channel, size = 40 }: { channel: Channel; size?: number }) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight"
      style={{
        width: size,
        height: size,
        fontSize: size * (channel.initials.length > 2 ? 0.27 : 0.34),
        color: channel.accent,
        border: `2px solid ${channel.accent}`,
        background: `radial-gradient(circle at 30% 25%, ${channel.accent}33, #06111d 75%)`,
        boxShadow: `0 0 14px -4px ${channel.accent}`,
      }}
    >
      {channel.initials}
    </span>
  );
}

export function ChannelHeader({ onAdd, onSettings }: { onAdd: () => void; onSettings: () => void }) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Análise Automática de Canais
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Análise Automática de Canais</h1>
            <Badge tone="green" className="border-success/60 bg-success/15 px-2.5 text-xs">
              Ativo
            </Badge>
          </div>
          <p className="mt-1 max-w-3xl text-pretty text-[15px] leading-6 text-fg-muted">
            Analise o histórico dos canais do Telegram de forma automática. Descubra a qualidade, consistência e o potencial de cada canal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-strong px-4 text-[14px] font-semibold text-white shadow-[0_0_18px_-4px_rgba(8,127,240,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]"
          >
            <Icon name="plus" size={16} />
            Adicionar Canal para Análise
          </button>
          <button
            type="button"
            onClick={onSettings}
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand/40 bg-brand-soft/60 px-4 text-[14px] font-medium text-[#cfe3ff] transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Icon name="settings" size={16} />
            Configurações
          </button>
        </div>
      </header>
    </>
  );
}

export function ChannelStrip({ channels, selectedId, onSelect, onAdd }: { channels: Channel[]; selectedId: string; onSelect: (id: string) => void; onAdd: () => void }) {
  return (
    <div role="group" aria-label="Canais analisados" className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {channels.map((channel) => {
        const active = channel.id === selectedId;
        const color = statusColor[channel.status];
        return (
          <button
            key={channel.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(channel.id)}
            className={cx(
              "flex min-w-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              active ? "border-brand bg-brand-soft/30 shadow-[0_0_22px_-6px_rgba(21,154,242,.75)]" : "border-line bg-surface hover:border-line-strong hover:bg-surface-2/60",
            )}
          >
            <ChannelAvatar channel={channel} size={44} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold text-fg">{channel.name}</span>
              <span className="block truncate text-[13px] text-fg-muted">{channel.handle}</span>
            </span>
            <span className="flex shrink-0 flex-col items-center gap-0.5">
              <span className="tabular flex h-8 min-w-11 items-center justify-center rounded-full px-2.5 text-[15px] font-bold" style={{ color, background: `${color}26`, border: `1px solid ${color}66` }}>
                {channel.score.toFixed(1)}
              </span>
              <span className="text-[11px]" style={{ color }}>
                {channel.status}
              </span>
            </span>
          </button>
        );
      })}
      <button
        type="button"
        onClick={onAdd}
        className="flex min-h-[68px] items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 bg-brand-soft/15 text-[14px] font-medium text-brand transition-colors hover:bg-brand-soft/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Icon name="plus" size={16} />
        Adicionar Canal
      </button>
    </div>
  );
}

export const analysisTabs = [
  { id: "overview", label: "Visão Geral", icon: "dashboard" },
  { id: "performance", label: "Desempenho", icon: "chart" },
  { id: "schedule", label: "Horários", icon: "clock" },
  { id: "assets", label: "Ativos", icon: "candle" },
  { id: "types", label: "Tipos de Sinais", icon: "signal" },
  { id: "consistency", label: "Consistência", icon: "check" },
  { id: "quality", label: "Qualidade", icon: "shield" },
  { id: "compare", label: "Comparar", icon: "layers" },
  { id: "report", label: "Relatório", icon: "fileText" },
] as const;

export type AnalysisTab = (typeof analysisTabs)[number]["id"];

export function ChannelTabs({ value, onChange }: { value: AnalysisTab; onChange: (tab: AnalysisTab) => void }) {
  return (
    <div role="tablist" aria-label="Seções da análise" className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {analysisTabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`ca-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls="ca-panel"
            onClick={() => onChange(tab.id)}
            className={cx(
              "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              active ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_16px_-4px_rgba(8,127,240,.8)]" : "border-line-strong bg-surface text-fg hover:border-brand/60",
            )}
          >
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
