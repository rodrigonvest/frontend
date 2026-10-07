import type { TradeRecord } from "./api";

export const fmt = (v: number | null | undefined, d = 2) =>
  v == null || Number.isNaN(v) ? "—" : v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false });

export const signed = (v: number | null, suffix = "", d = 2) => (v == null ? "—" : `${v >= 0 ? "+" : ""}${fmt(v, d)}${suffix}`);

export const money = (v: number | null) => (v == null ? "—" : `${v >= 0 ? "+" : "-"}$${fmt(Math.abs(v))}`);

const parseDate = (v?: string | null) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const dt = (v?: string | null) => {
  const d = parseDate(v);
  if (!d) return v || "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(", ", " ");
};

export const time = (v?: string | null) => {
  const d = parseDate(v);
  if (!d) return v || "—";
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

export const meta = (t: TradeRecord): Record<string, unknown> => {
  try {
    const v = JSON.parse(t.metadata_json || "{}");
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
};

export const nmeta = (t: TradeRecord, keys: string[]) => {
  const m = meta(t);
  for (const k of keys) {
    const n = Number(m[k]);
    if (m[k] != null && m[k] !== "" && Number.isFinite(n)) return n;
  }
  return null;
};

export const text = (...values: unknown[]) => {
  for (const v of values) if (v != null && String(v).trim() !== "") return String(v);
  return "—";
};

export const PNL_KEYS = ["pnl", "pnl_ccy", "profit"];
export const R_KEYS = ["result_r", "r", "rr"];
export const EXIT_KEYS = ["exit_price", "close_price"];

export type StatusTone = "green" | "blue" | "amber" | "red" | "neutral";

export const statusTone = (s: string): StatusTone => {
  const x = s?.toUpperCase();
  if (x === "CLOSED") return "green";
  if (x === "OPEN" || x === "PARTIAL") return "blue";
  if (x === "PENDING") return "amber";
  if (x === "ERROR" || x === "CANCELLED") return "red";
  return "neutral";
};

const statusLabels: Record<string, string> = {
  CLOSED: "Fechada",
  OPEN: "Aberta",
  PARTIAL: "Parcial",
  PENDING: "Pendente",
  ERROR: "Erro",
  CANCELLED: "Cancelada",
};
export const statusLabel = (s: string) => statusLabels[s?.toUpperCase()] ?? s;

export const signColor = (v: number | null) => (v == null ? "text-fg-subtle" : v < 0 ? "text-danger" : "text-success");

export const channelName = (t: TradeRecord) => {
  const m = meta(t);
  return text(m.channel, m.source, t.receiver_id);
};

const csvCell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function tradesToCsv(trades: TradeRecord[]) {
  const header = ["trade_id", "data_hora", "canal", "simbolo", "tipo", "entrada", "saida", "sl", "tp", "resultado", "r", "pips", "lote", "conta", "status"];
  const lines = trades.map((t) => {
    const m = meta(t);
    return [
      t.trade_id,
      t.opened_at || t.created_at,
      channelName(t) === "—" ? "" : channelName(t),
      t.symbol,
      t.side,
      t.entry_price,
      nmeta(t, EXIT_KEYS),
      t.stop_loss,
      t.take_profit,
      nmeta(t, PNL_KEYS),
      nmeta(t, R_KEYS),
      nmeta(t, ["pips"]),
      t.volume,
      text(m.account, t.receiver_id) === "—" ? "" : text(m.account, t.receiver_id),
      t.status,
    ]
      .map(csvCell)
      .join(",");
  });
  return [header.join(","), ...lines].join("\n");
}
