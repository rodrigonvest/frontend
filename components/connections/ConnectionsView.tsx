"use client";
import Link from "next/link";
import { useState } from "react";
import Shell from "../Shell";
import PageHeader from "../PageHeader";
import { Icon } from "../Icons";
import ConnectionsFilters from "./ConnectionsFilters";
import ConnectionsKpiCards from "./ConnectionsKpiCards";
import ConnectionsTable from "./ConnectionsTable";
import ConnectionDetailsPanel from "./ConnectionDetailsPanel";
import { connectionRecords } from "../../lib/connections-demo";

export default function ConnectionsView() {
  const [selectedId, setSelectedId] = useState(connectionRecords[0].id);
  const selected = connectionRecords.find((record) => record.id === selectedId) ?? connectionRecords[0];

  return (
    <Shell>
      <PageHeader
        breadcrumb={
          <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-[13px] text-fg-muted">
            <Link href="/settings" className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
              Configurações
            </Link>
            <Icon name="chevron" size={12} stroke={2.2} />
            <Link href="/settings" className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
              Segurança
            </Link>
            <Icon name="chevron" size={12} stroke={2.2} />
            <span aria-current="page" className="text-fg">
              Histórico de Conexões
            </span>
          </nav>
        }
        title="Histórico de Conexões"
        description="Veja todos os acessos à sua conta, dispositivos conectados e atividades de segurança."
      />

      <ConnectionsFilters />
      <ConnectionsKpiCards />

      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ConnectionsTable records={connectionRecords} selectedId={selectedId} onSelect={setSelectedId} />
        <ConnectionDetailsPanel record={selected} />
      </div>
    </Shell>
  );
}
