import { Icon } from "../Icons";
import { cx } from "../UI";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { FILTERS, type RoadmapFilter } from "../../lib/roadmap-data";
import { TONES } from "./tones";

export default function FilterBar({ value, onChange }: { value: RoadmapFilter; onChange: (filter: RoadmapFilter) => void }) {
  return (
    <div role="group" aria-label="Filtrar roadmap por status" className="-m-1 overflow-x-auto p-1">
      <div className="flex w-max gap-2">
        {FILTERS.map((filter) => {
          const active = value === filter.id;
          const tone = filter.id === "all" ? null : TONES[filter.id];
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(filter.id)}
              className={cx(
                "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13.5px] font-medium transition-colors",
                FOCUS_RING,
                active
                  ? tone
                    ? tone.filterActive
                    : "border-brand bg-brand-strong text-white shadow-[0_0_20px_-6px_rgba(21,154,242,.8)]"
                  : "border-line bg-surface/60 text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {tone ? <span aria-hidden className={cx("size-2.5 rounded-full", tone.dot)} /> : <Icon name="dashboard" size={16} />}
              {filter.label}
              <span className="tabular">({filter.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
