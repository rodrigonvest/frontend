import "server-only";
import type { z } from "zod";
import { API_ERROR_MESSAGES, type ApiErrorKind, type ApiFailure, type ApiResult } from "../schemas/api";
import { CORE_API_BASE_URL } from "./core-config";

/**
 * Única porta de saída do frontend para o Core (somente server).
 * Centraliza URL base, autenticação, timeout, mapeamento de erros HTTP e validação Zod.
 *
 * Variáveis de ambiente (nunca expostas ao navegador):
 *   CORE_API_BASE_URL  URL base do Core (ver lib/core-config.ts)
 *   CORE_API_TOKEN     token enviado como `Authorization: Bearer <token>` (opcional)
 */

const DEFAULT_TIMEOUT_MS = 8000;

export class CoreError extends Error {
  constructor(
    readonly kind: ApiErrorKind,
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "CoreError";
  }
}

type CoreRequestOptions<S extends z.ZodType> = {
  method?: "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Toda resposta do Core é validada contra este schema antes de chegar à UI. */
  schema: S;
  timeoutMs?: number;
};

function authHeaders(): Record<string, string> {
  const token = process.env.CORE_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function kindForStatus(status: number): ApiErrorKind {
  if (status === 401 || status === 403) return "unauthorized";
  if (status === 404) return "not_found";
  if (status === 400 || status === 409 || status === 422) return "invalid_request";
  if (status === 408 || status === 429 || status === 502 || status === 503 || status === 504) return "unavailable";
  return "error";
}

async function readErrorDetail(response: Response): Promise<string | undefined> {
  try {
    const body: unknown = await response.json();
    if (typeof body !== "object" || body === null) return undefined;
    const record = body as Record<string, unknown>;
    if (typeof record.detail === "string") return record.detail;
    if (typeof record.message === "string") return record.message;
    const nested = record.error;
    if (typeof nested === "string") return nested;
    if (typeof nested === "object" && nested !== null && typeof (nested as Record<string, unknown>).message === "string") return (nested as Record<string, string>).message;
  } catch {
    // corpo de erro não é JSON: usa a mensagem padrão
  }
  return undefined;
}

export async function coreRequest<S extends z.ZodType>(path: string, { method = "GET", body, schema, timeoutMs = DEFAULT_TIMEOUT_MS }: CoreRequestOptions<S>): Promise<z.output<S>> {
  const headers: Record<string, string> = { Accept: "application/json", ...authHeaders() };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${CORE_API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw new CoreError("unavailable", API_ERROR_MESSAGES.unavailable);
  }

  if (!response.ok) {
    const kind = kindForStatus(response.status);
    const detail = kind === "invalid_request" ? await readErrorDetail(response) : undefined;
    throw new CoreError(kind, detail ?? API_ERROR_MESSAGES[kind], response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new CoreError("invalid_response", API_ERROR_MESSAGES.invalid_response, response.status);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    console.error(`[core-client] Resposta inválida de ${method} ${path}:`, parsed.error.issues);
    throw new CoreError("invalid_response", API_ERROR_MESSAGES.invalid_response, response.status);
  }
  return parsed.data;
}

export function toApiFailure(error: unknown): ApiFailure {
  if (error instanceof CoreError) return { kind: error.kind, message: error.message };
  console.error("[core-client] Erro inesperado:", error);
  return { kind: "error", message: API_ERROR_MESSAGES.error };
}

/** Converte uma chamada que pode lançar em um ApiResult tipado. */
export async function attempt<T>(run: () => Promise<T>): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await run(), source: "core" };
  } catch (error) {
    return { ok: false, error: toApiFailure(error) };
  }
}
