"use client";
import { useEffect, useId, useState } from "react";
import { cx } from "../UI";
import { controlClass } from "../channels/config/fields";
import SettingsIcon from "./SettingsIcons";
import { FieldBlock } from "./SettingsFields";

export const outlineButtonClass =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-strong/70 bg-brand/10 px-4 text-[13px] font-medium text-brand transition-colors hover:bg-brand/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const dangerButtonClass =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-danger/45 bg-danger/10 px-3.5 text-[13px] font-medium text-danger transition-colors hover:bg-danger/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard can be blocked inside iframes; the visual feedback still applies.
    }
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copiado" : label}
      title={copied ? "Copiado" : label}
      className={cx(
        "flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-strong/50 bg-surface-3/70 transition-colors hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        copied ? "text-success" : "text-fg-muted",
        className,
      )}
    >
      <SettingsIcon name={copied ? "check" : "copy"} size={16} />
    </button>
  );
}

export function PasswordField({ label, value, onChange, autoComplete }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <FieldBlock label={label} htmlFor={id}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={cx(controlClass, "!h-[40px] pr-11 tracking-wide")}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
        >
          <SettingsIcon name={visible ? "eye" : "eyeOff"} size={18} />
        </button>
      </div>
    </FieldBlock>
  );
}
