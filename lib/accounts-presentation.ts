/**
 * Dados locais de APRESENTAÇÃO para a página Contas (fase visual).
 * Não vêm do Copytrix Core e não representam conexões reais.
 */

export type PlatformKey = "mt5" | "mt4" | "matchtrader" | "tradelocker" | "dxtrade" | "binance" | "other";
export type AccountStatus = "connected" | "disconnected";
export type AccountLogoKey = "fundednext" | "ftmo" | "mt4" | "matchtrader" | "tradelocker";
export type AccountTagTone = "primary" | "firm" | "personal" | "draft" | "secondary";

export type PresentationAccount = {
  id: string;
  name: string;
  starred?: boolean;
  logo: AccountLogoKey;
  platform: PlatformKey;
  platformLabel: string;
  tag: { label: string; tone: AccountTagTone };
  server: string;
  login: string;
  balance: number;
  equity: number;
  leverage: string;
  status: AccountStatus;
  latencyMs: number | null;
  barColor: string;
};

export const platformMeta: Record<PlatformKey, { label: string; color: string }> = {
  mt5: { label: "MT5", color: "#159af2" },
  mt4: { label: "MT4", color: "#18c4f0" },
  matchtrader: { label: "MatchTrader", color: "#8b4de8" },
  tradelocker: { label: "TradeLocker", color: "#9fb2c6" },
  dxtrade: { label: "DXTrade", color: "#5b8def" },
  binance: { label: "Binance", color: "#f0c35c" },
  other: { label: "Outros", color: "#7d8aa0" },
};

export const presentationAccounts: PresentationAccount[] = [
  {
    id: "fundednext-mt5",
    name: "FundedNext MT5",
    starred: true,
    logo: "fundednext",
    platform: "mt5",
    platformLabel: "MT5",
    tag: { label: "Conta Principal", tone: "primary" },
    server: "FundedNext-Server",
    login: "12345678",
    balance: 52340.5,
    equity: 52812.4,
    leverage: "1:100",
    status: "connected",
    latencyMs: 12,
    barColor: "#12d99e",
  },
  {
    id: "ftmo-mt5",
    name: "FTMO MT5",
    logo: "ftmo",
    platform: "mt5",
    platformLabel: "MT5",
    tag: { label: "Prop Firm", tone: "firm" },
    server: "FTMO-Server",
    login: "87654321",
    balance: 8924.5,
    equity: 8924.5,
    leverage: "1:100",
    status: "connected",
    latencyMs: 18,
    barColor: "#159af2",
  },
  {
    id: "pessoal-mt4",
    name: "Conta Pessoal MT4",
    logo: "mt4",
    platform: "mt4",
    platformLabel: "MT4",
    tag: { label: "Conta Pessoal", tone: "personal" },
    server: "ICMarkets-Live",
    login: "11223344",
    balance: 5420.3,
    equity: 5398.2,
    leverage: "1:500",
    status: "connected",
    latencyMs: 25,
    barColor: "#18c4f0",
  },
  {
    id: "matchtrader-demo",
    name: "MatchTrader Demo",
    logo: "matchtrader",
    platform: "matchtrader",
    platformLabel: "MatchTrader",
    tag: { label: "Rascunho", tone: "draft" },
    server: "MatchTrader-Demo",
    login: "99887766",
    balance: 10000,
    equity: 10000,
    leverage: "1:100",
    status: "disconnected",
    latencyMs: null,
    barColor: "#8b4de8",
  },
  {
    id: "tradelocker-live",
    name: "TradeLocker Live",
    logo: "tradelocker",
    platform: "tradelocker",
    platformLabel: "TradeLocker",
    tag: { label: "Conta Secundária", tone: "secondary" },
    server: "TradeLocker-Live",
    login: "55667788",
    balance: 3120,
    equity: 3105.2,
    leverage: "1:200",
    status: "connected",
    latencyMs: 32,
    barColor: "#9fb2c6",
  },
];

export const summaryCards = {
  total: { value: "5", note: "3 MT5 / 1 MT4 / 1 Outro" },
  connected: { value: "4", note: "80% online" },
  equity: { value: "$ 53,240.30", note: "+2.4% hoje" },
  margin: { value: "12.8%", note: "$ 6,812.40 / $ 53,240.30" },
};

export type PlatformFilterKey = "all" | PlatformKey;

export const platformFilters: Array<{ key: PlatformFilterKey; label: string; count: number }> = [
  { key: "all", label: "Todas", count: 5 },
  { key: "mt5", label: "MT5", count: 3 },
  { key: "mt4", label: "MT4", count: 1 },
  { key: "matchtrader", label: "MatchTrader", count: 1 },
  { key: "tradelocker", label: "TradeLocker", count: 0 },
  { key: "dxtrade", label: "DXTrade", count: 0 },
  { key: "binance", label: "Binance", count: 0 },
  { key: "other", label: "Outros", count: 0 },
];

export const platformDistribution = [
  { label: "MT5", color: platformMeta.mt5.color, percent: 60, count: 3 },
  { label: "MT4", color: platformMeta.mt4.color, percent: 20, count: 1 },
  { label: "MatchTrader", color: platformMeta.matchtrader.color, percent: 20, count: 1 },
  { label: "Outros", color: platformMeta.other.color, percent: 0, count: 0 },
];

export const statusDistribution = [
  { label: "Conectadas", color: "#12d99e", percent: 80, count: 4 },
  { label: "Desconectadas", color: "#ff5d6d", percent: 20, count: 1 },
  { label: "Com Erro", color: "#f0c35c", percent: 0, count: 0 },
  { label: "Rascunho", color: "#7d8aa0", percent: 0, count: 0 },
];

export function formatUsd(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
