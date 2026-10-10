import { Icon } from "../Icons";
import { cx } from "../UI";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import type { RoadmapStatus, RoadmapVersion } from "../../lib/roadmap-data";
import { TONES } from "./tones";

export const toggleId = (versionId: string) => `roadmap-toggle-${versionId}`;
const panelId = (versionId: string) => `roadmap-panel-${versionId}`;

const NODE_ICONS: Record<RoadmapStatus, string | null> = { delivered: "check", developing: null, planned: "clock", future: "sparkles" };

function TimelineNode({ status }: { status: RoadmapStatus }) {
  const tone = TONES[status];
  const icon = NODE_ICONS[status];
  return (
    <span
      className={cx(
        "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2",
        status === "developing" ? "size-6 ring-4 ring-brand/25" : "size-7 bg-canvas",
        tone.node,
      )}
    >
      {icon ? <Icon name={icon} size={14} stroke={2.8} /> : <span className="size-2 rounded-full bg-white" />}
    </span>
  );
}

function ItemMarker({ status }: { status: RoadmapStatus }) {
  if (status === "delivered") {
    return (
      <span aria-hidden className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-[5px] bg-success text-canvas">
        <Icon name="check" size={13} stroke={3.2} />
      </span>
    );
  }
  return <span aria-hidden className={cx("mt-px size-[18px] shrink-0 rounded-full border-2", status === "developing" ? "border-brand" : status === "planned" ? "border-[#f5a524]" : "border-[#9b63ff]")} />;
}

function VersionRow({ version, open, last, onToggle }: { version: RoadmapVersion; open: boolean; last: boolean; onToggle: () => void }) {
  const tone = TONES[version.status];
  const titleId = `roadmap-title-${version.id}`;

  return (
    <li className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 sm:grid-cols-[92px_32px_minmax(0,1fr)] sm:gap-x-4">
      <div className="col-start-2 row-start-1 flex flex-wrap items-baseline gap-x-2 pb-2 sm:col-start-1 sm:block sm:pb-0 sm:pt-3">
        <p className="text-[22px] font-semibold leading-6 tracking-tight text-fg">{version.version}</p>
        <p className={cx("text-[13px] font-medium leading-5", tone.text)}>{version.stage}</p>
        <p className="text-[13px] leading-5 text-fg-muted">{version.date}</p>
      </div>

      <div aria-hidden className="relative col-start-1 row-span-2 row-start-1 flex justify-center sm:col-start-2 sm:row-span-1 sm:pt-4">
        {!last && <span className={cx("absolute -bottom-4 top-4 w-0.5 -translate-x-1/2 left-1/2", tone.line)} />}
        <span className="relative z-10 mt-0.5 sm:mt-0">
          <TimelineNode status={version.status} />
        </span>
      </div>

      <article
        aria-labelledby={titleId}
        className={cx(
          "@container col-start-2 row-start-2 min-w-0 rounded-xl border bg-gradient-to-b from-surface-2/70 to-surface backdrop-blur-sm sm:col-start-3 sm:row-start-1",
          version.highlighted ? "border-[#9b63ff]/70 shadow-[0_0_34px_-8px_rgba(155,99,255,.65)]" : "border-line shadow-[0_0_34px_-24px_rgba(21,154,242,.7)]",
        )}
      >
        <h3 className="m-0">
          <button
            type="button"
            id={toggleId(version.id)}
            aria-expanded={open}
            aria-controls={panelId(version.id)}
            onClick={onToggle}
            className={cx("flex w-full items-center gap-3 rounded-xl p-4 text-left", FOCUS_RING)}
          >
            <span aria-hidden className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl border", tone.tile)}>
              <Icon name={version.icon} size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span id={titleId} className="text-[16px] font-semibold leading-5 tracking-tight text-fg">
                  {version.title}
                </span>
                {version.badge && (
                  <span className="rounded-md border border-success/60 bg-success/10 px-2 py-0.5 text-[11.5px] font-semibold leading-4 text-success">{version.badge}</span>
                )}
              </span>
              <span className="mt-0.5 block text-pretty text-[13px] leading-5 text-fg-muted">{version.description}</span>
            </span>
            <span className={cx("hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[12px] font-medium min-[560px]:inline-flex", tone.pill)}>
              <span aria-hidden className={cx("size-2 rounded-full", tone.dot)} />
              {tone.label}
            </span>
            <span aria-hidden className={cx("flex shrink-0 text-fg-muted transition-transform duration-200 motion-reduce:transition-none", open ? "-rotate-90" : "rotate-90")}>
              <Icon name="chevron" size={18} />
            </span>
          </button>
        </h3>

        <div
          id={panelId(version.id)}
          inert={!open}
          className={cx("grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
        >
          <div className="min-h-0 overflow-hidden">
            <ul
              aria-label={`Itens da versão ${version.version}`}
              className="grid gap-x-6 gap-y-2.5 px-4 pb-4 pt-0.5 @[560px]:grid-cols-2 @[860px]:grid-cols-3"
            >
              {version.items.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2.5 text-[13.5px] leading-5 text-fg">
                  <ItemMarker status={version.status} />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function Timeline({ versions, openIds, onToggle }: { versions: RoadmapVersion[]; openIds: ReadonlySet<string>; onToggle: (id: string) => void }) {
  return (
    <ol className="flex flex-col gap-4">
      {versions.map((version, index) => (
        <VersionRow key={version.id} version={version} open={openIds.has(version.id)} last={index === versions.length - 1} onToggle={() => onToggle(version.id)} />
      ))}
    </ol>
  );
}
