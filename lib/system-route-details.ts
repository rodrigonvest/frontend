import {
  SYSTEM_DESTINATIONS,
  SYSTEM_SOURCES,
  type SystemDestinationId,
  type SystemLogoKey,
  type SystemRoute,
  type SystemSourceId,
} from "./systems-catalog";

export type Tone = "success" | "danger" | "muted";

export type PlatformInfo = {
  label: string;
  logo: SystemLogoKey;
  connected: boolean;
  detail: string;
  url: string;
};

export type RouteTrade = {
  time: string;
  symbol: string;
  side: "Buy" | "Sell";
  entry: string;
  exit: string;
  pips: string;
  r: string;
  tone: Tone;
};

export type RouteLog = {
  time: string;
  event: string;
  message: string;
  tone: "success" | "brand" | "warning" | "muted";
};

export type RouteDetails = {
  headline: string;
  description: string;
  source: PlatformInfo;
  destination: PlatformInfo;
  account: string;
  createdAt: string;
  lastActivity: string;
  signalType: string;
  mainSymbol: string;
  unit: string;
  lastSignal: { symbol: string; side: "BUY" | "SELL"; ago: string };
  automationRows: Array<{ label: string; value: string; symbol?: boolean }>;
  specifics: Array<{ label: string; value: string; kind?: "text" | "toggle"; on?: boolean }>;
  risk: Array<{ label: string; value: string; unit?: string; kind?: "text" | "toggle"; on?: boolean; extra?: string }>;
  partialTps: Array<{ label: string; value: string }>;
  entryRules: string[];
  linkedAccounts: Array<{ name: string; active: boolean; main: boolean }>;
  trades: RouteTrade[];
  logs: RouteLog[];
  signalWindow: string;
};

const ACCOUNT_BY_DESTINATION: Record<SystemDestinationId, string[]> = {
  mt4: ["Hantec - Instant Lite", "FundedNext - Stellar 50k", "Zero Markets - Real", "Pepperstone - Demo"],
  mt5: ["Hantec - MT5 Live", "FTMO - Challenge 100k", "IC Markets - Raw", "Pepperstone - Demo"],
  ninjatrader: ["NinjaTrader Live - Sim101", "Apex - PA 50k", "Topstep - Combine 100k", "NinjaTrader - Sim102"],
  tradovate: ["Tradovate - Live", "Apex - PA 100k", "Topstep - Express", "Tradovate - Demo"],
  tradelocker: ["TradeLocker - Live", "Funding Pips - 50k", "GOAT Funded - 25k", "TradeLocker - Demo"],
  oanda: ["OANDA - Live", "OANDA - Practice", "OANDA - Hedge", "OANDA - Demo"],
  binancefutures: ["Binance Futures - Main", "Binance Futures - Sub 1", "Binance Futures - Sub 2", "Binance Testnet"],
  matchtrader: ["MatchTrader - Live", "FundingPips - 100k", "Alpha Capital - 50k", "MatchTrader - Demo"],
  dxtrade: ["DXTrade - Live", "The5ers - 20k", "Lark Funding - 50k", "DXTrade - Demo"],
};

const SYMBOLS_BY_DESTINATION: Record<SystemDestinationId, { main: string; others: string[]; unit: string; filter: string }> = {
  mt4: { main: "XAUUSD", others: ["XAUUSD", "XAGUSD", "US100"], unit: "pips", filter: "XAUUSD, XAGUSD, US100" },
  mt5: { main: "XAUUSD", others: ["XAUUSD", "EURUSD", "GBPUSD"], unit: "pips", filter: "XAUUSD, EURUSD, GBPUSD" },
  ninjatrader: { main: "NQ", others: ["NQ", "ES", "MNQ"], unit: "pts", filter: "NQ, ES, MNQ" },
  tradovate: { main: "ES", others: ["ES", "NQ", "MES"], unit: "pts", filter: "ES, NQ, MES" },
  tradelocker: { main: "XAUUSD", others: ["XAUUSD", "EURUSD", "US30"], unit: "pips", filter: "XAUUSD, EURUSD, US30" },
  oanda: { main: "EUR_USD", others: ["EUR_USD", "XAU_USD", "GBP_JPY"], unit: "pips", filter: "EUR_USD, XAU_USD, GBP_JPY" },
  binancefutures: { main: "BTCUSDT", others: ["BTCUSDT", "ETHUSDT", "SOLUSDT"], unit: "pts", filter: "BTCUSDT, ETHUSDT, SOLUSDT" },
  matchtrader: { main: "XAUUSD", others: ["XAUUSD", "EURUSD", "NAS100"], unit: "pips", filter: "XAUUSD, EURUSD, NAS100" },
  dxtrade: { main: "EURUSD", others: ["EURUSD", "XAUUSD", "US30"], unit: "pips", filter: "EURUSD, XAUUSD, US30" },
};

const PRICE_BASE: Record<string, number> = {
  XAUUSD: 2642.15,
  XAGUSD: 30.125,
  US100: 21425.3,
  US30: 42110.5,
  NAS100: 20310.2,
  EURUSD: 1.0842,
  GBPUSD: 1.2931,
  EUR_USD: 1.0842,
  XAU_USD: 2642.15,
  GBP_JPY: 191.42,
  NQ: 21425.25,
  MNQ: 21425.25,
  ES: 5832.5,
  MES: 5832.5,
  BTCUSDT: 63120.4,
  ETHUSDT: 2610.8,
  SOLUSDT: 148.35,
};

const URL_BY_SOURCE: Record<SystemSourceId, string> = {
  telegram: "https://t.me/",
  tradingview: "https://www.tradingview.com/",
  mt4: "https://www.metatrader4.com/",
  mt5: "https://www.metatrader5.com/",
  ninjatrader: "https://ninjatrader.com/",
  tradovate: "https://www.tradovate.com/",
};

const URL_BY_DESTINATION: Record<SystemDestinationId, string> = {
  mt4: "https://www.metatrader4.com/",
  mt5: "https://www.metatrader5.com/",
  ninjatrader: "https://ninjatrader.com/",
  tradovate: "https://www.tradovate.com/",
  tradelocker: "https://tradelocker.com/",
  oanda: "https://www.oanda.com/",
  binancefutures: "https://www.binance.com/futures",
  matchtrader: "https://match-trader.com/",
  dxtrade: "https://dx.trade/",
};

const CHANNELS = ["KIM GOLD SECRET", "VIP Signals Pro", "Gold Scalpers Club", "FX Elite Room", "Futures Insiders", "Crypto Whales VIP"];

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

function decimalsFor(symbol: string) {
  const base = PRICE_BASE[symbol] ?? 100;
  if (base < 10) return 4;
  if (base < 100) return 3;
  return 2;
}

function formatPrice(symbol: string, value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimalsFor(symbol), maximumFractionDigits: decimalsFor(symbol) });
}

function buildTrades(route: SystemRoute, symbols: string[], unit: string): RouteTrade[] {
  const seed = hash(route.routeId);
  const times = ["10/09 14:32", "10/09 13:18", "10/09 11:05", "10/09 10:24", "09/09 21:45"];
  const sides: Array<"Buy" | "Sell"> = ["Buy", "Sell", "Buy", "Buy", "Sell"];
  const pipsList = [37.5, 21.0, -13.2, 25.0, -8.5];
  const rList = [1.5, 0.8, -1.0, 1.0, -0.6];

  return times.map((time, i) => {
    const symbol = symbols[(seed + i) % symbols.length];
    const base = PRICE_BASE[symbol] ?? 100;
    const entry = base * (1 + (((seed >> i) % 17) - 8) / 4000);
    const pips = pipsList[i];
    const scale = base < 10 ? 0.0001 : base < 100 ? 0.01 : 0.1;
    const exit = entry + (sides[i] === "Buy" ? 1 : -1) * pips * scale;
    return {
      time,
      symbol,
      side: sides[i],
      entry: formatPrice(symbol, entry),
      exit: formatPrice(symbol, exit),
      pips: `${pips > 0 ? "+" : ""}${pips.toFixed(1)} ${unit}`,
      r: `${rList[i] > 0 ? "+" : ""}${rList[i].toFixed(1)}R`,
      tone: pips >= 0 ? "success" : "danger",
    };
  });
}

function buildLogs(route: SystemRoute, trade: RouteTrade, sourceLabel: string, destLabel: string, channel: string): RouteLog[] {
  const ticket = 123000 + (hash(route.routeId) % 900);
  const origin = route.source === "telegram" ? `Telegram - ${channel}` : `${sourceLabel} - ${channel}`;
  const side = trade.side.toUpperCase();
  return [
    { time: "10/09 14:32:15", event: "Ordem executada", message: `${side} ${trade.symbol} 0.10 @ ${trade.entry} (Ticket ${ticket})`, tone: "success" },
    { time: "10/09 14:32:14", event: "Sinal processado", message: `${trade.symbol} ${side} - Entrada: ${trade.entry} | SL e TPs aplicados conforme regras`, tone: "brand" },
    { time: "10/09 14:32:12", event: "Validação de regras", message: "Spread: 0.32 pips | Distância: 1.2 pips | Válido", tone: "success" },
    { time: "10/09 14:32:10", event: "Sinal recebido", message: origin, tone: "warning" },
    { time: "10/09 13:18:05", event: "Ordem executada", message: `${trade.side === "Buy" ? "SELL" : "BUY"} ${trade.symbol} 0.10 @ ${trade.exit} em ${destLabel} (Ticket ${ticket - 1})`, tone: "success" },
  ];
}

export function getRouteDetails(route: SystemRoute): RouteDetails {
  const source = SYSTEM_SOURCES.find((s) => s.id === route.source)!;
  const destination = SYSTEM_DESTINATIONS.find((d) => d.id === route.destination)!;
  const accounts = ACCOUNT_BY_DESTINATION[route.destination];
  const symbols = SYMBOLS_BY_DESTINATION[route.destination];
  const seed = hash(route.routeId);
  const channel = CHANNELS[seed % CHANNELS.length];
  const isTelegram = route.source === "telegram";
  const isTradingView = route.source === "tradingview";
  const signalType = isTelegram ? "Sinais Manuais" : isTradingView ? "Alertas Webhook" : "Cópia de Operações";
  const format = isTelegram ? "Texto (Padrão)" : isTradingView ? "JSON (Webhook)" : "Eventos de Ordem";
  const originLabel = isTelegram ? channel : isTradingView ? "Alerta TradingView" : `Conta ${source.label}`;
  const trades = buildTrades(route, symbols.others, symbols.unit);
  const lastSide = trades[0].side.toUpperCase() as "BUY" | "SELL";

  return {
    headline: isTelegram
      ? `Recebe sinais do Telegram e executa automaticamente no ${destination.label}.`
      : isTradingView
        ? `Recebe alertas do TradingView e executa automaticamente no ${destination.label}.`
        : `Replica operações do ${source.label} automaticamente no ${destination.label}.`,
    description: route.description,
    source: {
      label: source.label,
      logo: source.logo,
      connected: true,
      detail: isTelegram ? `${channel}` : isTradingView ? "Webhook ativo" : `Conta ${source.label} vinculada`,
      url: URL_BY_SOURCE[route.source],
    },
    destination: {
      label: destination.label,
      logo: destination.logo,
      connected: true,
      detail: `Conta: ${accounts[0]}`,
      url: URL_BY_DESTINATION[route.destination],
    },
    account: accounts[0],
    createdAt: "10/06/2026 14:22",
    lastActivity: "Hoje, 10:24",
    signalType,
    mainSymbol: symbols.main,
    unit: symbols.unit,
    signalWindow: "10:00 - 23:00 (BRT)",
    lastSignal: { symbol: trades[0].symbol, side: lastSide, ago: "há 2 minutos" },
    automationRows: [
      { label: "Modo de Execução", value: "Tempo Real (Copier)" },
      { label: "Filtro de Símbolos", value: symbols.filter, symbol: true },
      { label: "Filtro de Horário", value: "10:00 - 23:00 (BRT)" },
      { label: "Distância Máx. de Entrada", value: `5.0 ${symbols.unit}` },
      { label: "Spread Máximo", value: `0.60 ${symbols.unit}` },
      { label: "Gerenciamento de Risco", value: "1.0% por operação" },
      { label: "Conta Padrão", value: accounts[0] },
    ],
    specifics: [
      { label: isTelegram ? "Canal de Origem" : "Origem", value: originLabel },
      { label: "Tipo de Sinais", value: signalType },
      { label: "Formato", value: format },
      { label: "Tipo de Ordem", value: "Market" },
      { label: "Slippage Máximo", value: "3 ticks" },
      { label: "Validade do Sinal", value: "5 minutos" },
      { label: "Múltiplas Posições", value: "Desligado", kind: "toggle", on: false },
      { label: "Fechar no Horário", value: "Desligado", kind: "toggle", on: false },
    ],
    risk: [
      { label: "Modo de Risco", value: "Percentual do Saldo" },
      { label: "Risco por Operação", value: "1.0", unit: "%" },
      { label: "Stop Loss Padrão", value: "20", unit: symbols.unit },
      { label: "Take Profit Padrão", value: "40", unit: symbols.unit },
      { label: "Risco Máximo Diário", value: "3.0", unit: "%" },
      { label: "Risco Máximo Semanal", value: "10.0", unit: "%" },
      { label: "Break Even", value: "Ligado", kind: "toggle", on: true, extra: `+20 ${symbols.unit}` },
      { label: "Trailing Stop", value: "Ligado", kind: "toggle", on: true, extra: `20 ${symbols.unit}` },
    ],
    partialTps: [
      { label: "TP1", value: "0.25R" },
      { label: "TP2", value: "0.50R" },
      { label: "TP3", value: "0.75R" },
      { label: "TP4", value: "1.00R" },
    ],
    entryRules: [
      "Executar apenas sinais com símbolo permitido",
      `Validar distância de entrada (≤ 5.0 ${symbols.unit})`,
      `Validar spread (≤ 0.60 ${symbols.unit})`,
      "Calcular volume por risco (1.0%)",
      "Definir SL e TPs conforme o sinal",
      `Mover SL para Break Even (+20 ${symbols.unit})`,
      "Fechar parcialmente conforme TPs",
      "Fechar no horário definido (se configurado)",
    ],
    linkedAccounts: accounts.map((name, i) => ({ name, active: i < 2, main: i === 0 })),
    trades,
    logs: buildLogs(route, trades[0], source.label, destination.label, channel),
  };
}

export function logsToCsv(logs: RouteLog[]) {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return ["Horario,Evento,Mensagem", ...logs.map((l) => [l.time, l.event, l.message].map(escape).join(","))].join("\n");
}
