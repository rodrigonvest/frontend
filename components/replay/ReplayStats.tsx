import { Icon } from "../Icons";
import type { ReplaySummary } from "../../lib/replay-data";
import { PlayGlyph, StopGlyph, SummaryCard } from "./RpPrimitives";

export default function ReplayStats({ summary }: { summary: ReplaySummary }) {
  const positive = summary.resultR >= 0;
  const sign = positive ? "+" : "-";
  return (
    <section aria-label="Resumo da sessão" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <SummaryCard label="Total de Sinais" value={String(summary.total)} icon={<PlayGlyph size={20} />} accent="blue" valueTone="text-fg" />
      <SummaryCard
        label="Executados"
        value={String(summary.executed)}
        note={`${summary.executedPct.toFixed(1)}%`}
        noteTone="text-success"
        icon={<Icon name="check" size={22} stroke={2.4} />}
        accent="green"
        valueTone="text-success"
      />
      <SummaryCard
        label="Ignorados"
        value={String(summary.ignored)}
        note={`${summary.ignoredPct.toFixed(1)}%`}
        noteTone="text-danger"
        icon={<StopGlyph size={18} />}
        accent="red"
        valueTone="text-danger"
      />
      <SummaryCard
        label="Win Rate"
        value={`${summary.winRate.toFixed(1)}%`}
        note={`${summary.wins} ganhos`}
        icon={<Icon name="trophy" size={22} />}
        accent="amber"
        valueTone="text-success"
      />
      <SummaryCard label="R:R Médio" value={`${summary.rrAvg.toFixed(1)}R`} icon={<Icon name="growth" size={22} />} accent="purple" />
      <SummaryCard
        label="Resultado Total"
        value={`${sign}${Math.abs(summary.resultR).toFixed(2)}R`}
        note={`${sign}$${Math.abs(summary.resultUsd).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        noteTone={positive ? "text-success" : "text-danger"}
        icon={<Icon name="dollar" size={22} />}
        accent="gold"
        valueTone={positive ? "text-success" : "text-danger"}
      />
    </section>
  );
}
