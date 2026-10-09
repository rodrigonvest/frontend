"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Shell from "../Shell";
import { cx } from "../UI";
import {
  DEFAULT_CHANNEL_ID,
  DEFAULT_PERIOD_ID,
  DEFAULT_SIGNAL_ID,
  INITIAL_PROGRESS,
  REPLAY_DURATION_SECONDS,
  buildSession,
  channels,
  type IndicatorId,
  type TimeframeId,
} from "../../lib/replay-data";
import { CANDLE_COUNT, buildCandles, timeAtProgress } from "../../lib/replay-chart";
import { defaultChartSettings, type ChartSettings } from "./CandleChart";
import ChartPanel from "./ChartPanel";
import PlaybackBar from "./PlaybackBar";
import ReplayHeader from "./ReplayHeader";
import ReplayStats from "./ReplayStats";
import ReplayTabs, { type ReplayTabId } from "./ReplayTabs";
import SignalPanel from "./SignalPanel";

export default function ReplayView() {
  const [channelId, setChannelId] = useState(DEFAULT_CHANNEL_ID);
  const [periodId, setPeriodId] = useState(DEFAULT_PERIOD_ID);
  const [selectedId, setSelectedId] = useState(DEFAULT_SIGNAL_ID);
  const [tf, setTf] = useState<TimeframeId>("M5");
  const [speed, setSpeed] = useState(1);
  const [showAllTps, setShowAllTps] = useState(true);
  const [indicators, setIndicators] = useState<IndicatorId[]>([]);
  const [settings, setSettings] = useState<ChartSettings>(defaultChartSettings);
  const [tab, setTab] = useState<ReplayTabId>("list");
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  const session = useMemo(() => buildSession(channelId, periodId), [channelId, periodId]);
  const channel = channels.find((item) => item.id === channelId) ?? channels[0];
  const selectedIndex = Math.max(0, session.signals.findIndex((signal) => signal.id === selectedId));
  const selected = session.signals[selectedIndex];
  const candles = useMemo(() => buildCandles(selected, tf), [selected, tf]);

  const visibleCount = active ? Math.min(CANDLE_COUNT, Math.floor(progress * (CANDLE_COUNT - 1)) + 1) : CANDLE_COUNT;
  const cursorTime = timeAtProgress(selected, tf, progress);

  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      let finished = false;
      setProgress((value) => {
        const next = value + (delta * speedRef.current) / REPLAY_DURATION_SECONDS;
        if (next >= 1) {
          finished = true;
          return 1;
        }
        return next;
      });
      if (finished) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setFullscreen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  const stop = useCallback(() => {
    setPlaying(false);
    setActive(false);
    setProgress(INITIAL_PROGRESS);
  }, []);

  const selectSignal = useCallback(
    (id: number) => {
      setSelectedId(id);
      stop();
    },
    [stop],
  );

  const playSignal = (id: number) => {
    setSelectedId(id);
    setProgress(0);
    setActive(true);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (!active || progress >= 0.999) setProgress(0);
    setActive(true);
    setPlaying(true);
  };

  const changeChannel = (id: string) => {
    setChannelId(id);
    setSelectedId(DEFAULT_SIGNAL_ID);
    stop();
  };

  const changePeriod = (id: string) => {
    setPeriodId(id);
    setSelectedId(DEFAULT_SIGNAL_ID);
    stop();
  };

  const seek = (value: number) => {
    setActive(true);
    setProgress(value);
  };

  const goPrev = () => selectedIndex > 0 && selectSignal(session.signals[selectedIndex - 1].id);
  const goNext = () => selectedIndex < session.signals.length - 1 && selectSignal(session.signals[selectedIndex + 1].id);

  return (
    <Shell wide>
      <div className="flex flex-col gap-4">
        <ReplayHeader
          channelId={channelId}
          periodId={periodId}
          speed={speed}
          active={active}
          playing={playing}
          onChannel={changeChannel}
          onPeriod={changePeriod}
          onSpeed={setSpeed}
          onTogglePlay={togglePlay}
        />

        <ReplayStats summary={session.summary} />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className={cx(fullscreen && "fixed inset-0 z-50 flex flex-col gap-3 bg-canvas p-3 sm:p-5")}>
              <ChartPanel
                signal={selected}
                tf={tf}
                candles={candles}
                visibleCount={visibleCount}
                replayActive={active}
                showAllTps={showAllTps}
                indicators={indicators}
                settings={settings}
                fullscreen={fullscreen}
                onTf={setTf}
                onShowAllTps={setShowAllTps}
                onIndicators={setIndicators}
                onSettings={setSettings}
                onFullscreen={() => setFullscreen((value) => !value)}
              />
              <PlaybackBar
                playing={playing}
                active={active}
                progress={progress}
                speed={speed}
                cursorTime={cursorTime}
                canPrev={selectedIndex > 0}
                canNext={selectedIndex < session.signals.length - 1}
                onTogglePlay={togglePlay}
                onStop={stop}
                onPrev={goPrev}
                onNext={goNext}
                onSeek={seek}
                onSpeed={setSpeed}
              />
            </div>

            <ReplayTabs
              tab={tab}
              onTab={setTab}
              session={session}
              selected={selected}
              channelName={channel.name}
              onSelect={selectSignal}
              onPlay={playSignal}
            />
          </div>

          <aside aria-label="Sinal selecionado" className="min-w-0">
            <SignalPanel
              signal={selected}
              index={selectedIndex}
              total={session.signals.length}
              channelName={channel.name}
              onPrev={goPrev}
              onNext={goNext}
            />
          </aside>
        </div>
      </div>
    </Shell>
  );
}
