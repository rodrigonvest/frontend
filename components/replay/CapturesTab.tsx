"use client";
import { useState } from "react";
import { cx } from "../UI";
import type { ReplaySignal } from "../../lib/replay-data";
import CaptureCard from "./CaptureCard";

interface Props {
  signals: ReplaySignal[];
  selectedId: number;
  channelName: string;
  onSelect: (id: number) => void;
}

const PAGE = 12;

export default function CapturesTab({ signals, selectedId, channelName, onSelect }: Props) {
  const [limit, setLimit] = useState(PAGE);
  const shown = signals.slice(0, limit);

  return (
    <div className="p-4">
      <ul className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {shown.map((signal) => (
          <li key={signal.id}>
            <button
              type="button"
              onClick={() => onSelect(signal.id)}
              aria-pressed={signal.id === selectedId}
              aria-label={`Selecionar captura do sinal ${signal.id}`}
              className={cx(
                "block w-full rounded-xl text-left ring-2 ring-transparent transition-shadow focus-visible:outline-2 focus-visible:outline-brand",
                signal.id === selectedId ? "ring-brand" : "hover:ring-line-strong",
              )}
            >
              <CaptureCard signal={signal} channelName={channelName} />
            </button>
          </li>
        ))}
      </ul>
      {limit < signals.length && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((value) => value + PAGE)}
            className="h-9 rounded-lg border border-line-strong bg-surface-2/60 px-4 text-[13px] text-fg-muted transition-colors hover:border-brand/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            Mostrar mais capturas ({signals.length - limit} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
