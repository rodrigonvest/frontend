export type PlatformLogoKey =
  | "mt5"
  | "mt4"
  | "matchtrader"
  | "tradelocker"
  | "dxtrade"
  | "ctrader"
  | "tradingview"
  | "binance"
  | "bybit"
  | "okx";

export type TradingPlatform = {
  id: PlatformLogoKey;
  name: string;
  description: string;
  recommended?: boolean;
};

export const tradingPlatforms: readonly TradingPlatform[] = [
  { id: "mt5", name: "MetaTrader 5", description: "A plataforma mais popular para Forex, CFDs e Gold. Suporte completo.", recommended: true },
  { id: "mt4", name: "MetaTrader 4", description: "Plataforma estável e amplamente utilizada no mercado." },
  { id: "matchtrader", name: "MatchTrader", description: "Plataforma moderna para prop firms e trading institucional." },
  { id: "tradelocker", name: "TradeLocker", description: "Plataforma web moderna com execução rápida e baixo spread." },
  { id: "dxtrade", name: "DXTrade", description: "Plataforma profissional para brokers e prop firms." },
  { id: "ctrader", name: "cTrader", description: "Plataforma ECN com execução ultra rápida." },
  { id: "tradingview", name: "TradingView", description: "Conecte sua conta para executar sinais e estratégias." },
  { id: "binance", name: "Binance Futures", description: "Trading de criptomoedas em contratos futuros." },
  { id: "bybit", name: "Bybit Futures", description: "Plataforma líder em derivativos de cripto." },
  { id: "okx", name: "OKX Futures", description: "Trading de futuros com alta liquidez." },
];

export const defaultPlatformId: PlatformLogoKey = "mt5";

export type ServerExample = { broker: string; server: string };

export const serverExamples: readonly ServerExample[] = [
  { broker: "FundedNext", server: "FundedNext-Server" },
  { broker: "Hantec", server: "HantecMarkets-Server" },
  { broker: "Pepperstone", server: "Pepperstone-Edge" },
  { broker: "Exness", server: "Exness-MT5Real" },
  { broker: "XM", server: "XMGlobal-Real" },
  { broker: "IC Markets", server: "ICMarketsSC-MT5" },
  { broker: "Zero Markets", server: "ZeroMarkets-Server" },
  { broker: "Vantage", server: "VantageInternational-Live" },
];

export type AccountKindId = "real" | "demo";

export const accountKinds: readonly { id: AccountKindId; title: string; description: string }[] = [
  { id: "real", title: "Conta Real", description: "Conta de trading real com dinheiro real" },
  { id: "demo", title: "Conta Demo", description: "Conta de demonstração para testes" },
];

export function connectionTypeFor(id: PlatformLogoKey) {
  return id === "mt4" || id === "mt5" ? "API Oficial (MetaQuotes)" : "API Oficial";
}

export type AddAccountStep = { id: number; title: string; description: string };

export const addAccountSteps: readonly AddAccountStep[] = [
  { id: 1, title: "Plataforma", description: "Escolha a plataforma" },
  { id: 2, title: "Credenciais", description: "Dados de acesso" },
  { id: 3, title: "Configurações", description: "Configurações da conta" },
  { id: 4, title: "Risco", description: "Gestão de risco" },
  { id: 5, title: "Teste de Conexão", description: "Verificar conexão" },
];

export type CredentialsValues = { login: string; server: string; kind: AccountKindId };

export const defaultCredentials: CredentialsValues = { login: "12345678", server: serverExamples[0].server, kind: "real" };

export const accountEnvironments: readonly { id: AccountKindId; label: string }[] = [
  { id: "real", label: "Real (Live)" },
  { id: "demo", label: "Demo" },
];

export const accountCurrencies: readonly { code: string; label: string }[] = [
  { code: "USD", label: "USD - Dólar Americano" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - Libra Esterlina" },
  { code: "BRL", label: "BRL - Real Brasileiro" },
];

export const accountLeverages: readonly string[] = ["1:30", "1:50", "1:100", "1:200", "1:500", "1:1000"];

export const executionTypes: readonly string[] = ["Market Execution", "Instant Execution", "Request Execution", "Exchange Execution"];

export const accountTimezones: readonly string[] = ["GMT+3 (Padrão MT5)", "GMT+2", "GMT+0 (UTC)", "GMT-3 (Brasília)"];

export const operatingHours: readonly string[] = [
  "Sempre ativo (24 horas)",
  "Sessão de Londres (08:00 - 17:00)",
  "Sessão de Nova York (13:00 - 22:00)",
  "Sessão da Ásia (00:00 - 09:00)",
];

export type AccountSettings = {
  name: string;
  environment: AccountKindId;
  currency: string;
  leverage: string;
  executionType: string;
  slippage: string;
  magicNumber: string;
  comment: string;
  timezone: string;
  hours: string;
};

export const defaultAccountSettings: AccountSettings = {
  name: "FundedNext 100K",
  environment: "real",
  currency: "USD",
  leverage: "1:100",
  executionType: "Market Execution",
  slippage: "5",
  magicNumber: "26021001",
  comment: "Copytrix",
  timezone: "GMT+3 (Padrão MT5)",
  hours: "Sempre ativo (24 horas)",
};

export type LotMethodId = "balance" | "equity" | "fixed";

export const lotMethods: readonly { id: LotMethodId; title: string; description: string }[] = [
  { id: "balance", title: "Risco em % do Saldo", description: "Calcula o lote com base em um percentual do saldo atual da conta." },
  { id: "equity", title: "Risco em % da Equidade", description: "Calcula o lote com base em um percentual da equidade atual da conta." },
  { id: "fixed", title: "Lote Fixo", description: "Utiliza um lote fixo em todas as operações." },
];

export type SltpModeId = "signal" | "fixedSl" | "fixed";

export const sltpModes: readonly { id: SltpModeId; title: string; description: string }[] = [
  { id: "signal", title: "Usar SL/TP do Signal", description: "Copia exatamente os níveis enviados no sinal." },
  { id: "fixedSl", title: "SL Fixo + TP do Signal", description: "Utiliza um SL fixo e o TP do sinal." },
  { id: "fixed", title: "SL/TP Fixos", description: "Utiliza SL e TP fixos definidos aqui." },
];

export const riskPresets: readonly number[] = [0.25, 0.5, 1, 2, 3];

export type RiskSettings = {
  method: LotMethodId;
  riskPercent: string;
  defaultSl: string;
  minLot: string;
  maxLot: string;
  maxTrades: string;
  maxAssetExposure: string;
  maxTotalExposure: string;
  sltpMode: SltpModeId;
};

export const defaultRiskSettings: RiskSettings = {
  method: "balance",
  riskPercent: "1.00",
  defaultSl: "5",
  minLot: "0.01",
  maxLot: "1.00",
  maxTrades: "5",
  maxAssetExposure: "3.00",
  maxTotalExposure: "5.00",
  sltpMode: "signal",
};

export const demoAccountBalance = 102450;
export const dailyDrawdownPercent = 3;
export const totalDrawdownPercent = 6;

export function toNumber(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatMoney(value: number): string {
  return `$ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function estimateLot({ riskPercent, balance, stopLoss, minLot, maxLot }: { riskPercent: number; balance: number; stopLoss: number; minLot: number; maxLot: number }): number {
  const safeStop = stopLoss > 0 ? stopLoss : 5;
  const raw = riskPercent * 0.1 * (balance / demoAccountBalance) * (5 / safeStop);
  const upper = maxLot > 0 ? maxLot : raw;
  return Math.round(Math.min(Math.max(raw, minLot), upper) * 100) / 100;
}
