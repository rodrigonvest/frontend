import { cx } from "../UI";
import type { RelatedStep } from "../../lib/notification-center-demo";

export default function RelatedTimeline({ steps }: { steps?: RelatedStep[] }) {
  return (
    <section aria-labelledby="notif-related-title" className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <h2 id="notif-related-title" className="text-base font-semibold text-fg">
        Notificações Relacionadas
      </h2>
      {steps && steps.length > 0 ? (
        <ol className="mt-4">
          {steps.map((step, index) => {
            const last = index === steps.length - 1;
            const done = step.state === "done";
            return (
              <li key={step.id} className="relative flex gap-3.5 pb-4 last:pb-0">
                {!last && <span aria-hidden className={cx("absolute left-[6px] top-4 h-[calc(100%-8px)] w-px", done ? "bg-success/50" : "bg-line-strong")} />}
                <span
                  aria-hidden
                  className={cx(
                    "relative mt-1 size-[13px] shrink-0 rounded-full",
                    done ? "bg-success shadow-[0_0_10px_rgba(18,217,158,.7)]" : "border-2 border-line-strong bg-surface-3",
                  )}
                />
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={cx("text-[14px] font-medium leading-5", done ? "text-fg" : "text-fg-muted")}>{step.title}</p>
                    <p className="tabular text-[13px] leading-5 text-fg-muted">{step.subtitle}</p>
                  </div>
                  <span className="tabular shrink-0 text-[13px] text-fg-muted">
                    {step.time ?? (
                      <>
                        <span aria-hidden>—</span>
                        <span className="sr-only">Pendente</span>
                      </>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="mt-3 text-[13px] leading-5 text-fg-muted">Esta notificação não possui eventos relacionados.</p>
      )}
    </section>
  );
}
