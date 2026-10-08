"use client";

import { useId, useMemo, useState } from "react";
import { Icon } from "../Icons";
import { EmptyState, cx } from "../UI";
import { platformFilters, platformMeta, presentationAccounts, type PlatformFilterKey } from "../../lib/accounts-presentation";
import AccountRow from "./AccountRow";
import AccountsPanels from "./AccountsPanels";
import AccountsSummary from "./AccountsSummary";

const bottomTabs = [
  { key: "summary", label: "Resumo", icon: "dashboard" },
  { key: "risk", label: "Configurações de Risco", icon: "target" },
  { key: "symbols", label: "Símbolos", icon: "candle" },
  { key: "history", label: "Histórico de Conexões", icon: "clock" },
] as const;

type BottomTabKey = (typeof bottomTabs)[number]["key"];

function FilterGlyph({ filter }: { filter: PlatformFilterKey }) {
  if (filter === "all") return <Icon name="layers" size={14} />;
  return <span aria-hidden className="hidden size-2.5 rounded-full border-2 2xl:block" style={{ borderColor: platformMeta[filter].color }} />;
}

export default function AccountsView() {
  const [filter, setFilter] = useState<PlatformFilterKey>("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<BottomTabKey>("summary");
  const searchId = useId();

  const visibleAccounts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return presentationAccounts.filter((a) => {
      if (filter !== "all" && a.platform !== filter) return false;
      if (!term) return true;
      return [a.name, a.server, a.login, a.platformLabel].some((v) => v.toLowerCase().includes(term));
    });
  }, [filter, query]);

  return (
    <div className="space-y-3.5">
      <AccountsSummary />

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div role="group" aria-label="Filtrar por plataforma" className="-mx-1 flex min-w-0 gap-1 overflow-x-auto px-1 pb-1 xl:pb-0 2xl:gap-1.5">
          {platformFilters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                className={cx(
                  "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md border px-2 text-[12px] font-medium whitespace-nowrap transition-colors 2xl:px-3 2xl:text-[12.5px]",
                  active
                    ? "border-brand bg-brand-strong text-white"
                    : "border-line bg-surface text-fg-muted hover:border-line-strong hover:bg-surface-2 hover:text-fg",
                )}
              >
                <FilterGlyph filter={f.key} />
                {f.label} ({f.count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full xl:w-[190px] xl:shrink-0 2xl:w-[240px]">
          <label htmlFor={searchId} className="sr-only">
            Buscar conta
          </label>
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle">
            <Icon name="search" size={16} />
          </span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar conta..."
            className="h-11 w-full rounded-md border border-line bg-surface pl-10 pr-3 text-[14px] text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      <section aria-label="Lista de contas" className="space-y-2.5">
        {visibleAccounts.length > 0 ? (
          visibleAccounts.map((account) => <AccountRow key={account.id} account={account} />)
        ) : (
          <EmptyState title="Nenhuma conta encontrada" description="Ajuste o filtro de plataforma ou a busca para ver outras contas." className="bg-surface py-10" />
        )}
      </section>

      <div className="rounded-lg border border-line bg-surface/40 p-1">
        <div role="tablist" aria-label="Detalhes das contas" className="flex gap-1.5 overflow-x-auto pb-1">
          {bottomTabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                id={`accounts-tab-${t.key}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="accounts-tabpanel"
                onClick={() => setTab(t.key)}
                className={cx(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-4 text-[13px] font-medium transition-colors",
                  active ? "border-brand bg-brand-strong text-white" : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                <Icon name={t.icon} size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div id="accounts-tabpanel" role="tabpanel" aria-labelledby={`accounts-tab-${tab}`} className="mt-1">
          {tab === "summary" ? (
            <AccountsPanels />
          ) : (
            <EmptyState title="Disponível em breve" description="Esta seção será liberada na integração com o Copytrix Core." className="bg-surface py-12" />
          )}
        </div>
      </div>
    </div>
  );
}
