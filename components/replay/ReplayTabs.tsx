"use client";
import { useId, useRef } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import type { ReplaySession, ReplaySignal } from "../../lib/replay-data";
import CapturesTab from "./CapturesTab";
import SessionSummaryTab from "./SessionSummaryTab";
import SignalsTable from "./SignalsTable";
import TimelineTab from "./TimelineTab";

export type ReplayTabId = "list" | "timeline" | "summary" | "captures";

interface Props {
  tab: ReplayTabId;
  onTab: (tab: ReplayTabId) => void;
  session: ReplaySession;
  selected: ReplaySignal;
  channelName: string;
  onSelect: (id: number) => void;
  onPlay: (id: number) => void;
}

export default function ReplayTabs({ tab, onTab, session, selected, channelName, onSelect, onPlay }: Props) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const tabs: Array<{ id: ReplayTabId; label: string; icon: Parameters<typeof Icon>[0]["name"] }> = [
    { id: "list", label: `Lista de Sinais (${session.signals.length})`, icon: "clipboard" },
    { id: "timeline", label: "Timeline", icon: "clock" },
    { id: "summary", label: "Resumo da Sessão", icon: "barsFilled" },
    { id: "captures", label: "Capturas do Canal", icon: "telegram" },
  ];

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    onTab(next.id);
    listRef.current?.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)?.focus();
  };

  return (
    <section aria-label="Detalhes da sessão">
      <div ref={listRef} role="tablist" aria-label="Visualizações da sessão" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {tabs.map((item, index) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              data-tab={item.id}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onTab(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cx(
                "flex h-11 items-center justify-center gap-2 rounded-lg border px-3 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active
                  ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_22px_-8px_rgba(21,154,242,.9)]"
                  : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <Icon name={item.icon} size={16} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${tab}`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="mt-3 overflow-hidden rounded-xl border border-line bg-surface"
      >
        {tab === "list" && <SignalsTable signals={session.signals} selectedId={selected.id} onSelect={onSelect} onPlay={onPlay} />}
        {tab === "timeline" && <TimelineTab signals={session.signals} selected={selected} onSelect={onSelect} />}
        {tab === "summary" && <SessionSummaryTab session={session} onSelect={onSelect} />}
        {tab === "captures" && <CapturesTab signals={session.signals} selectedId={selected.id} channelName={channelName} onSelect={onSelect} />}
      </div>
    </section>
  );
}
