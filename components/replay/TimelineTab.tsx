import { useMemo } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { buildEvents, fmtClock, fmtDate, fmtPrice, fmtR, type ReplayEvent, type ReplaySignal } from "../../lib/replay-data";
import { DirectionLabel, outcomeTone } from "./RpPrimitives";

interface Props {
  signals: ReplaySignal[];
  selected: ReplaySignal;
  onSelect: (id: number) => void;
}

const eventStyle: Record<ReplayEvent["kind"], { icon: Parameters<typeof Icon>[0]["name"]; tone: string }> = {
  signal: { icon: "telegram", tone: "bg-[#229ed9]/20 text-[#5cc2ff]" },
  entry: { icon: "target", tone: "bg-brand/20 text-brand" },
  tp: { icon: "check", tone: "bg-success/15 text-success" },
  sl: { icon: "x", tone: "bg-danger/15 text-danger" },
  end: { icon: "clock", tone: "bg-surface-3 text-fg-muted" },
  ignored: { icon: "alert", tone: "bg-warning/15 text-warning" },
};

export default function TimelineTab({ signals, selected, onSelect }: Props) {
  const groups = useMemo(() => {
    const map = new Map<string, ReplaySignal[]>();
    for (const signal of signals) {
      const key = fmtDate(signal.time);
      map.set(key, [...(map.get(key) ?? []), signal]);
    }
    return [...map.entries()];
  }, [signals]);
  const events = useMemo(() => buildEvents(selected), [selected]);

  return (
    <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-fg">Linha do tempo da sessão</h3>
        <div className="max-h-[420px] space-y-4 overflow-y-auto pr-1">
          {groups.map(([day, items]) => (
            <div key={day}>
              <div className="sticky top-0 z-10 mb-1.5 bg-surface py-1 text-xs font-medium uppercase tracking-wide text-fg-subtle">{day}</div>
              <ul className="space-y-1.5 border-l border-line pl-3">
                {items.map((signal) => {
                  const executed = signal.status === "Executado";
                  const active = signal.id === selected.id;
                  return (
                    <li key={signal.id}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelect(signal.id)}
                        className={cx(
                          "grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-0.5 rounded-lg border px-3 py-2 text-left text-[12.5px] transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                          active ? "border-brand bg-brand-strong/20" : "border-line bg-surface-2/40 hover:border-line-strong",
                        )}
                      >
                        <span className="tabular text-fg-muted">{fmtClock(signal.time)}</span>
                        <span className="min-w-0 truncate text-fg">
                          <span className="font-medium">Sinal #{signal.id}</span> <span className="text-fg-subtle">·</span> <DirectionLabel direction={signal.direction} />{" "}
                          <span className="tabular text-fg-muted">
                            {signal.asset} @ {fmtPrice(signal.entry, signal.decimals)}
                          </span>
                        </span>
                        <span className={cx("tabular text-right font-semibold", executed ? outcomeTone(signal.outcome) : "text-fg-subtle")}>
                          {executed ? `${signal.outcome} ${fmtR(signal.r, true)}` : "Ignorado"}
                        </span>
                        <span className="col-start-2 col-end-4 text-[11.5px] text-fg-subtle">
                          {executed ? `Sinal recebido → Executado em ${signal.execMinutes} min` : `Sinal recebido → ${signal.ignoredReason ?? "Ignorado"}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-fg">Eventos do Sinal #{selected.id}</h3>
        <ol className="relative space-y-4">
          <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-line-strong" />
          {events.map((event) => {
            const style = eventStyle[event.kind];
            return (
              <li key={event.id} className="relative flex gap-3">
                <span className={cx("z-[1] flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-surface", style.tone)}>
                  <Icon name={style.icon} size={15} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[13px] font-medium text-fg">{event.title}</span>
                    <time className="tabular text-xs text-fg-subtle">{fmtClock(event.time)}</time>
                  </div>
                  <p className="text-xs text-fg-muted">{event.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
