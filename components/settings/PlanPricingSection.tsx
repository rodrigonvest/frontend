"use client";
import { useId, type ReactNode } from "react";
import { cx } from "../UI";
import { BuildingIcon, CheckBullet, CrownIcon, LayersIcon, PlaneIcon, StarIcon, TicketIcon } from "./PlanIcons";
import { formatUsd, planPrice, planPriceCaption, plans, type BillingCycle, type PlanDefinition, type PlanId } from "../../lib/plan-demo";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type PlanTheme = {
  card: string;
  iconWrap: string;
  icon: ReactNode;
  check: string;
  button: string;
};

const planThemes: Record<PlanId, PlanTheme> = {
  free: {
    card: "border-brand/20 bg-surface/60",
    iconWrap: "bg-brand-strong/20 text-brand ring-1 ring-brand/30",
    icon: <PlaneIcon size={30} />,
    check: "text-success",
    button: "border border-brand/50 bg-brand-soft/20 text-brand hover:bg-brand-soft/40",
  },
  starter: {
    card: "border-success/20 bg-surface/60",
    iconWrap: "bg-success/20 text-success ring-1 ring-success/30",
    icon: <StarIcon size={28} />,
    check: "text-success",
    button: "border border-success/50 bg-success/[.06] text-success hover:bg-success/15",
  },
  pro: {
    card: "border-2 border-brand-strong bg-gradient-to-b from-[#0d2a4a]/90 to-surface/80 shadow-[0_0_34px_rgba(8,127,240,.28)]",
    iconWrap: "bg-[#3a2f12] text-[#f5c542] ring-1 ring-[#f5c542]/30",
    icon: <CrownIcon size={30} />,
    check: "text-success",
    button: "bg-brand-strong text-white shadow-[0_0_20px_rgba(8,127,240,.35)] hover:bg-brand",
  },
  enterprise: {
    card: "border-[#8b5cf6]/25 bg-surface/60",
    iconWrap: "bg-[#8b5cf6]/20 text-[#a78bfa] ring-1 ring-[#8b5cf6]/30",
    icon: <BuildingIcon size={30} />,
    check: "text-success",
    button: "border border-[#8b5cf6]/60 bg-[#8b5cf6]/[.07] text-[#c4b5fd] hover:bg-[#8b5cf6]/20",
  },
};

function BillingCycleToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (next: BillingCycle) => void }) {
  const options: { id: BillingCycle; label: string }[] = [
    { id: "monthly", label: "Mensal" },
    { id: "annual", label: "Anual" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Ciclo de cobrança"
      className="inline-flex items-center gap-1 rounded-full border border-line-strong/60 bg-surface/70 p-1"
    >
      {options.map((option) => {
        const selected = option.id === cycle;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cx(
              "h-[38px] min-w-[100px] rounded-full px-5 text-[14px] transition-colors",
              focusRing,
              selected ? "bg-brand-strong font-semibold text-white shadow-[0_0_16px_rgba(8,127,240,.4)]" : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
      <span className="mx-1.5 rounded-full bg-success/20 px-3 py-1 text-[12px] font-semibold text-success">Até 20% OFF</span>
    </div>
  );
}

function PlanCard({ plan, cycle }: { plan: PlanDefinition; cycle: BillingCycle }) {
  const theme = planThemes[plan.id];
  const headingId = useId();
  const isCurrent = plan.cta === "Plano Atual";
  const price = planPrice(plan, cycle);

  return (
    <article aria-labelledby={headingId} className={cx("relative flex min-w-0 flex-col rounded-xl border p-[18px]", theme.card)}>
      {plan.popular && (
        <span className="absolute -top-px right-4 -translate-y-1/2 rounded-md bg-gradient-to-r from-[#8b5cf6] to-[#6d4ae0] px-3 py-1 text-[12px] font-semibold leading-4 text-white shadow-[0_0_14px_rgba(139,92,246,.5)]">
          Mais Popular
        </span>
      )}

      <header className="flex items-start gap-3.5">
        <span className={cx("flex size-[56px] shrink-0 items-center justify-center rounded-full", theme.iconWrap)}>{theme.icon}</span>
        <div className="min-w-0 pt-0.5">
          <h3 id={headingId} className="text-[18px] font-bold leading-6 tracking-tight text-fg">
            {plan.name}
          </h3>
          <p className="mt-1 text-[13px] leading-[19px] text-fg-muted">{plan.description}</p>
        </div>
      </header>

      <div className="mt-5">
        <p className="tabular text-[32px] font-bold leading-9 tracking-tight text-fg">{formatUsd(price)}</p>
        <p className="mt-0.5 text-[13px] text-fg-subtle">{planPriceCaption(plan, cycle)}</p>
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-[11px] pb-5 text-[14px] text-fg">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckBullet size={17} className={cx("shrink-0", theme.check)} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-disabled={isCurrent || undefined}
        className={cx(
          "inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-lg text-[14px] font-medium transition-colors",
          focusRing,
          isCurrent && "cursor-default",
          theme.button,
        )}
      >
        {plan.id === "pro" && <TicketIcon size={17} />}
        {plan.cta}
      </button>
    </article>
  );
}

export default function PlanPricingSection({ cycle, onCycleChange }: { cycle: BillingCycle; onCycleChange: (next: BillingCycle) => void }) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center text-brand">
            <LayersIcon size={36} />
          </span>
          <div>
            <h2 id={titleId} className="text-[20px] font-semibold leading-7 tracking-tight text-fg">
              Escolha o Plano Ideal
            </h2>
            <p className="text-[14px] leading-5 text-fg-muted">Faça upgrade ou downgrade do seu plano a qualquer momento.</p>
          </div>
        </div>
        <BillingCycleToggle cycle={cycle} onChange={onCycleChange} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} cycle={cycle} />
        ))}
      </div>
    </section>
  );
}
