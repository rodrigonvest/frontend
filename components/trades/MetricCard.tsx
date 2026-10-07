import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export default function MetricCard({
  label,
  icon,
  tone = "green",
  children,
}: {
  label: string;
  icon?: string;
  tone?: "green" | "red";
  children: ReactNode;
}) {
  return (
    <div className="flex h-[76px] min-w-0 items-center gap-3 rounded-xl border border-line bg-surface px-4">
      {icon && (
        <span
          aria-hidden
          className={cx(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            tone === "green" ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
          )}
        >
          <Icon name={icon} size={20} stroke={2} />
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-[12.5px] text-fg-muted">{label}</p>
        <p className="mt-0.5 truncate text-[21px] font-bold leading-7 tabular text-fg">{children}</p>
      </div>
    </div>
  );
}
