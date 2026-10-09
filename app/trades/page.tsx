"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import TradeChart from "../../components/trades/TradeChart";
import ChannelAvatar from "../../components/trades/ChannelAvatar";
import MetricCard from "../../components/trades/MetricCard";
import { LogEntry, SideBadge, TradeDetails, TradeLog, TradeManagement } from "../../components/trades/TradePanels";
import { Badge, Button, Card, cx } from "../../components/UI";
import { Icon } from "../../components/Icons";
import { getLogs, getTrades, TradeRecord, TradeSummary } from "../../lib/api";
import { DEMO_ENABLED, getDemoLogs, getDemoTrades } from "../../lib/demo-data";
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

const openedAt = (t: TradeRecord) => t.opened_at || t.created_at;
const resultOf = (t: TradeRecord) => nmeta(t, PNL_KEYS) ?? nmeta(t, R_KEYS);
const dateOnly = (v?: string | null) => dt(v).split(/,?\s+/)[0];

function ResultPill({ value }: { value: number | null }) {
  if (value == null) return <span className="text-fg-subtle">—</span>;
  return (
    <span
      className={cx(
        "inline-flex h-6 min-w-[60px] items-center justify-center rounded-md px-2 font-semibold tabular",
        value < 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success",
      )}
    >
      {money(value)}
    </span>
  );
}

function pageList(page: number, pages: number): Array<number | "gap"> {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "gap", pages];
  if (page >= pages - 3) return [1, "gap", pages - 4, pages - 3, pages - 2, pages - 1, pages];
  return [1, "gap", page - 1, page, page + 1, "gap", pages];
}

function RowMenu({ trade, up, onDetails, onChart }: { trade: TradeRecord; up: boolean; onDetails: () => void; onChart: () => void }) {
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

  const item = "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] text-fg-muted hover:bg-white/[.06] hover:text-fg";
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={`Mais ações da operação ${trade.symbol}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex size-7 items-center justify-center rounded-md border border-line text-fg-muted hover:border-line-strong hover:text-fg"
      >
        <Icon name="vmore" size={15} stroke={2.4} />
      </button>
      {open && (
        <div
          role="menu"
          onClick={(e) => e.stopPropagation()}
          className={cx("absolute right-0 z-20 w-44 rounded-lg border border-line-strong bg-surface-2 p-1 shadow-xl shadow-black/40", up ? "bottom-full mb-1" : "top-full mt-1")}
        >
          <button role="menuitem" className={item} onClick={() => { onDetails(); setOpen(false); }}>
            <Icon name="eye" size={14} /> Ver detalhes
          </button>
          <button role="menuitem" className={item} onClick={() => { onChart(); setOpen(false); }}>
            <Icon name="analytics" size={14} /> Ver gráfico
          </button>
          <button
            role="menuitem"
            className={item}
            onClick={() => {
              void navigator.clipboard?.writeText(trade.trade_id);
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

export default function TradesPage() {
  const router = useRouter();
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [summary, setSummary] = useState<TradeSummary>(emptySummary);
  const [selected, setSelected] = useState<TradeRecord | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("");
  const [status, setStatus] = useState("");
  const [receiver, setReceiver] = useState("");
  const [outcome, setOutcome] = useState("");
  const [channel, setChannel] = useState("");
  const [period, setPeriod] = useState("all");
  const [loading, setLoading] = useState(true);
  const [last, setLast] = useState("—");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"api" | "demo">("api");

  const load = useCallback(async () => {
    setLoading(true);
    const params = { search, symbol, side, status, receiver };
    const apply = (items: TradeRecord[], s: TradeSummary) => {
      setTrades(items);
      setSummary(s);
      setSelected((cur) => (cur && items.some((t) => t.trade_id === cur.trade_id) ? cur : items[0] ?? null));
      setLast(new Date().toLocaleTimeString("pt-BR"));
      setError(null);
    };
    try {
      const d = await getTrades({ limit: 500, ...params });
      apply(d.items || [], d.summary || emptySummary);
      const l = await getLogs(500).catch(() => ({ items: [] }));
      setLogs((l.items || []) as LogEntry[]);
      setSource("api");
    } catch {
      if (DEMO_ENABLED) {
        const d = getDemoTrades(params);
        apply(d.items, d.summary);
        setLogs(getDemoLogs());
        setSource("demo");
      } else {
        setError("Não foi possível conectar à API do Copytrix. Verifique se o backend está ativo.");
      }
    } finally {
      setLoading(false);
    }
  }, [search, symbol, side, status, receiver]);

  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    setPage(1);
  }, [search, symbol, side, status, receiver, outcome, channel, period]);

  const symbols = useMemo(() => Array.from(new Set(trades.map((t) => t.symbol).filter(Boolean))).sort(), [trades]);
  const receivers = useMemo(() => Array.from(new Set(trades.map((t) => t.receiver_id || "Pessoal").filter(Boolean))).sort(), [trades]);
  const channels = useMemo(() => Array.from(new Set(trades.map(channelName).filter((c) => c && c !== "—"))).sort(), [trades]);

  const range = useMemo(() => {
    const times = trades.map((t) => new Date(openedAt(t)).getTime()).filter((x) => !Number.isNaN(x));
    if (!times.length) return null;
    return { min: Math.min(...times), max: Math.max(...times) };
  }, [trades]);

  const visible = useMemo(() => {
    const days = period === "all" ? null : Number(period);
    return trades.filter((t) => {
      if (channel && channelName(t) !== channel) return false;
      if (days && range && new Date(openedAt(t)).getTime() < range.max - days * 86_400_000) return false;
      if (outcome) {
        const r = resultOf(t);
        if (outcome === "win" && !(r != null && r > 0)) return false;
        if (outcome === "loss" && !(r != null && r < 0)) return false;
      }
      return true;
    });
  }, [trades, channel, period, outcome, range]);

  const clientFiltered = visible.length !== trades.length;
  const total = clientFiltered ? visible.length : summary.total;
  const pnl = visible.map((t) => nmeta(t, PNL_KEYS)).filter((x): x is number => x !== null);
  const rs = visible.map((t) => nmeta(t, R_KEYS)).filter((x): x is number => x !== null);
  const winners = pnl.length ? pnl.filter((x) => x > 0).length : rs.filter((x) => x > 0).length;
  const losers = pnl.length ? pnl.filter((x) => x < 0).length : rs.filter((x) => x < 0).length;
  const pick = (v: number | null | undefined, fallback: number | null) => (clientFiltered ? fallback : v ?? fallback);
  const totalPnl = pick(summary.pnl_total, pnl.length ? pnl.reduce((a, b) => a + b, 0) : null);
  const avgR = pick(summary.avg_r, rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null);
  const maxR = pick(summary.max_r, rs.length ? Math.max(...rs) : null);
  const minR = pick(summary.min_r, rs.length ? Math.min(...rs) : null);
  const hasResults = pnl.length > 0 || rs.length > 0;
  const pct = (n: number) => (total ? ((n / total) * 100).toFixed(1) : "0.0");

  const rows = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  const numberOf = (t: TradeRecord) => nmeta(t, ["number"]) ?? trades.length - trades.findIndex((x) => x.trade_id === t.trade_id);
  const selLogs = selected ? logs.filter((x) => x.trade_id === selected.trade_id || x.signal_id === selected.signal_id).slice(0, 8) : [];
  const hasFilters = Boolean(search || symbol || side || status || receiver || outcome || channel || period !== "all");

  const resultValue = status ? `status:${status}` : outcome ? `result:${outcome}` : "";
  const onResultChange = (v: string) => {
    const [kind, val = ""] = v.split(":");
    setStatus(kind === "status" ? val : "");
    setOutcome(kind === "result" ? val : "");
  };

  const exportCsv = () => {
    const blob = new Blob([tradesToCsv(visible)], { type: "text/csv;charset=utf-8" });
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

  const rangeLabel = range ? `${dateOnly(new Date(range.min).toISOString())} - ${dateOnly(new Date(range.max).toISOString())}` : "Todo o período";

  return (
    <Shell>
      <PageHeader
        title="Operações"
        description="Todas as operações executadas pelo Copytrix em tempo real"
        actions={
          <>
            {source === "demo" ? (
              <span
                role="status"
                title="API do Copytrix indisponível — exibindo dados de demonstração"
                className="mr-1 inline-flex h-7 items-center gap-1.5 rounded-full border border-warning/40 bg-warning-soft/60 px-2.5 text-[11px] font-medium text-warning"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-warning" />
                Modo demonstração
              </span>
            ) : (
              <span className="mr-1 hidden text-xs text-fg-subtle 2xl:inline" aria-live="polite">
                Atualizado às <span className="tabular">{last}</span>
              </span>
            )}
            <label className="relative">
              <span className="sr-only">Período</span>
              <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
                <Icon name="calendar" size={16} />
              </span>
              <select value={period} onChange={(e) => setPeriod(e.target.value)} className="control min-w-[220px] tabular" style={{ paddingLeft: 38, width: "auto" }}>
                <option value="all">{rangeLabel}</option>
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
              </select>
            </label>
            <select aria-label="Canal" value={channel} onChange={(e) => setChannel(e.target.value)} className="control min-w-[150px]" style={{ width: "auto" }}>
              <option value="">Todos os canais</option>
              {channels.map((x) => <option key={x}>{x}</option>)}
            </select>
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              aria-label="Atualizar operações"
              title="Atualizar"
              style={{ width: 40, padding: 0 }}
              className="control flex items-center justify-center text-fg-muted hover:text-fg disabled:opacity-50"
            >
              <span className={cx(loading && "animate-spin")}><Icon name="refresh" size={15} /></span>
            </button>
            <Button variant="primary" onClick={exportCsv} disabled={visible.length === 0} title="Exportar operações filtradas em CSV">
              <Icon name="download" size={15} />
              Exportar
            </Button>
          </>
        }
      />

      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-[0.85fr_1fr_1fr_1.05fr_1fr_0.95fr_0.95fr]">
        <MetricCard label="Total de Operações">{loading && !trades.length ? "—" : total}</MetricCard>
        <MetricCard label="Vencedoras" icon="trophy">
          {hasResults ? (<><span className="text-success">{winners}</span> <span>({pct(winners)}%)</span></>) : "—"}
        </MetricCard>
        <MetricCard label="Perdedoras" icon="x" tone="red">
          {hasResults ? `${losers} (${pct(losers)}%)` : "—"}
        </MetricCard>
        <MetricCard label="Lucro Total" icon="dollar">
          <span className={signColor(totalPnl)}>
            {totalPnl == null ? "—" : `${totalPnl < 0 ? "-" : ""}$ ${Math.abs(totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        </MetricCard>
        <MetricCard label="Média por Operação">
          <span className={signColor(avgR)}>{signed(avgR, "R")}</span>
        </MetricCard>
        <MetricCard label="Maior Ganho" icon="trendUp">
          <span className={maxR == null ? "" : "text-success"}>{maxR == null ? "—" : `+${fmt(maxR)}R`}</span>
        </MetricCard>
        <MetricCard label="Maior Perda" icon="trendDown" tone="red">
          <span className={minR == null ? "" : "text-danger"}>{minR == null ? "—" : `${fmt(minR)}R`}</span>
        </MetricCard>
      </section>

      <section aria-label="Filtros" className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(150px,1fr))_minmax(150px,1.6fr)]">
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
        <select aria-label="Resultado ou status" value={resultValue} onChange={(e) => onResultChange(e.target.value)} className="control">
          <option value="">Todos os resultados</option>
          <optgroup label="Resultado">
            <option value="result:win">Vencedoras</option>
            <option value="result:loss">Perdedoras</option>
          </optgroup>
          <optgroup label="Status">
            <option value="status:CLOSED">Fechada</option>
            <option value="status:OPEN">Aberta</option>
            <option value="status:PARTIAL">Parcial</option>
            <option value="status:PENDING">Pendente</option>
          </optgroup>
        </select>
        <select aria-label="Conta" value={receiver} onChange={(e) => setReceiver(e.target.value)} className="control">
          <option value="">Todas as contas</option>
          {receivers.map((x) => <option key={x}>{x}</option>)}
        </select>
      </section>

      <Card className="mt-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="trade-table w-full min-w-[1320px]">
            <caption className="sr-only">Lista de operações. Selecione uma linha para ver os detalhes.</caption>
            <thead>
              <tr>
                {columns.map((h) => (
                  <th key={h} scope="col" className="h-10 border-b border-line bg-surface-2 px-3 first:pl-5">{h}</th>
                ))}
                <th scope="col" className="h-10 border-b border-line bg-surface-2 px-3 pr-5 text-right"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {loading && trades.length === 0 ? (
                Array.from({ length: 6 }, (_, i) => (
                  <tr key={i} className="h-10 !cursor-default">
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
                      {error ? error : hasFilters ? "Ajuste os filtros para ampliar a busca." : "As operações aparecerão aqui quando forem registradas pelo executor."}
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
                  const ch = channelName(t);
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
                      className={cx(
                        "h-10 outline-none focus-visible:bg-surface-2 focus-visible:shadow-[inset_3px_0_0_var(--color-brand)]",
                        isSel && "!bg-brand-soft/40 shadow-[inset_3px_0_0_var(--color-brand)]",
                      )}
                    >
                      <td className="px-3 pl-5 tabular text-fg-muted">{numberOf(t)}</td>
                      <td className="px-3 tabular">{dt(openedAt(t))}</td>
                      <td className="px-3">
                        <span className="flex max-w-[200px] items-center gap-2.5">
                          <ChannelAvatar name={ch} />
                          <span className="truncate text-[11.5px] font-medium uppercase text-fg">{ch}</span>
                        </span>
                      </td>
                      <td className="px-3 text-fg">{t.symbol}</td>
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
                      <td className="whitespace-nowrap px-3 pr-4 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              showChart(t);
                            }}
                            aria-label={`Ver gráfico da operação ${numberOf(t)}`}
                            title="Ver gráfico"
                            className="inline-flex size-7 items-center justify-center rounded-md text-brand hover:bg-brand-soft/60"
                          >
                            <Icon name="analytics" size={15} stroke={2.2} />
                          </button>
                          <RowMenu trade={t} up={i >= rows.length - 3 && rows.length > 4} onDetails={() => router.push(`/trades/${numberOf(t)}`)} onChart={() => showChart(t)} />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Paginação" className="flex flex-col gap-2 border-t border-line px-5 py-2.5 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="tabular">
            Mostrando {visible.length ? (page - 1) * PAGE_SIZE + 1 : 0}-{Math.min(page * PAGE_SIZE, visible.length)} de {visible.length}
          </span>
          <div className="flex items-center gap-1.5">
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
                  className={cx(
                    "h-8 min-w-8 rounded-lg border px-2 tabular",
                    page === p ? "border-brand-strong bg-brand-strong font-semibold text-white" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                  )}
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

      <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-[300px_minmax(0,1fr)_380px]">
        <TradeDetails trade={selected} number={selected ? numberOf(selected) : null} />
        <div className="min-h-[360px] lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1">
          <TradeChart trade={selected} />
        </div>
        <div className="flex flex-col gap-3">
          <TradeManagement trade={selected} />
          <TradeLog logs={selLogs} />
        </div>
      </div>
    </Shell>
  );
}
