"use client";
import { useId } from "react";
import { cx } from "../UI";
import { ArrowRightIcon, CheckMark, TableIcon } from "./PlanIcons";
import { comparisonRows, type ComparisonValue, type PlanId } from "../../lib/plan-demo";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const columns: { id: PlanId; label: string; header: string; highlight: string }[] = [
  { id: "free", label: "Free", header: "bg-brand-strong/25 text-brand", highlight: "" },
  { id: "starter", label: "Starter", header: "bg-success/20 text-success", highlight: "" },
  { id: "pro", label: "Pro", header: "bg-[#f5c542]/20 text-[#f5c542]", highlight: "bg-brand-strong/[.06]" },
  { id: "enterprise", label: "Enterprise", header: "bg-[#8b5cf6]/25 text-[#c4b5fd]", highlight: "" },
];

function Cell({ value }: { value: ComparisonValue }) {
  if (value === "included") {
    return (
      <>
        <CheckMark size={15} className="mx-auto text-success" />
        <span className="sr-only">Incluído</span>
      </>
    );
  }
  if (value === "excluded") {
    return (
      <>
        <span aria-hidden className="text-fg-subtle">
          —
        </span>
        <span className="sr-only">Não incluído</span>
      </>
    );
  }
  return <span className="text-fg">{value}</span>;
}

export default function PlanComparisonSection() {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="flex min-w-0 flex-col rounded-xl border border-brand/20 bg-surface/70 p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,.03)]"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center text-brand">
            <TableIcon size={34} />
          </span>
          <div>
            <h2 id={titleId} className="text-[17px] font-semibold leading-6 tracking-tight text-fg">
              Comparação Completa de Recursos
            </h2>
            <p className="text-[13px] leading-5 text-fg-muted">Veja todos os recursos disponíveis em cada plano.</p>
          </div>
        </div>
        <button
          type="button"
          className={cx(
            "inline-flex h-[34px] items-center gap-2 rounded-lg border border-brand/50 bg-brand-soft/20 px-3.5 text-[12.5px] font-medium text-brand transition-colors hover:bg-brand-soft/40",
            focusRing,
          )}
        >
          Ver lista completa de funcionalidades
          <ArrowRightIcon size={14} />
        </button>
      </header>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] border-separate border-spacing-0 text-[13px]">
          <caption className="sr-only">Comparação de recursos entre os planos Free, Starter, Pro e Enterprise</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[30%] px-2 py-2 text-left text-[12.5px] font-medium text-fg-muted">
                Recurso
              </th>
              {columns.map((column) => (
                <th key={column.id} scope="col" className="px-1 py-0 text-center">
                  <span className={cx("block rounded-t-md px-2 py-2 text-[13px] font-semibold", column.header)}>{column.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="group">
                <th
                  scope="row"
                  className="border-t border-line-strong/30 px-2 py-[3px] text-left text-[13px] font-normal text-fg group-first:border-t-0"
                >
                  {row.feature}
                </th>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cx(
                      "border-t border-line-strong/30 px-2 py-[3px] text-center text-[12.5px] group-first:border-t-0",
                      column.highlight,
                    )}
                  >
                    <Cell value={row.values[column.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
