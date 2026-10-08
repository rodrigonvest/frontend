"use client";
import { useState } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Button, EmptyState } from "../UI";
import { Icon } from "../Icons";
import GeneralTab from "./GeneralTab";
import SecurityTab from "./SecurityTab";
import SettingsIcon from "./SettingsIcons";
import SettingsTabs, { settingsTabs, type SettingsTabId } from "./SettingsTabs";

export default function SettingsView() {
  const [tab, setTab] = useState<SettingsTabId>("general");
  const activeLabel = settingsTabs.find((t) => t.id === tab)?.label ?? "";
  const isSecurity = tab === "security";

  return (
    <Shell>
      <PageHeader
        breadcrumb={
          isSecurity ? (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-fg-muted">
              <button type="button" onClick={() => setTab("general")} className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
                Configurações
              </button>
              <Icon name="chevron" size={12} stroke={2.2} />
              <span aria-current="page" className="text-fg">
                Segurança
              </span>
            </nav>
          ) : undefined
        }
        title={isSecurity ? "Segurança da Conta" : "Configurações Gerais"}
        description={
          isSecurity
            ? "Proteja sua conta com autenticação de dois fatores e configurações avançadas de segurança."
            : "Gerencie as configurações do seu perfil, preferências, segurança, notificações e integrações."
        }
      />

      <SettingsTabs active={tab} onChange={setTab} />

      <div role="tabpanel" id={`settings-panel-${tab}`} aria-labelledby={`settings-tab-${tab}`} className="mt-3">
        {tab === "general" ? (
          <GeneralTab />
        ) : isSecurity ? (
          <SecurityTab />
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
