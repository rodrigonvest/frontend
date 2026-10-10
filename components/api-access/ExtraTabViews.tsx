"use client";
import { useState } from "react";
import { Icon } from "../Icons";
import { Badge, Button, cx } from "../UI";
import { API_LOGS, CODE_EXAMPLES, CODE_LANGUAGES, SDKS, type CodeLanguage } from "../../lib/api-access-data";
import { ApiCard, CodeBlock, MethodBadge } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

const LOG_GRID = "grid grid-cols-[160px_72px_minmax(180px,1fr)_72px_84px] items-center gap-x-3";

function statusTone(status: number) {
  if (status >= 500) return "red" as const;
  if (status >= 400) return status === 429 ? ("amber" as const) : ("red" as const);
  return "green" as const;
}

export function LogsTab() {
  return (
    <ApiCard title="Logs da API" icon="logs" accent="blue" description="Últimas requisições feitas com a sua API Key (dados demonstrativos).">
      <div className="overflow-x-auto rounded-lg border border-line bg-canvas/40">
        <div role="table" aria-label="Requisições recentes" className="min-w-[640px]">
          <div role="rowgroup">
            <div role="row" className={`${LOG_GRID} px-3 py-2.5 text-[12px] font-medium text-fg-muted`}>
              <div role="columnheader">Data e hora</div>
              <div role="columnheader">Método</div>
              <div role="columnheader">Endpoint</div>
              <div role="columnheader">Status</div>
              <div role="columnheader" className="text-right">
                Latência
              </div>
            </div>
          </div>
          <div role="rowgroup">
            {API_LOGS.map((log) => (
              <div key={log.id} role="row" className={`${LOG_GRID} border-t border-line px-3 py-2.5 text-[13px]`}>
                <div role="cell" className="tabular text-fg-muted">
                  {log.time}
                </div>
                <div role="cell">
                  <MethodBadge method={log.method} />
                </div>
                <div role="cell" className="truncate font-mono text-[12.5px] text-fg">
                  {log.path}
                </div>
                <div role="cell">
                  <Badge tone={statusTone(log.status)}>{log.status}</Badge>
                </div>
                <div role="cell" className="tabular text-right text-fg-muted">
                  {log.latency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ApiCard>
  );
}

export function ExamplesTab() {
  const [language, setLanguage] = useState<CodeLanguage>("curl");
  const current = CODE_LANGUAGES.find((item) => item.id === language) ?? CODE_LANGUAGES[0];

  return (
    <ApiCard title="Exemplos de código" icon="fileText" accent="blue" description="Liste suas contas com uma única requisição autenticada.">
      <div className="flex flex-col gap-4">
        <div role="group" aria-label="Linguagem do exemplo" className="flex flex-wrap gap-2">
          {CODE_LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={language === item.id}
              onClick={() => setLanguage(item.id)}
              className={cx(
                "h-9 rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                language === item.id ? "border-brand-strong bg-brand-strong text-white" : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <CodeBlock label={current.label} code={CODE_EXAMPLES[language]} copyMessage={`Exemplo ${current.label} copiado.`} />
      </div>
    </ApiCard>
  );
}

export function SdksTab() {
  const { copy, notify } = useApiAccess();

  return (
    <ul className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {SDKS.map((sdk) => (
        <li key={sdk.id} className="min-w-0">
          <ApiCard
            title={sdk.name}
            icon="box"
            accent={sdk.available ? "green" : "amber"}
            description={sdk.description}
            className="h-full"
            action={<Badge tone={sdk.available ? "green" : "amber"}>{sdk.available ? "Disponível" : "Em breve"}</Badge>}
          >
            <div className="flex flex-col gap-3">
              <code className="block overflow-x-auto whitespace-nowrap rounded-lg border border-line bg-canvas/70 px-3 py-2.5 font-mono text-[12.5px] text-fg-muted">{sdk.install}</code>
              {sdk.available ? (
                <Button onClick={() => copy(sdk.install, `Comando de instalação do SDK ${sdk.name} copiado.`)} aria-label={`Copiar comando de instalação do SDK ${sdk.name}`}>
                  <Icon name="copy" size={16} />
                  Copiar comando
                </Button>
              ) : (
                <Button onClick={() => notify(`Avisaremos quando o SDK ${sdk.name} estiver disponível (demonstrativo).`, "info")}>Avisar quando disponível</Button>
              )}
            </div>
          </ApiCard>
        </li>
      ))}
    </ul>
  );
}
