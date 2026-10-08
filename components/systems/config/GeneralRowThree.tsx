import { OPERATION_MODE_OPTIONS, formatDays, type LogEntry, type SystemConfigDemo, type SystemConfigValues } from "../../../lib/system-config-demo";
import { SYSTEM_STATUS_LABEL, type SystemRoute } from "../../../lib/systems-catalog";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import SystemLogo from "../SystemLogo";
import { SYSTEM_STATUS_TONE } from "./GeneralRowOne";
import { ConfigCard, StatusBadge, StatusDot, outlineButtonClass } from "./fields";

const statusText = { active: "text-success", paused: "text-warning", inactive: "text-fg-subtle" } as const;

export function SummaryCard({ values, demo, route }: { values: SystemConfigValues; demo: SystemConfigDemo; route: SystemRoute }) {
  const mode = OPERATION_MODE_OPTIONS.find((o) => o.value === values.mode)?.label ?? values.mode;
  const schedule = values.restrictHours ? `${values.start} - ${values.end} (${formatDays(values.days)})` : "Sem restrição";

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: "Fonte",
      value: (
        <span className="flex min-w-0 items-center gap-2">
          <SystemLogo logo={route.icon.source} size={20} />
          <span className="truncate">{demo.sourceDetail}</span>
        </span>
      ),
    },
    {
      label: "Destino",
      value: (
        <span className="flex min-w-0 items-center gap-2">
          <SystemLogo logo={route.icon.destination} size={20} />
          <span className="truncate">{demo.destinationDetail}</span>
        </span>
      ),
    },
    { label: "Símbolo", value: values.symbol },
    { label: "Lote", value: values.lot },
    { label: "Horário", value: schedule },
    { label: "Spread Máx.", value: values.checkSpread ? `${values.spread} pips` : "Desativado" },
    { label: "Distância Máx.", value: values.checkDistance ? `${values.distance} pips` : "Desativado" },
    { label: "Modo", value: mode },
    {
      label: "Status",
      value: (
        <span className={cx("flex items-center gap-2", statusText[values.status])}>
          <StatusDot tone={SYSTEM_STATUS_TONE[values.status]} />
          {SYSTEM_STATUS_LABEL[values.status]}
        </span>
      ),
    },
  ];

  return (
    <ConfigCard title="Resumo da Configuração">
      <dl className="flex flex-col gap-1.5 text-[13px]">
        {rows.map((row) => (
          <div key={row.label} className="grid min-h-6 grid-cols-[96px_minmax(0,1fr)] items-center gap-3">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="min-w-0 text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </ConfigCard>
  );
}

export function SignalExampleCard({ symbol }: { symbol: string }) {
  const lines = [
    ["Entry:", "4142.50"],
    ["SL:", "4140.50"],
    ["TP1:", "4144.50"],
    ["TP2:", "4146.50"],
    ["TP3:", "4148.50"],
    ["TP4:", "4152.50"],
  ] as const;

  const identified = [
    "Direção: BUY",
    `Símbolo: ${symbol}`,
    "Entrada: 4142.50",
    "Stop Loss: 4140.50",
    "Take Profits: 4 níveis",
  ];

  return (
    <ConfigCard
      title="Exemplo de Sinal Detectado"
      action={<StatusBadge tone="success">Sinal válido</StatusBadge>}
    >
      <pre className="overflow-x-auto rounded-md border border-line bg-[#071522] px-3 py-2.5 font-mono text-[13px] leading-[1.35rem] text-fg-muted">
        <span className="text-fg">
          BUY&nbsp;&nbsp;{symbol}
        </span>
        {"\n"}
        {lines.map(([label, value]) => (
          <span key={label}>
            {label.padEnd(7, " ")}
            {value}
            {"\n"}
          </span>
        ))}
      </pre>

      <h3 className="mb-2 mt-3.5 text-[13px] font-semibold text-fg">Campos identificados:</h3>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[12.5px] text-fg-muted sm:grid-cols-2">
        {identified.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span aria-hidden className="grid size-4 shrink-0 place-items-center rounded-[4px] bg-success text-canvas">
              <Icon name="check" size={11} stroke={3.2} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </ConfigCard>
  );
}

const logIcon = {
  success: "bg-success/20 text-success",
  info: "bg-brand-strong/25 text-[#5cc2ff]",
} as const;

function LogRow({ entry }: { entry: LogEntry }) {
  const iconBox = entry.icon === "check" ? logIcon.success : logIcon.info;
  return (
    <li className="grid grid-cols-[8px_40px_22px_minmax(0,1fr)] items-center gap-x-2.5 text-[12.5px] leading-5">
      <StatusDot tone={entry.tone} className="size-2" />
      <time className="tabular text-fg-muted">{entry.time}</time>
      <span aria-hidden className={cx("grid size-[22px] place-items-center rounded-md", iconBox)}>
        <Icon name={entry.icon} size={13} stroke={2.2} />
      </span>
      <span className="min-w-0 truncate text-fg">
        {entry.text}
        {entry.highlight && <span className="ml-1 font-semibold text-success">{entry.highlight}</span>}
      </span>
    </li>
  );
}

export function RecentLogsCard({ logs }: { logs: readonly LogEntry[] }) {
  return (
    <ConfigCard
      title="Logs Recentes"
      action={
        <button type="button" className={outlineButtonClass}>
          Ver Todos
        </button>
      }
    >
      <ul className="flex flex-col gap-[7px]">
        {logs.map((entry, index) => (
          <LogRow key={`${entry.time}-${index}`} entry={entry} />
        ))}
      </ul>
    </ConfigCard>
  );
}
