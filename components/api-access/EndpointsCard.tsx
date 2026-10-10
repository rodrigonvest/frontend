"use client";
import { API_BASE_URL, ENDPOINTS } from "../../lib/api-access-data";
import { ApiCard, IconButton, MethodBadge } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

export default function EndpointsCard({ showViewAll = true }: { showViewAll?: boolean }) {
  const { copy, goToTab } = useApiAccess();

  return (
    <ApiCard
      title="Endpoints Principais"
      icon="code"
      variant="inline"
      action={
        showViewAll ? (
          <button
            type="button"
            onClick={() => goToTab("rest")}
            className="rounded-md px-1 py-0.5 text-[13px] font-medium text-[#5cc2ff] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-brand"
          >
            Ver todos os endpoints <span aria-hidden>→</span>
          </button>
        ) : undefined
      }
    >
      <ul className="divide-y divide-line/60 overflow-hidden rounded-lg border border-line bg-canvas/40">
        {ENDPOINTS.map((endpoint) => (
          <li
            key={`${endpoint.method}-${endpoint.path}`}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 px-3 py-1.5 md:grid-cols-[auto_auto_minmax(0,1fr)_auto]"
          >
            <MethodBadge method={endpoint.method} />
            <code className="min-w-0 truncate font-mono text-[12.5px] text-fg md:overflow-visible md:whitespace-nowrap">{endpoint.path}</code>
            <span className="col-start-2 row-start-2 truncate text-[12.5px] text-fg-muted md:col-start-3 md:row-start-1 md:text-right">{endpoint.description}</span>
            <IconButton
              label={`Copiar endpoint ${endpoint.method} ${endpoint.path}`}
              icon="copy"
              className="col-start-3 row-span-2 row-start-1 md:col-start-4 md:row-span-1"
              onClick={() => copy(`${API_BASE_URL}${endpoint.path}`, `Endpoint copiado: ${endpoint.method} ${endpoint.path}`)}
            />
          </li>
        ))}
      </ul>
    </ApiCard>
  );
}
