"use client";

import { useId, useState, type ReactNode } from "react";
import { accountMetrics, orderTestDefaults, orderTestResult, type AccountMetricKey } from "../../../lib/connection-test-demo";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import ConnectionIcon from "./ConnectionIcons";
import FieldIcon from "./FieldIcons";

const panel = "rounded-xl border border-line bg-surface/70";

const metricStyles: Record<AccountMetricKey, { tile: string; icon: ReactNode }> = {
  balance: { tile: "bg-success/15 text-success", icon: <Icon name="dollar" size={24} stroke={2.2} /> },
  equity: { tile: "bg-brand-strong/20 text-brand", icon: <Icon name="barsFilled" size={24} /> },
  marginUsed: { tile: "bg-[#8b5cf6]/20 text-[#b38bff]", icon: <ConnectionIcon name="pie" size={26} /> },
  marginFree: { tile: "bg-brand-strong/20 text-brand", icon: <ConnectionIcon name="donut" size={26} /> },
  marginLevel: { tile: "bg-warning/15 text-warning", icon: <FieldIcon name="percent" size={26} /> },
  currency: { tile: "bg-white/[.07] text-fg", icon: <ConnectionIcon name="database" size={24} /> },
};

export function AccountDataCard() {
  return (
    <section aria-labelledby="account-data-title" className={`${panel} p-4`}>
      <div className="flex items-center justify-between gap-3">
        <h2 id="account-data-title" className="text-[17px] font-semibold leading-6 tracking-tight text-fg">
          Dados da Conta (Detectados no Servidor)
        </h2>
        <button
          type="button"
          aria-label="Atualizar dados da conta"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[.05] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Icon name="refresh" size={19} />
        </button>
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-3">
        {accountMetrics.map((metric) => {
          const style = metricStyles[metric.id];
          return (
            <div key={metric.id} className="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-canvas/40 px-2 py-2.5">
              <span aria-hidden className={cx("flex size-9 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5", style.tile)}>
                {style.icon}
              </span>
              <div className="min-w-0">
                <dt className="text-[11.5px] leading-4 text-fg-muted">{metric.label}</dt>
                <dd className="tabular mt-0.5 whitespace-nowrap text-[14px] font-semibold leading-5 tracking-tight text-fg">{metric.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export function OrderTestCard() {
  const uid = useId();
  const [enabled, setEnabled] = useState(false);
  const [symbol, setSymbol] = useState(orderTestDefaults.symbol);
  const [volume, setVolume] = useState(orderTestDefaults.volume);
  const fieldClass =
    "h-11 w-full rounded-lg border border-line bg-canvas/60 px-3.5 text-[15px] text-fg outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/60";

  return (
    <section aria-labelledby="order-test-title" className={`${panel} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span aria-hidden className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-md bg-white/[.06] text-fg">
            <ConnectionIcon name="robot" size={18} />
          </span>
          <div className="min-w-0">
            <h2 id="order-test-title" className="text-[17px] font-semibold leading-6 tracking-tight text-fg">
              Teste de Envio de Ordem (Opcional)
            </h2>
            <p className="mt-0.5 text-pretty text-[13px] leading-5 text-fg-muted">Realiza um envio de ordem em modo teste (sem execução no mercado).</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Ativar teste de envio de ordem"
          onClick={() => setEnabled((value) => !value)}
          className={cx(
            "relative mt-0.5 h-[22px] w-10 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
            enabled ? "border-brand-strong bg-brand-strong" : "border-line-strong bg-surface-3",
          )}
        >
          <span
            aria-hidden
            className={cx("absolute top-[2px] size-4 rounded-full bg-white transition-all", enabled ? "left-[21px]" : "left-[3px] opacity-90")}
          />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <label htmlFor={`${uid}-symbol`} className="mb-1 block text-[13.5px] leading-5 text-fg-muted">
            Símbolo para teste
          </label>
          <div className="relative">
            <select id={`${uid}-symbol`} value={symbol} onChange={(e) => setSymbol(e.target.value)} className={cx(fieldClass, "appearance-none pr-10")}>
              {orderTestDefaults.symbols.map((item) => (
                <option key={item} value={item} className="bg-surface text-fg">
                  {item}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-fg-muted">
              <Icon name="chevronDown" size={16} />
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${uid}-volume`} className="mb-1 block text-[13.5px] leading-5 text-fg-muted">
            Volume (Lote)
          </label>
          <input
            id={`${uid}-volume`}
            type="text"
            inputMode="decimal"
            value={volume}
            onChange={(e) => setVolume(e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1"))}
            className={fieldClass}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-brand bg-brand-soft/40 text-[15px] font-medium text-fg shadow-[0_0_14px_rgba(21,154,242,.2)] transition-colors hover:bg-brand-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="text-brand">
          <Icon name="telegram" size={20} />
        </span>
        Enviar Ordem de Teste
      </button>

      <aside className="mt-3 flex items-start gap-3 rounded-lg border border-brand/35 bg-gradient-to-r from-brand-soft/50 to-surface/40 px-3.5 py-3">
        <span className="mt-0.5 shrink-0 text-brand">
          <Icon name="info" size={24} stroke={2} />
        </span>
        <p className="text-pretty text-[13px] leading-5 text-fg">
          Esta é uma ordem de teste. Não será executada no mercado real, apenas valida as permissões da conta.
        </p>
      </aside>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-[7px]">
      <dt className="text-[13px] leading-5 text-fg-muted">{label}</dt>
      <dd className="text-right text-[13px] leading-5 text-fg">{value}</dd>
    </div>
  );
}

export function OrderResultCard() {
  return (
    <section aria-labelledby="order-result-title" className={`${panel} p-4`}>
      <h2 id="order-result-title" className="text-[16px] font-semibold leading-6 tracking-tight text-fg">
        Resultado do Teste de Ordem
      </h2>

      <div className="mt-3 flex items-center gap-4 rounded-lg border border-success/40 bg-gradient-to-r from-success-soft to-surface/40 px-4 py-3">
        <span aria-hidden className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-success text-canvas shadow-[0_0_16px_rgba(18,217,158,.45)]">
          <Icon name="check" size={22} stroke={2.8} />
        </span>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold leading-6 text-success">
            Permissão de <span className="text-[#5cc2ff]">envio de ordens</span> confirmada!
          </p>
          <p className="text-[13.5px] leading-5 text-success/90">Sua conta tem permissão para operar no mercado.</p>
        </div>
      </div>

      <dl className="mt-2.5 divide-y divide-line overflow-hidden rounded-lg border border-line bg-canvas/40">
        <ResultRow label="Retorno do Servidor" value={orderTestResult.serverReturn} />
        <ResultRow label="Código de Retorno" value={orderTestResult.returnCode} />
        <ResultRow label="Tempo de Resposta" value={orderTestResult.responseTime} />
      </dl>
    </section>
  );
}
