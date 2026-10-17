import { Icon } from "../Icons";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { QUICK_LINKS, type QuickLinkId } from "../../lib/help-data";
import { HelpTile } from "./HelpTile";

export default function QuickLinks({ onSelect }: { onSelect: (id: QuickLinkId) => void }) {
  return (
    <div className="@container">
      <ul className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-4">
        {QUICK_LINKS.map((link) => (
          <li key={link.id} className="min-w-0">
            <button
              type="button"
              onClick={() => onSelect(link.id)}
              className={cx(
                SURFACE,
                "group flex h-full w-full items-center gap-3.5 p-4 text-left transition-colors hover:border-line-strong hover:bg-white/[.03]",
                FOCUS_RING,
              )}
            >
              <HelpTile name={link.icon} accent={link.accent} size={24} className="size-12" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-5 text-fg">{link.title}</span>
                <span className="mt-1 block text-pretty text-[12.5px] leading-5 text-fg-muted">{link.description}</span>
              </span>
              <span aria-hidden className="flex shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg">
                <Icon name="chevron" size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
