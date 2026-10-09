import type { SystemLogoKey } from "./systems-catalog";

export type PlatformKey = "mt5" | "oanda" | "tradelocker" | "ninjatrader";

export const PLATFORMS: Record<PlatformKey, { label: string; logo: SystemLogoKey }> = {
  mt5: { label: "MetaTrader 5", logo: "mt5" },
  oanda: { label: "OANDA", logo: "oanda" },
  tradelocker: { label: "TradeLocker", logo: "tradelocker" },
  ninjatrader: { label: "NinjaTrader", logo: "ninjatrader" },
};

export const LEVERAGE_OPTIONS = ["1:30", "1:50", "1:100", "1:200", "1:500"] as const;

export type MultiAccount = {
  id: string;
  name: string;
  number: string;
  platform: PlatformKey;
  type: string;
  balance: number;
  equity: number;
  leverage: string;
  risk: number;
  active: boolean;
  pnlToday: number;
  pnlTodayPct: number;
  pnlTotal: number;
  pnlTotalPct: number;
  trades: number;
};

export const initialAccounts: MultiAccount[] = [
  { id: "acc-prop100", name: "Prop Firm 100K", number: "#7845213", platform: "mt5", type: "Pepperstone", balance: 102842.3, equity: 103221.1, leverage: "1:100", risk: 1.0, active: true, pnlToday: 842.5, pnlTodayPct: 0.82, pnlTotal: 5421.3, pnlTotalPct: 5.55, trades: 87 },
  { id: "acc-prop200", name: "Prop Firm 200K", number: "#9876543", platform: "mt5", type: "FTMO", balance: 201562.1, equity: 202118.4, leverage: "1:100", risk: 0.8, active: true, pnlToday: 624.3, pnlTodayPct: 0.31, pnlTotal: 12340.2, pnlTotalPct: 6.52, trades: 156 },
  { id: "acc-pessoal", name: "Conta Pessoal", number: "#12345678", platform: "mt5", type: "Pepperstone", balance: 5842.3, equity: 5801.2, leverage: "1:500", risk: 1.5, active: true, pnlToday: -41.1, pnlTodayPct: -0.7, pnlTotal: 1204.5, pnlTotalPct: 26.01, trades: 98 },
  { id: "acc-oanda", name: "OANDA Live", number: "#3344556", platform: "oanda", type: "Live", balance: 12350.2, equity: 12410.8, leverage: "1:200", risk: 1.0, active: true, pnlToday: 60.6, pnlTodayPct: 0.49, pnlTotal: 2185.7, pnlTotalPct: 21.46, trades: 73 },
  { id: "acc-tradelocker", name: "TradeLocker Live", number: "#7788991", platform: "tradelocker", type: "Live", balance: 8120.5, equity: 8098.3, leverage: "1:200", risk: 1.0, active: true, pnlToday: -22.2, pnlTodayPct: -0.27, pnlTotal: 1025.4, pnlTotalPct: 14.45, trades: 64 },
  { id: "acc-ninja", name: "NinjaTrader Sim", number: "#Sim101", platform: "ninjatrader", type: "Simulação", balance: 50000, equity: 50432.1, leverage: "1:100", risk: 0.5, active: false, pnlToday: 432.1, pnlTodayPct: 0.86, pnlTotal: 1842.3, pnlTotalPct: 3.81, trades: 26 },
];

export const accountSummary = {
  equity: 48732.5,
  equityChangePct: 2.4,
  pnlToday: 1254.3,
  pnlTodayPct: 2.64,
  winRate: 68.7,
  wins: 342,
  totalTrades: 498,
  riskInUse: 12.5,
};

export type LotEntry = { accountId: string; color: string; percent: number; fixedLot: number };

export const initialLots: LotEntry[] = [
  { accountId: "acc-prop100", color: "#159af2", percent: 30, fixedLot: 0.3 },
  { accountId: "acc-prop200", color: "#7c5cff", percent: 30, fixedLot: 0.6 },
  { accountId: "acc-pessoal", color: "#ff4f9a", percent: 15, fixedLot: 0.15 },
  { accountId: "acc-oanda", color: "#f6b73c", percent: 15, fixedLot: 0.15 },
  { accountId: "acc-tradelocker", color: "#12d99e", percent: 10, fixedLot: 0.1 },
];

export type GroupMember = { accountId: string; percent: number };
export type AccountGroup = { id: string; name: string; symbols: string; active: boolean; members: GroupMember[] };

export const initialGroups: AccountGroup[] = [
  {
    id: "grp-prop",
    name: "Grupo 1 - Prop Firms",
    symbols: "XAUUSD, US100",
    active: true,
    members: [
      { accountId: "acc-prop100", percent: 40 },
      { accountId: "acc-prop200", percent: 40 },
      { accountId: "acc-ninja", percent: 20 },
    ],
  },
  {
    id: "grp-pessoal",
    name: "Grupo 2 - Contas Pessoais",
    symbols: "Todos os símbolos",
    active: true,
    members: [
      { accountId: "acc-pessoal", percent: 60 },
      { accountId: "acc-oanda", percent: 40 },
    ],
  },
];

export const symbolExposure = [
  { symbol: "XAUUSD", pct: 45.2, color: "#f6b73c" },
  { symbol: "US100", pct: 22.1, color: "#159af2" },
  { symbol: "US500", pct: 12.3, color: "#7c5cff" },
  { symbol: "XAGUSD", pct: 8.4, color: "#ff4f9a" },
  { symbol: "Outros", pct: 12.0, color: "#12d99e" },
];

export const accountExposure = [
  { accountId: "acc-prop100", pct: 28.4 },
  { accountId: "acc-prop200", pct: 25.6 },
  { accountId: "acc-pessoal", pct: 15.2 },
  { accountId: "acc-oanda", pct: 14.8 },
  { accountId: "acc-tradelocker", pct: 10.5 },
  { accountId: "acc-ninja", pct: 5.5 },
];

export type MultiAccountSettings = {
  autoSync: boolean;
  riskLimit: number;
  dailyLossLimit: number;
  executionMode: "Simultânea" | "Sequencial";
  notifyFailures: boolean;
  closeOnLimit: boolean;
};

export const initialSettings: MultiAccountSettings = {
  autoSync: true,
  riskLimit: 80,
  dailyLossLimit: 5,
  executionMode: "Simultânea",
  notifyFailures: true,
  closeOnLimit: false,
};

export const accountTemplates = [
  { id: "conservative", label: "Conservador (0.5% por conta)", risk: 0.5 },
  { id: "moderate", label: "Moderado (1.0% por conta)", risk: 1.0 },
  { id: "aggressive", label: "Agressivo (1.5% por conta)", risk: 1.5 },
] as const;

export type HistoryEvent = { time: string; account: string; event: string; detail: string; tone: "green" | "red" | "blue" | "amber" };

export const historyEvents: HistoryEvent[] = [
  { time: "09/10/2026 14:32:15", account: "Prop Firm 100K", event: "Ordem replicada", detail: "BUY XAUUSD 0.30 @ 2642.15", tone: "green" },
  { time: "09/10/2026 14:32:15", account: "Prop Firm 200K", event: "Ordem replicada", detail: "BUY XAUUSD 0.60 @ 2642.18", tone: "green" },
  { time: "09/10/2026 14:32:16", account: "NinjaTrader Sim", event: "Conta inativa", detail: "Ordem ignorada: conta desativada", tone: "amber" },
  { time: "09/10/2026 13:18:05", account: "OANDA Live", event: "Ordem replicada", detail: "SELL XAUUSD 0.15 @ 2648.20", tone: "green" },
  { time: "09/10/2026 11:05:41", account: "TradeLocker Live", event: "Falha de sincronização", detail: "Tempo limite de resposta excedido (3s)", tone: "red" },
  { time: "09/10/2026 10:24:09", account: "Conta Pessoal", event: "Risco ajustado", detail: "Risco por operação alterado de 1.0% para 1.5%", tone: "blue" },
  { time: "08/10/2026 18:40:22", account: "Prop Firm 200K", event: "Limite diário", detail: "Perda diária em 62% do limite configurado", tone: "amber" },
];

export const reportOptions = [
  { id: "perf", title: "Desempenho consolidado", description: "P&L, win rate e operações de todas as contas no período." },
  { id: "risk", title: "Exposição e risco", description: "Exposição por símbolo, conta e grupo com limites aplicados." },
  { id: "alloc", title: "Distribuição de lotes", description: "Histórico de alocação por percentual, lote fixo e equidade." },
  { id: "sync", title: "Auditoria de sincronização", description: "Latência, falhas e ordens replicadas por conta." },
];

export function money(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function signedMoney(value: number) {
  return `${value < 0 ? "-" : "+"}${money(Math.abs(value))}`;
}

export function signedPct(value: number) {
  return `${value < 0 ? "-" : "+"}${Math.abs(value).toFixed(2)}%`;
}
