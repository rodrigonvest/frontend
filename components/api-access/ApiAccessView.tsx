"use client";
import { useState } from "react";
import { copyText } from "../../lib/copy-text";
import {
  API_KEY_MASK_LENGTH,
  INITIAL_API_KEY_VISIBLE,
  INITIAL_PERMISSIONS,
  INITIAL_WEBHOOKS,
  MCP_INTEGRATIONS,
  type ApiTabId,
  type WebhookItem,
} from "../../lib/api-access-data";
import { ApiAccessProvider, WEBHOOKS_HEADING_ID, type ApiAccessContextValue } from "./ApiAccessContext";
import ApiHeader from "./ApiHeader";
import ApiTabs from "./ApiTabs";
import { ConfirmDialog } from "./Dialog";
import { ExamplesTab, LogsTab, SdksTab } from "./ExtraTabViews";
import OverviewTab from "./OverviewTab";
import { McpTab, RestTab, WebhooksTab } from "./TabViews";
import { ToastRegion, useToast } from "./Toast";
import WebhookFormDialog from "./WebhookFormDialog";

type DialogState = { type: "key" } | { type: "delete"; id: string } | { type: "webhook"; id: string | null } | null;

function generateKey() {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return `ctx_live_sk_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

export default function ApiAccessView() {
  const [tab, setTab] = useState<ApiTabId>("overview");
  const [apiKey, setApiKey] = useState(INITIAL_API_KEY_VISIBLE);
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [webhooks, setWebhooks] = useState<WebhookItem[]>(INITIAL_WEBHOOKS);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const { toast, notify } = useToast();

  const apiKeyDisplay = `${apiKey}${"•".repeat(API_KEY_MASK_LENGTH)}`;

  const openDialog = (next: NonNullable<DialogState>, source: HTMLElement) => {
    setTrigger(source);
    setDialog(next);
  };

  const closeDialog = () => {
    setDialog(null);
    requestAnimationFrame(() => {
      if (trigger && !trigger.isConnected) document.getElementById(WEBHOOKS_HEADING_ID)?.focus();
    });
  };

  const copy = async (text: string, message: string) => {
    const copied = await copyText(text);
    if (copied) notify(message);
    else notify("Não foi possível acessar a área de transferência. Copie manualmente.", "error");
  };

  const value: ApiAccessContextValue = {
    apiKeyDisplay,
    permissions,
    webhooks,
    notify,
    copy,
    goToTab: setTab,
    openDocs: () => notify("A documentação completa será publicada em breve (demonstrativo).", "info"),
    togglePermission: (id) => setPermissions((current) => ({ ...current, [id]: !current[id] })),
    savePermissions: () => {
      if (!Object.values(permissions).some(Boolean)) {
        notify("Selecione ao menos uma permissão antes de salvar.", "error");
        return;
      }
      notify("Permissões salvas com sucesso (demonstrativo).");
    },
    requestNewKey: (source) => openDialog({ type: "key" }, source),
    toggleWebhook: (id) => {
      const target = webhooks.find((item) => item.id === id);
      if (!target) return;
      setWebhooks((current) => current.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
      notify(target.active ? "Webhook desativado (demonstrativo)." : "Webhook ativado (demonstrativo).");
    },
    editWebhook: (id, source) => openDialog({ type: "webhook", id }, source),
    deleteWebhook: (id, source) => openDialog({ type: "delete", id }, source),
    connectMcp: (id) => {
      const integration = MCP_INTEGRATIONS.find((item) => item.id === id);
      if (integration) notify(`Conexão com ${integration.name} simulada. Nenhuma integração real foi criada (demonstrativo).`, "info");
    },
  };

  const editingWebhook = dialog?.type === "webhook" && dialog.id ? (webhooks.find((item) => item.id === dialog.id) ?? null) : null;
  const deletingWebhook = dialog?.type === "delete" ? (webhooks.find((item) => item.id === dialog.id) ?? null) : null;

  const confirmNewKey = () => {
    setApiKey(generateKey());
    closeDialog();
    notify("Nova API Key gerada (demonstrativo). Nenhuma chave real foi criada ou revogada.");
  };

  const submitWebhook = (values: { url: string; events: string[] }) => {
    if (dialog?.type !== "webhook") return;
    if (dialog.id) {
      setWebhooks((current) => current.map((item) => (item.id === dialog.id ? { ...item, ...values } : item)));
      notify("Webhook atualizado (demonstrativo).");
    } else {
      setWebhooks((current) => [...current, { id: `wh-${Date.now()}`, active: true, ...values }]);
      notify("Webhook adicionado (demonstrativo).");
    }
    closeDialog();
  };

  const confirmDelete = () => {
    if (dialog?.type !== "delete") return;
    setWebhooks((current) => current.filter((item) => item.id !== dialog.id));
    closeDialog();
    notify("Webhook excluído (demonstrativo).");
  };

  return (
    <ApiAccessProvider value={value}>
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <ApiHeader />
        </div>
        <ApiTabs tab={tab} onTab={setTab}>
          {tab === "overview" && <OverviewTab />}
          {tab === "rest" && <RestTab />}
          {tab === "webhooks" && <WebhooksTab />}
          {tab === "mcp" && <McpTab />}
          {tab === "logs" && <LogsTab />}
          {tab === "examples" && <ExamplesTab />}
          {tab === "sdks" && <SdksTab />}
        </ApiTabs>
      </div>

      <ConfirmDialog
        open={dialog?.type === "key"}
        title="Gerar nova API Key?"
        description="A chave atual deixaria de funcionar nas suas integrações. Esta ação é demonstrativa: nenhuma chave real será criada ou revogada."
        icon="key"
        accent="amber"
        confirmLabel="Gerar nova key"
        returnFocusTo={trigger}
        onClose={closeDialog}
        onConfirm={confirmNewKey}
      />
      <ConfirmDialog
        open={deletingWebhook !== null}
        title="Excluir webhook?"
        description={deletingWebhook ? `O endereço ${deletingWebhook.url} deixará de receber notificações. Esta ação é demonstrativa.` : undefined}
        icon="trash"
        accent="red"
        danger
        confirmLabel="Excluir webhook"
        returnFocusTo={trigger}
        onClose={closeDialog}
        onConfirm={confirmDelete}
      />
      <WebhookFormDialog open={dialog?.type === "webhook"} webhook={editingWebhook} returnFocusTo={trigger} onClose={closeDialog} onSubmit={submitWebhook} />
      <ToastRegion toast={toast} />
    </ApiAccessProvider>
  );
}
