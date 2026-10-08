"use client";
import { useEffect, useState } from "react";
import { codeLanguages, codeSnippets, type CodeLanguage } from "../../lib/api-demo";
import { Icon } from "../Icons";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";
import { outlineButtonClass } from "./SecurityFields";

const tokenPattern = /("[^"]*"|\b(?:import|const|await)\b|\b(?:requests|print|fetch|console|curl)\b)/;
const keywords = new Set(["import", "const", "await"]);
const builtins = new Set(["requests", "print", "fetch", "console", "curl"]);

function HighlightedLine({ line }: { line: string }) {
  if (line === "") return <span>{" "}</span>;
  return (
    <>
      {line.split(tokenPattern).map((piece, i) => {
        if (piece === "") return null;
        const tone = piece.startsWith('"') ? "text-success" : keywords.has(piece) ? "text-[#ff7b72]" : builtins.has(piece) ? "text-brand" : "text-fg";
        return (
          <span key={i} className={tone}>
            {piece}
          </span>
        );
      })}
    </>
  );
}

export default function ApiExampleCard() {
  const [language, setLanguage] = useState<CodeLanguage>("python");
  const [copied, setCopied] = useState(false);
  const lines = codeSnippets[language];

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      // Clipboard can be blocked inside iframes; the visual feedback still applies.
    }
    setCopied(true);
  };

  return (
    <SettingsCard
      icon="code"
      title="Exemplo de Uso da API"
      description="Veja um exemplo de requisição para obter suas operações."
      action={
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <select
              aria-label="Linguagem do exemplo"
              value={language}
              onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
              className="h-9 w-[132px] appearance-none rounded-lg border border-line-strong/50 bg-canvas/60 pl-3 pr-8 text-[13px] text-fg outline-none transition-colors focus-visible:border-brand"
            >
              {codeLanguages.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="chevronDown" size={15} />
            </span>
          </div>
          <button type="button" onClick={copyCode} className={cx(outlineButtonClass, "h-9 !px-3.5 !text-[12.5px]")}>
            <SettingsIcon name={copied ? "check" : "copy"} size={14} stroke={2} />
            {copied ? "Copiado" : "Copiar Código"}
          </button>
        </div>
      }
    >
      <div
        role="region"
        aria-label="Exemplo de código"
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-line bg-[#050d17] py-3 outline-none focus-visible:border-brand"
      >
        <pre className="m-0 font-mono text-[12.5px] leading-[22px]">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span aria-hidden className="w-11 shrink-0 select-none pr-4 text-right text-[11px] text-fg-subtle/70">
                {i + 1}
              </span>
              <code className="whitespace-pre pr-4">
                <HighlightedLine line={line} />
              </code>
            </div>
          ))}
        </pre>
      </div>
    </SettingsCard>
  );
}
