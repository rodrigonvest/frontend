"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export type ToastTone = "success" | "error" | "info";
export type Notify = (message: string, tone?: ToastTone) => void;

interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = useCallback<Notify>((message, tone = "success") => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, tone });
    timer.current = setTimeout(() => setToast(null), 4500);
  }, []);

  return { toast, notify };
}

const toneStyles: Record<ToastTone, { box: string; icon: string; name: string }> = {
  success: { box: "border-success/40", icon: "text-success", name: "check" },
  error: { box: "border-danger/50", icon: "text-danger", name: "alert" },
  info: { box: "border-brand/50", icon: "text-brand", name: "info" },
};

export function ToastRegion({ toast }: { toast: ToastState | null }) {
  return (
    <div role="status" aria-live="polite" data-api-toast className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-end">
      {toast && (
        <p
          key={toast.id}
          className={cx(
            "pointer-events-auto flex max-w-md items-start gap-2.5 rounded-lg border bg-surface-2 px-4 py-3 text-[13px] leading-5 text-fg shadow-2xl shadow-black/50",
            toneStyles[toast.tone].box,
          )}
        >
          <span aria-hidden className={cx("mt-0.5 shrink-0", toneStyles[toast.tone].icon)}>
            <Icon name={toneStyles[toast.tone].name} size={16} stroke={2.4} />
          </span>
          <span>{toast.message}</span>
        </p>
      )}
    </div>
  );
}
