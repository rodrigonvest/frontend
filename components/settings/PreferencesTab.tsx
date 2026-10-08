"use client";
import { useState } from "react";
import PreviewCard from "./AppearancePreviewCard";
import { LanguageCard, RegionalCard, ReportsCard } from "./PreferencesFormCards";
import { ResetIcon } from "./PreferencesIcons";
import { DisplayCard, OperationCard, OtherCard } from "./PreferencesToggleCards";
import SettingsIcon from "./SettingsIcons";
import { cx } from "../UI";
import { defaultPreferences, type PreferenceFlagKey, type PreferenceSelectKey, type PreferencesValues } from "../../lib/preferences-demo";

const previewIdentity = { platformName: "Copytrix", tagline: "Telegram to Results", showTagline: true };

const secondaryButton =
  "inline-flex h-[50px] items-center justify-center gap-2.5 rounded-lg border border-line-strong/60 bg-surface/70 px-6 text-[14px] font-medium text-fg transition-colors hover:border-brand/60 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function PreferencesTab() {
  const [saved, setSaved] = useState<PreferencesValues>(defaultPreferences);
  const [draft, setDraft] = useState<PreferencesValues>(defaultPreferences);
  const [justSaved, setJustSaved] = useState(false);

  const update = <K extends keyof PreferencesValues>(key: K, value: PreferencesValues[K]) => {
    setJustSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const onSelect = (key: PreferenceSelectKey, value: string) => update(key, value);
  const onToggle = (key: PreferenceFlagKey, next: boolean) => update(key, next);

  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 items-start gap-3.5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <LanguageCard values={draft} onSelect={onSelect} />
          <RegionalCard values={draft} onSelect={onSelect} />
          <OperationCard values={draft} onToggle={onToggle} />
          <ReportsCard values={draft} onSelect={onSelect} />
        </div>
        <div className="flex min-w-0 flex-col gap-3.5">
          <PreviewCard
            theme="dark"
            accent="#007BFF"
            sidebarLayout="expanded"
            identity={previewIdentity}
            description="Veja um exemplo de como suas preferências serão aplicadas."
          />
          <DisplayCard values={draft} onToggle={onToggle} />
          <OtherCard values={draft} onToggle={onToggle} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => { setJustSaved(false); setDraft(defaultPreferences); }} className={secondaryButton}>
          <ResetIcon size={20} />
          Restaurar Padrões
        </button>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span role="status" aria-live="polite" className={cx("text-[13px] text-success", !justSaved && "sr-only")}>
            {justSaved ? "Preferências salvas." : ""}
          </span>
          <button type="button" onClick={() => { setJustSaved(false); setDraft(saved); }} className={cx(secondaryButton, "min-w-[200px]")}>
            Descartar Alterações
          </button>
          <button
            type="button"
            onClick={() => { setSaved(draft); setJustSaved(true); }}
            className="inline-flex h-[50px] min-w-[212px] items-center justify-center gap-2.5 rounded-lg bg-brand-strong px-6 text-[14px] font-semibold text-white shadow-[0_0_22px_rgba(8,127,240,.35)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <SettingsIcon name="save" size={20} />
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
