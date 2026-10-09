import { Icon } from "../Icons";
import { cx } from "../UI";
import DetailPanel from "./DetailPanel";
import { BoltIcon, CheckCircle, PieIcon } from "./TradeIcons";
import { tradeSignalLines, tradeSteps, tradeTimeline } from "../../lib/trade-details-demo";

export function SignalCard({ className }: { className?: string }) {
  return (
    <DetailPanel
      title="Sinal Original (Telegram)"
      icon={<Icon name="telegram" size={20} />}
      iconClassName="bg-[#2aa3ee] text-white !rounded-full"
      className={className}
    >
      <div className="mx-3.5 mt-2.5 flex-1 rounded-lg border border-[#17344b] bg-[#091a2a] p-3">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2aa3ee] text-white">
            <Icon name="telegram" size={18} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12.5px] font-semibold text-brand">KIM GOLD SECRET</p>
            <p className="mt-0.5 text-[12px] tabular text-fg-muted">04/09/2026 14:31</p>
          </div>
        </div>
        <div className="mt-4 space-y-[3px] text-[13.5px] leading-[22px] tabular text-fg">
          {tradeSignalLines.map((line, i) => (
            <p key={line} className={cx(i === 0 && "mb-1")}>{line}</p>
          ))}
        </div>
        <p className="mt-5 text-[13.5px] text-fg">Boa sorte! 🚀</p>
      </div>
      <div className="px-3.5 pb-3.5 pt-3">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-brand-strong/70 bg-[#091a2a] px-3 text-[12.5px] font-medium text-fg hover:border-brand"
        >
          <Icon name="send" size={14} />
          Ver mensagem no Telegram
          <Icon name="external" size={13} />
        </button>
      </div>
    </DetailPanel>
  );
}

export function ExecutionCard({ className }: { className?: string }) {
  return (
    <DetailPanel title="Execução da Operação" icon={<BoltIcon size={19} />} iconClassName="bg-transparent text-[#2f95ff]" className={className}>
      <ol className="mx-3.5 mt-3 flex-1">
        {tradeTimeline.map((e, i) => (
          <li key={`${e.time}-${e.title}`} className="relative grid grid-cols-[62px_18px_minmax(0,1fr)] gap-x-1.5 pb-[15px]">
            {i < tradeTimeline.length - 1 && <span aria-hidden className="absolute bottom-0 left-[69px] top-[15px] w-px bg-success/45" />}
            <span className="pt-px text-[12px] tabular text-fg-muted">{e.time}</span>
            <span aria-hidden className="relative z-10 mx-auto mt-[3px] size-[11px] rounded-full bg-success shadow-[0_0_0_3px_rgba(18,217,158,.15)]" />
            <div className="min-w-0 pl-1.5 leading-tight">
              <p className="text-[13px] font-medium text-fg">{e.title}</p>
              <p className="mt-1 flex items-center gap-1 text-[11.5px] text-fg-muted">
                {e.detail}
                {e.check && <span className="text-success"><Icon name="check" size={12} stroke={2.4} /></span>}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="px-3.5 pb-3.5">
        <div className="flex items-center gap-3 rounded-lg border border-success/50 bg-success/10 px-3.5 py-2.5">
          <CheckCircle size={26} />
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-fg">Operação finalizada</p>
            <p className="mt-1 text-[12px] text-success">Lucro realizado: +37.5 pips</p>
          </div>
        </div>
      </div>
    </DetailPanel>
  );
}

export function ManagementCard({ className }: { className?: string }) {
  return (
    <DetailPanel title="Gestão e Parcializações" icon={<PieIcon size={20} />} iconClassName="bg-transparent text-[#2f95ff]" className={className}>
      <div className="mx-3.5 mt-2.5 text-[13px]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,.9fr)_minmax(0,.55fr)_118px] gap-2 border-b border-[#17344b] pb-2 text-[12px] text-fg-muted">
          <span>Etapa</span>
          <span>Preço</span>
          <span>Pips</span>
          <span>Resultado</span>
        </div>
        {tradeSteps.map((s) => (
          <div key={s.stage} className="grid min-h-[32px] grid-cols-[minmax(0,1fr)_minmax(0,.9fr)_minmax(0,.55fr)_118px] items-center gap-2 border-b border-[#17344b]/50 tabular last:border-b-0">
            <span className={cx("inline-flex items-center gap-2", s.stage === "TP3" ? "text-success" : "text-fg")}>
              <CheckCircle size={17} done={s.done} />
              {s.stage}
            </span>
            <span className="text-fg">{s.price}</span>
            <span className={s.pips.startsWith("+") ? "text-success" : "text-fg-muted"}>{s.pips}</span>
            <span className={cx("whitespace-nowrap", s.result.startsWith("+") ? "text-success" : "text-fg-muted")}>{s.result}</span>
          </div>
        ))}
      </div>
      <div className="pb-2.5" />
    </DetailPanel>
  );
}

export function NotesCard({ className }: { className?: string }) {
  return (
    <DetailPanel title="Observações" icon={<Icon name="fileText" size={19} />} iconClassName="bg-transparent text-[#2f95ff]" className={className}>
      <div className="mx-3.5 mb-3.5 mt-1.5 space-y-0.5 pl-[46px] text-[13px] leading-[21px] text-fg-muted">
        <p>Operação executada conforme o sinal.</p>
        <p>Todas as parcializações atingidas.</p>
        <p>Boa gestão de risco.</p>
      </div>
    </DetailPanel>
  );
}
