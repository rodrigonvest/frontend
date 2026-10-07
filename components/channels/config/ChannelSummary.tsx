"use client";
import type { ReactNode } from "react";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import ChannelLogo from "../ChannelLogo";
import { describeLastSignal } from "../ChannelsView";
import { Toggle } from "./fields";
import type { ChannelStatus, TelegramChannel } from "../../../lib/channels";

function StatusLine({ status }: { status: ChannelStatus }) {
  const tone = status === "connected" ? "text-success" : status === "paused" ? "text-warning" : "text-danger";
  const dot = status === "connected" ? "bg-success" : status === "paused" ? "bg-warning" : "bg-danger";
  const label = status === "connected" ? "Conectado" : status === "paused" ? "Pausado" : "Desconectado";
  return (
    <span className={cx("inline-flex items-center gap-2 text-sm", tone)}>
      <span aria-hidden className={cx("size-2.5 rounded-full", dot)} />
      {label}
    </span>
  );
}

function Stat({ icon, iconClass, label, children, divided }: { icon: string; iconClass: string; label: string; children: ReactNode; divided?: boolean }) {
  return (
    <div className={cx("flex min-w-0 items-center gap-3 lg:h-12 lg:pl-6", divided && "lg:border-l lg:border-line")}>
      <span aria-hidden className={cx("hidden shrink-0 sm:block", iconClass)}>
        <Icon name={icon} size={icon === "telegram" ? 22 : 24} stroke={1.8} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] text-fg-muted">{label}</p>
        <div className="tabular mt-0.5 text-xl font-bold leading-6 text-fg">{children}</div>
      </div>
    </div>
  );
}

export default function ChannelSummary({
  channel,
  name,
  primary,
  now,
  active,
  pending,
  onToggle,
}: {
  channel: TelegramChannel;
  name: string;
  primary: boolean;
  now: Date;
  active: boolean;
  pending?: boolean;
  onToggle: (next: boolean) => void;
}) {
  const last = describeLastSignal(channel.last_signal_at, now);
  return (
    <section
      aria-label="Resumo do canal"
      className="grid grid-cols-1 gap-4 rounded-xl border border-line bg-gradient-to-br from-surface-2/70 to-surface px-4 py-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] lg:items-center lg:gap-0"
    >
      <div className="flex min-w-0 items-center gap-4">
        <ChannelLogo name={name} avatarUrl={channel.avatar_url} logoKey={channel.logo_key} />
        <div className="min-w-0">
          <p className="truncate text-xl font-semibold uppercase leading-6 tracking-wide text-fg">{name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <StatusLine status={channel.status} />
            {primary && <span className="rounded-md border border-brand/50 bg-brand-soft/60 px-2.5 py-0.5 text-[13px] text-[#5cc2ff]">Canal Principal</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-line pt-3 lg:contents lg:border-0 lg:pt-0">
        <Stat icon="telegram" iconClass="text-[#2aa6ee]" label="Sinais hoje">
          {channel.signals_today}
        </Stat>
        <Stat divided icon="barsFilled" iconClass="text-[#6d83ff]" label="Total de sinais">
          {channel.signals_total.toLocaleString("en-US")}
        </Stat>
        <Stat divided icon="clock" iconClass="text-fg-muted" label="Último sinal">
          <span className="flex flex-wrap items-baseline gap-x-2 lg:flex-nowrap lg:whitespace-nowrap">
            <span>{last.primary}</span>
            {last.secondary && <span className="text-xs font-normal text-fg-muted">{last.secondary}</span>}
          </span>
        </Stat>
      </div>

      <div className="flex items-center gap-3 border-t border-line pt-3 lg:ml-6 lg:h-12 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <Toggle checked={active} onChange={onToggle} label={`${active ? "Desativar" : "Ativar"} ${name}`} disabled={pending} />
        <span className="w-12 text-sm text-fg">{active ? "Ativo" : "Inativo"}</span>
      </div>
    </section>
  );
}
