export type TemplateScope = "official" | "mine" | "community";

export type ConfigTemplate = {
  id: string;
  name: string;
  scope: TemplateScope;
  type: string;
  categories: string[];
  assets: string[];
  tags: { label: string; tone: "blue" | "gold" | "green" | "purple" | "orange" | "neutral" }[];
  description: string;
  winRate: number;
  rr: number;
  users: number;
  image: string;
  popular?: boolean;
  modified: string;
  author: string;
};

export const includedSettings = [
  "Filtros de entrada (Smart Entry)",
  "Gestão de risco otimizada",
  "Filtros de spread e volatilidade",
  "Horários recomendados",
  "Trailing Stop automático",
  "Regras de saída (TP/SL)",
  "Filtros de tendência (EMA + RSI)",
  "Configurações prontas para MetaTrader, DXtrade, NinjaTrader",
];

export const scopeTabs: { id: TemplateScope; label: string; icon: string }[] = [
  { id: "official", label: "Templates Oficiais", icon: "clipboard" },
  { id: "mine", label: "Meus Templates", icon: "fileText" },
  { id: "community", label: "Templates da Comunidade", icon: "accounts" },
];

export const categories: { id: string; label: string; count: number; icon: string }[] = [
  { id: "all", label: "Todos", count: 24, icon: "layers" },
  { id: "scalping", label: "Scalping", count: 6, icon: "signal" },
  { id: "daytrade", label: "Day Trade", count: 5, icon: "chart" },
  { id: "swing", label: "Swing Trade", count: 3, icon: "trades" },
  { id: "propfirm", label: "Prop Firm", count: 5, icon: "trophy" },
  { id: "cripto", label: "Criptomoedas", count: 2, icon: "dollar" },
  { id: "indices", label: "Índices", count: 2, icon: "target" },
  { id: "conservador", label: "Conservador", count: 3, icon: "shield" },
  { id: "agressivo", label: "Agressivo", count: 3, icon: "trendUp" },
];

export const typeOptions = [
  { value: "all", label: "Todos os Tipos" },
  { value: "Scalping", label: "Scalping" },
  { value: "Day Trade", label: "Day Trade" },
  { value: "Swing Trade", label: "Swing Trade" },
  { value: "Prop Firm", label: "Prop Firm" },
  { value: "Criptomoedas", label: "Criptomoedas" },
];

export const sortOptions = [
  { value: "popular", label: "Mais Populares" },
  { value: "winRate", label: "Maior Win Rate" },
  { value: "rr", label: "Maior RR Médio" },
  { value: "name", label: "Nome (A-Z)" },
];

export const officialTemplates: ConfigTemplate[] = [
  {
    id: "o1",
    name: "Scalping XAUUSD Pro",
    scope: "official",
    type: "Scalping",
    categories: ["scalping", "agressivo"],
    assets: ["XAUUSD"],
    tags: [
      { label: "Scalping", tone: "blue" },
      { label: "XAUUSD", tone: "gold" },
      { label: "Alta Performance", tone: "green" },
    ],
    description: "Configuração otimizada para scalping no ouro com entrada precisa e gestão de risco avançada.",
    winRate: 82.7,
    rr: 1.8,
    users: 245,
    image: "/images/templates/gold.png",
    popular: true,
    modified: "10/09/2026",
    author: "Copytrix",
  },
  {
    id: "o2",
    name: "Prop Firm Seguro",
    scope: "official",
    type: "Prop Firm",
    categories: ["propfirm", "conservador"],
    assets: ["XAUUSD", "US100"],
    tags: [
      { label: "Prop Firm", tone: "purple" },
      { label: "Conservador", tone: "green" },
      { label: "Multi-Ativos", tone: "neutral" },
    ],
    description: "Template seguro e consistente para passar em mesas proprietárias.",
    winRate: 76.3,
    rr: 1.4,
    users: 189,
    image: "/images/templates/prop-firm.png",
    modified: "08/09/2026",
    author: "Copytrix",
  },
  {
    id: "o3",
    name: "Day Trade Índices",
    scope: "official",
    type: "Day Trade",
    categories: ["daytrade", "indices"],
    assets: ["US100", "US500"],
    tags: [
      { label: "Day Trade", tone: "blue" },
      { label: "US100", tone: "blue" },
      { label: "M5 - M15", tone: "neutral" },
    ],
    description: "Ideal para operar índices americanos com sinais de alta qualidade.",
    winRate: 71.9,
    rr: 1.6,
    users: 132,
    image: "/images/templates/indices.png",
    modified: "05/09/2026",
    author: "Copytrix",
  },
  {
    id: "o4",
    name: "Crypto Futuro",
    scope: "official",
    type: "Criptomoedas",
    categories: ["cripto", "swing"],
    assets: ["BTCUSDT"],
    tags: [
      { label: "Criptomoedas", tone: "orange" },
      { label: "BTCUSDT", tone: "gold" },
      { label: "Swing Trade", tone: "blue" },
    ],
    description: "Configuração para sinais de longo prazo em criptomoedas.",
    winRate: 68.4,
    rr: 2.1,
    users: 98,
    image: "/images/templates/crypto.png",
    modified: "02/09/2026",
    author: "Copytrix",
  },
  {
    id: "o5",
    name: "Forex Majors",
    scope: "official",
    type: "Day Trade",
    categories: ["daytrade", "conservador"],
    assets: ["EURUSD", "GBPUSD"],
    tags: [
      { label: "Day Trade", tone: "blue" },
      { label: "EURUSD", tone: "blue" },
      { label: "Conservador", tone: "green" },
    ],
    description: "Template para os principais pares de moedas com filtros avançados.",
    winRate: 73.1,
    rr: 1.5,
    users: 76,
    image: "/images/templates/forex.png",
    modified: "30/08/2026",
    author: "Copytrix",
  },
  {
    id: "o6",
    name: "Commodities Diversas",
    scope: "official",
    type: "Swing Trade",
    categories: ["swing"],
    assets: ["USOIL", "XAGUSD"],
    tags: [
      { label: "Swing Trade", tone: "blue" },
      { label: "USOIL", tone: "gold" },
      { label: "Multi-Ativos", tone: "neutral" },
    ],
    description: "Configuração para petróleo, prata, ouro e outras commodities.",
    winRate: 69.8,
    rr: 1.7,
    users: 54,
    image: "/images/templates/commodities.png",
    modified: "27/08/2026",
    author: "Copytrix",
  },
];

export const communityTemplates: ConfigTemplate[] = [
  {
    id: "c1",
    name: "London Breakout FX",
    scope: "community",
    type: "Day Trade",
    categories: ["daytrade", "agressivo"],
    assets: ["GBPUSD", "EURUSD"],
    tags: [
      { label: "Day Trade", tone: "blue" },
      { label: "GBPUSD", tone: "blue" },
      { label: "Sessão Londres", tone: "neutral" },
    ],
    description: "Rompimentos na abertura de Londres com stop curto e trailing dinâmico.",
    winRate: 66.2,
    rr: 1.9,
    users: 61,
    image: "/images/templates/forex.png",
    modified: "01/09/2026",
    author: "@marcos.fx",
  },
  {
    id: "c2",
    name: "Ouro Conservador",
    scope: "community",
    type: "Swing Trade",
    categories: ["swing", "conservador"],
    assets: ["XAUUSD"],
    tags: [
      { label: "Swing Trade", tone: "blue" },
      { label: "XAUUSD", tone: "gold" },
      { label: "Conservador", tone: "green" },
    ],
    description: "Operações de médio prazo no ouro com risco reduzido por trade.",
    winRate: 70.4,
    rr: 1.6,
    users: 43,
    image: "/images/templates/gold.png",
    modified: "29/08/2026",
    author: "@ana.trader",
  },
  {
    id: "c3",
    name: "Nasdaq Momentum",
    scope: "community",
    type: "Day Trade",
    categories: ["daytrade", "indices", "agressivo"],
    assets: ["US100"],
    tags: [
      { label: "Day Trade", tone: "blue" },
      { label: "US100", tone: "blue" },
      { label: "Momentum", tone: "purple" },
    ],
    description: "Segue o momentum da abertura americana com filtros de volatilidade.",
    winRate: 64.8,
    rr: 2.0,
    users: 37,
    image: "/images/templates/indices.png",
    modified: "25/08/2026",
    author: "@rafa.index",
  },
];

export const initialMyTemplates: ConfigTemplate[] = [
  {
    ...officialTemplates[0],
    id: "m1",
    name: "Meu Scalping Gold",
    scope: "mine",
    users: 1,
    popular: false,
    modified: "10/09/2026",
    author: "Você",
  },
  {
    ...officialTemplates[1],
    id: "m2",
    name: "Prop Firm 200K",
    scope: "mine",
    assets: ["XAUUSD", "US100"],
    users: 1,
    modified: "08/09/2026",
    author: "Você",
  },
  {
    ...officialTemplates[4],
    id: "m3",
    name: "Conservador FX",
    scope: "mine",
    assets: ["EURUSD", "GBPUSD"],
    type: "Day Trade",
    users: 1,
    modified: "05/09/2026",
    author: "Você",
  },
];

export const archivedMineCount = 5;

export function matchesQuery(template: ConfigTemplate, query: string) {
  const text = query.trim().toLowerCase();
  if (!text) return true;
  return [template.name, template.description, template.type, ...template.assets, ...template.tags.map((tag) => tag.label)].join(" ").toLowerCase().includes(text);
}

export function sortTemplates(list: ConfigTemplate[], sort: string) {
  const copy = [...list];
  if (sort === "winRate") return copy.sort((a, b) => b.winRate - a.winRate);
  if (sort === "rr") return copy.sort((a, b) => b.rr - a.rr);
  if (sort === "name") return copy.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return copy.sort((a, b) => b.users - a.users);
}

export function formatToday() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}

export function mergeImportedTemplate(raw: unknown, id: string): ConfigTemplate | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Partial<ConfigTemplate>;
  if (typeof data.name !== "string" || !data.name.trim()) return null;
  const base = officialTemplates[0];
  return {
    ...base,
    ...data,
    id,
    scope: "mine",
    name: data.name.trim().slice(0, 60),
    assets: Array.isArray(data.assets) ? data.assets.map(String).slice(0, 6) : base.assets,
    tags: Array.isArray(data.tags) ? data.tags : base.tags,
    popular: false,
    users: 1,
    modified: formatToday(),
    author: "Você",
  };
}
