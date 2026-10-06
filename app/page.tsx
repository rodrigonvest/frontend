"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Shell from "../components/Shell";
import Topbar from "../components/Topbar";
import { Badge, Card, Stat } from "../components/UI";
import { DashboardData, getDashboard } from "../lib/api";

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
      <div className="h-full rounded-full bg-white/35" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-4 py-7 text-center text-xs text-neutral-600">
      {children}
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
    core: "Online",
    telegram: "Ready",
    execution: "Ready",
    event_journal: "Healthy",
  },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(fallback);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    getDashboard()
      .then((value) => alive && setData(value))
      .catch(() => alive && setError(true));
    return () => { alive = false; };
  }, []);

  const lastUpdated = useMemo(() => {
    const date = new Date(data.updated_at);
    return Number.isNaN(date.getTime())
      ? "--:--:--"
      : date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }, [data.updated_at]);

  const bars = data.trades_over_time;
  const maxBar = Math.max(1, ...bars.map((x) => x.count));

  return (
    <Shell>
      <Topbar
        eyebrow="Overview"
        title="Dashboard"
        description="Your unified view of automations, accounts, execution and performance."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">Workspace</p>
          <p className="mt-1 text-sm text-neutral-300">Good evening. Your COPYTRIX workspace is ready.</p>
          <p className="mt-1 text-[10px] text-neutral-700">Last updated: {lastUpdated}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge>Paper environment</Badge>
          <Badge tone={error ? "yellow" : "green"}>{error ? "API unavailable" : "● System online"}</Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total Executed Trades" value={String(data.total_executed_trades)} note="All time" />
        <Stat label="Active Accounts" value={String(data.active_accounts)} note="Currently active" />
        <Stat label="Active Automations" value={String(data.active_automations)} note="Currently active" />
        <Stat label="Top Symbol" value={data.top_symbol ?? "—"} note={`${data.top_symbol ? `${data.top_symbol_share}% share` : "0 signals"}`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Trades Over Time</h2>
              <p className="mt-1 text-xs text-neutral-600">Daily trade volume.</p>
            </div>
            <Badge>Last 30 days</Badge>
          </div>
          {bars.length ? (
            <>
              <div className="mt-8 flex h-52 items-end gap-2 border-b border-white/10 px-1">
                {bars.map((item) => (
                  <div key={item.date} className="group relative flex h-full flex-1 items-end">
                    <div className="w-full rounded-t bg-white/[0.12] transition group-hover:bg-white/[0.22]" style={{ height: `${(item.count / maxBar) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-neutral-700">
                <span>{bars[0]?.date}</span><span>{bars[Math.floor(bars.length / 2)]?.date}</span><span>{bars[bars.length - 1]?.date}</span>
              </div>
            </>
          ) : (
            <div className="mt-7"><Empty>No trade data available yet.</Empty></div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Top Symbols</h2>
              <p className="mt-1 text-xs text-neutral-600">By signal volume.</p>
            </div>
            <Link href="/analytics" className="text-xs text-neutral-600 hover:text-neutral-300">View analytics →</Link>
          </div>
          <div className="mt-7 space-y-5">
            {data.top_symbols.length ? data.top_symbols.map((item) => (
              <div key={item.symbol}>
                <div className="mb-2 flex items-center justify-between">
                  <div><span className="text-sm font-medium text-neutral-200">{item.symbol}</span><span className="ml-2 text-xs text-neutral-600">{item.name}</span></div>
                  <span className="text-xs text-neutral-400">{item.share}%</span>
                </div>
                <MiniBar value={item.share} />
              </div>
            )) : <Empty>No symbol data available<br />Start trading to see your most active instruments.</Empty>}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-semibold">Trades Per Automation</h2><p className="mt-1 text-xs text-neutral-600">Signal distribution by workflow.</p></div>
            <span className="text-xs text-neutral-600">{data.trades_per_automation.reduce((a, x) => a + x.count, 0)} total</span>
          </div>
          <div className="mt-7 space-y-5">
            {data.trades_per_automation.length ? data.trades_per_automation.map((item) => (
              <div key={item.name}><div className="mb-2 flex justify-between text-xs"><span className="text-neutral-300">{item.name}</span><span className="text-neutral-500">{item.count}</span></div><MiniBar value={data.total_executed_trades ? item.count / data.total_executed_trades * 100 : 0} /></div>
            )) : <Empty>No room activity yet.<br />Create an automation and start copying signals.</Empty>}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-semibold">Trades Per Account</h2><p className="mt-1 text-xs text-neutral-600">Account distribution.</p></div>
            <Link href="/accounts" className="text-xs text-neutral-600 hover:text-neutral-300">Manage accounts →</Link>
          </div>
          <div className="mt-7 space-y-5">
            {data.trades_per_account.length ? data.trades_per_account.map((item) => (
              <div key={item.name}><div className="mb-2 flex justify-between text-xs"><span className="text-neutral-300">{item.name}</span><span className="text-neutral-500">{item.count}</span></div><MiniBar value={data.total_executed_trades ? item.count / data.total_executed_trades * 100 : 0} /></div>
            )) : <Empty>No account activity yet.<br />Connect a trading account to get started.</Empty>}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-semibold">Telegram Channels</h2><p className="mt-1 text-xs text-neutral-600">Signal distribution by channel.</p></div>
            <Link href="/connectors" className="text-xs text-neutral-600 hover:text-neutral-300">Manage →</Link>
          </div>
          <div className="mt-7">
            {data.telegram_channels.length ? data.telegram_channels.map((item) => <div key={item.name} className="mb-4 flex justify-between text-sm"><span>{item.name}</span><span className="text-neutral-500">{item.count}</span></div>) : <Empty>No Telegram signals yet.<br />Once signals are received from your Telegram channels, source distribution will appear here.</Empty>}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-semibold">System Status</h2><p className="mt-1 text-xs text-neutral-600">COPYTRIX infrastructure health.</p></div>
            <Badge tone="green">Healthy</Badge>
          </div>
          <div className="mt-6 space-y-4">
            {Object.entries(data.system_status).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                <span className="text-sm capitalize text-neutral-400">{key.replace("_", " ")}</span>
                <span className="text-xs text-emerald-400">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-sm font-semibold">Recent Activity</h2>
          <p className="mt-1 text-xs text-neutral-600">Latest events across your workspace.</p>
        </div>
        {data.recent_activity.length ? data.recent_activity.map((item) => (
          <div key={`${item.type}-${item.name}-${item.time}`} className="grid grid-cols-[90px_1fr_auto_70px] items-center gap-3 border-b border-white/5 px-5 py-4 last:border-0">
            <span className="text-xs text-neutral-600">{item.type}</span>
            <span className="text-sm text-neutral-300">{item.name}</span>
            <Badge tone="green">{item.status}</Badge>
            <span className="text-right text-xs text-neutral-600">{item.time}</span>
          </div>
        )) : <div className="p-8"><Empty>No recent trades<br />Executed signals will appear here.</Empty></div>}
      </Card>
    </Shell>
  );
}
