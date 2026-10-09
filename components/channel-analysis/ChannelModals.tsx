"use client";
import { useId, useState } from "react";
import { fieldClass, ModalFrame, Switch } from "../multi-account/MaPrimitives";
import { SelectBox } from "../risk-management/RiskFields";

const cancelClass = "inline-flex h-10 items-center rounded-lg border border-line-strong bg-[#0a1b2b] px-4 text-[13px] font-medium text-fg hover:border-brand focus-visible:outline-2 focus-visible:outline-brand";
const confirmClass =
  "inline-flex h-10 items-center rounded-lg bg-brand-strong px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const periodOptions = [
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "180", label: "Últimos 180 dias" },
  { value: "all", label: "Todo o histórico" },
];

function SwitchRow({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-fg">{label}</p>
        {description && <p className="text-[12px] leading-4 text-fg-muted">{description}</p>}
      </div>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export function AddChannelModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (handle: string) => void }) {
  const [handle, setHandle] = useState("");
  const [period, setPeriod] = useState("90");
  const [includeCanceled, setIncludeCanceled] = useState(true);
  const [ocr, setOcr] = useState(true);
  const handleId = useId();
  const normalized = handle.trim().replace(/^https?:\/\/t\.me\//i, "").replace(/^@/, "");
  const valid = /^[A-Za-z0-9_]{4,32}$/.test(normalized);

  return (
    <ModalFrame
      title="Adicionar Canal para Análise"
      description="Informe o canal do Telegram. A análise é demonstrativa e não se conecta ao Telegram nesta etapa."
      onClose={onClose}
      size="sm"
      footer={
        <>
          <button type="button" onClick={onClose} className={cancelClass}>
            Cancelar
          </button>
          <button type="button" disabled={!valid} onClick={() => onConfirm(`@${normalized}`)} className={confirmClass}>
            Iniciar Análise
          </button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (valid) onConfirm(`@${normalized}`);
        }}
      >
        <div>
          <label htmlFor={handleId} className="mb-1.5 block text-[13px] text-fg-muted">
            Link ou @usuário do canal
          </label>
          <input id={handleId} autoFocus value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="@meucanal ou t.me/meucanal" className={fieldClass} aria-invalid={handle.length > 0 && !valid} />
          {handle.length > 0 && !valid && <p className="mt-1.5 text-[12px] text-danger">Use de 4 a 32 caracteres: letras, números ou sublinhado.</p>}
        </div>
        <div>
          <span className="mb-1.5 block text-[13px] text-fg-muted">Período de análise</span>
          <SelectBox label="Período de análise" value={period} options={periodOptions} onChange={setPeriod} />
        </div>
        <div className="divide-y divide-line rounded-lg border border-line bg-canvas/50 px-3">
          <SwitchRow label="Incluir sinais cancelados" checked={includeCanceled} onChange={setIncludeCanceled} />
          <SwitchRow label="Ler sinais em imagem (OCR)" checked={ocr} onChange={setOcr} />
        </div>
      </form>
    </ModalFrame>
  );
}

export function SettingsModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [countCanceled, setCountCanceled] = useState(true);
  const [ignoreEdited, setIgnoreEdited] = useState(false);
  const [timezone, setTimezone] = useState("brt");
  const [period, setPeriod] = useState("120");
  const [minScore, setMinScore] = useState("6");
  const scoreId = useId();

  return (
    <ModalFrame
      title="Configurações da Análise"
      description="Defina como os canais são avaliados e quando você deseja ser alertado."
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" onClick={onClose} className={cancelClass}>
            Cancelar
          </button>
          <button type="button" onClick={onSave} className={confirmClass}>
            Salvar Configurações
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="divide-y divide-line rounded-lg border border-line bg-canvas/50 px-3">
          <SwitchRow label="Atualizar análise automaticamente" description="Reprocessa o histórico dos canais a cada 24 horas." checked={autoRefresh} onChange={setAutoRefresh} />
          <SwitchRow label="Alertar quando o score cair" description="Notifica se um canal ficar abaixo do score mínimo." checked={alerts} onChange={setAlerts} />
          <SwitchRow label="Considerar sinais cancelados" description="Inclui cancelamentos no cálculo de qualidade." checked={countCanceled} onChange={setCountCanceled} />
          <SwitchRow label="Ignorar sinais editados" description="Desconsidera sinais alterados após a publicação." checked={ignoreEdited} onChange={setIgnoreEdited} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-[13px] text-fg-muted">Fuso horário</span>
            <SelectBox
              label="Fuso horário"
              value={timezone}
              onChange={setTimezone}
              options={[
                { value: "brt", label: "BRT (UTC-3)" },
                { value: "utc", label: "UTC" },
                { value: "est", label: "EST (UTC-5)" },
              ]}
            />
          </div>
          <div>
            <span className="mb-1.5 block text-[13px] text-fg-muted">Período padrão</span>
            <SelectBox
              label="Período padrão"
              value={period}
              onChange={setPeriod}
              options={[
                { value: "30", label: "Últimos 30 dias" },
                { value: "120", label: "Últimos 4 meses" },
                { value: "365", label: "Últimos 12 meses" },
              ]}
            />
          </div>
        </div>
        <div>
          <label htmlFor={scoreId} className="mb-1.5 block text-[13px] text-fg-muted">
            Score mínimo para alerta (1 a 10)
          </label>
          <input id={scoreId} type="number" min={1} max={10} step={0.1} value={minScore} onChange={(event) => setMinScore(event.target.value)} className={fieldClass} />
        </div>
      </div>
    </ModalFrame>
  );
}
