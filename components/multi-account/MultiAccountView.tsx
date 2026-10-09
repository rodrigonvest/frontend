"use client";
import { useEffect, useId, useState } from "react";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { cx } from "../UI";
import {
  accountTemplates,
  initialAccounts,
  initialGroups,
  initialLots,
  initialSettings,
  type AccountGroup,
  type MultiAccount,
  type MultiAccountSettings,
} from "../../lib/multi-account-demo";
import MultiAccountHeader from "./MultiAccountHeader";
import MultiAccountKpis from "./MultiAccountKpis";
import AccountsTable from "./AccountsTable";
import LotDistribution from "./LotDistribution";
import GroupAllocation from "./GroupAllocation";
import SymbolExposure from "./SymbolExposure";
import { AccountFormModal, AccountStatsModal, ConfirmModal } from "./AccountModals";
import { GroupsModal, SettingsModal } from "./ManagementModals";
import { HistoryPanel, ReportsPanel, RiskAllocationPanel, SyncPanel } from "./MultiAccountTabPanels";
import { Toast, type MenuItem } from "./MaPrimitives";

type TabId = "accounts" | "groups" | "risk" | "sync" | "history" | "reports";

type ModalState =
  | { kind: "account"; account: MultiAccount | null }
  | { kind: "stats"; account: MultiAccount }
  | { kind: "groups"; focusId: string | null }
  | { kind: "settings" }
  | { kind: "confirm"; title: string; message: string; onConfirm: () => void }
  | null;

export default function MultiAccountView() {
  const baseId = useId();
  const [tab, setTab] = useState<TabId>("accounts");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [groups, setGroups] = useState(initialGroups);
  const [lots, setLots] = useState(initialLots);
  const [settings, setSettings] = useState(initialSettings);
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const closeModal = () => setModal(null);
  const activeCount = accounts.filter((account) => account.active).length;

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "accounts", label: `Contas (${accounts.length})`, icon: "accounts" },
    { id: "groups", label: `Grupos (${groups.length})`, icon: "layers" },
    { id: "risk", label: "Alocação de Risco", icon: "target" },
    { id: "sync", label: "Sincronização", icon: "refresh" },
    { id: "history", label: "Histórico", icon: "clock" },
    { id: "reports", label: "Relatórios", icon: "fileText" },
  ];

  const patchAccount = (id: string, patch: Partial<MultiAccount>) =>
    setAccounts((current) => current.map((account) => (account.id === id ? { ...account, ...patch } : account)));

  const setActive = (id: string, active: boolean) => {
    patchAccount(id, { active });
    const name = accounts.find((account) => account.id === id)?.name;
    setToast(`${name} ${active ? "ativada" : "desativada"}.`);
  };

  const saveAccount = (account: MultiAccount) => {
    const exists = accounts.some((item) => item.id === account.id);
    setAccounts((current) => (exists ? current.map((item) => (item.id === account.id ? account : item)) : [...current, account]));
    setModal(null);
    setToast(exists ? `${account.name} atualizada.` : `${account.name} adicionada.`);
  };

  const duplicateAccount = (account: MultiAccount) => {
    const copy: MultiAccount = {
      ...account,
      id: `acc-${Date.now()}`,
      name: `${account.name} (cópia)`,
      number: `${account.number}-C`,
      active: false,
      equity: account.balance,
      pnlToday: 0,
      pnlTodayPct: 0,
      pnlTotal: 0,
      pnlTotalPct: 0,
      trades: 0,
    };
    setAccounts((current) => {
      const index = current.findIndex((item) => item.id === account.id);
      return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)];
    });
    setToast(`Configuração de ${account.name} duplicada (conta criada como inativa).`);
  };

  const removeAccounts = (ids: string[]) => {
    setAccounts((current) => current.filter((account) => !ids.includes(account.id)));
    setGroups((current) => current.map((group) => ({ ...group, members: group.members.filter((member) => !ids.includes(member.accountId)) })));
    setLots((current) => current.filter((lot) => !ids.includes(lot.accountId)));
    setSelected((current) => current.filter((id) => !ids.includes(id)));
    setModal(null);
    setToast(ids.length === 1 ? "Conta excluída." : `${ids.length} contas excluídas.`);
  };

  const confirmDeleteAccounts = (ids: string[], label: string) =>
    setModal({
      kind: "confirm",
      title: ids.length === 1 ? "Excluir conta" : "Excluir contas",
      message: `Tem certeza de que deseja excluir ${label}? A conta também será removida dos grupos e da distribuição de lotes.`,
      onConfirm: () => removeAccounts(ids),
    });

  const confirmDeleteGroup = (group: AccountGroup) =>
    setModal({
      kind: "confirm",
      title: "Excluir grupo",
      message: `Tem certeza de que deseja excluir "${group.name}"? As contas não serão removidas.`,
      onConfirm: () => {
        setGroups((current) => current.filter((item) => item.id !== group.id));
        setModal(null);
        setToast("Grupo excluído.");
      },
    });

  const bulkActive = (active: boolean) => {
    setAccounts((current) => current.map((account) => (selected.includes(account.id) ? { ...account, active } : account)));
    setToast(`${selected.length} ${selected.length === 1 ? "conta" : "contas"} ${active ? "ativadas" : "desativadas"}.`);
  };

  const applyTemplate = (label: string, risk: number, only?: (account: MultiAccount) => boolean) => {
    setAccounts((current) => current.map((account) => (!only || only(account) ? { ...account, risk } : account)));
    setToast(`Template aplicado: ${label}.`);
  };

  const templateItems: MenuItem[] = [
    ...accountTemplates.map((template) => ({
      label: template.label,
      icon: <Icon name="shield" size={15} />,
      onSelect: () => applyTemplate(template.label, template.risk),
    })),
    {
      label: "Prop Firms (0.8% nas contas prop)",
      icon: <Icon name="target" size={15} />,
      onSelect: () => applyTemplate("Prop Firms", 0.8, (account) => account.name.startsWith("Prop Firm")),
    },
    {
      label: "Salvar configuração atual como template",
      icon: <Icon name="save" size={15} />,
      separatorBefore: true,
      onSelect: () => setToast("Configuração atual salva como novo template."),
    },
  ];

  const setLotValue = (accountId: string, key: "percent" | "fixedLot", value: number) =>
    setLots((current) => current.map((lot) => (lot.accountId === accountId ? { ...lot, [key]: value } : lot)));

  const normalizeLots = () =>
    setLots((current) => {
      if (current.length === 0) return current;
      const total = current.reduce((sum, lot) => sum + lot.percent, 0);
      const scaled = current.map((lot) => ({
        ...lot,
        percent: total > 0 ? Math.round((lot.percent / total) * 1000) / 10 : Math.round(1000 / current.length) / 10,
      }));
      const remainder = Math.round((100 - scaled.reduce((sum, lot) => sum + lot.percent, 0)) * 10) / 10;
      scaled[scaled.length - 1] = { ...scaled[scaled.length - 1], percent: Math.round((scaled[scaled.length - 1].percent + remainder) * 10) / 10 };
      return scaled;
    });

  const syncAccount = (account: MultiAccount) => setToast(`Sincronização iniciada para ${account.name}.`);

  const toggleSelected = (id: string) => setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const toggleAll = () => setSelected((current) => (current.length === accounts.length ? [] : accounts.map((account) => account.id)));

  const saveSettings = (next: MultiAccountSettings) => {
    setSettings(next);
    setModal(null);
    setToast("Configurações gerais salvas.");
  };

  const saveGroups = (next: AccountGroup[]) => {
    setGroups(next);
    setModal(null);
    setToast("Grupos atualizados.");
  };

  return (
    <Shell wide>
      <MultiAccountHeader templateItems={templateItems} onAddAccount={() => setModal({ kind: "account", account: null })} onOpenSettings={() => setModal({ kind: "settings" })} />

      <MultiAccountKpis total={accounts.length} active={activeCount} riskLimit={settings.riskLimit} />

      <div role="tablist" aria-label="Seções do Multi-Conta Avançado" className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              type="button"
              onClick={() => setTab(item.id)}
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active ? "border-brand-strong bg-brand-strong text-white" : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${tab}`}>
        {tab === "accounts" && (
          <>
            <AccountsTable
              accounts={accounts}
              selected={selected}
              onToggleSelected={toggleSelected}
              onToggleAll={toggleAll}
              onSetActive={setActive}
              onEdit={(account) => setModal({ kind: "account", account })}
              onDuplicate={duplicateAccount}
              onStats={(account) => setModal({ kind: "stats", account })}
              onSync={syncAccount}
              onDelete={(account) => confirmDeleteAccounts([account.id], `"${account.name}"`)}
              onBulkActive={bulkActive}
              onBulkDelete={() => confirmDeleteAccounts(selected, `${selected.length} contas selecionadas`)}
              onClearSelection={() => setSelected([])}
            />
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <LotDistribution
                accounts={accounts}
                lots={lots}
                onPercent={(id, value) => setLotValue(id, "percent", value)}
                onFixed={(id, value) => setLotValue(id, "fixedLot", value)}
                onNormalize={normalizeLots}
              />
              <GroupAllocation
                groups={groups}
                accounts={accounts}
                onManage={() => setModal({ kind: "groups", focusId: null })}
                onEdit={(group) => setModal({ kind: "groups", focusId: group.id })}
                onDelete={confirmDeleteGroup}
              />
              <div className="md:col-span-2 xl:col-span-1">
                <SymbolExposure accounts={accounts} />
              </div>
            </div>
          </>
        )}

        {tab === "groups" && (
          <div className="mt-4">
            <GroupAllocation
              wide
              groups={groups}
              accounts={accounts}
              onManage={() => setModal({ kind: "groups", focusId: null })}
              onEdit={(group) => setModal({ kind: "groups", focusId: group.id })}
              onDelete={confirmDeleteGroup}
            />
          </div>
        )}

        {tab === "risk" && (
          <div className="mt-4">
            <RiskAllocationPanel accounts={accounts} riskLimit={settings.riskLimit} onRiskChange={(id, value) => patchAccount(id, { risk: Math.round(value * 10) / 10 })} />
          </div>
        )}

        {tab === "sync" && (
          <div className="mt-4">
            <SyncPanel
              accounts={accounts}
              autoSync={settings.autoSync}
              onSyncAll={() => setToast("Sincronização iniciada para todas as contas ativas.")}
              onSyncOne={syncAccount}
            />
          </div>
        )}

        {tab === "history" && (
          <div className="mt-4">
            <HistoryPanel />
          </div>
        )}

        {tab === "reports" && (
          <div className="mt-4">
            <ReportsPanel onGenerate={(title) => setToast(`Relatório "${title}" em geração.`)} />
          </div>
        )}
      </div>

      {modal?.kind === "account" && <AccountFormModal account={modal.account} onSave={saveAccount} onClose={closeModal} />}
      {modal?.kind === "stats" && <AccountStatsModal account={modal.account} onClose={closeModal} />}
      {modal?.kind === "groups" && <GroupsModal groups={groups} accounts={accounts} focusGroupId={modal.focusId} onSave={saveGroups} onClose={closeModal} />}
      {modal?.kind === "settings" && <SettingsModal settings={settings} onSave={saveSettings} onClose={closeModal} />}
      {modal?.kind === "confirm" && <ConfirmModal title={modal.title} message={modal.message} onConfirm={modal.onConfirm} onClose={closeModal} />}

      <Toast message={toast} />
    </Shell>
  );
}
