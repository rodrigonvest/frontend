"use client";
import { useId, useRef, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { API_TABS, type ApiTabId } from "../../lib/api-access-data";

interface Props {
  tab: ApiTabId;
  onTab: (tab: ApiTabId) => void;
  children: ReactNode;
}

export default function ApiTabs({ tab, onTab, children }: Props) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const move = (event: React.KeyboardEvent, index: number) => {
    const last = API_TABS.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = API_TABS[target];
    onTab(next.id);
    listRef.current?.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)?.focus();
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Seções do Acesso à API"
        className="flex gap-2 overflow-x-auto pb-1 xl:overflow-visible xl:pb-0"
      >
        {API_TABS.map((item, index) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              data-tab={item.id}
              aria-selected={active}
              aria-controls={active ? `${baseId}-panel` : undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => onTab(item.id)}
              onKeyDown={(event) => move(event, index)}
              className={cx(
                "flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13.5px] xl:flex-1 xl:basis-auto font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active
                  ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_22px_-8px_rgba(21,154,242,.9)]"
                  : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full border border-success/60 px-2 py-px text-[11px] font-semibold text-success">{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${tab}`} className="min-w-0">
        {children}
      </div>
    </div>
  );
}
