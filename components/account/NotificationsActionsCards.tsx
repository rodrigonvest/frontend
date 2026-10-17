import { useId, type MouseEvent } from "react";
import {
  ACCOUNT_SESSIONS,
  NOTIFICATION_CHANNELS,
  type NotificationChannelId,
} from "../../lib/account-data";
import { FOCUS_RING, SmallActionButton } from "../billing/BillingPrimitives";
import { Badge, cx } from "../UI";
import { AccountIcon } from "./AccountIcons";
import { AccountCard, IconTile, RowButton, Toggle } from "./AccountPrimitives";

export function NotificationsCard({
  values,
  onToggle,
  onConfigure,
}: {
  values: Record<NotificationChannelId, boolean>;
  onToggle: (id: NotificationChannelId, next: boolean) => void;
  onConfigure: () => void;
}) {
  const baseId = useId();
  return (
    <AccountCard
      id="account-notifications-title"
      title="Notificações"
      action={<SmallActionButton onClick={onConfigure}>Configurar</SmallActionButton>}
    >
      <ul className="flex flex-col gap-3.5">
        {NOTIFICATION_CHANNELS.map((channel) => {
          const titleId = `${baseId}-${channel.id}-title`;
          const descId = `${baseId}-${channel.id}-desc`;
          return (
            <li key={channel.id} className="flex items-center gap-3.5">
              <IconTile name={channel.icon} accent={channel.accent} size={22} className="size-12" />
              <div className="min-w-0 flex-1">
                <p id={titleId} className="text-[14px] font-semibold text-fg">
                  {channel.title}
                </p>
                <p id={descId} className="mt-0.5 text-[12.5px] leading-5 text-fg-muted">
                  {channel.description}
                </p>
              </div>
              <Toggle
                checked={values[channel.id]}
                onChange={(next) => onToggle(channel.id, next)}
                labelledBy={titleId}
                describedBy={descId}
              />
            </li>
          );
        })}
      </ul>
    </AccountCard>
  );
}

type ActionHandler = (trigger: HTMLElement) => void;

function ActionTile({
  icon,
  accent,
  title,
  description,
  onClick,
  danger = false,
}: {
  icon: string;
  accent: "purple" | "red" | "amber";
  title: string;
  description: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full min-w-0 items-center gap-3 rounded-xl border p-3.5 text-left transition-colors",
        danger
          ? "border-danger/35 bg-danger/[.07] hover:border-danger/60 hover:bg-danger/[.12]"
          : "border-line bg-surface/70 hover:border-line-strong hover:bg-surface-2",
        FOCUS_RING,
        danger && "focus-visible:outline-danger",
      )}
    >
      <IconTile name={icon} accent={accent} size={21} className="size-11" />
      <span className="min-w-0">
        <span className={cx("block text-[14px] font-semibold leading-snug", danger ? "text-[#ff8a96]" : "text-fg")}>{title}</span>
        <span className="mt-0.5 block text-[12.5px] leading-5 text-fg-muted">{description}</span>
      </span>
    </button>
  );
}

export function AccountActionsCard({
  onExport,
  onDelete,
  onLogout,
}: {
  onExport: ActionHandler;
  onDelete: ActionHandler;
  onLogout: ActionHandler;
}) {
  return (
    <AccountCard id="account-actions-title" title="Ações da Conta">
      <div className="grid gap-2.5 @2xl:grid-cols-3">
        <ActionTile
          icon="download"
          accent="purple"
          title="Exportar Meus Dados"
          description="Baixe uma cópia dos seus dados"
          onClick={(e) => onExport(e.currentTarget)}
        />
        <ActionTile
          icon="trash"
          accent="red"
          danger
          title="Excluir Conta"
          description="Esta ação é permanente"
          onClick={(e) => onDelete(e.currentTarget)}
        />
        <ActionTile
          icon="logout"
          accent="amber"
          title="Sair da Conta"
          description="Encerrar sessão neste dispositivo"
          onClick={(e) => onLogout(e.currentTarget)}
        />
      </div>
    </AccountCard>
  );
}

export function SessionsCard({ onEnd }: { onEnd: (device: string) => void }) {
  return (
    <AccountCard id="account-sessions-title" title="Sessões Ativas">
      <ul className="flex flex-col gap-2.5">
        {ACCOUNT_SESSIONS.map((session) => (
          <li key={session.id} className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-xl border border-line bg-surface/70 p-3">
            <IconTile name={session.icon} accent={session.current ? "green" : "blue"} size={22} className="size-12" />
            <div className="min-w-[10rem] flex-1">
              <p className="flex flex-wrap items-center gap-2 text-[14px] font-semibold leading-snug text-fg">
                {session.device}
                {session.current && (
                  <Badge tone="green">
                    <AccountIcon name="check" size={12} stroke={2.6} />
                    Este dispositivo
                  </Badge>
                )}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-5 text-fg-muted">
                {session.location} · {session.lastActivity}
              </p>
            </div>
            {!session.current && (
              <RowButton onClick={() => onEnd(session.device)} aria-label={`Encerrar sessão em ${session.device}`}>
                Encerrar
              </RowButton>
            )}
          </li>
        ))}
      </ul>
    </AccountCard>
  );
}
