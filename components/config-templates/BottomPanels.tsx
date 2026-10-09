"use client";
import { useRef } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { IconButton, PencilGlyph, TrashGlyph } from "../multi-account/MaPrimitives";
import { Panel } from "../risk-management/RiskFields";
import { archivedMineCount, type ConfigTemplate } from "../../lib/config-templates-demo";

const linkButton =
  "inline-flex h-8 items-center rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand active:scale-[.98]";

export function MyTemplatesPanel({
  templates,
  onSeeAll,
  onEdit,
  onDuplicate,
  onDelete,
  onSelect,
}: {
  templates: ConfigTemplate[];
  onSeeAll: () => void;
  onEdit: (template: ConfigTemplate) => void;
  onDuplicate: (template: ConfigTemplate) => void;
  onDelete: (template: ConfigTemplate) => void;
  onSelect: (template: ConfigTemplate) => void;
}) {
  return (
    <Panel
      title="Meus Templates"
      icon="fileText"
      className="min-w-0"
      action={
        <>
          <span className="tabular inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-surface-3 px-2 text-[12px] font-medium text-fg">{templates.length + archivedMineCount}</span>
          <button type="button" onClick={onSeeAll} className={linkButton}>
            Ver Todos
          </button>
        </>
      }
    >
      {templates.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line py-6 text-center text-[13px] text-fg-muted">Você ainda não criou templates.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-line text-fg-muted">
                <th scope="col" className="pb-2 pr-2 font-medium">Nome</th>
                <th scope="col" className="pb-2 pr-2 font-medium">Ativos</th>
                <th scope="col" className="pb-2 pr-2 font-medium">Tipo</th>
                <th scope="col" className="pb-2 pr-2 font-medium">Modificado</th>
                <th scope="col" className="pb-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="border-b border-line/60 last:border-0">
                  <td className="py-2 pr-2">
                    <button type="button" onClick={() => onSelect(template)} className="max-w-[120px] truncate text-left font-medium text-fg hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                      {template.name}
                    </button>
                  </td>
                  <td className="max-w-[90px] truncate py-2 pr-2 text-fg-muted">{template.assets.join(", ")}</td>
                  <td className="py-2 pr-2 text-fg-muted">{template.type}</td>
                  <td className="tabular py-2 pr-2 text-fg-muted">{template.modified}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      <IconButton label={`Editar ${template.name}`} onClick={() => onEdit(template)}>
                        <PencilGlyph size={13} />
                      </IconButton>
                      <IconButton label={`Duplicar ${template.name}`} onClick={() => onDuplicate(template)}>
                        <Icon name="copy" size={13} />
                      </IconButton>
                      <IconButton label={`Excluir ${template.name}`} tone="danger" onClick={() => onDelete(template)}>
                        <TrashGlyph size={13} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

const rankColors = ["bg-warning text-canvas", "bg-[#8b5cf6] text-white", "bg-[#f59e0b] text-canvas", "bg-brand-strong text-white", "bg-fg-subtle text-canvas"];

export function TopUsedPanel({ templates, onSeeAll, onSelect }: { templates: ConfigTemplate[]; onSeeAll: () => void; onSelect: (template: ConfigTemplate) => void }) {
  const top = [...templates].sort((a, b) => b.users - a.users).slice(0, 5);
  const max = top[0]?.users ?? 1;
  return (
    <Panel
      title="Templates Mais Utilizados"
      icon="trophy"
      className="min-w-0"
      action={
        <button type="button" onClick={onSeeAll} className={linkButton}>
          Ver Todos
        </button>
      }
    >
      <p className="mb-1 text-right text-[11px] text-fg-muted">Usuários</p>
      <ol className="space-y-2.5">
        {top.map((template, index) => (
          <li key={template.id}>
            <button type="button" onClick={() => onSelect(template)} className="flex w-full items-center gap-2.5 rounded-md text-left focus-visible:outline-2 focus-visible:outline-brand">
              <span className={cx("flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold", rankColors[index])}>{index + 1}</span>
              <span className="w-[116px] shrink-0 truncate text-[12px] text-fg">{template.name}</span>
              <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-3" role="presentation">
                <span className="block h-full rounded-full bg-gradient-to-r from-brand-strong to-brand" style={{ width: `${Math.max(8, (template.users / max) * 100)}%` }} />
              </span>
              <span className="tabular w-8 shrink-0 text-right text-[12px] text-fg-muted">{template.users}</span>
            </button>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

const quickButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12.5px] font-medium text-fg transition-colors hover:border-brand hover:bg-brand-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]";

export function QuickActionsPanel({
  onImport,
  onExport,
  onSaveNew,
  onCommunity,
}: {
  onImport: (file: File) => void;
  onExport: () => void;
  onSaveNew: () => void;
  onCommunity: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <Panel title="Ações Rápidas" icon="signal" className="min-w-0">
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => fileRef.current?.click()} className={quickButton}>
          <Icon name="download" size={15} />
          Importar Template
        </button>
        <button type="button" onClick={onExport} className={quickButton}>
          <Icon name="external" size={15} />
          Exportar Template
        </button>
        <button type="button" onClick={onSaveNew} className={quickButton}>
          <Icon name="save" size={15} />
          Salvar como Novo
        </button>
        <button type="button" onClick={onCommunity} className={quickButton}>
          <Icon name="accounts" size={15} />
          Templates da Comunidade
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        tabIndex={-1}
        aria-label="Importar template em JSON"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onImport(file);
          event.target.value = "";
        }}
      />
    </Panel>
  );
}
