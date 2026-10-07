"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Shell from "../components/Shell";
import PageHeader from "../components/PageHeader";
import { Icon } from "../components/Icons";
import { Badge, Card, EmptyState, SectionTitle, Stat } from "../components/UI";
import { DashboardData, getDashboard } from "../lib/api";

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
      <div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

const fallback: DashboardData = {
  updated_at: "",
  total_executed_trades: 0,
  active_accounts: 0,
  active_automations: 0,
  top_symbol: null,
  top_symbol_share: 0,
  trades_over_time: [],
  top_symbols: [],
  trades_per_automation: [],
  trades_per_account: [],
  telegram_channels: [],
  recent_activity: [],
  system_status: {
    core: "—",
    telegram: "—",
    execution: "—",
    event_journal: "—",
  },
};

const statusNames: Record<string, string> = {
  core: "Núcleo",
  telegram: "Telegram",
  execution: "Execução",
  event_journal: "Diário de eventos",
};

function ViewLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand hover:text-[#5cc2ff]">
      {children}
      <Icon name="chevron" size={12} />
    </Link>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(fallback);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let alive = true;
    getDashboard()
      .then((value) => {
        if (!alive) return;
        setData(value);
        setState("ready");
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, []);

  const lastUpdated = useMemo(() => {
    const date = new Date(data.updated_at);
    return Number.isNaN(date.getTime())
      ? "--:--:--"
      : date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }, [data.updated_at]);

  const bars = data.trades_over_time;
  const maxBar = Math.max(1, ...bars.map((x) => x.count));

  const apiBadge =
    state === "loading" ? <Badge>Conectando à API…</Badge> : state === "error" ? <Badge tone="amber">API indisponível</Badge> : <Badge tone="green">API respondendo</Badge>;

  return (
    <Shell>
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard"
        description="Visão unificada de sistemas, contas, execução e desempenho."
        actions={
          <>
            <span className="text-xs text-fg-subtle">
              Última atualização <span className="tabular">{lastUpdated}</span>
            </span>
            {apiBadge}
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Operações executadas" value={String(data.total_executed_trades)} note="Desde o início" icon={<Icon name="trades" size={18} />} />
        <Stat label="Contas ativas" value={String(data.active_accounts)} note="Atualmente ativas" icon={<Icon name="accounts" size={18} />} accent="green" />
        <Stat label="Sistemas ativos" value={String(data.active_automations)} note="Atualmente ativos" icon={<Icon name="systems" size={18} />} accent="amber" />
        <Stat label="Símbolo principal" value={data.top_symbol ?? "—"} note={data.top_symbol ? `${data.top_symbol_share}% dos sinais` : "Sem sinais"} icon={<Icon name="chart" size={18} />} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Operações ao longo do tempo" description="Volume diário de operações." action={<Badge>Últimos 30 dias</Badge>} />
          {bars.length ? (
            <>
              <div className="mt-6 flex h-52 items-end gap-1.5 border-b border-line" role="img" aria-label="Gráfico de barras do volume diário de operações">
                {bars.map((item) => (
                  <div key={item.date} className="group flex h-full flex-1 items-end" title={`${item.date}: ${item.count}`}>
                    <div className="w-full rounded-t bg-brand/40 transition-colors group-hover:bg-brand" style={{ height: `${(item.count / maxBar) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-fg-subtle tabular">
                <span>{bars[0]?.date}</span>
                <span>{bars[Math.floor(bars.length / 2)]?.date}</span>
                <span>{bars[bars.length - 1]?.date}</span>
              </div>
            </>
          ) : (
            <EmptyState className="mt-6 h-52" title="Ainda não há dados de operações" description="O volume diário aparecerá aqui quando houver operações registradas." />
          )}
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle title="Principais símbolos" description="Por volume de sinais." action={<ViewLink href="/analytics">Ver desempenho</ViewLink>} />
          <div className="mt-6 space-y-5">
            {data.top_symbols.length ? (
              data.top_symbols.map((item) => (
                <div key={item.symbol}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span><span className="font-medium text-fg">{item.symbol}</span><span className="ml-2 text-xs text-fg-subtle">{item.name}</span></span>
                    <span className="tabular text-xs text-fg-muted">{item.share}%</span>
                  </div>
                  <MiniBar value={item.share} />
                </div>
              ))
            ) : (
              <EmptyState title="Sem dados de símbolos" description="Os instrumentos mais ativos aparecerão aqui." />
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <SectionTitle
            title="Operações por sistema"
            description="Distribuição de sinais por fluxo."
            action={<span className="tabular text-xs text-fg-subtle">{data.trades_per_automation.reduce((a, x) => a + x.count, 0)} no total</span>}
          />
          <div className="mt-6 space-y-5">
            {data.trades_per_automation.length ? (
              data.trades_per_automation.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between text-xs"><span className="text-fg-muted">{item.name}</span><span className="tabular text-fg-subtle">{item.count}</span></div>
                  <MiniBar value={data.total_executed_trades ? (item.count / data.total_executed_trades) * 100 : 0} />
                </div>
              ))
            ) : (
              <EmptyState title="Nenhuma atividade de sistemas" description="Crie um sistema para começar a copiar sinais." />
            )}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle title="Operações por conta" description="Distribuição por conta." action={<ViewLink href="/accounts">Gerenciar contas</ViewLink>} />
          <div className="mt-6 space-y-5">
            {data.trades_per_account.length ? (
              data.trades_per_account.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between text-xs"><span className="text-fg-muted">{item.name}</span><span className="tabular text-fg-subtle">{item.count}</span></div>
                  <MiniBar value={data.total_executed_trades ? (item.count / data.total_executed_trades) * 100 : 0} />
                </div>
              ))
            ) : (
              <EmptyState title="Nenhuma atividade de contas" description="Conecte uma conta de trading para começar." />
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Canais do Telegram" description="Distribuição de sinais por canal." action={<ViewLink href="/connectors">Gerenciar</ViewLink>} />
          <div className="mt-6">
            {data.telegram_channels.length ? (
              <ul className="divide-y divide-line">
                {data.telegram_channels.map((item) => (
                  <li key={item.name} className="flex justify-between py-3 text-sm"><span className="text-fg">{item.name}</span><span className="tabular text-fg-subtle">{item.count}</span></li>
                ))}
              </ul>
            ) : (
              <EmptyState title="Nenhum sinal do Telegram" description="A distribuição por canal aparecerá quando sinais forem recebidos." />
            )}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle title="Status do sistema" description="Estado informado pela API do Copytrix." action={state === "ready" ? <Badge tone="blue">Informado pela API</Badge> : <Badge>Não verificado</Badge>} />
          <ul className="mt-4 divide-y divide-line">
            {Object.entries(data.system_status).map(([key, value]) => (
              <li key={key} className="flex items-center justify-between py-3">
                <span className="text-sm text-fg-muted">{statusNames[key] ?? key.replace("_", " ")}</span>
                <span className={state === "ready" ? "text-xs font-medium text-fg" : "text-xs text-fg-subtle"}>{value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-line p-5">
          <SectionTitle title="Atividade recente" description="Últimos eventos do workspace." />
        </div>
        {data.recent_activity.length ? (
          <ul className="divide-y divide-line">
            {data.recent_activity.map((item) => (
              <li key={`${item.type}-${item.name}-${item.time}`} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-5 py-3.5 sm:grid-cols-[110px_1fr_auto_80px]">
                <span className="text-xs text-fg-subtle">{item.type}</span>
                <span className="order-3 col-span-2 text-sm text-fg sm:order-none sm:col-span-1">{item.name}</span>
                <Badge tone="neutral">{item.status}</Badge>
                <span className="hidden text-right text-xs tabular text-fg-subtle sm:block">{item.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-5">
            <EmptyState title="Nenhuma atividade recente" description="Os sinais executados aparecerão aqui." />
          </div>
        )}
      </Card>
    </Shell>
  );
}
