import { cx } from "../UI";

const frame = "flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[.06]";

function Crown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden>
      <path d="M4 12 15 22 24 6l9 16 11-10-4 22H8L4 12Z" fill="currentColor" />
      <rect x="9" y="35" width="30" height="3.5" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export default function ChannelLogo({ name, avatarUrl, logoKey }: { name: string; avatarUrl?: string | null; logoKey?: string | null }) {
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt="" className={cx(frame, "object-cover")} />;
  }

  switch (logoKey) {
    case "crown":
      return (
        <span aria-hidden className={cx(frame, "bg-gradient-to-br from-[#3a2909] to-[#1b1205] text-[#f5c542]")}>
          <Crown className="w-10" />
        </span>
      );
    case "telegram":
      return (
        <span aria-hidden className={cx(frame, "bg-[#229ed9]")}>
          <svg viewBox="0 0 24 24" className="size-11" fill="none">
            <path d="M21.5 3.4 3.1 10.5c-.8.3-.8 1.4 0 1.7l4.7 1.8 1.8 5.5c.25.75 1.2.95 1.7.35l2.7-3.3 4.8 3.6c.65.5 1.6.12 1.75-.68l2.5-14.9c.15-.85-.68-1.52-1.55-1.17Z" fill="#fff" />
            <path d="m8.2 14 10.3-7.8-7.8 9.1" stroke="#229ed9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    case "fx":
      return (
        <span aria-hidden className={cx(frame, "bg-gradient-to-br from-[#9b6bff] to-[#6a35f0] text-[27px] font-black italic tracking-tighter text-white")}>
          FX
        </span>
      );
    case "ac":
      return (
        <span aria-hidden className={cx(frame, "bg-[#050505] text-[29px] font-black tracking-tighter text-[#d9a94b]")}>
          AC
        </span>
      );
    case "td":
      return (
        <span aria-hidden className={cx(frame, "flex-col gap-0 bg-[#050505]")}>
          <Crown className="mt-0.5 w-5 text-[#f5c542]" />
          <span className="-mt-0.5 text-[30px] font-black leading-none tracking-tighter text-[#e5192b]">TD</span>
        </span>
      );
    case "sniper":
      return (
        <span aria-hidden className={cx(frame, "bg-[#050505]")}>
          <svg viewBox="0 0 48 48" className="size-11" fill="none">
            <path d="M24 5 41 43H31L24 27l-7 16H7L24 5Z" fill="#fff" />
            <path d="M24 17 29 29h-10l5-12Z" fill="#050505" />
            <path d="M10 36h28" stroke="#050505" strokeWidth="3" />
          </svg>
        </span>
      );
    case "bars":
      return (
        <span aria-hidden className={cx(frame, "border-brand/30 bg-[#0a2a4a] text-[#1e9bff]")}>
          <svg viewBox="0 0 40 40" className="size-10" fill="currentColor">
            <rect x="5" y="22" width="7.5" height="13" rx="1.5" />
            <rect x="16" y="13" width="7.5" height="22" rx="1.5" />
            <rect x="27" y="4" width="7.5" height="31" rx="1.5" />
          </svg>
        </span>
      );
    case "g":
      return (
        <span aria-hidden className={cx(frame, "bg-[#050505] text-[40px] font-black leading-none text-white")}>
          G
        </span>
      );
    default:
      return (
        <span aria-hidden className={cx(frame, "bg-surface-3 text-[22px] font-bold text-fg-muted")}>
          {initials(name) || "?"}
        </span>
      );
  }
}
