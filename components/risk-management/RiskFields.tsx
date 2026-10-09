"use client";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { Switch } from "../multi-account/MaPrimitives";

export function Panel({
  title,
  icon,
  action,
  className,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cx("flex min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4", className)}>
      <header className="mb-3 flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand/12 text-brand">
          <Icon name={icon} size={16} />
        </span>
        <h2 className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export function HelpTip({ text }: { text: string }) {
  return (
    <span role="img" aria-label={text} title={text} className="inline-flex shrink-0 cursor-help text-fg-subtle hover:text-fg-muted">
      <Icon name="info" size={14} />
    </span>
  );
}

export function FieldRow({ label, help, children, controlClass = "w-[150px]" }: { label: string; help?: string; children: ReactNode; controlClass?: string }) {
  return (
    <div className="flex min-h-9 items-center gap-2 py-[3px]">
      <span className="min-w-0 flex-1 text-[13px] leading-4 text-fg-muted">{label}</span>
      {help && <HelpTip text={help} />}
      <div className={cx("shrink-0", controlClass)}>{children}</div>
    </div>
  );
}

export function ToggleRow({ label, help, checked, onChange }: { label: string; help?: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <div className="flex min-h-9 items-center gap-2 py-[3px]">
      <span className="min-w-0 flex-1 text-[13px] leading-4 text-fg-muted">{label}</span>
      {help && <HelpTip text={help} />}
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export function SelectBox({ value, onChange, options, label }: { value: string; onChange: (next: string) => void; options: { value: string; label: string }[]; label: string }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full cursor-pointer appearance-none rounded-md border border-line bg-canvas pl-2.5 pr-8 text-[13px] text-fg [color-scheme:dark] focus-visible:border-brand focus-visible:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-muted">
        <Icon name="chevronDown" size={14} />
      </span>
    </div>
  );
}

export function TextBox({ value, onChange, label, placeholder }: { value: string; onChange: (next: string) => void; label: string; placeholder?: string }) {
  return (
    <input
      aria-label={label}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 w-full rounded-md border border-line bg-canvas px-2.5 text-[13px] text-fg placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-none"
    />
  );
}
