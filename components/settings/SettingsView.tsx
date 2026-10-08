"use client";
import { useState } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Button, EmptyState } from "../UI";
import { Icon } from "../Icons";
import ApiTab from "./ApiTab";
import AppearanceTab from "./AppearanceTab";
import GeneralTab from "./GeneralTab";
import NotificationsTab from "./NotificationsTab";
import PlanTab from "./PlanTab";
import PreferencesTab from "./PreferencesTab";
import SecurityTab from "./SecurityTab";
import SettingsIcon from "./SettingsIcons";
import SettingsTabs, { settingsTabs, type SettingsTabId } from "./SettingsTabs";

const subpageHeaders: Partial<Record<SettingsTabId, { title: string; description: string }>> = {
  security: {
    title: "Segurança da Conta",
    description: "Proteja sua conta com autenticação de dois fatores e configurações avançadas de segurança.",
  },
  api: {
    title: "API e Webhooks",
    description: "Integre o Copytrix com outras plataformas e automatize seus processos através da nossa API e Webhooks.",
  },
  notifications: {
    title: "Notificações",
    description: "Receba alertas em tempo real sobre suas operações, sistemas e eventos importantes.",
  },
  appearance: {
    title: "Aparência",
    description: "Personalize o visual da sua plataforma de acordo com suas preferências.",
  },
  preferences: {
    title: "Preferências",
    description: "Ajuste as preferências gerais da plataforma de acordo com suas necessidades.",
  },
  plan: {
    title: "Plano e Assinatura",
    description: "Gerencie seu plano, veja detalhes da sua assinatura e altere de plano quando quiser.",
  },
};

export default function SettingsView() {
  const [tab, setTab] = useState<SettingsTabId>("general");
  const activeLabel = settingsTabs.find((t) => t.id === tab)?.label ?? "";
  const subpage = subpageHeaders[tab];

  return (
    <Shell>
      <div className={subpage ? "lg:-mx-2" : undefined} data-settings-layout={tab}>
      <PageHeader
        breadcrumb={
          subpage ? (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-fg-muted">
              <button type="button" onClick={() => setTab("general")} className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
                Configurações
              </button>
              <Icon name="chevron" size={12} stroke={2.2} />
              <span aria-current="page" className="text-fg">
                {activeLabel}
              </span>
            </nav>
          ) : undefined
        }
        title={subpage?.title ?? "Configurações Gerais"}
        description={subpage?.description ?? "Gerencie as configurações do seu perfil, preferências, segurança, notificações e integrações."}
      />

      <SettingsTabs active={tab} onChange={setTab} />

      <div role="tabpanel" id={`settings-panel-${tab}`} aria-labelledby={`settings-tab-${tab}`} className="mt-3">
        {tab === "general" ? (
          <GeneralTab />
        ) : tab === "security" ? (
          <SecurityTab />
        ) : tab === "api" ? (
          <ApiTab />
        ) : tab === "notifications" ? (
          <NotificationsTab />
        ) : tab === "appearance" ? (
          <AppearanceTab />
        ) : tab === "preferences" ? (
          <PreferencesTab />
        ) : tab === "plan" ? (
          <PlanTab />
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
      </div>
    </Shell>
  );
}
