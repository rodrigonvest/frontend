"use client";

import { useId, useState, type ReactNode } from "react";
import {
  accountEnvironments,
  dailyDrawdownPercent,
  demoAccountBalance,
  estimateLot,
  formatMoney,
  lotMethods,
  toNumber,
  totalDrawdownPercent,
  type AccountSettings,
  type CredentialsValues,
  type RiskSettings,
  type TradingPlatform,
} from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import FieldIcon from "./FieldIcons";
import PlatformLogo from "./PlatformLogo";

const sanitizeDecimal = (value: string) => value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 py-[5px] sm:grid-cols-[24px_minmax(0,1fr)_minmax(0,1.1fr)]">
      <span aria-hidden className="hidden items-center justify-center text-brand sm:flex">
        {icon}
      </span>
      <dt className="text-[14.5px] text-fg-muted">{label}</dt>
      <dd className="min-w-0 break-words text-[14.5px] text-fg sm:text-right">{value}</dd>
    </div>
  );
}

function SimulatorField({
  id,
  label,
  unit,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[14.5px] leading-6 text-fg-muted">
        {label}
      </label>
      <div className="flex h-11 min-w-0 items-stretch overflow-hidden rounded-lg border border-line bg-canvas/60 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/60">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(sanitizeDecimal(e.target.value))}
          className="min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-fg outline-none"
        />
        <span className="flex min-w-14 shrink-0 items-center justify-center border-l border-line bg-surface-2/40 px-3 text-[14px] text-fg-muted">{unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-brand/30 bg-brand-soft/30 px-3 py-2.5">
      <p className={`truncate text-[13px] leading-5 ${tone === "text-success" ? "text-success" : "text-fg-muted"}`}>{label}</p>
      <p className={`mt-0.5 whitespace-nowrap text-[clamp(18px,1.5vw,24px)] font-semibold leading-8 tracking-tight ${tone}`}>{value}</p>
    </div>
  );
}

export default function RiskSummaryPanel({
  platform,
  credentials,
  settings,
  risk,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
  risk: RiskSettings;
}) {
  const uid = useId();
  const [simBalance, setSimBalance] = useState(String(demoAccountBalance));
  const [simStop, setSimStop] = useState("5");

  const riskPercent = toNumber(risk.riskPercent);
  const minLot = toNumber(risk.minLot);
  const maxLot = toNumber(risk.maxLot);
  const method = lotMethods.find((item) => item.id === risk.method) ?? lotMethods[0];
  const environmentSummary = accountEnvironments.find((item) => item.id === settings.environment)?.label ?? settings.environment;

  const riskUsd = (demoAccountBalance * riskPercent) / 100;
  const totalExposure = toNumber(risk.maxTotalExposure);
  const estimatedLot = estimateLot({ riskPercent, balance: demoAccountBalance, stopLoss: toNumber(risk.defaultSl), minLot, maxLot });

  const simBalanceValue = toNumber(simBalance);
  const simLot = estimateLot({ riskPercent, balance: simBalanceValue, stopLoss: toNumber(simStop), minLot, maxLot });
  const simRiskUsd = (simBalanceValue * riskPercent) / 100;
  const simPipValue = simLot * 20;

  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <section aria-labelledby="risk-account-title" className="flex items-center gap-4 rounded-xl border border-line bg-surface/70 px-4 py-3.5">
        <div className="flex size-[64px] shrink-0 items-center justify-center">
          <PlatformLogo logo={platform.id} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <h2 id="risk-account-title" className="text-[19px] font-semibold leading-7 tracking-tight text-fg">
              {platform.name} - {settings.name}
            </h2>
            <span className="inline-flex items-center rounded-md border border-success/40 bg-success-soft px-2.5 py-0.5 text-[12.5px] font-medium text-success">
              Conectado
            </span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[13.5px] leading-5 text-fg">
            <span>{environmentSummary}</span>
            <span aria-hidden className="h-3.5 w-px bg-line-strong" />
            <span>{settings.currency}</span>
            <span aria-hidden className="h-3.5 w-px bg-line-strong" />
            <span>{settings.leverage}</span>
            <span aria-hidden className="h-3.5 w-px bg-line-strong" />
            <span>{credentials.server}</span>
          </p>
        </div>
      </section>

      <section aria-labelledby="risk-summary-title" className="rounded-xl border border-line bg-surface/70 p-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success">
            <Icon name="shield" size={20} />
          </span>
          <h2 id="risk-summary-title" className="text-[18px] font-semibold leading-6 tracking-tight text-fg">
            Resumo do Risco
          </h2>
        </div>

        <dl className="mt-2.5">
          <SummaryRow icon={<FieldIcon name="sliders" size={18} />} label="Método de Cálculo" value={method.title} />
          <SummaryRow icon={<FieldIcon name="percent" size={18} />} label="Risco por Operação" value={`${riskPercent.toFixed(2)}%`} />
          <SummaryRow icon={<FieldIcon name="wallet" size={18} />} label="Saldo Atual" value={formatMoney(demoAccountBalance)} />
          <SummaryRow icon={<Icon name="dollar" size={18} />} label="Risco em USD (por trade)" value={formatMoney(riskUsd)} />
          <SummaryRow icon={<Icon name="target" size={18} />} label="Lote Estimado (XAUUSD)" value={estimatedLot.toFixed(2)} />
          <SummaryRow icon={<FieldIcon name="gauge" size={18} />} label="SL Padrão Considerado" value={`${toNumber(risk.defaultSl)} pips`} />
          <SummaryRow
            icon={<Icon name="chart" size={18} />}
            label="Exposição Máxima (simultânea)"
            value={`${totalExposure.toFixed(2)}% (${formatMoney((demoAccountBalance * totalExposure) / 100)})`}
          />
          <SummaryRow
            icon={<Icon name="trendDown" size={18} />}
            label="Drawdown Diário Máximo"
            value={`${dailyDrawdownPercent.toFixed(2)}% (${formatMoney((demoAccountBalance * dailyDrawdownPercent) / 100)})`}
          />
          <SummaryRow
            icon={<Icon name="trendDown" size={18} />}
            label="Drawdown Total Máximo"
            value={`${totalDrawdownPercent.toFixed(2)}% (${formatMoney((demoAccountBalance * totalDrawdownPercent) / 100)})`}
          />
        </dl>
      </section>

      <section aria-labelledby="risk-simulator-title" className="rounded-xl border border-line bg-surface/70 p-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-strong/25 text-brand">
            <FieldIcon name="calculator" size={24} />
          </span>
          <div className="min-w-0">
            <h2 id="risk-simulator-title" className="text-[18px] font-semibold leading-6 tracking-tight text-fg">
              Simulador de Risco
            </h2>
            <p className="text-[14px] leading-5 text-fg-muted">Veja o impacto do risco em diferentes cenários.</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <SimulatorField id={`${uid}-balance`} label="Saldo para simulação" unit="USD" value={simBalance} onChange={setSimBalance} />
          <SimulatorField id={`${uid}-stop`} label="Stop Loss (pips)" unit="pips" value={simStop} onChange={setSimStop} />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-3">
          <ResultCard label="Lote Calculado" value={simLot.toFixed(2)} tone="text-success" />
          <ResultCard label="Valor por Pip" value={formatMoney(simPipValue)} tone="text-brand" />
          <ResultCard label="Risco em USD" value={formatMoney(simRiskUsd)} tone="text-warning" />
        </div>

        <aside
          aria-labelledby="risk-important-title"
          className="mt-3.5 flex items-start gap-3 rounded-xl border border-brand/40 bg-gradient-to-br from-brand-soft/50 to-surface px-3.5 py-3"
        >
          <span className="mt-0.5 shrink-0 text-brand">
            <Icon name="info" size={24} stroke={2} />
          </span>
          <div className="min-w-0">
            <h3 id="risk-important-title" className="text-[15px] font-semibold leading-6 tracking-tight text-fg">
              Importante
            </h3>
            <p className="mt-0.5 text-pretty text-[13px] leading-5 text-fg-muted">
              Os valores são estimativas baseadas no ativo XAUUSD.
              <br className="hidden sm:block" /> O lote final pode variar conforme o ativo e as condições de mercado.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
