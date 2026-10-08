"use client";
import { useId, type ReactNode } from "react";
import { Icon } from "../../Icons";
import { cx } from "../../UI";

export const inputClass =
  "h-9 w-full min-w-0 rounded-md border border-[#24435d] bg-[#08192a] px-3 text-[13px] text-fg [color-scheme:dark] placeholder:text-fg-subtle transition-colors focus-visible:border-brand focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export function ConfigCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId} className={cx("min-w-0 rounded-lg border border-line bg-surface/80 p-3.5", className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={titleId} className="text-[15px] font-semibold leading-6 text-fg">
            {title}
          </h2>
          {description && <p className="mt-0.5 text-[12.5px] leading-5 text-fg-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Label({ htmlFor, children, className }: { htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cx("text-[13px] leading-5 text-fg-muted", className)}>
      {children}
    </label>
  );
}

export function Field({ id, label, inline, children }: { id: string; label: string; inline?: boolean; children: ReactNode }) {
  return (
    <div className={cx(inline ? "grid grid-cols-[minmax(96px,0.85fr)_minmax(0,1.6fr)] items-center gap-3" : "flex flex-col gap-1.5")}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const dotTone: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-brand",
  neutral: "bg-fg-subtle",
};

const badgeTone: Record<StatusTone, string> = {
  success: "border-success/40 bg-success-soft/70 text-success",
  warning: "border-warning/40 bg-warning-soft text-warning",
  danger: "border-danger/40 bg-danger-soft text-danger",
  info: "border-brand/40 bg-brand-soft/60 text-[#5cc2ff]",
  neutral: "border-line-strong bg-surface-2 text-fg-muted",
};

export function StatusDot({ tone, className }: { tone: StatusTone; className?: string }) {
  return <span aria-hidden className={cx("size-2.5 shrink-0 rounded-full", dotTone[tone], className)} />;
}

export function StatusBadge({ tone, children, className }: { tone: StatusTone; children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex h-[22px] items-center rounded-md border px-2 text-[11.5px] font-medium", badgeTone[tone], className)}>
      {children}
    </span>
  );
}

export function TextField({
  label,
  value,
  onChange,
  inline,
  unit,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inline?: boolean;
  unit?: string;
  inputMode?: "decimal" | "numeric" | "text";
}) {
  const id = useId();
  return (
    <Field id={id} label={label} inline={inline}>
      {unit ? (
        <UnitInput id={id} value={value} onChange={onChange} unit={unit} inputMode={inputMode} />
      ) : (
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} inputMode={inputMode} autoComplete="off" className={inputClass} />
      )}
    </Field>
  );
}

export function UnitInput({
  id,
  ariaLabel,
  value,
  onChange,
  unit,
  disabled,
  inputMode = "decimal",
}: {
  id?: string;
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  disabled?: boolean;
  inputMode?: "decimal" | "numeric" | "text";
}) {
  return (
    <div className="flex min-w-0">
      <input
        id={id}
        aria-label={ariaLabel}
        value={value}
        disabled={disabled}
        inputMode={inputMode}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        className={cx(inputClass, "rounded-r-none border-r-0")}
      />
      <span
        aria-hidden
        className={cx(
          "inline-flex min-w-[58px] items-center justify-center rounded-r-md border border-[#24435d] bg-[#0c2236] px-2.5 text-xs text-fg-muted",
          disabled && "opacity-50",
        )}
      >
        {unit}
      </span>
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const id = useId();
  return (
    <Field id={id} label={label}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(inputClass, "h-auto resize-none py-2 leading-5")}
      />
    </Field>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  inline,
  leading,
  disabled,
}: {
  label: string;
  value: T;
  onChange?: (value: T) => void;
  options: ReadonlyArray<{ value: T; label: string }>;
  inline?: boolean;
  leading?: ReactNode;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <Field id={id} label={label} inline={inline}>
      <div className="relative min-w-0">
        {leading && <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center">{leading}</span>}
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value as T)}
          className={cx(inputClass, "appearance-none pr-9", leading ? "pl-10" : undefined)}
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
    </Field>
  );
}

export function TimeInput({
  id,
  ariaLabel,
  value,
  onChange,
  disabled,
}: {
  id?: string;
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type="time"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cx(inputClass, "tabular")}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative h-[22px] w-10 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-success" : "bg-[#243c52]",
        )}
      >
        <span
          aria-hidden
          className={cx("absolute left-0.5 top-0.5 size-[18px] rounded-full bg-white shadow transition-transform", checked && "translate-x-[18px]")}
        />
      </button>
      <label htmlFor={id} className="cursor-pointer text-[13px] leading-5 text-fg">
        {label}
      </label>
    </div>
  );
}

export function CheckboxChip({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label className={cx("inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-fg", disabled && "cursor-not-allowed opacity-50")}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="grid size-4 place-items-center rounded-[4px] border border-[#3a5a75] text-white transition-colors peer-checked:border-brand-strong peer-checked:bg-brand-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
      >
        <Icon name="check" size={12} stroke={3} />
      </span>
      {label}
    </label>
  );
}

export function RadioRow({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-fg">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className="grid size-[18px] shrink-0 place-items-center rounded-full border border-[#3a5a75] text-white transition-colors peer-checked:border-brand-strong peer-checked:bg-brand-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
      >
        <Icon name="check" size={12} stroke={3} />
      </span>
      {label}
    </label>
  );
}

export const outlineButtonClass =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md border border-brand/60 bg-brand-soft/30 px-3 text-xs font-medium text-[#5cc2ff] transition-colors hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
