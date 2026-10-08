import { buyMarkers, candleDomain, candles, chartHours, chartPriceTicks, sellMarkers } from "../../lib/backtest-demo";
import { Panel } from "./BacktestFields";

const W = 440;
const H = 226;
const plot = { left: 6, right: 384, top: 12, bottom: 198 };
const green = "#12d99e";
const red = "#ff4d5d";

const yOf = (price: number) => plot.top + ((candleDomain.max - price) / (candleDomain.max - candleDomain.min)) * (plot.bottom - plot.top);
const step = (plot.right - plot.left) / candles.length;
const xOf = (i: number) => plot.left + step * (i + 0.5);

export default function TradesChart() {
  return (
    <Panel title="Gráfico das Operações" className="flex flex-col">
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className="text-fg">XAUUSD - M1</span>
        <ul className="flex items-center gap-4 text-fg-muted">
          <li className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-full bg-success" />Compra (88)</li>
          <li className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-full bg-danger" />Venda (79)</li>
        </ul>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 h-auto w-full" role="img" aria-label="Gráfico de candles XAUUSD M1 com marcadores de compra e venda">
        {chartPriceTicks.map((p) => (
          <g key={p}>
            <line x1={plot.left} x2={plot.right} y1={yOf(p)} y2={yOf(p)} stroke="#17344b" strokeWidth="1" />
            <text x={plot.right + 8} y={yOf(p) + 4} fill="#b3c2d1" fontSize="11">{p.toFixed(2)}</text>
          </g>
        ))}
        {chartHours.map((h, i) => {
          const x = plot.left + ((plot.right - plot.left) / (chartHours.length - 1)) * i;
          return (
            <g key={h}>
              <line x1={x} x2={x} y1={plot.top} y2={plot.bottom} stroke="#122a3f" strokeWidth="1" />
              <text x={Math.min(Math.max(x, 18), plot.right - 14)} y={plot.bottom + 20} fill="#b3c2d1" fontSize="11" textAnchor="middle">{h}</text>
            </g>
          );
        })}
        {candles.map((c, i) => {
          const up = c.close >= c.open;
          const color = up ? green : red;
          const top = yOf(Math.max(c.open, c.close));
          const bodyH = Math.max(1.5, Math.abs(yOf(c.open) - yOf(c.close)));
          return (
            <g key={i}>
              <line x1={xOf(i)} x2={xOf(i)} y1={yOf(c.high)} y2={yOf(c.low)} stroke={color} strokeWidth="1" />
              <rect x={xOf(i) - step * 0.32} y={top} width={step * 0.64} height={bodyH} fill={color} />
            </g>
          );
        })}
        {buyMarkers.map((i) => {
          const x = xOf(i);
          const y = yOf(candles[i].low) + 4;
          return <path key={`b${i}`} d={`M${x} ${y} l5 9 h-10 Z`} fill={green} />;
        })}
        {sellMarkers.map((i) => {
          const x = xOf(i);
          const y = yOf(candles[i].high) - 4;
          return <path key={`s${i}`} d={`M${x} ${y} l5 -9 h-10 Z`} fill={red} />;
        })}
        <line x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.bottom} stroke="#40576b" />
        <line x1={plot.left} x2={plot.right} y1={plot.bottom} y2={plot.bottom} stroke="#40576b" />
      </svg>
    </Panel>
  );
}
