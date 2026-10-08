"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buildSystemConfigDemo, type SetConfigValue, type SystemConfigValues } from "../../../lib/system-config-demo";
import type { SystemRoute } from "../../../lib/systems-catalog";
import { Icon } from "../../Icons";
import ConfigTabs, { panelId, tabId, type ConfigTabItem } from "./ConfigTabs";
import GeneralTab from "./GeneralTab";
import PlaceholderTab from "./PlaceholderTab";
import SystemSummaryCard from "./SystemSummaryCard";

const TABS: readonly ConfigTabItem[] = [
  { id: "general", label: "Geral", icon: <Icon name="settings" size={16} /> },
  { id: "risk", label: "Gerenciamento de Risco", icon: <Icon name="shield" size={16} /> },
  { id: "filters", label: "Filtros", icon: <Icon name="filter" size={16} /> },
  { id: "logs", label: "Logs", icon: <Icon name="logs" size={16} /> },
];

const PLACEHOLDERS: Record<string, { title: string; description: string }> = {
  risk: { title: "Gerenciamento de Risco", description: "Parâmetros de risco e proteção da rota." },
  filters: { title: "Filtros", description: "Regras adicionais de validação dos sinais." },
  logs: { title: "Logs", description: "Histórico detalhado de execução da rota." },
};

export default function SystemConfigView({ route }: { route: SystemRoute }) {
  const demo = useMemo(() => buildSystemConfigDemo(route), [route]);
  const [values, setValues] = useState<SystemConfigValues>(demo.values);
  const [active, setActive] = useState("general");

  const set: SetConfigValue = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const placeholder = PLACEHOLDERS[active];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Link
          href="/sistemas"
          className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Icon name="arrowLeft" size={14} />
          Voltar para Sistemas
        </Link>
        <h1 className="sr-only">Configuração do Sistema — {route.name}</h1>
      </div>

      <SystemSummaryCard route={route} values={values} demo={demo} onStatusChange={(on) => set("status", on ? "active" : "paused")} />

      <ConfigTabs tabs={TABS} active={active} onChange={setActive} />

      <div role="tabpanel" id={panelId(active)} aria-labelledby={tabId(active)}>
        {placeholder ? <PlaceholderTab title={placeholder.title} description={placeholder.description} /> : <GeneralTab route={route} values={values} demo={demo} set={set} />}
      </div>
    </div>
  );
}
