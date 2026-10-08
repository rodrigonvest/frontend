import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { Badge, Button, cx } from "../UI";
import { formatUsd, type AccountTagTone, type PresentationAccount } from "../../lib/accounts-presentation";
import AccountLogo from "./AccountLogo";

export const accountRowColumns =
  "2xl:grid-cols-[minmax(300px,2fr)_minmax(120px,1.1fr)_minmax(76px,.7fr)_minmax(96px,.9fr)_minmax(96px,.9fr)_minmax(80px,.7fr)_minmax(104px,.8fr)_auto_auto]";

const tagStyles: Record<AccountTagTone, string> = {
  primary: "border-brand/45 bg-brand-strong/15 text-[#5cc2ff]",
  firm: "border-brand/45 bg-brand-strong/15 text-[#5cc2ff]",
  personal: "border-success/35 bg-success/10 text-success",
  draft: "border-line-strong/70 bg-surface-3 text-fg-muted",
  secondary: "border-line-strong/70 bg-surface-3 text-fg-muted",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-fg-subtle">{label}</dt>
      <dd className="tabular mt-1 truncate text-[13px] font-medium text-fg">{children}</dd>
    </div>
  );
}

function StatusIndicator({ account }: { account: PresentationAccount }) {
  const connected = account.status === "connected";
  return (
    <div className="flex items-start gap-2">
      <span
        aria-hidden
        className={cx("mt-1.5 size-2 shrink-0 rounded-full", connected ? "bg-success shadow-[0_0_8px_rgba(18,217,158,.6)]" : "bg-danger shadow-[0_0_8px_rgba(255,93,109,.5)]")}
      />
      <div>
        <div className={cx("text-[13px] font-medium", connected ? "text-success" : "text-danger")}>
          {connected ? "Conectada" : "Desconectada"}
        </div>
        <div className="tabular mt-0.5 text-xs text-fg-subtle">{account.latencyMs !== null ? `${account.latencyMs} ms` : "-"}</div>
      </div>
    </div>
  );
}

export default function AccountRow({ account }: { account: PresentationAccount }) {
  return (
    <article
      className={cx(
        "rounded-lg border border-line bg-gradient-to-b from-surface-2/50 to-surface p-4",
        "2xl:grid 2xl:items-center 2xl:gap-4 2xl:px-3.5 2xl:py-2.5",
        accountRowColumns,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <AccountLogo logo={account.logo} />
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 truncate text-[15px] font-semibold text-fg">
            <span className="truncate">{account.name}</span>
            {account.starred && (
              <svg width="15" height="15" viewBox="0 0 24 24" aria-label="Conta favorita" role="img" className="shrink-0 text-warning">
                <path fill="currentColor" d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93L12 2.8Z" />
              </svg>
            )}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge tone="blue" className="gap-1.5 border-brand/50 bg-brand-strong/25 font-semibold text-[#8fd6ff]">
              <span aria-hidden className="size-2.5 rounded-full border-2 border-[#8fd6ff]" />
              {account.platformLabel}
            </Badge>
            <Badge className={tagStyles[account.tag.tone]}>{account.tag.label}</Badge>
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-5 2xl:contents">
        <Field label="Servidor">{account.server}</Field>
        <Field label="Login">{account.login}</Field>
        <Field label="Balance">{formatUsd(account.balance)}</Field>
        <Field label="Equity">{formatUsd(account.equity)}</Field>
        <Field label="Alavancagem">{account.leverage}</Field>
      </dl>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 2xl:contents">
        <StatusIndicator account={account} />
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-11 rounded-md px-5 text-[13px] font-medium">Configurar</Button>
          <Button variant="secondary" className="h-11 w-11 rounded-md px-0" aria-label={`Mais ações para ${account.name}`}>
            <Icon name="vmore" size={18} />
          </Button>
        </div>
      </div>
    </article>
  );
}
