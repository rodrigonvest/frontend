"use client";
import { useId, useState, type ReactNode } from "react";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";
import { CalendarIcon, ChevronRightIcon, CreditCardIcon, CrownIcon, GiftIcon, MastercardMark, PercentIcon, ReceiptIcon, TicketIcon } from "./PlanIcons";
import { billingDetails, currentSubscription, paymentMethod, promoCard } from "../../lib/plan-demo";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function SummaryCard({ labelledBy, className, children }: { labelledBy: string; className?: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx(
        "flex min-w-0 flex-col rounded-xl border border-brand/20 bg-surface/70 p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,.03)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CurrentPlanCard() {
  const titleId = useId();
  return (
    <SummaryCard labelledBy={titleId}>
      <div className="flex items-start gap-3.5">
        <span className="flex size-[58px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3a2f12] to-[#1b1a14] text-[#f5c542] shadow-[0_0_24px_rgba(245,197,66,.18)] ring-1 ring-[#f5c542]/20">
          <CrownIcon size={32} />
        </span>
        <div className="min-w-0">
          <h2 id={titleId} className="text-[15px] font-semibold leading-5 text-fg">
            Seu Plano Atual
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <p className="text-[24px] font-bold leading-7 tracking-tight text-fg">{currentSubscription.planName}</p>
            <span className="rounded-md bg-success px-2 py-0.5 text-[11.5px] font-semibold leading-4 text-canvas">{currentSubscription.status}</span>
          </div>
          <p className="mt-2.5 text-[13.5px] leading-[22px] text-fg-muted">{currentSubscription.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3.5 rounded-lg border border-line-strong/50 bg-canvas/50 px-4 py-3.5">
        <span className="text-fg-muted">
          <CalendarIcon size={30} />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] leading-4 text-fg-muted">{currentSubscription.validUntilLabel}</p>
          <p className="mt-0.5 text-[16px] font-semibold leading-6 text-fg">{currentSubscription.validUntil}</p>
          <p className="text-[12px] leading-4 text-fg-subtle">{currentSubscription.remaining}</p>
        </div>
      </div>

      <button
        type="button"
        className={cx(
          "mt-auto inline-flex h-[46px] w-full items-center justify-center gap-2.5 rounded-lg bg-brand-strong text-[14px] font-semibold text-white shadow-[0_0_20px_rgba(8,127,240,.3)] transition-colors hover:bg-brand",
          focusRing,
          "mt-5",
        )}
      >
        <SettingsIcon name="settings" size={18} stroke={2} />
        Gerenciar Assinatura
      </button>
      <button
        type="button"
        className={cx(
          "mt-2.5 inline-flex h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-brand/50 bg-brand-soft/15 text-[13px] font-medium text-fg transition-colors hover:bg-brand-soft/40",
          focusRing,
        )}
      >
        <ReceiptIcon size={16} />
        Ver Histórico de Cobrança
      </button>
    </SummaryCard>
  );
}

export function BillingCard() {
  const titleId = useId();
  return (
    <SummaryCard labelledBy={titleId}>
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center text-brand">
          <CreditCardIcon size={32} />
        </span>
        <h2 id={titleId} className="text-[16px] font-semibold leading-6 tracking-tight text-fg">
          Informações de Cobrança
        </h2>
      </header>

      <dl className="mt-4 flex flex-col text-[14px]">
        {billingDetails.map((row) => (
          <div key={row.label} className="grid grid-cols-[minmax(0,160px)_minmax(0,1fr)] items-center gap-3 py-[8px]">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="font-medium text-fg">{row.value}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[minmax(0,160px)_minmax(0,1fr)] items-center gap-3 py-[8px]">
          <dt className="text-fg-muted">Forma de pagamento</dt>
          <dd className="flex flex-wrap items-center gap-2.5 font-medium text-fg">
            <MastercardMark />
            <span className="tabular">{paymentMethod.mask}</span>
            <button type="button" className={cx("ml-2 text-[13.5px] font-medium text-brand underline-offset-2 hover:underline", focusRing)}>
              Alterar
            </button>
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,160px)_minmax(0,1fr)] items-center gap-3 py-[8px]">
          <dt className="text-fg-muted">Status</dt>
          <dd className="flex items-center gap-2 font-medium text-fg">
            <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" />
            Ativa
          </dd>
        </div>
      </dl>

      <div className="mt-auto grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
        <button
          type="button"
          className={cx(
            "inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-brand/60 bg-brand-soft/30 text-[13px] font-medium text-fg transition-colors hover:bg-brand-soft/60",
            focusRing,
          )}
        >
          <ReceiptIcon size={17} />
          Histórico de Cobrança
        </button>
        <button
          type="button"
          className={cx(
            "inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-danger/60 bg-danger/[.06] text-[13px] font-medium text-danger transition-colors hover:bg-danger/15",
            focusRing,
          )}
        >
          <SettingsIcon name="trash" size={17} />
          Cancelar Assinatura
        </button>
      </div>
    </SummaryCard>
  );
}

export function CouponCard() {
  const titleId = useId();
  const inputId = useId();
  const [code, setCode] = useState("");
  return (
    <SummaryCard labelledBy={titleId} className="h-full">
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center text-brand">
          <PercentIcon size={32} />
        </span>
        <h2 id={titleId} className="text-[16px] font-semibold leading-6 tracking-tight text-fg">
          Código de Cupom
        </h2>
      </header>

      <label htmlFor={inputId} className="mt-3 block text-[13.5px] text-fg-muted">
        Tem um cupom de desconto?
      </label>
      <div className="mt-3 flex gap-3">
        <input
          id={inputId}
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite seu cupom aqui"
          autoComplete="off"
          className="h-[46px] min-w-0 flex-1 rounded-lg border border-line-strong/60 bg-canvas/40 px-3.5 text-[14px] text-fg placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand/40"
        />
        <button
          type="button"
          className={cx(
            "inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-strong px-5 text-[14px] font-semibold text-white shadow-[0_0_18px_rgba(8,127,240,.3)] transition-colors hover:bg-brand",
            focusRing,
          )}
        >
          <TicketIcon size={17} />
          Aplicar
        </button>
      </div>

      <button
        type="button"
        className={cx(
          "mt-5 flex w-full items-center gap-4 rounded-xl border border-[#8b5cf6]/40 bg-gradient-to-r from-[#2a1d5e]/80 via-[#1d1747]/80 to-[#12183a]/80 p-4 text-left transition-colors hover:border-[#a78bfa]/70",
          focusRing,
        )}
      >
        <span className="flex size-[50px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#5b3fd1] text-white shadow-[0_0_20px_rgba(139,92,246,.45)]">
          <GiftIcon size={26} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15.5px] font-semibold leading-6 text-fg">{promoCard.title}</span>
          <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{promoCard.description}</span>
        </span>
        <span className="shrink-0 text-fg-muted">
          <ChevronRightIcon size={20} />
        </span>
      </button>
    </SummaryCard>
  );
}
