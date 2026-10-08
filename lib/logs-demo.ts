export type LogLevel = "INFO" | "SUCCESS" | "WARNING" | "ERROR";
export type LogTone = "blue" | "green" | "amber" | "red" | "indigo";

export type LogEntry = {
  id: number;
  time: string;
  level: LogLevel;
  system: string;
  message: string;
  highlight?: string;
};

export const logsPeriod = "Últimas 24 horas";

export const logsKpis: Array<{
  label: string;
  value: string;
  note: string;
  noteTone: "success" | "muted";
  icon: "logs" | "check-circle" | "alert-triangle" | "alert-circle" | "settings";
  tone: LogTone;
}> = [
  { label: "Total de Logs", value: "2,847", note: "↑ +12% nas últimas 24h", noteTone: "success", icon: "logs", tone: "blue" },
  { label: "Informações", value: "1,942", note: "68.2%", noteTone: "muted", icon: "check-circle", tone: "green" },
  { label: "Avisos", value: "623", note: "21.9%", noteTone: "muted", icon: "alert-triangle", tone: "amber" },
  { label: "Erros", value: "182", note: "6.4%", noteTone: "muted", icon: "alert-circle", tone: "red" },
  { label: "Sistema", value: "100", note: "3.5%", noteTone: "muted", icon: "settings", tone: "indigo" },
];

const day = "04/09/2026";

export const logEntries: LogEntry[] = [
  { id: 1, time: `${day} 14:32:15`, level: "INFO", system: "Telegram", message: "Sinal recebido do canal KIM GOLD SECRET" },
  { id: 2, time: `${day} 14:32:16`, level: "INFO", system: "Parser", message: "Sinal processado com sucesso (XAUUSD BUY)" },
  { id: 3, time: `${day} 14:32:17`, level: "INFO", system: "MT5", message: "Verificando condições de entrada..." },
  { id: 4, time: `${day} 14:32:17`, level: "INFO", system: "Risco", message: "Spread atual: 0.42 pips (limite: 0.60)" },
  { id: 5, time: `${day} 14:32:18`, level: "INFO", system: "Validação", message: "Distância de entrada: 2.3 pips (limite: 5.0)" },
  { id: 6, time: `${day} 14:32:18`, level: "SUCCESS", system: "MT5", message: "Ordem enviada: BUY 0.10 XAUUSD @ 4142.50 (ticket: 12345678)" },
  { id: 7, time: `${day} 14:32:18`, level: "INFO", system: "Execução", message: "Ordem executada com sucesso" },
  { id: 8, time: `${day} 14:32:19`, level: "INFO", system: "Notificação", message: "Notificação enviada: Ordem aberta" },
  { id: 9, time: `${day} 14:35:02`, level: "INFO", system: "MT5", message: "TP1 atingido (+0.25R) - Parcial fechada" },
  { id: 10, time: `${day} 14:35:03`, level: "SUCCESS", system: "Execução", message: "Parcial fechada: 0.03 lotes @ 4143.50 (+$25.00)" },
  { id: 11, time: `${day} 14:48:15`, level: "INFO", system: "MT5", message: "TP2 atingido (+0.50R) - Parcial fechada" },
  { id: 12, time: `${day} 14:48:16`, level: "SUCCESS", system: "Execução", message: "Parcial fechada: 0.03 lotes @ 4144.50 (+$25.00)" },
  { id: 13, time: `${day} 15:12:22`, level: "WARNING", system: "Risco", message: "Spread aumentou para 0.68 pips (limite: 0.60)", highlight: "0.68 pips (limite: 0.60)" },
  { id: 14, time: `${day} 15:12:22`, level: "WARNING", system: "MT5", message: "Novas entradas serão bloqueadas até normalização" },
  { id: 15, time: `${day} 15:18:45`, level: "INFO", system: "Risco", message: "Spread normalizado: 0.38 pips" },
  { id: 16, time: `${day} 15:25:11`, level: "INFO", system: "Telegram", message: "Sinal recebido do canal FRAN SIGNALS" },
  { id: 17, time: `${day} 15:25:12`, level: "INFO", system: "Parser", message: "Sinal processado com sucesso (XAUUSD SELL)" },
  { id: 18, time: `${day} 15:25:12`, level: "ERROR", system: "Validação", message: "Distância de entrada: 6.2 pips (limite: 5.0)" },
  { id: 19, time: `${day} 15:25:12`, level: "WARNING", system: "Execução", message: "Sinal ignorado: entry_distance_exceeded", highlight: "entry_distance_exceeded" },
  { id: 20, time: `${day} 15:30:01`, level: "INFO", system: "Sistema", message: "Verificação de saúde do sistema - OK" },
  { id: 21, time: `${day} 15:30:01`, level: "INFO", system: "MT5", message: "Conexão com servidor: 12 ms (estável)" },
  { id: 22, time: `${day} 15:30:01`, level: "INFO", system: "Sistema", message: "Uso de memória: 45% | CPU: 12%" },
  { id: 23, time: `${day} 15:45:33`, level: "INFO", system: "Backtest", message: "Sincronização de dados concluída" },
  { id: 24, time: `${day} 15:50:17`, level: "INFO", system: "Notificação", message: "Relatório diário gerado com sucesso" },
];

export type JsonValue = { kind: "string" | "number"; text: string };

export const selectedLogJson: Array<{ key: string; value: JsonValue }> = [
  { key: "channel", value: { kind: "string", text: '"KIM GOLD SECRET"' } },
  { key: "message_id", value: { kind: "number", text: "123456" } },
  { key: "symbol", value: { kind: "string", text: '"XAUUSD"' } },
  { key: "type", value: { kind: "string", text: '"BUY"' } },
  { key: "entry", value: { kind: "number", text: "4142.50" } },
  { key: "sl", value: { kind: "number", text: "4140.50" } },
  { key: "tp1", value: { kind: "number", text: "4143.50" } },
  { key: "tp2", value: { kind: "number", text: "4144.50" } },
  { key: "tp3", value: { kind: "number", text: "4146.50" } },
  { key: "timestamp", value: { kind: "string", text: '"2026-09-04 14:32:15"' } },
];

export type LevelSegment = { label: string; count: number; display: string; share: string; color: string };

export const logsTotal = 2847;

export const logsByLevel: LevelSegment[] = [
  { label: "Informações", count: 1942, display: "1,942", share: "68.2%", color: "#159af2" },
  { label: "Avisos", count: 623, display: "623", share: "21.9%", color: "#f5b82e" },
  { label: "Erros", count: 182, display: "182", share: "6.4%", color: "#ff4d5d" },
  { label: "Sistema", count: 100, display: "100", share: "3.5%", color: "#9fb3c8" },
];

export const logsActivity: number[] = [
  38, 52, 31, 66, 48, 72, 58, 44, 80, 96, 74, 120, 104, 88, 142, 126, 110, 156, 138, 172, 150, 214, 188, 132,
];

export const logsActivityDomain = { max: 300, ticks: [0, 100, 200, 300] };

export const logsActivityLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
