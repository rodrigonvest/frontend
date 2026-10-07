"use client";
import { useId, type ReactNode } from "react";
import { Icon } from "../../Icons";
import { cx } from "../../UI";

export const controlClass =
  "relative h-[38px] w-full rounded-lg border border-line-strong/50 bg-canvas/60 px-3 text-[13px] text-fg outline-none transition-colors placeholder:text-fg-subtle hover:border-line-strong focus-visible:border-brand disabled:opacity-45 disabled:hover:border-line-strong/50";

export function Panel({ title, badge, children, className }: { title: string; badge?: ReactNode; children: ReactNode; className?: string }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={cx("min-w-0 rounded-xl border border-line bg-surface px-4 pb-4 pt-3.5", className)}>
      <div className="mb-3 flex min-h-6 items-center justify-between gap-3">
        <h2 id={id} className="text-[15px] font-semibold leading-6 text-fg">
          {title}
        </h2>
        {badge}
      </div>
      {children}
    </section>
  );
}

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] text-fg-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FieldRow({ label, htmlFor, children }: { label: ReactNode; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[minmax(0,120px)_minmax(0,1fr)] sm:gap-3">
      <label htmlFor={htmlFor} className="text-[13px] text-fg-muted">
        {label}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Toggle({ checked, onChange, label, tone = "green", disabled }: { checked: boolean; onChange: (next: boolean) => void; label: string; tone?: "green" | "blue"; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50",
        checked ? (tone === "blue" ? "bg-brand-strong" : "bg-success") : "bg-[#3b4a5a]",
      )}
    >
      <span className={cx("absolute top-[3px] size-4 rounded-full bg-white shadow transition-[left]", checked ? "left-[21px]" : "left-[3px]")} />
    </button>
  );
}

export function ToggleLabel({ checked, onChange, label, text, tone }: { checked: boolean; onChange: (next: boolean) => void; label: string; text: string; tone?: "green" | "blue" }) {
  return (
    <div className="flex items-center gap-3">
      <Toggle checked={checked} onChange={onChange} label={label} tone={tone} />
      <span className="text-[13px] text-fg">{text}</span>
    </div>
  );
}

export function TextInput({ id, value, onChange, placeholder }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input id={id} type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={controlClass} />;
}

export function SelectInput({ id, value, onChange, options, label }: { id?: string; value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }>; label?: string }) {
  return (
    <div className="relative">
      <select id={id} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={cx(controlClass, "appearance-none pr-9")}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
        <Icon name="chevronDown" size={15} />
      </span>
    </div>
  );
}

export const toOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }));

export function UnitInput({ id, value, onChange, unit, label, disabled }: { id?: string; value: string; onChange: (v: string) => void; unit: string; label: string; disabled?: boolean }) {
  return (
    <div className={cx("flex h-[38px] overflow-hidden rounded-lg border border-line-strong/50 bg-canvas/60 transition-colors focus-within:border-brand hover:border-line-strong", disabled && "opacity-45")}>
      <input
        id={id}
        aria-label={label}
        inputMode="decimal"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        className="tabular min-w-0 flex-1 bg-transparent px-3 text-[13px] text-fg outline-none"
      />
      <span className="flex items-center whitespace-nowrap border-l border-line-strong/50 bg-surface-2/70 px-3 text-[13px] text-fg-muted">{unit}</span>
    </div>
  );
}

const timeIndicator =
  "[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-y-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-9 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

export function TimeInput({ value, onChange, label, disabled, compact }: { value: string; onChange: (v: string) => void; label: string; disabled?: boolean; compact?: boolean }) {
  return (
    <div className="relative">
      <input
        type="time"
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cx(controlClass, "tabular", compact ? "px-0.5 text-center text-[13px] [&::-webkit-calendar-picker-indicator]:hidden" : cx("pr-9", timeIndicator))}
      />
      {!compact && (
        <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <Icon name="clock" size={15} />
        </span>
      )}
    </div>
  );
}

export function Check({ checked, onChange, children, disabled }: { checked: boolean; onChange: (next: boolean) => void; children: ReactNode; disabled?: boolean }) {
  return (
    <label className={cx("flex items-center gap-2.5 text-[13px] text-fg", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden
        className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-line-strong bg-canvas/60 text-white transition-colors peer-checked:border-brand-strong peer-checked:bg-brand-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
      >
        <Icon name="check" size={12} stroke={3} />
      </span>
      {children}
    </label>
  );
}

export function Radio({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-fg">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className="flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas/60 transition-colors peer-checked:border-brand-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-checked:[&>span]:scale-100"
      >
        <span className="size-2.5 scale-0 rounded-full bg-brand transition-transform" />
      </span>
      {children}
    </label>
  );
}
