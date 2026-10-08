import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { summaryCards } from "../../lib/accounts-presentation";

function SummaryCard({
  label,
  value,
  note,
  noteClassName,
  icon,
  iconClassName,
}: {
  label: string;
  value: string;
  note: string;
  noteClassName?: string;
  icon: ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="flex min-h-[106px] items-center gap-3 rounded-lg border border-line bg-gradient-to-b from-surface-2/60 to-surface px-3.5 py-3.5 2xl:gap-4 2xl:px-4">
      <div className={cx("flex size-14 shrink-0 items-center justify-center rounded-lg 2xl:size-16", iconClassName)}>{icon}</div>
      <div className="min-w-0">
        <div className="truncate text-[13px] leading-4 text-fg-muted">{label}</div>
        <div className="tabular mt-1 truncate text-[24px] font-bold leading-8 tracking-tight text-fg 2xl:text-[28px]">{value}</div>
        <div className={cx("mt-1 truncate text-[13px]", noteClassName ?? "text-fg-subtle")}>{note}</div>
      </div>
    </div>
  );
}

function PieIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" fill="currentColor" />
      <path d="M14.5 2.6A9 9 0 0 1 21.4 9.5h-6.9V2.6Z" fill="currentColor" opacity=".75" />
    </svg>
  );
}

export default function AccountsSummary() {
  return (
    <section aria-label="Resumo das contas" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-4">
      <SummaryCard
        label="Total de Contas"
        value={summaryCards.total.value}
        note={summaryCards.total.note}
        icon={<Icon name="accounts" size={30} />}
        iconClassName="bg-brand-strong/20 text-brand"
      />
      <SummaryCard
        label="Contas Conectadas"
        value={summaryCards.connected.value}
        note={summaryCards.connected.note}
        icon={<span className="size-5 rounded-full bg-success shadow-[0_0_14px_rgba(18,217,158,.55)]" />}
        iconClassName="bg-success/12 text-success"
      />
      <SummaryCard
        label="Equity Total"
        value={summaryCards.equity.value}
        note={summaryCards.equity.note}
        noteClassName="font-medium text-success"
        icon={<Icon name="barsFilled" size={28} />}
        iconClassName="bg-[#211849] text-[#9b63ff]"
      />
      <SummaryCard
        label="Margem Utilizada"
        value={summaryCards.margin.value}
        note={summaryCards.margin.note}
        icon={<PieIcon />}
        iconClassName="bg-brand-strong/20 text-brand"
      />
    </section>
  );
}
