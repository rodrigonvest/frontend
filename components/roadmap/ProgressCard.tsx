import { cx } from "../UI";
import { SURFACE } from "../billing/BillingPrimitives";
import { PROGRESS_SEGMENTS, PROGRESS_TOTAL } from "../../lib/roadmap-data";
import { TONES } from "./tones";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 1.6;

export default function ProgressCard() {
  let offset = 0;
  const arcs = PROGRESS_SEGMENTS.map((segment) => {
    const length = (segment.count / PROGRESS_TOTAL) * CIRCUMFERENCE;
    const arc = { status: segment.status, dash: Math.max(length - GAP, 0), start: offset };
    offset += length;
    return arc;
  });
  const summary = PROGRESS_SEGMENTS.map((s) => `${s.count} ${s.label.toLowerCase()}, ${s.percent}%`).join("; ");

  return (
    <section aria-labelledby="roadmap-progress-title" className={cx(SURFACE, "p-4 sm:p-5")}>
      <h2 id="roadmap-progress-title" className="text-[17px] font-semibold tracking-tight text-fg">
        Progresso Geral
      </h2>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-4">
        <div className="relative size-[132px] shrink-0">
          <svg viewBox="0 0 100 100" role="img" aria-label={`Progresso geral: ${PROGRESS_TOTAL} itens no total. ${summary}.`} className="size-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="11" className="stroke-surface-3" />
            {arcs.map((arc) => (
              <circle
                key={arc.status}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="11"
                stroke={TONES[arc.status].hex}
                strokeDasharray={`${arc.dash} ${CIRCUMFERENCE - arc.dash}`}
                strokeDashoffset={-arc.start}
                style={{ filter: `drop-shadow(0 0 3px ${TONES[arc.status].hex}88)` }}
              />
            ))}
          </svg>
          <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="tabular text-[28px] font-semibold leading-8 tracking-tight text-fg">{PROGRESS_TOTAL}</span>
            <span className="text-[11.5px] leading-4 text-fg-muted">itens no total</span>
          </div>
        </div>

        <ul className="flex min-w-[170px] flex-1 flex-col gap-2.5">
          {PROGRESS_SEGMENTS.map((segment) => (
            <li key={segment.status} className="flex items-center gap-2 text-[12.5px] leading-4">
              <span aria-hidden className={cx("size-2.5 shrink-0 rounded-full", TONES[segment.status].dot)} />
              <span className="min-w-0 flex-1 text-fg-muted">
                <span className="tabular font-semibold text-fg">{segment.count}</span> {segment.label}
              </span>
              <span className="tabular shrink-0 font-medium text-fg">{segment.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
