import type { ReactNode } from "react";
import { ACCOUNT_PROFILE } from "../../lib/account-data";
import { SmallActionButton } from "../billing/BillingPrimitives";
import { Badge } from "../UI";
import { AccountIcon, BrazilFlag } from "./AccountIcons";
import { AccountCard, IconTile, RowButton } from "./AccountPrimitives";

function VerifiedBadge() {
  return (
    <Badge tone="green" className="gap-1 rounded-md px-2 py-0.5">
      <AccountIcon name="check" size={13} stroke={2.6} />
      Verificado
    </Badge>
  );
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-2.5 @sm:grid-cols-[minmax(0,7rem)_minmax(0,1fr)] @sm:items-center @sm:gap-3">
      <dt className="text-[13px] text-fg-muted">{label}</dt>
      <dd className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-[14px] font-medium text-fg">{children}</dd>
    </div>
  );
}

export function PersonalInfoCard({ onEdit }: { onEdit: () => void }) {
  const p = ACCOUNT_PROFILE;
  return (
    <AccountCard
      id="account-personal-title"
      title="Informações Pessoais"
      action={<SmallActionButton onClick={onEdit}>Editar</SmallActionButton>}
    >
      <dl className="divide-y divide-line/60">
        <InfoRow label="Nome Completo">{p.fullName}</InfoRow>
        <InfoRow label="E-mail">
          <span>{p.email}</span>
          <VerifiedBadge />
        </InfoRow>
        <InfoRow label="Telefone">
          <span className="tabular">{p.phone}</span>
          <VerifiedBadge />
        </InfoRow>
        <InfoRow label="País">
          <span className="inline-flex items-center gap-2.5">
            <BrazilFlag />
            {p.country}
          </span>
        </InfoRow>
        <InfoRow label="Idioma">Português (Brasil)</InfoRow>
        <InfoRow label="Fuso Horário">(GMT-3) América/São Paulo</InfoRow>
      </dl>
    </AccountCard>
  );
}

interface SecurityItem {
  id: string;
  icon: string;
  accent: "green" | "amber" | "blue";
  title: string;
  description: string;
  action: string;
  primary?: boolean;
}

const SECURITY_ITEMS: SecurityItem[] = [
  {
    id: "password",
    icon: "lock",
    accent: "green",
    title: "Senha",
    description: `Última alteração em ${ACCOUNT_PROFILE.passwordChangedAt}`,
    action: "Alterar",
  },
  {
    id: "2fa",
    icon: "shieldCheck",
    accent: "green",
    title: "Autenticação em 2 Fatores (2FA)",
    description: "Proteja sua conta com 2FA",
    action: "Ativar",
    primary: true,
  },
  {
    id: "devices",
    icon: "laptop",
    accent: "blue",
    title: "Dispositivos Conectados",
    description: "3 dispositivos ativos",
    action: "Gerenciar",
  },
  {
    id: "sessions",
    icon: "key",
    accent: "amber",
    title: "Sessões Ativas",
    description: "Veja e encerre sessões ativas",
    action: "Gerenciar",
  },
];

export function SecurityCard({ onAction }: { onAction: (id: string, title: string) => void }) {
  return (
    <AccountCard id="account-security-title" title="Segurança da Conta">
      <ul className="flex flex-col gap-2.5">
        {SECURITY_ITEMS.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-xl border border-line bg-surface/70 p-3">
            <IconTile name={item.icon} accent={item.accent} size={22} className="size-12" />
            <div className="min-w-[9rem] flex-1">
              <p className="text-[14px] font-semibold leading-snug text-fg">{item.title}</p>
              <p className="mt-0.5 text-[12.5px] leading-5 text-fg-muted">{item.description}</p>
            </div>
            <RowButton
              variant={item.primary ? "primary" : "outline"}
              onClick={() => onAction(item.id, item.title)}
              aria-label={`${item.action}: ${item.title}`}
            >
              {item.action}
            </RowButton>
          </li>
        ))}
      </ul>
    </AccountCard>
  );
}
