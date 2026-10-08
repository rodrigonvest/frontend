import type { SelectOption } from "./settings-demo";

export type NotificationChannelId = "telegram" | "email" | "push" | "webhook";
export type NotificationEventIconId = "open" | "closed" | "takeProfit" | "stopLoss" | "breakEven" | "systemStart" | "systemStop" | "connection" | "error";

export const notificationChannels: Array<{ id: NotificationChannelId; label: string }> = [
  { id: "telegram", label: "Telegram" },
  { id: "email", label: "E-mail" },
  { id: "push", label: "Push" },
  { id: "webhook", label: "Webhook" },
];

export type NotificationEventDemo = {
  id: string;
  icon: NotificationEventIconId;
  name: string;
  description: string;
  channels: Record<NotificationChannelId, boolean>;
};

const channelsOf = (telegram: boolean, email: boolean, push: boolean, webhook = false): Record<NotificationChannelId, boolean> => ({
  telegram,
  email,
  push,
  webhook,
});

export const notificationEventsDemo: NotificationEventDemo[] = [
  { id: "open", icon: "open", name: "Nova operação", description: "Quando uma nova operação for aberta.", channels: channelsOf(true, true, true) },
  { id: "closed", icon: "closed", name: "Operação fechada", description: "Quando uma operação for encerrada.", channels: channelsOf(true, true, true) },
  { id: "tp", icon: "takeProfit", name: "Take Profit atingido", description: "Quando um nível de TP for atingido.", channels: channelsOf(true, true, true) },
  { id: "sl", icon: "stopLoss", name: "Stop Loss atingido", description: "Quando o SL for atingido.", channels: channelsOf(true, true, false) },
  { id: "be", icon: "breakEven", name: "Break Even ativado", description: "Quando o stop for movido para o BE.", channels: channelsOf(true, true, false) },
  { id: "system-start", icon: "systemStart", name: "Sistema iniciado", description: "Quando um sistema for iniciado.", channels: channelsOf(true, false, true) },
  { id: "system-stop", icon: "systemStop", name: "Sistema parado", description: "Quando um sistema for interrompido.", channels: channelsOf(false, true, true) },
  { id: "connection", icon: "connection", name: "Conexão perdida", description: "Quando houver perda de conexão.", channels: channelsOf(false, true, false) },
  { id: "error", icon: "error", name: "Erro no sistema", description: "Quando ocorrer um erro em qualquer sistema.", channels: channelsOf(true, true, true) },
];

export const telegramDemo = { botToken: "123456:ABC...XYZ", chatId: "987654321" };
export const emailDemo = { primary: "rodrigo@example.com", additional: ["trading@gmail.com", "alertas@example.com"] };
export const webhookDemoUrl = "https://seusistema.com/webhook";

export const soundOptions: SelectOption[] = [
  { value: "default", label: "Padrão (Copytrix)" },
  { value: "chime", label: "Sino suave" },
  { value: "pulse", label: "Pulso" },
  { value: "silent", label: "Silencioso" },
];

export const durationOptions: SelectOption[] = [
  { value: "3", label: "3 segundos" },
  { value: "5", label: "5 segundos" },
  { value: "10", label: "10 segundos" },
  { value: "persist", label: "Até fechar" },
];

export const payloadFormatOptions: SelectOption[] = [
  { value: "json", label: "JSON (Padrão)" },
  { value: "form", label: "Form URL Encoded" },
  { value: "text", label: "Texto simples" },
];

export const sendWindowOptions: SelectOption[] = [
  { value: "realtime", label: "24 horas (tempo real)" },
  { value: "business", label: "Horário comercial (08h–18h)" },
  { value: "custom", label: "Personalizado" },
];

export const groupingOptions: SelectOption[] = [
  { value: "none", label: "Não agrupar" },
  { value: "1m", label: "A cada 1 minuto" },
  { value: "5m", label: "A cada 5 minutos" },
  { value: "15m", label: "A cada 15 minutos" },
];

export const testTypeOptions: SelectOption[] = [
  { value: "open", label: "Nova operação (exemplo)" },
  { value: "closed", label: "Operação fechada (exemplo)" },
  { value: "tp", label: "Take Profit atingido (exemplo)" },
  { value: "sl", label: "Stop Loss atingido (exemplo)" },
  { value: "error", label: "Erro no sistema (exemplo)" },
];

export const lastNotificationDemo = {
  title: "Nova operação (exemplo)",
  date: "04/10/2026 15:24",
  summary: "Enviada há 2 minutos via Telegram, E-mail e Push.",
};
