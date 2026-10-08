import type { ReactNode, SelectHTMLAttributes } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export const panelClass = "rounded-[10px] border border-[#17344b] bg-gradient-to-b from-[#0c2134] to-[#0a1b2b] shadow-[0_8px_24px_rgba(0,0,0,.18)]";

export function Panel({ title, children, className, action }: { title: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={cx(panelClass, "min-w-0 p-3.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function SelectField({
  className,
  selectClassName = "text-[13px]",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { selectClassName?: string }) {
  return (
    <div className={cx("relative", className)}>
      <select
        {...props}
        className={cx(
          "h-full w-full cursor-pointer appearance-none rounded-md border border-[#24435d] bg-[#091a2a] pl-3 pr-8 text-[#e3edf5] outline-none focus-visible:border-brand",
          selectClassName,
        )}
      >
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-muted">
        <Icon name="chevronDown" size={14} stroke={2.2} />
      </span>
    </div>
  );
}

export function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden>
      <path d="M7 4.5v15l12.5-7.5L7 4.5Z" />
    </svg>
  );
}
