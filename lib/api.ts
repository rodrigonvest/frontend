const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`, { cache: "no-store" });
  if (!response.ok) throw new Error(`API health check failed: ${response.status}`);
  return response.json();
}

export type DashboardData = {
  updated_at: string;
  total_executed_trades: number;
  active_accounts: number;
  active_automations: number;
  top_symbol: string | null;
  top_symbol_share: number;
  trades_over_time: Array<{ date: string; count: number }>;
  top_symbols: Array<{ symbol: string; name?: string; count: number; share: number }>;
  trades_per_automation: Array<{ name: string; count: number }>;
  trades_per_account: Array<{ name: string; count: number }>;
  telegram_channels: Array<{ name: string; count: number }>;
  recent_activity: Array<{ type: string; name: string; status: string; time: string }>;
  system_status: { core: string; telegram: string; execution: string; event_journal: string };
};

export async function getDashboard(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Dashboard request failed: ${response.status}`);
  return response.json();
}

export type TradeRecord = {
  trade_id: string;
  signal_id: string;
  receiver_id?: string | null;
  symbol: string;
  side: string;
  volume: number;
  entry_price?: number | null;
  stop_loss?: number | null;
  take_profit?: number | null;
  status: string;
  order_ticket?: number | null;
  position_ticket?: number | null;
  created_at: string;
  updated_at: string;
  opened_at?: string | null;
  closed_at?: string | null;
  parent_trade_id?: string | null;
  leg_index?: number | null;
  metadata_json?: string | null;
};

export type TradeSummary = {
  total: number;
  open: number;
  partial: number;
  closed: number;
  pending: number;
  buy: number;
  sell: number;
  pnl_total?: number | null;
  avg_r?: number | null;
  max_r?: number | null;
  min_r?: number | null;
};

export type TradesResponse = { items: TradeRecord[]; total: number; summary: TradeSummary };

export async function getTrades(params: {
  limit?: number;
  offset?: number;
  symbol?: string;
  side?: string;
  status?: string;
  receiver?: string;
  search?: string;
} = {}): Promise<TradesResponse> {
  const query = new URLSearchParams();
  query.set("limit", String(params.limit ?? 500));
  query.set("offset", String(params.offset ?? 0));
  for (const key of ["symbol", "side", "status", "receiver", "search"] as const) {
    const value = params[key];
    if (value) query.set(key, value);
  }
  const response = await fetch(`${API_BASE_URL}/api/trades?${query.toString()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Trades request failed: ${response.status}`);
  return response.json();
}

export async function getLogs(limit = 500) {
  const response = await fetch(`${API_BASE_URL}/api/logs?limit=${limit}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Logs request failed: ${response.status}`);
  return response.json();
}
