import { Icon } from "../Icons";
import { cx } from "../UI";
import { PLAN_OFFERS, type PlanOffer, type PlanTone } from "../../lib/billing-data";
import { BillingIcon } from "./BillingIcons";
import { FOCUS_RING, SURFACE } from "./BillingPrimitives";

const toneStyles: Record<PlanTone, { card: string; tile: string; check: string; highlight: string; cta: string }> = {
  slate: {
    card: "border-line-strong/70 bg-canvas/35",
    tile: "bg-[#2a3f55]/70 text-[#9fb4c8]",
    check: "bg-success",
    highlight: "border-success/60 bg-success/5 shadow-[0_0_14px_-6px_rgba(18,217,158,.7)]",
    cta: "border border-line-strong bg-canvas/60 text-fg hover:border-brand hover:bg-brand/10",
  },
  brand: {
    card: "border-brand bg-gradient-to-b from-brand-soft/40 to-canvas/40 shadow-[0_0_32px_-8px_rgba(21,154,242,.75)]",
    tile: "bg-warning/15 text-warning",
    check: "bg-brand-strong",
    highlight: "border-brand bg-brand/10 shadow-[0_0_14px_-6px_rgba(21,154,242,.9)]",
    cta: "border border-brand/70 bg-brand/10 text-[#5cc2ff]",
  },
  purple: {
    card: "border-[#9b63ff]/45 bg-gradient-to-b from-[#2a1d5c]/30 to-canvas/40",
    tile: "bg-[#9b63ff]/15 text-[#a77bff]",
    check: "bg-[#8f5cf5]",
    highlight: "border-[#9b63ff]/70 bg-[#9b63ff]/10 shadow-[0_0_14px_-6px_rgba(155,99,255,.9)]",
    cta: "bg-[#6d3fe0] text-white shadow-[0_0_22px_-8px_rgba(155,99,255,.9)] hover:bg-[#7c52ee]",
  },
};

function PlanCard({ plan, onUpgrade }: { plan: PlanOffer; onUpgrade: (plan: PlanOffer) => void }) {
  const styles = toneStyles[plan.tone];
  const titleId = `plan-${plan.id}-title`;
  return (
    <li className="flex min-w-0">
      <article aria-labelledby={titleId} aria-current={plan.current ? "true" : undefined} className={cx("relative flex w-full flex-col rounded-xl border p-4", styles.card)}>
        {plan.current && (
          <span className="absolute -top-3 right-4 rounded-md bg-brand-strong px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_0_16px_-2px_rgba(21,154,242,.9)]">
            Plano atual
          </span>
        )}
        <div className="flex items-center gap-3">
          <span aria-hidden className={cx("flex size-[52px] shrink-0 items-center justify-center rounded-xl", styles.tile)}>
            <BillingIcon name={plan.icon} size={28} stroke={1.6} />
          </span>
          <div className="min-w-0">
            <h3 id={titleId} className="text-[17px] font-semibold text-fg">
              {plan.name}
              {plan.current && <span className="sr-only"> (plano atual)</span>}
            </h3>
            <p className="flex flex-wrap items-baseline gap-x-1">
              <span className="tabular text-[24px] font-bold leading-8 tracking-tight text-fg">{plan.price}</span>
              <span className="text-[13px] text-fg-muted">/mês</span>
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-1 flex-col gap-1.5">
          {plan.features.map((feature) => {
            const highlighted = feature === plan.highlight;
            return (
              <li
                key={feature}
                className={cx(
                  "flex items-start gap-2.5 rounded-md border border-transparent px-2 py-1 text-[13px] leading-5 text-fg-muted",
                  highlighted && cx("font-medium text-fg", styles.highlight),
                )}
              >
                <span aria-hidden className={cx("mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[5px] text-white", styles.check)}>
                  <Icon name="check" size={12} stroke={3} />
                </span>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>

        {plan.current ? (
          <button
            type="button"
            disabled
            className={cx("mt-5 flex h-11 w-full cursor-default items-center justify-center gap-2 rounded-lg text-[14px] font-semibold", styles.cta)}
          >
            <Icon name="shieldCheck" size={18} />
            {plan.cta}
          </button>
        ) : (
          <button
            type="button"
            aria-label={`${plan.cta} para o plano ${plan.name}`}
            onClick={() => onUpgrade(plan)}
            className={cx("mt-5 flex h-11 w-full items-center justify-center rounded-lg text-[14px] font-semibold transition-colors", styles.cta, FOCUS_RING)}
          >
            {plan.cta}
          </button>
        )}
      </article>
    </li>
  );
}

export default function PlansSection({ onUpgrade }: { onUpgrade: (plan: PlanOffer) => void }) {
  return (
    <section aria-labelledby="plans-title" className={cx(SURFACE, "flex flex-col gap-5 p-4 sm:p-5")}>
      <header>
        <h2 id="plans-title" className="text-[19px] font-semibold tracking-tight text-fg">
          Escolha o Plano Ideal para Você
        </h2>
        <p className="mt-1 text-[13.5px] text-fg-muted">Faça upgrade ou downgrade quando quiser. Sem taxas de cancelamento.</p>
      </header>
      <ul className="grid flex-1 gap-4 pt-2 md:grid-cols-3">
        {PLAN_OFFERS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onUpgrade={onUpgrade} />
        ))}
      </ul>
    </section>
  );
}
