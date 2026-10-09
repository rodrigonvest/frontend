"use client";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import type { BadgeTone } from "../../lib/marketplace-data";

export function HeartIcon({ filled, size = 18 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.3 4.8 6.6 4.5c2-.2 3.7.8 5.4 2.9 1.7-2.1 3.4-3.1 5.4-2.9 3.3.3 5 3.5 3.9 6.6-1.8 4.8-9.3 9.4-9.3 9.4Z" />
    </svg>
  );
}

export function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" />
    </svg>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span title="Autor verificado" className={cx("inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-brand text-white", className)}>
      <Icon name="check" size={9} stroke={3} />
      <span className="sr-only">Autor verificado</span>
    </span>
  );
}

const tagStyles: Record<string, string> = {
  Scalping: "border-brand/40 bg-brand/15 text-[#5cc2ff]",
  "Day Trade": "border-brand/40 bg-brand/15 text-[#5cc2ff]",
  "Swing Trade": "border-brand/40 bg-brand/15 text-[#5cc2ff]",
  "Prop Firm": "border-[#a78bfa]/45 bg-[#a78bfa]/15 text-[#c4b5fd]",
  Conservador: "border-success/40 bg-success/12 text-success",
  Agressivo: "border-danger/40 bg-danger/12 text-danger",
  Criptomoedas: "border-[#f59e0b]/45 bg-[#f59e0b]/15 text-[#fbbf24]",
  XAUUSD: "border-warning/50 bg-warning/15 text-warning",
  "Multi-Ativos": "border-line-strong bg-surface-2 text-fg-muted",
};

export function Tag({ label }: { label: string }) {
  return (
    <span className={cx("inline-flex h-5 items-center whitespace-nowrap rounded-md border px-1.5 text-[10.5px] font-medium", tagStyles[label] ?? "border-brand/30 bg-brand-soft/60 text-[#8fd3ff]")}>
      {label}
    </span>
  );
}

const badgeStyles: Record<BadgeTone, string> = {
  gold: "border-warning/50 bg-warning/20 text-warning",
  teal: "border-success/45 bg-success/15 text-success",
  orange: "border-[#fb923c]/50 bg-[#fb923c]/18 text-[#fdba74]",
  slate: "border-[#8b9cff]/40 bg-[#8b9cff]/15 text-[#b4bfff]",
  purple: "border-[#a78bfa]/50 bg-[#a78bfa]/20 text-[#c4b5fd]",
  green: "border-success/45 bg-success/15 text-success",
  red: "border-danger/45 bg-danger/15 text-danger",
  blue: "border-brand/50 bg-brand/20 text-[#5cc2ff]",
};

export function HighlightBadge({ label, tone }: { label: string; tone: BadgeTone }) {
  return (
    <span className={cx("inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2 text-[11px] font-semibold", badgeStyles[tone])}>
      {tone === "gold" && <Icon name="crown" size={11} />}
      {label}
    </span>
  );
}

export function MpSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className={cx("relative block", className)}>
      <select
        {...props}
        className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-line-strong bg-canvas/70 pl-3 pr-8 text-[12.5px] text-fg outline-none transition-colors [color-scheme:dark] hover:border-brand/50 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/60"
      >
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-subtle">
        <Icon name="chevronDown" size={14} />
      </span>
    </span>
  );
}

export function RangeField({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px]">
        <label htmlFor={id} className="text-fg-muted">
          {label}
        </label>
        <output htmlFor={id} className="tabular font-semibold text-fg">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1.5 h-1.5 w-full cursor-pointer accent-brand"
      />
    </div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12.5px] leading-5 text-fg-muted">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === "string" ? label : undefined}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          checked ? "border-success/60 bg-success/80" : "border-line-strong bg-surface-3",
        )}
      >
        <span className={cx("absolute top-0.5 size-4.5 rounded-full bg-white shadow transition-[left]", checked ? "left-[22px]" : "left-0.5")} />
      </button>
    </div>
  );
}

export function Avatar({ name, size = 22 }: { name: string; size?: number }) {
  const palette = ["#159af2", "#12d99e", "#a78bfa", "#f0c35c", "#ff7a59", "#38bdf8"];
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${palette[hash % palette.length]}, #0b3a5c)` }}
      className="flex shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
    >
      {initials}
    </span>
  );
}
