"use client";
import { useId, useState } from "react";
import { webhookEventsDemo, type ApiToggleDemo } from "../../lib/api-demo";
import { cx } from "../UI";
import { SettingsCard } from "./SettingsFields";

function EventRow({ item, checked, onChange }: { item: ApiToggleDemo; checked: boolean; onChange: (next: boolean) => void }) {
  const id = useId();
  return (
    <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 py-2 first:pt-0 last:pb-0 sm:grid-cols-[40px_148px_minmax(0,1fr)]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative row-span-2 h-[22px] w-10 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:row-span-1",
          checked ? "bg-brand" : "bg-[#3b4a5a]",
        )}
      >
        <span className={cx("absolute top-[3px] size-4 rounded-full bg-white shadow transition-[left]", checked ? "left-[21px]" : "left-[3px]")} />
      </button>
      <p id={`${id}-title`} className="text-[13px] font-medium leading-5 text-fg">
        {item.title}
      </p>
      <p id={`${id}-desc`} className="col-start-2 text-[11.5px] leading-4 text-fg-muted sm:col-start-3 sm:row-start-1">
        {item.description}
      </p>
    </div>
  );
}

export default function ApiEventsCard() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(webhookEventsDemo.map((item) => [item.id, item.enabled])));

  return (
    <SettingsCard icon="bolt" title="Eventos Disponíveis" description="Selecione quais eventos deseja receber nos webhooks.">
      <div className="flex flex-col divide-y divide-line/70">
        {webhookEventsDemo.map((item) => (
          <EventRow key={item.id} item={item} checked={enabled[item.id]} onChange={(next) => setEnabled((current) => ({ ...current, [item.id]: next }))} />
        ))}
      </div>
    </SettingsCard>
  );
}
