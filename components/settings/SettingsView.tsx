"use client";
import { useState } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Button, EmptyState } from "../UI";
import GeneralTab from "./GeneralTab";
import SettingsIcon from "./SettingsIcons";
import SettingsTabs, { settingsTabs, type SettingsTabId } from "./SettingsTabs";

export default function SettingsView() {
  const [tab, setTab] = useState<SettingsTabId>("general");
  const activeLabel = settingsTabs.find((t) => t.id === tab)?.label ?? "";

  return (
    <Shell>
      <PageHeader title="Configurações Gerais" description="Gerencie as configurações do seu perfil, preferências, segurança, notificações e integrações." />

      <SettingsTabs active={tab} onChange={setTab} />

      <div role="tabpanel" id={`settings-panel-${tab}`} aria-labelledby={`settings-tab-${tab}`} className="mt-3">
        {tab === "general" ? (
          <GeneralTab />
        ) : (
          <EmptyState className="min-h-[240px] bg-surface/70" title={activeLabel} description="Esta seção de configurações ainda não está disponível." />
        )}
      </div>

      {tab === "general" && (
        <div className="pointer-events-none sticky bottom-4 z-10 mt-4 flex justify-end">
          <Button variant="primary" className="pointer-events-auto !h-[44px] rounded-lg px-5 text-[14px] font-semibold shadow-lg shadow-black/40">
            <SettingsIcon name="save" size={18} />
            Salvar Configurações
          </Button>
        </div>
      )}
    </Shell>
  );
}
