"use client";
import { cx } from "../UI";
import { REPLAY_DURATION_SECONDS, SPEEDS, fmtDateTime, fmtDuration } from "../../lib/replay-data";
import { PauseGlyph, PlayGlyph, SkipBackGlyph, SkipForwardGlyph, StopGlyph } from "./RpPrimitives";

interface Props {
  playing: boolean;
  active: boolean;
  progress: number;
  speed: number;
  cursorTime: number;
  canPrev: boolean;
  canNext: boolean;
  onTogglePlay: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (progress: number) => void;
  onSpeed: (speed: number) => void;
}

const iconButton =
  "flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-3 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent";

export default function PlaybackBar({
  playing,
  active,
  progress,
  speed,
  cursorTime,
  canPrev,
  canNext,
  onTogglePlay,
  onStop,
  onPrev,
  onNext,
  onSeek,
  onSpeed,
}: Props) {
  const percent = Math.round(progress * 1000) / 10;
  const timestamp = fmtDateTime(cursorTime);

  return (
    <section aria-label="Controles de reprodução" className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-xl border border-line bg-surface px-3 py-2.5">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "Pausar replay" : active ? "Continuar replay" : "Iniciar replay"}
          className="flex size-11 items-center justify-center rounded-lg bg-brand-strong text-white shadow-[0_0_20px_-6px_rgba(21,154,242,.9)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {playing ? <PauseGlyph size={20} /> : <PlayGlyph size={20} />}
        </button>
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Sinal anterior" className={iconButton}>
          <SkipBackGlyph size={18} />
        </button>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label="Próximo sinal" className={iconButton}>
          <SkipForwardGlyph size={18} />
        </button>
        <button type="button" onClick={onStop} disabled={!active} aria-label="Parar replay" className={iconButton}>
          <StopGlyph size={16} />
        </button>
      </div>

      <div className="order-last flex min-w-0 basis-full items-center md:order-none md:basis-0 md:flex-1">
        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={Math.round(progress * 1000)}
          onChange={(event) => onSeek(Number(event.target.value) / 1000)}
          aria-label="Posição do replay"
          aria-valuetext={`${percent}% — ${timestamp}`}
          style={{ background: `linear-gradient(to right, #159af2 ${percent}%, #1b3a54 ${percent}%)` }}
          className={cx(
            "h-1.5 w-full cursor-pointer appearance-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
            "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-strong",
            "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-strong",
          )}
        />
      </div>

      <div className="tabular flex items-center gap-4 text-[12.5px] text-fg-muted">
        <span>{timestamp}</span>
        <span aria-label="Tempo decorrido">
          {fmtDuration(progress * REPLAY_DURATION_SECONDS)} / {fmtDuration(REPLAY_DURATION_SECONDS)}
        </span>
      </div>

      <div role="group" aria-label="Velocidade de reprodução" className="flex gap-1">
        {SPEEDS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={speed === item.value}
            title={item.name}
            onClick={() => onSpeed(item.value)}
            className={cx(
              "h-8 min-w-10 rounded-md border px-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
              speed === item.value
                ? "border-brand bg-brand/20 text-fg"
                : "border-line bg-surface-2/50 text-fg-subtle hover:border-line-strong hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
