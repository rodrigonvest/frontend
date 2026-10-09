"use client";
import { useState } from "react";
import { Icon } from "../Icons";
import { AssetBadge } from "../replay/RpPrimitives";
import { Badge, cx } from "../UI";
import {
  EXPOSURE,
  INITIAL_REPORTS,
  OTHER_ASSETS,
  PROJECTED_IMPACT,
  RECENT_SIGNALS,
} from "../../lib/copytrix-ai-data";
import AccountSummaryPanel from "./AccountSummaryPanel";
import { MetricBar, Panel, PrimaryButton, directionTone } from "./AiPrimitives";
import MarketInsightPanel from "./MarketInsightPanel";
import RecommendationsPanel from "./RecommendationsPanel";
import RiskPanel from "./RiskPanel";
import SignalAnalysisPanel from "./SignalAnalysisPanel";
import StrategyOptimizationPanel from "./StrategyOptimizationPanel";

interface ModuleProps {
  onToast: (message: string) => void;
}

function scoreTone(score: number) {
  if (score >= 75) return "green" as const;
  if (score >= 50) return "amber" as const;
  return "red" as const;
}

export function SignalsModule({ onToast }: ModuleProps) {
  return (
    <div className="flex flex-col gap-4">
      <SignalAnalysisPanel
        onExecute={() => onToast("Simulação: o sinal XAUUSD BUY foi marcado como executado. Nenhuma operação real foi enviada.")}
      />
      <Panel title="Sinais recentes analisados" icon="signal" bodyClassName="px-0 pb-2 pt-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-[13px]">
            <thead className="text-[12px] text-fg-subtle">
              <tr className="border-b border-line">
                <th scope="col" className="px-4 pb-2 font-medium">Ativo</th>
                <th scope="col" className="px-2 pb-2 font-medium">Direção</th>
                <th scope="col" className="px-2 pb-2 font-medium">Canal</th>
                <th scope="col" className="px-2 pb-2 font-medium">Horário</th>
                <th scope="col" className="px-2 pb-2 font-medium">Score da IA</th>
                <th scope="col" className="px-4 pb-2 font-medium">Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SIGNALS.map((signal) => (
                <tr key={signal.id} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-fg">{signal.asset}</td>
                  <td className={cx("px-2 py-3 font-medium", directionTone(signal.direction))}>{signal.direction}</td>
                  <td className="px-2 py-3 text-fg-muted">{signal.channel}</td>
                  <td className="tabular px-2 py-3 text-fg-muted">{signal.time}</td>
                  <td className="tabular px-2 py-3 font-semibold text-fg">{signal.score}%</td>
                  <td className="px-4 py-3">
                    <Badge tone={scoreTone(signal.score)}>{signal.verdict}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export function MarketModule() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <MarketInsightPanel />
      <Panel title="Outros ativos monitorados" icon="trendUp">
        <ul className="space-y-3">
          {OTHER_ASSETS.map((item) => (
            <li key={item.asset} className="rounded-lg border border-line bg-canvas/40 p-3">
              <div className="flex items-center gap-2.5">
                <AssetBadge asset={item.asset} size={28} />
                <span className="flex-1 text-[14px] font-semibold text-fg">{item.asset}</span>
                <Badge tone={item.tone === "green" ? "green" : item.tone === "red" ? "red" : "amber"}>{item.bias}</Badge>
              </div>
              <p className="mt-2 text-[12.5px] text-fg-muted">{item.note}</p>
              <div className="mt-2.5">
                <MetricBar label="Confiança da IA" value={`${item.percent}%`} percent={item.percent} tone={item.tone} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export function OptimizationModule({ onToast }: ModuleProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <StrategyOptimizationPanel onApply={() => onToast("Configurações sugeridas aplicadas (demonstrativo). Nada foi alterado na sua conta.")} />
      <Panel title="Impacto projetado" icon="growth">
        <ul className="space-y-3">
          {PROJECTED_IMPACT.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-canvas/40 px-3.5 py-3">
              <span className="text-[13px] text-fg-muted">{item.label}</span>
              <span className="tabular flex items-center gap-2 text-[14px] font-semibold">
                <span className="text-fg-subtle">{item.from}</span>
                <span aria-hidden className="text-fg-subtle">
                  <Icon name="arrowRight" size={14} />
                </span>
                <span className="sr-only">para</span>
                <span className="text-success">{item.to}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-pretty text-[12px] leading-5 text-fg-subtle">Projeções baseadas em dados históricos simulados. Resultados passados não garantem resultados futuros.</p>
      </Panel>
    </div>
  );
}

export function RiskModule() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <RiskPanel />
      <Panel title="Exposição por ativo" icon="layers">
        <ul className="space-y-4">
          {EXPOSURE.map((item) => (
            <li key={item.asset}>
              <MetricBar
                label={item.asset}
                value={`${item.percent.toFixed(1)}% de ${item.limit.toFixed(1)}%`}
                percent={(item.percent / item.limit) * 100}
                tone="green"
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-pretty text-[12.5px] leading-5 text-fg-muted">Todos os ativos estão abaixo do limite de exposição definido para a conta.</p>
      </Panel>
    </div>
  );
}

export function ReportsModule({ onToast }: ModuleProps) {
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const generate = () => {
    const stamp = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    setReports((current) => [
      {
        id: Date.now(),
        title: "Relatório do período",
        description: "Sinais, desempenho e recomendações do período selecionado.",
        date: `Gerado em ${stamp}`,
      },
      ...current,
    ]);
    onToast("Relatório inteligente gerado (demonstrativo).");
  };

  return (
    <Panel
      title="Relatórios Inteligentes"
      icon="fileText"
      action={
        <PrimaryButton onClick={generate} className="h-9 px-4 text-[13px]">
          <Icon name="plus" size={15} />
          Gerar relatório
        </PrimaryButton>
      }
    >
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <li key={report.id} className="flex flex-col rounded-lg border border-line bg-canvas/40 p-3.5">
            <div className="flex items-start gap-3">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#9b63ff]/15 text-[#a77bff]">
                <Icon name="fileText" size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-fg">{report.title}</h3>
                <p className="mt-0.5 text-pretty text-[12.5px] leading-5 text-fg-muted">{report.description}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
              <span className="text-[12px] text-fg-subtle">{report.date}</span>
              <button
                type="button"
                onClick={() => onToast(`Download de "${report.title}" simulado (demonstrativo).`)}
                className="flex h-8 items-center gap-1.5 rounded-md border border-line-strong px-2.5 text-[12px] text-fg-muted transition-colors hover:border-brand hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Icon name="download" size={14} />
                Baixar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function RecommendationsModule() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <RecommendationsPanel />
      <AccountSummaryPanel />
    </div>
  );
}
