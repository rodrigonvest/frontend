import { Badge, cx } from "../UI";
import { ACCOUNT_PLAN, ACCOUNT_PROFILE } from "../../lib/account-data";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { AccountIcon } from "./AccountIcons";
import { AccountCard, OutlineActionButton, VerifiedLabel } from "./AccountPrimitives";

export function ProfileCard({ onEdit, onChangePhoto }: { onEdit: () => void; onChangePhoto: () => void }) {
  const p = ACCOUNT_PROFILE;
  return (
    <AccountCard
      id="account-profile-title"
      title="Meu Perfil"
      action={
        <OutlineActionButton onClick={onEdit}>
          <AccountIcon name="edit" size={16} />
          Editar Perfil
        </OutlineActionButton>
      }
    >
      <div className="flex flex-col items-center gap-5 @lg:flex-row @lg:items-center @lg:gap-7">
        <div className="relative shrink-0">
          <span
            role="img"
            aria-label={`Avatar de ${p.name}`}
            className="flex size-28 items-center justify-center rounded-full bg-[#e6eaef] text-[64px] font-semibold leading-none text-[#28313a] shadow-[0_0_0_4px_rgba(21,154,242,.12)]"
          >
            {p.initial}
          </span>
          <button
            type="button"
            onClick={onChangePhoto}
            aria-label="Alterar foto de perfil"
            className={cx(
              "absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-surface bg-brand-strong text-white transition-colors hover:bg-brand",
              FOCUS_RING,
            )}
          >
            <AccountIcon name="camera" size={16} stroke={2} />
          </button>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2.5 text-center @lg:items-start @lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 @lg:justify-start">
            <p className="text-[26px] font-semibold leading-none tracking-tight text-fg">{p.name}</p>
            <Badge tone="amber" className="gap-1.5 rounded-lg border-warning/60 px-2.5 py-1 text-[13px]">
              <AccountIcon name="crown" size={15} stroke={2} />
              {p.badge}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 @lg:justify-start">
            <p className="text-[14.5px] text-fg-muted">{p.email}</p>
            <VerifiedLabel className="text-[14px]" />
          </div>
          <p className="text-[14.5px] text-fg-muted">Membro desde {p.memberSince}</p>
        </div>
      </div>
    </AccountCard>
  );
}

function PlanFact({ icon, label, value, note }: { icon: string; label: string; value: string; note?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface/70 p-3">
      <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-fg-muted">
        <AccountIcon name={icon} size={18} />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[12px] text-fg-muted">{label}</p>
        <p className="tabular mt-1 whitespace-nowrap text-[15px] font-semibold text-fg">{value}</p>
        {note && <p className="mt-0.5 text-[11.5px] text-fg-subtle">{note}</p>}
      </div>
    </div>
  );
}

export function PlanCard({ onManage, onInvoices }: { onManage: () => void; onInvoices: () => void }) {
  const plan = ACCOUNT_PLAN;
  return (
    <AccountCard
      id="account-plan-title"
      title="Plano Atual"
      action={
        <Badge tone="green" className="gap-2 rounded-full px-3.5 py-1 text-[13px]">
          <span aria-hidden className="size-2 rounded-full bg-success" />
          Ativo
        </Badge>
      }
    >
      <div className="flex items-center gap-5">
        <span
          aria-hidden
          className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-warning/30 bg-gradient-to-b from-warning/25 to-warning/5 text-warning shadow-[0_0_30px_-12px_rgba(240,195,92,.8)]"
        >
          <AccountIcon name="crown" size={52} stroke={1.7} />
        </span>
        <div className="min-w-0">
          <p className="text-[28px] font-semibold leading-none tracking-tight text-warning">{plan.name}</p>
          <p className="mt-2 text-pretty text-[14px] leading-6 text-fg-muted">{plan.description}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2.5 @md:grid-cols-3">
        <PlanFact icon="calendar" label="Válido até" value={plan.validUntil} note={`(${plan.daysLeft})`} />
        <PlanFact icon="dollar" label={plan.priceNote} value={plan.price} />
        <PlanFact icon="refresh" label="Renovação" value={plan.renewal} />
      </div>

      <div className="mt-4 grid gap-2.5 @sm:grid-cols-2">
        <button
          type="button"
          onClick={onManage}
          className={cx(
            "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-strong px-4 text-[13.5px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand",
            FOCUS_RING,
          )}
        >
          <AccountIcon name="crown" size={17} stroke={2} />
          Gerenciar Plano
        </button>
        <OutlineActionButton onClick={onInvoices} className="h-11 border-line-strong bg-transparent text-fg hover:bg-white/[.05]">
          <AccountIcon name="fileText" size={17} />
          Ver Cobranças
        </OutlineActionButton>
      </div>
    </AccountCard>
  );
}
