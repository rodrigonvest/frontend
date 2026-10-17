"use client";
import { useEffect, useState } from "react";
import Dialog from "../api-access/Dialog";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { Button } from "../UI";
import type { Article, Video } from "../../lib/help-data";
import { PauseIcon, PlayIcon } from "./HelpIcons";
import { VideoThumbnail } from "./VideosSection";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function ArticleDialog({ article, trigger, onClose }: { article: Article | null; trigger: HTMLElement | null; onClose: () => void }) {
  return (
    <Dialog
      open={article !== null}
      title={article?.title ?? ""}
      description={article ? `${article.description} Conteúdo demonstrativo, sem conexão com a documentação real.` : undefined}
      icon="book"
      accent="blue"
      returnFocusTo={trigger}
      onClose={onClose}
    >
      <ol className="flex flex-col gap-2.5">
        {article?.steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-[13.5px] leading-5 text-fg-muted">
            <span aria-hidden className="tabular flex size-6 shrink-0 items-center justify-center rounded-full border border-brand/50 bg-brand/10 text-[12px] font-semibold text-brand">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex justify-end">
        <PrimaryButton data-autofocus onClick={onClose}>
          Fechar
        </PrimaryButton>
      </div>
    </Dialog>
  );
}

function Player({ video, onClose }: { video: Video; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setElapsed((current) => {
        if (current + 1 >= video.durationSeconds) {
          setPlaying(false);
          return video.durationSeconds;
        }
        return current + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, video.durationSeconds]);

  const percent = Math.round((elapsed / video.durationSeconds) * 100);
  const finished = elapsed >= video.durationSeconds;

  return (
    <div>
      <VideoThumbnail video={video} sizes="480px">
        <button
          type="button"
          data-autofocus
          onClick={() => {
            if (finished) setElapsed(0);
            setPlaying((current) => !current);
          }}
          aria-label={playing ? "Pausar vídeo" : finished ? "Assistir novamente" : "Reproduzir vídeo"}
          className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-strong/95 text-white shadow-[0_0_26px_rgba(21,154,242,.75)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
        </button>
      </VideoThumbnail>
      <div className="mt-3 flex items-center gap-3">
        <span
          role="progressbar"
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${formatTime(elapsed)} de ${video.duration}`}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3"
        >
          <span className="block h-full rounded-full bg-brand transition-[width] duration-700 ease-linear" style={{ width: `${percent}%` }} />
        </span>
        <span className="tabular shrink-0 text-[12px] text-fg-muted">
          {formatTime(elapsed)} / {video.duration}
        </span>
      </div>
      <h3 className="mt-4 text-[13.5px] font-semibold text-fg">Neste tutorial</h3>
      <ul className="mt-1.5 flex flex-col gap-1 text-[13px] leading-5 text-fg-muted">
        {video.chapters.map((chapter) => (
          <li key={chapter} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
            {chapter}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex justify-end">
        <Button onClick={onClose} className="h-10 px-5">
          Fechar
        </Button>
      </div>
    </div>
  );
}

export function VideoDialog({ video, trigger, onClose }: { video: Video | null; trigger: HTMLElement | null; onClose: () => void }) {
  return (
    <Dialog
      open={video !== null}
      title={video?.title ?? ""}
      description="Reprodução demonstrativa: nenhum vídeo real é carregado."
      icon="replay"
      accent="purple"
      returnFocusTo={trigger}
      onClose={onClose}
    >
      {video && <Player video={video} onClose={onClose} />}
    </Dialog>
  );
}
