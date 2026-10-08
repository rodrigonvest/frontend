"use client";
import { useId, type ReactNode } from "react";
import { cx } from "../UI";
import { controlClass } from "../channels/config/fields";
import { FieldBlock } from "./SettingsFields";
import { CopyButton } from "./SecurityFields";

export function NotificationCard({
  icon,
  title,
  description,
  badge,
  children,
  className,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <section
      aria-labelledby={id}
      className={cx("flex min-w-0 flex-col rounded-xl border border-brand/20 bg-surface/70 px-4 pb-4 pt-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.03)]", className)}
    >
      <header className={cx("flex gap-3", description ? "mb-3.5 items-start" : "mb-3 items-center")}>
        <span className="flex shrink-0 items-center justify-center text-brand">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 id={id} className="text-[16px] font-semibold leading-6 tracking-tight text-fg">
              {title}
            </h2>
            {badge}
          </div>
          {description && <p className="mt-0.5 text-[12.5px] leading-[18px] text-fg-muted">{description}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

export function StatusBadge({ tone, children }: { tone: "success" | "muted"; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex h-[22px] shrink-0 items-center rounded-md px-2 text-[11.5px] font-semibold leading-none",
        tone === "success" ? "bg-success/90 text-[#052b22]" : "bg-[#3b4a5a] text-fg",
      )}
    >
      {children}
    </span>
  );
}

export function NotificationToggle({
  checked,
  onChange,
  label,
  size = "md",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const small = size === "sm";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        small ? "h-[18px] w-[34px]" : "h-[22px] w-[40px]",
        checked ? "bg-brand-strong" : "bg-[#3b4a5a]",
      )}
    >
      <span
        className={cx(
          "absolute rounded-full bg-white shadow transition-[left]",
          small ? "top-[2px] size-[14px]" : "top-[3px] size-4",
          small ? (checked ? "left-[18px]" : "left-[2px]") : checked ? "left-[21px]" : "left-[3px]",
        )}
      />
    </button>
  );
}

export function ToggleRow({
  checked,
  onChange,
  title,
  description,
  compact,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <NotificationToggle checked={checked} onChange={onChange} label={title} size={compact ? "sm" : "md"} />
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-[18px] text-fg">{title}</p>
        {description && <p className="text-[11.5px] leading-4 text-fg-muted">{description}</p>}
      </div>
    </div>
  );
}

export function CopyField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <FieldBlock label={label} htmlFor={id}>
      <div className="flex items-center gap-2">
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cx(controlClass, "tabular !h-[38px] min-w-0 flex-1")} />
        <CopyButton value={value} label={`Copiar ${label}`} className="!size-[38px] !border-brand-strong/50 !bg-brand/10 !text-brand" />
      </div>
    </FieldBlock>
  );
}

export function TextInputField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: "text" | "email" | "url" }) {
  const id = useId();
  return (
    <FieldBlock label={label} htmlFor={id}>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cx(controlClass, "!h-[38px]")} />
    </FieldBlock>
  );
}

export const primaryButtonClass =
  "inline-flex h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-brand-strong px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
