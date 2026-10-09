import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { accountSummary, money, signedMoney, signedPct } from "../../lib/multi-account-demo";

function KpiShell({ label, icon, accent, children }: { label: string; icon: ReactNode; accent: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[104px] items-center gap-3.5 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4">
      <div className={cx("flex size-12 shrink-0 items-center justify-center rounded-xl", accent)}>{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-xs leading-4 text-fg-muted">{label}</div>
        {children}
      </div>
    </div>
  );
}

function WinRateRing({ value }: { value: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg aria-hidden viewBox="0 0 52 52" className="size-12 -rotate-90">
      <circle cx="26" cy="26" r={radius} fill="none" stroke="#122d46" strokeWidth="6" />
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="#159af2"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
      />
    </svg>
  );
}

export default function MultiAccountKpis({
  total,
  active,
  riskLimit,
}: {
  total: number;
  active: number;
  riskLimit: number;
}) {
  const s = accountSummary;
  const riskFill = Math.min(100, (s.riskInUse / riskLimit) * 100);

  return (
    <section aria-label="Resumo das contas" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <KpiShell label="Total de Contas" accent="bg-brand/12 text-brand" icon={<Icon name="layers" size={24} />}>
        <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">{total}</div>
        <div className="mt-0.5 text-[12px] text-fg-subtle">
          {active} ativas | {total - active} inativas
        </div>
      </KpiShell>

      <KpiShell label="Equidade Total" accent="bg-success/12 text-success" icon={<Icon name="dollar" size={24} />}>
        <div className="tabular mt-1 truncate text-[24px] font-semibold leading-tight text-success">{money(s.equity)}</div>
        <div className="tabular mt-0.5 text-[13px] font-medium text-success">{signedPct(s.equityChangePct).replace(/(\.\d)0?%/, "$1%")} hoje</div>
      </KpiShell>

      <KpiShell label="Lucro/Prejuízo (Hoje)" accent="bg-success/12 text-success" icon={<Icon name="analytics" size={24} />}>
        <div className="tabular mt-1 truncate text-[24px] font-semibold leading-tight text-success">{signedMoney(s.pnlToday)}</div>
        <div className="tabular mt-0.5 text-[13px] font-medium text-success">{signedPct(s.pnlTodayPct)}</div>
      </KpiShell>

      <div className="flex min-h-[104px] items-center gap-3.5 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4">
        <div className="shrink-0">
          <WinRateRing value={s.winRate} />
        </div>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Win Rate Global</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">{s.winRate.toFixed(1)}%</div>
          <div className="tabular mt-0.5 text-[12px] text-fg-subtle">
            {s.wins} / {s.totalTrades} operações
          </div>
        </div>
      </div>

      <KpiShell label="Risco Total em Uso" accent="bg-brand/12 text-brand" icon={<Icon name="shield" size={24} />}>
        <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-fg">{s.riskInUse.toFixed(1)}%</div>
        <div className="tabular mt-0.5 text-[12px] text-fg-subtle">Limite: {riskLimit.toFixed(1)}%</div>
        <div
          role="progressbar"
          aria-label="Risco total em uso"
          aria-valuemin={0}
          aria-valuemax={riskLimit}
          aria-valuenow={s.riskInUse}
          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
        >
          <div className="h-full rounded-full bg-success transition-[width]" style={{ width: `${riskFill}%` }} />
        </div>
      </KpiShell>
    </section>
  );
}
