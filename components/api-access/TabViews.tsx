"use client";
import { Badge } from "../UI";
import { CODE_EXAMPLES, MCP_CONFIG_SNIPPET, MCP_STEPS, WEBHOOK_EVENT_OPTIONS } from "../../lib/api-access-data";
import { ApiCard, CodeBlock } from "./ApiPrimitives";
import EndpointsCard from "./EndpointsCard";
import McpCard from "./McpCard";
import WebhooksCard from "./WebhooksCard";

export function RestTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.31fr)_minmax(0,1fr)]">
      <EndpointsCard showViewAll={false} />
      <ApiCard
        title="Autenticação"
        icon="lock"
        accent="blue"
        description="Envie sua API Key no cabeçalho Authorization de cada requisição."
      >
        <div className="flex flex-col gap-4">
          <CodeBlock label="cURL" code={CODE_EXAMPLES.curl} copyMessage="Exemplo cURL copiado." />
          <p className="text-[13px] leading-5 text-fg-muted">
            O limite é de <strong className="font-semibold text-fg">120 requisições por minuto</strong>. Ao excedê-lo a API responde com status 429.
          </p>
        </div>
      </ApiCard>
    </div>
  );
}

const EVENT_DESCRIPTIONS: Record<string, string> = {
  Sinais: "Novo sinal recebido ou interpretado de um canal Telegram.",
  Execuções: "Ordens abertas, modificadas ou encerradas nas contas MT4/MT5.",
  Status: "Mudanças de status de sistemas, contas e conexões.",
  Erros: "Falhas de execução, rejeições e problemas de conexão.",
};

export function WebhooksTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <WebhooksCard expanded />
      <ApiCard title="Eventos disponíveis" icon="signal" accent="blue" description="Escolha quais eventos cada webhook deve receber.">
        <ul className="flex flex-col gap-3">
          {WEBHOOK_EVENT_OPTIONS.map((option) => (
            <li key={option.label} className="flex items-start gap-3 rounded-lg border border-line bg-canvas/40 p-3">
              <Badge tone={option.tone}>{option.label}</Badge>
              <p className="text-[13px] leading-5 text-fg-muted">{EVENT_DESCRIPTIONS[option.label]}</p>
            </li>
          ))}
        </ul>
      </ApiCard>
    </div>
  );
}

export function McpTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <McpCard />
      <ApiCard title="Como conectar" icon="target" accent="purple" description="Três passos para usar o Copytrix dentro do seu agente de IA.">
        <div className="flex flex-col gap-4">
          <ol className="flex flex-col gap-3">
            {MCP_STEPS.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3">
                <span aria-hidden className="tabular flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[13px] font-semibold text-brand">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold text-fg">{step.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-5 text-fg-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <CodeBlock label="Configuração MCP" code={MCP_CONFIG_SNIPPET} copyMessage="Configuração MCP copiada." />
        </div>
      </ApiCard>
    </div>
  );
}
