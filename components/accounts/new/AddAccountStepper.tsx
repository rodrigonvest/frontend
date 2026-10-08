import { Fragment } from "react";
import { addAccountSteps } from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { cx } from "../../UI";

export default function AddAccountStepper({
  current,
  descriptions = {},
}: {
  current: number;
  descriptions?: Partial<Record<number, string>>;
}) {
  return (
    <nav aria-label="Etapas para adicionar conta" className="overflow-x-auto rounded-xl border border-line bg-surface/70">
      <ol className="flex min-w-[880px] items-stretch px-2 xl:min-w-0">
        {addAccountSteps.map((step, index) => {
          const active = step.id === current;
          const done = step.id < current;
          const isLast = index === addAccountSteps.length - 1;
          return (
            <Fragment key={step.id}>
              <li
                aria-current={active ? "step" : undefined}
                className={cx("relative flex shrink-0 items-center gap-3.5 px-4 py-[14px]", active && "pr-8")}
              >
                <span
                  className={cx(
                    "flex size-[46px] shrink-0 items-center justify-center rounded-full text-[18px] font-semibold",
                    active
                      ? "bg-brand-strong text-white shadow-[0_0_18px_rgba(21,154,242,.55)]"
                      : done
                        ? "bg-success text-canvas shadow-[0_0_14px_rgba(18,217,158,.35)]"
                        : "bg-surface-3 text-fg-muted",
                  )}
                >
                  {done ? <Icon name="check" size={24} stroke={2.6} /> : step.id}
                  {done && <span className="sr-only"> (concluída)</span>}
                </span>
                <span className="min-w-0">
                  <span className={cx("block text-[15px] font-medium leading-5", active ? "text-brand" : done ? "text-fg" : "text-fg-muted")}>
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-4 text-fg-subtle">{descriptions[step.id] ?? step.description}</span>
                </span>
                {active && <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-brand-strong shadow-[0_0_10px_rgba(21,154,242,.8)]" />}
              </li>
              {!isLast && (
                <li aria-hidden className="flex min-w-6 flex-1 items-center px-2">
                  <span className={cx("h-px w-full", done ? "bg-success" : "bg-line-strong/70")} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
