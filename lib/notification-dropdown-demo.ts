/**
 * Demonstration data for the Topbar notification dropdown.
 * The shape mirrors what a future Core/API "recent notifications" endpoint would return,
 * so the component can receive real data through its `notifications` prop.
 */

export type NotificationPreviewKind = "copiedTrade" | "takeProfit" | "systemDown" | "announcement" | "signal";

export type NotificationPreview = {
  id: string;
  kind: NotificationPreviewKind;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  href: string;
};

export const NOTIFICATIONS_CENTER_HREF = "/notifications";

export const notificationPreviewsDemo: NotificationPreview[] = [
  {
    id: "np-copied",
    kind: "copiedTrade",
    title: "Operação Copiada",
    description: "Nova ordem BUY XAUUSD 0.10 lot copiada...",
    time: "Hoje, 14:32",
    unread: true,
    href: NOTIFICATIONS_CENTER_HREF,
  },
  {
    id: "np-tp",
    kind: "takeProfit",
    title: "Take Profit Atingido",
    description: "TP1 atingido em XAUUSD +$125.50 (+25 pips).",
    time: "Hoje, 14:18",
    unread: true,
    href: NOTIFICATIONS_CENTER_HREF,
  },
  {
    id: "np-system",
    kind: "systemDown",
    title: "Sistema Desconectado",
    description: "Conexão com o MT5 foi perdida. Tentando...",
    time: "Hoje, 13:45",
    unread: true,
    href: NOTIFICATIONS_CENTER_HREF,
  },
  {
    id: "np-announcement",
    kind: "announcement",
    title: "Novo Anúncio",
    description: "Copytrix MCP já disponível! Conecte ao...",
    time: "Hoje, 12:30",
    unread: false,
    href: NOTIFICATIONS_CENTER_HREF,
  },
  {
    id: "np-signal",
    kind: "signal",
    title: "Novo Sinal Recebido",
    description: "Sinal de BUY XAUUSD recebido no canal...",
    time: "Hoje, 11:22",
    unread: false,
    href: NOTIFICATIONS_CENTER_HREF,
  },
];
