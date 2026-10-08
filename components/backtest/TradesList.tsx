"use client";
import { useMemo, useState } from "react";
import { Icon } from "../Icons";
import { backtestTrades } from "../../lib/backtest-demo";
import { Panel, SelectField } from "./BacktestFields";

const columns = ["#", "Data/Hora", "Símbolo", "Tipo", "Entrada", "Saída", "SL", "TP", "Resultado (R)", "Pips", "Status"];

function SideBadge({ side }: { side: "BUY" | "SELL" }) {
  return (
    <span
      className={`inline-flex h-[18px] min-w-[38px] items-center justify-center rounded px-1.5 text-[10px] font-semibold ${
        side === "BUY" ? "bg-[#0a3d36] text-success" : "bg-[#4a1a28] text-danger"
      }`}
    >
      {side}
    </span>
  );
}

function StatusBadge({ win }: { win: boolean }) {
  return win ? (
    <span className="inline-flex h-[18px] items-center gap-1 rounded-full bg-[#0a3d36] pl-1 pr-2 text-[10px] font-semibold text-success">
      <span aria-hidden className="flex size-3 items-center justify-center rounded-full bg-success text-[#06251f]">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
      </span>
      Win
    </span>
  ) : (
    <span className="inline-flex h-[18px] items-center gap-1 rounded-full bg-[#e5303f] pl-1 pr-2 text-[10px] font-semibold text-white">
      <span aria-hidden className="flex size-3 items-center justify-center rounded-full bg-white/90 text-[#e5303f]">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </span>
      Loss
    </span>
  );
}

export default function TradesList() {
  const [search, setSearch] = useState("");
  const [outcome, setOutcome] = useState("all");
  const [side, setSide] = useState("all");

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return backtestTrades.filter((t) => {
      if (outcome === "win" && !t.win) return false;
      if (outcome === "loss" && t.win) return false;
      if (side !== "all" && t.side !== side) return false;
      if (!term) return true;
      return [t.dateTime, t.symbol, t.side, t.entry, t.exit, t.sl, t.tp, t.result].join(" ").toLowerCase().includes(term);
    });
  }, [search, outcome, side]);

  return (
    <Panel title="Lista de Operações (167)" className="flex flex-col">
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <label className="relative order-last w-full min-w-[160px] flex-1 sm:order-none sm:w-auto">
          <span className="sr-only">Buscar operação</span>
          <span aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-muted"><Icon name="search" size={14} /></span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar operação..."
            className="h-8 w-full rounded-md border border-[#24435d] bg-[#091a2a] pl-8 pr-3 text-xs text-fg outline-none placeholder:text-fg-subtle focus-visible:border-brand"
          />
        </label>
        <SelectField aria-label="Filtrar por resultado" value={outcome} onChange={(e) => setOutcome(e.target.value)} className="h-8 w-[150px]" selectClassName="text-[11px]">
          <option value="all">Todos os resultados</option>
          <option value="win">Vencedoras</option>
          <option value="loss">Perdedoras</option>
        </SelectField>
        <SelectField aria-label="Filtrar por tipo" value={side} onChange={(e) => setSide(e.target.value)} className="h-8 w-[130px]" selectClassName="text-[11px]">
          <option value="all">Todos os tipos</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </SelectField>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-brand/50 bg-[#0b3a5c]/70 px-3 text-[11px] font-medium text-[#8fd3ff] transition-colors hover:bg-[#0b3a5c]"
        >
          <Icon name="download" size={13} />
          Exportar CSV
        </button>
      </div>

      <div className="-mx-3.5 mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[11px] tabular">
          <caption className="sr-only">Lista de operações do backtest</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col" className="whitespace-nowrap px-2 pb-2 pt-1 text-left text-[11px] font-normal text-fg-muted first:pl-3.5 last:pr-3.5">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="border-t border-[#17344b] py-10 text-center text-xs text-fg-subtle">Nenhuma operação encontrada</td>
              </tr>
            ) : (
              rows.map((t) => (
                <tr key={t.id} className="border-t border-[#17344b] text-[#e0e8f0] hover:bg-white/[.025]">
                  <td className="px-2 py-[5px] first:pl-3.5">{t.id}</td>
                  <td className="whitespace-nowrap px-2 py-[5px]">{t.dateTime}</td>
                  <td className="px-2 py-[5px]">{t.symbol}</td>
                  <td className="px-2 py-[5px]"><SideBadge side={t.side} /></td>
                  <td className="px-2 py-[5px]">{t.entry}</td>
                  <td className="px-2 py-[5px]">{t.exit}</td>
                  <td className="px-2 py-[5px]">{t.sl}</td>
                  <td className="px-2 py-[5px]">{t.tp}</td>
                  <td className={`px-2 py-[5px] font-medium ${t.win ? "text-success" : "text-danger"}`}>{t.result}</td>
                  <td className={`px-2 py-[5px] ${t.win ? "text-success" : "text-danger"}`}>{t.pips}</td>
                  <td className="px-2 py-[5px] last:pr-3.5"><StatusBadge win={t.win} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
