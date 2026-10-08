export type ConnectionTestResult = { id: string; label: string; latency: string };

export const connectionTests: readonly ConnectionTestResult[] = [
  { id: "server", label: "Conexão com o servidor", latency: "28 ms" },
  { id: "auth", label: "Autenticação da conta", latency: "112 ms" },
  { id: "account-info", label: "Leitura de informações da conta", latency: "85 ms" },
  { id: "quotes", label: "Acesso ao histórico de cotações", latency: "140 ms" },
  { id: "orders", label: "Permissão de envio de ordens", latency: "67 ms" },
];

export type AccountMetricKey = "balance" | "equity" | "marginUsed" | "marginFree" | "marginLevel" | "currency";

export const accountMetrics: readonly { id: AccountMetricKey; label: string; value: string }[] = [
  { id: "balance", label: "Saldo", value: "$ 102,450.00" },
  { id: "equity", label: "Equidade", value: "$ 102,450.00" },
  { id: "marginUsed", label: "Margem Utilizada", value: "$ 2,365.50" },
  { id: "marginFree", label: "Margem Livre", value: "$ 100,084.50" },
  { id: "marginLevel", label: "Nível de Margem", value: "4,335.21%" },
  { id: "currency", label: "Moeda", value: "USD" },
];

export const connectionSnapshot = {
  lastTest: "06/10/2026 17:24:30",
  ping: "28 ms",
  serverStatus: "Online",
  serverTime: "2026.10.06 20:24:30",
  investorMode: "Desativado",
};

export const orderTestDefaults = {
  symbol: "XAUUSD (Gold)",
  volume: "0.01",
  symbols: ["XAUUSD (Gold)", "EURUSD", "GBPUSD", "USDJPY", "NAS100", "US30"],
};

export const orderTestResult = {
  serverReturn: "Trade request completed",
  returnCode: "10009 (Request completed)",
  responseTime: "245 ms",
};
