"use client";
import { useId, useState } from "react";
import { fieldClass, ModalFrame } from "../multi-account/MaPrimitives";
import { SelectBox } from "../risk-management/RiskFields";
import { typeOptions } from "../../lib/config-templates-demo";

export type TemplateDraft = { name: string; type: string; assets: string };

const types = typeOptions.filter((option) => option.value !== "all");

export default function TemplateModal({
  title,
  description,
  confirmLabel,
  initial,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  initial: TemplateDraft;
  onClose: () => void;
  onConfirm: (draft: TemplateDraft) => void;
}) {
  const [draft, setDraft] = useState(initial);
  const nameId = useId();
  const assetsId = useId();
  const valid = draft.name.trim().length > 0;

  return (
    <ModalFrame
      title={title}
      description={description}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <button type="button" onClick={onClose} className="inline-flex h-10 items-center rounded-lg border border-line-strong bg-[#0a1b2b] px-4 text-[13px] font-medium text-fg hover:border-brand focus-visible:outline-2 focus-visible:outline-brand">
            Cancelar
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => onConfirm(draft)}
            className="inline-flex h-10 items-center rounded-lg bg-brand-strong px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (valid) onConfirm(draft);
        }}
      >
        <div>
          <label htmlFor={nameId} className="mb-1.5 block text-[13px] text-fg-muted">
            Nome do template
          </label>
          <input id={nameId} autoFocus maxLength={60} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Ex.: Meu Scalping Gold" className={fieldClass} />
        </div>
        <div>
          <span className="mb-1.5 block text-[13px] text-fg-muted">Tipo</span>
          <SelectBox label="Tipo do template" value={draft.type} options={types} onChange={(value) => setDraft({ ...draft, type: value })} />
        </div>
        <div>
          <label htmlFor={assetsId} className="mb-1.5 block text-[13px] text-fg-muted">
            Ativos (separados por vírgula)
          </label>
          <input id={assetsId} value={draft.assets} onChange={(event) => setDraft({ ...draft, assets: event.target.value })} placeholder="XAUUSD, US100" className={fieldClass} />
        </div>
      </form>
    </ModalFrame>
  );
}
