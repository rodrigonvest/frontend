"use client";
import { useRef, type KeyboardEvent } from "react";
import { cx } from "../UI";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { AccountIcon } from "./AccountIcons";

export type AccountTabId = "overview" | "personal" | "security" | "preferences" | "notifications" | "sessions";

export const ACCOUNT_TABS: { id: AccountTabId; label: string; icon: string }[] = [
  { id: "overview", label: "Visão Geral", icon: "user" },
  { id: "personal", label: "Informações Pessoais", icon: "idCard" },
  { id: "security", label: "Segurança", icon: "shield" },
  { id: "preferences", label: "Preferências", icon: "sliders" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "sessions", label: "Sessões Ativas", icon: "clock" },
];

export const tabDomId = (id: AccountTabId) => `account-tab-${id}`;
export const panelDomId = (id: AccountTabId) => `account-panel-${id}`;

export default function AccountTabs({ active, onChange }: { active: AccountTabId; onChange: (id: AccountTabId) => void }) {
  const refs = useRef<Partial<Record<AccountTabId, HTMLButtonElement | null>>>({});

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = ACCOUNT_TABS.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % ACCOUNT_TABS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + ACCOUNT_TABS.length) % ACCOUNT_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ACCOUNT_TABS.length - 1;
    else return;
    event.preventDefault();
    const target = ACCOUNT_TABS[next].id;
    onChange(target);
    refs.current[target]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Seções da conta"
      onKeyDown={onKeyDown}
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6"
    >
      {ACCOUNT_TABS.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node;
            }}
            type="button"
            role="tab"
            id={tabDomId(tab.id)}
            aria-selected={selected}
            aria-controls={panelDomId(tab.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cx(
              "flex h-11 min-w-0 items-center justify-center gap-2.5 rounded-lg border px-3 text-[13.5px] font-medium transition-colors",
              selected
                ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_24px_-8px_rgba(21,154,242,.9)]"
                : "border-line bg-surface/70 text-fg-muted hover:border-line-strong hover:bg-surface-2 hover:text-fg",
              FOCUS_RING,
            )}
          >
            <AccountIcon name={tab.icon} size={18} />
            <span className="text-center leading-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
