import type { ComponentProps, ReactNode } from "react";
import { cx } from "../UI";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import type { AccountAccent } from "../../lib/account-data";
import { AccountIcon } from "./AccountIcons";

const ACCENTS: Record<AccountAccent, string> = {
  purple: "bg-[#9b63ff]/15 text-[#a77bff]",
  blue: "bg-brand/15 text-brand",
  green: "bg-success/15 text-success",
  amber: "bg-warning/15 text-warning",
  red: "bg-danger/15 text-danger",
};

export function IconTile({
  name,
  accent = "blue",
  size = 20,
  className,
}: {
  name: string;
  accent?: AccountAccent;
  size?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl", ACCENTS[accent], className)}>
      <AccountIcon name={name} size={size} />
    </span>
  );
}

export function AccountCard({
  id,
  title,
  action,
  children,
  className,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cx(SURFACE, "@container min-w-0 p-5", className)}>
      <header className="flex min-h-8 flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h2 id={id} className="text-[17px] font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {action}
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function OutlineActionButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand/70 bg-brand/5 px-4 text-[13px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand/15 hover:text-white",
        FOCUS_RING,
        className,
      )}
    />
  );
}

export function RowButton({
  variant = "outline",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: "outline" | "primary" }) {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        "inline-flex h-9 min-w-[88px] shrink-0 items-center justify-center whitespace-nowrap rounded-md border px-3.5 text-[12.5px] font-medium transition-colors",
        variant === "primary"
          ? "border-brand-strong bg-brand-strong text-white hover:bg-brand"
          : "border-line-strong bg-surface text-fg hover:bg-surface-3",
        FOCUS_RING,
        className,
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  labelledBy,
  describedBy,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  labelledBy: string;
  describedBy?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
        checked ? "border-success/60 bg-success" : "border-line-strong bg-surface-3",
        FOCUS_RING,
      )}
    >
      <span
        aria-hidden
        className={cx(
          "absolute left-0.5 top-0.5 size-[22px] rounded-full bg-white shadow-md transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

export function VerifiedLabel({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 text-[13px] font-medium text-success", className)}>
      <AccountIcon name="checkCircle" size={17} stroke={2} />
      Verificado
    </span>
  );
}
