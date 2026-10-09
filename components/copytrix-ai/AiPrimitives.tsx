import type { ComponentProps, ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

const accents = {
  purple: "bg-[#9b63ff]/15 text-[#a77bff]",
  blue: "bg-brand/15 text-brand",
  green: "bg-success/15 text-success",
  amber: "bg-warning/15 text-warning",
  red: "bg-danger/15 text-danger",
};

export type Accent = keyof typeof accents;

export function IconTile({ name, accent = "purple", size = 20, className }: { name: string; accent?: Accent; size?: number; className?: string }) {
  return (
    <span aria-hidden className={cx("flex shrink-0 items-center justify-center rounded-xl", accents[accent], className)}>
      <Icon name={name} size={size} />
    </span>
  );
}

export function Panel({
  title,
  icon,
  action,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className={cx("flex min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface", className)}
    >
      <header className="flex items-center gap-2.5 px-4 pt-4">
        <span aria-hidden className="text-[#a77bff]">
          <Icon name={icon} size={20} />
        </span>
        <h2 className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        {action}
      </header>
      <div className={cx("flex-1 p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] leading-5 text-fg-muted">
      <span aria-hidden className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border border-success/70 text-success">
        <Icon name="check" size={11} stroke={2.8} />
      </span>
      <span>{children}</span>
    </li>
  );
}

const barTones = {
  green: { bar: "bg-success", text: "text-success" },
  blue: { bar: "bg-brand", text: "text-brand" },
  amber: { bar: "bg-warning", text: "text-warning" },
  purple: { bar: "bg-[#9b63ff]", text: "text-[#b08bff]" },
  red: { bar: "bg-danger", text: "text-danger" },
};

export type BarTone = keyof typeof barTones;

export function MetricBar({ label, value, percent, tone }: { label: string; value: string; percent: number; tone: BarTone }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[minmax(0,130px)_minmax(0,1fr)_auto]">
      <span className="text-[12.5px] text-fg-muted">{label}</span>
      <span className={cx("tabular text-right text-[12.5px] font-semibold sm:order-3", barTones[tone].text)}>{value}</span>
      <span
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="col-span-2 h-1.5 overflow-hidden rounded-full bg-surface-3 sm:order-2 sm:col-span-1"
      >
        <span className={cx("block h-full rounded-full", barTones[tone].bar)} style={{ width: `${percent}%` }} />
      </span>
    </div>
  );
}

export function PrimaryButton({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        "flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-strong px-5 text-[13.5px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-90",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CopytrixMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 27 27" fill="none" aria-hidden>
      <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function directionTone(direction: string) {
  return direction.toLowerCase() === "buy" ? "text-success" : "text-danger";
}
