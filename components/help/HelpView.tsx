"use client";
import { useState } from "react";
import { ToastRegion, useToast } from "../api-access/Toast";
import PageHeader from "../PageHeader";
import { Button } from "../UI";
import {
  ARTICLES,
  HELP_DESCRIPTION,
  HELP_IDS,
  HELP_TITLE,
  VIDEOS,
  type Article,
  type QuickLinkId,
  type SearchResult,
  type Video,
} from "../../lib/help-data";
import ArticlesSection from "./ArticlesSection";
import ChannelsCard from "./ChannelsCard";
import { ArticleDialog, VideoDialog } from "./HelpDialogs";
import QuickLinks from "./QuickLinks";
import SearchCard from "./SearchCard";
import StatusCard from "./StatusCard";
import SupportCard from "./SupportCard";
import VideosSection from "./VideosSection";

function goToSection(id: string, focusId = `${id}-title`) {
  const section = document.getElementById(id);
  if (!section) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  document.getElementById(focusId)?.focus({ preventScroll: true });
}

export default function HelpView() {
  const { toast, notify } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const openArticle = (item: Article, element: HTMLElement) => {
    setTrigger(element);
    setArticle(item);
  };
  const openVideo = (item: Video, element: HTMLElement) => {
    setTrigger(element);
    setVideo(item);
  };

  const openResult = (result: SearchResult, element: HTMLElement) => {
    if (result.kind === "article") {
      const found = ARTICLES.find((item) => item.id === result.id);
      if (found) openArticle(found, element);
    } else {
      const found = VIDEOS.find((item) => item.id === result.id);
      if (found) openVideo(found, element);
    }
  };

  const focusSupport = () => goToSection(HELP_IDS.support, HELP_IDS.supportSubject);

  const selectQuickLink = (id: QuickLinkId) => {
    if (id === "articles") goToSection(HELP_IDS.articles);
    else if (id === "videos") goToSection(HELP_IDS.videos);
    else if (id === "contact") focusSupport();
    else {
      goToSection(HELP_IDS.channels, HELP_IDS.discordChannel);
      notify("Comunidade no Discord: link demonstrativo, nada é aberto.", "info");
    }
  };

  return (
    <div className="min-w-0">
      <PageHeader
        title={HELP_TITLE}
        description={HELP_DESCRIPTION}
        actions={
          <Button
            onClick={() => goToSection(HELP_IDS.status)}
            className="h-11 gap-2.5 border-brand/50 px-5 text-[13.5px] font-medium"
          >
            <span aria-hidden className="size-2.5 rounded-full bg-success shadow-[0_0_10px_rgba(18,217,158,.8)]" />
            Ver Status dos Serviços
          </Button>
        }
      />

      <div className="flex min-w-0 flex-col gap-5">
        <QuickLinks onSelect={selectQuickLink} />

        <div className="grid min-w-0 gap-5 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(0,460px)] min-[1500px]:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          <div className="flex min-w-0 flex-col gap-5">
            <SearchCard onOpenResult={openResult} onContact={focusSupport} />
            <ArticlesSection
              onOpen={openArticle}
              onViewAll={() => notify("Catálogo completo de artigos indisponível na demonstração.", "info")}
            />
            <VideosSection
              onOpen={openVideo}
              onViewAll={() => notify("Biblioteca completa de vídeos indisponível na demonstração.", "info")}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <StatusCard
              onSelectService={(service) => notify(`${service.name}: operacional (dados demonstrativos).`, "info")}
              onViewStatusPage={() => notify("Página de status externa indisponível na demonstração.", "info")}
            />
            <SupportCard onSent={(subject) => notify(`Ticket sobre ${subject} registrado (demonstrativo, nada foi enviado).`, "success")} />
            <ChannelsCard onSelect={(channel) => notify(`${channel.title}: canal demonstrativo, nada é aberto.`, "info")} />
          </div>
        </div>
      </div>

      <ArticleDialog article={article} trigger={trigger} onClose={() => setArticle(null)} />
      <VideoDialog video={video} trigger={trigger} onClose={() => setVideo(null)} />
      <ToastRegion toast={toast} />
    </div>
  );
}
