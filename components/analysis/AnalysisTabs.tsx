"use client";
import { useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { analysisTabs } from "../../lib/analysis-demo";

export default function AnalysisTabs() {
  const [active, setActive] = useState(0);

  return (
    <div role="tablist" aria-label="Seções da análise de desempenho" className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
      {analysisTabs.map((tab, index) => {
        const selected = index === active;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => setActive(index)}
            className={cx(
              "flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-[12.5px] transition-colors",
              selected
                ? "border-brand-strong bg-brand-strong font-medium text-white"
                : "border-[#17344b] bg-[#0a1b2b] text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            <Icon name={tab.icon} size={14} stroke={2} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
