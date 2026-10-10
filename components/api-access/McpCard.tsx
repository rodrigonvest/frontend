"use client";
import { Icon } from "../Icons";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { Button, cx } from "../UI";
import { MCP_INTEGRATIONS } from "../../lib/api-access-data";
import { ApiCard, CARD_SURFACE, StatusDot } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

export default function McpCard() {
  const { connectMcp, notify } = useApiAccess();

  return (
    <ApiCard
      title="Copytrix MCP"
      icon="bot"
      accent="purple"
      badge="Novo"
      description="Conecte o Copytrix ao ChatGPT, Claude e outros agentes de IA."
      className={cx(
        CARD_SURFACE,
        "border-[#9b63ff]/60 shadow-[0_0_0_1px_rgba(21,154,242,.35),0_0_36px_-10px_rgba(155,99,255,.55)]",
      )}
      action={
        <button
          type="button"
          aria-label="Sobre o Copytrix MCP"
          onClick={() => notify("O MCP permite que agentes de IA usem as ferramentas do Copytrix com a sua API Key (demonstrativo).", "info")}
          className="flex size-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Icon name="help" size={18} />
        </button>
      }
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {MCP_INTEGRATIONS.map((integration) => (
          <li key={integration.id} className="flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-canvas/50 p-3">
            <div className="flex flex-col items-start gap-2.5">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-3">
                {integration.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={integration.logo} alt="" width={24} height={24} className="size-6" />
                ) : (
                  <Icon name="bot" size={22} />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold leading-5 text-fg">{integration.name}</p>
                <p className={cx("mt-0.5 flex items-center gap-1.5 text-[12px]", integration.available ? "text-success" : "text-fg-muted")}>
                  <StatusDot tone={integration.available ? "green" : "muted"} />
                  {integration.status}
                </p>
              </div>
            </div>
            {integration.available ? (
              <PrimaryButton onClick={() => connectMcp(integration.id)} aria-label={`${integration.action} ${integration.name}`} className="h-10 w-full px-3">
                {integration.action}
              </PrimaryButton>
            ) : (
              <Button onClick={() => connectMcp(integration.id)} aria-label={`${integration.action} ${integration.name}`} className="w-full border-line-strong">
                {integration.action}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </ApiCard>
  );
}
