import { Icon } from "../Icons";
import { presentationTrades, type PresentationTrade } from "../../lib/backtest-presentation";
import { cx } from "../UI";
import { Panel, SelectBox } from "./Panel";

const columns = "grid-cols-[36fr_114fr_71fr_58fr_69fr_68fr_75fr_73fr_84fr_66fr_82fr]";
const headers = ["#", "Data/Hora", "Símbolo", "Tipo", "Entrada", "Saída", "SL", "TP", "Resultado (R)", "Pips", "Status"];

function SideBadge({ side }: { side: PresentationTrade["side"] }) {
  const buy = side === "BUY";
  return (
    <span
      className={cx(
        "inline-flex h-4 min-w-[34px] items-center justify-center rounded-[4px] border px-1.5 text-[10px] font-semibold leading-none",
        buy ? "border-success/40 bg-success/15 text-success" : "border-danger/40 bg-danger/15 text-danger",
      )}
    >
      {side}
    </span>
  );
}

function StatusBadge({ win }: { win: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex h-4 items-center gap-1 rounded-full pl-0.5 pr-2 text-[10px] font-semibold leading-none",
        win ? "bg-success/15 text-success" : "bg-[#e5283d] text-white",
      )}
    >
      <span aria-hidden className={cx("flex size-3 items-center justify-center rounded-full", win ? "bg-success text-[#052a22]" : "bg-white/90 text-[#e5283d]")}>
        <Icon name={win ? "check" : "x"} size={8} stroke={3.4} />
      </span>
      {win ? "Win" : "Loss"}
    </span>
  );
}

function TradeRow({ trade }: { trade: PresentationTrade }) {
  const tone = trade.win ? "text-success" : "text-danger";
  return (
    <div role="row" className={cx("tabular grid h-[20.6px] items-center text-[11px] text-fg", columns)}>
      <span role="cell" className="pl-1 text-fg-muted">
        {trade.id}
      </span>
      <span role="cell" className="whitespace-nowrap">
        {trade.dateTime}
      </span>
      <span role="cell">{trade.symbol}</span>
      <span role="cell">
        <SideBadge side={trade.side} />
      </span>
      <span role="cell">{trade.entry}</span>
      <span role="cell">{trade.exit}</span>
      <span role="cell">{trade.stopLoss}</span>
      <span role="cell">{trade.target}</span>
      <span role="cell" className={cx("font-semibold", tone)}>
        {trade.resultR}
      </span>
      <span role="cell" className={tone}>
        {trade.pips}
      </span>
      <span role="cell">
        <StatusBadge win={trade.win} />
      </span>
    </div>
  );
}

export default function TradesListCard() {
  return (
    <Panel
      title="Lista de Operações (167)"
      className="2xl:h-[287px]"
      action={
        <div className="flex flex-1 flex-wrap items-center gap-2 2xl:flex-nowrap 2xl:pl-3">
          <div className="relative h-[26px] w-[188px] shrink-0">
            <label htmlFor="bt-trade-search" className="sr-only">
              Buscar operação
            </label>
            <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-fg-subtle">
              <Icon name="search" size={13} />
            </span>
            <input
              id="bt-trade-search"
              type="search"
              placeholder="Buscar operação..."
              className="size-full rounded-md border border-line-strong/60 bg-[#071522] pl-8 pr-2 text-[11px] text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <SelectBox
            id="bt-trade-result"
            ariaLabel="Filtrar por resultado"
            options={["Todos os resultados", "Win", "Loss"]}
            className="h-[26px] w-[139px] shrink-0"
            selectClassName="pl-2.5 pr-6 text-[10.5px]"
          />
          <SelectBox
            id="bt-trade-type"
            ariaLabel="Filtrar por tipo"
            options={["Todos os tipos", "BUY", "SELL"]}
            className="h-[26px] w-[144px] shrink-0"
            selectClassName="pl-2.5 pr-6 text-[10.5px]"
          />
          <button
            type="button"
            className="ml-auto inline-flex h-[26px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-[#1c6f73] bg-[#0b3340] px-3 text-[10.5px] font-medium text-fg transition-colors hover:bg-[#0e4252]"
          >
            <span className="text-success">
              <Icon name="download" size={12} stroke={2.2} />
            </span>
            Exportar CSV
          </button>
        </div>
      }
    >

      <div role="table" aria-label="Lista de operações" className="mt-3.5 overflow-x-auto">
        <div className="min-w-[740px]">
          <div role="row" className={cx("grid h-6 items-center border-b border-[#143049] text-[11px] text-fg-muted", columns)}>
            {headers.map((h, i) => (
              <span key={h} role="columnheader" className={cx(i === 0 && "pl-1")}>
                {h}
              </span>
            ))}
          </div>
          <div className="mt-0.5">
            {presentationTrades.map((trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
