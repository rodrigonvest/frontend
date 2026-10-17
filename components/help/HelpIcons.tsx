interface GlyphProps {
  size?: number;
  className?: string;
}

function Glyph({ size = 18, className, children, fill = "none" }: GlyphProps & { children: React.ReactNode; fill?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function PaperclipIcon(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="m21.4 11.6-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.5 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8" />
    </Glyph>
  );
}

export function PlayIcon(props: GlyphProps) {
  return (
    <Glyph {...props} fill="currentColor">
      <path d="M8 5.5v13l11-6.5Z" />
    </Glyph>
  );
}

export function PauseIcon(props: GlyphProps) {
  return (
    <Glyph {...props} fill="currentColor">
      <rect x="6.5" y="5" width="4" height="14" rx="1" />
      <rect x="13.5" y="5" width="4" height="14" rx="1" />
    </Glyph>
  );
}

export function MailIcon(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </Glyph>
  );
}

export function DiscordIcon(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M7.5 6.6c1.4-.6 2.9-.9 4.5-.9s3.1.3 4.5.9c1.5 2.3 2.4 4.9 2.7 8-1.2 1-2.7 1.7-4.3 2l-1-1.6c.5-.2 1-.4 1.4-.7-.3-.2-.6-.4-.9-.5-2.3 1-4.7 1-7 0-.3.1-.6.3-.9.5.4.3.9.5 1.4.7l-1 1.6c-1.6-.3-3.1-1-4.3-2 .3-3.1 1.200-5.700 2.700-8Z" />
      <circle cx="9.3" cy="12" r="1" fill="currentColor" />
      <circle cx="14.7" cy="12" r="1" fill="currentColor" />
    </Glyph>
  );
}
