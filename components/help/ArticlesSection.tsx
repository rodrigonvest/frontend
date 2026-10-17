import { Icon } from "../Icons";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { ARTICLES, HELP_IDS, type Article } from "../../lib/help-data";
import { HelpTile } from "./HelpTile";
import { HelpSection, SectionLink } from "./HelpSection";

export default function ArticlesSection({
  onOpen,
  onViewAll,
}: {
  onOpen: (article: Article, trigger: HTMLElement) => void;
  onViewAll: () => void;
}) {
  return (
    <HelpSection
      id={HELP_IDS.articles}
      title="Artigos em Destaque"
      action={<SectionLink label="Ver todos os artigos" hint="Ver todos os artigos da central de ajuda" onClick={onViewAll} />}
    >
      <ul className="mt-3 grid gap-2.5 @xl:grid-cols-2">
        {ARTICLES.map((article) => (
          <li key={article.id} className="min-w-0">
            <button
              type="button"
              onClick={(event) => onOpen(article, event.currentTarget)}
              className={cx(
                "group flex h-full w-full items-center gap-3 rounded-xl border border-line bg-surface/60 p-3.5 text-left transition-colors hover:border-line-strong hover:bg-white/[.04]",
                FOCUS_RING,
              )}
            >
              <HelpTile name={article.icon} accent={article.accent} size={22} className="size-12" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold leading-5 text-fg">{article.title}</span>
                <span className="mt-0.5 block text-pretty text-[12.5px] leading-5 text-fg-muted">{article.description}</span>
              </span>
              <span aria-hidden className="flex shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg">
                <Icon name="chevron" size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </HelpSection>
  );
}
