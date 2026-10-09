"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { Panel } from "../risk-management/RiskFields";
import { signal, type SignalCheck } from "../../lib/smart-entry-demo";

const price = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CheckStatus({ check }: { check: SignalCheck }) {
  const ok = check.ok;
  return (
    <span className={cx("inline-flex items-center gap-1.5 text-[12px] font-medium", ok ? "text-success" : "text-danger")}>
      <span className={cx("flex size-4 items-center justify-center rounded-full", ok ? "bg-success/20" : "bg-danger/20")}>
        <Icon name={ok ? "check" : "x"} size={10} stroke={2.8} />
      </span>
      {ok ? "OK" : "Falhou"}
      {check.hint && <span className="text-fg-muted">{check.hint}</span>}
    </span>
  );
}

export default function SignalPreview({
  checks,
  executing,
  onExecute,
}: {
  checks: SignalCheck[];
  executing: boolean;
  onExecute: () => void;
}) {
  const approved = checks.every((check) => check.ok);
  const failures = checks.filter((check) => !check.ok).length;
  const rows: { label: string; value: string }[] = [
    { label: "Preço de Entrada", value: price(signal.entry) },
    { label: "Take Profit", value: `${price(signal.takeProfit)} (40 pips)` },
    { label: "Stop Loss", value: `${price(signal.stopLoss)} (20 pips)` },
  ];

  return (
    <Panel title="Preview do Sinal" icon="fileText" className="flex-1">
      <p className="-mt-1 mb-3 text-[13px] leading-5 text-fg-muted">Veja em tempo real se o sinal será executado.</p>
      <div className="rounded-lg border border-line bg-canvas/60 p-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[16px] font-semibold tracking-tight text-fg">{signal.symbol}</span>
          <span className="text-[16px] font-semibold text-success">{signal.side}</span>
          <span
            className={cx(
              "ml-auto inline-flex h-6 items-center rounded-full border px-3 text-[11px] font-semibold tracking-wide",
              approved ? "border-success/60 bg-success/15 text-success" : "border-danger/60 bg-danger/15 text-danger",
            )}
          >
            {approved ? "APROVADO" : "FILTRADO"}
          </span>
        </div>
        <div className="mt-1 text-[12px] text-fg-muted">Recebido: {signal.receivedAt}</div>
      </div>

      <dl className="mt-3 divide-y divide-line/30 text-[12.5px]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-1.5">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="tabular text-fg">{row.value}</dd>
          </div>
        ))}
        {checks.map((check) => (
          <div key={check.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-1.5">
            <dt className="text-fg-muted">{check.label}</dt>
            <dd className="tabular text-fg">{check.value}</dd>
            <dd className="w-[118px]">
              <CheckStatus check={check} />
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onExecute}
        disabled={!approved || executing}
        aria-busy={executing}
        className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-success text-[14px] font-semibold text-canvas transition-colors hover:bg-success/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-fg-subtle"
      >
        <Icon name={executing ? "refresh" : "send"} size={16} />
        {executing ? "Executando..." : approved ? "Executar Sinal Agora" : "Sinal filtrado pelas regras"}
      </button>
      {!approved && (
        <p role="status" className="mt-2 text-[12px] text-danger">
          {failures} {failures === 1 ? "regra bloqueia" : "regras bloqueiam"} este sinal. Ajuste os filtros para liberar a execução.
        </p>
      )}
    </Panel>
  );
}
