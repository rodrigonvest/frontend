"use client";
import { useId, useRef, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { AI_TABS, type AiTabId } from "../../lib/copytrix-ai-data";

interface Props {
  tab: AiTabId;
  onTab: (tab: AiTabId) => void;
  children: ReactNode;
}

export default function AiTabs({ tab, onTab, children }: Props) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const move = (event: React.KeyboardEvent, index: number) => {
    const last = AI_TABS.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = AI_TABS[target];
    onTab(next.id);
    listRef.current?.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)?.focus();
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Módulos do Copytrix AI"
        className="flex gap-2 overflow-x-auto pb-1 xl:grid xl:grid-cols-7 xl:overflow-visible xl:pb-0"
      >
        {AI_TABS.map((item, index) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              data-tab={item.id}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onTab(item.id)}
              onKeyDown={(event) => move(event, index)}
              className={cx(
                "flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active
                  ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_22px_-8px_rgba(21,154,242,.9)]"
                  : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <Icon name={item.icon} size={16} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel-${tab}`} aria-labelledby={`${baseId}-tab-${tab}`} className="min-w-0">
        {children}
      </div>
    </div>
  );
}
