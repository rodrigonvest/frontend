import { Icon } from "../Icons";
import { cx } from "../UI";
import { notificationCategories, type NotificationCategoryId } from "../../lib/notification-center-demo";

const iconTone: Record<NotificationCategoryId, string> = {
  todas: "text-brand",
  operacoes: "text-success",
  sistemas: "text-brand",
  contas: "text-brand",
  telegram: "text-[#2aabee]",
  seguranca: "text-success",
  atualizacoes: "text-[#a78bfa]",
};

export default function CategoryBar({
  active,
  onChange,
  badges,
}: {
  active: NotificationCategoryId;
  onChange: (id: NotificationCategoryId) => void;
  badges: Record<NotificationCategoryId, number>;
}) {
  return (
    <nav aria-label="Categorias de notificações">
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 2xl:grid-cols-7">
        {notificationCategories.map((category) => {
          const selected = category.id === active;
          const count = badges[category.id];
          return (
            <li key={category.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(category.id)}
                className={cx(
                  "flex h-[52px] w-full items-center gap-2.5 rounded-xl border px-3.5 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  selected
                    ? "border-brand bg-brand-strong text-white shadow-[0_0_24px_-6px_rgba(21,154,242,.65)]"
                    : "border-line bg-surface text-fg-muted hover:border-line-strong hover:bg-surface-2 hover:text-fg",
                )}
              >
                <span aria-hidden className={cx("flex shrink-0", selected ? "text-white" : iconTone[category.id])}>
                  <Icon name={category.icon} size={20} stroke={1.9} />
                </span>
                <span className="min-w-0 flex-1 truncate text-left">{category.label}</span>
                {count > 0 && (
                  <span className="tabular flex size-[22px] shrink-0 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-white">
                    <span aria-hidden>{count}</span>
                    <span className="sr-only">{count} não lidas</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
