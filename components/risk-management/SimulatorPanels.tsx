"use client";
import { useEffect, useState } from "react";
import { cx } from "../UI";
import { money } from "../../lib/multi-account-demo";
import {
  calcPositionSize,
  initialSimulatorResult,
  lossStreaks,
  maxLotByExposure,
  type CustomRule,
  type SimulatorInputs,
  type SimulatorResult,
} from "../../lib/risk-management-demo";
import { NumberBox } from "../multi-account/MaPrimitives";
import { FieldRow, HelpTip, Panel } from "./RiskFields";

export function RiskSimulator({ inputs, exposureLimit, onChange }: { inputs: SimulatorInputs; exposureLimit: number; onChange: (patch: Partial<SimulatorInputs>) => void }) {
  const [result, setResult] = useState<SimulatorResult>(initialSimulatorResult);
  const [flash, setFlash] = useState(false);
  const exceedsExposure = result.exposurePct > exposureLimit;
  const maxAllowedLot = maxLotByExposure(inputs.balance, exposureLimit);
  const riskAmount = (inputs.balance * inputs.riskPct) / 100;

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(false), 900);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const calculate = () => {
    setResult(calcPositionSize(inputs));
    setFlash(true);
  };

  return (
    <Panel title="Simulador de Risco" icon="target">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-[280px] flex-1">
          <FieldRow label="Saldo da Conta" controlClass="w-[130px]">
            <div className="flex items-center gap-1.5">
              <span aria-hidden className="text-[13px] text-fg-muted">$</span>
              <NumberBox label="Saldo da Conta" value={inputs.balance} decimals={2} max={100000000} className="w-full" onChange={(v) => onChange({ balance: v })} />
            </div>
          </FieldRow>
          <FieldRow label="Risco por Operação" controlClass="w-[150px]">
            <div className="flex items-center gap-1.5">
              <NumberBox label="Risco por Operação" value={inputs.riskPct} decimals={1} max={100} suffix="%" className="w-[84px]" onChange={(v) => onChange({ riskPct: Math.round(v * 10) / 10 })} />
              <span className="tabular whitespace-nowrap text-[12px] text-fg-muted">({money(riskAmount)})</span>
            </div>
          </FieldRow>
          <FieldRow label="SL Padrão" controlClass="w-[130px]">
            <NumberBox label="SL Padrão" value={inputs.slPips} decimals={0} suffix="pips" onChange={(v) => onChange({ slPips: Math.round(v) })} />
          </FieldRow>
          <FieldRow label="Valor por Pip (1 Lote)" controlClass="w-[130px]">
            <div className="flex items-center gap-1.5">
              <span aria-hidden className="text-[13px] text-fg-muted">$</span>
              <NumberBox label="Valor por Pip (1 Lote)" value={inputs.pipValue} decimals={2} className="w-full" onChange={(v) => onChange({ pipValue: v })} />
            </div>
          </FieldRow>
        </div>

        <div className="min-w-[190px] flex-1 rounded-lg border border-brand-strong/60 bg-gradient-to-b from-brand-strong/25 to-brand-soft/30 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[12px] text-fg-muted">Lote Sugerido</div>
              <div aria-live="polite" className={cx("tabular text-[30px] font-semibold leading-tight transition-colors duration-500", flash ? "text-success" : "text-fg")}>
                {result.lot.toFixed(2)}
              </div>
            </div>
            <button
              type="button"
              onClick={calculate}
              className="inline-flex h-8 items-center rounded-md border border-brand bg-brand-strong px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Calcular
            </button>
          </div>
          <dl className="tabular mt-2 space-y-1 text-[12px] text-fg-muted">
            <div className="flex justify-between gap-2"><dt>Valor por Pip:</dt><dd className="text-fg">{money(result.pipValue)}</dd></div>
            <div className="flex justify-between gap-2"><dt>Risco da Operação:</dt><dd className="text-fg">{money(result.riskAmount)}</dd></div>
            <div className="flex justify-between gap-2"><dt>Exposição Calculada:</dt><dd className={cx(exceedsExposure ? "text-danger" : "text-fg")}>{money(result.exposure)} ({result.exposurePct.toFixed(1)}%)</dd></div>
            <div className="flex justify-between gap-2"><dt>Limite de Exposição:</dt><dd className="text-fg">{exposureLimit.toFixed(1)}%</dd></div>
            <div className="flex justify-between gap-2"><dt>Lote Calculado:</dt><dd className="text-fg">{result.lot.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-2"><dt>Lote Máximo Permitido:</dt><dd className="text-fg">{maxAllowedLot.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-2">
              <dt>Status:</dt>
              <dd className={cx("font-medium", exceedsExposure ? "text-danger" : "text-success")}>
                {exceedsExposure ? "Excede limite de exposição" : "Dentro do limite"}
              </dd>
            </div>
          </dl>
          {exceedsExposure && (
            <div role="alert" className="mt-2.5 rounded-md border border-danger/50 bg-danger/15 px-2.5 py-2 text-[12px] leading-4 text-danger">
              <span aria-hidden>⚠ </span>
              Excede o limite de exposição de {exposureLimit.toFixed(0)}%. O lote calculado ({result.lot.toFixed(2)}) ultrapassa o máximo permitido ({maxAllowedLot.toFixed(2)}).
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

export function LossScenarios({ balance, riskAmount, weeklyLimit, drawdownLimit }: { balance: number; riskAmount: number; weeklyLimit: number; drawdownLimit: number }) {
  return (
    <Panel title="Cenários de Perda Consecutiva" icon="trendDown">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[12px] text-fg-subtle">
            <th scope="col" className="px-2.5 py-1.5 font-normal">Perdas Seguidas</th>
            <th scope="col" className="px-2.5 py-1.5 text-right font-normal">Perda Total ($)</th>
            <th scope="col" className="px-2.5 py-1.5 text-right font-normal">Perda Total (%)</th>
          </tr>
        </thead>
        <tbody>
          {lossStreaks.map((streak) => {
            const loss = streak * riskAmount;
            const pct = balance > 0 ? (loss / balance) * 100 : 0;
            const critical = pct >= drawdownLimit * 2;
            const high = pct >= drawdownLimit;
            const elevated = pct >= weeklyLimit;
            return (
              <tr
                key={streak}
                className={cx(
                  "border-t border-line/60 align-middle",
                  critical && "bg-danger/20",
                  high ? "text-danger" : elevated ? "text-warning" : "text-fg",
                  (high || critical) && "font-medium",
                )}
              >
                <th scope="row" className="tabular px-2.5 py-2 text-left font-normal">
                  {streak}
                  {critical && <span className="sr-only"> (risco crítico)</span>}
                  {!critical && high && <span className="sr-only"> (acima do drawdown máximo)</span>}
                  {!high && elevated && <span className="sr-only"> (acima do limite semanal)</span>}
                </th>
                <td className="tabular px-2.5 py-2 text-right">{money(loss)}</td>
                <td className="tabular px-2.5 py-2 text-right">{pct.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] leading-4 text-fg-subtle">
        Amarelo: acima do limite semanal ({weeklyLimit.toFixed(1)}%). Vermelho: acima do drawdown máximo ({drawdownLimit.toFixed(1)}%). Fundo vermelho: o dobro do drawdown.
      </p>
    </Panel>
  );
}

export function CustomRules({ rules, onToggle }: { rules: CustomRule[]; onToggle: (id: string) => void }) {
  return (
    <Panel title="Regras Personalizadas" icon="clipboard">
      <ul className="space-y-1">
        {rules.map((rule) => (
          <li key={rule.id} className="flex min-h-9 items-center gap-2">
            <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-[13px] leading-4 text-fg">
              <input
                type="checkbox"
                checked={rule.checked}
                onChange={() => onToggle(rule.id)}
                className="size-4 shrink-0 cursor-pointer rounded accent-[#159af2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              />
              <span>{rule.label}</span>
            </label>
            <HelpTip text={rule.help} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
