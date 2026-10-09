"use client";
import { Icon } from "../Icons";
import { Badge, cx } from "../UI";
import { PERIOD_DAYS, PERIOD_LABEL, formatInt, percentOf, statusColor, type Channel } from "../../lib/channel-analysis-demo";
import { ChannelAvatar } from "./ChannelHeader";

function MetricCell({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cx("min-w-0 px-3 py-3", className)}>
      <p className="text-[12px] text-fg-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function ChannelOverviewCard({ channel }: { channel: Channel }) {
  const color = statusColor[channel.status];
  const perDay = (channel.totalSignals / PERIOD_DAYS).toFixed(1);
  const validPct = percentOf(channel.validSignals, channel.totalSignals);
  const canceledPct = percentOf(channel.canceledSignals, channel.totalSignals);

  return (
    <section className="flex h-full min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4" aria-label={`Resumo do canal ${channel.name}`}>
      <div className="flex items-start gap-4">
        <ChannelAvatar channel={channel} size={72} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[20px] font-semibold tracking-tight text-fg">{channel.name}</h2>
          <p className="text-[14px] text-fg-muted">{channel.handle}</p>
          <p className="mt-2 text-pretty text-[13px] leading-5 text-fg-muted">{channel.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-center rounded-xl px-4 py-2.5 text-center" style={{ background: `linear-gradient(160deg, ${color}38, ${color}14)`, border: `1px solid ${color}80`, boxShadow: `0 0 20px -8px ${color}` }}>
          <span className="tabular text-[26px] font-bold leading-8 text-fg">
            {channel.score.toFixed(1)}
            <span className="text-[16px] font-semibold text-fg-muted">/10</span>
          </span>
          <span className="text-[12px] font-medium" style={{ color }}>
            {channel.status}
          </span>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Características do canal">
        {channel.tags.map((tag, i) => (
          <li key={tag}>
            <Badge tone={i === channel.tags.length - 1 ? "blue" : "neutral"} className="h-7 rounded-md px-2.5 text-[12px]">
              {i === channel.tags.length - 1 && <Icon name="check" size={12} />}
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid grid-cols-2 divide-line rounded-lg border border-line bg-canvas/50 sm:grid-cols-4 sm:divide-x [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-line sm:[&>*:nth-child(-n+2)]:border-b-0">
        <MetricCell label="Período Analisado">
          <div className="flex items-start gap-1.5 text-fg">
            <span className="mt-0.5 text-brand">
              <Icon name="calendar" size={18} />
            </span>
            <div>
              <p className="tabular text-[13px] font-medium leading-4">{PERIOD_LABEL}</p>
              <p className="mt-1 text-[12px] text-fg-muted">({PERIOD_DAYS} dias)</p>
            </div>
          </div>
        </MetricCell>
        <MetricCell label="Total de Sinais">
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 text-brand">
              <Icon name="send" size={18} />
            </span>
            <div>
              <p className="tabular text-[18px] font-semibold leading-5 text-fg">{formatInt(channel.totalSignals)}</p>
              <p className="mt-1 text-[12px] text-fg-muted">{perDay} por dia</p>
            </div>
          </div>
        </MetricCell>
        <MetricCell label="Sinais Válidos">
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 text-success">
              <Icon name="check" size={18} />
            </span>
            <div>
              <p className="tabular text-[18px] font-semibold leading-5 text-fg">{formatInt(channel.validSignals)}</p>
              <p className="mt-1 text-[12px] text-success">{validPct}%</p>
            </div>
          </div>
        </MetricCell>
        <MetricCell label="Sinais Cancelados">
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 text-danger">
              <Icon name="x" size={18} />
            </span>
            <div>
              <p className="tabular text-[18px] font-semibold leading-5 text-fg">{formatInt(channel.canceledSignals)}</p>
              <p className="mt-1 text-[12px] text-danger">{canceledPct}%</p>
            </div>
          </div>
        </MetricCell>
      </div>
    </section>
  );
}
