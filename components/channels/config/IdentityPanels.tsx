"use client";
import { useId, useState } from "react";
import { Icon } from "../../Icons";
import { Badge, Button, cx } from "../../UI";
import { LANGUAGES, SYMBOLS, TIMEZONES, withCurrentOption, type ConfigPanelProps } from "../../../lib/channel-config";
import { Field, FieldRow, Panel, SelectInput, TextInput, ToggleLabel, controlClass, toOptions } from "./fields";

const statusBadge = {
  connected: { tone: "green", label: "Conectado" },
  paused: { tone: "amber", label: "Pausado" },
  disconnected: { tone: "red", label: "Desconectado" },
} as const;

export function ChannelInfoPanel({ channel, config, update }: ConfigPanelProps) {
  const uid = useId();
  const status = statusBadge[channel.status];
  return (
    <Panel
      title="Informações do Canal"
      badge={
        <Badge tone={status.tone} className="gap-1.5 px-2.5 py-1 text-xs">
          <Icon name={channel.status === "connected" ? "check" : "info"} size={13} stroke={2.4} />
          {status.label}
        </Badge>
      }
    >
      <div className="flex flex-col gap-3">
        <Field label="Nome do Canal" htmlFor={`${uid}-name`}>
          <TextInput id={`${uid}-name`} value={config.name} onChange={(name) => update({ name })} />
        </Field>
        <Field label="Username/Link" htmlFor={`${uid}-user`}>
          <TextInput id={`${uid}-user`} value={config.username} onChange={(username) => update({ username })} />
        </Field>
        <Field label="Descrição" htmlFor={`${uid}-desc`}>
          <textarea
            id={`${uid}-desc`}
            rows={2}
            value={config.description}
            onChange={(e) => update({ description: e.target.value })}
            className={cx(controlClass, "h-[58px] resize-none py-2 leading-5")}
          />
        </Field>
      </div>
    </Panel>
  );
}

export function GeneralSettingsPanel({ config, update }: ConfigPanelProps) {
  const uid = useId();
  return (
    <Panel title="Configurações Gerais">
      <div className="flex flex-col gap-4">
        <FieldRow label="Status do Canal">
          <ToggleLabel checked={config.active} onChange={(active) => update({ active })} label="Status do canal" text={config.active ? "Ativo" : "Inativo"} />
        </FieldRow>
        <FieldRow label="Canal Principal">
          <ToggleLabel checked={config.primary} onChange={(primary) => update({ primary })} label="Definir como canal principal" text="Definir como canal principal" tone="blue" />
        </FieldRow>
        <FieldRow label="Fuso Horário" htmlFor={`${uid}-tz`}>
          <SelectInput id={`${uid}-tz`} value={config.timezone} onChange={(timezone) => update({ timezone })} options={withCurrentOption(TIMEZONES, config.timezone)} />
        </FieldRow>
        <FieldRow label="Idioma dos Sinais" htmlFor={`${uid}-lang`}>
          <SelectInput id={`${uid}-lang`} value={config.language} onChange={(language) => update({ language })} options={withCurrentOption(LANGUAGES, config.language)} />
        </FieldRow>
      </div>
    </Panel>
  );
}

export function DefaultSymbolPanel({ config, update }: ConfigPanelProps) {
  const uid = useId();
  const [draft, setDraft] = useState("US30");

  const setTarget = (id: string, to: string) => update({ symbolMap: config.symbolMap.map((m) => (m.id === id ? { ...m, to } : m)) });
  const remove = (id: string) => update({ symbolMap: config.symbolMap.filter((m) => m.id !== id) });
  const add = () => {
    const from = draft.trim().toUpperCase();
    if (!from || config.symbolMap.some((m) => m.from === from)) return;
    update({ symbolMap: [...config.symbolMap, { id: `map-${from.toLowerCase()}-${config.symbolMap.length}`, from, to: config.mainSymbol, custom: true }] });
    setDraft("");
  };

  return (
    <Panel title="Símbolo Padrão">
      <div className="flex flex-col gap-3">
        <FieldRow label="Símbolo Principal" htmlFor={`${uid}-main`}>
          <SelectInput id={`${uid}-main`} value={config.mainSymbol} onChange={(mainSymbol) => update({ mainSymbol })} options={withCurrentOption(toOptions(SYMBOLS), config.mainSymbol, "Selecione")} />
        </FieldRow>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-[13px] text-fg-muted">
            Mapa de Símbolos (opcional)
            <span title="Converte o símbolo recebido no sinal para o símbolo negociado na corretora." className="text-fg-subtle">
              <Icon name="info" size={14} />
            </span>
          </p>
          <ul aria-label="Mapa de símbolos" className="flex flex-col gap-2">
            {config.symbolMap.map((m) => (
              <li key={m.id} className="grid grid-cols-[minmax(0,0.8fr)_16px_minmax(0,1.5fr)] items-center gap-2 pl-2">
                <span className="truncate text-[13px] text-fg">{m.from}</span>
                <span aria-hidden className="text-fg-muted">
                  <Icon name="arrowRight" size={15} />
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="min-w-0 flex-1">
                    <SelectInput value={m.to} onChange={(to) => setTarget(m.id, to)} options={withCurrentOption(toOptions(SYMBOLS), m.to)} label={`Símbolo de destino para ${m.from}`} />
                  </div>
                  {m.custom && (
                    <button type="button" aria-label={`Remover mapeamento ${m.from}`} onClick={() => remove(m.id)} className="flex size-7 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-white/[.06] hover:text-fg">
                      <Icon name="x" size={14} />
                    </button>
                  )}
                </div>
              </li>
            ))}
            <li className="grid grid-cols-[minmax(0,0.8fr)_16px_minmax(0,1.5fr)] items-center gap-2">
              <input
                aria-label="Novo símbolo de origem"
                value={draft}
                placeholder="Símbolo"
                onChange={(e) => setDraft(e.target.value.toUpperCase().replace(/[^A-Z0-9._]/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && add()}
                className="h-[34px] min-w-0 rounded-md border border-transparent bg-transparent px-2 text-[13px] text-fg outline-none placeholder:text-fg-subtle hover:border-line-strong/50 focus-visible:border-brand"
              />
              <span aria-hidden className="text-fg-muted">
                <Icon name="arrowRight" size={15} />
              </span>
              <Button variant="primary" onClick={add} className="h-[34px] w-full gap-1.5 whitespace-nowrap rounded-md px-2 text-[12.5px]">
                <Icon name="plus" size={14} stroke={2.2} />
                Adicionar Mapeamento
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </Panel>
  );
}
