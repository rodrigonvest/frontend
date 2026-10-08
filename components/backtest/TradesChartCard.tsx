import { candleAxis, candles, chartLegend, tradeMarkers } from "../../lib/backtest-presentation";
import { Panel } from "./Panel";

const { min, max } = candleAxis;
const pct = (price: number) => ((max - price) / (max - min)) * 100;
const WIDTH_PER_CANDLE = 10;

function Candles() {
  return (
    <svg
      viewBox={`0 0 ${candles.length * WIDTH_PER_CANDLE} 100`}
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const color = up ? "#12d99e" : "#ff3d4f";
        const cx = i * WIDTH_PER_CANDLE + WIDTH_PER_CANDLE / 2;
        const top = pct(Math.max(c.open, c.close));
        const height = Math.max(Math.abs(pct(c.open) - pct(c.close)), 0.7);
        return (
          <g key={i}>
            <line x1={cx} x2={cx} y1={pct(c.high)} y2={pct(c.low)} stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <rect x={cx - 3.1} y={top} width="6.2" height={height} fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

function Marker({ index, side }: { index: number; side: "BUY" | "SELL" }) {
  const candle = candles[index];
  const buy = side === "BUY";
  return (
    <span
      aria-hidden
      className="absolute -translate-x-1/2"
      style={{
        left: `${((index + 0.5) / candles.length) * 100}%`,
        top: buy ? `calc(${pct(candle.low)}% + 3px)` : `calc(${pct(candle.high)}% - 13px)`,
      }}
    >
      <svg width="10" height="9" viewBox="0 0 10 9" fill={buy ? "#12d99e" : "#ff3d4f"}>
        <path d={buy ? "M5 0 10 9H0Z" : "M0 0h10L5 9Z"} />
      </svg>
    </span>
  );
}

export default function TradesChartCard() {
  return (
    <Panel title="Gráfico das Operações" className="2xl:h-[287px]">
      <div className="mt-2.5 flex h-6 items-center justify-between gap-3">
        <span className="text-[12px] text-fg">{chartLegend.symbol}</span>
        <ul className="flex items-center gap-4 text-[12px] text-fg">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-full bg-success" />
            Compra ({chartLegend.buys})
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-full bg-[#ff3d4f]" />
            Venda ({chartLegend.sells})
          </li>
        </ul>
      </div>

      <div className="relative mt-1.5 h-[203px]" role="img" aria-label={`Gráfico de candles ${chartLegend.symbol} com marcadores de compra e venda`}>
        <div className="absolute inset-y-0 left-0 right-[62px]">
          {candleAxis.prices.map((p) => (
            <div key={p} aria-hidden className="absolute inset-x-0 border-t border-[#143049]" style={{ top: `${pct(p)}%` }} />
          ))}
          {candleAxis.times.map((t) => (
            <div key={t.label} aria-hidden className="absolute inset-y-0 border-l border-[#143049]/70" style={{ left: `${t.left}%` }} />
          ))}
          <Candles />
          {tradeMarkers.map((m) => (
            <Marker key={m.index} index={m.index} side={m.side} />
          ))}
          {candleAxis.times.map((t) => (
            <span
              key={t.label}
              aria-hidden
              className="absolute bottom-1 -translate-x-1/2 text-[11px] leading-[14px] text-fg-muted"
              style={{ left: `${t.left}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>

        <div aria-hidden className="absolute inset-y-0 right-0 w-[58px]">
          {candleAxis.prices.map((p) => (
            <span key={p} className="tabular absolute right-0 -translate-y-1/2 text-[12px] leading-[14px] text-fg-muted" style={{ top: `${pct(p)}%` }}>
              {p.toFixed(2)}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
