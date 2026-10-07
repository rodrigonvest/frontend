import type { ReactNode } from "react";
import type { TradeRecord } from "../../lib/api";
import type { ManagementItem } from "../../lib/demo-data";
import { EXIT_KEYS, PNL_KEYS, R_KEYS, channelName, dt, fmt, meta, money, nmeta, signColor, signed, statusLabel, statusTone, text, time } from "../../lib/trade-format";
import { Icon } from "../Icons";
import { Badge, Card, EmptyState, PreviewBadge, cx } from "../UI";
import ChannelAvatar from "./ChannelAvatar";

export type LogEntry = { trade_id?: string; signal_id?: string; timestamp?: string; message?: string; operation?: string; level?: string };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 py-[4px]">
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="min-w-0 truncate tabular text-fg">{children}</dd>
    </div>
  );
}

const dateOnly = (v?: string | null) => dt(v).split(/,?\s+/)[0];

export function TradeDetails({ trade, number }: { trade: TradeRecord | null; number: number | null }) {
  const pnl = trade ? nmeta(trade, PNL_KEYS) : null;
  const r = trade ? nmeta(trade, R_KEYS) : null;
  const pips = trade ? nmeta(trade, ["pips"]) : null;
  const m = trade ? meta(trade) : {};
  const result = pnl ?? r;
  const opened = trade ? trade.opened_at || trade.created_at : null;

  return (
    <Card className="flex flex-col p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <h2 className="text-[15px] font-semibold text-fg">
          Operação <span className="tabular">{number ? `#${number}` : "—"}</span>
        </h2>
        {trade && result != null && (
          <Badge tone={result >= 0 ? "green" : "red"} className="px-2.5 font-bold tracking-wider">
            {result >= 0 ? "WIN" : "LOSS"}
          </Badge>
        )}
      </div>
      {trade ? (
        <dl className="mt-3 text-[12.5px]">
          <Row label="Data/Hora">
            {dateOnly(opened)}
            <span className="ml-2.5">{time(opened)}</span>
          </Row>
          <Row label="Canal">
            <span className="inline-flex max-w-full items-center gap-2">
              <ChannelAvatar name={channelName(trade)} size="sm" />
              <span className="truncate font-medium uppercase">{channelName(trade)}</span>
            </span>
          </Row>
          <Row label="Símbolo">{trade.symbol}</Row>
          <Row label="Tipo"><SideBadge side={trade.side} /></Row>
          <Row label="Entrada">{fmt(trade.entry_price)}</Row>
          <Row label="Saída">{fmt(nmeta(trade, EXIT_KEYS))}</Row>
          <Row label="Stop Loss">{fmt(trade.stop_loss)}</Row>
          <Row label="Take Profit">{text(m.tp_label && m.tp_label !== "SL" && trade.take_profit != null ? `${m.tp_label} (${fmt(trade.take_profit)})` : null, fmt(trade.take_profit))}</Row>
          <Row label="Resultado"><span className={cx("font-semibold", signColor(pnl))}>{money(pnl)}</span></Row>
          <Row label="R"><span className={cx("font-medium", signColor(r))}>{signed(r, "R")}</span></Row>
          <Row label="Pips"><span className={signColor(pips)}>{signed(pips, "", 1)}</span></Row>
          <Row label="Lote">{fmt(trade.volume)}</Row>
          <Row label="Conta">{text(m.account, trade.receiver_id)}</Row>
          <Row label="Status"><Badge tone={statusTone(trade.status)}>{statusLabel(trade.status)}</Badge></Row>
        </dl>
      ) : (
        <EmptyState className="mt-4 flex-1" title="Nenhuma operação selecionada" description="Selecione uma linha da tabela para ver os detalhes." />
      )}
    </Card>
  );
}

export function SideBadge({ side }: { side: string }) {
  const buy = side?.toUpperCase() === "BUY";
  return (
    <span
      className={cx(
        "inline-flex h-[22px] min-w-[42px] items-center justify-center rounded-md border px-2 text-[11px] font-semibold tracking-wide",
        buy ? "border-success/50 bg-success-soft/70 text-success" : "border-danger/50 bg-danger-soft/70 text-danger",
      )}
    >
      {side}
    </span>
  );
}

const fallbackItems = ["Mover SL para Break Even", "Trailing Stop", "Fechamento Parcial", "Fechamento Final"];

const stateIcon: Record<ManagementItem["state"], { icon: string; className: string; text: string }> = {
  done: { icon: "check", className: "bg-success text-[#04221b]", text: "text-fg" },
  unused: { icon: "x", className: "bg-danger text-white", text: "text-fg" },
  stop: { icon: "x", className: "bg-danger text-white", text: "text-danger" },
  pending: { icon: "clock", className: "bg-surface-3 text-fg-subtle", text: "text-fg-subtle" },
};

function readManagement(trade: TradeRecord | null): ManagementItem[] | null {
  if (!trade) return null;
  const raw = meta(trade).management;
  if (!Array.isArray(raw)) return null;
  const items = raw.filter(
    (x): x is ManagementItem => Boolean(x) && typeof x === "object" && typeof (x as ManagementItem).label === "string" && (x as ManagementItem).state in stateIcon,
  );
  return items.length ? items : null;
}

export function TradeManagement({ trade }: { trade?: TradeRecord | null }) {
  const items = readManagement(trade ?? null);
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-fg">Gerenciamento da Operação</h2>
        {!items && <PreviewBadge label="Sem dados" />}
      </div>
      <ul className="mt-3 space-y-2 text-[12.5px]">
        {items
          ? items.map((x) => {
              const s = stateIcon[x.state];
              return (
                <li key={x.label} className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3">
                  <span className="truncate text-fg-muted">{x.label}</span>
                  <span className={cx("flex min-w-0 items-center gap-2", s.text)}>
                    <span aria-hidden className={cx("flex size-[18px] shrink-0 items-center justify-center rounded-full", s.className)}>
                      <Icon name={s.icon} size={11} stroke={3} />
                    </span>
                    <span className="truncate">{x.detail}</span>
                  </span>
                </li>
              );
            })
          : fallbackItems.map((x) => (
              <li key={x} className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3">
                <span className="truncate text-fg-muted">{x}</span>
                <span className="flex items-center gap-2 text-fg-subtle">
                  <span aria-hidden className="flex size-[18px] items-center justify-center rounded-full bg-surface-3">
                    <Icon name="minus" size={11} />
                  </span>
                  Não informado
                </span>
              </li>
            ))}
      </ul>
    </Card>
  );
}

export function TradeLog({ logs }: { logs: LogEntry[] }) {
  return (
    <Card className="flex-1 p-4 sm:p-5">
      <h2 className="text-[15px] font-semibold text-fg">Log da Operação</h2>
      {logs.length ? (
        <ol className="relative mt-3 space-y-2.5 before:absolute before:bottom-2 before:left-[8px] before:top-2 before:w-px before:bg-success/40">
          {logs.map((l, i) => {
            const bad = l.level === "error" || l.level === "warning";
            return (
              <li key={i} className="relative grid grid-cols-[18px_44px_minmax(0,1fr)] items-center gap-2.5 text-[12.5px]">
                <span
                  aria-hidden
                  className={cx(
                    "relative z-10 flex size-[18px] items-center justify-center rounded-full",
                    bad ? "bg-danger text-white" : "bg-success text-[#04221b]",
                  )}
                >
                  <Icon name={bad ? "x" : "check"} size={10} stroke={3} />
                </span>
                <span className="tabular text-fg-subtle" title={dt(l.timestamp)}>{time(l.timestamp)}</span>
                <span className="truncate text-fg">{l.message || l.operation || "Evento Copytrix"}</span>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="mt-4 flex items-center gap-2.5 text-xs text-fg-subtle">
          <span aria-hidden className="flex size-6 items-center justify-center rounded-full bg-surface-3">
            <Icon name="clock" size={12} />
          </span>
          Nenhum evento registrado para esta operação.
        </div>
      )}
    </Card>
  );
}
