"use client";
import { createContext, useContext } from "react";
import type { ApiTabId, WebhookItem } from "../../lib/api-access-data";
import type { Notify } from "./Toast";

export interface ApiAccessContextValue {
  apiKeyDisplay: string;
  permissions: Record<string, boolean>;
  webhooks: WebhookItem[];
  notify: Notify;
  copy: (text: string, message: string) => void;
  goToTab: (tab: ApiTabId) => void;
  openDocs: () => void;
  togglePermission: (id: string) => void;
  savePermissions: () => void;
  requestNewKey: (trigger: HTMLElement) => void;
  toggleWebhook: (id: string) => void;
  editWebhook: (id: string | null, trigger: HTMLElement) => void;
  deleteWebhook: (id: string, trigger: HTMLElement) => void;
  connectMcp: (id: string) => void;
}

const ApiAccessContext = createContext<ApiAccessContextValue | null>(null);

export const ApiAccessProvider = ApiAccessContext.Provider;

export function useApiAccess() {
  const value = useContext(ApiAccessContext);
  if (!value) throw new Error("useApiAccess deve ser usado dentro de ApiAccessProvider");
  return value;
}

export const WEBHOOKS_HEADING_ID = "api-webhooks-heading";
