import type { Metadata } from "next";
import Shell from "../../components/Shell";
import BillingView from "../../components/billing/BillingView";

export const metadata: Metadata = {
  title: "Plano e Cobrança — Copytrix",
  description: "Gerencie seu plano, pagamentos e faturas do Copytrix.",
};

export default function BillingPage() {
  return (
    <Shell>
      <BillingView />
    </Shell>
  );
}
