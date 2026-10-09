import Link from "next/link";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { Badge } from "../UI";
import TradeSummaryCard from "./TradeSummaryCard";
import TradeChartCard from "./TradeChartCard";
import { ExecutionCard, ManagementCard, NotesCard, SignalCard } from "./TradeLowerCards";

const navButton =
  "inline-flex h-10 items-center justify-center gap-2.5 rounded-lg border border-[#24435d] bg-[#091a2a] px-4 text-[13.5px] font-medium text-fg transition-colors hover:border-brand";

export default function TradeDetailsView({ id }: { id: string }) {
  return (
    <Shell wide>
      <div className="relative rounded-xl border border-[#17344b] bg-[#071827]/60 p-4 shadow-[0_8px_24px_rgba(0,0,0,.18)] lg:-mt-3">
        <Link
          href="/trades"
          aria-label="Fechar detalhes da operação"
          className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded text-fg-muted hover:text-fg"
        >
          <Icon name="x" size={16} />
        </Link>

        <header className="flex flex-col gap-4 pr-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Detalhes da Operação #{id}</h1>
              <Badge tone="green" className="rounded-full px-3 py-0.5 text-[13px] font-semibold">TP3</Badge>
            </div>
            <p className="mt-1.5 max-w-3xl text-pretty text-[15px] leading-6 text-fg-muted">
              Visualize todas as informações desta operação, desde o sinal original até o fechamento.
            </p>
          </div>
          <div className="mt-3 flex shrink-0 flex-wrap items-center gap-3 lg:mt-1">
            <button type="button" className={navButton}>
              <span className="rotate-180"><Icon name="chevron" size={14} stroke={2.2} /></span>
              Operação Anterior
            </button>
            <button type="button" className={navButton}>
              Próxima Operação
              <Icon name="chevron" size={14} stroke={2.2} />
            </button>
          </div>
        </header>

        <div className="mt-4 grid gap-3.5 xl:grid-cols-[minmax(0,345fr)_minmax(0,885fr)]">
          <TradeSummaryCard className="xl:row-span-2" />
          <TradeChartCard />
          <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-[minmax(0,250fr)_minmax(0,262fr)_minmax(0,338fr)]">
            <SignalCard />
            <ExecutionCard />
            <div className="flex min-w-0 flex-col gap-3.5 md:col-span-2 xl:col-span-1">
              <ManagementCard />
              <NotesCard className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
