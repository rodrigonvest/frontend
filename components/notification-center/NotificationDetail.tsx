"use client";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge, cx, EmptyState } from "../UI";
import Menu from "./Menu";
import NotificationVisual from "./NotificationVisual";
import type { NotificationItem } from "../../lib/notification-center-demo";

const kebabOptions = (unread: boolean) => [
  { id: "toggle-read", label: unread ? "Marcar como lida" : "Marcar como não lida", icon: "check" },
  { id: "mute", label: "Silenciar este tipo", icon: "bell" },
  { id: "copy", label: "Copiar detalhes", icon: "copy" },
];

const moreActions = [
  { id: "copy-signal", label: "Copiar dados do sinal", icon: "copy" },
  { id: "resend", label: "Reenviar notificação", icon: "send" },
  { id: "alert-rule", label: "Criar regra de alerta", icon: "plus" },
];

const actionLinkClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function NotificationDetail({
  item,
  onMenuAction,
}: {
  item: NotificationItem | null;
  onMenuAction: (itemId: string, actionId: string) => void;
}) {
  if (!item) {
    return (
      <section aria-labelledby="notif-detail-title" className="rounded-xl border border-line bg-surface p-5">
        <h2 id="notif-detail-title" className="sr-only">
          Detalhes da notificação
        </h2>
        <EmptyState className="min-h-[320px]" title="Selecione uma notificação" description="Os detalhes da notificação escolhida aparecem aqui." />
      </section>
    );
  }

  const { detail } = item;
  const { signal } = detail;

  return (
    <section aria-labelledby="notif-detail-title" className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <header className="flex items-start gap-3.5">
        <NotificationVisual kind={item.kind} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 id="notif-detail-title" className="text-lg font-semibold leading-6 text-fg">
              {item.title}
            </h2>
            <div className="hidden shrink-0 text-right sm:block">
              <p className="tabular flex items-center justify-end gap-1.5 text-[13px] text-fg-muted">
                {item.unread && (
                  <>
                    <span aria-hidden className="size-2 rounded-full bg-brand" />
                    <span className="sr-only">Não lida. </span>
                  </>
                )}
                {item.time}
              </p>
              <p className="tabular text-[13px] text-fg-muted">{item.date}</p>
            </div>
          </div>
          <p className="tabular mt-0.5 flex items-center gap-1.5 text-[13px] text-fg-muted sm:hidden">
            {item.unread && (
              <>
                <span aria-hidden className="size-2 rounded-full bg-brand" />
                <span className="sr-only">Não lida. </span>
              </>
            )}
            {item.time} · {item.date}
          </p>
        </div>
        <Menu
          menuLabel="Ações da notificação"
          triggerLabel="Mais ações da notificação"
          triggerClassName="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong text-fg-muted transition-colors hover:border-brand/60 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          options={kebabOptions(item.unread)}
          onSelect={(actionId) => onMenuAction(item.id, actionId)}
        >
          <Icon name="vmore" size={18} />
        </Menu>
      </header>

      <p className="mt-4 text-[14px] leading-6 text-fg-muted">{detail.description}</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-canvas/40">
        {signal && (
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-warning/20 text-warning">
                <Icon name="box" size={30} stroke={1.7} />
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xl font-bold tracking-tight text-fg">{signal.symbol}</span>
                  <Badge tone="green" className="px-2.5 text-xs font-semibold">
                    {signal.side}
                  </Badge>
                </p>
                <p className="tabular mt-1 text-[14px] text-fg-muted">
                  Entry: <span className="text-fg">{signal.entry}</span>
                </p>
              </div>
            </div>
            <dl className="tabular grid grid-cols-[auto_auto] gap-x-6 gap-y-0.5 text-[13px] sm:justify-end">
              {signal.levels.map((level) => (
                <div key={level.label} className="col-span-2 grid grid-cols-subgrid">
                  <dt className="text-fg-muted">{level.label}:</dt>
                  <dd className={cx("text-right font-medium", level.label === "SL" ? "text-danger" : "text-fg")}>{level.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <dl>
          {detail.rows.map((row, index) => (
            <div
              key={row.label}
              className={cx(
                "grid min-h-[42px] grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] items-center gap-3 px-4 py-2 text-[13.5px]",
                signal && "border-t border-line",
                index % 2 === 0 && "bg-white/[.02]",
                !signal && index > 0 && "border-t border-line",
              )}
            >
              <dt className="text-fg-muted">{row.label}</dt>
              <dd className="flex min-w-0 items-center gap-2.5 text-fg">
                {row.icon && (
                  <span aria-hidden className={cx("flex shrink-0", row.icon === "telegram" ? "text-[#2aabee]" : "text-brand")}>
                    <Icon name={row.icon} size={18} stroke={1.8} />
                  </span>
                )}
                <span className="tabular min-w-0 break-words">{row.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <Link href={detail.primaryAction.href} className={cx(actionLinkClass, "bg-brand-strong text-white hover:bg-brand")}>
          {detail.primaryAction.label}
        </Link>
        {detail.secondaryAction && (
          <Link
            href={detail.secondaryAction.href}
            className={cx(actionLinkClass, "border border-brand/50 bg-brand/5 text-fg hover:border-brand hover:bg-brand/10")}
          >
            <span aria-hidden className="text-brand">
              <Icon name="external" size={16} />
            </span>
            {detail.secondaryAction.label}
          </Link>
        )}
        <Menu
          menuLabel="Ações adicionais"
          triggerClassName={cx(actionLinkClass, "w-full border border-brand/50 bg-brand/5 text-fg hover:border-brand hover:bg-brand/10")}
          options={moreActions}
          onSelect={(actionId) => onMenuAction(item.id, actionId)}
        >
          Ações
          <span aria-hidden className="text-fg-muted">
            <Icon name="chevronDown" size={15} />
          </span>
        </Menu>
      </div>
    </section>
  );
}
