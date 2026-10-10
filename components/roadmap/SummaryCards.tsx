import { Icon } from "../Icons";
import { cx } from "../UI";
import { SURFACE } from "../billing/BillingPrimitives";
import { SUMMARY_CARDS } from "../../lib/roadmap-data";
import { TONES } from "./tones";

export default function SummaryCards() {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 @[760px]:grid-cols-4" aria-label="Resumo do roadmap">
      {SUMMARY_CARDS.map((card) => {
        const tone = TONES[card.status];
        return (
          <li key={card.status} className={cx(SURFACE, "flex min-w-0 items-center gap-3.5 p-4")}>
            <span aria-hidden className={cx("flex size-14 shrink-0 items-center justify-center rounded-xl border", tone.tile)}>
              <Icon name={card.icon} size={26} stroke={2} />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold leading-4 text-fg">{card.label}</p>
              <p className="tabular mt-1 text-[28px] font-semibold leading-8 tracking-tight text-fg">{card.value}</p>
              <p className="text-[12.5px] leading-4 text-fg-muted">{card.caption}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
