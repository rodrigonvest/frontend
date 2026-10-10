import type { ReactNode } from "react";
import { Icon } from "../Icons";

const LOCAL_ICONS: Record<string, ReactNode> = {
  infinity: <path d="M6 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c4 0 6-8 12-8 2.2 0 4 1.8 4 4s-1.8 4-4 4c-6 0-8-8-12-8Z" />,
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.5 1.5 5.5 5 5.5 9l-2 3.5h-7L6.5 12c0-4 2-7.5 5.5-9Z" />
      <circle cx="12" cy="9.5" r="1.6" />
      <path d="m6.5 12-2.5 3 3 .5M17.5 12l2.5 3-3 .5" />
      <path d="M10 18.5 12 21l2-2.5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
};

export function BillingIcon({ name, size = 18, stroke = 1.8 }: { name: string; size?: number; stroke?: number }) {
  const local = LOCAL_ICONS[name];
  if (!local) return <Icon name={name} size={size} stroke={stroke} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {local}
    </svg>
  );
}

export function PixMark({ size = 28 }: { size?: number }) {
  const diamonds: Array<[number, number]> = [
    [12, 5],
    [12, 19],
    [5, 12],
    [19, 12],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {diamonds.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx - 3} y={cy - 3} width="6" height="6" rx="1.2" transform={`rotate(45 ${cx} ${cy})`} />
      ))}
    </svg>
  );
}
