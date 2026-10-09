import Link from "next/link";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { BoltIcon } from "../trade-details/TradeIcons";

const tileClass =
  "flex min-h-[44px] items-center gap-2 rounded-lg border border-[#24435d] bg-[#091a2a] px-2.5 text-[11.5px] leading-tight text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand";

export default function SystemQuickActions({ routeId, className }: { routeId: string; className?: string }) {
  return (
    <DetailPanel
      title="Ações Rápidas"
      icon={<BoltIcon size={19} />}
      iconClassName="bg-transparent text-[#2f95ff]"
      className={className}
    >
      <nav aria-label="Ações rápidas" className="mx-3.5 mb-3.5 mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Link href="/trades" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="logs" size={16} /></span>
          Ver Operações
        </Link>
        <Link href="/connectors" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="send" size={16} /></span>
          Ver Sinais
        </Link>
        <Link href={`/sistemas/${routeId}/configuracao`} className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="shield" size={16} /></span>
          Configurar Risco
        </Link>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className={tileClass}>
          <span aria-hidden className="shrink-0 text-brand"><Icon name="external" size={16} /></span>
          Abrir no Telegram
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </nav>
    </DetailPanel>
  );
}
