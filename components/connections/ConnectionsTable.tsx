"use client";
import type { KeyboardEvent } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { panelClass } from "../backtest/BacktestFields";
import { BrowserLogo, EventIcon, Flag, OsIcon } from "./ConnectionIcons";
import {
  connectionsPageSize,
  connectionsTotal,
  type ConnectionRecord,
  type ConnectionStatus,
} from "../../lib/connections-demo";

const columns = ["Data e Hora", "Tipo", "IP", "Localização", "Dispositivo", "Navegador / App", "Status"];
const pages = [1, 2, 3, 4, 5];

const statusClasses: Record<ConnectionStatus, string> = {
  Sucesso: "bg-[#12d99e] text-[#04261f]",
  Falha: "bg-[#ff4a5c] text-white",
};

const pageButtonClass =
  "flex size-8 items-center justify-center rounded-md border border-[#24435d] bg-[#091a2a] text-[13px] text-fg-muted transition-colors hover:border-brand hover:text-fg focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40";

export default function ConnectionsTable({
  records,
  selectedId,
  onSelect,
}: {
  records: ConnectionRecord[];
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  const onRowKey = (event: KeyboardEvent<HTMLTableRowElement>, id: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <section aria-labelledby="connections-list-title" className={cx(panelClass, "flex min-w-0 flex-col p-3.5")}>
      <div className="mb-3 flex items-center gap-3 px-1">
        <span aria-hidden className="text-brand">
          <ListGlyph />
        </span>
        <h2 id="connections-list-title" className="text-[15px] font-semibold tracking-tight text-fg">
          Lista de Conexões
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-0.5 text-left text-[13px]">
          <caption className="sr-only">Histórico de conexões da conta. Selecione uma linha para ver os detalhes.</caption>
          <thead>
            <tr className="text-[12.5px] text-fg-muted">
              {columns.map((column) => (
                <th key={column} scope="col" className="whitespace-nowrap px-3 py-2.5 font-normal">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const selected = record.id === selectedId;
              return (
                <tr
                  key={record.id}
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={() => onSelect(record.id)}
                  onKeyDown={(event) => onRowKey(event, record.id)}
                  className={cx(
                    "group cursor-pointer text-[#dbe7f1] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand",
                    selected ? "bg-[#0b2d4d]" : "hover:bg-white/[.03]",
                  )}
                >
                  <td className={cx("tabular whitespace-nowrap rounded-l-md px-3 py-[11px]", selected && "text-fg")}>{record.dateTime}</td>
                  <td className="whitespace-nowrap px-3 py-[11px]">
                    <span className="flex items-center gap-2">
                      <EventIcon event={record.event} />
                      {record.event}
                    </span>
                  </td>
                  <td className="tabular whitespace-nowrap px-3 py-[11px]">{record.ip}</td>
                  <td className="whitespace-nowrap px-3 py-[11px]">
                    <span className="flex items-center gap-2">
                      <Flag country={record.country} />
                      {record.city}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-[11px]">
                    <span className="flex items-center gap-2">
                      <OsIcon os={record.os} />
                      {record.os}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-[11px]">
                    <span className="flex items-center gap-2">
                      <BrowserLogo browser={record.browser} />
                      {record.browserLabel}
                    </span>
                  </td>
                  <td className="whitespace-nowrap rounded-r-md px-3 py-[11px]">
                    <span className={cx("inline-flex h-[22px] min-w-[68px] items-center justify-center rounded px-2.5 text-[12px] font-medium", statusClasses[record.status])}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex flex-col gap-3 px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-fg-muted">
          Mostrando 1 - {records.length} de {connectionsTotal} registros
        </p>
        <nav aria-label="Paginação" className="flex items-center gap-2">
          <button type="button" aria-label="Página anterior" disabled className={pageButtonClass}>
            <Icon name="chevron" size={14} stroke={2.2} />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              aria-label={`Página ${page}`}
              aria-current={page === 1 ? "page" : undefined}
              className={cx(pageButtonClass, page === 1 && "border-brand bg-brand text-white hover:text-white")}
            >
              {page}
            </button>
          ))}
          <button type="button" aria-label="Próxima página" disabled={connectionsPageSize >= connectionsTotal} className={pageButtonClass}>
            <Icon name="chevron" size={14} stroke={2.2} />
          </button>
        </nav>
      </div>
    </section>
  );
}

function ListGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden>
      <rect x="2" y="4" width="5" height="4" rx="1" />
      <rect x="9.5" y="4.5" width="14" height="3" rx="1" />
      <rect x="2" y="11" width="5" height="4" rx="1" />
      <rect x="9.5" y="11.5" width="14" height="3" rx="1" />
      <rect x="2" y="18" width="5" height="4" rx="1" />
      <rect x="9.5" y="18.5" width="14" height="3" rx="1" />
    </svg>
  );
}
