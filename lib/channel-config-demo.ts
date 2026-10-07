/**
 * Configuração de demonstração, usada SOMENTE com NEXT_PUBLIC_ENABLE_DEMO=1 e Core indisponível.
 * Alterações ficam apenas em memória do processo do servidor (perdidas ao reiniciar).
 */
import type { Channel } from "../schemas/channel";
import type { CoreChannelConfig, CoreChannelConfigUpdate } from "../schemas/channel-config";

const globalStore = globalThis as typeof globalThis & { __copytrixDemoConfigs?: Map<string, CoreChannelConfig> };
const store = (globalStore.__copytrixDemoConfigs ??= new Map());

function seed(channel: Channel): CoreChannelConfig {
  const slug = channel.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    channel_id: channel.id,
    name: channel.name,
    username: `@${slug}`,
    description: "Sinais de XAUUSD com alta assertividade",
    status: channel.status,
    active: channel.active,
    is_primary: Boolean(channel.is_primary),
    timezone: "America/Sao_Paulo",
    signal_language: "auto",
    symbol_default: "XAUUSD",
    symbol_mapping: [
      { from: "XAUUSD", to: "XAUUSD", custom: false },
      { from: "GOLD", to: "XAUUSD", custom: false },
      { from: "XAGUSD", to: "XAGUSD", custom: false },
    ],
    signal_format: null,
    automatic_format_detection: true,
    multiple_formats: false,
    risk_mode: "percent",
    risk_value: 1,
    min_lot: 0.01,
    max_lot: 5,
    leverage: 100,
    max_spread: 0.6,
    max_entry_distance: 5,
    ignore_out_of_schedule: false,
    signal_window_start: "00:00",
    signal_window_end: "23:59",
    execute_only_symbol: true,
    ignore_duplicates: false,
    execution_schedule_enabled: true,
    execution_start: "08:00",
    execution_end: "23:00",
    execution_days: ["mon", "tue", "wed", "thu", "fri"],
    break_even_enabled: true,
    break_even_pips: 20,
    trailing_stop_enabled: true,
    trailing_stop_pips: 30,
    partial_close_enabled: true,
    partial_close_percent: 50,
    close_all_at_last_tp: false,
  };
}

/** active / is_primary / status sempre refletem o canal atual. */
export function getDemoChannelConfig(channel: Channel): CoreChannelConfig {
  const stored = store.get(channel.id) ?? seed(channel);
  return { ...stored, status: channel.status, active: channel.active, is_primary: Boolean(channel.is_primary) };
}

export function updateDemoChannelConfig(channel: Channel, update: CoreChannelConfigUpdate): CoreChannelConfig {
  const next = { ...getDemoChannelConfig(channel), ...update };
  store.set(channel.id, next);
  return next;
}
