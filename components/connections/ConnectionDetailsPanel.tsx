"use client";
import { useState, type ReactNode } from "react";
import { Icon } from "../Icons";
import SettingsIcon from "../settings/SettingsIcons";
import { cx } from "../UI";
import { panelClass } from "../backtest/BacktestFields";
import { BrowserLogo, EventIcon, Flag, OsIcon } from "./ConnectionIcons";
import ConnectionMap from "./ConnectionMap";
import type { ConnectionRecord } from "../../lib/connections-demo";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/50 py-[9px] last:border-b-0">
      <dt className="shrink-0 text-[13px] text-fg-muted">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2 text-[13px] text-[#dbe7f1] sm:w-[58%] sm:max-w-[260px] sm:justify-start">{children}</dd>
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copiado" : label}
      className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/[.06] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
    >
      <Icon name={copied ? "check" : "copy"} size={14} />
    </button>
  );
}

export default function ConnectionDetailsPanel({ record }: { record: ConnectionRecord }) {
  const { details } = record;
  const success = record.status === "Sucesso";
  const hasSession = details.sessionId !== "—";

  return (
    <section aria-labelledby="connection-details-title" aria-live="polite" className={cx(panelClass, "flex min-w-0 flex-col p-3.5")}>
      <div className="mb-2 flex items-center gap-3 px-1">
        <span aria-hidden className="text-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
            <path d="M14 2v5h5" fill="#0a1b2b" fillOpacity=".35" />
            <path d="M8 12h8M8 16h6" stroke="#0a1b2b" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <h2 id="connection-details-title" className="text-[15px] font-semibold tracking-tight text-fg">
          Detalhes da Conexão
        </h2>
      </div>

      <dl className="px-1">
        <Row label="Data e Hora">
          <span className="tabular">{record.dateTime}</span>
        </Row>
        <Row label="Tipo de Evento">
          <EventIcon event={record.event} />
          {record.event}
        </Row>
        <Row label="Status">
          <span
            className={cx(
              "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-[12px]",
              success ? "border-success/60 bg-success-soft/70 text-success" : "border-danger/60 bg-danger-soft/70 text-danger",
            )}
          >
            <span aria-hidden className={cx("flex size-3.5 items-center justify-center rounded-full text-[#06111d]", success ? "bg-success" : "bg-danger")}>
              <Icon name={success ? "check" : "x"} size={9} stroke={3.4} />
            </span>
            {record.status}
          </span>
        </Row>
        <Row label="Endereço IP">
          <span className="tabular truncate">{record.ip}</span>
          <CopyButton value={record.ip} label="Copiar endereço IP" />
        </Row>
        <Row label="Localização">
          <Flag country={record.country} />
          <span className="truncate">{details.locationFull}</span>
        </Row>
        <Row label="Dispositivo">
          <OsIcon os={record.os} />
          <span className="truncate">{details.deviceFull}</span>
        </Row>
        <Row label="Navegador / App">
          <BrowserLogo browser={record.browser} />
          <span className="truncate">{details.browserFull}</span>
        </Row>
        <Row label="Método de Autenticação">
          <span aria-hidden className="shrink-0 text-fg-muted">
            <Icon name="shield" size={15} />
          </span>
          <span className="truncate">{details.authMethod}</span>
        </Row>
        <Row label="ID da Sessão">
          <span className="tabular truncate">{details.sessionId}</span>
          {hasSession && <CopyButton value={details.sessionId} label="Copiar ID da sessão" />}
        </Row>
        <Row label="Duração da Sessão">
          <span className="tabular">{details.duration}</span>
        </Row>
        <Row label="Última Atividade">
          <span className="tabular">{details.lastActivity}</span>
        </Row>
      </dl>

      <div className="mt-3 overflow-hidden rounded-lg border border-line bg-[#0b1a28]">
        <div className="h-[104px]">
          <ConnectionMap />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2.5">
          <p className="truncate text-[13px] text-[#dbe7f1]">{details.mapLabel}</p>
          <button
            type="button"
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-brand/70 bg-brand-soft/40 px-3 text-[12.5px] text-fg transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
          >
            Ver no Mapa
            <SettingsIcon name="external" size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
