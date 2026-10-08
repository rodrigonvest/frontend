export const apiKeyDemo = "cp_live_8f3c2a91d47b6e05c1a9f2d84b73e6a7f3";
export const apiSecretDemo = "cs_live_5b19e7c0a3d2486f9e1b0c7a4d85f6c29d2e";

export function maskKey(value: string, visibleStart = 8, visibleEnd = 4) {
  const hidden = Math.max(value.length - visibleStart - visibleEnd, 0);
  return `${value.slice(0, visibleStart)}${"*".repeat(hidden)}${value.slice(-visibleEnd)}`;
}

export type WebhookLogoId = "telegram" | "discord" | "tradingview" | "link";
export type WebhookEventTone = "brand" | "danger";

export interface WebhookEvent {
  label: string;
  tone: WebhookEventTone;
}

export interface WebhookDemo {
  id: string;
  name: string;
  logo: WebhookLogoId;
  url: string;
  events: WebhookEvent[];
  active: boolean;
}

export const webhooksDemo: WebhookDemo[] = [
  {
    id: "telegram",
    name: "Telegram Bot",
    logo: "telegram",
    url: "https://api.telegram.org/...",
    events: [
      { label: "Operações", tone: "brand" },
      { label: "Sistemas", tone: "brand" },
    ],
    active: true,
  },
  {
    id: "discord",
    name: "Discord",
    logo: "discord",
    url: "https://discord.com/api/...",
    events: [
      { label: "Alertas", tone: "brand" },
      { label: "Erros", tone: "danger" },
    ],
    active: true,
  },
  {
    id: "tradingview",
    name: "TradingView",
    logo: "tradingview",
    url: "https://webhook.site/ab12...",
    events: [
      { label: "Operações", tone: "brand" },
      { label: "Backtest", tone: "brand" },
    ],
    active: false,
  },
  {
    id: "dashboard",
    name: "Meu Dashboard",
    logo: "link",
    url: "https://meudominio.com/w...",
    events: [{ label: "Todos", tone: "brand" }],
    active: false,
  },
];

export interface ApiToggleDemo {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const apiPermissionsDemo: ApiToggleDemo[] = [
  { id: "read", title: "Leitura de dados", description: "Permite acessar informações da conta, operações e desempenho.", enabled: true },
  { id: "trades", title: "Gerenciar operações", description: "Permite abrir, modificar e fechar operações.", enabled: true },
  { id: "accounts", title: "Gerenciar contas", description: "Permite criar, editar e remover contas de trading.", enabled: false },
  { id: "systems", title: "Gerenciar sistemas", description: "Permite criar, editar e remover sistemas de automação.", enabled: false },
  { id: "channels", title: "Gerenciar canais", description: "Permite criar, editar e remover canais Telegram.", enabled: false },
  { id: "full", title: "Acesso completo", description: "Permite acesso total a todos os recursos da API.", enabled: false },
];

export const webhookEventsDemo: ApiToggleDemo[] = [
  { id: "trade-open", title: "Nova operação aberta", description: "Dispara quando uma nova operação é aberta.", enabled: true },
  { id: "trade-modified", title: "Operação modificada", description: "Dispara quando uma operação é modificada (SL/TP).", enabled: false },
  { id: "trade-closed", title: "Operação fechada", description: "Dispara quando uma operação é fechada.", enabled: true },
  { id: "signal", title: "Sinal recebido", description: "Dispara quando um novo sinal é recebido.", enabled: false },
  { id: "system-state", title: "Sistema iniciado/parado", description: "Dispara quando um sistema é iniciado ou parado.", enabled: false },
  { id: "system-error", title: "Erro no sistema", description: "Dispara quando ocorre um erro em algum sistema.", enabled: true },
  { id: "account-link", title: "Conexão de conta", description: "Dispara quando uma conta é conectada ou desconectada.", enabled: false },
  { id: "backtest", title: "Backtest concluído", description: "Dispara quando um backtest é finalizado.", enabled: false },
];

export type CodeLanguage = "python" | "javascript" | "curl";

export const codeLanguages: Array<{ value: CodeLanguage; label: string }> = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "curl", label: "cURL" },
];

export const codeSnippets: Record<CodeLanguage, string[]> = {
  python: [
    "import requests",
    "",
    'url = "https://api.copytrix.com/v1/trades"',
    "headers = {",
    '    "X-API-KEY": "cp_live_sua_chave_aqui",',
    '    "X-API-SECRET": "cs_live_sua_chave_secreta_aqui",',
    '    "Content-Type": "application/json"',
    "}",
    "",
    "response = requests.get(url, headers=headers)",
    "print(response.json())",
  ],
  javascript: [
    'const url = "https://api.copytrix.com/v1/trades";',
    "const headers = {",
    '  "X-API-KEY": "cp_live_sua_chave_aqui",',
    '  "X-API-SECRET": "cs_live_sua_chave_secreta_aqui",',
    '  "Content-Type": "application/json",',
    "};",
    "",
    "const response = await fetch(url, { headers });",
    "console.log(await response.json());",
  ],
  curl: [
    "curl https://api.copytrix.com/v1/trades \\",
    '  -H "X-API-KEY: cp_live_sua_chave_aqui" \\',
    '  -H "X-API-SECRET: cs_live_sua_chave_secreta_aqui" \\',
    '  -H "Content-Type: application/json"',
  ],
};
