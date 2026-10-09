import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { money } from "../../lib/multi-account-demo";
import { capital, riskUsed, type RiskConfig } from "../../lib/risk-management-demo";

const shell = "flex min-h-[104px] items-center gap-3.5 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4";

function UsageRing({ ratio, label, color }: { ratio: number; label: string; color: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const filled = Math.min(1, Math.max(0, ratio)) * circumference;
  return (
    <div className="relative size-14 shrink-0">
      <svg aria-hidden viewBox="0 0 56 56" className="size-14 -rotate-90">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#122d46" strokeWidth="5" />
        <circle cx="28" cy="28" r={radius} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${filled} ${circumference}`} />
      </svg>
      <span className="tabular absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-fg">{label}</span>
    </div>
  );
}

function LimitCard({
  label,
  limitPct,
  used,
  tone,
  ringColor,
}: {
  label: string;
  limitPct: number;
  used: number;
  tone: string;
  ringColor: string;
}) {
  const limitAmount = (capital * limitPct) / 100;
  const ratio = limitAmount > 0 ? used / limitAmount : 0;
  const danger = ratio >= 0.8;
  const color = danger ? "#ff5d6d" : ringColor;
  const usedPct = (used / capital) * 100;

  return (
    <div className={shell}>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs leading-4 text-fg-muted">{label}</div>
        <div className={cx("tabular mt-1 text-[26px] font-semibold leading-tight", tone)}>{limitPct.toFixed(1)}%</div>
        <div className="tabular mt-0.5 text-[14px] text-fg">{money(limitAmount)}</div>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-1">
        <UsageRing ratio={ratio} label={`${usedPct.toFixed(1)}%`} color={color} />
        <span className="tabular text-[12px] font-medium" style={{ color }}>
          {money(used)}
        </span>
      </div>
    </div>
  );
}

function IconTile({ accent, children }: { accent: string; children: ReactNode }) {
  return <div className={cx("flex size-12 shrink-0 items-center justify-center rounded-xl", accent)}>{children}</div>;
}

export default function RiskKpis({ config }: { config: RiskConfig }) {
  return (
    <section aria-label="Resumo de risco" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <div className={shell}>
        <IconTile accent="bg-brand/12 text-brand">
          <Icon name="shield" size={28} />
        </IconTile>
        <div className="min-w-0">
          <div className="text-xs leading-4 text-fg-muted">Capital Total</div>
          <div className="tabular mt-1 truncate text-[24px] font-semibold leading-tight text-brand">{money(capital)}</div>
        </div>
      </div>

      <div className={shell}>
        <IconTile accent="bg-success/12 text-success">
          <Icon name="dollar" size={24} />
        </IconTile>
        <div className="min-w-0">
          <div className="truncate text-xs leading-4 text-fg-muted">Risco por Operação</div>
          <div className="tabular mt-1 text-[26px] font-semibold leading-tight text-success">{config.perTrade.toFixed(1)}%</div>
          <div className="tabular mt-0.5 text-[14px] text-fg-muted">{money((capital * config.perTrade) / 100)}</div>
        </div>
      </div>

      <LimitCard label="Risco Diário (Limite)" limitPct={config.daily} used={riskUsed.daily} tone="text-warning" ringColor="#12d99e" />
      <LimitCard label="Risco Semanal (Limite)" limitPct={config.weekly} used={riskUsed.weekly} tone="text-warning" ringColor="#159af2" />
      <LimitCard label="Drawdown Máximo" limitPct={config.drawdown} used={riskUsed.drawdown} tone="text-danger" ringColor="#ff5d6d" />
    </section>
  );
}
