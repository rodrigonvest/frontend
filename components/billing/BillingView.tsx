"use client";
import { useState } from "react";
import Dialog from "../api-access/Dialog";
import { ToastRegion, useToast } from "../api-access/Toast";
import { Button, cx } from "../UI";
import type { Invoice, PlanOffer } from "../../lib/billing-data";
import BillingHeader, { BILLING_TITLE_ID } from "./BillingHeader";
import CurrentPlanCard from "./CurrentPlanCard";
import IncludedFeatures from "./IncludedFeatures";
import { InvoiceHistoryCard, PaymentMethodCard } from "./PaymentCards";
import PlansSection from "./PlansSection";
import UsageCard from "./UsageCard";
import { FOCUS_RING } from "./BillingPrimitives";

export default function BillingView() {
  const { toast, notify } = useToast();
  const [bannerOpen, setBannerOpen] = useState(true);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState<HTMLElement | null>(null);

  const demo = (message: string) => notify(`${message} (demonstrativo).`, "info");

  const dismissBanner = () => {
    setBannerOpen(false);
    requestAnimationFrame(() => document.getElementById(BILLING_TITLE_ID)?.focus());
  };

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <BillingHeader bannerOpen={bannerOpen} onDismissBanner={dismissBanner} />

      <div className="grid min-w-0 gap-5 min-[1440px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <CurrentPlanCard
          onManage={() => demo("Gerenciamento de assinatura simulado")}
          onCancel={(trigger) => {
            setCancelTrigger(trigger);
            setCancelOpen(true);
          }}
          onMenuAction={demo}
        />
        <UsageCard onDetails={() => demo("Detalhes de uso do plano simulados")} />
        <PlansSection onUpgrade={(plan: PlanOffer) => demo(`Mudança para o plano ${plan.name} simulada`)} />
        <div className="flex min-w-0 flex-col gap-5">
          <PaymentMethodCard onChange={() => demo("Alteração do método de pagamento simulada")} />
          <InvoiceHistoryCard
            onViewAll={() => demo("Lista completa de cobranças simulada")}
            onDownload={(invoice: Invoice) => demo(`Download da fatura de ${invoice.date} simulado`)}
          />
        </div>
      </div>

      <IncludedFeatures />

      <Dialog
        open={cancelOpen}
        title="Cancelar assinatura?"
        description="Esta é uma demonstração: nenhum cancelamento real será feito e seu plano Pro continua ativo."
        icon="alert"
        accent="red"
        returnFocusTo={cancelTrigger}
        onClose={() => setCancelOpen(false)}
      >
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <Button data-autofocus onClick={() => setCancelOpen(false)} className="h-10 px-5">
            Manter plano
          </Button>
          <button
            type="button"
            onClick={() => {
              setCancelOpen(false);
              demo("Cancelamento da assinatura simulado");
            }}
            className={cx(
              "flex h-10 items-center justify-center rounded-lg border border-danger/50 bg-danger-soft px-5 text-[13.5px] font-semibold text-[#ff8a96] transition-colors hover:bg-danger/25",
              FOCUS_RING,
            )}
          >
            Cancelar assinatura
          </button>
        </div>
      </Dialog>

      <ToastRegion toast={toast} />
    </div>
  );
}
