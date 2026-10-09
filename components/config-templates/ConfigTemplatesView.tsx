"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { Toast } from "../multi-account/MaPrimitives";
import { SelectBox } from "../risk-management/RiskFields";
import {
  categories,
  communityTemplates,
  formatToday,
  initialMyTemplates,
  matchesQuery,
  mergeImportedTemplate,
  officialTemplates,
  scopeTabs,
  sortOptions,
  sortTemplates,
  type ConfigTemplate,
  type TemplateScope,
} from "../../lib/config-templates-demo";
import ConfigTemplatesHeader from "./ConfigTemplatesHeader";
import TemplateCard from "./TemplateCard";
import TemplateDetailPanel from "./TemplateDetailPanel";
import TemplateModal, { type TemplateDraft } from "./TemplateModal";
import { MyTemplatesPanel, QuickActionsPanel, TopUsedPanel } from "./BottomPanels";

type ModalState = { mode: "create" | "edit" | "saveNew"; template?: ConfigTemplate } | null;

function parseAssets(text: string) {
  const list = text
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 6);
  return list.length ? list : ["XAUUSD"];
}

export default function ConfigTemplatesView() {
  const [scope, setScope] = useState<TemplateScope>("official");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [mine, setMine] = useState<ConfigTemplate[]>(initialMyTemplates);
  const [selectedId, setSelectedId] = useState("o1");
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [testing, setTesting] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string | null>(null);
  const idCounter = useRef(0);
  const backtestTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(
    () => () => {
      if (backtestTimer.current) window.clearTimeout(backtestTimer.current);
    },
    [],
  );

  const allTemplates = useMemo(() => [...officialTemplates, ...communityTemplates, ...mine], [mine]);
  const source = scope === "official" ? officialTemplates : scope === "community" ? communityTemplates : mine;

  const visible = useMemo(() => {
    const filtered = source.filter(
      (template) => (category === "all" || template.categories.includes(category)) && (type === "all" || template.type === type) && matchesQuery(template, query),
    );
    return sortTemplates(filtered, sort);
  }, [source, category, type, query, sort]);

  const selected = allTemplates.find((template) => template.id === selectedId) ?? visible[0] ?? officialTemplates[0];

  const nextId = () => {
    idCounter.current += 1;
    return `m-new-${idCounter.current}`;
  };

  const addMine = (template: ConfigTemplate, message: string) => {
    setMine((current) => [template, ...current]);
    setSelectedId(template.id);
    setToast(message);
  };

  const applyTemplate = (template: ConfigTemplate) => {
    setApplied((current) => new Set(current).add(template.id));
    setSelectedId(template.id);
    setToast(`Template "${template.name}" aplicado às contas selecionadas.`);
  };

  const duplicate = (template: ConfigTemplate) => {
    const copy: ConfigTemplate = { ...template, id: nextId(), scope: "mine", name: `${template.name} (cópia)`, popular: false, users: 1, modified: formatToday(), author: "Você" };
    addMine(copy, `Template duplicado como "${copy.name}".`);
  };

  const runBacktest = () => {
    if (testing) return;
    setTesting(true);
    backtestTimer.current = window.setTimeout(() => {
      setTesting(false);
      setToast(`Backtest de "${selected.name}" concluído: ${selected.winRate.toFixed(1)}% de win rate no período.`);
    }, 1500);
  };

  const share = async () => {
    const link = `${window.location.origin}/sistemas/templates?t=${selected.id}`;
    try {
      await navigator.clipboard.writeText(link);
      setToast("Link do template copiado.");
    } catch {
      setToast("Não foi possível copiar o link.");
    }
  };

  const exportSelected = () => {
    const blob = new Blob([JSON.stringify(selected, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `template-${selected.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast(`Template "${selected.name}" exportado.`);
  };

  const importFile = async (file: File) => {
    try {
      const imported = mergeImportedTemplate(JSON.parse(await file.text()), nextId());
      if (!imported) throw new Error("invalid");
      setScope("mine");
      addMine(imported, `Template "${imported.name}" importado.`);
    } catch {
      setToast("Arquivo inválido. Use um JSON de template exportado.");
    }
  };

  const confirmModal = (draft: TemplateDraft) => {
    if (!modal) return;
    const name = draft.name.trim();
    const assets = parseAssets(draft.assets);
    if (modal.mode === "edit" && modal.template?.scope === "mine") {
      const target = modal.template;
      setMine((current) => current.map((item) => (item.id === target.id ? { ...item, name, type: draft.type, assets, modified: formatToday() } : item)));
      setToast(`Template "${name}" atualizado.`);
    } else {
      const base = modal.template ?? selected;
      const created: ConfigTemplate = { ...base, id: nextId(), scope: "mine", name, type: draft.type, assets, popular: false, users: 1, modified: formatToday(), author: "Você" };
      if (modal.mode === "create") setScope("mine");
      addMine(created, `Template "${name}" criado.`);
    }
    setModal(null);
  };

  const deleteMine = (template: ConfigTemplate) => {
    setMine((current) => current.filter((item) => item.id !== template.id));
    if (selectedId === template.id) setSelectedId("o1");
    setToast(`Template "${template.name}" excluído.`);
  };

  const modalDraft = (): TemplateDraft => {
    const template = modal?.template ?? selected;
    if (modal?.mode === "create") return { name: "", type: "Scalping", assets: "XAUUSD" };
    return {
      name: modal?.mode === "saveNew" ? `${template.name} (novo)` : template.name,
      type: template.type,
      assets: template.assets.join(", "),
    };
  };

  const modalCopy = {
    create: { title: "Criar Template", description: "Defina o nome, tipo e ativos. As regras partem do template selecionado.", confirm: "Criar Template" },
    edit: { title: "Editar Template", description: "Atualize os dados do template. Templates oficiais geram uma cópia sua.", confirm: "Salvar Alterações" },
    saveNew: { title: "Salvar como Novo", description: "Cria um novo template a partir das regras atuais.", confirm: "Salvar Template" },
  } as const;

  const goToScope = (next: TemplateScope) => {
    setScope(next);
    setCategory("all");
  };

  return (
    <Shell wide>
      <ConfigTemplatesHeader query={query} onQuery={setQuery} type={type} onType={setType} onCreate={() => setModal({ mode: "create" })} />

      <div className="mt-4 flex flex-wrap items-center gap-2" role="tablist" aria-label="Origem dos templates">
        {scopeTabs.map((tab) => {
          const active = tab.id === scope;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => goToScope(tab.id)}
              className={cx(
                "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active ? "border-brand bg-brand-strong text-white shadow-[0_0_16px_-4px_rgba(21,154,242,.7)]" : "border-line-strong bg-[#0a1b2b] text-fg hover:border-brand",
              )}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Categorias">
          {categories.map((item) => {
            const active = item.id === category;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item.id)}
                className={cx(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  active ? "border-brand bg-brand-strong text-white" : "border-line-strong bg-[#0a1b2b] text-fg-muted hover:border-brand hover:text-fg",
                )}
              >
                <Icon name={item.icon} size={13} />
                {item.label} ({item.count})
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] text-fg-muted">Ordenar por:</span>
          <div className="w-[160px]">
            <SelectBox label="Ordenar por" value={sort} options={sortOptions} onChange={setSort} />
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "template encontrado" : "templates encontrados"}
      </p>

      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 space-y-4">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center">
              <span className="text-brand">
                <Icon name="search" size={28} />
              </span>
              <h2 className="text-[16px] font-semibold text-fg">Nenhum template encontrado</h2>
              <p className="max-w-sm text-pretty text-[13px] text-fg-muted">Ajuste a busca, a categoria ou o tipo para ver outros templates.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setType("all");
                  setCategory("all");
                }}
                className="mt-2 inline-flex h-9 items-center rounded-lg border border-line-strong bg-[#0a1b2b] px-4 text-[13px] text-fg hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {visible.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selected={template.id === selected.id}
                  applied={applied.has(template.id)}
                  onSelect={() => setSelectedId(template.id)}
                  onUse={() => applyTemplate(template)}
                />
              ))}
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-[1.5fr_1fr_1fr]">
            <MyTemplatesPanel
              templates={mine}
              onSeeAll={() => goToScope("mine")}
              onSelect={(template) => {
                setScope("mine");
                setSelectedId(template.id);
              }}
              onEdit={(template) => setModal({ mode: "edit", template })}
              onDuplicate={duplicate}
              onDelete={deleteMine}
            />
            <TopUsedPanel
              templates={[...officialTemplates, ...communityTemplates]}
              onSeeAll={() => {
                goToScope("official");
                setSort("popular");
              }}
              onSelect={(template) => {
                setScope(template.scope);
                setCategory("all");
                setSelectedId(template.id);
              }}
            />
            <QuickActionsPanel onImport={importFile} onExport={exportSelected} onSaveNew={() => setModal({ mode: "saveNew" })} onCommunity={() => goToScope("community")} />
          </div>
        </div>

        <TemplateDetailPanel
          template={selected}
          applied={applied.has(selected.id)}
          favorite={favorites.has(selected.id)}
          testing={testing}
          onUse={() => applyTemplate(selected)}
          onBacktest={runBacktest}
          onEdit={() => setModal({ mode: "edit", template: selected })}
          onDuplicate={() => duplicate(selected)}
          onShare={share}
          onToggleFavorite={() =>
            setFavorites((current) => {
              const next = new Set(current);
              if (next.has(selected.id)) next.delete(selected.id);
              else next.add(selected.id);
              return next;
            })
          }
        />
      </div>

      {modal && (
        <TemplateModal
          key={`${modal.mode}-${modal.template?.id ?? selected.id}`}
          title={modalCopy[modal.mode].title}
          description={modalCopy[modal.mode].description}
          confirmLabel={modalCopy[modal.mode].confirm}
          initial={modalDraft()}
          onClose={() => setModal(null)}
          onConfirm={confirmModal}
        />
      )}

      <Toast message={toast} />
    </Shell>
  );
}
