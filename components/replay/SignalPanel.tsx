import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { fmtDateTime, fmtPrice, fmtR, profitPips, type ReplaySignal, TP_R } from "../../lib/replay-data";
import CaptureCard from "./CaptureCard";
import { DirectionLabel, StatusBadge, outcomeTone } from "./RpPrimitives";

interface Props {
  signal: ReplaySignal;
  index: number;
  total: number;
  channelName: string;
  onPrev: () => void;
  onNext: () => void;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-baseline gap-3 border-b border-line/60 py-2 text-[13px] last:border-0">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="tabular min-w-0 text-fg">{children}</dd>
    </div>
  );
}

const navButton =
  "inline-flex h-8 items-center gap-1 rounded-md border border-line-strong bg-surface-2/60 px-2.5 text-xs text-fg-muted transition-colors hover:border-brand/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40";

export default function SignalPanel({ signal, index, total, channelName, onPrev, onNext }: Props) {
  const price = (value: number) => fmtPrice(value, signal.decimals);
  const executed = signal.status === "Executado";
  const pips = profitPips(signal);

  return (
    <div className="flex flex-col gap-4">
      <section aria-label={`Detalhes do sinal ${signal.id}`} className="rounded-xl border border-line bg-surface p-3.5">
        <div className="flex items-center justify-between gap-2">
          <button type="button" onClick={onPrev} disabled={index === 0} className={navButton}>
            <span className="rotate-180">
              <Icon name="chevron" size={12} />
            </span>
            Anterior
          </button>
          <span className="tabular text-[13px] text-fg-muted" aria-live="polite">
            {index + 1} de {total}
          </span>
          <button type="button" onClick={onNext} disabled={index >= total - 1} className={navButton}>
            Próximo
            <Icon name="chevron" size={12} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#229ed9] text-white">
            <Icon name="telegram" size={22} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[17px] font-semibold tracking-tight text-fg">Sinal #{signal.id}</h2>
              <StatusBadge status={signal.status} />
            </div>
            <time className="tabular text-[13px] text-fg-muted">{fmtDateTime(signal.time)}</time>
          </div>
        </div>

        <dl className="mt-3">
          <div className="grid grid-cols-2 gap-3 border-b border-line/60 pb-2 text-[13px]">
            <div>
              <dt className="text-fg-muted">Ativo</dt>
              <dd className="mt-1 font-medium text-fg">{signal.asset}</dd>
            </div>
            <div>
              <dt className="text-fg-muted">Direção</dt>
              <dd className="mt-1">
                <DirectionLabel direction={signal.direction} />
              </dd>
            </div>
          </div>
          <Row label="Entrada">{price(signal.entry)}</Row>
          <Row label="SL">
            {price(signal.sl)} <span className="text-fg-subtle">({signal.slPips} pips)</span>
          </Row>
          {signal.tps.map((tp, i) => (
            <Row key={i} label={`TP${i + 1}`}>
              {price(tp)} <span className="text-fg-subtle">({TP_R[i].toFixed(2)}R)</span>
            </Row>
          ))}
          <Row label="Resultado">
            {executed ? (
              <span className={cx("font-semibold", outcomeTone(signal.outcome))}>
                {signal.outcome} ({fmtR(signal.r)})
              </span>
            ) : (
              <span className="text-fg-subtle">Não executado</span>
            )}
          </Row>
          <Row label="Lucro">
            {executed ? (
              <span className={signal.r >= 0 ? "text-success" : "text-danger"}>
                {pips >= 0 ? "+" : ""}
                {pips.toFixed(2)} pips <span className="text-fg-subtle">|</span> {fmtR(signal.r, true)}
              </span>
            ) : (
              "—"
            )}
          </Row>
          <Row label="Tempo de Execução">{executed && signal.execMinutes !== null ? `${signal.execMinutes} minutos` : "—"}</Row>
          <Row label="Spread na Entrada">{signal.spread.toFixed(2)}</Row>
          {!executed && signal.ignoredReason && <Row label="Motivo">{signal.ignoredReason}</Row>}
        </dl>

        <div className="mt-3">
          <h3 className="text-[13px] text-fg-muted">Comentário do Canal</h3>
          <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-line-strong bg-canvas/60 p-3 font-mono text-[12.5px] leading-5 text-fg">
            {signal.comment.join("\n")}
          </pre>
        </div>
      </section>

      <section aria-label="Captura do sinal no Telegram" className="rounded-xl border border-line bg-surface p-3.5">
        <h3 className="mb-3 flex items-center gap-2 text-[13.5px] font-semibold text-fg">
          <span className="text-[#229ed9]">
            <Icon name="telegram" size={18} />
          </span>
          Captura do Sinal no Telegram
        </h3>
        <CaptureCard signal={signal} channelName={channelName} />
      </section>
    </div>
  );
}
