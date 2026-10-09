"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge } from "../UI";
import { riskProfiles, type RiskProfileId } from "../../lib/risk-management-demo";
import { SelectBox } from "./RiskFields";

const actionClass =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function RiskHeader({
  profile,
  onProfile,
  onSaveTemplate,
  onApplyAll,
}: {
  profile: RiskProfileId | "custom";
  onProfile: (id: RiskProfileId) => void;
  onSaveTemplate: () => void;
  onApplyAll: () => void;
}) {
  const profileLabelId = useId();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const options = [
    ...(Object.keys(riskProfiles) as RiskProfileId[]).map((id) => ({ value: id, label: riskProfiles[id].label })),
    ...(profile === "custom" ? [{ value: "custom", label: "Personalizado" }] : []),
  ];

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Risk Management Pro
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Risk Management Pro</h1>
            <Badge tone="green" className="border-success/60 bg-success/15 px-2.5 text-xs">
              Ativo
            </Badge>
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
            Controle total do seu risco. Proteja seu capital, defina limites e opere com segurança.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2.5">
          <div className="w-[190px]">
            <span id={profileLabelId} className="mb-1 block text-[12px] text-fg-muted">
              Perfil de Risco
            </span>
            <SelectBox
              label="Perfil de Risco"
              value={profile}
              options={options}
              onChange={(value) => {
                if (value !== "custom") onProfile(value as RiskProfileId);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              onSaveTemplate();
            }}
            className={`${actionClass} border-brand-strong/70 bg-[#0a1b2b] text-fg hover:border-brand`}
          >
            <Icon name={saved ? "check" : "save"} size={15} />
            {saved ? "Template salvo" : "Salvar como Template"}
          </button>
          <button type="button" onClick={onApplyAll} className={`${actionClass} border-brand-strong bg-brand-strong text-white hover:bg-brand`}>
            <Icon name="settings" size={15} />
            Aplicar em Todas as Contas
          </button>
        </div>
      </header>
    </>
  );
}
