export type ThemeId = "dark" | "light" | "system";
export type FontSizeId = "small" | "normal" | "large";
export type SidebarLayoutId = "expanded" | "compact" | "auto";

export const themeOptions: { id: ThemeId; label: string; description: string }[] = [
  { id: "dark", label: "Escuro", description: "Ideal para uso noturno e mais conforto visual." },
  { id: "light", label: "Claro", description: "Interface clara e moderna para ambientes bem iluminados." },
  { id: "system", label: "Sistema", description: "Segue o tema do seu sistema operacional." },
];

export const accentColors: { id: string; label: string; value: string }[] = [
  { id: "blue", label: "Azul", value: "#007BFF" },
  { id: "green", label: "Verde", value: "#12D99E" },
  { id: "purple", label: "Roxo", value: "#8A2BE2" },
  { id: "yellow", label: "Amarelo", value: "#F5B50A" },
  { id: "red", label: "Vermelho", value: "#F0364B" },
  { id: "pink", label: "Rosa", value: "#E83E95" },
  { id: "orange", label: "Laranja", value: "#F0621E" },
  { id: "cyan", label: "Ciano", value: "#06C8D8" },
];

export const fontSizeOptions: { id: FontSizeId; label: string; size: string }[] = [
  { id: "small", label: "Pequena", size: "12px" },
  { id: "normal", label: "Normal", size: "14px" },
  { id: "large", label: "Grande", size: "16px" },
];

export const sidebarLayoutOptions: { id: SidebarLayoutId; label: string; description: string }[] = [
  { id: "expanded", label: "Expandida", description: "com textos" },
  { id: "compact", label: "Compacta", description: "apenas ícones" },
  { id: "auto", label: "Automática", description: "recolhe automaticamente" },
];

export const previewMetrics = [
  { label: "Operações Hoje", value: "32", note: "+12%", tone: "accent" as const, noteTone: "success" as const },
  { label: "Lucro do Dia", value: "+$245,80", note: "+8.4%", tone: "success" as const, noteTone: "success" as const },
  { label: "Taxa de Acerto", value: "78.4%", note: "+2.1%", tone: "purple" as const, noteTone: "success" as const },
  { label: "Drawdown", value: "-2.3%", note: "Dentro do limite", tone: "danger" as const, noteTone: "danger" as const },
];

export const previewNav = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "trades", label: "Operações" },
  { icon: "telegram", label: "Canais Telegram" },
  { icon: "accounts", label: "Contas" },
  { icon: "systems", label: "Sistemas" },
];

export function isHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}
