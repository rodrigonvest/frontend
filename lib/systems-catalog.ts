export type SystemLogoKey =
  | "telegram"
  | "tradingview"
  | "mt4"
  | "mt5"
  | "ninjatrader"
  | "tradovate"
  | "tradelocker"
  | "oanda"
  | "binance"
  | "matchtrader"
  | "dxtrade";

export type SystemSourceId = "telegram" | "tradingview" | "mt4" | "mt5" | "ninjatrader" | "tradovate";

export type SystemDestinationId =
  | "mt4"
  | "mt5"
  | "ninjatrader"
  | "tradovate"
  | "tradelocker"
  | "oanda"
  | "binancefutures"
  | "matchtrader"
  | "dxtrade";

export type SystemRouteStatus = "active" | "paused" | "inactive";

export type SystemSource = {
  id: SystemSourceId;
  label: string;
  logo: SystemLogoKey;
  groupDescription: string;
};

export type SystemDestination = {
  id: SystemDestinationId;
  label: string;
  shortLabel: string;
  logo: SystemLogoKey;
};

export type SystemRoute = {
  routeId: string;
  source: SystemSourceId;
  destination: SystemDestinationId;
  name: string;
  description: string;
  status: SystemRouteStatus;
  icon: { source: SystemLogoKey; destination: SystemLogoKey };
};

export const SYSTEM_SOURCES: readonly SystemSource[] = [
  { id: "telegram", label: "Telegram", logo: "telegram", groupDescription: "Copie sinais de canais do Telegram para sua plataforma de destino" },
  { id: "tradingview", label: "TradingView", logo: "tradingview", groupDescription: "Execute alertas do TradingView para sua plataforma de destino" },
  { id: "mt4", label: "MT4", logo: "mt4", groupDescription: "Copie operações do MT4 para sua plataforma de destino" },
  { id: "mt5", label: "MT5", logo: "mt5", groupDescription: "Copie operações do MT5 para sua plataforma de destino" },
  { id: "ninjatrader", label: "NinjaTrader", logo: "ninjatrader", groupDescription: "Copie operações do NinjaTrader para sua plataforma de destino" },
  { id: "tradovate", label: "Tradovate", logo: "tradovate", groupDescription: "Copie operações do Tradovate para sua plataforma de destino" },
];

export const SYSTEM_DESTINATIONS: readonly SystemDestination[] = [
  { id: "mt4", label: "MT4", shortLabel: "MT4", logo: "mt4" },
  { id: "mt5", label: "MT5", shortLabel: "MT5", logo: "mt5" },
  { id: "ninjatrader", label: "NinjaTrader", shortLabel: "NinjaTrader", logo: "ninjatrader" },
  { id: "tradovate", label: "Tradovate", shortLabel: "Tradovate", logo: "tradovate" },
  { id: "tradelocker", label: "TradeLocker", shortLabel: "TradeLocker", logo: "tradelocker" },
  { id: "oanda", label: "OANDA", shortLabel: "OANDA", logo: "oanda" },
  { id: "binancefutures", label: "Binance Futures", shortLabel: "Binance", logo: "binance" },
  { id: "matchtrader", label: "MatchTrader", shortLabel: "MatchTrader", logo: "matchtrader" },
  { id: "dxtrade", label: "DXTrade", shortLabel: "DXTrade", logo: "dxtrade" },
];

const sourceById = new Map(SYSTEM_SOURCES.map((s) => [s.id, s]));
const destinationById = new Map(SYSTEM_DESTINATIONS.map((d) => [d.id, d]));

function describe(source: SystemSource, destination: SystemDestination) {
  if (source.id === "telegram") return `Copie sinais do Telegram para ${destination.label}`;
  if (source.id === "tradingview") return `Execute alertas do TradingView para ${destination.label}`;
  return `Copie operações do ${source.label} para ${destination.label}`;
}

function route(sourceId: SystemSourceId, destinationId: SystemDestinationId): SystemRoute {
  const source = sourceById.get(sourceId)!;
  const destination = destinationById.get(destinationId)!;
  return {
    routeId: `${sourceId}-to-${destinationId}`,
    source: sourceId,
    destination: destinationId,
    name: `${source.label} → ${destination.label}`,
    description: describe(source, destination),
    status: "active",
    icon: { source: source.logo, destination: destination.logo },
  };
}

export const SYSTEM_ROUTES: readonly SystemRoute[] = [
  route("telegram", "mt4"),
  route("telegram", "mt5"),
  route("telegram", "ninjatrader"),
  route("telegram", "tradovate"),
  route("telegram", "tradelocker"),
  route("telegram", "oanda"),
  route("telegram", "binancefutures"),
  route("telegram", "matchtrader"),
  route("telegram", "dxtrade"),

  route("tradingview", "mt4"),
  route("tradingview", "mt5"),
  route("tradingview", "ninjatrader"),
  route("tradingview", "tradovate"),
  route("tradingview", "tradelocker"),
  route("tradingview", "oanda"),
  route("tradingview", "binancefutures"),
  route("tradingview", "matchtrader"),
  route("tradingview", "dxtrade"),

  route("mt4", "mt4"),
  route("mt4", "mt5"),
  route("mt4", "ninjatrader"),
  route("mt4", "tradovate"),
  route("mt4", "tradelocker"),
  route("mt4", "oanda"),
  route("mt4", "binancefutures"),
  route("mt4", "matchtrader"),
  route("mt4", "dxtrade"),

  route("mt5", "mt4"),
  route("mt5", "mt5"),
  route("mt5", "ninjatrader"),
  route("mt5", "tradovate"),
  route("mt5", "tradelocker"),
  route("mt5", "oanda"),
  route("mt5", "binancefutures"),
  route("mt5", "matchtrader"),
  route("mt5", "dxtrade"),

  route("ninjatrader", "mt4"),
  route("ninjatrader", "mt5"),
  route("ninjatrader", "ninjatrader"),
  route("ninjatrader", "tradovate"),
  route("ninjatrader", "tradelocker"),
  route("ninjatrader", "oanda"),
  route("ninjatrader", "binancefutures"),
  route("ninjatrader", "matchtrader"),
  route("ninjatrader", "dxtrade"),

  route("tradovate", "mt4"),
  route("tradovate", "mt5"),
  route("tradovate", "ninjatrader"),
  route("tradovate", "tradovate"),
  route("tradovate", "tradelocker"),
  route("tradovate", "oanda"),
  route("tradovate", "binancefutures"),
  route("tradovate", "matchtrader"),
  route("tradovate", "dxtrade"),
];

export function routesBySource(sourceId: SystemSourceId) {
  return SYSTEM_ROUTES.filter((r) => r.source === sourceId);
}

export function getRouteById(routeId: string) {
  return SYSTEM_ROUTES.find((r) => r.routeId === routeId);
}

export const SYSTEM_STATUS_LABEL: Record<SystemRouteStatus, string> = {
  active: "Ativo",
  paused: "Pausado",
  inactive: "Inativo",
};
