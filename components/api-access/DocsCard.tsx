"use client";
import { Icon } from "../Icons";
import { DOC_LINKS } from "../../lib/api-access-data";
import { ApiCard } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

export default function DocsCard({ className }: { className?: string }) {
  const { goToTab, notify, openDocs } = useApiAccess();

  const handle = (id: string, target: "toast" | "examples" | "sdks") => {
    if (target === "examples" || target === "sdks") return goToTab(target);
    if (id === "postman") return notify("A Postman Collection será disponibilizada em breve (demonstrativo).", "info");
    openDocs();
  };

  return (
    <ApiCard title="Documentação" icon="book" accent="blue" description="Guia completo da API, exemplos e SDKs." className={className}>
      <ul className="flex flex-col gap-2.5">
        {DOC_LINKS.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => handle(link.id, link.target)}
              className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-line-strong/70 bg-canvas/40 px-3 text-left text-[13px] text-fg transition-colors hover:border-brand/60 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span aria-hidden className="text-fg-muted">
                <Icon name={link.icon} size={16} />
              </span>
              <span className="min-w-0 flex-1 truncate">{link.label}</span>
              {link.target === "toast" && (
                <span aria-hidden className="text-fg-subtle">
                  <Icon name="external" size={14} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </ApiCard>
  );
}
