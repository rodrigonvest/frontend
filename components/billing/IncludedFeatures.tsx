import { cx } from "../UI";
import { INCLUDED_FEATURES, type IncludedFeature } from "../../lib/billing-data";
import { BillingIcon } from "./BillingIcons";
import { SURFACE } from "./BillingPrimitives";

const tones: Record<IncludedFeature["tone"], string> = {
  blue: "bg-brand/15 text-brand",
  purple: "bg-[#9b63ff]/15 text-[#a77bff]",
  green: "bg-success/15 text-success",
};

export default function IncludedFeatures() {
  return (
    <section aria-labelledby="included-title" className={cx(SURFACE, "flex flex-col gap-4 p-4 sm:p-5")}>
      <h2 id="included-title" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-fg">
        <span aria-hidden className="flex text-brand">
          <BillingIcon name="clipboard" size={22} />
        </span>
        Recursos incluídos no seu plano Pro
      </h2>
      <ul className="grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 min-[1600px]:grid-cols-8!">
        {INCLUDED_FEATURES.map((feature) => (
          <li key={feature.id} className="flex min-w-0 items-center gap-3">
            <span aria-hidden className={cx("flex size-11 shrink-0 items-center justify-center rounded-full", tones[feature.tone])}>
              <BillingIcon name={feature.icon} size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-4 text-fg">{feature.title}</p>
              <p className="mt-0.5 text-[12px] leading-4 text-fg-subtle">{feature.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
