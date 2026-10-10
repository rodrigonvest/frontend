import Link from "next/link";
import { Icon } from "../Icons";
import { FOCUS_RING } from "./BillingPrimitives";

export const BILLING_TITLE_ID = "billing-title";

export default function BillingHeader({ bannerOpen, onDismissBanner }: { bannerOpen: boolean; onDismissBanner: () => void }) {
  return (
    <header className="flex flex-col gap-4 min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:justify-between">
      <div className="min-w-0">
        <h1
          id={BILLING_TITLE_ID}
          tabIndex={-1}
          className="text-balance text-2xl font-semibold tracking-tight text-fg outline-none sm:text-[30px] sm:leading-9"
        >
          Plano e Cobrança
        </h1>
        <p className="mt-1.5 max-w-xl text-pretty text-[14.5px] leading-6 text-fg-muted">
          Gerencie seu plano, pagamentos e faturas do Copytrix.
        </p>
      </div>

      {bannerOpen && (
        <aside
          aria-label="Aviso sobre o Backtester"
          className="relative flex w-full flex-col gap-4 rounded-xl border border-brand/40 bg-gradient-to-r from-brand-soft/60 via-surface-2/70 to-surface p-4 pr-12 shadow-[0_0_34px_-18px_rgba(21,154,242,.9)] sm:flex-row sm:items-center min-[1440px]:max-w-[800px]"
        >
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-brand/50 bg-brand/15 text-brand shadow-[0_0_20px_-4px_rgba(21,154,242,.8)]"
          >
            <Icon name="barsFilled" size={30} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-semibold tracking-tight text-fg">Backtester incluído no seu plano</p>
            <p className="mt-1 text-pretty text-[12.5px] leading-5 text-fg-muted">
              Teste e valide estratégias antes de copiar. Analise resultados reais, otimize parâmetros e tome decisões com mais segurança.
            </p>
          </div>
          <Link
            href="/backtester"
            className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand-strong px-4 text-[13px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand ${FOCUS_RING}`}
          >
            Acessar Backtester
            <Icon name="arrowRight" size={16} />
          </Link>
          <button
            type="button"
            onClick={onDismissBanner}
            aria-label="Dispensar aviso do Backtester"
            className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/[.06] hover:text-fg ${FOCUS_RING}`}
          >
            <Icon name="x" size={16} />
          </button>
        </aside>
      )}
    </header>
  );
}
