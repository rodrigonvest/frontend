import "server-only";
import { NextResponse } from "next/server";
import { API_ERROR_MESSAGES, API_ERROR_STATUS, type ApiErrorKind, type ApiResult } from "../schemas/api";

export function errorResponse(kind: ApiErrorKind, message: string = API_ERROR_MESSAGES[kind]) {
  return NextResponse.json({ error: { kind, message } }, { status: API_ERROR_STATUS[kind] });
}

/** ApiResult -> { data, source } (200) ou { error: { kind, message } } com o status HTTP correspondente. */
export function resultResponse<T>(result: ApiResult<T>) {
  if (!result.ok) return errorResponse(result.error.kind, result.error.message);
  return NextResponse.json({ data: result.data, source: result.source });
}

export async function readJson(request: Request): Promise<{ ok: true; body: unknown } | { ok: false }> {
  try {
    return { ok: true, body: await request.json() };
  } catch {
    return { ok: false };
  }
}
