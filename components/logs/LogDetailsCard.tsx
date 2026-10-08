import { Icon } from "../Icons";
import { Panel } from "../backtest/BacktestFields";
import { logEntries, selectedLogJson } from "../../lib/logs-demo";

const selected = logEntries[0];

const rows: Array<{ label: string; value: React.ReactNode }> = [
  { label: "Data/Hora", value: selected.time },
  {
    label: "Nível",
    value: <span className="inline-flex h-[21px] items-center rounded bg-[#0b79e8] px-2 text-[11px] font-semibold uppercase leading-none text-white">{selected.level}</span>,
  },
  { label: "Sistema", value: selected.system },
  { label: "Mensagem", value: selected.message },
];

export default function LogDetailsCard() {
  return (
    <Panel
      className="h-full overflow-hidden p-3! pt-2!"
      title="Detalhes do Log Selecionado"
      action={
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1.5 rounded-md bg-brand-strong px-2.5 text-xs font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Icon name="copy" size={13} />
          Copiar
        </button>
      }
    >
      <dl className="mt-1.5 grid grid-cols-[104px_minmax(0,1fr)] items-center gap-y-1 text-[12.5px]">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="whitespace-nowrap text-fg-muted">{row.label}</dt>
            <dd className="flex min-h-[21px] min-w-0 items-center whitespace-nowrap text-[12px] text-fg tabular">{row.value}</dd>
          </div>
        ))}
        <dt className="self-start whitespace-nowrap pt-2.5 text-fg-muted">Dados Adicionais</dt>
        <dd className="mt-1 min-w-0">
          <pre className="overflow-x-auto rounded-lg border border-[#17344b] bg-[#06121e] px-3 py-2 font-mono text-[11px] leading-[15px] text-[#c9d7e4]">
            <code>
              {"{\n"}
              {selectedLogJson.map(({ key, value }, index) => (
                <span key={key} className="block">
                  {"  "}
                  <span className="text-[#c9d7e4]">{`"${key}"`}</span>
                  {": "}
                  <span className={value.kind === "string" ? "text-[#12d99e]" : "text-[#2fd0f0]"}>{value.text}</span>
                  {index < selectedLogJson.length - 1 ? "," : ""}
                </span>
              ))}
              {"}"}
            </code>
          </pre>
        </dd>
      </dl>
    </Panel>
  );
}
