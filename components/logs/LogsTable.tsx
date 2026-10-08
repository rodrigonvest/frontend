import { panelClass } from "../backtest/BacktestFields";
import { cx } from "../UI";
import { logEntries, type LogEntry, type LogLevel } from "../../lib/logs-demo";

const levelStyles: Record<LogLevel, string> = {
  INFO: "bg-[#0b79e8] text-white",
  SUCCESS: "bg-[#0a6b55] text-[#35f0b4]",
  WARNING: "bg-[#f2a900] text-[#2b2000]",
  ERROR: "bg-[#ef3340] text-white",
};

const selectedId = 1;

function LevelBadge({ level }: { level: LogLevel }) {
  return (
    <span className={cx("inline-flex h-[21px] min-w-[52px] items-center justify-center rounded px-2 text-[11px] font-semibold uppercase leading-none", levelStyles[level])}>
      {level}
    </span>
  );
}

function Message({ entry }: { entry: LogEntry }) {
  if (!entry.highlight) return <>{entry.message}</>;
  const [before, after] = entry.message.split(entry.highlight);
  return (
    <>
      {before}
      <span className="text-[#f5b82e]">{entry.highlight}</span>
      {after}
    </>
  );
}

export default function LogsTable() {
  return (
    <section aria-label="Logs" className={cx(panelClass, "min-w-0 overflow-hidden")}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13px] tabular">
          <caption className="sr-only">Registros de logs do sistema</caption>
          <thead>
            <tr className="border-b border-[#17344b] text-fg">
              <th scope="col" className="w-[42px] px-3 py-3 text-center font-medium">#</th>
              <th scope="col" className="w-[168px] whitespace-nowrap px-3 py-3 font-medium">Data/Hora (BRT)</th>
              <th scope="col" className="w-[84px] px-3 py-3 font-medium">Nível</th>
              <th scope="col" className="w-[104px] px-3 py-3 font-medium">Sistema</th>
              <th scope="col" className="px-3 py-3 font-medium">Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {logEntries.map((entry) => {
              const selected = entry.id === selectedId;
              return (
                <tr
                  key={entry.id}
                  aria-selected={selected}
                  className={cx("h-[25.8px] text-[#dbe7f2]", selected ? "bg-[#0e2a55]" : "hover:bg-white/[.03]")}
                >
                  <td className="px-3 py-[2px] text-center text-fg">{entry.id}</td>
                  <td className="whitespace-nowrap px-3 py-[2px]">{entry.time}</td>
                  <td className="px-3 py-[2px]"><LevelBadge level={entry.level} /></td>
                  <td className="px-3 py-[2px]">{entry.system}</td>
                  <td className="px-3 py-[2px]"><Message entry={entry} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-3" />
    </section>
  );
}
