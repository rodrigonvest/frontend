import type { ReactNode } from "react";
import { panelClass } from "../backtest/BacktestFields";
import { cx } from "../UI";

export default function DetailPanel({
  icon,
  title,
  action,
  className,
  iconClassName = "bg-[#0b3256] text-[#2f95ff]",
  children,
  ariaLabel,
}: {
  icon: ReactNode;
  title: string;
  action?: ReactNode;
  className?: string;
  iconClassName?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <section aria-label={ariaLabel ?? title} className={cx(panelClass, "flex min-w-0 flex-col", className)}>
      <header className="flex items-center justify-between gap-3 px-3.5 pb-1 pt-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className={cx("flex size-9 shrink-0 items-center justify-center rounded-lg", iconClassName)}>
            {icon}
          </span>
          <h2 className="truncate text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
