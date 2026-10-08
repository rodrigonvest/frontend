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
  children,
  className,
}: {
  icon: string;
  title: string;
  description: string;
  tone?: "default" | "danger";
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const danger = tone === "danger";
  return (
    <section
      aria-labelledby={id}
      className={cx(
        "flex min-w-0 flex-col rounded-xl border px-5 pb-5 pt-4",
        danger ? "border-danger/35 bg-danger/[.06]" : "border-line bg-surface/70",
        className,
      )}
    >
      <header className="mb-4 flex items-start gap-3">
        <span className={cx("mt-0.5 flex size-8 shrink-0 items-center justify-center", danger ? "text-danger" : "text-brand")}>
          <SettingsIcon name={icon} size={26} stroke={1.7} />
        </span>
        <div className="min-w-0">
          <h2 id={id} className={cx("text-[18px] font-semibold leading-6 tracking-tight", danger ? "text-danger" : "text-fg")}>
            {title}
          </h2>
          <p className="mt-0.5 text-[13px] leading-5 text-fg-muted">{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

export function FieldBlock({ label, htmlFor, compact, children }: { label: string; htmlFor: string; compact?: boolean; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={htmlFor} className={cx("leading-4 text-fg-muted", compact ? "text-[11.5px]" : "text-[13px]")}>
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldHeight = "!h-10";

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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  leading?: ReactNode;
  compact?: boolean;
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
          className={cx(controlClass, fieldHeight, "appearance-none pr-9", leading ? "pl-10" : compact ? "px-3" : "px-3")}
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
    <div className="flex items-center gap-3.5">
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative h-[26px] w-[50px] shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          checked ? "bg-success" : "bg-[#3b4a5a]",
        )}
      >
        <span className={cx("absolute top-[3px] size-5 rounded-full bg-white shadow transition-[left]", checked ? "left-[27px]" : "left-[3px]")} />
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
