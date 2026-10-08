import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { panelClass } from "../backtest/BacktestFields";
import { cx } from "../UI";

export default function ReportPanel({
  icon,
  title,
  description,
  action,
  className,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cx(panelClass, "flex min-w-0 flex-col p-4", className)}>
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0b3256] text-[#2f95ff]">
            <Icon name={icon} size={20} />
          </span>
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold leading-5 tracking-tight text-fg">{title}</h2>
            <p className="mt-0.5 text-xs leading-4 text-fg-muted">{description}</p>
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
