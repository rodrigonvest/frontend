"use client";
import { useEffect, useId, useState } from "react";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { cx } from "../UI";
import {
  initialRiskConfig,
  initialRules,
  initialSimulator,
  matchProfile,
  riskProfiles,
  type RiskConfig,
  type RiskProfileId,
  type SimulatorInputs,
} from "../../lib/risk-management-demo";
import { ConfirmModal } from "../multi-account/AccountModals";
import { Toast } from "../multi-account/MaPrimitives";
import RiskHeader from "./RiskHeader";
import RiskKpis from "./RiskKpis";
import { ExecutionFiltersCard, LotManagementCard, RiskLimitsCard } from "./ConfigPanels";
import { CorrelationMatrix, ExposurePanel, HighCorrelationPairs, RiskDonut } from "./ExposurePanels";
import { CustomRules, LossScenarios, RiskSimulator } from "./SimulatorPanels";
import { RiskByAccount, RiskHistory } from "./AccountAndHistoryPanels";

type TabId = "overview" | "accounts" | "symbols" | "rules" | "correlation" | "simulator" | "history";

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "overview", label: "Visão Geral", icon: "dashboard" },
  { id: "accounts", label: "Por Conta", icon: "accounts" },
  { id: "symbols", label: "Por Símbolo", icon: "chart" },
  { id: "rules", label: "Regras de Risco", icon: "shield" },
  { id: "correlation", label: "Correlação", icon: "analytics" },
  { id: "simulator", label: "Simulador", icon: "target" },
  { id: "history", label: "Histórico", icon: "clock" },
];

export default function RiskManagementView() {
  const baseId = useId();
  const [tab, setTab] = useState<TabId>("overview");
  const [config, setConfig] = useState<RiskConfig>(initialRiskConfig);
  const [rules, setRules] = useState(initialRules);
  const [sim, setSim] = useState<SimulatorInputs>(initialSimulator);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmApply, setConfirmApply] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const patchConfig = (patch: Partial<RiskConfig>) => setConfig((current) => ({ ...current, ...patch }));
  const patchSim = (patch: Partial<SimulatorInputs>) => setSim((current) => ({ ...current, ...patch }));
  const profile = matchProfile(config);
  const simRiskAmount = (sim.balance * sim.riskPct) / 100;

  const selectProfile = (id: RiskProfileId) => {
    patchConfig(riskProfiles[id].limits);
    setToast(`Perfil ${riskProfiles[id].label} aplicado.`);
  };

  const limits = <RiskLimitsCard config={config} onChange={patchConfig} />;
  const lots = <LotManagementCard config={config} onChange={patchConfig} />;
  const filters = <ExecutionFiltersCard config={config} onChange={patchConfig} />;
  const exposure = <ExposurePanel exposureLimit={config.exposure} />;
  const simulator = <RiskSimulator inputs={sim} exposureLimit={config.exposure} onChange={patchSim} />;
  const scenarios = <LossScenarios balance={sim.balance} riskAmount={simRiskAmount} weeklyLimit={config.weekly} drawdownLimit={config.drawdown} />;
  const customRules = (
    <CustomRules rules={rules} onToggle={(id) => setRules((current) => current.map((rule) => (rule.id === id ? { ...rule, checked: !rule.checked } : rule)))} />
  );

  return (
    <Shell wide>
      <RiskHeader
        profile={profile}
        onProfile={selectProfile}
        onSaveTemplate={() => setToast(`Template "${profile === "custom" ? "Personalizado" : riskProfiles[profile].label}" salvo.`)}
        onApplyAll={() => setConfirmApply(true)}
      />

      <RiskKpis config={config} />

      <div role="tablist" aria-label="Seções do Risk Management Pro" className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              type="button"
              onClick={() => setTab(item.id)}
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active ? "border-brand-strong bg-brand-strong text-white" : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${tab}`} className="mt-4 space-y-4">
        {tab === "overview" && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {limits}
              {lots}
              <div className="md:col-span-2 xl:col-span-1">{filters}</div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.05fr_1.15fr_1fr]">
              {exposure}
              <CorrelationMatrix />
              <div className="lg:col-span-2 xl:col-span-1">
                <RiskDonut />
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_1fr]">
              {simulator}
              {scenarios}
              <div className="lg:col-span-2 xl:col-span-1">{customRules}</div>
            </div>
          </>
        )}

        {tab === "accounts" && <RiskByAccount config={config} />}

        {tab === "symbols" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {exposure}
            <RiskDonut />
          </div>
        )}

        {tab === "rules" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {limits}
            {filters}
            <div className="md:col-span-2 xl:col-span-1">{customRules}</div>
          </div>
        )}

        {tab === "correlation" && (
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <CorrelationMatrix />
            <HighCorrelationPairs config={config} onChange={patchConfig} />
          </div>
        )}

        {tab === "simulator" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {simulator}
            {scenarios}
          </div>
        )}

        {tab === "history" && <RiskHistory />}
      </div>

      {confirmApply && (
        <ConfirmModal
          title="Aplicar em todas as contas"
          message="Os limites de risco, a gestão de lote e os filtros de execução atuais serão aplicados em todas as contas conectadas. Deseja continuar?"
          onConfirm={() => {
            setConfirmApply(false);
            setToast("Configuração de risco aplicada em 6 contas.");
          }}
          onClose={() => setConfirmApply(false)}
        />
      )}

      <Toast message={toast} />
    </Shell>
  );
}
