import { SIGNAL, buildSignalCandles } from "../../lib/copytrix-ai-data";

const W = 300;
const H = 192;
const PLOT_L = 4;
const PLOT_R = 252;
const CANDLE_AREA = 172;
const TOP = 8;
const BOTTOM = 172;
const MIN = 3598;
const MAX = 3652;
const GREEN = "#12d99e";
const RED = "#ff5d6d";

const y = (price: number) => TOP + ((MAX - price) / (MAX - MIN)) * (BOTTOM - TOP);
const fmt = (price: number) => price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const candles = buildSignalCandles();

const levels = [
  { key: "TP3", price: SIGNAL.tp3, line: GREEN, fill: "#0b7f5d" },
  { key: "TP2", price: SIGNAL.tp2, line: GREEN, fill: "#0b7f5d" },
  { key: "TP1", price: SIGNAL.tp1, line: GREEN, fill: "#0b7f5d" },
  { key: "Entrada", price: SIGNAL.entry, line: "#159af2", fill: "#087ff0" },
  { key: "SL", price: SIGNAL.sl, line: RED, fill: "#d93a4d" },
];

const ticks = [3600, 3610, 3620, 3630, 3640, 3650];
const timeLabels = ["14:00", "16:00", "18:00", "20:00"];

export default function SignalMiniChart() {
  const step = (CANDLE_AREA - PLOT_L) / candles.length;
  const bodyWidth = Math.max(2, step * 0.62);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Gráfico de candles do XAUUSD com os níveis de entrada, stop loss e take profits do sinal"
      className="block h-auto w-full"
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={PLOT_L} x2={PLOT_R} y1={y(tick)} y2={y(tick)} stroke="#18344b" strokeWidth="0.6" />
          <text x={PLOT_R + 5} y={y(tick) + 3} fontSize="8.5" fill="#8197ac">
            {fmt(tick)}
          </text>
        </g>
      ))}

      {candles.map((candle, index) => {
        const x = PLOT_L + index * step + step / 2;
        const up = candle.c >= candle.o;
        const color = up ? GREEN : RED;
        const top = y(Math.max(candle.o, candle.c));
        const height = Math.max(1, Math.abs(y(candle.o) - y(candle.c)));
        return (
          <g key={index}>
            <line x1={x} x2={x} y1={y(candle.h)} y2={y(candle.l)} stroke={color} strokeWidth="0.9" />
            <rect x={x - bodyWidth / 2} y={top} width={bodyWidth} height={height} fill={color} rx="0.4" />
          </g>
        );
      })}

      {levels.map((level) => {
        const label = `${level.key} (${fmt(level.price)})`;
        return (
          <g key={level.key}>
            <line x1={PLOT_L} x2={PLOT_R} y1={y(level.price)} y2={y(level.price)} stroke={level.line} strokeWidth="0.9" strokeDasharray="3 3" />
            <rect x={PLOT_R - 74} y={y(level.price) - 7} width="74" height="14" rx="2.5" fill={level.fill} />
            <text x={PLOT_R - 37} y={y(level.price) + 3} textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">
              {label}
            </text>
          </g>
        );
      })}

      {timeLabels.map((label, index) => (
        <text key={label} x={PLOT_L + 18 + index * 52} y={H - 8} fontSize="8.5" fill="#8197ac" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}
