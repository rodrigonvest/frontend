import type { ComponentProps, ReactNode } from "react";
import { cx } from "../UI";

export const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const SURFACE =
  "rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface shadow-[0_0_34px_-24px_rgba(21,154,242,.7)] backdrop-blur-sm";

export function SectionHeader({ id, title, icon, action }: { id: string; title: string; icon?: ReactNode; action?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="flex min-w-0 items-center gap-2.5">
        {icon && (
          <span aria-hidden className="flex shrink-0 text-brand">
            {icon}
          </span>
        )}
        <h2 id={id} className="min-w-0 text-[17px] font-semibold tracking-tight text-fg">
          {title}
        </h2>
      </div>
      {action}
    </header>
  );
}

export function SmallActionButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        "inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-brand/60 bg-brand/10 px-3.5 text-[12.5px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand/20 hover:text-white",
        FOCUS_RING,
        className,
      )}
    />
  );
}

const barTones = {
  green: "bg-gradient-to-r from-success to-[#2be6b3] shadow-[0_0_10px_rgba(18,217,158,.55)]",
  blue: "bg-gradient-to-r from-brand-strong to-brand shadow-[0_0_10px_rgba(21,154,242,.55)]",
};

const percentTones = { green: "text-success", blue: "text-[#5cc2ff]" };

export function UsageBar({ label, percent, tone, unlimited = false }: { label: string; percent: number; tone: "green" | "blue"; unlimited?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {unlimited ? (
        <span aria-hidden className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
          <span className={cx("block h-full w-full rounded-full", barTones[tone])} />
        </span>
      ) : (
        <span
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${percent}% utilizado`}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3"
        >
          <span className={cx("block h-full rounded-full", barTones[tone])} style={{ width: `${percent}%` }} />
        </span>
      )}
      <span className={cx("tabular w-9 shrink-0 text-right text-[12.5px] font-medium", percentTones[tone])}>{percent}%</span>
    </div>
  );
}
