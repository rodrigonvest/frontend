"use client";
import { useEffect, useState } from "react";
import { apiSuccessSchema } from "../schemas/api";
import { SystemStatusSchema, UNAVAILABLE_SYSTEM_STATUS, type SystemStatus } from "../schemas/system-status";

const ResponseSchema = apiSuccessSchema(SystemStatusSchema);

type UseSystemStatusOptions = {
  /** Intervalo de atualização em ms. 0 (padrão) = consulta única. Planejado: 5000–15000 quando o Core confirmar o endpoint. */
  refreshIntervalMs?: number;
};

export type UseSystemStatusResult = {
  status: SystemStatus;
  /** `error` quando /api/system-status falha; `status` permanece neutro (unavailable). */
  state: "loading" | "ready" | "error";
};

export function useSystemStatus({ refreshIntervalMs = 0 }: UseSystemStatusOptions = {}): UseSystemStatusResult {
  const [result, setResult] = useState<UseSystemStatusResult>({ status: UNAVAILABLE_SYSTEM_STATUS, state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const response = await fetch("/api/system-status", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const parsed = ResponseSchema.safeParse(await response.json());
        if (!parsed.success) throw new Error("Resposta inválida");
        setResult({ status: parsed.data.data, state: "ready" });
      } catch {
        if (controller.signal.aborted) return;
        setResult({ status: UNAVAILABLE_SYSTEM_STATUS, state: "error" });
      }
      if (refreshIntervalMs > 0 && !controller.signal.aborted) timer = setTimeout(load, refreshIntervalMs);
    }

    load();
    return () => {
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [refreshIntervalMs]);

  return result;
}
