"use client";
import { useState, type ReactNode } from "react";
import Dialog, { ConfirmDialog } from "../api-access/Dialog";
import { ToastRegion, useToast } from "../api-access/Toast";
import PageHeader from "../PageHeader";
import { Button } from "../UI";
import {
  DEFAULT_NOTIFICATIONS,
  DEFAULT_PREFERENCES,
  type NotificationChannelId,
  type PreferenceId,
} from "../../lib/account-data";
import AccountTabs, { ACCOUNT_TABS, panelDomId, tabDomId, type AccountTabId } from "./AccountTabs";
import { PersonalInfoCard, SecurityCard } from "./InfoSecurityCards";
import { AccountActionsCard, NotificationsCard, SessionsCard } from "./NotificationsActionsCards";
import PreferencesCard from "./PreferencesCard";
import { PlanCard, ProfileCard } from "./ProfilePlanCards";
import StatsCard from "./StatsCard";

type DialogState =
  | { kind: "delete"; trigger: HTMLElement | null }
  | { kind: "logout"; trigger: HTMLElement | null }
  | { kind: "edit"; title: string; trigger: HTMLElement | null }
  | null;

function activeTrigger() {
  return document.activeElement instanceof HTMLElement ? document.activeElement : null;
}

export default function AccountView() {
  const { toast, notify } = useToast();
  const [tab, setTab] = useState<AccountTabId>("overview");
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [dialog, setDialog] = useState<DialogState>(null);

  const demo = (message: string) => notify(`${message} (demonstrativo).`, "info");
  const openEdit = (title: string) => setDialog({ kind: "edit", title, trigger: activeTrigger() });
  const closeDialog = () => setDialog(null);

  const onPreference = (id: PreferenceId, value: string) => {
    setPreferences((prev) => ({ ...prev, [id]: value }));
    notify("Preferência atualizada nesta demonstração.", "success");
  };

  const onToggle = (id: NotificationChannelId, next: boolean) => {
    setNotifications((prev) => ({ ...prev, [id]: next }));
    notify(`Notificações ${next ? "ativadas" : "desativadas"} (demonstrativo).`, "info");
  };

  const profileCard = <ProfileCard onEdit={() => openEdit("Editar perfil")} onChangePhoto={() => demo("Troca de foto de perfil simulada")} />;
  const planCard = (
    <PlanCard onManage={() => demo("Gerenciamento do plano simulado")} onInvoices={() => demo("Lista de cobranças simulada")} />
  );
  const personalCard = <PersonalInfoCard onEdit={() => openEdit("Editar informações pessoais")} />;
  const securityCard = <SecurityCard onAction={(_, title) => demo(`${title}: ação de segurança simulada`)} />;
  const preferencesCard = (
    <PreferencesCard values={preferences} onChange={onPreference} onEdit={() => openEdit("Editar preferências")} />
  );
  const notificationsCard = (
    <NotificationsCard
      values={notifications}
      onToggle={onToggle}
      onConfigure={() => openEdit("Configurar notificações")}
    />
  );

  const panels: Record<AccountTabId, ReactNode> = {
    overview: (
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          {profileCard}
          <StatsCard />
          <div className="grid min-w-0 gap-5 min-[1536px]:grid-cols-2">
            {personalCard}
            {securityCard}
          </div>
          <AccountActionsCard
            onExport={() => demo("Exportação de dados simulada")}
            onDelete={(trigger) => setDialog({ kind: "delete", trigger })}
            onLogout={(trigger) => setDialog({ kind: "logout", trigger })}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          {planCard}
          {preferencesCard}
          {notificationsCard}
        </div>
      </div>
    ),
    personal: <div className="grid max-w-3xl min-w-0 gap-5">{personalCard}</div>,
    security: <div className="grid max-w-3xl min-w-0 gap-5">{securityCard}</div>,
    preferences: <div className="grid max-w-3xl min-w-0 gap-5">{preferencesCard}</div>,
    notifications: <div className="grid max-w-3xl min-w-0 gap-5">{notificationsCard}</div>,
    sessions: (
      <div className="grid max-w-3xl min-w-0 gap-5">
        <SessionsCard onEnd={(device) => demo(`Encerramento da sessão em ${device} simulado`)} />
      </div>
    ),
  };

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageHeader
        title="Minha Conta"
        description="Gerencie suas informações, segurança e preferências do seu perfil Copytrix."
      />
      <AccountTabs active={tab} onChange={setTab} />

      {ACCOUNT_TABS.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={panelDomId(item.id)}
          aria-labelledby={tabDomId(item.id)}
          hidden={item.id !== tab}
          tabIndex={-1}
          className="min-w-0 outline-none"
        >
          {item.id === tab && panels[item.id]}
        </div>
      ))}

      <ConfirmDialog
        open={dialog?.kind === "delete"}
        title="Excluir conta?"
        description="Esta é uma demonstração: nenhuma conta será excluída e seus dados permanecem intactos."
        icon="trash"
        accent="red"
        danger
        confirmLabel="Excluir conta"
        returnFocusTo={dialog?.trigger ?? null}
        onClose={closeDialog}
        onConfirm={() => {
          closeDialog();
          demo("Exclusão da conta simulada");
        }}
      />
      <ConfirmDialog
        open={dialog?.kind === "logout"}
        title="Sair da conta?"
        description="Esta é uma demonstração: sua sessão neste dispositivo continua ativa."
        icon="logout"
        accent="amber"
        confirmLabel="Sair da conta"
        returnFocusTo={dialog?.trigger ?? null}
        onClose={closeDialog}
        onConfirm={() => {
          closeDialog();
          demo("Encerramento de sessão simulado");
        }}
      />
      <Dialog
        open={dialog?.kind === "edit"}
        title={dialog?.kind === "edit" ? dialog.title : "Editar"}
        description="A edição será conectada ao backend em uma etapa futura. Nesta demonstração nenhum dado é alterado."
        icon="edit"
        accent="blue"
        returnFocusTo={dialog?.trigger ?? null}
        onClose={closeDialog}
      >
        <div className="flex justify-end">
          <Button data-autofocus onClick={closeDialog} className="h-10 px-5">
            Entendi
          </Button>
        </div>
      </Dialog>

      <ToastRegion toast={toast} />
    </div>
  );
}
