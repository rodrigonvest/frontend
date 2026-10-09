const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export function CheckCircle({ size = 16, done = true }: { size?: number; done?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base} className={done ? "text-success" : "text-fg-subtle"}>
      <circle cx="12" cy="12" r="9.5" fill={done ? "rgba(18,217,158,.14)" : "none"} />
      {done && <path d="m7.5 12.3 3 3L16.5 9" strokeWidth={2.3} />}
      {!done && <path d="m8.5 12.3 2.5 2.5 4.5-5" strokeWidth={1.8} opacity={0.7} />}
    </svg>
  );
}

export function XCircle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base} className="text-danger">
      <circle cx="12" cy="12" r="9.5" fill="rgba(255,93,109,.14)" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  );
}

export function TargetCircle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...base} className="text-success">
      <circle cx="12" cy="12" r="9.5" fill="rgba(18,217,158,.14)" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function BoltIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 2 4.5 13.5h6L9.5 22l9-11.5h-6L13.5 2Z" />
    </svg>
  );
}

export function PieIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11 3.1A9 9 0 1 0 20.9 13H11V3.1Z" />
      <path d="M13 2.1V11h8.9A9 9 0 0 0 13 2.1Z" opacity=".7" />
    </svg>
  );
}

export function GoldLogo({ size = 20 }: { size?: number }) {
  return (
    <span aria-hidden className="inline-flex shrink-0 items-center justify-center rounded-[5px] bg-[#e8a527]/20 text-[#f0b429]" style={{ width: size, height: size }}>
      <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 2 8 7-8 13L4 9l8-7Z" opacity=".95" />
        <path d="M12 7 8.5 10 12 16l3.5-6L12 7Z" fill="#0a1b2b" opacity=".55" />
      </svg>
    </span>
  );
}

export function TelegramSquare({ size = 20 }: { size?: number }) {
  return (
    <span aria-hidden className="inline-flex shrink-0 items-center justify-center rounded-[5px] bg-[#2aa3ee] text-white" style={{ width: size, height: size }}>
      <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 3.4 3.1 10.5c-.8.3-.8 1.4 0 1.7l4.7 1.8 1.8 5.5c.25.75 1.2.95 1.7.35l2.7-3.3 4.8 3.6c.65.5 1.6.12 1.75-.68l2.5-14.9c.15-.85-.68-1.52-1.55-1.17Z" />
      </svg>
    </span>
  );
}
