"use client";
import { useId, type ReactNode } from "react";
import { Icon } from "../Icons";
import { IconTile } from "../copytrix-ai/AiPrimitives";
import { Badge, cx } from "../UI";
import type { AccentTone, HttpMethod } from "../../lib/api-access-data";
import { useApiAccess } from "./ApiAccessContext";

export const CARD_SURFACE =
  "rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface shadow-[0_0_34px_-24px_rgba(21,154,242,.7)] backdrop-blur-sm";

const inlineIconTone: Record<AccentTone, string> = {
  blue: "text-brand",
  purple: "text-[#a77bff]",
  green: "text-success",
  amber: "text-warning",
};

interface ApiCardProps {
  title: string;
  icon: string;
  accent?: AccentTone;
  description?: string;
  badge?: string;
  action?: ReactNode;
  variant?: "tile" | "inline";
  className?: string;
  bodyClassName?: string;
  headingId?: string;
  children: ReactNode;
}

export function ApiCard({
  title,
  icon,
  accent = "blue",
  description,
  badge,
  action,
  variant = "tile",
  className,
  bodyClassName,
  headingId,
  children,
}: ApiCardProps) {
  const autoId = useId();
  const titleId = headingId ?? `${autoId}-title`;

  return (
    <section aria-labelledby={titleId} className={cx("flex min-w-0 flex-col", CARD_SURFACE, className)}>
      <header className="flex flex-wrap items-start gap-x-3.5 gap-y-3 px-4 pt-4 sm:px-5 sm:pt-5">
        {variant === "tile" ? (
          <IconTile name={icon} accent={accent} size={24} className="size-12" />
        ) : (
          <span aria-hidden className={cx("mt-0.5 flex", inlineIconTone[accent])}>
            <Icon name={icon} size={20} />
          </span>
        )}
        <div className="min-w-0 flex-1 basis-[200px]">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id={titleId} tabIndex={-1} className="text-[16px] font-semibold tracking-tight text-fg outline-none">
              {title}
            </h2>
            {badge && <Badge tone="green">{badge}</Badge>}
          </div>
          {description && <p className="mt-0.5 text-pretty text-[13px] leading-5 text-fg-muted">{description}</p>}
        </div>
        {action}
      </header>
      <div className={cx("flex-1 px-4 pb-4 pt-4 sm:px-5 sm:pb-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function IconButton({
  label,
  icon,
  onClick,
  tone = "default",
  className,
}: {
  label: string;
  icon: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tone?: "default" | "danger";
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx(
        "flex size-8 shrink-0 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-white/[.06] focus-visible:outline-2 focus-visible:outline-brand",
        tone === "danger" ? "hover:text-danger" : "hover:text-fg",
        className,
      )}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cx(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        checked ? "border-success/60 bg-success" : "border-line-strong bg-surface-3",
      )}
    >
      <span aria-hidden className={cx("absolute left-0.5 size-[18px] rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0")} />
    </button>
  );
}

const methodTone: Record<HttpMethod, string> = {
  GET: "border-success/40 bg-success/15 text-success",
  POST: "border-[#9b63ff]/50 bg-[#9b63ff]/20 text-[#c9adff]",
  DELETE: "border-danger/45 bg-danger/20 text-[#ff8a96]",
};

export function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span className={cx("inline-flex h-6 w-14 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold tracking-wide", methodTone[method])}>
      {method}
    </span>
  );
}

export function CodeBlock({ code, label, copyMessage }: { code: string; label: string; copyMessage: string }) {
  const { copy } = useApiAccess();
  return (
    <div className="min-w-0 rounded-lg border border-line bg-canvas/70">
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">{label}</span>
        <IconButton label={`Copiar código ${label}`} icon="copy" onClick={() => copy(code, copyMessage)} />
      </div>
      <pre tabIndex={0} className="overflow-x-auto p-3.5 font-mono text-[12.5px] leading-6 text-fg-muted focus-visible:outline-2 focus-visible:outline-brand">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function StatusDot({ tone }: { tone: "green" | "muted" }) {
  return <span aria-hidden className={cx("size-2 shrink-0 rounded-full", tone === "green" ? "bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" : "bg-fg-subtle")} />;
}
