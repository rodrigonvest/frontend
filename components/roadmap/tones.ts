import type { RoadmapStatus } from "../../lib/roadmap-data";

export interface StatusTone {
  label: string;
  hex: string;
  text: string;
  tile: string;
  pill: string;
  node: string;
  line: string;
  filterActive: string;
  dot: string;
}

export const TONES: Record<RoadmapStatus, StatusTone> = {
  delivered: {
    label: "Entregue",
    hex: "#12d99e",
    text: "text-success",
    tile: "border-success/40 bg-success/10 text-success",
    pill: "border-success/60 bg-success/10 text-success",
    node: "border-success text-success shadow-[0_0_14px_rgba(18,217,158,.45)]",
    line: "bg-success/70",
    filterActive: "border-success/70 bg-success/10 text-fg",
    dot: "bg-success",
  },
  developing: {
    label: "Em desenvolvimento",
    hex: "#159af2",
    text: "text-brand",
    tile: "border-brand/40 bg-brand/10 text-brand",
    pill: "border-brand/60 bg-brand/10 text-[#5cc2ff]",
    node: "border-brand bg-brand text-white shadow-[0_0_16px_rgba(21,154,242,.7)]",
    line: "bg-brand/50",
    filterActive: "border-brand/70 bg-brand/10 text-fg",
    dot: "bg-brand",
  },
  planned: {
    label: "Planejada",
    hex: "#f5a524",
    text: "text-[#f5a524]",
    tile: "border-[#f5a524]/40 bg-[#f5a524]/10 text-[#f5a524]",
    pill: "border-[#f5a524]/60 bg-[#f5a524]/10 text-[#f5a524]",
    node: "border-[#f5a524] text-[#f5a524] shadow-[0_0_14px_rgba(245,165,36,.4)]",
    line: "bg-line-strong",
    filterActive: "border-[#f5a524]/70 bg-[#f5a524]/10 text-fg",
    dot: "bg-[#f5a524]",
  },
  future: {
    label: "Ideia futura",
    hex: "#a77bff",
    text: "text-[#a77bff]",
    tile: "border-[#9b63ff]/40 bg-[#9b63ff]/10 text-[#a77bff]",
    pill: "border-[#9b63ff]/60 bg-[#9b63ff]/10 text-[#a77bff]",
    node: "border-[#9b63ff] text-[#a77bff] shadow-[0_0_14px_rgba(155,99,255,.4)]",
    line: "bg-line-strong",
    filterActive: "border-[#9b63ff]/70 bg-[#9b63ff]/10 text-fg",
    dot: "bg-[#9b63ff]",
  },
};
