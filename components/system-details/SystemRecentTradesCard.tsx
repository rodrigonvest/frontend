import Link from "next/link";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import type { RouteDetails } from "../../lib/system-route-details";

const columns = "grid grid-cols-[84px_minmax(0,1fr)_64px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-x-2";

function Arrow({ up }: { up: boolean }) {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {up ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M7 7l10 10M17 8v9H8" />}
    </svg>
  );
}

export default function SystemRecentTradesCard({ details, className }: { details: RouteDetails; className?: string }) {
  return (
    <DetailPanel
      title="Operações Recentes"
      icon={<Icon name="trades" size={19} />}
      className={className}
      action={
        <Link
          href="/trades"
          className="inline-flex h-8 items-center rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          Ver Todas
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <div role="table" aria-label="Operações recentes da rota" className="mx-3.5 mb-3 mt-1.5 min-w-[520px] text-[12.5px] tabular">
          <div role="row" className={cx(columns, "pb-1.5 text-[12px] text-fg-muted")}>
            <span role="columnheader">Horário</span>
            <span role="columnheader">Símbolo</span>
            <span role="columnheader">Direção</span>
            <span role="columnheader">Entrada</span>
            <span role="columnheader">Saída</span>
            <span role="columnheader">Resultado</span>
          </div>
          {details.trades.map((t) => (
            <div key={`${t.time}-${t.symbol}`} role="row" className={cx(columns, "min-h-[30px] border-t border-[#17344b]/50")}>
              <span role="cell" className="text-fg-muted">{t.time}</span>
              <span role="cell" className="truncate text-fg">{t.symbol}</span>
              <span role="cell" className={cx("inline-flex items-center gap-1", t.side === "Buy" ? "text-success" : "text-danger")}>
                <Arrow up={t.side === "Buy"} />
                {t.side}
              </span>
              <span role="cell" className="text-fg">{t.entry}</span>
              <span role="cell" className="text-fg">{t.exit}</span>
              <span role="cell" className={cx("flex flex-col leading-tight", t.tone === "success" ? "text-success" : "text-danger")}>
                <span className="font-medium">{t.pips}</span>
                <span className="text-[11px] opacity-80">{t.r}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </DetailPanel>
  );
}
