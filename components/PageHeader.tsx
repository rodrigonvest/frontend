import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  breadcrumb,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  breadcrumb?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        {breadcrumb}
        {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand">{eyebrow}</p>}
        <h1 className="mt-1 text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-6 text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
