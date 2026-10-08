import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export function Panel({
  title,
  action,
  children,
  className,
  padding = "px-3 pb-3 pt-2",
}: {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <section className={cx("min-w-0 rounded-[10px] border border-line bg-gradient-to-b from-surface-2/40 to-surface", padding, className)}>
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h2 className="shrink-0 text-[15px] font-semibold leading-5 text-fg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ChevronDown({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <span aria-hidden className={cx("inline-flex rotate-90", className)}>
      <Icon name="chevron" size={size} stroke={2} />
    </span>
  );
}

export function PlayGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M7 4.5v15l12-7.5-12-7.5Z" />
    </svg>
  );
}

export function SelectBox({
  id,
  options,
  ariaLabel,
  className,
  selectClassName,
}: {
  id: string;
  options: string[];
  ariaLabel?: string;
  className?: string;
  selectClassName?: string;
}) {
  return (
    <div className={cx("relative", className)}>
      <select
        id={id}
        aria-label={ariaLabel}
        defaultValue={options[0]}
        className={cx(
          "size-full appearance-none rounded-md border border-line-strong/60 bg-[#071522] text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30",
          selectClassName,
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-fg-muted">
        <ChevronDown size={14} />
      </span>
    </div>
  );
}
