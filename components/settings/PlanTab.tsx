"use client";
import { useState } from "react";
import PlanComparisonSection from "./PlanComparisonSection";
import PlanHighlightsCard from "./PlanHighlightsCard";
import PlanPricingSection from "./PlanPricingSection";
import { BillingCard, CouponCard, CurrentPlanCard } from "./PlanSummaryCards";
import type { BillingCycle } from "../../lib/plan-demo";

export default function PlanTab() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
        <CurrentPlanCard />
        <BillingCard />
        <div className="lg:col-span-2 xl:col-span-1">
          <CouponCard />
        </div>
      </div>
      <PlanPricingSection cycle={cycle} onCycleChange={setCycle} />
      <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <PlanComparisonSection />
        <PlanHighlightsCard />
      </div>
    </div>
  );
}
