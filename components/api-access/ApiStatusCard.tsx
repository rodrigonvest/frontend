"use client";
import { Badge } from "../UI";
import { API_BASE_URL, API_STATUS_ROWS } from "../../lib/api-access-data";
import { ApiCard, IconButton, StatusDot } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

export default function ApiStatusCard() {
  const { copy } = useApiAccess();

  return (
    <ApiCard
      title="Status da API"
      icon="info"
      variant="inline"
      action={
        <span className="flex items-center gap-2 text-[14px] font-medium text-success">
          <StatusDot tone="green" />
          Online
        </span>
      }
    >
      <dl className="divide-y divide-line/60 overflow-hidden rounded-lg border border-line bg-canvas/40">
        {API_STATUS_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-3.5 py-2 text-[13.5px]">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="flex min-w-0 items-center justify-end gap-1.5 text-right font-medium text-fg">
              {row.kind === "badge" ? (
                <Badge tone="green">{row.value}</Badge>
              ) : (
                <span className="truncate">{row.value}</span>
              )}
              {row.kind === "copy" && <IconButton label="Copiar URL base" icon="copy" onClick={() => copy(API_BASE_URL, "URL base copiada.")} />}
            </dd>
          </div>
        ))}
      </dl>
    </ApiCard>
  );
}
