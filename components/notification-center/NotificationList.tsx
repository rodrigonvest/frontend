"use client";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx, EmptyState } from "../UI";
import Menu from "./Menu";
import NotificationVisual from "./NotificationVisual";
import {
  notificationSortOptions,
  type HighlightTone,
  type NotificationItem,
  type NotificationSortId,
} from "../../lib/notification-center-demo";

const highlightTone: Record<HighlightTone, string> = {
  success: "text-success",
  danger: "text-danger",
  info: "text-brand",
  neutral: "text-fg",
};

function NotificationRow({ item, selected, onSelect }: { item: NotificationItem; selected: boolean; onSelect: () => void }) {
  return (
    <li>
      <button
        type="button"
        aria-current={selected ? "true" : undefined}
        onClick={onSelect}
        className={cx(
          "flex w-full items-center gap-3.5 rounded-xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
          selected
            ? "border-brand bg-brand-soft/60 shadow-[0_0_22px_-8px_rgba(21,154,242,.7)]"
            : "border-transparent hover:border-line hover:bg-white/[.03]",
        )}
      >
        <NotificationVisual kind={item.kind} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className={cx("truncate text-[14.5px] leading-5 text-fg", item.unread ? "font-semibold" : "font-medium")}>{item.title}</span>
            <time className="tabular shrink-0 text-xs text-fg-muted">{item.time}</time>
          </span>
          <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{item.summary}</span>
          {item.highlight && (
            <span className={cx("tabular block text-[13px] font-medium leading-5", highlightTone[item.highlight.tone])}>
              {item.highlight.prefix && <span className="font-normal text-fg-muted">{item.highlight.prefix}</span>}
              {item.highlight.value}
            </span>
          )}
        </span>
        <span className="flex w-3 shrink-0 justify-center">
          {item.unread && (
            <>
              <span aria-hidden className="size-2.5 rounded-full bg-brand shadow-[0_0_8px_rgba(21,154,242,.9)]" />
              <span className="sr-only">Não lida</span>
            </>
          )}
        </span>
      </button>
    </li>
  );
}

function PageButton({
  children,
  label,
  current,
  disabled,
  onClick,
}: {
  children: ReactNode;
  label: string;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "tabular flex size-10 items-center justify-center rounded-lg border text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 sm:size-9",
        current ? "border-brand bg-brand-strong text-white" : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export default function NotificationList({
  items,
  selectedId,
  onSelect,
  query,
  onQueryChange,
  sort,
  onSortChange,
  filtered,
  total,
  page,
  pageCount,
  onPageChange,
}: {
  items: NotificationItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  sort: NotificationSortId;
  onSortChange: (value: NotificationSortId) => void;
  filtered: boolean;
  total: number;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const sortLabel = notificationSortOptions.find((o) => o.id === sort)?.label ?? "";

  return (
    <section aria-labelledby="notif-list-title" className="flex min-w-0 flex-col rounded-xl border border-line bg-surface p-3.5 sm:p-4">
      <h2 id="notif-list-title" className="sr-only">
        Lista de notificações
      </h2>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle">
            <Icon name="search" size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Buscar notificações"
            placeholder="Buscar notificações..."
            className="h-11 w-full rounded-lg border border-line-strong bg-canvas/50 pl-10 pr-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <Menu
          menuLabel="Ordenar notificações"
          triggerLabel={`Ordenar por: ${sortLabel}`}
          triggerClassName="flex h-11 w-full items-center justify-between gap-3 rounded-lg border border-line-strong bg-canvas/50 px-3.5 text-[13px] text-fg transition-colors hover:border-brand/60 focus-visible:outline-2 focus-visible:outline-brand"
          options={notificationSortOptions.map((o) => ({ id: o.id, label: o.label }))}
          selectedId={sort}
          onSelect={(id) => onSortChange(id as NotificationSortId)}
          className="sm:w-[180px]"
        >
          <span>{sortLabel}</span>
          <span aria-hidden className="text-fg-muted">
            <Icon name="chevronDown" size={15} />
          </span>
        </Menu>
      </div>

      {items.length === 0 ? (
        <EmptyState
          className="mt-3 min-h-[320px]"
          title="Nenhuma notificação encontrada"
          description="Ajuste a busca ou escolha outra categoria para ver mais resultados."
        />
      ) : (
        <ul className="mt-3 flex flex-col gap-0.5">
          {items.map((item) => (
            <NotificationRow key={item.id} item={item} selected={item.id === selectedId} onSelect={() => onSelect(item.id)} />
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3.5 sm:flex-row sm:items-center sm:justify-between">
        {filtered ? (
          <p role="status" className="text-[13px] text-fg-muted">
            {items.length} {items.length === 1 ? "notificação encontrada" : "notificações encontradas"}
          </p>
        ) : (
          <>
            <nav aria-label="Paginação de notificações" className="flex flex-wrap items-center gap-1.5">
              <PageButton label="Página anterior" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                <Icon name="arrowLeft" size={16} />
              </PageButton>
              {[1, 2, 3].map((n) => (
                <PageButton key={n} label={`Página ${n}`} current={page === n} onClick={() => onPageChange(n)}>
                  {n}
                </PageButton>
              ))}
              <span aria-hidden className="flex size-9 items-center justify-center text-fg-muted">
                ...
              </span>
              <PageButton label={`Página ${pageCount}`} current={page === pageCount} onClick={() => onPageChange(pageCount)}>
                {pageCount}
              </PageButton>
              <PageButton label="Próxima página" disabled={page === pageCount} onClick={() => onPageChange(page + 1)}>
                <Icon name="arrowRight" size={16} />
              </PageButton>
            </nav>
            <p className="tabular text-[13px] text-fg-muted">
              Mostrando 1–{items.length} de {total} notificações
            </p>
          </>
        )}
      </div>
    </section>
  );
}
