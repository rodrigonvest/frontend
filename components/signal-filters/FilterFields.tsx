"use client";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export function ChipSelect({
  label,
  values,
  options,
  onChange,
  tone = "brand",
}: {
  label: string;
  values: string[];
  options: string[];
  onChange: (next: string[]) => void;
  tone?: "brand" | "danger";
}) {
  const remaining = options.filter((option) => !values.includes(option));
  return (
    <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-line bg-canvas p-1.5 focus-within:border-brand">
      {values.map((value) => (
        <span
          key={value}
          className={cx(
            "inline-flex h-7 items-center gap-1 rounded border pl-2 pr-1 text-[12px] font-medium text-fg",
            tone === "brand" ? "border-brand-strong/50 bg-brand-soft/60" : "border-danger/50 bg-danger-soft/70",
          )}
        >
          {value}
          <button
            type="button"
            aria-label={`Remover ${value}`}
            onClick={() => onChange(values.filter((item) => item !== value))}
            className="inline-flex size-5 items-center justify-center rounded text-fg-muted hover:bg-white/[.08] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Icon name="x" size={12} stroke={2.4} />
          </button>
        </span>
      ))}
      {remaining.length > 0 && (
        <select
          aria-label={`Adicionar ${label}`}
          value=""
          onChange={(event) => event.target.value && onChange([...values, event.target.value])}
          className="h-7 min-w-[90px] flex-1 cursor-pointer bg-transparent text-[12px] text-fg-muted outline-none [color-scheme:dark]"
        >
          <option value="">+ Adicionar</option>
          {remaining.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export function CheckField({ label, checked, onChange, tone = "default" }: { label: string; checked: boolean; onChange: (next: boolean) => void; tone?: "default" | "buy" | "sell" }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[13px]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-[18px] shrink-0 cursor-pointer rounded accent-[#087ff0]" />
      <span className={tone === "buy" ? "text-brand" : tone === "sell" ? "text-danger" : "text-fg"}>{label}</span>
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 5 }: { label: string; value: string; onChange: (next: string) => void; rows?: number }) {
  return (
    <textarea
      aria-label={label}
      value={value}
      rows={rows}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
      className="w-full resize-none rounded-md border border-line bg-canvas px-2.5 py-2 text-[12.5px] leading-[1.35] text-fg placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-none"
    />
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 text-[13px] text-fg-muted">{children}</div>;
}

export type DonutSegment = { value: number; color: string };

export function Donut({ segments, size = 120, thickness = 14, children }: { segments: DonutSegment[]; size?: number; thickness?: number; children?: ReactNode }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const visible = segments.filter((segment) => segment.value > 0);
  const total = visible.reduce((sum, segment) => sum + segment.value, 0);
  const gap = visible.length > 1 ? 3 : 0;
  let offset = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg aria-hidden viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#122d46" strokeWidth={thickness} />
        {total > 0 &&
          visible.map((segment) => {
            const length = (segment.value / total) * circumference;
            const circle = (
              <circle
                key={segment.color}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={thickness}
                strokeDasharray={`${Math.max(length - gap, 0)} ${circumference}`}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return circle;
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}
