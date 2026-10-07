"use client";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Icon } from "../Icons";
import { Button, EmptyState, Notice, cx } from "../UI";
import ChannelLogo from "./ChannelLogo";
import { saveChannelFlags } from "../../lib/channel-config-api";
import type { ChannelStatus, ChannelsOverview, ChannelsResponse, TelegramChannel } from "../../lib/channels";

type SortKey = "most" | "least" | "recent" | "name";

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "most", label: "Mais sinais primeiro" },
  { value: "least", label: "Menos sinais primeiro" },
  { value: "recent", label: "Sinal mais recente" },
  { value: "name", label: "Nome (A-Z)" },
];

const statusOptions: Array<{ value: "" | ChannelStatus; label: string }> = [
  { value: "", label: "Todos os status" },
  { value: "connected", label: "Conectado" },
  { value: "disconnected", label: "Desconectado" },
  { value: "paused", label: "Pausado" },
];

const number = (n: number) => n.toLocaleString("en-US");
const percent = (n: number) => `${n > 0 ? "+" : ""}${n}%`;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function describeLastSignal(iso: string | null, now: Date) {
  if (!iso) return { primary: "Sem sinais", secondary: null };
  const date = new Date(iso);
  const minutes = Math.max(0, Math.round((now.getTime() - date.getTime()) / 60000));
  if (minutes >= 1440) {
    const days = Math.round(minutes / 1440);
    return { primary: `${days} ${days === 1 ? "dia" : "dias"} atrás`, secondary: null };
  }
  const clock = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  const relative =
    minutes < 1 ? "agora" : minutes < 60 ? `há ${plural(minutes, "minuto", "minutos")}` : `há ${plural(Math.round(minutes / 60), "hora", "horas")}`;
  return { primary: clock, secondary: relative };
}

function MetricCard({
  label,
  icon,
  iconClass,
  value,
  badge,
  note,
}: {
  label: string;
  icon: string;
  iconClass: string;
  value: ReactNode;
  badge?: string;
  note: string;
}) {
  return (
    <div className="flex min-h-[111px] items-center gap-4 rounded-xl border border-line bg-gradient-to-br from-surface-2/70 to-surface px-5 py-4">
      <span aria-hidden className={cx("flex size-[72px] shrink-0 items-center justify-center rounded-xl", iconClass)}>
        <Icon name={icon} size={34} stroke={1.7} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-fg">{label}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="tabular text-[27px] font-bold leading-8 tracking-tight text-fg">{value}</span>
          {badge && <span className="tabular rounded-md bg-success-soft px-2 py-0.5 text-sm font-semibold text-success">{badge}</span>}
        </p>
        <p className="mt-0.5 truncate text-sm text-fg-muted">{note}</p>
      </div>
    </div>
  );
}

function Overview({ overview }: { overview: ChannelsOverview }) {
  return (
    <section aria-label="Indicadores dos canais" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Canais Conectados" icon="layers" iconClass="bg-[#0b3560] text-[#2f9bff]" value={overview.connected} note={`de ${overview.allowed} permitidos`} />
      <MetricCard label="Total de Sinais" icon="barsFilled" iconClass="bg-[#073d36] text-success" value={number(overview.signals_7d)} badge={percent(overview.signals_7d_change)} note="últimos 7 dias" />
      <MetricCard label="Sinais Executados" icon="target" iconClass="bg-[#221a4d] text-[#9b6bff]" value={number(overview.executed)} badge={`${overview.execution_rate}%`} note="taxa de execução" />
      <MetricCard label="Tempo Médio de Sinal" icon="clock" iconClass="bg-[#0a3a58] text-[#1bb5e9]" value={`${overview.avg_signal_seconds}s`} badge={percent(overview.avg_signal_change)} note="até a execução" />
    </section>
  );
}

function SelectField({ label, value, onChange, children, className }: { label: string; value: string; onChange: (v: string) => void; children: ReactNode; className?: string }) {
  return (
    <label className={cx("relative block", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full appearance-none rounded-lg border border-line-strong/60 bg-surface pl-4 pr-10 text-sm text-fg outline-none transition-colors hover:border-line-strong focus-visible:border-brand"
      >
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-fg-muted">
        <Icon name="chevronDown" size={16} />
      </span>
    </label>
  );
}

function StatusLine({ status }: { status: ChannelStatus }) {
  if (status === "disconnected") {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-danger-soft px-2 py-0.5 text-sm text-danger">
        <span aria-hidden className="size-2.5 rounded-full bg-danger" />
        Desconectado
      </span>
    );
  }
  const connected = status === "connected";
  return (
    <span className={cx("inline-flex items-center gap-2 text-sm", connected ? "text-success" : "text-warning")}>
      <span aria-hidden className={cx("size-2.5 rounded-full", connected ? "bg-success" : "bg-warning")} />
      {connected ? "Conectado" : "Pausado"}
    </span>
  );
}

function RowStat({ icon, iconClass, label, children }: { icon: string; iconClass: string; label: string; children: ReactNode }) {
  return (
    <div className="relative flex min-w-0 items-center gap-3 @min-[1120px]:before:absolute @min-[1120px]:before:-left-1.5 @min-[1120px]:before:top-1/2 @min-[1120px]:before:h-11 @min-[1120px]:before:w-px @min-[1120px]:before:-translate-y-1/2 @min-[1120px]:before:bg-line">
      <span aria-hidden className={cx("hidden shrink-0 @md:block", iconClass)}>
        <Icon name={icon} size={icon === "telegram" ? 20 : 22} stroke={1.8} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] text-fg-muted">{label}</p>
        <div className="mt-0.5 text-xl font-bold leading-6 tabular text-fg">{children}</div>
      </div>
    </div>
  );
}

function Switch({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cx(
        "relative h-[27px] w-[47px] shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        checked ? "bg-success" : "bg-[#3b4a5a]",
      )}
    >
      <span className={cx("absolute top-[3px] size-[21px] rounded-full bg-white shadow transition-[left]", checked ? "left-[23px]" : "left-[3px]")} />
    </button>
  );
}

function RowMenu({ channel, active, onToggle }: { channel: TelegramChannel; active: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-fg-muted hover:bg-white/[.06] hover:text-fg";
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Mais ações do canal ${channel.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex h-[46px] w-[49px] items-center justify-center rounded-lg border border-line-strong/60 bg-surface-2/60 text-fg transition-colors hover:border-line-strong hover:bg-surface-3"
      >
        <Icon name="vmore" size={18} stroke={2.6} />
      </button>
      {open && (
        <div role="menu" onClick={(e) => e.stopPropagation()} className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-line-strong bg-surface-2 p-1 shadow-xl shadow-black/40">
          <button role="menuitem" className={item} onClick={() => { onToggle(); setOpen(false); }}>
            <Icon name="refresh" size={14} /> {active ? "Desativar canal" : "Ativar canal"}
          </button>
          <button
            role="menuitem"
            className={item}
            onClick={() => {
              void navigator.clipboard?.writeText(channel.id);
              setOpen(false);
            }}
          >
            <Icon name="copy" size={14} /> Copiar ID
          </button>
        </div>
      )}
    </div>
  );
}

function ChannelRow({ channel, now, active, onToggle }: { channel: TelegramChannel; now: Date; active: boolean; onToggle: () => void }) {
  const last = describeLastSignal(channel.last_signal_at, now);
  const stateLabel = active ? "Ativo" : channel.status === "paused" ? "Pausado" : "Inativo";

  return (
    <li className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong @min-[672px]:grid-cols-[minmax(0,1fr)_auto] @min-[672px]:items-center @min-[1120px]:grid-cols-[minmax(0,400fr)_minmax(0,147fr)_minmax(0,175fr)_minmax(0,220fr)_auto_auto] @min-[1120px]:py-[5px]">
      <div className="flex min-w-0 items-center gap-4">
        <ChannelLogo name={channel.name} avatarUrl={channel.avatar_url} logoKey={channel.logo_key} />
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-semibold uppercase leading-6 tracking-wide text-fg">{channel.name}</h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <StatusLine status={channel.status} />
            {channel.is_primary && (
              <span className="rounded-md border border-brand/50 bg-brand-soft/60 px-2.5 py-0.5 text-[13px] text-[#5cc2ff]">Canal Principal</span>
            )}
          </div>
        </div>
      </div>

      <div className="order-3 grid grid-cols-3 gap-3 border-t border-line pt-3 @min-[672px]:col-span-2 @min-[1120px]:order-none @min-[1120px]:contents @min-[1120px]:border-0 @min-[1120px]:pt-0">
        <RowStat icon="telegram" iconClass="text-[#2aa6ee]" label="Sinais hoje">{channel.signals_today}</RowStat>
        <RowStat icon="barsFilled" iconClass="text-[#6d83ff]" label="Total de sinais">{number(channel.signals_total)}</RowStat>
        <RowStat icon="clock" iconClass="text-fg-muted" label="Último sinal">
          <span className="flex flex-wrap items-baseline gap-x-2 @min-[1120px]:flex-nowrap @min-[1120px]:whitespace-nowrap">
            <span>{last.primary}</span>
            {last.secondary && <span className="text-xs font-normal text-fg-muted">{last.secondary}</span>}
          </span>
        </RowStat>
      </div>

      <div className="order-2 flex items-center justify-between gap-3 @min-[672px]:justify-end @min-[672px]:gap-4 @min-[1120px]:order-none @min-[1120px]:contents">
        <div className="flex items-center gap-3 @min-[1120px]:justify-self-center">
          <Switch checked={active} label={`${active ? "Desativar" : "Ativar"} ${channel.name}`} onChange={onToggle} />
          <span className="w-14 text-sm text-fg">{stateLabel}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/connectors/${encodeURIComponent(channel.id)}`}
            aria-label={`Editar ${channel.name}`}
            className="inline-flex h-[46px] w-[97px] items-center justify-center rounded-lg border border-line-strong/60 bg-surface-2/60 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-3"
          >
            Editar
          </Link>
          <RowMenu channel={channel} active={active} onToggle={onToggle} />
        </div>
      </div>
    </li>
  );
}

export default function ChannelsView({ data }: { data: ChannelsResponse }) {
  const [search, setSearch] = useState("");
  const [channelId, setChannelId] = useState("");
  const [status, setStatus] = useState<"" | ChannelStatus>("");
  const [sort, setSort] = useState<SortKey>("most");
  const [activeOverrides, setActiveOverrides] = useState<Record<string, boolean>>({});
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [toggleError, setToggleError] = useState<string | null>(null);

  const now = useMemo(() => new Date(data.generated_at), [data.generated_at]);
  const isActive = (c: TelegramChannel) => activeOverrides[c.id] ?? c.active;
  const toggle = async (c: TelegramChannel) => {
    if (pendingIds.includes(c.id)) return;
    setToggleError(null);
    setPendingIds((ids) => [...ids, c.id]);
    const result = await saveChannelFlags(c.id, { active: !isActive(c) });
    if (result.ok) setActiveOverrides((prev) => ({ ...prev, [c.id]: result.data.active }));
    else setToggleError(result.error.message);
    setPendingIds((ids) => ids.filter((id) => id !== c.id));
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = data.items.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (channelId && c.id !== channelId) return false;
      if (status && c.status !== status) return false;
      return true;
    });
    const time = (c: TelegramChannel) => (c.last_signal_at ? new Date(c.last_signal_at).getTime() : 0);
    return [...filtered].sort((a, b) => {
      if (sort === "least") return a.signals_total - b.signals_total;
      if (sort === "recent") return time(b) - time(a);
      if (sort === "name") return a.name.localeCompare(b.name, "pt-BR");
      return b.signals_total - a.signals_total;
    });
  }, [data.items, search, channelId, status, sort]);

  return (
    <Shell>
      <PageHeader
        title="Canais Telegram"
        description="Gerencie os canais e grupos de sinais"
        actions={
          <Button variant="primary" className="h-[51px] gap-2.5 rounded-lg px-6 text-[16px] font-semibold">
            <Icon name="plus" size={22} stroke={2.2} />
            Adicionar Canal
          </Button>
        }
      />

      <Overview overview={data.overview} />

      <section aria-label="Filtros" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-[minmax(0,2.6fr)_repeat(3,minmax(0,1fr))] sm:[&>label:first-child]:col-span-3 lg:[&>label:first-child]:col-span-1">
        <label className="flex h-[46px] items-center gap-3 rounded-lg border border-line-strong/60 bg-surface px-4 text-fg-muted focus-within:border-brand">
          <Icon name="search" size={18} />
          <span className="sr-only">Buscar canal</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar canal..."
            className="h-full w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
          />
        </label>
        <SelectField label="Filtrar por canal" value={channelId} onChange={setChannelId}>
          <option value="">Todos os canais</option>
          {data.items.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </SelectField>
        <SelectField label="Filtrar por status" value={status} onChange={(v) => setStatus(v as "" | ChannelStatus)}>
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </SelectField>
        <SelectField label="Ordenar" value={sort} onChange={(v) => setSort(v as SortKey)}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </SelectField>
      </section>

      {toggleError && (
        <div role="alert" className="mt-4">
          <Notice tone="danger">{toggleError}</Notice>
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          className="mt-4 min-h-[240px]"
          title={data.error ? "Falha ao carregar canais" : "Nenhum canal encontrado"}
          description={data.error ?? (data.items.length ? "Ajuste a busca ou os filtros para ampliar o resultado." : "Os canais conectados aparecerão aqui.")}
        />
      ) : (
        <ul aria-label="Lista de canais" className="@container mt-4 flex flex-col gap-[7px]">
          {visible.map((c) => (
            <ChannelRow key={c.id} channel={c} now={now} active={isActive(c)} onToggle={() => toggle(c)} />
          ))}
        </ul>
      )}
    </Shell>
  );
}
