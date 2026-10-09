"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { STRATEGY_ROWS } from "../../lib/copytrix-ai-data";
import { Panel } from "./AiPrimitives";

export default function StrategyOptimizationPanel({ onApply }: { onApply: () => void }) {
  const [applied, setApplied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const apply = () => {
    onApply();
    setApplied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setApplied(false), 4000);
  };

  return (
    <Panel title="Otimização de Estratégia" icon="settings">
      <div className="grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-lg border border-line-strong/70 bg-canvas/40">
          <h3 className="border-b border-line bg-surface-2 px-3 py-2 text-[12.5px] font-semibold text-fg">Configuração Atual</h3>
          <dl className="space-y-1.5 px-3 py-2.5 text-[12.5px]">
            {STRATEGY_ROWS.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <dt className="text-fg-muted">{row.label}</dt>
                <dd className="tabular text-fg">{row.current}</dd>
              </div>
            ))}
          </dl>
        </div>

        <span aria-hidden className="hidden items-center self-center text-success sm:flex">
          <Icon name="arrowRight" size={20} stroke={2.4} />
        </span>
        <span aria-hidden className="flex justify-center text-success sm:hidden">
          <span className="rotate-90">
            <Icon name="arrowRight" size={20} stroke={2.4} />
          </span>
        </span>

        <div className="overflow-hidden rounded-lg border border-success/60 bg-success/[.04]">
          <h3 className="border-b border-success/30 bg-success/10 px-3 py-2 text-[12.5px] font-semibold text-success">Sugestão da IA</h3>
          <dl className="space-y-1.5 px-3 py-2.5 text-[12.5px]">
            {STRATEGY_ROWS.map((row) => {
              const changed = row.current !== row.suggested;
              return (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <dt className="text-fg-muted">{row.label}</dt>
                  <dd className={cx("tabular", changed ? "font-semibold text-success" : "text-fg")}>{row.suggested}</dd>
                </div>
              );
            })}
          </dl>
          <button
            type="button"
            onClick={apply}
            className="flex h-10 w-full items-center justify-center gap-2 bg-brand-strong px-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          >
            {applied && <Icon name="check" size={15} stroke={2.6} />}
            {applied ? "Configurações aplicadas" : "Aplicar Configurações"}
          </button>
        </div>
      </div>
    </Panel>
  );
}
