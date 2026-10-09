import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import type { RouteDetails } from "../../lib/system-route-details";

const columns = "grid grid-cols-[minmax(0,1fr)_88px_92px_24px] items-center gap-x-2";

function LinkGlyph() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  );
}

export default function SystemAccountsCard({ details, className }: { details: RouteDetails; className?: string }) {
  const linkedAccounts = details.linkedAccounts;
  return (
    <DetailPanel
      title="Sistemas e Contas Vinculadas"
      icon={<Icon name="accounts" size={19} />}
      className={className}
      action={
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12.5px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          <LinkGlyph />
          Vincular Conta
        </button>
      }
    >
      <div role="table" aria-label="Contas vinculadas" className="mx-3.5 mb-3 mt-1.5 text-[12.5px]">
        <div role="row" className={cx(columns, "pb-1.5 text-[12px] text-fg-muted")}>
          <span role="columnheader">Conta</span>
          <span role="columnheader">Status</span>
          <span role="columnheader" className="sr-only">Principal</span>
          <span role="columnheader" className="sr-only">Ações</span>
        </div>
        {linkedAccounts.map((a) => (
          <div key={a.name} role="row" className={cx(columns, "min-h-[27px] border-t border-[#17344b]/50")}>
            <span role="cell" className="truncate text-fg">{a.name}</span>
            <span role="cell" className={cx("inline-flex items-center gap-2", a.active ? "text-success" : "text-fg-muted")}>
              <span aria-hidden className={cx("size-2 rounded-full", a.active ? "bg-success" : "bg-fg-subtle")} />
              {a.active ? "Ativo" : "Inativo"}
            </span>
            <span role="cell">
              {a.main && (
                <span className="inline-flex h-[18px] items-center whitespace-nowrap rounded bg-brand-strong/25 px-1.5 text-[10px] font-medium text-brand">
                  Conta Principal
                </span>
              )}
            </span>
            <span role="cell">
              <button
                type="button"
                aria-haspopup="menu"
                aria-label={`Ações da conta ${a.name}`}
                className="flex size-6 items-center justify-center rounded text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
              >
                <Icon name="vmore" size={16} />
              </button>
            </span>
          </div>
        ))}
      </div>
    </DetailPanel>
  );
}
