"use client";
import type { ReactNode } from "react";
import { cx } from "../UI";
import { CheckIcon } from "./AppearanceIcons";

export function CheckBadge({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx("flex size-[22px] items-center justify-center rounded-full bg-brand text-white shadow-[0_0_10px_rgba(21,154,242,.55)]", className)}>
      <CheckIcon size={13} />
    </span>
  );
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  showBadge,
  children,
  className,
  surfaceClassName,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  showBadge?: boolean;
  children: ReactNode;
  className?: string;
  surfaceClassName?: string;
}) {
  return (
    <label className={cx("relative block min-w-0 cursor-pointer", className)}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <span
        className={cx(
          "block h-full rounded-xl border transition-[border-color,background-color,box-shadow] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
          checked
            ? "border-brand-strong bg-brand-strong/[.12] shadow-[0_0_0_1px_var(--color-brand-strong),0_0_22px_rgba(8,127,240,.28)]"
            : "border-line bg-canvas/40 hover:border-line-strong hover:bg-surface-2/60",
          surfaceClassName,
        )}
      >
        {children}
      </span>
      {checked && showBadge && <CheckBadge className="absolute right-2.5 top-2.5" />}
    </label>
  );
}
