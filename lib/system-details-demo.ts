import type { SystemRoute } from "./systems-catalog";

export function getSystemDisplayName(route: SystemRoute) {
  return route.name;
}

export const systemKpis = [
  { id: "trades", label: "Total de Operações", value: "167", delta: "+12.8%", tone: "success" as const },
  { id: "winRate", label: "Taxa de Acerto", value: "52.7%", delta: "+3.6%", tone: "success" as const, progress: 52.7 },
  { id: "profit", label: "Lucro Líquido", value: "$ 4,187.50", delta: "+28.4%", tone: "success" as const },
  { id: "resultR", label: "Resultado em R", value: "70.17R", delta: "+15.2%", tone: "success" as const },
  { id: "drawdown", label: "Drawdown Máximo", value: "-12.10%", delta: "-4.3%", tone: "danger" as const },
];

export const equityRanges = ["M1", "M3", "M6", "YTD", "1A", "Tudo"] as const;
export type EquityRange = (typeof equityRanges)[number];
export const equityMax = 6000;
export const equityTicks = ["$6,000", "$4,500", "$3,000", "$1,500", "$0"];

const anchors: Array<[number, number]> = [
  [0, 0], [6, 150], [14, 420], [22, 640], [30, 980], [38, 1450], [44, 1900], [50, 2350],
  [54, 2200], [58, 2750], [62, 3050], [66, 3450], [69, 3900], [72, 4580],
];

function interpolate(day: number) {
  for (let i = 1; i < anchors.length; i++) {
    const [d1, v1] = anchors[i];
    if (day <= d1) {
      const [d0, v0] = anchors[i - 1];
      return v0 + ((v1 - v0) * (day - d0)) / (d1 - d0);
    }
  }
  return anchors[anchors.length - 1][1];
}

const START = Date.UTC(2026, 5, 21);
const DAY = 86_400_000;

export type EquityPoint = { day: number; value: number; label: string };

export const equityPoints: EquityPoint[] = Array.from({ length: 73 }, (_, day) => {
  const wobble = day === 0 || day === 72 ? 0 : Math.sin(day * 2.1) * 90 + Math.sin(day * 0.9) * 60;
  const d = new Date(START + day * DAY);
  return {
    day,
    value: Math.max(0, Math.round(interpolate(day) + wobble)),
    label: `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
  };
});

export const fullRangeLabelDays = [0, 10, 20, 30, 41, 51, 61, 72];

export const distribution = [
  { label: "<-1R", lines: ["<-1R"], count: 16, tone: "danger" as const },
  { label: "-1R a -0.5R", lines: ["-1R a", "-0.5R"], count: 12, tone: "danger" as const },
  { label: "-0.5R a 0R", lines: ["-0.5R a", "0R"], count: 24, tone: "danger" as const },
  { label: "0R a 0.5R", lines: ["0R a", "0.5R"], count: 38, tone: "success" as const },
  { label: "0.5R a 1R", lines: ["0.5R a", "1R"], count: 42, tone: "success" as const },
  { label: "1R a 2R", lines: ["1R a 2R"], count: 27, tone: "success" as const },
  { label: ">2R", lines: [">2R"], count: 8, tone: "muted" as const },
];
export const distributionMax = 44;
export const distributionTicks = [40, 30, 20, 10, 0];

export const monthlyRows = [
  { month: "Jun/26", trades: 27, winRate: "63.0%", profit: "$1,225.00", resultR: "16.50R" },
  { month: "Jul/26", trades: 45, winRate: "51.1%", profit: "$777.50", resultR: "14.80R" },
  { month: "Ago/26", trades: 73, winRate: "53.4%", profit: "$1,392.50", resultR: "27.22R" },
  { month: "Set/26", trades: 22, winRate: "50.0%", profit: "$792.50", resultR: "11.65R" },
];
export const monthlyTotal = { month: "Total", trades: 167, winRate: "52.7%", profit: "$4,187.50", resultR: "70.17R" };

export const assets = [
  { symbol: "XAUUSD", count: 156, share: "93.4%", color: "#f0b429" },
  { symbol: "XAGUSD", count: 5, share: "3.0%", color: "#9aa7b6" },
  { symbol: "US100", count: 3, share: "1.8%", color: "#1f8bff" },
  { symbol: "Outros", count: 3, share: "1.8%", color: "#a45cf2" },
];

