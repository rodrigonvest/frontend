"use client";
import { Icon } from "../Icons";
import { IPanel, GhostButton } from "./IntelPanels";
import { channelScores, colors, consistencyColor, patternRows, scoreColor } from "../../lib/intelligence-demo";

const th = "px-2 py-2 text-left text-[11.5px] font-medium text-fg-muted";

export function ChannelScoreTable({ className }: { className?: string }) {
  return (
    <IPanel title="Score dos Canais (Inteligência IA)" icon="telegram" iconColor={colors.blue} className={className}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-[12.5px]">
          <caption className="sr-only">Score de inteligência artificial por canal</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={th}>Canal</th>
              <th scope="col" className={th}>Score IA</th>
              <th scope="col" className={th}>Win Rate</th>
              <th scope="col" className={th}>Fator Lucro</th>
              <th scope="col" className={th}>Consistência</th>
            </tr>
          </thead>
          <tbody>
            {channelScores.map((row) => {
              const color = scoreColor(row.score);
              const consistency = consistencyColor[row.consistency];
              return (
                <tr key={row.name} className="border-b border-line/60 last:border-0 hover:bg-white/[.03]">
                  <th scope="row" className="px-2 py-2.5 text-left font-medium text-fg">
                    <span className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded" style={{ color: row.accent, background: `${row.accent}22` }}>
                        <Icon name={row.icon} size={12} />
                      </span>
                      <span className="whitespace-nowrap">{row.name}</span>
                    </span>
                  </th>
                  <td className="px-2 py-2.5">
                    <span className="tabular inline-flex h-6 min-w-9 items-center justify-center rounded px-2 text-[12px] font-bold" style={{ color: row.score >= 7.5 ? "#04281f" : row.score >= 6 ? "#2c2200" : "#fff", background: color }}>
                      {row.score.toFixed(1)}
                    </span>
                  </td>
                  <td className="tabular px-2 py-2.5" style={{ color: row.score < 6 ? colors.red : "#f2f6fa" }}>{row.winRate}</td>
                  <td className="tabular px-2 py-2.5 text-fg">{row.profitFactor}</td>
                  <td className="px-2 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-fg">
                      <span aria-hidden className="size-2 rounded-full" style={{ background: consistency, boxShadow: `0 0 6px ${consistency}` }} />
                      {row.consistency}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </IPanel>
  );
}

export function PatternsTable({ onSeeAll, className }: { onSeeAll: () => void; className?: string }) {
  return (
    <IPanel title="Detecção de Padrões (IA)" icon="layers" iconColor={colors.purple} action={<GhostButton onClick={onSeeAll}>Ver Todos</GhostButton>} className={className}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-[12.5px]">
          <caption className="sr-only">Padrões identificados pela inteligência artificial</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={th}>Padrão Identificado</th>
              <th scope="col" className={`${th} text-right`}>Ocorrências</th>
              <th scope="col" className={`${th} text-right`}>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {patternRows.map((row) => (
              <tr key={row.name} className="border-b border-line/60 last:border-0 hover:bg-white/[.03]">
                <th scope="row" className="px-2 py-2.5 text-left font-medium text-fg">
                  <span className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded text-brand">
                      <Icon name={row.icon} size={14} />
                    </span>
                    <span className="whitespace-nowrap">{row.name}</span>
                  </span>
                </th>
                <td className="tabular px-2 py-2.5 text-right text-fg">{row.occurrences}</td>
                <td className="tabular px-2 py-2.5 text-right font-semibold" style={{ color: row.winRate >= 70 ? colors.green : row.winRate >= 66 ? "#7ff0cd" : colors.gold }}>
                  {row.winRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </IPanel>
  );
}
