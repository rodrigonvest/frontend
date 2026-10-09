"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Shell from "../Shell";
import { Toast } from "../multi-account/MaPrimitives";
import { baseCounters, evaluateSignal, initialConfig, type SmartEntryConfig } from "../../lib/smart-entry-demo";
import SmartEntryHeader from "./SmartEntryHeader";
import { SmartEntryKpis, SmartEntryStats } from "./SmartEntryKpis";
import RulesPanel from "./RulesPanel";
import { MarketFilters, TrendFilters } from "./FilterPanels";
import SignalPreview from "./SignalPreview";
import ValidationChart from "./ValidationChart";

export default function SmartEntryView() {
  const [config, setConfig] = useState<SmartEntryConfig>(initialConfig);
  const [target, setTarget] = useState("Todas as Contas");
  const [executed, setExecuted] = useState(0);
  const [executing, setExecuting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const executeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(
    () => () => {
      if (executeTimer.current) window.clearTimeout(executeTimer.current);
    },
    [],
  );

  const checks = useMemo(() => evaluateSignal(config), [config]);
  const received = baseCounters.received + executed;
  const approved = baseCounters.approved + executed;
  const filtered = baseCounters.filtered;

  const executeSignal = () => {
    setExecuting(true);
    executeTimer.current = window.setTimeout(() => {
      setExecuting(false);
      setExecuted((current) => current + 1);
      setToast(`Sinal XAUUSD BUY executado em ${target}.`);
    }, 1300);
  };

  return (
    <Shell wide>
      <SmartEntryHeader
        target={target}
        onTarget={setTarget}
        onSaveTemplate={() => setToast("Template Smart Entry salvo.")}
        onReset={() => {
          setConfig(initialConfig);
          setToast("Configuração restaurada para o padrão.");
        }}
        onSettings={() => setToast("Configurações do Smart Entry atualizadas.")}
      />

      <div className="mt-4 space-y-4">
        <SmartEntryKpis received={received} approved={approved} filtered={filtered} />

        <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr_1fr]">
          <RulesPanel config={config} onChange={setConfig} />
          <div className="flex flex-col gap-4">
            <TrendFilters config={config} onChange={setConfig} />
            <SignalPreview checks={checks} executing={executing} onExecute={executeSignal} />
          </div>
          <div className="flex flex-col gap-4">
            <MarketFilters config={config} onChange={setConfig} />
            <ValidationChart />
          </div>
        </div>

        <SmartEntryStats received={received} approved={approved} />
      </div>

      <Toast message={toast} />
    </Shell>
  );
}
