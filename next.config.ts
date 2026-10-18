import type { NextConfig } from "next";

const routeRedirects = [
  { source: "/minha-conta", destination: "/account" },
  { source: "/notificacoes", destination: "/notifications" },
  { source: "/sistemas/:routeId/configuracao", destination: "/systems/:routeId/configuration" },
  { source: "/sistemas/analise-canais", destination: "/systems/channel-analysis" },
  { source: "/sistemas/filtros-avancados", destination: "/systems/advanced-filters" },
  { source: "/sistemas/multi-conta", destination: "/systems/multi-account" },
  { source: "/sistemas/templates", destination: "/systems/templates" },
  { source: "/sistemas/marketplace", destination: "/systems/marketplace" },
  { source: "/sistemas/replay-de-sinais", destination: "/systems/signal-replay" },
  { source: "/sistemas/risk-management-pro", destination: "/systems/risk-management-pro" },
  { source: "/sistemas/smart-entry", destination: "/systems/smart-entry" },
  { source: "/sistemas/copytrix-ai", destination: "/systems/copytrix-ai" },
  { source: "/sistemas/copytrix-intelligence", destination: "/systems/copytrix-intelligence" },
  { source: "/sistemas/:routeId", destination: "/systems/:routeId" },
  { source: "/sistemas", destination: "/systems" },
  { source: "/desempenho", destination: "/performance" },
  { source: "/analise-desempenho", destination: "/performance-analysis" },
  { source: "/analytics", destination: "/performance" },
  { source: "/automations", destination: "/systems/automations" },
  { source: "/configuracoes/seguranca/historico-conexoes", destination: "/settings/security/connection-history" },
  { source: "/settings/seguranca/historico-conexoes", destination: "/settings/security/connection-history" },
  { source: "/relatorios", destination: "/reports" },
] as const;

const routeRewrites = [
  { source: "/systems/:routeId/configuration", destination: "/sistemas/:routeId/configuracao" },
  { source: "/systems/:routeId", destination: "/sistemas/:routeId" },
  { source: "/systems/automations", destination: "/sistemas" },
  { source: "/settings/security/connection-history", destination: "/settings/seguranca/historico-conexoes" },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return routeRedirects.map((route) => ({
      ...route,
      permanent: true,
    }));
  },
  async rewrites() {
    return [...routeRewrites];
  },
};

export default nextConfig;
