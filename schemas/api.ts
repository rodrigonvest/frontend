import { z } from "zod";

/** Categorias de falha tratadas pela UI. */
export const ApiErrorKindSchema = z.enum(["unavailable", "unauthorized", "not_found", "invalid_request", "invalid_response", "error"]);
export type ApiErrorKind = z.infer<typeof ApiErrorKindSchema>;

export const ApiFailureSchema = z.object({ kind: ApiErrorKindSchema, message: z.string() });
export type ApiFailure = z.infer<typeof ApiFailureSchema>;

/** Corpo de erro devolvido pelos Route Handlers do frontend: { error: { kind, message } }. */
export const ApiErrorResponseSchema = z.object({ error: ApiFailureSchema });

export const ApiSourceSchema = z.enum(["core", "demo"]);
export type ApiSource = z.infer<typeof ApiSourceSchema>;

/** Corpo de sucesso devolvido pelos Route Handlers do frontend: { data, source }. */
export const apiSuccessSchema = <S extends z.ZodType>(data: S) => z.object({ data, source: ApiSourceSchema });

export type ApiResult<T> = { ok: true; data: T; source: ApiSource } | { ok: false; error: ApiFailure };

export const API_ERROR_STATUS: Record<ApiErrorKind, number> = {
  unavailable: 503,
  unauthorized: 401,
  not_found: 404,
  invalid_request: 422,
  invalid_response: 502,
  error: 500,
};

export const API_ERROR_MESSAGES: Record<ApiErrorKind, string> = {
  unavailable: "Não foi possível conectar à API do Copytrix. Verifique se o backend está ativo.",
  unauthorized: "Sessão não autorizada. Entre novamente para continuar.",
  not_found: "Recurso não encontrado no Core.",
  invalid_request: "O Core recusou os dados enviados.",
  invalid_response: "O Core respondeu em um formato inesperado.",
  error: "Ocorreu um erro inesperado ao falar com o Core.",
};
