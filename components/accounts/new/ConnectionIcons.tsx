const paths = {
  play: <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" stroke="none" />,
  pie: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" fill="currentColor" fillOpacity=".25" />
      <path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z" fill="currentColor" />
    </>
  ),
  donut: (
    <>
      <circle cx="12" cy="12" r="8" strokeWidth="3.4" strokeOpacity=".3" />
      <path d="M12 4a8 8 0 0 1 8 8" strokeWidth="3.4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </>
  ),
  platform: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <path d="M17 13.5v7M13.5 17h7" />
    </>
  ),
  investor: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3.5 20.5v-1A5.5 5.5 0 0 1 9 14h2" />
      <path d="m14.5 18 2 2 4-4.5" />
    </>
  ),
  robot: (
    <>
      <rect x="4.5" y="8" width="15" height="11" rx="3" />
      <path d="M12 8V4.5M12 4.5h.01" />
      <path d="M9 13h.01M15 13h.01M9.5 16.5h5" />
      <path d="M2.5 12.5v3M21.5 12.5v3" />
    </>
  ),
  clockSolid: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
} as const;

export type ConnectionIconName = keyof typeof paths;

export default function ConnectionIcon({ name, size = 20 }: { name: ConnectionIconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
