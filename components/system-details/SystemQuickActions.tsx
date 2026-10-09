"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { BoltIcon } from "../trade-details/TradeIcons";
import { logsToCsv, type RouteDetails } from "../../lib/system-route-details";

const tileClass =
  "flex min-h-[44px] items-center gap-2 rounded-lg border border-[#24435d] bg-[#091a2a] px-2.5 text-left text-[11.5px] leading-tight text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand";

export default function SystemQuickActions({
  routeId,
  details,
  className,
}: {
  routeId: string;
  details: RouteDetails;
  className?: string;
}) {
  const [feedback, setFeedback] = useState("");

  const testSignal = () => {
    setFeedback(`Sinal de teste enviado para ${details.destination.label} em modo simulação.`);
  };

  const exportLogs = () => {
    const blob = new Blob([logsToCsv(details.logs)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `logs-${routeId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setFeedback("Logs exportados em CSV.");
  };

  return (
    <DetailPanel
      title="Ações Rápidas"
      icon={<BoltIcon size={19} />}
      iconClassName="bg-transparent text-[#2f95ff]"
      className={className}
    >
      <nav aria-label="Ações rápidas" className="mx-3.5 mb-3.5 mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <a href={details.source.url} target="_blank" rel="noopener noreferrer" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="send" size={16} /></span>
          Ver no {details.source.label}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <a href={details.destination.url} target="_blank" rel="noopener noreferrer" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="external" size={16} /></span>
          Abrir {details.destination.label}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <button type="button" onClick={testSignal} className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="signal" size={16} /></span>
          Testar Sinal
        </button>
        <button type="button" onClick={exportLogs} className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="download" size={16} /></span>
          Exportar Logs
        </button>
        <Link href={`/sistemas/${routeId}/configuracao`} className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="settings" size={16} /></span>
          Editar Configurações
        </Link>
        <Link href="/trades" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="logs" size={16} /></span>
          Ver Operações
        </Link>
      </nav>
      <p role="status" aria-live="polite" className={feedback ? "mx-3.5 mb-3 -mt-1.5 text-[12px] text-success" : "sr-only"}>
        {feedback}
      </p>
    </DetailPanel>
  );
}
