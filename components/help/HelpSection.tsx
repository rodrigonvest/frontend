import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import { cx } from "../UI";

export function HelpSection({
  id,
  title,
  action,
  className,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cx(SURFACE, "@container min-w-0 scroll-mt-24 p-4 sm:p-5", className)}>
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2
          id={titleId}
          tabIndex={-1}
          className="rounded text-[17px] font-semibold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {title}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export function SectionLink({ label, hint, onClick }: { label: string; hint: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hint}
      className={cx(
        "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 text-[12.5px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand/10 hover:text-white",
        FOCUS_RING,
      )}
    >
      {label}
      <Icon name="arrowRight" size={14} />
    </button>
  );
}
