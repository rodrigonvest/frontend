import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { panelClass } from "../backtest/BacktestFields";
import { cx } from "../UI";
import { systemKpis } from "../../lib/system-details-demo";

function IconBox({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span aria-hidden className={cx("flex size-9 shrink-0 items-center justify-center rounded-xl min-[1700px]:size-[46px]", tone)}>
      {children}
    </span>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 19;
  const c = 2 * Math.PI * r;
  return (
    <span aria-hidden className="relative flex size-9 shrink-0 items-center justify-center min-[1700px]:size-[50px]">
      <svg viewBox="0 0 50 50" className="size-full -rotate-90">
        <circle cx="25" cy="25" r={r} fill="none" stroke="#12384a" strokeWidth="5" />
        <circle
          cx="25"
          cy="25"
          r={r}
          fill="none"
          stroke="#12d99e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${(c * value) / 100} ${c}`}
        />
      </svg>
    </span>
  );
}

function KpiIcon({ id, progress }: { id: string; progress?: number }) {
  switch (id) {
    case "trades":
      return (
        <IconBox tone="bg-[#0b3256] text-[#2f95ff]">
          <Icon name="barsFilled" size={24} />
        </IconBox>
      );
    case "winRate":
      return <ProgressRing value={progress ?? 0} />;
    case "profit":
      return (
        <IconBox tone="bg-success/15 text-success">
          <Icon name="dollar" size={26} stroke={2.2} />
        </IconBox>
      );
    case "resultR":
      return (
        <IconBox tone="bg-[#2a1850]">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#8b4df0] text-[16px] font-bold text-white">R</span>
        </IconBox>
      );
    default:
      return (
        <IconBox tone="bg-danger/15 text-danger">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v15" />
            <path d="m6 13 6 6 6-6" />
          </svg>
        </IconBox>
      );
  }
}

export default function SystemKpiCards() {
  return (
    <section aria-label="Indicadores da rota / automação" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {systemKpis.map((k) => (
        <article key={k.id} className={cx(panelClass, "flex min-w-0 items-center gap-2 px-2.5 py-3.5 min-[1700px]:gap-3 min-[1700px]:px-3")}>
          <KpiIcon id={k.id} progress={"progress" in k ? k.progress : undefined} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[11px] leading-[14px] text-fg-muted min-[1700px]:text-[11.5px]">{k.label}</p>
            <p className={cx("mt-1 whitespace-nowrap text-[16px] font-semibold tabular min-[1700px]:text-[22px]", k.tone === "danger" ? "text-danger" : "text-fg")}>{k.value}</p>
            <p className={cx("mt-1 text-[11.5px] font-medium tabular", k.tone === "danger" ? "text-danger" : "text-success")}>
              <span aria-hidden>{k.tone === "danger" ? "↓" : "↑"}</span> {k.delta}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
