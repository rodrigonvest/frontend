"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { INDICATORS, TIMEFRAMES, type IndicatorId, type ReplaySignal, type TimeframeId } from "../../lib/replay-data";
import type { Candle } from "../../lib/replay-chart";
import CandleChart, { type ChartSettings } from "./CandleChart";
import { AssetBadge, Popover, RpToggle } from "./RpPrimitives";

interface Props {
  signal: ReplaySignal;
  tf: TimeframeId;
  candles: Candle[];
  visibleCount: number;
  replayActive: boolean;
  showAllTps: boolean;
  indicators: IndicatorId[];
  settings: ChartSettings;
  fullscreen: boolean;
  onTf: (tf: TimeframeId) => void;
  onShowAllTps: (value: boolean) => void;
  onIndicators: (value: IndicatorId[]) => void;
  onSettings: (value: ChartSettings) => void;
  onFullscreen: () => void;
}

const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong bg-surface-2/60 px-3 text-xs text-fg-muted transition-colors hover:border-brand/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand";

export default function ChartPanel({
  signal,
  tf,
  candles,
  visibleCount,
  replayActive,
  showAllTps,
  indicators,
  settings,
  fullscreen,
  onTf,
  onShowAllTps,
  onIndicators,
  onSettings,
  onFullscreen,
}: Props) {
  const toggleIndicator = (id: IndicatorId) =>
    onIndicators(indicators.includes(id) ? indicators.filter((item) => item !== id) : [...indicators, id]);

  const settingItems: Array<{ key: keyof ChartSettings; label: string }> = [
    { key: "grid", label: "Grade do gráfico" },
    { key: "crosshair", label: "Cursor e leitura OHLC" },
    { key: "signalNote", label: "Nota do sinal recebido" },
  ];

  return (
    <section
      aria-label="Gráfico do sinal"
      className={cx("flex flex-col overflow-hidden rounded-xl border border-line bg-surface", fullscreen && "min-h-0 flex-1")}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <AssetBadge asset={signal.asset} size={30} />
          <h2 className="text-base font-semibold tracking-tight text-fg">{signal.asset}</h2>
        </div>

        <div role="group" aria-label="Timeframe" className="flex gap-1 overflow-x-auto">
          {TIMEFRAMES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={tf === item.id}
              onClick={() => onTf(item.id)}
              className={cx(
                "h-8 min-w-10 rounded-md border px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                tf === item.id
                  ? "border-brand-strong bg-brand-strong text-white"
                  : "border-line bg-surface-2/50 text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {item.id}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <RpToggle checked={showAllTps} onChange={onShowAllTps} label="Mostrar Todos os TPs" />

          <Popover
            label="Indicadores"
            align="right"
            panelClassName="w-56"
            renderTrigger={({ open, toggle, panelId }) => (
              <button
                type="button"
                data-popover-trigger
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                onClick={toggle}
                className={triggerClass}
              >
                Indicadores
                {indicators.length > 0 && (
                  <span className="rounded bg-brand-strong px-1.5 text-[10px] font-semibold text-white">{indicators.length}</span>
                )}
                <Icon name="chevronDown" size={13} />
              </button>
            )}
          >
            {() => (
              <ul className="space-y-0.5">
                {INDICATORS.map((item) => {
                  const on = indicators.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleIndicator(item.id)}
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        <span
                          aria-hidden
                          className={cx("flex size-4 items-center justify-center rounded border", on ? "border-brand bg-brand text-white" : "border-line-strong")}
                        >
                          {on && <Icon name="check" size={11} stroke={3} />}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <span aria-hidden className="size-2 rounded-full" style={{ background: item.color }} />
                      </button>
                    </li>
                  );
                })}
                {indicators.length > 0 && (
                  <li className="border-t border-line pt-1">
                    <button
                      type="button"
                      onClick={() => onIndicators([])}
                      className="w-full rounded-md px-2.5 py-1.5 text-left text-xs text-fg-subtle hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      Limpar indicadores
                    </button>
                  </li>
                )}
              </ul>
            )}
          </Popover>

          <Popover
            label="Configurações do gráfico"
            align="right"
            panelClassName="w-64"
            renderTrigger={({ open, toggle, panelId }) => (
              <button
                type="button"
                data-popover-trigger
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                aria-label="Configurações do gráfico"
                onClick={toggle}
                className={cx(triggerClass, "w-8 justify-center px-0")}
              >
                <Icon name="settings" size={16} />
              </button>
            )}
          >
            {() => (
              <div className="space-y-1 p-1">
                {settingItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5">
                    <RpToggle checked={settings[item.key]} onChange={(value) => onSettings({ ...settings, [item.key]: value })} label={item.label} />
                  </div>
                ))}
              </div>
            )}
          </Popover>

          <button
            type="button"
            aria-pressed={fullscreen}
            aria-label={fullscreen ? "Sair da tela cheia" : "Abrir gráfico em tela cheia"}
            onClick={onFullscreen}
            className={cx(triggerClass, "w-8 justify-center px-0")}
          >
            <Icon name={fullscreen ? "shrink" : "expand"} size={16} />
          </button>
        </div>
      </div>

      <div className={cx("min-h-0 bg-canvas/40", fullscreen ? "flex-1" : "h-[300px] sm:h-[340px]")}>
        <CandleChart
          signal={signal}
          tf={tf}
          candles={candles}
          visibleCount={visibleCount}
          replayActive={replayActive}
          showAllTps={showAllTps}
          indicators={indicators}
          settings={settings}
        />
      </div>
    </section>
  );
}
