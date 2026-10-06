import { cx } from "../UI";

const palette = [
  "bg-brand/20 text-[#5cc2ff]",
  "bg-success/18 text-success",
  "bg-warning/18 text-warning",
  "bg-danger/18 text-[#ff8a96]",
  "bg-[#7c6cff]/20 text-[#a99fff]",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function ChannelAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const clean = name === "—" ? "" : name.trim();
  const initial = clean ? clean.replace(/^[^\p{L}\p{N}]+/u, "").charAt(0).toUpperCase() || "?" : "?";
  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-md font-bold",
        size === "sm" ? "size-5 text-[10px]" : "size-6 text-[11px]",
        clean ? palette[hash(clean) % palette.length] : "bg-surface-3 text-fg-subtle",
      )}
    >
      {initial}
    </span>
  );
}
