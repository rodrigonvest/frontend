export type ConnectionEvent = "Login" | "Falha de Login" | "Logout" | "2FA";
export type ConnectionStatus = "Sucesso" | "Falha";
export type ConnectionCountry = "br" | "us";
export type ConnectionOs = "Windows" | "Android";
export type ConnectionBrowser = "chrome" | "edge" | "copytrix" | "unknown";

export type ConnectionRecord = {
  id: number;
  dateTime: string;
  event: ConnectionEvent;
  ip: string;
  city: string;
  country: ConnectionCountry;
  os: ConnectionOs;
  browser: ConnectionBrowser;
  browserLabel: string;
  status: ConnectionStatus;
  details: {
    locationFull: string;
    deviceFull: string;
    browserFull: string;
    authMethod: string;
    sessionId: string;
    duration: string;
    lastActivity: string;
    mapLabel: string;
  };
};

const sp = { locationFull: "São Paulo, Brasil", mapLabel: "São Paulo, SP - Brasil" };
const rj = { locationFull: "Rio de Janeiro, Brasil", mapLabel: "Rio de Janeiro, RJ - Brasil" };
const ny = { locationFull: "Nova York, Estados Unidos", mapLabel: "Nova York, NY - Estados Unidos" };

export const connectionRecords: ConnectionRecord[] = [
  {
    id: 1,
    dateTime: "04/10/2026 15:24:18",
    event: "Login",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Windows",
    browser: "chrome",
    browserLabel: "Chrome 129.0",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Windows 11", browserFull: "Chrome 129.0.6668.70", authMethod: "Senha + 2FA", sessionId: "a8f3c2d4-6e7b-4c1d...", duration: "2h 14m 32s", lastActivity: "04/10/2026 17:38:50" },
  },
  {
    id: 2,
    dateTime: "04/10/2026 12:11:03",
    event: "Login",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Android",
    browser: "copytrix",
    browserLabel: "Copytrix App 1.2.0",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Android 14", browserFull: "Copytrix App 1.2.0", authMethod: "Biometria + 2FA", sessionId: "c41b9e07-2d5a-4f83...", duration: "3h 02m 11s", lastActivity: "04/10/2026 15:13:14" },
  },
  {
    id: 3,
    dateTime: "04/10/2026 03:42:55",
    event: "Falha de Login",
    ip: "201.55.33.77",
    city: "Rio de Janeiro, BR",
    country: "br",
    os: "Windows",
    browser: "chrome",
    browserLabel: "Chrome 128.0",
    status: "Falha",
    details: { ...rj, deviceFull: "Windows 10", browserFull: "Chrome 128.0.6613.138", authMethod: "Senha", sessionId: "—", duration: "—", lastActivity: "04/10/2026 03:42:55" },
  },
  {
    id: 4,
    dateTime: "03/10/2026 21:18:07",
    event: "Login",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Windows",
    browser: "edge",
    browserLabel: "Edge 128.0",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Windows 11", browserFull: "Edge 128.0.2739.79", authMethod: "Senha + 2FA", sessionId: "7e29d0b5-91c3-4a6e...", duration: "1h 47m 09s", lastActivity: "03/10/2026 23:05:16" },
  },
  {
    id: 5,
    dateTime: "03/10/2026 18:03:21",
    event: "Logout",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Windows",
    browser: "chrome",
    browserLabel: "Chrome 129.0",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Windows 11", browserFull: "Chrome 129.0.6668.70", authMethod: "Encerrada pelo usuário", sessionId: "5b0a6c18-f2e4-47d9...", duration: "4h 21m 40s", lastActivity: "03/10/2026 18:03:21" },
  },
  {
    id: 6,
    dateTime: "03/10/2026 09:27:44",
    event: "Login",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Android",
    browser: "copytrix",
    browserLabel: "Copytrix App 1.1.9",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Android 14", browserFull: "Copytrix App 1.1.9", authMethod: "Biometria + 2FA", sessionId: "d93f7a21-0c68-4be5...", duration: "5h 38m 02s", lastActivity: "03/10/2026 15:05:46" },
  },
  {
    id: 7,
    dateTime: "02/10/2026 23:54:11",
    event: "Falha de Login",
    ip: "185.16.87.120",
    city: "Nova York, US",
    country: "us",
    os: "Windows",
    browser: "unknown",
    browserLabel: "Unknown",
    status: "Falha",
    details: { ...ny, deviceFull: "Windows (versão desconhecida)", browserFull: "Desconhecido", authMethod: "Senha", sessionId: "—", duration: "—", lastActivity: "02/10/2026 23:54:11" },
  },
  {
    id: 8,
    dateTime: "02/10/2026 20:12:36",
    event: "Login",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Windows",
    browser: "chrome",
    browserLabel: "Chrome 129.0",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Windows 11", browserFull: "Chrome 129.0.6668.70", authMethod: "Senha + 2FA", sessionId: "2c8e5f94-b7a1-43d0...", duration: "2h 55m 18s", lastActivity: "02/10/2026 23:07:54" },
  },
  {
    id: 9,
    dateTime: "02/10/2026 14:08:19",
    event: "2FA",
    ip: "177.22.124.10",
    city: "São Paulo, BR",
    country: "br",
    os: "Android",
    browser: "copytrix",
    browserLabel: "Copytrix App 1.1.9",
    status: "Sucesso",
    details: { ...sp, deviceFull: "Android 14", browserFull: "Copytrix App 1.1.9", authMethod: "2FA (TOTP)", sessionId: "e60d1b73-85fa-49c2...", duration: "0h 00m 48s", lastActivity: "02/10/2026 14:09:07" },
  },
  {
    id: 10,
    dateTime: "01/10/2026 22:31:06",
    event: "Login",
    ip: "201.55.33.77",
    city: "Rio de Janeiro, BR",
    country: "br",
    os: "Windows",
    browser: "chrome",
    browserLabel: "Chrome 128.0",
    status: "Sucesso",
    details: { ...rj, deviceFull: "Windows 10", browserFull: "Chrome 128.0.6613.138", authMethod: "Senha + 2FA", sessionId: "9a47c3e1-d2b6-4f58...", duration: "1h 12m 25s", lastActivity: "01/10/2026 23:43:31" },
  },
];

export const connectionKpis = [
  { id: "total", label: "Total de Conexões", value: "48", tone: "blue" as const },
  { id: "success", label: "Logins Bem-Sucedidos", value: "42", tone: "green" as const },
  { id: "failed", label: "Falhas de Login", value: "6", tone: "red" as const },
  { id: "devices", label: "Dispositivos Diferentes", value: "5", tone: "blue" as const },
];

export const connectionsPeriod = "01/09/2026 - 30/09/2026";
export const connectionsTotal = 48;
export const connectionsPageSize = 10;
