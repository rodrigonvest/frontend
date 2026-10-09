"use client";
import { useState } from "react";
import { Badge, type Tone } from "../UI";
import { initialAccounts, money } from "../../lib/multi-account-demo";
import { riskHistory, type RiskConfig, type RiskEvent } from "../../lib/risk-management-demo";
import { NumberBox } from "../multi-account/MaPrimitives";
import { Panel } from "./RiskFields";

export function RiskByAccount({ config }: { config: RiskConfig }) {
  const [risks, setRisks] = useState<Record<string, number>>(() => Object.fromEntries(initialAccounts.map((account) => [account.id, account.risk])));

  return (
    <Panel title="Risco por Conta" icon="accounts">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead>
            <tr className="text-[12px] text-fg-subtle">
              <th scope="col" className="py-2 pr-3 font-normal">Conta</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">Saldo</th>
              <th scope="col" className="py-2 pr-3 font-normal">Risco por Operação</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">Valor em Risco</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">Limite Diário</th>
              <th scope="col" className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {initialAccounts.map((account) => {
              const risk = risks[account.id] ?? account.risk;
              const above = risk > config.perTrade;
              return (
                <tr key={account.id} className="border-t border-line/60 align-middle">
                  <th scope="row" className="py-2.5 pr-3 font-medium text-fg">
                    {account.name}
                    <span className="block text-[11px] font-normal text-fg-subtle">{account.number}</span>
                  </th>
                  <td className="tabular py-2.5 pr-3 text-right text-fg">{money(account.balance)}</td>
                  <td className="py-2.5 pr-3">
                    <NumberBox
                      label={`Risco por operação de ${account.name}`}
                      value={risk}
                      decimals={1}
                      max={100}
                      suffix="%"
                      className="w-24"
                      onChange={(value) => setRisks((current) => ({ ...current, [account.id]: Math.round(value * 10) / 10 }))}
                    />
                  </td>
                  <td className="tabular py-2.5 pr-3 text-right text-fg">{money((account.balance * risk) / 100)}</td>
                  <td className="tabular py-2.5 pr-3 text-right text-fg">{money((account.balance * config.daily) / 100)}</td>
                  <td className="py-2.5">
                    {above ? <Badge tone="amber">Acima do perfil</Badge> : <Badge tone="green">Dentro do perfil</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

const eventTone: Record<RiskEvent["type"], Tone> = { Limite: "amber", Bloqueio: "red", Ajuste: "blue", Alerta: "amber" };

export function RiskHistory() {
  return (
    <Panel title="Histórico de Eventos de Risco" icon="clock">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead>
            <tr className="text-[12px] text-fg-subtle">
              <th scope="col" className="py-2 pr-3 font-normal">Data e Hora</th>
              <th scope="col" className="py-2 pr-3 font-normal">Tipo</th>
              <th scope="col" className="py-2 pr-3 font-normal">Detalhe</th>
              <th scope="col" className="py-2 font-normal">Conta</th>
            </tr>
          </thead>
          <tbody>
            {riskHistory.map((event) => (
              <tr key={`${event.when}-${event.detail}`} className="border-t border-line/60 align-middle">
                <td className="tabular whitespace-nowrap py-2.5 pr-3 text-fg-muted">{event.when}</td>
                <td className="py-2.5 pr-3"><Badge tone={eventTone[event.type]}>{event.type}</Badge></td>
                <td className="py-2.5 pr-3 text-fg">{event.detail}</td>
                <td className="whitespace-nowrap py-2.5 text-fg-muted">{event.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
