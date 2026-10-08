import type { ReactNode } from "react";

type SvgProps = { size?: number; stroke?: number; className?: string };

function Svg({ size = 18, stroke = 1.8, className, children }: SvgProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function MoonIcon({ size = 40 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a.6.6 0 0 0-.8-.7A9.2 9.2 0 1 0 20.9 15.4a.6.6 0 0 0-.7-.8Z" />
    </svg>
  );
}

export function SunIcon({ size = 40, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </Svg>
  );
}

export function MonitorIcon({ size = 40, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.500v4" />
    </Svg>
  );
}

export function BrushIcon({ size = 30, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M19.500 3.500 11 12l2 2 8.500-8.500a1.400 1.400 0 0 0 0-2 1.400 1.400 0 0 0-2 0Z" />
      <path d="M9.500 13.500C7 13.500 5.500 15 5.500 17c0 1.300-.8 2.200-2 2.700 3.600 1.200 8.200-.2 8.200-4" />
    </Svg>
  );
}

export function ImageIcon({ size = 30, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="3" y="4" width="18" height="16" rx="2.500" />
      <circle cx="8.500" cy="9.500" r="1.600" />
      <path d="m3.500 17 5-4.500 4 3.500 3-2.500 5 4" />
    </Svg>
  );
}

export function EyeIcon({ size = 30, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function EyeDropperIcon({ size = 18, stroke = 1.8 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="m12 8 4 4" />
      <path d="m5 19 1-4 8-8 3 3-8 8-4 1Z" />
      <path d="m15 5 1.500-1.500a2.100 2.100 0 0 1 3 3L18 8" />
    </Svg>
  );
}

export function SparkleIcon({ size = 18, stroke = 1.8 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M12 3.500 13.800 9l5.700 1.800-5.700 1.800L12 18.200l-1.800-5.600L4.500 10.800 10.200 9 12 3.500Z" />
      <path d="M19 3v3M17.500 4.500h3" />
    </Svg>
  );
}

export function CheckIcon({ size = 14, stroke = 3.2 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="m5 12.500 4.500 4.500L19 7.500" />
    </Svg>
  );
}

export function TypographyIcon({ size = 30 }: { size?: number }) {
  return (
    <span aria-hidden className="inline-flex items-baseline font-semibold leading-none tracking-tight text-brand" style={{ fontSize: size * 0.82 }}>
      A<span style={{ fontSize: size * 0.56 }}>a</span>
    </span>
  );
}

export function SidebarLayoutIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="3.500" width="8" height="17" rx="1.800" />
      <rect x="13" y="3.500" width="8" height="8" rx="1.800" />
      <rect x="13" y="13.500" width="8" height="7" rx="1.800" opacity=".75" />
    </svg>
  );
}

export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 27 27" fill="none" aria-hidden>
      <path d="M22.600 9.200a9.800 9.800 0 1 1-4.100-4.100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="m8 13.800 3.200 3.200L22.700 5.500" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
