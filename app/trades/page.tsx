"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import TradeChart from "../../components/trades/TradeChart";
import { Badge, Button, Card, EmptyState, PreviewBadge, SectionTitle, Stat, cx } from "../../components/UI";
import { Icon } from "../../components/Icons";
import { getLogs, getTrades, TradeRecord, TradeSummary } from "../../lib/api";

type LogEntry = { trade_id?: string; signal_id?: string; timestamp?: string; message?: string; operation?: string };

const PAGE_SIZE = 10;
const emptySummary: TradeSummary = { total: 0, open: 0, partial: 0, closed: 0, pending: 0, buy: 0, sell: 0 };
const fmt = (v: number | null | undefined, d = 2) => (v == null || Number.isNaN(v) ? "—" : v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }));
const signed = (v: number | null, suffix = "", d = 2) => (v == null ? "—" : `${v >= 0 ? "+" : ""}${fmt(v, d)}${suffix}`);
const money = (v: number | null) => (v == null ? "—" : `${v >= 0 ? "+" : "-"}$${fmt(Math.abs(v))}`);
const dt = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};
const meta = (t: TradeRecord) => {
  try {
    const v = JSON.parse(t.metadata_json || "{}");
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
};
const nmeta = (t: TradeRecord, keys: string[]) => {
  const m = meta(t);
  for (const k of keys) {
    const n = Number(m[k]);
    if (Number.isFinite(n)) return n;
  }
  return null;
};
const text = (...values: unknown[]) => {
  for (const v of values) if (v != null && String(v).trim() !== "") return String(v);
  return "—";
};
const tone = (s: string): "green" | "blue" | "amber" | "red" | "neutral" => {
  const x = s.toUpperCase();
  if (x === "CLOSED") return "green";
  if (x === "OPEN" || x === "PARTIAL") return "blue";
  if (x === "PENDING") return "amber";
  if (x === "ERROR" || x === "CANCELLED") return "red";
  return "neutral";
};
const statusLabel: Record<string, string> = { CLOSED: "Fechada", OPEN: "Aberta", PARTIAL: "Parcial", PENDING: "Pendente", ERROR: "Erro", CANCELLED: "Cancelada" };
const label = (s: string) => statusLabel[s?.toUpperCase()] ?? s;
const signColor = (v: number | null) => (v == null ? "text-fg-subtle" : v < 0 ? "text-danger" : "text-success");

const columns = ["#", "Data/Hora", "Canal", "Símbolo", "Tipo", "Entrada", "Saída", "SL", "TP", "Resultado", "R", "Pips", "Lote", "Conta", "Status"];

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

  const pnl = trades.map((t) => nmeta(t, ["pnl", "pnl_ccy", "profit"])).filter((x): x is number => x !== null);
  const rs = trades.map((t) => nmeta(t, ["result_r", "r", "rr"])).filter((x): x is number => x !== null);
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
  const pageButtons = Array.from({ length: Math.min(5, pages) }, (_, i) => i + 1);

  const selMeta = selected ? meta(selected) : {};
  const selPnl = selected ? nmeta(selected, ["pnl", "pnl_ccy", "profit"]) : null;
  const selR = selected ? nmeta(selected, ["result_r", "r", "rr"]) : null;
  const selPips = selected ? nmeta(selected, ["pips"]) : null;
  const selExit = selected ? nmeta(selected, ["exit_price", "close_price"]) : null;
  const selNumber = selected ? trades.length - trades.findIndex((t) => t.trade_id === selected.trade_id) : null;
  const selLogs = selected ? logs.filter((x) => x.trade_id === selected.trade_id || x.signal_id === selected.signal_id).slice(0, 8) : [];

  const hasFilters = Boolean(search || symbol || side || status || receiver);

  return (
    <Shell>
      <PageHeader
        eyebrow="Execução"
        title="Operações"
        description="Operações registradas pelo executor do Copytrix, com filtros, detalhes e eventos."
        actions={
          <>
            <span className="text-xs text-fg-subtle" aria-live="polite">
              Atualizado às <span className="tabular">{last}</span>
            </span>
            <Button disabled title="Filtro por período em breve">
              <Icon name="calendar" size={15} />
              Período
            </Button>
            <Button onClick={() => void load()} disabled={loading}>
              <Icon name="refresh" size={15} />
              {loading ? "Atualizando…" : "Atualizar"}
            </Button>
            <Button variant="primary" disabled title="Exportação em breve">
              <Icon name="download" size={15} />
              Exportar
            </Button>
          </>
        }
      />

      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        <Stat label="Total de operações" value={String(summary.total)} note={`${summary.buy} BUY · ${summary.sell} SELL`} icon={<Icon name="trades" size={18} />} />
        <Stat label="Vencedoras" value={hasResults ? `${winners} (${pct(winners)}%)` : "—"} icon={<Icon name="trophy" size={18} />} accent="green" positive={hasResults ? true : undefined} />
        <Stat label="Perdedoras" value={hasResults ? `${losers} (${pct(losers)}%)` : "—"} icon={<Icon name="x" size={18} />} accent="red" positive={hasResults ? false : undefined} />
        <Stat label="Lucro total" value={money(totalPnl)} icon={<Icon name="dollar" size={18} />} accent="green" positive={totalPnl == null ? undefined : totalPnl >= 0} />
        <Stat label="Média por operação" value={signed(avgR, "R")} icon={<Icon name="analytics" size={18} />} positive={avgR == null ? undefined : avgR >= 0} />
        <Stat label="Maior ganho" value={maxR == null ? "—" : `+${fmt(maxR)}R`} icon={<Icon name="chart" size={18} />} accent="green" positive={maxR == null ? undefined : true} />
        <Stat label="Maior perda" value={minR == null ? "—" : `${fmt(minR)}R`} icon={<Icon name="chart" size={18} />} accent="red" positive={minR == null ? undefined : false} />
      </section>

      <section aria-label="Filtros" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_repeat(4,minmax(150px,180px))]">
        <label className="control flex items-center gap-2 sm:col-span-2 lg:col-span-1">
          <span className="text-fg-subtle"><Icon name="search" size={16} /></span>
          <span className="sr-only">Buscar operação</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar operação..." className="h-full w-full bg-transparent outline-none" />
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
        <div className="max-h-[440px] overflow-auto">
          <table className="trade-table w-full min-w-[1240px]">
            <caption className="sr-only">Lista de operações. Selecione uma linha para ver os detalhes.</caption>
            <thead className="sticky top-0 z-10">
              <tr>
                {columns.map((h) => (
                  <th key={h} scope="col" className="h-10 border-b border-line bg-surface-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && trades.length === 0 ? (
                <tr><td colSpan={columns.length} className="h-[320px] text-center text-sm text-fg-subtle">Carregando operações…</td></tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-[320px] cursor-default text-center">
                    <p className="text-sm font-medium text-fg-muted">Nenhuma operação encontrada</p>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {hasFilters ? "Ajuste os filtros para ampliar a busca." : "As operações aparecerão aqui quando forem registradas pelo executor."}
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map((t, i) => {
                  const m = meta(t);
                  const p = nmeta(t, ["pnl", "pnl_ccy", "profit"]);
                  const r = nmeta(t, ["result_r", "r", "rr"]);
                  const pp = nmeta(t, ["pips"]);
                  const isSel = selected?.trade_id === t.trade_id;
                  return (
                    <tr
                      key={t.trade_id}
                      onClick={() => setSelected(t)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(t);
                        }
                      }}
                      tabIndex={0}
                      aria-selected={isSel}
                      className={cx("h-11 outline-none focus-visible:bg-surface-2 focus-visible:shadow-[inset_3px_0_0_var(--color-brand)]", isSel && "!bg-brand-soft/50 shadow-[inset_3px_0_0_var(--color-brand)]")}
                    >
                      <td className="px-3 tabular text-fg-subtle">{trades.length - (page - 1) * PAGE_SIZE - i}</td>
                      <td className="px-3 tabular">{dt(t.opened_at || t.created_at)}</td>
                      <td className="max-w-[200px] truncate px-3">{text(m.channel, m.source, t.receiver_id)}</td>
                      <td className="px-3 font-medium text-fg">{t.symbol}</td>
                      <td className="px-3"><Badge tone={t.side === "BUY" ? "green" : "red"}>{t.side}</Badge></td>
                      <td className="px-3 tabular">{fmt(t.entry_price)}</td>
                      <td className="px-3 tabular">{fmt(nmeta(t, ["exit_price", "close_price"]))}</td>
                      <td className="px-3 tabular">{fmt(t.stop_loss)}</td>
                      <td className="px-3 tabular">{text(m.tp_label, t.take_profit != null ? fmt(t.take_profit) : null)}</td>
                      <td className={cx("px-3 tabular font-medium", signColor(p))}>{money(p)}</td>
                      <td className={cx("px-3 tabular", signColor(r))}>{signed(r, "R")}</td>
                      <td className={cx("px-3 tabular", signColor(pp))}>{signed(pp, "", 1)}</td>
                      <td className="px-3 tabular">{fmt(t.volume)}</td>
                      <td className="max-w-[140px] truncate px-3">{text(m.account, t.receiver_id)}</td>
                      <td className="px-3"><Badge tone={tone(t.status)}>{label(t.status)}</Badge></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Paginação" className="flex flex-col gap-2 border-t border-line px-4 py-2.5 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <span className="tabular">
            Mostrando {trades.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, trades.length)} de {trades.length}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Página anterior" className="flex size-8 items-center justify-center rounded-md hover:bg-white/[.05] disabled:opacity-40">‹</button>
            {pageButtons.map((p) => (
              <button key={p} onClick={() => setPage(p)} aria-current={page === p ? "page" : undefined} className={cx("h-8 min-w-8 rounded-md px-2 tabular", page === p ? "bg-brand-strong text-white" : "hover:bg-white/[.05]")}>{p}</button>
            ))}
            {pages > 5 && (
              <>
                <span aria-hidden className="px-1">…</span>
                <button onClick={() => setPage(pages)} aria-current={page === pages ? "page" : undefined} className={cx("h-8 min-w-8 rounded-md px-2 tabular", page === pages ? "bg-brand-strong text-white" : "hover:bg-white/[.05]")}>{pages}</button>
              </>
            )}
            <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} aria-label="Próxima página" className="flex size-8 items-center justify-center rounded-md hover:bg-white/[.05] disabled:opacity-40">›</button>
          </div>
        </nav>
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-[300px_minmax(0,1fr)_340px]">
        <Card className="p-5">
          <SectionTitle
            title={`Operação ${selNumber ? `#${selNumber}` : "—"}`}
            action={selected && selPnl != null ? <Badge tone={selPnl >= 0 ? "green" : "red"}>{selPnl >= 0 ? "WIN" : "LOSS"}</Badge> : undefined}
          />
          {selected ? (
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-[13px]">
              {[
                ["Data/Hora", dt(selected.opened_at || selected.created_at)],
                ["Canal", text(selMeta.channel, selected.receiver_id)],
                ["Símbolo", selected.symbol],
              ].map(([k, v]) => (
                <div key={k} className="contents"><dt className="text-fg-subtle">{k}</dt><dd className="truncate text-right tabular text-fg">{v}</dd></div>
              ))}
              <dt className="text-fg-subtle">Tipo</dt>
              <dd className="text-right"><Badge tone={selected.side === "BUY" ? "green" : "red"}>{selected.side}</Badge></dd>
              {[
                ["Entrada", fmt(selected.entry_price)],
                ["Saída", fmt(selExit)],
                ["Stop Loss", fmt(selected.stop_loss)],
                ["Take Profit", fmt(selected.take_profit)],
              ].map(([k, v]) => (
                <div key={k} className="contents"><dt className="text-fg-subtle">{k}</dt><dd className="text-right tabular text-fg">{v}</dd></div>
              ))}
              <dt className="text-fg-subtle">Resultado</dt><dd className={cx("text-right tabular font-medium", signColor(selPnl))}>{money(selPnl)}</dd>
              <dt className="text-fg-subtle">R</dt><dd className={cx("text-right tabular", signColor(selR))}>{signed(selR, "R")}</dd>
              <dt className="text-fg-subtle">Pips</dt><dd className={cx("text-right tabular", signColor(selPips))}>{signed(selPips, "", 1)}</dd>
              <dt className="text-fg-subtle">Lote</dt><dd className="text-right tabular text-fg">{fmt(selected.volume)}</dd>
              <dt className="text-fg-subtle">Conta</dt><dd className="truncate text-right text-fg">{text(selMeta.account, selected.receiver_id)}</dd>
              <dt className="text-fg-subtle">Status</dt><dd className="text-right"><Badge tone={tone(selected.status)}>{label(selected.status)}</Badge></dd>
            </dl>
          ) : (
            <EmptyState className="mt-4 h-[300px]" title="Nenhuma operação selecionada" description="Selecione uma linha da tabela para ver os detalhes." />
          )}
        </Card>

        <Card className="overflow-hidden lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold">Gráfico da operação</h2>
              <p className="mt-0.5 text-xs text-fg-subtle">{selected ? `${selected.symbol} · níveis de SL, entrada e TP` : "Aguardando seleção"}</p>
            </div>
            <div className="flex items-center gap-2">
              <PreviewBadge label="Ilustrativo" />
              <Button disabled title="Disponível em breve" className="hidden h-8 text-xs sm:inline-flex">Abrir no MT5</Button>
            </div>
          </div>
          {selected ? <TradeChart trade={selected} /> : <div className="flex h-[260px] items-center justify-center text-sm text-fg-subtle">Selecione uma operação</div>}
        </Card>

        <div className="flex flex-col gap-3">
          <Card className="p-5">
            <SectionTitle title="Gerenciamento da operação" action={<PreviewBadge label="Sem dados" />} />
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {["Mover SL para break even", "Trailing stop", "Fechamento parcial", "Fechamento final"].map((x) => (
                <li key={x} className="flex items-center justify-between gap-3">
                  <span className="text-fg-muted">{x}</span>
                  <span className="text-xs text-fg-subtle">Não informado</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="flex-1 p-5">
            <SectionTitle title="Log da operação" />
            {selLogs.length ? (
              <ol className="mt-4 space-y-3 border-l border-line pl-4">
                {selLogs.map((l, i) => (
                  <li key={i} className="relative text-xs">
                    <span aria-hidden className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-success bg-surface" />
                    <div className="tabular text-fg-subtle">{dt(l.timestamp)}</div>
                    <div className="mt-0.5 text-fg">{l.message || l.operation || "Evento Copytrix"}</div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-xs text-fg-subtle">Nenhum evento registrado para esta operação.</p>
            )}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
