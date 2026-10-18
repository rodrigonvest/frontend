/**
 * Future English URL map for the Copytrix UI.
 *
 * This module is intentionally not consumed by the current navigation yet.
 * Existing App Router paths, links, redirects, APIs, and components remain
 * unchanged until the route migration is explicitly implemented.
 */

export const routes = {
  home: "/",
  account: "/account",
  accounts: "/accounts",
  notifications: "/notifications",
  connectors: "/connectors",
  billing: "/billing",
  help: "/help",
  roadmap: "/roadmap",
  performance: "/performance",
  performanceAnalysis: "/performance-analysis",
  reports: "/reports",
  trades: "/trades",
  trade: (id: string) => `/trades/${id}`,
  apiAccess: "/api-access",
  backtester: "/backtester",
  logs: "/logs",
  settings: {
    root: "/settings",
    security: {
      root: "/settings/security",
      connectionHistory: "/settings/security/connection-history",
    },
  },
  systems: {
    root: "/systems",
    automations: "/systems/automations",
    route: (routeId: string) => `/systems/${routeId}`,
    configuration: (routeId: string) => `/systems/${routeId}/configuration`,
    channelAnalysis: "/systems/channel-analysis",
    advancedFilters: "/systems/advanced-filters",
    multiAccount: "/systems/multi-account",
    templates: "/systems/templates",
    marketplace: "/systems/marketplace",
    signalReplay: "/systems/signal-replay",
    riskManagementPro: "/systems/risk-management-pro",
    smartEntry: "/systems/smart-entry",
    copytrixAI: "/systems/copytrix-ai",
    copytrixIntelligence: "/systems/copytrix-intelligence",
  },
} as const;

export type Routes = typeof routes;

export type RouteMigrationStatus =
  | "kept-in-english"
  | "portuguese-to-english"
  | "mixed-to-english"
  | "consolidated"
  | "needs-review";

export type RouteMigration = {
  current: string;
  future: string;
  status: RouteMigrationStatus;
  notes?: string;
};

/**
 * Current UI routes mapped to their future English URLs.
 *
 * API routes and technical Core endpoints are intentionally excluded.
 * Dynamic route values keep their current identifiers; only the URL segments
 * are prepared for migration.
 */
export const routeMigration: readonly RouteMigration[] = [
  { current: "/", future: "/", status: "kept-in-english" },
  { current: "/trades", future: "/trades", status: "kept-in-english" },
  { current: "/trades/[id]", future: "/trades/[id]", status: "kept-in-english" },
  { current: "/connectors", future: "/connectors", status: "kept-in-english", notes: "Explicitly remains /connectors." },
  { current: "/connectors/[id]", future: "/connectors/[id]", status: "kept-in-english" },
  { current: "/accounts", future: "/accounts", status: "kept-in-english", notes: "Explicitly remains /accounts." },
  { current: "/accounts/new", future: "/accounts/new", status: "kept-in-english" },
  { current: "/sistemas", future: "/systems", status: "portuguese-to-english" },
  { current: "/sistemas/[routeId]", future: "/systems/[routeId]", status: "portuguese-to-english" },
  { current: "/sistemas/[routeId]/configuracao", future: "/systems/[routeId]/configuration", status: "mixed-to-english" },
  { current: "/sistemas/automacoes", future: "/systems/automations", status: "portuguese-to-english", notes: "Future automation route." },
  { current: "/automations", future: "/systems/automations", status: "consolidated", notes: "Legacy route consolidates into the future automation route." },
  { current: "/sistemas/analise-canais", future: "/systems/channel-analysis", status: "mixed-to-english" },
  { current: "/sistemas/filtros-avancados", future: "/systems/advanced-filters", status: "mixed-to-english" },
  { current: "/sistemas/multi-conta", future: "/systems/multi-account", status: "mixed-to-english" },
  { current: "/sistemas/templates", future: "/systems/templates", status: "mixed-to-english" },
  { current: "/sistemas/marketplace", future: "/systems/marketplace", status: "mixed-to-english" },
  { current: "/sistemas/replay-de-sinais", future: "/systems/signal-replay", status: "mixed-to-english" },
  { current: "/sistemas/risk-management-pro", future: "/systems/risk-management-pro", status: "mixed-to-english" },
  { current: "/sistemas/smart-entry", future: "/systems/smart-entry", status: "mixed-to-english" },
  { current: "/sistemas/copytrix-ai", future: "/systems/copytrix-ai", status: "mixed-to-english" },
  { current: "/sistemas/copytrix-intelligence", future: "/systems/copytrix-intelligence", status: "mixed-to-english" },
  { current: "/desempenho", future: "/performance", status: "portuguese-to-english" },
  { current: "/analise-desempenho", future: "/performance-analysis", status: "portuguese-to-english" },
  { current: "/analytics", future: "/performance", status: "consolidated", notes: "Consolidates into /performance." },
  { current: "/backtester", future: "/backtester", status: "kept-in-english" },
  { current: "/logs", future: "/logs", status: "kept-in-english" },
  { current: "/relatorios", future: "/reports", status: "portuguese-to-english" },
  { current: "/notificacoes", future: "/notifications", status: "portuguese-to-english" },
  { current: "/minha-conta", future: "/account", status: "portuguese-to-english" },
  { current: "/settings", future: "/settings", status: "kept-in-english" },
  { current: "/settings/seguranca/historico-conexoes", future: "/settings/security/connection-history", status: "mixed-to-english" },
  { current: "/configuracoes", future: "/settings", status: "consolidated", notes: "Future settings root." },
  { current: "/configuracoes/seguranca", future: "/settings/security", status: "consolidated" },
  { current: "/configuracoes/seguranca/historico-conexoes", future: "/settings/security/connection-history", status: "consolidated" },
  { current: "/billing", future: "/billing", status: "kept-in-english", notes: "Explicitly remains /billing." },
  { current: "/api-access", future: "/api-access", status: "kept-in-english", notes: "Explicitly remains /api-access." },
  { current: "/roadmap", future: "/roadmap", status: "kept-in-english" },
  { current: "/help", future: "/help", status: "kept-in-english" },
] as const;

/**
 * Special migration rules, documented before implementation in the App Router.
 */
export const routeMigrationRules = {
  analytics: "/analytics consolidates into /performance.",
  automations: "/automations consolidates into /systems/automations.",
  configuration: "/configuracoes/... consolidates into /settings/....",
  connectors: "/connectors remains /connectors.",
  accounts: "/accounts remains /accounts.",
  billing: "/billing remains /billing.",
  apiAccess: "/api-access remains /api-access.",
  queryStrings: "/sistemas/templates?t=... must migrate to /systems/templates?t=... while preserving the query string.",
  apiScope: "Routes under /api/... and technical Core endpoints are excluded from UI route migration.",
  implementation: "This map is preparatory only; no redirects or route changes are implemented in this stage.",
} as const;

export type RouteMigrationRule = keyof typeof routeMigrationRules;
