import type { ReactNode } from "react";
import type { TradeRecord } from "../../lib/api";
import { EXIT_KEYS, PNL_KEYS, R_KEYS, channelName, dt, fmt, meta, money, nmeta, signColor, signed, statusLabel, statusTone, text, time } from "../../lib/trade-format";
import { Icon } from "../Icons";
import { Badge, Card, EmptyState, PreviewBadge, cx } from "../UI";
import ChannelAvatar from "./ChannelAvatar";

export type LogEntry = { trade_id?: string; signal_id?: string; timestamp?: string; message?: string; operation?: string };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-[7px]">
      <dt className="shrink-0 text-fg-subtle">{label}</dt>
      <dd className="min-w-0 truncate text-right tabular text-fg">{children}</dd>
    </div>
  );
}

export function TradeDetails({ trade, number }: { trade: TradeRecord | null; number: number | null }) {
  const pnl = trade ? nmeta(trade, PNL_KEYS) : null;
  const r = trade ? nmeta(trade, R_KEYS) : null;
  const pips = trade ? nmeta(trade, ["pips"]) : null;
  const m = trade ? meta(trade) : {};
  const result = pnl ?? r;

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-center gap-2.5">
        <h2 className="text-sm font-semibold text-fg">
          Operação <span className="tabular">{number ? `#${number}` : "—"}</span>
        </h2>
        {trade && result != null && (
          <Badge tone={result >= 0 ? "green" : "red"} className="font-semibold tracking-wide">
            {result >= 0 ? "WIN" : "LOSS"}
          </Badge>
        )}
      </div>
      {trade ? (
        <dl className="mt-3 divide-y divide-line/60 text-[13px]">
          <Row label="Data/Hora">{dt(trade.opened_at || trade.created_at)}</Row>
          <Row label="Canal">
            <span className="inline-flex max-w-full items-center gap-2">
              <ChannelAvatar name={channelName(trade)} size="sm" />
              <span className="truncate">{channelName(trade)}</span>
            </span>
          </Row>
          <Row label="Símbolo">{trade.symbol}</Row>
          <Row label="Tipo"><SideBadge side={trade.side} /></Row>
          <Row label="Entrada">{fmt(trade.entry_price)}</Row>
          <Row label="Saída">{fmt(nmeta(trade, EXIT_KEYS))}</Row>
          <Row label="Stop Loss">{fmt(trade.stop_loss)}</Row>
          <Row label="Take Profit">{text(m.tp_label && trade.take_profit != null ? `${m.tp_label} (${fmt(trade.take_profit)})` : null, fmt(trade.take_profit))}</Row>
          <Row label="Resultado"><span className={cx("font-semibold", signColor(pnl))}>{money(pnl)}</span></Row>
          <Row label="R"><span className={signColor(r)}>{signed(r, "R")}</span></Row>
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
        "inline-flex h-6 min-w-[46px] items-center justify-center rounded-md border px-2 text-[11px] font-semibold tracking-wide",
        buy ? "border-success/50 bg-success-soft/70 text-success" : "border-danger/50 bg-danger-soft/70 text-danger",
      )}
    >
      {side}
    </span>
  );
}

const managementItems = ["Mover SL para break even", "Trailing stop", "Fechamento parcial", "Fechamento final"];

export function TradeManagement() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-fg">Gerenciamento da operação</h2>
        <PreviewBadge label="Sem dados" />
      </div>
      <ul className="mt-3 divide-y divide-line/60 text-[13px]">
        {managementItems.map((x) => (
          <li key={x} className="flex items-center justify-between gap-3 py-2">
            <span className="text-fg-muted">{x}</span>
            <span className="flex items-center gap-2 text-xs text-fg-subtle">
              <span aria-hidden className="flex size-5 items-center justify-center rounded-full bg-surface-3 text-fg-subtle">
                <Icon name="minus" size={12} />
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
    <Card className="flex-1 p-5">
      <h2 className="text-sm font-semibold text-fg">Log da operação</h2>
      {logs.length ? (
        <ol className="relative mt-3 space-y-3 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-line">
          {logs.map((l, i) => (
            <li key={i} className="relative flex items-start gap-3 text-[13px]">
              <span aria-hidden className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-success/50 bg-success-soft text-success">
                <Icon name="check" size={12} stroke={2.4} />
              </span>
              <div className="min-w-0 pt-0.5">
                <span className="mr-2 tabular text-xs text-fg-subtle" title={dt(l.timestamp)}>{time(l.timestamp)}</span>
                <span className="text-fg">{l.message || l.operation || "Evento Copytrix"}</span>
              </div>
            </li>
          ))}
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
