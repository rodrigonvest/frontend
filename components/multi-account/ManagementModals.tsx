"use client";
import { useId, useState } from "react";
import { Icon } from "../Icons";
import { Button } from "../UI";
import type { AccountGroup, MultiAccount, MultiAccountSettings } from "../../lib/multi-account-demo";
import { IconButton, ModalFrame, NumberBox, Switch, TrashGlyph, fieldClass } from "./MaPrimitives";

export function GroupsModal({
  groups,
  accounts,
  focusGroupId,
  onSave,
  onClose,
}: {
  groups: AccountGroup[];
  accounts: MultiAccount[];
  focusGroupId?: string | null;
  onSave: (groups: AccountGroup[]) => void;
  onClose: () => void;
}) {
  const baseId = useId();
  const [draft, setDraft] = useState<AccountGroup[]>(() => structuredClone(groups));
  const [error, setError] = useState<string | null>(null);

  const update = (id: string, patch: Partial<AccountGroup>) => setDraft((current) => current.map((group) => (group.id === id ? { ...group, ...patch } : group)));

  const addGroup = () =>
    setDraft((current) => [
      ...current,
      { id: `grp-${Date.now()}`, name: `Grupo ${current.length + 1} - Novo grupo`, symbols: "Todos os símbolos", active: true, members: [] },
    ]);

  const save = () => {
    if (draft.some((group) => !group.name.trim())) {
      setError("Todos os grupos precisam de um nome.");
      return;
    }
    const unbalanced = draft.find((group) => group.members.length > 0 && Math.abs(group.members.reduce((sum, m) => sum + m.percent, 0) - 100) > 0.05);
    if (unbalanced) {
      setError(`A soma das alocações de "${unbalanced.name}" deve ser 100%.`);
      return;
    }
    onSave(draft.map((group) => ({ ...group, name: group.name.trim(), symbols: group.symbols.trim() || "Todos os símbolos" })));
  };

  return (
    <ModalFrame
      title="Gerenciar Grupos"
      description="Crie grupos, defina símbolos e a distribuição entre contas."
      size="lg"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={save}>
            Salvar grupos
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {draft.map((group) => {
          const total = group.members.reduce((sum, member) => sum + member.percent, 0);
          const available = accounts.filter((account) => !group.members.some((member) => member.accountId === account.id));
          return (
            <section
              key={group.id}
              aria-label={group.name}
              className={`rounded-lg border bg-canvas/50 p-3.5 ${focusGroupId === group.id ? "border-brand" : "border-line"}`}
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
                <div>
                  <label htmlFor={`${baseId}-${group.id}-name`} className="mb-1.5 block text-[12px] text-fg-muted">
                    Nome do grupo
                  </label>
                  <input id={`${baseId}-${group.id}-name`} value={group.name} onChange={(e) => update(group.id, { name: e.target.value })} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`${baseId}-${group.id}-sym`} className="mb-1.5 block text-[12px] text-fg-muted">
                    Símbolos
                  </label>
                  <input id={`${baseId}-${group.id}-sym`} value={group.symbols} onChange={(e) => update(group.id, { symbols: e.target.value })} className={fieldClass} />
                </div>
                <div className="flex items-center gap-2 pb-2">
                  <Switch checked={group.active} onChange={(next) => update(group.id, { active: next })} label={`Grupo ${group.name} ativo`} />
                  <span className="text-[12px] text-fg-muted">{group.active ? "Ativo" : "Inativo"}</span>
                </div>
                <div className="pb-0.5">
                  <IconButton label={`Excluir ${group.name}`} tone="danger" onClick={() => setDraft((current) => current.filter((item) => item.id !== group.id))}>
                    <TrashGlyph size={14} />
                  </IconButton>
                </div>
              </div>

              <ul className="mt-3 space-y-2">
                {group.members.map((member) => {
                  const account = accounts.find((item) => item.id === member.accountId);
                  if (!account) return null;
                  return (
                    <li key={member.accountId} className="flex items-center gap-3">
                      <span className="min-w-0 flex-1 truncate text-[13px] text-fg">{account.name}</span>
                      <NumberBox
                        label={`Alocação de ${account.name}`}
                        value={member.percent}
                        max={100}
                        suffix="%"
                        className="w-28"
                        onChange={(value) =>
                          update(group.id, { members: group.members.map((m) => (m.accountId === member.accountId ? { ...m, percent: value } : m)) })
                        }
                      />
                      <IconButton
                        label={`Remover ${account.name} do grupo`}
                        onClick={() => update(group.id, { members: group.members.filter((m) => m.accountId !== member.accountId) })}
                      >
                        <Icon name="x" size={14} />
                      </IconButton>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                {available.length > 0 ? (
                  <select
                    aria-label={`Adicionar conta ao grupo ${group.name}`}
                    value=""
                    onChange={(e) => e.target.value && update(group.id, { members: [...group.members, { accountId: e.target.value, percent: 0 }] })}
                    className={`${fieldClass} !h-9 max-w-[240px]`}
                  >
                    <option value="">+ Adicionar conta</option>
                    {available.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span />
                )}
                <span className={`tabular text-[12px] ${group.members.length > 0 && Math.abs(total - 100) > 0.05 ? "text-danger" : "text-fg-subtle"}`}>
                  Total: {Number(total.toFixed(1))}%
                </span>
              </div>
            </section>
          );
        })}
        <button
          type="button"
          onClick={addGroup}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong text-[13px] text-fg-muted transition-colors hover:border-brand hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Icon name="plus" size={15} />
          Novo grupo
        </button>
        {error && (
          <p role="alert" className="text-[13px] text-danger">
            {error}
          </p>
        )}
      </div>
    </ModalFrame>
  );
}

function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-line bg-canvas/50 px-3.5 py-3">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-fg">{title}</div>
        <div className="text-[12px] leading-5 text-fg-subtle">{description}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsModal({
  settings,
  onSave,
  onClose,
}: {
  settings: MultiAccountSettings;
  onSave: (settings: MultiAccountSettings) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(settings);
  const patch = (value: Partial<MultiAccountSettings>) => setDraft((current) => ({ ...current, ...value }));
  const selectId = useId();

  return (
    <ModalFrame
      title="Configurações Gerais"
      description="Regras globais aplicadas a todas as contas do Multi-Conta Avançado."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => onSave(draft)}>
            Salvar configurações
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <SettingRow title="Sincronização automática" description="Replica novas operações em todas as contas ativas.">
          <Switch checked={draft.autoSync} onChange={(next) => patch({ autoSync: next })} label="Sincronização automática" />
        </SettingRow>
        <SettingRow title="Limite de risco total" description="Bloqueia novas ordens ao atingir este percentual.">
          <NumberBox label="Limite de risco total" value={draft.riskLimit} min={1} max={100} suffix="%" className="w-28" onChange={(v) => patch({ riskLimit: v })} />
        </SettingRow>
        <SettingRow title="Perda máxima diária" description="Pausa as contas ao atingir o limite diário.">
          <NumberBox label="Perda máxima diária" value={draft.dailyLossLimit} min={0.1} max={100} suffix="%" className="w-28" onChange={(v) => patch({ dailyLossLimit: v })} />
        </SettingRow>
        <SettingRow title="Modo de execução" description="Ordem em que as contas recebem as operações.">
          <select
            id={selectId}
            aria-label="Modo de execução"
            value={draft.executionMode}
            onChange={(e) => patch({ executionMode: e.target.value as MultiAccountSettings["executionMode"] })}
            className={`${fieldClass} !h-9 w-36`}
          >
            <option value="Simultânea">Simultânea</option>
            <option value="Sequencial">Sequencial</option>
          </select>
        </SettingRow>
        <SettingRow title="Notificar falhas de sincronização" description="Envia alerta quando uma conta não replicar a ordem.">
          <Switch checked={draft.notifyFailures} onChange={(next) => patch({ notifyFailures: next })} label="Notificar falhas" />
        </SettingRow>
        <SettingRow title="Fechar posições ao atingir o limite" description="Encerra posições abertas quando o limite diário for atingido.">
          <Switch checked={draft.closeOnLimit} onChange={(next) => patch({ closeOnLimit: next })} label="Fechar posições no limite" />
        </SettingRow>
      </div>
    </ModalFrame>
  );
}
