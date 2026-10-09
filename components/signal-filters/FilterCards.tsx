"use client";
import { useId, useState, type Dispatch, type SetStateAction } from "react";
import { cx } from "../UI";
import { IconButton, NumberBox, Switch, TrashGlyph } from "../multi-account/MaPrimitives";
import { FieldRow, Panel, SelectBox, TextBox, ToggleRow } from "../risk-management/RiskFields";
import { CheckField, ChipSelect, FieldLabel, TextArea } from "./FilterFields";
import {
  channelOptions,
  hoursOptions,
  minTpsOptions,
  symbolOptions,
  weekdayLabels,
  type SignalFiltersConfig,
} from "../../lib/signal-filters-demo";

export type CardProps = { config: SignalFiltersConfig; onChange: Dispatch<SetStateAction<SignalFiltersConfig>> };

const usePatch = (onChange: CardProps["onChange"]) => (partial: Partial<SignalFiltersConfig>) => onChange((current) => ({ ...current, ...partial }));

const numberControl = "w-[112px]";

export function AssetCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  const [bothSelected, setBothSelected] = useState(false);
  const both = bothSelected && config.buy && config.sell;
  return (
    <Panel title="1. Ativo e Direção" icon="chart">
      <FieldLabel>Símbolos permitidos</FieldLabel>
      <ChipSelect label="símbolo" values={config.symbols} options={symbolOptions} onChange={(symbols) => patch({ symbols })} />
      <div className="mt-4">
        <FieldLabel>Direção do sinal</FieldLabel>
        <div role="group" aria-label="Direção do sinal" className="flex flex-wrap gap-x-5 gap-y-2">
          <CheckField label="Buy" tone="buy" checked={config.buy} onChange={(checked) => { if (checked || config.sell) { setBothSelected(false); patch({ buy: checked }); } }} />
          <CheckField label="Sell" tone="sell" checked={config.sell} onChange={(checked) => { if (checked || config.buy) { setBothSelected(false); patch({ sell: checked }); } }} />
          <CheckField label="Ambos" checked={both} onChange={(checked) => { setBothSelected(checked); patch(checked ? { buy: true, sell: true } : { buy: true, sell: false }); }} />
        </div>
      </div>
    </Panel>
  );
}

export function EntryCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="2. Entrada, SL e TP" icon="target">
      <div className="divide-y divide-line/30">
        <FieldRow label="Distância máxima da entrada" help="Distância máxima entre o preço atual e a entrada. Use 0 para desativar." controlClass={numberControl}>
          <NumberBox label="Distância máxima da entrada" suffix="pips" decimals={1} value={config.maxEntryDistance} onChange={(v) => patch({ maxEntryDistance: v })} />
        </FieldRow>
        <FieldRow label="Stop Loss mínimo" help="Sinais com SL menor são filtrados." controlClass={numberControl}>
          <NumberBox label="Stop Loss mínimo" suffix="pips" value={config.minSl} onChange={(v) => patch({ minSl: v })} />
        </FieldRow>
        <FieldRow label="Stop Loss máximo" help="Sinais com SL maior são filtrados." controlClass={numberControl}>
          <NumberBox label="Stop Loss máximo" suffix="pips" value={config.maxSl} onChange={(v) => patch({ maxSl: v })} />
        </FieldRow>
        <FieldRow label="Take Profit mínimo (TP1)" help="TP1 mínimo exigido, em pips." controlClass={numberControl}>
          <NumberBox label="Take Profit mínimo (TP1)" suffix="pips" value={config.minTp1} onChange={(v) => patch({ minTp1: v })} />
        </FieldRow>
        <FieldRow label="Risco/Retorno mínimo (1:x)" help="Relação mínima entre TP1 e SL." controlClass={numberControl}>
          <NumberBox label="Risco/Retorno mínimo" decimals={1} value={config.minRr} onChange={(v) => patch({ minRr: v })} />
        </FieldRow>
      </div>
    </Panel>
  );
}

export function MarketCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="3. Mercado e Execução" icon="settings">
      <div className="divide-y divide-line/30">
        <FieldRow label="Spread máximo" help="Sinais com spread acima deste valor são filtrados. Use 0 para desativar." controlClass={numberControl}>
          <NumberBox label="Spread máximo" suffix="pips" decimals={2} value={config.maxSpread} onChange={(v) => patch({ maxSpread: v })} />
        </FieldRow>
        <FieldRow label="Volatilidade máxima (ATR)" help="ATR acima deste valor bloqueia o sinal." controlClass={numberControl}>
          <NumberBox label="Volatilidade máxima (ATR)" suffix="pips" decimals={2} value={config.maxAtr} onChange={(v) => patch({ maxAtr: v })} />
        </FieldRow>
        <FieldRow label="Horário permitido (BRT)" help="Janela diária em que sinais são aceitos." controlClass="w-[132px]">
          <SelectBox label="Horário permitido" value={config.hours} options={hoursOptions} onChange={(hours) => patch({ hours })} />
        </FieldRow>
        <ToggleRow label="Evitar notícias de alto impacto" checked={config.avoidNews} onChange={(avoidNews) => patch({ avoidNews })} />
        <ToggleRow label="Evitar gaps" checked={config.avoidGaps} onChange={(avoidGaps) => patch({ avoidGaps })} />
        <ToggleRow label="Apenas em tendência (EMA)" checked={config.emaTrendOnly} onChange={(emaTrendOnly) => patch({ emaTrendOnly })} />
      </div>
    </Panel>
  );
}

export function ChannelCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="4. Filtros por Canal" icon="send">
      <FieldLabel>Canais incluídos</FieldLabel>
      <ChipSelect
        label="canal incluído"
        values={config.includedChannels}
        options={channelOptions.filter((channel) => !config.excludedChannels.includes(channel))}
        onChange={(includedChannels) => patch({ includedChannels })}
      />
      <div className="mt-3">
        <FieldLabel>Canais excluídos</FieldLabel>
        <ChipSelect
          label="canal excluído"
          tone="danger"
          values={config.excludedChannels}
          options={channelOptions.filter((channel) => !config.includedChannels.includes(channel))}
          onChange={(excludedChannels) => patch({ excludedChannels })}
        />
      </div>
      <div className="mt-2 divide-y divide-line/30">
        <ToggleRow label="Considerar apenas sinais do admin" checked={config.adminOnly} onChange={(adminOnly) => patch({ adminOnly })} />
        <FieldRow label="Mínimo de confiança do canal" help="Sinais com confiança menor são filtrados." controlClass="w-[88px]">
          <NumberBox label="Mínimo de confiança do canal" suffix="%" max={100} value={config.minConfidence} onChange={(v) => patch({ minConfidence: Math.round(v) })} />
        </FieldRow>
        <ToggleRow
          label="Filtrar canais por desempenho"
          help="Bloqueia canais com taxa de acerto abaixo de 60%."
          checked={config.filterByPerformance}
          onChange={(filterByPerformance) => patch({ filterByPerformance })}
        />
      </div>
    </Panel>
  );
}

export function QualityCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="5. Qualidade e Conteúdo" icon="fileText">
      <div className="divide-y divide-line/30">
        <ToggleRow label="Apenas sinais com SL e TP" checked={config.requireSlTp} onChange={(requireSlTp) => patch({ requireSlTp })} />
        <ToggleRow label="Apenas sinais com imagem" checked={config.requireImage} onChange={(requireImage) => patch({ requireImage })} />
        <FieldRow label="Mínimo de TPs informados" controlClass="w-[72px]">
          <SelectBox label="Mínimo de TPs informados" value={String(config.minTps)} options={minTpsOptions} onChange={(v) => patch({ minTps: Number(v) })} />
        </FieldRow>
        <ToggleRow label="Ignorar sinais editados" checked={config.ignoreEdited} onChange={(ignoreEdited) => patch({ ignoreEdited })} />
        <ToggleRow label="Excluir sinais cancelados" checked={config.excludeCancelled} onChange={(excludeCancelled) => patch({ excludeCancelled })} />
        <FieldRow label="Tamanho mínimo da mensagem (caracteres)" controlClass="w-[72px]">
          <NumberBox label="Tamanho mínimo da mensagem" value={config.minChars} onChange={(v) => patch({ minChars: Math.round(v) })} />
        </FieldRow>
      </div>
    </Panel>
  );
}

export function KeywordsCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="6. Palavras-chave" icon="message">
      <FieldLabel>Incluir palavras (uma por linha)</FieldLabel>
      <TextArea label="Incluir palavras" value={config.includeKeywords} onChange={(includeKeywords) => patch({ includeKeywords })} rows={5} />
      <div className="mt-3">
        <FieldLabel>Excluir palavras (uma por linha)</FieldLabel>
        <TextArea label="Excluir palavras" value={config.excludeKeywords} onChange={(excludeKeywords) => patch({ excludeKeywords })} rows={4} />
      </div>
    </Panel>
  );
}

export function KeywordOptionsCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="Opções de Correspondência" icon="filter">
      <p className="-mt-1 mb-2 text-[13px] leading-5 text-fg-muted">
        O sinal precisa conter ao menos uma palavra de inclusão e nenhuma de exclusão. A busca ignora maiúsculas e minúsculas.
      </p>
      <ToggleRow
        label="Correspondência de palavra inteira"
        help="Ex.: &quot;TP&quot; não casa com &quot;STOP&quot;."
        checked={config.wholeWord}
        onChange={(wholeWord) => patch({ wholeWord })}
      />
    </Panel>
  );
}

export function DuplicatesCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  return (
    <Panel title="Duplicidade e Respostas" icon="layers">
      <div className="divide-y divide-line/30">
        <ToggleRow label="Bloquear sinais duplicados" help="Ignora sinais idênticos recebidos em sequência." checked={config.blockDuplicates} onChange={(blockDuplicates) => patch({ blockDuplicates })} />
        <ToggleRow label="Ignorar mensagens de resposta" help="Ignora respostas a outros sinais do canal." checked={config.ignoreReplies} onChange={(ignoreReplies) => patch({ ignoreReplies })} />
      </div>
    </Panel>
  );
}

export function ScheduleCard({ config, onChange }: CardProps) {
  const patch = usePatch(onChange);
  const { days, sessions } = config;
  return (
    <Panel title="Dias e Sessões" icon="clock">
      <FieldRow label="Horário permitido (BRT)" controlClass="w-[132px]">
        <SelectBox label="Horário permitido" value={config.hours} options={hoursOptions} onChange={(hours) => patch({ hours })} />
      </FieldRow>
      <FieldLabel>Dias da semana</FieldLabel>
      <div role="group" aria-label="Dias da semana" className="flex flex-wrap gap-1.5">
        {weekdayLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={days[index]}
            onClick={() => patch({ days: days.map((value, i) => (i === index ? !value : value)) })}
            className={cx(
              "h-9 min-w-11 rounded-md border px-2.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              days[index] ? "border-brand-strong bg-brand-strong/20 text-fg" : "border-line bg-canvas text-fg-muted hover:border-line-strong",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-2 divide-y divide-line/30 border-t border-line/40 pt-1">
        <ToggleRow label="Sessão de Londres" checked={sessions.london} onChange={(v) => patch({ sessions: { ...sessions, london: v } })} />
        <ToggleRow label="Sessão de Nova York" checked={sessions.newYork} onChange={(v) => patch({ sessions: { ...sessions, newYork: v } })} />
        <ToggleRow label="Sessão da Ásia" checked={sessions.asia} onChange={(v) => patch({ sessions: { ...sessions, asia: v } })} />
      </div>
    </Panel>
  );
}

export function ChannelListCard({ config, onChange }: CardProps) {
  const setMode = (channel: string, mode: "include" | "exclude" | "neutral") =>
    onChange((current) => ({
      ...current,
      includedChannels: [...current.includedChannels.filter((item) => item !== channel), ...(mode === "include" ? [channel] : [])],
      excludedChannels: [...current.excludedChannels.filter((item) => item !== channel), ...(mode === "exclude" ? [channel] : [])],
    }));
  const modes = [
    { id: "include", label: "Incluir" },
    { id: "exclude", label: "Excluir" },
    { id: "neutral", label: "Neutro" },
  ] as const;

  return (
    <Panel title="Canais Conectados" icon="telegram">
      <ul className="divide-y divide-line/30">
        {channelOptions.map((channel) => {
          const current = config.includedChannels.includes(channel) ? "include" : config.excludedChannels.includes(channel) ? "exclude" : "neutral";
          return (
            <li key={channel} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span className="min-w-0 truncate text-[13px] font-medium text-fg">{channel}</span>
              <div role="group" aria-label={`Modo do canal ${channel}`} className="flex gap-1">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={current === mode.id}
                    onClick={() => setMode(channel, mode.id)}
                    className={cx(
                      "h-7 rounded-md border px-2.5 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                      current === mode.id
                        ? mode.id === "exclude"
                          ? "border-danger/60 bg-danger/15 text-danger"
                          : mode.id === "include"
                            ? "border-success/60 bg-success/15 text-success"
                            : "border-line-strong bg-surface-3 text-fg"
                        : "border-line bg-canvas text-fg-muted hover:border-line-strong",
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function CustomRulesCard({ config, onChange, className }: CardProps & { className?: string }) {
  const formId = useId();
  const [name, setName] = useState("");

  const addRule = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onChange((current) => ({
      ...current,
      customRules: [...current.customRules, { id: `r${Date.now()}`, name: trimmed, description: "Regra personalizada criada pelo usuário.", enabled: true }],
    }));
    setName("");
  };

  return (
    <Panel title="Regras Personalizadas" icon="clipboard" className={className}>
      <p className="-mt-1 mb-3 text-[13px] leading-5 text-fg-muted">Crie regras extras para situações específicas. As regras ativas entram no resumo da configuração.</p>
      {config.customRules.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line py-6 text-center text-[13px] text-fg-muted">Nenhuma regra personalizada criada.</p>
      ) : (
        <ul className="divide-y divide-line/30">
          {config.customRules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-fg">{rule.name}</div>
                <div className="truncate text-[12px] text-fg-muted">{rule.description}</div>
              </div>
              <Switch
                label={rule.name}
                checked={rule.enabled}
                onChange={(enabled) => onChange((current) => ({ ...current, customRules: current.customRules.map((item) => (item.id === rule.id ? { ...item, enabled } : item)) }))}
              />
              <IconButton
                label={`Excluir regra ${rule.name}`}
                tone="danger"
                onClick={() => onChange((current) => ({ ...current, customRules: current.customRules.filter((item) => item.id !== rule.id) }))}
              >
                <TrashGlyph />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          addRule();
        }}
        className="mt-3 flex gap-2"
      >
        <div className="min-w-0 flex-1">
          <TextBox label="Nome da nova regra" placeholder="Nome da nova regra" value={name} onChange={setName} />
        </div>
        <button
          type="submit"
          disabled={!name.trim()}
          className="h-9 shrink-0 rounded-md bg-brand-strong px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Adicionar regra
        </button>
      </form>
    </Panel>
  );
}
