export type ApiTabId = "overview" | "rest" | "webhooks" | "mcp" | "logs" | "examples" | "sdks";

export interface ApiTab {
  id: ApiTabId;
  label: string;
  icon: string;
  badge?: string;
}

export const API_TABS: ApiTab[] = [
  { id: "overview", label: "Visão Geral", icon: "layers" },
  { id: "rest", label: "API REST", icon: "code" },
  { id: "webhooks", label: "Webhooks", icon: "webhook" },
  { id: "mcp", label: "Copytrix MCP", icon: "bot", badge: "Novo" },
  { id: "logs", label: "Logs da API", icon: "logs" },
  { id: "examples", label: "Exemplos", icon: "fileText" },
  { id: "sdks", label: "SDKs", icon: "box" },
];

export type AccentTone = "blue" | "purple" | "green" | "amber";

export interface IntroCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: AccentTone;
  badge?: string;
}

export const INTRO_CARDS: IntroCard[] = [
  { id: "rest", title: "API REST", description: "Acesse dados, gerencie sistemas e automatize operações via API.", icon: "code", accent: "blue" },
  { id: "webhooks", title: "Webhooks", description: "Receba eventos em tempo real (sinais, execuções, status).", icon: "webhook", accent: "purple" },
  { id: "mcp", title: "Copytrix MCP", description: "Conecte com ChatGPT, Claude e outros agentes de IA.", icon: "bot", accent: "purple", badge: "Novo" },
  { id: "secure", title: "Seguro e Privado", description: "Autenticação via API Key com permissões personalizadas.", icon: "shieldCheck", accent: "green" },
];

export const API_BASE_URL = "https://api.copytrix.com";

export const INITIAL_API_KEY_VISIBLE = "ctx_live_sk_7f3a8c9d1e2f4b6a8c9d";
export const API_KEY_MASK_LENGTH = 18;

export const API_STATUS_ROWS = [
  { label: "Ambiente", value: "Produção", kind: "badge" },
  { label: "URL Base", value: API_BASE_URL, kind: "copy" },
  { label: "Versão", value: "v1.0", kind: "text" },
  { label: "Rate Limit", value: "120 req/min", kind: "text" },
  { label: "Última atualização", value: "06/10/2026 21:32", kind: "text" },
] as const;

export interface ApiPermission {
  id: string;
  title: string;
  scope: "read" | "write";
  description: string;
}

export const PERMISSIONS_LEFT: ApiPermission[] = [
  { id: "accounts-read", title: "Ler dados da conta", scope: "read", description: "Acessar dados de contas, operações e desempenho." },
  { id: "systems-write", title: "Gerenciar sistemas", scope: "write", description: "Criar, editar e gerenciar sistemas de cópia." },
  { id: "operations-write", title: "Gerenciar operações", scope: "write", description: "Abrir, fechar e gerenciar operações." },
  { id: "channels-write", title: "Gerenciar canais Telegram", scope: "write", description: "Adicionar, editar e gerenciar canais." },
  { id: "reports-read", title: "Acessar relatórios", scope: "read", description: "Obter dados de desempenho e relatórios." },
];

export const PERMISSIONS_RIGHT: ApiPermission[] = [
  { id: "webhooks-write", title: "Webhooks", scope: "write", description: "Configurar e gerenciar webhooks." },
  { id: "mt-accounts-write", title: "Gerenciar contas", scope: "write", description: "Adicionar, editar e gerenciar contas MT4/MT5." },
  { id: "backtest-read", title: "Acessar backtest", scope: "read", description: "Executar e consultar backtests." },
  { id: "logs-read", title: "Acessar logs", scope: "read", description: "Consultar logs de execução." },
];

export const INITIAL_PERMISSIONS: Record<string, boolean> = Object.fromEntries(
  [...PERMISSIONS_LEFT, ...PERMISSIONS_RIGHT].map((permission) => [permission.id, true]),
);

export type HttpMethod = "GET" | "POST" | "DELETE";

export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  description: string;
}

export const ENDPOINTS: ApiEndpoint[] = [
  { method: "GET", path: "/v1/accounts", description: "Lista todas as contas (MT4/MT5)" },
  { method: "GET", path: "/v1/operations", description: "Lista operações" },
  { method: "GET", path: "/v1/systems", description: "Lista sistemas de cópia" },
  { method: "GET", path: "/v1/telegram/channels", description: "Lista canais Telegram" },
  { method: "POST", path: "/v1/systems", description: "Cria um novo sistema" },
  { method: "DELETE", path: "/v1/systems/{id}", description: "Remove um sistema" },
  { method: "GET", path: "/v1/reports/performance", description: "Obtém relatório de desempenho" },
  { method: "GET", path: "/v1/backtest", description: "Executa um backtest" },
];

export type WebhookEventTone = "blue" | "green" | "red" | "amber";

export const WEBHOOK_EVENT_OPTIONS: Array<{ label: string; tone: WebhookEventTone }> = [
  { label: "Sinais", tone: "blue" },
  { label: "Execuções", tone: "green" },
  { label: "Status", tone: "amber" },
  { label: "Erros", tone: "red" },
];

export interface WebhookItem {
  id: string;
  url: string;
  events: string[];
  active: boolean;
}

export const INITIAL_WEBHOOKS: WebhookItem[] = [
  { id: "wh-1", url: "https://meusistema.com/webhook", events: ["Sinais", "Execuções", "Erros"], active: true },
];

export interface McpIntegration {
  id: string;
  name: string;
  status: string;
  available: boolean;
  action: string;
  logo?: string;
}

export const MCP_INTEGRATIONS: McpIntegration[] = [
  { id: "chatgpt", name: "ChatGPT", status: "Disponível", available: true, action: "Conectar", logo: "/brands/chatgpt.svg" },
  { id: "claude", name: "Claude", status: "Disponível", available: true, action: "Conectar", logo: "/brands/claude.svg" },
  { id: "others", name: "Outros Agentes", status: "Compatível", available: false, action: "Configurar" },
];

export const MCP_STEPS = [
  { title: "Gere uma API Key", description: "Use a chave da aba Visão Geral com as permissões que o agente poderá usar." },
  { title: "Adicione o servidor MCP", description: "Cole a configuração abaixo no ChatGPT, Claude ou em qualquer cliente compatível com MCP." },
  { title: "Converse com o Copytrix", description: "Peça ao agente para listar contas, analisar operações ou gerar relatórios de desempenho." },
];

export const MCP_CONFIG_SNIPPET = `{
  "mcpServers": {
    "copytrix": {
      "url": "${API_BASE_URL}/mcp",
      "headers": { "Authorization": "Bearer <SUA_API_KEY>" }
    }
  }
}`;

export interface DocLink {
  id: string;
  label: string;
  icon: string;
  target: "toast" | "examples" | "sdks";
}

export const DOC_LINKS: DocLink[] = [
  { id: "full", label: "Documentação Completa", icon: "book", target: "toast" },
  { id: "examples", label: "Exemplos de Código", icon: "code", target: "examples" },
  { id: "sdks", label: "SDKs e Bibliotecas", icon: "box", target: "sdks" },
  { id: "postman", label: "Postman Collection", icon: "send", target: "toast" },
];

export interface ApiLogEntry {
  id: string;
  time: string;
  method: HttpMethod;
  path: string;
  status: number;
  latency: string;
}

export const API_LOGS: ApiLogEntry[] = [
  { id: "l1", time: "06/10/2026 21:32:08", method: "GET", path: "/v1/accounts", status: 200, latency: "84 ms" },
  { id: "l2", time: "06/10/2026 21:31:45", method: "GET", path: "/v1/operations", status: 200, latency: "112 ms" },
  { id: "l3", time: "06/10/2026 21:29:17", method: "POST", path: "/v1/systems", status: 201, latency: "168 ms" },
  { id: "l4", time: "06/10/2026 21:24:52", method: "GET", path: "/v1/reports/performance", status: 200, latency: "236 ms" },
  { id: "l5", time: "06/10/2026 21:18:03", method: "DELETE", path: "/v1/systems/sys_8f21", status: 204, latency: "97 ms" },
  { id: "l6", time: "06/10/2026 21:11:40", method: "GET", path: "/v1/backtest", status: 429, latency: "12 ms" },
  { id: "l7", time: "06/10/2026 20:57:26", method: "GET", path: "/v1/telegram/channels", status: 200, latency: "76 ms" },
  { id: "l8", time: "06/10/2026 20:44:11", method: "POST", path: "/v1/systems", status: 401, latency: "9 ms" },
];

export type CodeLanguage = "curl" | "javascript" | "python";

export const CODE_LANGUAGES: Array<{ id: CodeLanguage; label: string }> = [
  { id: "curl", label: "cURL" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
];

export const CODE_EXAMPLES: Record<CodeLanguage, string> = {
  curl: `curl -X GET "${API_BASE_URL}/v1/accounts" \\
  -H "Authorization: Bearer <SUA_API_KEY>" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch("${API_BASE_URL}/v1/accounts", {
  headers: {
    Authorization: "Bearer <SUA_API_KEY>",
    "Content-Type": "application/json",
  },
});

const accounts = await response.json();
console.log(accounts);`,
  python: `import requests

response = requests.get(
    "${API_BASE_URL}/v1/accounts",
    headers={"Authorization": "Bearer <SUA_API_KEY>"},
)

print(response.json())`,
};

export interface SdkItem {
  id: string;
  name: string;
  description: string;
  install: string;
  available: boolean;
}

export const SDKS: SdkItem[] = [
  { id: "js", name: "JavaScript / TypeScript", description: "Cliente oficial para Node.js e navegadores, com tipos completos.", install: "npm install @copytrix/sdk", available: true },
  { id: "python", name: "Python", description: "Biblioteca para robôs, notebooks e automações em Python 3.9+.", install: "pip install copytrix", available: true },
  { id: "php", name: "PHP", description: "Cliente para aplicações PHP e integrações com sistemas legados.", install: "composer require copytrix/sdk", available: false },
  { id: "go", name: "Go", description: "Cliente leve para serviços de alta performance.", install: "go get github.com/copytrix/sdk-go", available: false },
];
