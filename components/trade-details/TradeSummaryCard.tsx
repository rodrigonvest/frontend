import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { Button, cx } from "../UI";
import DetailPanel from "./DetailPanel";
import { CheckCircle, GoldLogo, TargetCircle, TelegramSquare, XCircle } from "./TradeIcons";

const rows: Array<{ label: string; value: ReactNode }> = [
  { label: "Status", value: <span className="inline-flex items-center gap-2 text-success"><CheckCircle size={16} />Fechada (TP3)</span> },
  { label: "Símbolo", value: <span className="inline-flex items-center gap-2"><GoldLogo />XAUUSD</span> },
  { label: "Sistema", value: <span className="inline-flex items-center gap-2"><TelegramSquare />KIM GOLD SECRET</span> },
  { label: "Conta", value: "Hantec - Instant Lite" },
  {
    label: "Direção",
    value: (
      <span className="inline-flex items-center gap-2 text-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
        Compra (Buy)
      </span>
    ),
  },
  { label: "Volume", value: "0.10 lotes" },
  { label: "Preço de Entrada", value: "2,642.15" },
  { label: "Preço de Saída", value: "2,645.90" },
  { label: "Take Profit", value: <span className="inline-flex items-center gap-2"><TargetCircle size={18} />2,645.90 (TP3)</span> },
  { label: "Stop Loss", value: <span className="inline-flex items-center gap-2"><XCircle size={18} />2,640.15</span> },
  {
    label: "Resultado",
    value: (
      <span className="flex flex-col font-semibold leading-[22px] text-success">
        <span className="text-[16px]">+37.5 pips</span>
        <span className="text-[16px]">+$187.50 (0.75R)</span>
      </span>
    ),
  },
  { label: "Risco (R)", value: "0.75R" },
  { label: "Spread médio", value: "0.28 pips" },
  { label: "Tempo de execução", value: "432 ms" },
  { label: "Abertura", value: "04/09/2026 14:32:15" },
  { label: "Fechamento", value: "04/09/2026 15:18:43" },
  { label: "Duração", value: "46 minutos e 28 segundos" },
  { label: "Ticket (MT5)", value: "893745621" },
  { label: "Comentário", value: "Copytrix | KIM | #45782" },
];

export default function TradeSummaryCard({ className }: { className?: string }) {
  return (
    <DetailPanel title="Resumo da Operação" icon={<Icon name="clipboard" size={19} />} className={className}>
      <dl className="mx-3.5 mt-1.5 flex flex-1 flex-col">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={cx(
              "grid min-h-[33px] flex-1 grid-cols-[132px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70 py-1 text-[13.5px] tabular",
              r.label === "Resultado" && "min-h-[64px]",
              i === rows.length - 1 && "border-b-0",
            )}
          >
            <dt className="text-fg-muted">{r.label}</dt>
            <dd className="m-0 min-w-0 text-fg">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap items-center gap-2 px-3.5 pb-3.5">
        <Button variant="primary" className="h-9 gap-2 px-3.5">
          <Icon name="analytics" size={15} />
          Ver no MT5
        </Button>
        <Button variant="secondary" className="h-9 gap-2 border-[#24435d] bg-[#091a2a] px-3.5">
          <Icon name="copy" size={14} />
          Copiar Ticket
        </Button>
        <Button variant="secondary" aria-haspopup="menu" className="h-9 gap-2 border-[#24435d] bg-[#091a2a] px-3.5">
          Exportar
          <Icon name="chevronDown" size={13} stroke={2.2} />
        </Button>
      </div>
    </DetailPanel>
  );
}
