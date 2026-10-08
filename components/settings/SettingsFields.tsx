"use client";
import { useId, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { controlClass } from "../channels/config/fields";
import type { SelectOption } from "../../lib/settings-demo";
import SettingsIcon from "./SettingsIcons";

export function SettingsCard({
  icon,
  title,
  description,
  tone = "default",
  action,
  children,
  className,
}: {
  icon: string;
  title: string;
  description: string;
  tone?: "default" | "danger";
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const danger = tone === "danger";
  return (
    <section
      aria-labelledby={id}
      className={cx(
        "flex min-w-0 flex-col rounded-xl border px-[18px] pb-4 pt-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.03)]",
        danger ? "border-danger/35 bg-danger/[.06]" : "border-brand/20 bg-surface/70",
        className,
      )}
    >
      <header className="mb-3.5 flex items-start gap-2.5">
        <span className={cx("mt-0.5 flex size-8 shrink-0 items-center justify-center", danger ? "text-danger" : "text-brand")}>
          <SettingsIcon name={icon} size={28} stroke={1.7} />
        </span>
        <div className="min-w-0">
          <h2 id={id} className={cx("text-[17px] font-semibold leading-6 tracking-tight", danger ? "text-danger" : "text-fg")}>
            {title}
          </h2>
          <p className="mt-0.5 text-[13px] leading-5 text-fg-muted">{description}</p>
        </div>
        {action && <div className="ml-auto shrink-0">{action}</div>}
      </header>
      {children}
    </section>
  );
}

export function FieldBlock({ label, htmlFor, compact, children }: { label: string; htmlFor: string; compact?: boolean; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={htmlFor} className={cx("leading-4 text-fg-muted", compact ? "whitespace-nowrap text-[11px]" : "text-[13px]")}>
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldHeight = "!h-[38px]";

export function TextField({
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: string;
  type?: "text" | "email";
}) {
  const id = useId();
  return (
    <FieldBlock label={label} htmlFor={id}>
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <SettingsIcon name={icon} size={17} />
        </span>
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cx(controlClass, fieldHeight, "pl-10")} />
      </div>
    </FieldBlock>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  leading,
  compact,
  dense,
  }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  leading?: ReactNode;
  compact?: boolean;
  dense?: boolean;
  }) {
  const id = useId();
  return (
    <FieldBlock label={label} htmlFor={id} compact={compact}>
      <div className="relative">
        {leading && (
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-fg-muted">
            {leading}
          </span>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cx(
  controlClass,
  fieldHeight,
  "appearance-none pr-9",
  leading ? "pl-10" : compact ? "px-3" : "px-3",
  dense && "!pr-7 !text-[12.5px]",
  dense && (leading ? "!pl-9" : "!pl-2.5"),
  )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <Icon name="chevronDown" size={15} />
        </span>
      </div>
    </FieldBlock>
  );
}

export function SwitchRow({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative h-7 w-[52px] shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          checked ? "bg-brand" : "bg-[#3b4a5a]",
        )}
      >
        <span className={cx("absolute top-[3px] size-[22px] rounded-full bg-white shadow transition-[left]", checked ? "left-[27px]" : "left-[3px]")} />
      </button>
      <div className="min-w-0">
        <p id={`${id}-title`} className="text-[13.5px] font-medium leading-5 text-fg">
          {title}
        </p>
        <p id={`${id}-desc`} className="text-[12.5px] leading-4 text-fg-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export function BrazilFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden className="rounded-[3px]">
      <rect width="22" height="16" fill="#1fa24a" />
      <path d="M11 2.2 19.5 8 11 13.8 2.5 8Z" fill="#f6d12b" />
      <circle cx="11" cy="8" r="3.2" fill="#2455a8" />
    </svg>
  );
}

export function GoldBadge() {
  return (
    <span className="flex size-[22px] items-center justify-center rounded-md bg-gradient-to-br from-[#f5c542] to-[#c98a12] text-[#3a2600]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="m12 3 8 9-8 9-8-9 8-9Z" />
      </svg>
    </span>
  );
}

export function DollarBadge() {
  return <span className="text-[16px] font-medium leading-none text-fg-muted">$</span>;
}
