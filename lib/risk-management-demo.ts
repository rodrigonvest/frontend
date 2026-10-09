export type RiskConfig = {
  perTrade: number;
  daily: number;
  weekly: number;
  drawdown: number;
  exposure: number;
  pauseDaily: boolean;
  pauseWeekly: boolean;
  pauseDrawdown: boolean;
  closeAll: boolean;
  lotMode: string;
  slPips: number;
  leverage: string;
  minLot: number;
  maxLot: number;
  atr: boolean;
  reduceCorrelation: boolean;
  multiplier: number;
  fixedLot: number;
  maxSpread: number;
  maxDistance: number;
  hours: string;
  avoidNews: boolean;
  pauseVolatility: boolean;
  correlationFilter: boolean;
  maxOps: number;
  minGapSeconds: number;
};

export const initialRiskConfig: RiskConfig = {
  perTrade: 1.0,
  daily: 3.0,
  weekly: 6.0,
  drawdown: 10.0,
  exposure: 50.0,
  pauseDaily: true,
  pauseWeekly: true,
  pauseDrawdown: true,
  closeAll: false,
  lotMode: "Percentual do Saldo",
  slPips: 20,
  leverage: "1:100",
  minLot: 0.01,
  maxLot: 5.0,
  atr: true,
  reduceCorrelation: true,
  multiplier: 1.0,
  fixedLot: 0.01,
  maxSpread: 0.6,
  maxDistance: 5.0,
  hours: "09:00 - 23:00",
  avoidNews: true,
  pauseVolatility: true,
  correlationFilter: true,
  maxOps: 5,
  minGapSeconds: 30,
};

export type RiskProfileId = "conservador" | "moderado" | "agressivo";

export const riskProfiles: Record<RiskProfileId, { label: string; limits: Pick<RiskConfig, "perTrade" | "daily" | "weekly" | "drawdown" | "exposure"> }> = {
  conservador: { label: "Conservador", limits: { perTrade: 1.0, daily: 3.0, weekly: 6.0, drawdown: 10.0, exposure: 50.0 } },
  moderado: { label: "Moderado", limits: { perTrade: 1.5, daily: 4.0, weekly: 8.0, drawdown: 15.0, exposure: 70.0 } },
  agressivo: { label: "Agressivo", limits: { perTrade: 2.5, daily: 6.0, weekly: 12.0, drawdown: 20.0, exposure: 100.0 } },
};

export function matchProfile(config: RiskConfig): RiskProfileId | "custom" {
  const found = (Object.keys(riskProfiles) as RiskProfileId[]).find((id) => {
    const limits = riskProfiles[id].limits;
    return limits.perTrade === config.perTrade && limits.daily === config.daily && limits.weekly === config.weekly && limits.drawdown === config.drawdown && limits.exposure === config.exposure;
  });
  return found ?? "custom";
}

export const LOT_MODES = ["Percentual do Saldo", "Percentual da Equidade", "Lote Fixo"];
export const LEVERAGES = ["1:30", "1:50", "1:100", "1:200", "1:500"];

export const capital = 48732.5;

export const riskUsed = { daily: 585.4, weekly: 1360.2, drawdown: 2001.5 };

export type ExposureRow = { symbol: string; side: "Buy" | "Sell"; lots: number; amount: number; color: string };

export const exposureRows: ExposureRow[] = [
  { symbol: "XAUUSD", side: "Buy", lots: 1.2, amount: 12480, color: "#f6b73c" },
  { symbol: "US100", side: "Buy", lots: 0.8, amount: 8240, color: "#159af2" },
  { symbol: "XAGUSD", side: "Sell", lots: 0.5, amount: 2150, color: "#7c5cff" },
  { symbol: "US500", side: "Buy", lots: 0.3, amount: 1860, color: "#ff4f9a" },
  { symbol: "EURUSD", side: "Buy", lots: 0.2, amount: 440, color: "#12d99e" },
];

export const correlationSymbols = ["XAUUSD", "XAGUSD", "US100", "US500", "EURUSD"];

export const correlationMatrix: number[][] = [
  [1.0, 0.82, 0.45, 0.38, -0.12],
  [0.82, 1.0, 0.41, 0.35, -0.1],
  [0.45, 0.41, 1.0, 0.87, -0.25],
  [0.38, 0.35, 0.87, 1.0, -0.22],
  [-0.12, -0.1, -0.25, -0.22, 1.0],
];

export const HIGH_CORRELATION = 0.8;

export type CustomRule = { id: string; label: string; help: string; checked: boolean };

export const initialRules: CustomRule[] = [
  { id: "news", label: "Bloquear operações durante notícias (NFP, CPI, FOMC)", help: "Não abre novas operações na janela dos principais eventos macroeconômicos.", checked: true },
  { id: "impact", label: "Reduzir risco em dias de alto impacto", help: "Diminui o risco por operação em dias com agenda de alto impacto.", checked: true },
  { id: "eod", label: "Fechar todas as posições no fim do dia", help: "Encerra posições abertas antes do fechamento da sessão.", checked: false },
  { id: "trend", label: "Não operar contra a tendência principal", help: "Ignora sinais contrários à tendência do timeframe maior.", checked: true },
  { id: "trailing", label: "Usar trailing stop automático", help: "Move o stop loss conforme a operação evolui a favor.", checked: true },
];

export type SimulatorInputs = { balance: number; riskPct: number; slPips: number; pipValue: number };

export const initialSimulator: SimulatorInputs = { balance: 50000, riskPct: 1.0, slPips: 20, pipValue: 10 };

export const NOTIONAL_PER_LOT = 20700;

export type SimulatorResult = { lot: number; pipValue: number; riskAmount: number; exposure: number; exposurePct: number };

export const initialSimulatorResult: SimulatorResult = calcPositionSize(initialSimulator);

export function calcPositionSize(inputs: SimulatorInputs): SimulatorResult {
  const riskAmount = (inputs.balance * inputs.riskPct) / 100;
  const denominator = inputs.slPips * inputs.pipValue;
  const lot = denominator > 0 ? Math.round((riskAmount / denominator) * 100) / 100 : 0;
  const exposure = lot * NOTIONAL_PER_LOT;
  return {
    lot,
    pipValue: lot * inputs.pipValue,
    riskAmount,
    exposure,
    exposurePct: inputs.balance > 0 ? Math.round((exposure / inputs.balance) * 1000) / 10 : 0,
  };
}

export function maxLotByExposure(balance: number, exposureLimitPct: number): number {
  if (balance <= 0 || exposureLimitPct <= 0) return 0;
  const maxExposure = (balance * exposureLimitPct) / 100;
  return Math.floor((maxExposure / NOTIONAL_PER_LOT) * 100 + 1e-9) / 100;
}

export const lossStreaks = [5, 10, 15, 20];

export type RiskEvent = { when: string; type: "Limite" | "Bloqueio" | "Ajuste" | "Alerta"; detail: string; account: string };

export const riskHistory: RiskEvent[] = [
  { when: "09/10/2026 14:32", type: "Alerta", detail: "Exposição total em 51.7%, acima do limite de 50.0%.", account: "Todas as contas" },
  { when: "09/10/2026 12:05", type: "Ajuste", detail: "Lote reduzido em 20% por correlação alta entre US100 e US500.", account: "Prop Firm 100K" },
  { when: "09/10/2026 10:00", type: "Bloqueio", detail: "Operação bloqueada: janela de notícias (CPI).", account: "Prop Firm 200K" },
  { when: "08/10/2026 17:48", type: "Limite", detail: "Risco diário em 2.4% de 3.0%.", account: "OANDA Live" },
  { when: "08/10/2026 09:12", type: "Ajuste", detail: "Perfil de risco alterado para Conservador.", account: "Todas as contas" },
  { when: "07/10/2026 21:30", type: "Bloqueio", detail: "Spread de 0.82 pips acima do máximo de 0.60 pips.", account: "TradeLocker Live" },
  { when: "07/10/2026 15:21", type: "Limite", detail: "Risco semanal em 4.9% de 6.0%.", account: "Conta Pessoal" },
];
