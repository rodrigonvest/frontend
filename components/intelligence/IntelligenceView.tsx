"use client";
import { useEffect, useState } from "react";
import Shell from "../Shell";
import { Toast } from "../multi-account/MaPrimitives";
import { colors, performanceSeries, periodOptions, periodResults, recommendations, type IntelligenceTab, type Period } from "../../lib/intelligence-demo";
import { IntelligenceHeader, IntelligenceTabs, SummaryCards, formatIsoDate, type CustomRange } from "./IntelligenceHeader";
import { InsightsPanel, IPanel, RecommendationsPanel, SummaryPanel } from "./IntelPanels";
import { ChannelScoreTable, PatternsTable } from "./IntelTables";
import { ChatPanel, useChat } from "./ChatPanel";
import { LegendDot, PerformanceChart, ResultsChart } from "./IntelCharts";

function PerformancePanel({ className }: { className?: string }) {
  return (
    <IPanel
      title="Análise de Performance com IA"
      icon="analytics"
      iconColor={colors.blue}
      className={className}
      action={
        <div className="rounded-lg border border-success/50 bg-success/10 px-3 py-1 text-center">
          <p className="tabular text-[17px] font-semibold leading-5 text-success">+35.6%</p>
          <p className="text-[10.5px] text-success/90">Potencial de melhoria</p>
        </div>
      }
    >
      <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1">
        <LegendDot color={colors.blue} label="Resultado Atual" />
        <LegendDot color={colors.green} label="Resultado Otimizado (IA)" dashed />
      </div>
      <PerformanceChart data={performanceSeries} height={200} />
    </IPanel>
  );
}

function ResultsPanel({ className }: { className?: string }) {
  return (
    <IPanel title="Distribuição de Resultados por Período" icon="analytics" iconColor={colors.blue} className={className}>
      <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1">
        <LegendDot color={colors.green} label="Lucro" />
        <LegendDot color={colors.red} label="Prejuízo" />
        <LegendDot color={colors.green} label="Resultado Otimizado (IA)" dashed />
      </div>
      <ResultsChart data={periodResults} height={190} />
    </IPanel>
  );
}

export default function IntelligenceView() {
  const [period, setPeriod] = useState<Period>("30");
  const [tab, setTab] = useState<IntelligenceTab>("overview");
  const [applied, setApplied] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [customRange, setCustomRange] = useState<CustomRange | null>(null);
  const chat = useChat();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const customDays = customRange ? Math.round((Date.parse(customRange.to) - Date.parse(customRange.from)) / 86_400_000) + 1 : 0;
  const periodLabel =
    period === "custom" && customRange
      ? `${formatIsoDate(customRange.from)} – ${formatIsoDate(customRange.to)}`
      : (periodOptions.find((option) => option.id === period)?.summary ?? "");
  const signalsValue = Math.round((period === "custom" ? customDays || 30 : Number(period)) * 61.4).toLocaleString("pt-BR");

  const apply = (id: string) => {
    setApplied((current) => (current.includes(id) ? current : [...current, id]));
    const title = recommendations.find((item) => item.id === id)?.title ?? "Recomendação";
    setToast(`${title} aplicada (demonstrativo).`);
  };
  const seeAllRecommendations = () => setTab("recommendations");
  const seeAllPatterns = () => setTab("operations");

  const recs = (showAll = true) => <RecommendationsPanel applied={applied} onApply={apply} onSeeAll={seeAllRecommendations} showAllButton={showAll} className="h-full" />;

  return (
    <Shell wide>
      <IntelligenceHeader period={period} onPeriod={setPeriod} customRange={customRange} onCustomRange={setCustomRange} />
      <SummaryCards />
      <IntelligenceTabs value={tab} onChange={setTab} />

      <div id="ci-panel" role="tabpanel" aria-labelledby={`ci-tab-${tab}`} className="mt-3 flex flex-col gap-3">
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <SummaryPanel periodLabel={periodLabel} signalsValue={signalsValue} className="md:col-span-2" />
                <InsightsPanel />
                {recs()}
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <PerformancePanel />
                <ChatPanel chat={chat} className="flex-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
              <ResultsPanel />
              <ChannelScoreTable />
              <PatternsTable onSeeAll={seeAllPatterns} className="lg:col-span-2 xl:col-span-1" />
            </div>
          </>
        )}

        {tab === "insights" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <InsightsPanel />
            <div className="flex min-w-0 flex-col gap-3">
              <SummaryPanel periodLabel={periodLabel} signalsValue={signalsValue} />
              <PatternsTable onSeeAll={seeAllPatterns} className="flex-1" />
            </div>
          </div>
        )}

        {tab === "optimizations" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {recs(false)}
            <div className="flex min-w-0 flex-col gap-3">
              <PerformancePanel />
              <ResultsPanel className="flex-1" />
            </div>
          </div>
        )}

        {tab === "channels" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <ChannelScoreTable />
            <ResultsPanel />
          </div>
        )}

        {tab === "operations" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <PatternsTable onSeeAll={seeAllPatterns} />
            <PerformancePanel />
            <ResultsPanel className="xl:col-span-2" />
          </div>
        )}

        {tab === "recommendations" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {recs(false)}
            <PerformancePanel />
          </div>
        )}

        {tab === "chat" && (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <ChatPanel chat={chat} messagesHeight={460} />
            <InsightsPanel />
          </div>
        )}
      </div>
      <Toast message={toast} />
    </Shell>
  );
}
