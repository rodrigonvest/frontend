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
