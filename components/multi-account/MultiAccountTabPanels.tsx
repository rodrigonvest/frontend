"use client";
import { useState } from "react";
import { Icon } from "../Icons";
import SystemLogo from "../systems/SystemLogo";
import { Badge, Button, Card, cx } from "../UI";
import { PLATFORMS, historyEvents, reportOptions, type MultiAccount } from "../../lib/multi-account-demo";
import { Switch } from "./MaPrimitives";

export function RiskAllocationPanel({
  accounts,
  riskLimit,
  onRiskChange,
}: {
  accounts: MultiAccount[];
  riskLimit: number;
  onRiskChange: (id: string, value: number) => void;
}) {
  const total = accounts.filter((account) => account.active).reduce((sum, account) => sum + account.risk, 0);
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-fg">Alocação de Risco por Conta</h2>
        <span className="tabular text-[13px] text-fg-muted">
          Risco ativo somado: <span className="font-semibold text-fg">{total.toFixed(1)}%</span> · Limite {riskLimit.toFixed(1)}%
        </span>
      </div>
      <ul className="mt-3 divide-y divide-line/60">
        {accounts.map((account) => (
          <li key={account.id} className="grid items-center gap-3 py-3 sm:grid-cols-[minmax(0,240px)_1fr_64px]">
            <span className="flex min-w-0 items-center gap-2.5 text-[14px] text-fg">
              <SystemLogo logo={PLATFORMS[account.platform].logo} size={26} />
              <span className="truncate">{account.name}</span>
              {!account.active && <Badge>Inativa</Badge>}
            </span>
            <input
              type="range"
              min={0.1}
              max={3}
              step={0.1}
              value={account.risk}
              aria-label={`Risco por operação de ${account.name}`}
              onChange={(event) => onRiskChange(account.id, Number(event.target.value))}
              className="w-full accent-[#159af2]"
            />
            <span className="tabular text-right text-[14px] font-medium text-fg">{account.risk.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function SyncPanel({
  accounts,
  autoSync,
  onSyncAll,
  onSyncOne,
}: {
  accounts: MultiAccount[];
  autoSync: boolean;
  onSyncAll: () => void;
  onSyncOne: (account: MultiAccount) => void;
}) {
  const [copying, setCopying] = useState<Record<string, boolean>>(() => Object.fromEntries(accounts.map((a) => [a.id, a.active])));
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-fg">Sincronização de Operações</h2>
          <p className="mt-0.5 text-[12px] text-fg-subtle">
            Sincronização automática {autoSync ? "habilitada" : "desabilitada"} nas configurações gerais.
          </p>
        </div>
        <Button variant="primary" onClick={onSyncAll}>
          <Icon name="refresh" size={15} />
          Sincronizar todas
        </Button>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Estado de sincronização por conta</caption>
          <thead>
            <tr className="border-b border-line text-[13px] text-fg">
              <th scope="col" className="px-3 py-2.5 font-medium">Conta</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Estado</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Latência</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Última sincronização</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Copiar operações</th>
              <th scope="col" className="px-3 py-2.5 font-medium"><span className="sr-only">Ação</span></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => {
              const on = Boolean(copying[account.id]) && account.active;
              return (
                <tr key={account.id} className="border-b border-line/60 last:border-b-0 text-[13px]">
                  <td className="px-3 py-3 text-fg">{account.name}</td>
                  <td className="px-3 py-3">
                    <Badge tone={account.active ? "green" : "neutral"}>{account.active ? "Sincronizada" : "Pausada"}</Badge>
                  </td>
                  <td className="tabular px-3 py-3 text-fg-muted">{account.active ? `${18 + index * 7} ms` : "—"}</td>
                  <td className="px-3 py-3 text-fg-muted">{account.active ? `há ${8 + index * 5} segundos` : "—"}</td>
                  <td className="px-3 py-3">
                    <Switch
                      checked={on}
                      onChange={(next) => setCopying((current) => ({ ...current, [account.id]: next }))}
                      label={`Copiar operações para ${account.name}`}
                    />
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSyncOne(account)}
                      disabled={!account.active}
                      className="rounded-md border border-line px-3 py-1.5 text-[12px] text-fg transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Sincronizar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function HistoryPanel() {
  return (
    <Card className="p-4">
      <h2 className="text-[15px] font-semibold text-fg">Histórico de Eventos</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Eventos recentes do Multi-Conta Avançado</caption>
          <thead>
            <tr className="border-b border-line text-[13px] text-fg">
              <th scope="col" className="px-3 py-2.5 font-medium">Horário</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Conta</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Evento</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {historyEvents.map((event, index) => (
              <tr key={index} className="border-b border-line/60 last:border-b-0 text-[13px]">
                <td className="tabular whitespace-nowrap px-3 py-2.5 text-fg-muted">{event.time}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-fg">{event.account}</td>
                <td className="px-3 py-2.5">
                  <Badge tone={event.tone}>{event.event}</Badge>
                </td>
                <td className={cx("px-3 py-2.5 text-fg-muted")}>{event.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function ReportsPanel({ onGenerate }: { onGenerate: (title: string) => void }) {
  return (
    <Card className="p-4">
      <h2 className="text-[15px] font-semibold text-fg">Relatórios</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {reportOptions.map((report) => (
          <li key={report.id} className="flex items-start justify-between gap-4 rounded-lg border border-line bg-canvas/50 p-3.5">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-fg">
                <Icon name="fileText" size={16} />
                {report.title}
              </h3>
              <p className="mt-1 text-[12px] leading-5 text-fg-subtle">{report.description}</p>
            </div>
            <Button className="h-9 shrink-0" onClick={() => onGenerate(report.title)}>
              <Icon name="download" size={14} />
              Gerar
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
