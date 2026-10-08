"use client";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "../../UI";

export type ConfigTabItem = { id: string; label: string; icon: ReactNode };

export function tabId(id: string) {
  return `system-config-tab-${id}`;
}
export function panelId(id: string) {
  return `system-config-panel-${id}`;
}

export default function ConfigTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly ConfigTabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    onChange(tabs[next].id);
    document.getElementById(tabId(tabs[next].id))?.focus();
  };

  return (
    <div role="tablist" aria-label="Seções da configuração" onKeyDown={onKeyDown} className="flex gap-1 overflow-x-auto pb-0.5">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            id={tabId(tab.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(tab.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cx(
              "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              selected ? "bg-brand-strong text-white" : "text-fg-muted hover:bg-white/[.04] hover:text-fg",
            )}
          >
            <span aria-hidden className="flex shrink-0 items-center">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
