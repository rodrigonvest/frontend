import { RISK } from "../../lib/copytrix-ai-data";
import { CheckItem, Panel } from "./AiPrimitives";

function RiskGauge({ value, max }: { value: number; max: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * (240 / 360);
  return (
    <div className="relative size-[156px] shrink-0">
      <svg viewBox="0 0 140 140" className="size-full" role="img" aria-label={`${RISK.label}: ${value}% de risco atual da conta`}>
        <defs>
          <linearGradient id="ai-risk-gauge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#12d99e" />
            <stop offset="100%" stopColor="#1bb5e9" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#16314a" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} transform="rotate(150 70 70)" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#ai-risk-gauge)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(arc * value) / max} ${circumference}`}
          transform="rotate(150 70 70)"
        />
      </svg>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-[13px] font-semibold text-success">{RISK.label}</span>
        <span className="tabular text-[28px] font-semibold leading-tight tracking-tight text-fg">{value.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default function RiskPanel() {
  return (
    <Panel title="Gestão de Risco Inteligente" icon="shield">
      <div className="grid items-center gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col items-center">
          <RiskGauge value={RISK.value} max={RISK.max} />
          <p className="-mt-3 text-[12.5px] text-fg-muted">{RISK.caption}</p>
        </div>
        <ul className="space-y-2.5 rounded-lg border border-line bg-canvas/40 p-3.5">
          {RISK.checks.map((check) => (
            <CheckItem key={check}>{check}</CheckItem>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
