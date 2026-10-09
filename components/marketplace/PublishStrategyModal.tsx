"use client";
import { useState } from "react";
import { Notice } from "../UI";
import { moreAssets, publishTypes, quickAssets } from "../../lib/marketplace-data";
import { MpModal } from "./MpModal";
import { MpSelect } from "./MpPrimitives";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-line-strong bg-canvas/70 px-3 text-[13px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-brand";

function Field({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[12.5px] font-medium text-fg-muted">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-[12px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function PublishStrategyModal({ onClose, onPublish }: { onClose: () => void; onPublish: (name: string) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState(publishTypes[0]);
  const [asset, setAsset] = useState("XAUUSD");
  const [platform, setPlatform] = useState("MetaTrader 5");
  const [model, setModel] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const assets = [...quickAssets.filter((item) => item !== "Todos"), ...moreAssets];
  const errors = {
    name: name.trim().length < 3 ? "Informe um nome com ao menos 3 caracteres." : "",
    price: model === "paid" && !(Number(price) > 0) ? "Informe um valor mensal maior que zero." : "",
    description: description.trim().length < 20 ? "Descreva a estratégia com ao menos 20 caracteres." : "",
    confirmed: confirmed ? "" : "Confirme a veracidade dos resultados para continuar.",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!hasErrors) onPublish(name.trim());
  };

  return (
    <MpModal
      titleId="mp-publish-title"
      title="Publicar Estratégia"
      subtitle="Compartilhe sua estratégia com a comunidade Copytrix."
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line-strong px-4 text-[13px] font-medium text-fg hover:border-brand/60 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-brand"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="mp-publish-form"
            className="h-10 rounded-lg bg-brand-strong px-5 text-[13px] font-semibold text-white hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Publicar
          </button>
        </>
      }
    >
      <form id="mp-publish-form" onSubmit={submit} noValidate className="flex flex-col gap-4">
        <Field label="Nome da estratégia" htmlFor="mp-pub-name" error={submitted ? errors.name : ""}>
          <input id="mp-pub-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Scalping Londres EURUSD" className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Tipo de estratégia" htmlFor="mp-pub-type">
            <MpSelect id="mp-pub-type" className="mt-1.5" value={type} onChange={(event) => setType(event.target.value)}>
              {publishTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </MpSelect>
          </Field>
          <Field label="Ativo principal" htmlFor="mp-pub-asset">
            <MpSelect id="mp-pub-asset" className="mt-1.5" value={asset} onChange={(event) => setAsset(event.target.value)}>
              {assets.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </MpSelect>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Plataforma" htmlFor="mp-pub-platform">
            <MpSelect id="mp-pub-platform" className="mt-1.5" value={platform} onChange={(event) => setPlatform(event.target.value)}>
              <option>MetaTrader 5</option>
              <option>MetaTrader 4</option>
              <option>Binance Futures</option>
            </MpSelect>
          </Field>
          <Field label="Modelo de acesso" htmlFor="mp-pub-model">
            <MpSelect id="mp-pub-model" className="mt-1.5" value={model} onChange={(event) => setModel(event.target.value as "free" | "paid")}>
              <option value="free">Gratuita</option>
              <option value="paid">Paga (mensal)</option>
            </MpSelect>
          </Field>
        </div>

        {model === "paid" && (
          <Field label="Valor mensal (R$)" htmlFor="mp-pub-price" error={submitted ? errors.price : ""}>
            <input id="mp-pub-price" type="number" min="1" inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Ex.: 97" className={inputClass} />
          </Field>
        )}

        <Field label="Descrição" htmlFor="mp-pub-desc" error={submitted ? errors.description : ""}>
          <textarea
            id="mp-pub-desc"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Explique a lógica, os horários e o perfil de risco da estratégia."
            className="mt-1.5 w-full resize-y rounded-lg border border-line-strong bg-canvas/70 px-3 py-2.5 text-[13px] leading-5 text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-brand"
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-5 text-fg-muted">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-0.5 size-4 cursor-pointer accent-brand" />
            Confirmo que os resultados informados são reais e que tenho autorização para compartilhar esta estratégia.
          </label>
          {submitted && errors.confirmed && (
            <p role="alert" className="mt-1 text-[12px] text-danger">
              {errors.confirmed}
            </p>
          )}
        </div>

        <Notice tone="warning">Formulário demonstrativo: nenhuma estratégia é publicada de verdade e nenhum dado é enviado.</Notice>
      </form>
    </MpModal>
  );
}
