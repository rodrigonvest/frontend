/**
 * Única definição da URL base do Core. Seguro para server e client (não contém segredos).
 *
 * - `CORE_API_BASE_URL` (privada, só server) tem prioridade.
 * - `NEXT_PUBLIC_API_BASE_URL` é mantida como fallback para as telas legadas (lib/api.ts).
 *
 * Credenciais (CORE_API_TOKEN) ficam exclusivamente em lib/core-client.ts (server-only).
 */
export const CORE_API_BASE_URL = (process.env.CORE_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/+$/, "");
