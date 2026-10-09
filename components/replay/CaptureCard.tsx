import { Icon } from "../Icons";
import { fmtShortDateTime, type ReplaySignal } from "../../lib/replay-data";
import { AssetBadge, FlameGlyph, HeartGlyph, ThumbGlyph } from "./RpPrimitives";

export default function CaptureCard({ signal, channelName }: { signal: ReplaySignal; channelName: string }) {
  return (
    <div className="rounded-xl border border-line-strong bg-canvas/70 p-3">
      <div className="flex gap-3">
        <AssetBadge asset={signal.asset} size={36} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[13px] font-semibold text-brand">{channelName}</span>
            <time className="tabular shrink-0 text-[11px] text-fg-subtle">{fmtShortDateTime(signal.time)}</time>
          </div>
          <p className="mt-1.5 whitespace-pre-line font-mono text-[12px] leading-[1.45] text-fg-muted">{signal.comment.join("\n")}</p>
        </div>
      </div>
      <div className="tabular mt-3 flex items-center gap-4 text-[12px] text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <FlameGlyph className="text-[#ff8a3d]" />
          {signal.reactions.fire}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ThumbGlyph className="text-warning" />
          {signal.reactions.like}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <HeartGlyph className="text-danger" />
          {signal.reactions.heart}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-fg-subtle">
          <Icon name="eye" size={14} />
          {signal.views >= 1000 ? `${(signal.views / 1000).toFixed(1)}K` : signal.views}
        </span>
      </div>
    </div>
  );
}
