"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { SIGNAL, SIGNAL_CHECKS, SIGNAL_SCORE } from "../../lib/copytrix-ai-data";
import { CheckItem, Panel } from "./AiPrimitives";
import SignalMiniChart from "./SignalMiniChart";

const fmt = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function ScoreRing({ score }: { score: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative size-[84px] shrink-0">
      <svg viewBox="0 0 84 84" className="size-full -rotate-90" role="img" aria-label={`Score da IA: ${score}%`}>
        <circle cx="42" cy="42" r={radius} fill="none" stroke="#073a33" strokeWidth="7" />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="#12d99e"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${(circumference * score) / 100} ${circumference}`}
        />
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center text-success">
        <Icon name="check" size={30} stroke={2.6} />
      </span>
    </div>
  );
}

export default function SignalAnalysisPanel({ onExecute }: { onExecute: () => void }) {
  const [executed, setExecuted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const execute = () => {
    onExecute();
    setExecuted(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setExecuted(false), 4000);
  };

  return (
    <Panel title="Análise de Sinal com IA" icon="crown">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-lg border border-line bg-canvas/40 p-3">
          <div className="flex items-center gap-2 text-[12.5px] text-fg-muted">
            <span aria-hidden className="flex size-6 items-center justify-center rounded-md bg-brand/20 text-brand">
              <Icon name="telegram" size={13} />
            </span>
            <h3 className="rounded bg-surface-3 px-2 py-0.5 font-medium text-fg">Sinal do Telegram</h3>
          </div>
          <dl className="tabular mt-2.5 space-y-0.5 text-[13px] leading-[1.45] text-fg">
            <div className="font-medium">
              {SIGNAL.asset} {SIGNAL.direction}
            </div>
            <div className="flex gap-1">
              <dt>Entrada:</dt>
              <dd>{fmt(SIGNAL.entry)}</dd>
            </div>
            <div className="flex gap-1">
              <dt>SL:</dt>
              <dd>
                {fmt(SIGNAL.sl)} ({SIGNAL.slPips} pips)
              </dd>
            </div>
            <div className="flex gap-1">
              <dt>TP1:</dt>
              <dd>{fmt(SIGNAL.tp1)}</dd>
            </div>
            <div className="flex gap-1">
              <dt>TP2:</dt>
              <dd>{fmt(SIGNAL.tp2)}</dd>
            </div>
            <div className="flex gap-1">
              <dt>TP3:</dt>
              <dd>{fmt(SIGNAL.tp3)}</dd>
            </div>
          </dl>
          <div className="mt-3 border-t border-line pt-3">
            <SignalMiniChart />
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-lg border border-success/50 bg-success/[.04] p-3.5">
          <h3 className="text-[13px] font-medium text-success">Análise da IA</h3>
          <div className="mt-3 flex items-center gap-3">
            <ScoreRing score={SIGNAL_SCORE} />
            <div>
              <p className="tabular text-[34px] font-semibold leading-none tracking-tight text-success">{SIGNAL_SCORE}%</p>
              <p className="mt-1.5 text-[12.5px] font-medium text-success">Alta Probabilidade</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5">
            {SIGNAL_CHECKS.map((check) => (
              <CheckItem key={check}>{check}</CheckItem>
            ))}
          </ul>
          <button
            type="button"
            onClick={execute}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-success px-4 text-[14px] font-semibold text-[#03261d] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success md:mt-auto"
          >
            {executed && <Icon name="check" size={16} stroke={2.6} />}
            {executed ? "Simulação concluída" : "Executar Sinal"}
          </button>
        </div>
      </div>
    </Panel>
  );
}
