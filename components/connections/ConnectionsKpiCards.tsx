import type { ReactNode } from "react";
import { Icon } from "../Icons";
import SettingsIcon from "../settings/SettingsIcons";
import { cx } from "../UI";
import { panelClass } from "../backtest/BacktestFields";
import { connectionKpis } from "../../lib/connections-demo";

type Tone = "blue" | "green" | "red";

const toneClasses: Record<Tone, string> = {
  blue: "bg-[#0d3a63] text-[#3aa6f5]",
  green: "bg-[#0a3f3a] text-[#1bd0a6]",
  red: "bg-[#431a26] text-danger",
};

function KpiGlyph({ id }: { id: string }) {
  if (id === "total") return <SettingsIcon name="user" size={26} stroke={2} />;
  if (id === "success") {
    return (
      <span className="flex size-[30px] items-center justify-center rounded-full bg-success text-[#052b25]">
        <Icon name="check" size={18} stroke={3} />
      </span>
    );
  }
  if (id === "failed") {
    return (
      <span className="flex size-[30px] items-center justify-center rounded-full bg-danger text-white">
        <Icon name="x" size={16} stroke={3} />
      </span>
    );
  }
  return <SettingsIcon name="monitor" size={28} stroke={1.9} />;
}

function Dot({ className }: { className: string }) {
  return <span aria-hidden className={cx("inline-block size-2 rounded-full", className)} />;
}

const notes: Record<string, ReactNode> = {
  total: (
    <span className="flex items-center gap-1 text-success">
      <Icon name="trendUp" size={13} stroke={2.4} />
      <span>+12% vs. período anterior</span>
    </span>
  ),
  success: (
    <span className="text-fg-muted">
      <strong className="font-semibold text-[#f0a23c]">87.5%</strong> do total
    </span>
  ),
  failed: (
    <span className="flex items-center gap-1.5 text-fg-muted">
      <Dot className="bg-danger" />
      <span>
        <strong className="font-semibold text-danger">12.5%</strong> do total
      </span>
    </span>
  ),
  devices: (
    <span className="flex items-center gap-1.5 text-fg-muted">
      <Dot className="bg-brand" />
      <span>2 ativos no momento</span>
    </span>
  ),
};

export default function ConnectionsKpiCards() {
  return (
    <ul aria-label="Resumo das conexões" className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {connectionKpis.map((kpi) => (
        <li key={kpi.id} className={cx(panelClass, "flex items-center gap-4 p-4")}>
          <span aria-hidden className={cx("flex size-[62px] shrink-0 items-center justify-center rounded-lg", toneClasses[kpi.tone])}>
            <KpiGlyph id={kpi.id} />
          </span>
          <div className="min-w-0">
            <p className="tabular text-[26px] font-semibold leading-none tracking-tight text-fg">{kpi.value}</p>
            <p className="mt-1.5 truncate text-[13.5px] text-fg-muted">{kpi.label}</p>
            <div className="mt-1.5 text-[12px] leading-4">{notes[kpi.id]}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
