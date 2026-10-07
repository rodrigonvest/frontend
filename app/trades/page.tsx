"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import TradeChart from "../../components/trades/TradeChart";
import ChannelAvatar from "../../components/trades/ChannelAvatar";
import { LogEntry, SideBadge, TradeDetails, TradeLog, TradeManagement } from "../../components/trades/TradePanels";
import { Badge, Button, Card, Stat, cx } from "../../components/UI";
import { Icon } from "../../components/Icons";
import { getLogs, getTrades, TradeRecord, TradeSummary } from "../../lib/api";
import {
  EXIT_KEYS,
  PNL_KEYS,
  R_KEYS,
  channelName,
  dt,
  fmt,
  meta,
  money,
  nmeta,
  signColor,
  signed,
  statusLabel,
  statusTone,
  text,
  tradesToCsv,
} from "../../lib/trade-format";

const PAGE_SIZE = 10;
const emptySummary: TradeSummary = { total: 0, open: 0, partial: 0, closed: 0, pending: 0, buy: 0, sell: 0 };

const columns = ["#", "Data/Hora", "Canal", "Símbolo", "Tipo", "Entrada", "Saída", "SL", "TP", "Resultado", "R", "Pips", "Lote", "Conta", "Status"];

function ResultPill({ value }: { value: number | null }) {
  if (value == null) return <span className="text-fg-subtle">—</span>;
  return (
    <span className={cx("inline-flex h-6 items-center rounded-md px-2 font-semibold tabular", value < 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success")}>
      {money(value)}
    </span>
  );
}

function pageList(page: number, pages: number): Array<number | "gap"> {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: Array<number | "gap"> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

export default function TradesPage() {
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [summary, setSummary] = useState<TradeSummary>(emptySummary);
  const [selected, setSelected] = useState<TradeRecord | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("");
  const [status, setStatus] = useState("");
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(true);
  const [last, setLast] = useState("—");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await getTrades({ limit: 500, search, symbol, side, status, receiver });
      setTrades(d.items || []);
      setSummary(d.summary || emptySummary);
      setSelected((cur) => (cur && d.items.some((t) => t.trade_id === cur.trade_id) ? cur : d.items[0] ?? null));
      setLast(new Date().toLocaleTimeString("pt-BR"));
      const l = await getLogs(500).catch(() => ({ items: [] }));
      setLogs((l.items || []) as LogEntry[]);
      setError(null);
    } catch {
      setError("Não foi possível conectar à API do Copytrix. Verifique se o backend está ativo.");
    } finally {
      setLoading(false);
    }
  }, [search, symbol, side, status, receiver]);

  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    setPage(1);
  }, [search, symbol, side, status, receiver]);

  const symbols = useMemo(() => Array.from(new Set(trades.map((t) => t.symbol).filter(Boolean))).sort(), [trades]);
  const receivers = useMemo(() => Array.from(new Set(trades.map((t) => t.receiver_id || "Pessoal").filter(Boolean))).sort(), [trades]);

  const pnl = trades.map((t) => nmeta(t, PNL_KEYS)).filter((x): x is number => x !== null);
  const rs = trades.map((t) => nmeta(t, R_KEYS)).filter((x): x is number => x !== null);
  const winners = pnl.length ? pnl.filter((x) => x > 0).length : rs.filter((x) => x > 0).length;
  const losers = pnl.length ? pnl.filter((x) => x < 0).length : rs.filter((x) => x < 0).length;
  const totalPnl = summary.pnl_total ?? (pnl.length ? pnl.reduce((a, b) => a + b, 0) : null);
  const avgR = summary.avg_r ?? (rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null);
  const maxR = summary.max_r ?? (rs.length ? Math.max(...rs) : null);
  const minR = summary.min_r ?? (rs.length ? Math.min(...rs) : null);
  const hasResults = pnl.length > 0 || rs.length > 0;
  const pct = (n: number) => (summary.total ? ((n / summary.total) * 100).toFixed(1) : "0.0");

  const rows = trades.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(trades.length / PAGE_SIZE));

  const selNumber = selected ? trades.length - trades.findIndex((t) => t.trade_id === selected.trade_id) : null;
  const selLogs = selected ? logs.filter((x) => x.trade_id === selected.trade_id || x.signal_id === selected.signal_id).slice(0, 8) : [];
  const hasFilters = Boolean(search || symbol || side || status || receiver);

  const exportCsv = () => {
    const blob = new Blob([tradesToCsv(trades)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `copytrix-operacoes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showChart = (t: TradeRecord) => {
    setSelected(t);
    document.getElementById("trade-chart")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Shell>
      <PageHeader
        title="Operações"
        description="Todas as operações registradas pelo executor do Copytrix."
        actions={
          <>
            <span className="mr-1 hidden text-xs text-fg-subtle sm:inline" aria-live="polite">
              Atualizado às <span className="tabular">{last}</span>
            </span>
            <Button disabled title="Filtro por período em breve">
              <Icon name="calendar" size={15} />
              Período
            </Button>
            <Button onClick={() => void load()} disabled={loading} aria-label="Atualizar operações">
              <Icon name="refresh" size={15} />
              <span className="hidden sm:inline">{loading ? "Atualizando…" : "Atualizar"}</span>
            </Button>
            <Button variant="primary" onClick={exportCsv} disabled={trades.length === 0} title="Exportar operações filtradas em CSV">
              <Icon name="download" size={15} />
              Exportar
            </Button>
          </>
        }
      />

      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 md:grid-cols-4 2xl:grid-cols-7">
        <Stat label="Total de operações" value={String(summary.total)} note={`${summary.buy} BUY · ${summary.sell} SELL`} icon={<Icon name="trades" size={18} />} />
        <Stat label="Vencedoras" value={hasResults ? `${winners} (${pct(winners)}%)` : "—"} icon={<Icon name="trophy" size={18} />} accent="green" positive={hasResults ? true : undefined} />
        <Stat label="Perdedoras" value={hasResults ? `${losers} (${pct(losers)}%)` : "—"} icon={<Icon name="x" size={18} />} accent="red" positive={hasResults ? false : undefined} />
        <Stat label="Lucro total" value={money(totalPnl)} icon={<Icon name="dollar" size={18} />} accent="green" positive={totalPnl == null ? undefined : totalPnl >= 0} />
        <Stat label="Média por operação" value={signed(avgR, "R")} icon={<Icon name="analytics" size={18} />} positive={avgR == null ? undefined : avgR >= 0} />
        <Stat label="Maior ganho" value={maxR == null ? "—" : `+${fmt(maxR)}R`} icon={<Icon name="chart" size={18} />} accent="green" positive={maxR == null ? undefined : true} />
        <Stat label="Maior perda" value={minR == null ? "—" : `${fmt(minR)}R`} icon={<Icon name="chart" size={18} />} accent="red" positive={minR == null ? undefined : false} />
      </section>

      <section aria-label="Filtros" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(150px,1fr))]">
        <label className="control flex items-center gap-2 sm:col-span-2 lg:col-span-1">
          <span className="text-fg-subtle"><Icon name="search" size={16} /></span>
          <span className="sr-only">Buscar operação</span>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar operação..." className="h-full w-full bg-transparent outline-none" />
        </label>
        <select aria-label="Símbolo" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="control">
          <option value="">Todos os símbolos</option>
          {symbols.map((x) => <option key={x}>{x}</option>)}
        </select>
        <select aria-label="Tipo" value={side} onChange={(e) => setSide(e.target.value)} className="control">
          <option value="">Todos os tipos</option>
          <option>BUY</option>
          <option>SELL</option>
        </select>
        <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="control">
          <option value="">Todos os status</option>
          <option value="CLOSED">Fechada</option>
          <option value="OPEN">Aberta</option>
          <option value="PARTIAL">Parcial</option>
          <option value="PENDING">Pendente</option>
        </select>
        <select aria-label="Canal" value={receiver} onChange={(e) => setReceiver(e.target.value)} className="control">
          <option value="">Todos os canais</option>
          {receivers.map((x) => <option key={x}>{x}</option>)}
        </select>
      </section>

      <Card className="mt-3 overflow-hidden">
        <div className="max-h-[480px] overflow-auto">
          <table className="trade-table w-full min-w-[1280px]">
            <caption className="sr-only">Lista de operações. Selecione uma linha para ver os detalhes.</caption>
            <thead className="sticky top-0 z-10">
              <tr>
                {columns.map((h) => (
                  <th key={h} scope="col" className="h-10 border-b border-line bg-surface-2 px-3 first:pl-5">{h}</th>
                ))}
                <th scope="col" className="h-10 border-b border-line bg-surface-2 px-3 pr-5"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {loading && trades.length === 0 ? (
                Array.from({ length: 6 }, (_, i) => (
                  <tr key={i} className="h-12 !cursor-default">
                    <td colSpan={columns.length + 1} className="px-5">
                      <div className="h-3 animate-pulse rounded bg-surface-3" style={{ width: `${88 - i * 7}%` }} />
                    </td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr className="!cursor-default hover:!bg-transparent">
                  <td colSpan={columns.length + 1} className="h-[320px] text-center">
                    <span aria-hidden className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-surface-3 text-fg-subtle">
                      <Icon name="trades" size={20} />
                    </span>
                    <p className={cx("text-sm font-medium", error ? "text-danger" : "text-fg-muted")}>{error ? "Falha ao carregar operações" : "Nenhuma operação encontrada"}</p>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {error
                        ? error
                        : hasFilters ? "Ajuste os filtros para ampliar a busca." : "As operações aparecerão aqui quando forem registradas pelo executor."}
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map((t, i) => {
                  const m = meta(t);
                  const p = nmeta(t, PNL_KEYS);
                  const r = nmeta(t, R_KEYS);
                  const pp = nmeta(t, ["pips"]);
                  const isSel = selected?.trade_id === t.trade_id;
                  const channel = channelName(t);
                  return (
                    <tr
                      key={t.trade_id}
                      onClick={() => setSelected(t)}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(t);
                        }
                      }}
                      tabIndex={0}
                      aria-selected={isSel}
                      className={cx("h-12 outline-none focus-visible:bg-surface-2 focus-visible:shadow-[inset_3px_0_0_var(--color-brand)]", isSel && "!bg-brand-soft/40 shadow-[inset_3px_0_0_var(--color-brand)]")}
                    >
                      <td className="px-3 pl-5 tabular text-fg-subtle">{trades.length - (page - 1) * PAGE_SIZE - i}</td>
                      <td className="px-3 tabular">{dt(t.opened_at || t.created_at)}</td>
                      <td className="px-3">
                        <span className="flex max-w-[200px] items-center gap-2.5">
                          <ChannelAvatar name={channel} />
                          <span className="truncate font-medium uppercase tracking-wide text-[11.5px] text-fg">{channel}</span>
                        </span>
                      </td>
                      <td className="px-3 font-medium text-fg">{t.symbol}</td>
                      <td className="px-3"><SideBadge side={t.side} /></td>
                      <td className="px-3 tabular">{fmt(t.entry_price)}</td>
                      <td className="px-3 tabular">{fmt(nmeta(t, EXIT_KEYS))}</td>
                      <td className="px-3 tabular">{fmt(t.stop_loss)}</td>
                      <td className="px-3 tabular">{text(m.tp_label, t.take_profit != null ? fmt(t.take_profit) : null)}</td>
                      <td className="px-3"><ResultPill value={p} /></td>
                      <td className={cx("px-3 tabular font-medium", signColor(r))}>{signed(r, "R")}</td>
                      <td className={cx("px-3 tabular", signColor(pp))}>{signed(pp, "", 1)}</td>
                      <td className="px-3 tabular">{fmt(t.volume)}</td>
                      <td className="max-w-[140px] truncate px-3">{text(m.account, t.receiver_id)}</td>
                      <td className="px-3"><Badge tone={statusTone(t.status)}>{statusLabel(t.status)}</Badge></td>
                      <td className="px-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            showChart(t);
                          }}
                          aria-label={`Ver gráfico da operação ${t.symbol}`}
                          title="Ver gráfico"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-brand hover:bg-brand-soft/60"
                        >
                          <Icon name="analytics" size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Paginação" className="flex flex-col gap-2 border-t border-line px-5 py-3 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <span className="tabular">
            Mostrando {trades.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, trades.length)} de {trades.length}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Página anterior" className="flex size-8 items-center justify-center rounded-lg hover:bg-white/[.05] disabled:opacity-40">
              <span className="rotate-180"><Icon name="chevron" size={14} /></span>
            </button>
            {pageList(page, pages).map((p, i) =>
              p === "gap" ? (
                <span key={`g${i}`} aria-hidden className="px-1">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={page === p ? "page" : undefined}
                  className={cx("h-8 min-w-8 rounded-lg border px-2 tabular", page === p ? "border-brand-strong bg-brand-strong font-semibold text-white" : "border-line text-fg-muted hover:border-line-strong hover:text-fg")}
                >
                  {p}
                </button>
              ),
            )}
            <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} aria-label="Próxima página" className="flex size-8 items-center justify-center rounded-lg hover:bg-white/[.05] disabled:opacity-40">
              <Icon name="chevron" size={14} />
            </button>
          </div>
        </nav>
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
        <TradeDetails trade={selected} number={selNumber} />
        <div className="min-h-[340px] lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1">
          <TradeChart trade={selected} />
        </div>
        <div className="flex flex-col gap-3">
          <TradeManagement />
          <TradeLog logs={selLogs} />
        </div>
      </div>
    </Shell>
  );
}
