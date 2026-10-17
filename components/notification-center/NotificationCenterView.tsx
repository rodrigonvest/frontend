"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { ToastRegion, useToast } from "../api-access/Toast";
import CategoryBar from "./CategoryBar";
import NotificationDetail from "./NotificationDetail";
import NotificationList from "./NotificationList";
import RelatedTimeline from "./RelatedTimeline";
import {
  initialUnreadBacklog,
  NOTIFICATIONS_PAGE_SIZE,
  NOTIFICATIONS_TOTAL,
  notificationsDemo,
  type NotificationCategoryId,
  type NotificationItem,
  type NotificationSortId,
} from "../../lib/notification-center-demo";

const headerButton =
  "inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border px-4 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function sortItems(items: NotificationItem[], sort: NotificationSortId) {
  const copy = [...items];
  if (sort === "oldest") return copy.sort((a, b) => b.position - a.position);
  if (sort === "unread") return copy.sort((a, b) => Number(b.unread) - Number(a.unread) || a.position - b.position);
  return copy.sort((a, b) => a.position - b.position);
}

export default function NotificationCenterView() {
  const [items, setItems] = useState<NotificationItem[]>(notificationsDemo);
  const [backlogCleared, setBacklogCleared] = useState(false);
  const [category, setCategory] = useState<NotificationCategoryId>("todas");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<NotificationSortId>("recent");
  const [selectedId, setSelectedId] = useState<string | null>(notificationsDemo[0].id);
  const { toast, notify } = useToast();

  const badges = useMemo(() => {
    const unread = items.filter((item) => item.unread);
    const byCategory = (id: keyof typeof initialUnreadBacklog) =>
      unread.filter((item) => item.category === id).length + (backlogCleared ? 0 : initialUnreadBacklog[id]);
    return {
      todas: unread.length,
      operacoes: byCategory("operacoes"),
      sistemas: byCategory("sistemas"),
      contas: byCategory("contas"),
      telegram: byCategory("telegram"),
      seguranca: byCategory("seguranca"),
      atualizacoes: byCategory("atualizacoes"),
    } satisfies Record<NotificationCategoryId, number>;
  }, [items, backlogCleared]);

  const visible = useMemo(() => {
    const term = normalize(query.trim());
    const matches = items.filter((item) => {
      if (category !== "todas" && item.category !== category) return false;
      if (!term) return true;
      const haystack = normalize(`${item.title} ${item.summary} ${item.highlight?.value ?? ""}`);
      return haystack.includes(term);
    });
    return sortItems(matches, sort);
  }, [items, category, query, sort]);

  const isFiltered = category !== "todas" || query.trim().length > 0;
  const effectiveId = visible.some((item) => item.id === selectedId) ? selectedId : (visible[0]?.id ?? null);
  const selected = items.find((item) => item.id === effectiveId) ?? null;
  const pageCount = Math.ceil(NOTIFICATIONS_TOTAL / NOTIFICATIONS_PAGE_SIZE);

  const markAllRead = () => {
    const hadUnread = badges.todas > 0 || !backlogCleared;
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    setBacklogCleared(true);
    notify(hadUnread ? "Todas as notificações foram marcadas como lidas." : "Não há notificações não lidas.", hadUnread ? "success" : "info");
  };

  const onMenuAction = (itemId: string, actionId: string) => {
    if (actionId === "toggle-read") {
      const target = items.find((item) => item.id === itemId);
      setItems((current) => current.map((item) => (item.id === itemId ? { ...item, unread: !item.unread } : item)));
      notify(target?.unread ? "Notificação marcada como lida." : "Notificação marcada como não lida.");
      return;
    }
    const messages: Record<string, string> = {
      mute: "Demonstração: tipo de notificação silenciado.",
      copy: "Demonstração: detalhes copiados.",
      "copy-signal": "Demonstração: dados do sinal copiados.",
      resend: "Demonstração: notificação reenviada.",
      "alert-rule": "Demonstração: regra de alerta criada.",
    };
    notify(messages[actionId] ?? "Ação demonstrativa executada.", "info");
  };

  return (
    <Shell>
      <div className="lg:-mt-3">
        <PageHeader
          title="Central de Notificações"
          description="Acompanhe em tempo real tudo que acontece no seu Copytrix."
          actions={
            <>
              <button type="button" onClick={markAllRead} className={cx(headerButton, "border-brand/60 bg-brand/10 text-fg hover:border-brand hover:bg-brand/15")}>
                <span aria-hidden className="text-brand">
                  <Icon name="check" size={17} stroke={2.4} />
                </span>
                Marcar todas como lidas
              </button>
              <Link href="/settings" className={cx(headerButton, "border-line-strong bg-surface text-fg hover:border-brand/60 hover:bg-surface-2")}>
                <span aria-hidden className="text-fg-muted">
                  <Icon name="settings" size={17} />
                </span>
                Configurações de Notificações
              </Link>
            </>
          }
        />

        <CategoryBar active={category} onChange={setCategory} badges={badges} />

        <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
          <NotificationList
            items={visible}
            selectedId={effectiveId}
            onSelect={setSelectedId}
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            filtered={isFiltered}
            total={NOTIFICATIONS_TOTAL}
            page={1}
            pageCount={pageCount}
            onPageChange={() => notify("Demonstração: apenas a primeira página possui dados.", "info")}
          />
          <div className="flex min-w-0 flex-col gap-4">
            <NotificationDetail item={selected} onMenuAction={onMenuAction} />
            <RelatedTimeline steps={selected?.detail.related} />
          </div>
        </div>
      </div>
      <ToastRegion toast={toast} />
    </Shell>
  );
}
