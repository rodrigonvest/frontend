import type { TradeRecord } from "../../lib/api";

const path = [[10,110],[35,124],[58,100],[80,143],[105,119],[127,158],[151,143],[176,178],[199,171],[221,192],[244,220],[267,207],[289,174],[310,164],[334,181],[358,158],[381,149],[404,161],[426,142],[450,151],[475,130],[498,140],[520,122],[546,129],[570,111],[593,124],[616,106],[640,119],[665,95],[692,111],[715,92]];

export default function TradeChart({ trade }: { trade: TradeRecord }) {
  return (
    <div className="relative h-[260px] overflow-hidden bg-[#071522]">
      <svg
        viewBox="0 0 720 255"
        className="absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Ilustração de níveis da operação ${trade.symbol}: stop loss, entrada e take profit. Não representa preços históricos reais.`}
      >
        {[48, 88, 128, 168, 208].map((y) => <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="#153149" strokeWidth="1" />)}
        {[80, 160, 240, 320, 400, 480, 560, 640].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="255" stroke="#112b41" strokeWidth="1" />)}
        <line x1="0" y1="67" x2="720" y2="67" stroke="#ff5d6d" strokeWidth="1.5" strokeDasharray="7 5" />
        <line x1="0" y1="130" x2="720" y2="130" stroke="#37b9ff" strokeWidth="1.5" strokeDasharray="7 5" />
        <line x1="0" y1="176" x2="720" y2="176" stroke="#19d6a0" strokeWidth="1.5" strokeDasharray="7 5" />
        <polyline points={path.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke="#4f6b85" strokeWidth="2" />
      </svg>
      <div className="absolute right-3 top-[44px] flex flex-col gap-[38px] text-[11px] font-medium tabular">
        <span className="rounded-md border border-danger/50 bg-danger-soft px-2 py-1 text-danger">SL {trade.stop_loss ?? "—"}</span>
        <span className="rounded-md border border-brand/50 bg-brand-soft px-2 py-1 text-[#5cc2ff]">Entrada {trade.entry_price ?? "—"}</span>
        <span className="rounded-md border border-success/50 bg-success-soft px-2 py-1 text-success">TP {trade.take_profit ?? "—"}</span>
      </div>
      <p className="absolute bottom-3 left-4 right-4 text-[11px] text-fg-subtle">
        Visualização ilustrativa dos níveis. O histórico de preços não é fornecido pela API.
      </p>
    </div>
  );
}
