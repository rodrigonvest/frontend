"use client";
import { useEffect, useRef } from "react";
import { cx } from "../UI";
import { fmtPrice, fmtR, fmtShortDateTime, type ReplaySignal } from "../../lib/replay-data";
import { DirectionLabel, PlayGlyph, StatusBadge, outcomeTone } from "./RpPrimitives";

interface Props {
  signals: ReplaySignal[];
  selectedId: number;
  onSelect: (id: number) => void;
  onPlay: (id: number) => void;
}

const heads = ["#", "Data/Hora", "Ativo", "Direção", "Entrada", "SL (pips)", "TP1 (pips)", "TP2 (pips)", "TP3 (pips)", "Resultado", "R", "Status", "Ação"];

export default function SignalsTable({ signals, selectedId, onSelect, onPlay }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const row = container?.querySelector<HTMLElement>(`[data-signal="${selectedId}"]`);
    if (!container || !row) return;
    const headerH = 40;
    const top = row.offsetTop - headerH;
    const bottom = row.offsetTop + row.offsetHeight;
    if (top < container.scrollTop) container.scrollTop = Math.max(0, top - 8);
    else if (bottom > container.scrollTop + container.clientHeight) container.scrollTop = bottom - container.clientHeight + 8;
  }, [selectedId]);

  return (
    <div ref={scrollRef} className="max-h-[420px] overflow-auto">
      <table className="w-full min-w-[860px] border-collapse text-[12.5px]">
        <caption className="sr-only">Lista de sinais da sessão de replay</caption>
        <thead className="sticky top-0 z-10 bg-surface">
          <tr className="border-b border-line">
            {heads.map((head) => (
              <th key={head} scope="col" className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-fg-muted">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {signals.map((signal) => {
            const selected = signal.id === selectedId;
            const executed = signal.status === "Executado";
            return (
              <tr
                key={signal.id}
                data-signal={signal.id}
                aria-current={selected ? "true" : undefined}
                onClick={() => onSelect(signal.id)}
                className={cx(
                  "cursor-pointer border-b border-line/60 transition-colors",
                  selected ? "bg-brand-strong/25 shadow-[inset_3px_0_0_#159af2]" : "hover:bg-surface-2/70",
                )}
              >
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(signal.id);
                    }}
                    aria-label={`Selecionar sinal ${signal.id}`}
                    className="tabular rounded px-1 text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    {signal.id}
                  </button>
                </td>
                <td className="tabular whitespace-nowrap px-3 py-2.5 text-fg">{fmtShortDateTime(signal.time).replace(" ", "  ")}</td>
                <td className="px-3 py-2.5 text-fg">{signal.asset}</td>
                <td className="px-3 py-2.5">
                  <DirectionLabel direction={signal.direction} />
                </td>
                <td className="tabular px-3 py-2.5 text-fg">{fmtPrice(signal.entry, signal.decimals)}</td>
                <td className="tabular px-3 py-2.5 text-fg">{signal.slPips}</td>
                {signal.tpPips.map((pips, i) => (
                  <td key={i} className="tabular px-3 py-2.5 text-fg">
                    {pips}
                  </td>
                ))}
                <td className={cx("px-3 py-2.5 font-semibold", executed ? outcomeTone(signal.outcome) : "text-fg-subtle")}>{executed ? signal.outcome : "—"}</td>
                <td className={cx("tabular px-3 py-2.5 font-semibold", !executed ? "text-fg-subtle" : signal.r < 0 ? "text-danger" : "text-success")}>
                  {executed ? fmtR(signal.r) : "—"}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge status={signal.status} />
                </td>
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onPlay(signal.id);
                    }}
                    aria-label={`Reproduzir sinal ${signal.id}`}
                    className="flex size-8 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-fg transition-colors hover:border-brand hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <PlayGlyph size={13} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
