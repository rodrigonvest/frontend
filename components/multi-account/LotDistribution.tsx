"use client";
import { useId, useState } from "react";
import { Icon } from "../Icons";
import { Card, cx } from "../UI";
import type { LotEntry, MultiAccount } from "../../lib/multi-account-demo";
import { NumberBox, PanelTitle } from "./MaPrimitives";

type Mode = "percent" | "fixed" | "equity";

const modes: { id: Mode; label: string }[] = [
  { id: "percent", label: "Por Percentual" },
  { id: "fixed", label: "Por Lote Fixo" },
  { id: "equity", label: "Por Equidade" },
];

export default function LotDistribution({
  accounts,
  lots,
  onPercent,
  onFixed,
  onNormalize,
}: {
  accounts: MultiAccount[];
  lots: LotEntry[];
  onPercent: (accountId: string, value: number) => void;
  onFixed: (accountId: string, value: number) => void;
  onNormalize: () => void;
}) {
  const [mode, setMode] = useState<Mode>("percent");
  const baseId = useId();

  const rows = lots
    .map((lot) => ({ lot, account: accounts.find((account) => account.id === lot.accountId) }))
    .filter((row): row is { lot: LotEntry; account: MultiAccount } => Boolean(row.account));

  const percentTotal = rows.reduce((sum, row) => sum + row.lot.percent, 0);
  const fixedTotal = rows.reduce((sum, row) => sum + row.lot.fixedLot, 0);
  const equityTotal = rows.reduce((sum, row) => sum + row.account.equity, 0);
  const balanced = Math.abs(percentTotal - 100) < 0.05;

  return (
    <Card className="p-4">
      <PanelTitle icon={<Icon name="analytics" size={20} />} title="Distribuição de Lotes" />

      <div role="tablist" aria-label="Modo de distribuição" className="mt-3 grid grid-cols-3 gap-0 overflow-hidden rounded-lg border border-line">
        {modes.map((item) => {
          const active = item.id === mode;
          return (
            <button
              key={item.id}
              role="tab"
              id={`${baseId}-${item.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              type="button"
              onClick={() => setMode(item.id)}
              className={cx(
                "h-9 text-[13px] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                active ? "bg-brand-strong/25 text-fg shadow-[inset_0_0_0_1px_#087ff0]" : "text-fg-muted hover:bg-white/[.04] hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-${mode}`} className="mt-3">
        <ul className="divide-y divide-line/60">
          {rows.map(({ lot, account }) => {
            const share = equityTotal > 0 ? (account.equity / equityTotal) * 100 : 0;
            return (
              <li key={lot.accountId} className="flex items-center gap-3 py-2">
                <span aria-hidden className="size-3.5 shrink-0 rounded-full" style={{ background: lot.color }} />
                <span className="min-w-0 flex-1 truncate text-[14px] text-fg">{account.name}</span>
                {mode === "percent" && (
                  <NumberBox label={`Percentual de ${account.name}`} value={lot.percent} max={100} suffix="%" className="w-28" onChange={(v) => onPercent(lot.accountId, v)} />
                )}
                {mode === "fixed" && (
                  <NumberBox label={`Lote fixo de ${account.name}`} value={lot.fixedLot} max={100} suffix="lotes" className="w-32" onChange={(v) => onFixed(lot.accountId, v)} />
                )}
                {mode === "equity" && <span className="tabular w-28 text-right text-[14px] text-fg">{share.toFixed(1)}%</span>}
              </li>
            );
          })}
        </ul>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-line pt-3">
          <span className="text-[14px] text-fg-muted">Total</span>
          <div className="flex items-center gap-3">
            {mode === "percent" && !balanced && (
              <button type="button" onClick={onNormalize} className="text-[12px] text-brand underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-brand">
                Normalizar para 100%
              </button>
            )}
            <span
              className={cx(
                "tabular flex h-9 w-28 items-center justify-end rounded-md border bg-canvas px-2.5 text-[15px] font-semibold",
                mode === "percent" && !balanced ? "border-danger/60 text-danger" : "border-line text-fg",
              )}
            >
              {mode === "percent" && `${Number(percentTotal.toFixed(1))} %`}
              {mode === "fixed" && `${fixedTotal.toFixed(2)} lotes`}
              {mode === "equity" && "100 %"}
            </span>
          </div>
        </div>
        {mode === "percent" && !balanced && (
          <p role="alert" className="mt-2 text-[12px] text-danger">
            A soma dos percentuais deve ser 100%. Atualmente: {Number(percentTotal.toFixed(1))}%.
          </p>
        )}
        {mode === "equity" && <p className="mt-2 text-[12px] text-fg-subtle">Lotes proporcionais à equidade atual de cada conta.</p>}
      </div>
    </Card>
  );
}
