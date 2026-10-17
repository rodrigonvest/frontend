import Image from "next/image";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { HELP_IDS, VIDEOS, type Video } from "../../lib/help-data";
import { PlayIcon } from "./HelpIcons";
import { HelpSection, SectionLink } from "./HelpSection";

const THUMBNAILS: Record<string, string> = {
  "video-telegram": "/help/video-telegram.png",
  "video-mt": "/help/video-mt.png",
  "video-system": "/help/video-system.png",
};

export function VideoThumbnail({ video, sizes, children }: { video: Video; sizes: string; children?: React.ReactNode }) {
  return (
    <span className="relative block aspect-video w-full overflow-hidden rounded-lg border border-line-strong bg-surface-2">
      <Image src={THUMBNAILS[video.id]} alt="" fill sizes={sizes} className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      {children}
    </span>
  );
}

export default function VideosSection({
  onOpen,
  onViewAll,
}: {
  onOpen: (video: Video, trigger: HTMLElement) => void;
  onViewAll: () => void;
}) {
  return (
    <HelpSection
      id={HELP_IDS.videos}
      title="Tutoriais em Vídeo"
      action={<SectionLink label="Ver todos os vídeos" hint="Ver todos os tutoriais em vídeo" onClick={onViewAll} />}
    >
      <ul className="mt-3 grid gap-4 @2xl:grid-cols-3">
        {VIDEOS.map((video) => (
          <li key={video.id} className="min-w-0">
            <button
              type="button"
              onClick={(event) => onOpen(video, event.currentTarget)}
              aria-label={`Assistir ${video.title}, ${video.subtitle}, duração ${video.duration}`}
              className={cx("group block w-full rounded-lg text-left", FOCUS_RING)}
            >
              <VideoThumbnail video={video} sizes="(min-width: 1536px) 260px, (min-width: 768px) 30vw, 100vw">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-strong/95 pl-0.5 text-white shadow-[0_0_26px_rgba(21,154,242,.75)] transition-transform group-hover:scale-110"
                >
                  <PlayIcon size={20} />
                </span>
                <span aria-hidden className="tabular absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11.5px] font-medium leading-4 text-white">
                  {video.duration}
                </span>
              </VideoThumbnail>
              <span className="mt-2.5 block text-[14px] font-semibold leading-5 text-fg">{video.title}</span>
              <span className="block text-[12.5px] leading-5 text-fg-muted">{video.subtitle}</span>
            </button>
          </li>
        ))}
      </ul>
    </HelpSection>
  );
}
