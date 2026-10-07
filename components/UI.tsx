import type { ButtonHTMLAttributes, ReactNode } from "react";

export type Tone = "neutral" | "green" | "amber" | "red" | "blue";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xl border border-line bg-surface", className)}>{children}</div>;
}

const badgeTones: Record<Tone, string> = {
  neutral: "border-line-strong/70 bg-surface-2 text-fg-muted",
  green: "border-success/35 bg-success-soft text-success",
  amber: "border-warning/35 bg-warning-soft text-warning",
  red: "border-danger/35 bg-danger-soft text-danger",
  blue: "border-brand/40 bg-brand-soft/70 text-[#5cc2ff]",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium leading-5", badgeTones[tone], className)}>
      {children}
    </span>
  );
}

const statAccent = {
  blue: "text-brand bg-brand/12",
  green: "text-success bg-success/12",
  red: "text-danger bg-danger/12",
  amber: "text-warning bg-warning/12",
};

export function Stat({
  label,
  value,
  note,
  positive,
  icon,
  accent = "blue",
}: {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
  icon?: ReactNode;
  accent?: keyof typeof statAccent;
}) {
  const valueColor = positive === false ? "text-danger" : positive === true && value !== "—" ? "text-success" : "text-fg";
  return (
    <div className="flex min-h-[88px] items-center gap-3.5 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4">
      {icon && <div className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl", statAccent[accent])}>{icon}</div>}
      <div className="min-w-0">
        <div className="text-xs leading-4 text-fg-muted">{label}</div>
        <div className={cx("tabular mt-1 truncate text-[22px] font-semibold leading-tight tracking-tight", valueColor)}>{value}</div>
        {note && <div className="mt-0.5 truncate text-[11px] text-fg-subtle">{note}</div>}
      </div>
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand",
  secondary: "border border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-2",
  ghost: "text-fg-muted hover:bg-white/[.04] hover:text-fg",
};

export function Button({
  variant = "secondary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-3.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-fg">{title}</h2>
        {description && <p className="mt-0.5 text-xs leading-5 text-fg-subtle">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, description, className }: { title: string; description?: ReactNode; className?: string }) {
  return (
    <div className={cx("flex flex-col items-center justify-center rounded-lg border border-dashed border-line px-4 py-8 text-center", className)}>
      <p className="text-sm font-medium text-fg-muted">{title}</p>
      {description && <p className="mt-1 max-w-sm text-xs leading-5 text-fg-subtle">{description}</p>}
    </div>
  );
}

export function PreviewBadge({ label = "Demonstrativo" }: { label?: string }) {
  return (
    <Badge tone="amber">
      <span aria-hidden className="size-1.5 rounded-full bg-warning" />
      {label}
    </Badge>
  );
}

const noticeTones = {
  warning: { box: "border-warning/25 bg-warning-soft/40 text-[#e9d7a7]", dot: "bg-warning" },
  danger: { box: "border-danger/30 bg-danger/10 text-[#f4b8b8]", dot: "bg-danger" },
  success: { box: "border-success/30 bg-success/10 text-[#b5e8c9]", dot: "bg-success" },
} as const;

export function Notice({ children, tone = "warning" }: { children: ReactNode; tone?: keyof typeof noticeTones }) {
  const styles = noticeTones[tone];
  return (
    <div role="note" className={cx("flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs leading-5", styles.box)}>
      <span aria-hidden className={cx("mt-1.5 size-1.5 shrink-0 rounded-full", styles.dot)} />
      <div>{children}</div>
    </div>
  );
}
