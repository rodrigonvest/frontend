"use client";
import type { KeyboardEvent } from "react";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";

export const settingsTabs = [
  { id: "general", label: "Geral", icon: "settings" },
  { id: "security", label: "Segurança", icon: "shield" },
  { id: "api", label: "API e Webhooks", icon: "code" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "appearance", label: "Aparência", icon: "palette" },
  { id: "preferences", label: "Preferências", icon: "sliders" },
  { id: "plan", label: "Plano e Assinatura", icon: "crown" },
] as const;

export type SettingsTabId = (typeof settingsTabs)[number]["id"];

export default function SettingsTabs({ active, onChange }: { active: SettingsTabId; onChange: (id: SettingsTabId) => void }) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = settingsTabs.findIndex((t) => t.id === active);
    const next = e.key === "ArrowRight" ? index + 1 : e.key === "ArrowLeft" ? index - 1 : e.key === "Home" ? 0 : e.key === "End" ? settingsTabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = settingsTabs[(next + settingsTabs.length) % settingsTabs.length];
    onChange(target.id);
    document.getElementById(`settings-tab-${target.id}`)?.focus();
  };

  return (
    <div role="tablist" aria-label="Seções de configurações" onKeyDown={onKeyDown} className="flex gap-1.5 overflow-x-auto pb-1">
      {settingsTabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            id={`settings-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`settings-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cx(
              "inline-flex h-12 min-w-fit flex-1 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border px-4 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              selected
                ? "border-brand-strong bg-brand-strong font-semibold text-white"
                : "border-line bg-surface/70 text-fg-muted hover:border-line-strong hover:bg-surface-2 hover:text-fg",
            )}
          >
            <SettingsIcon name={tab.icon} size={18} stroke={1.9} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
