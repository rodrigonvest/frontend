export type AccountAccent = "purple" | "blue" | "green" | "amber" | "red";

export const ACCOUNT_PROFILE = {
  initial: "R",
  name: "Rodrigo",
  fullName: "Rodrigo de Barros Francisco",
  badge: "Usuário Pro",
  email: "rodrigo***@gmail.com",
  phone: "+55 11 9****-1234",
  country: "Brasil",
  memberSince: "21/06/2026",
  passwordChangedAt: "12/06/2026",
} as const;

export const ACCOUNT_PLAN = {
  name: "Pro",
  description: "Acesso completo a todas as funcionalidades do Copytrix.",
  validUntil: "15/11/2026",
  daysLeft: "38 dias restantes",
  price: "R$ 59,90",
  priceNote: "por mês",
  renewal: "Automática",
} as const;

export interface AccountStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  accent: AccountAccent;
  positive?: boolean;
}

export const ACCOUNT_STATS: AccountStat[] = [
  { id: "ops", label: "Operações totais", value: "167", icon: "barsFilled", accent: "purple" },
  { id: "systems", label: "Sistemas ativos", value: "4", icon: "layers", accent: "green" },
  { id: "telegram", label: "Canais Telegram", value: "3", icon: "telegram", accent: "blue" },
  { id: "mt", label: "Contas MT4/MT5", value: "2", icon: "server", accent: "blue" },
  { id: "profit", label: "Lucro Total", value: "+70.17R", icon: "trendUp", accent: "green", positive: true },
  { id: "accuracy", label: "Assertividade", value: "52.7%", icon: "target", accent: "purple" },
  { id: "pf", label: "Profit Factor", value: "2.39", icon: "scale", accent: "blue" },
  { id: "dd", label: "Drawdown Máximo", value: "12.1%", icon: "trendDown", accent: "red" },
];

export type PreferenceId = "theme" | "language" | "timezone" | "dateFormat" | "timeFormat";

export interface PreferenceField {
  id: PreferenceId;
  label: string;
  icon: string;
  options: string[];
}

export const PREFERENCE_FIELDS: PreferenceField[] = [
  { id: "theme", label: "Tema", icon: "moon", options: ["Escuro (Padrão)", "Claro", "Automático (sistema)"] },
  { id: "language", label: "Idioma", icon: "globe", options: ["Português (Brasil)", "English (US)", "Español"] },
  {
    id: "timezone",
    label: "Fuso Horário",
    icon: "clock",
    options: ["(GMT-3) América/São Paulo", "(GMT-4) América/Manaus", "(GMT+0) UTC", "(GMT+1) Europa/Lisboa"],
  },
  { id: "dateFormat", label: "Formato de Data", icon: "calendar", options: ["DD/MM/AAAA", "MM/DD/AAAA", "AAAA-MM-DD"] },
  { id: "timeFormat", label: "Formato de Hora", icon: "clock", options: ["24 horas (14:30)", "12 horas (2:30 PM)"] },
];

export type Preferences = Record<PreferenceId, string>;

export const DEFAULT_PREFERENCES: Preferences = {
  theme: PREFERENCE_FIELDS[0].options[0],
  language: PREFERENCE_FIELDS[1].options[0],
  timezone: PREFERENCE_FIELDS[2].options[0],
  dateFormat: PREFERENCE_FIELDS[3].options[0],
  timeFormat: PREFERENCE_FIELDS[4].options[0],
};

export type NotificationChannelId = "telegram" | "email" | "system";

export interface NotificationChannel {
  id: NotificationChannelId;
  title: string;
  description: string;
  icon: string;
  accent: AccountAccent;
}

export const NOTIFICATION_CHANNELS: NotificationChannel[] = [
  { id: "telegram", title: "Telegram", description: "Receber notificações no Telegram", icon: "telegram", accent: "blue" },
  { id: "email", title: "E-mail", description: "Receber notificações por e-mail", icon: "mail", accent: "purple" },
  { id: "system", title: "Notificações no Sistema", description: "Alertas dentro da plataforma", icon: "bell", accent: "amber" },
];

export const DEFAULT_NOTIFICATIONS: Record<NotificationChannelId, boolean> = {
  telegram: true,
  email: true,
  system: true,
};

export interface AccountSession {
  id: string;
  device: string;
  icon: string;
  location: string;
  lastActivity: string;
  current: boolean;
}

export const ACCOUNT_SESSIONS: AccountSession[] = [
  { id: "s1", device: "Chrome · Windows 11", icon: "laptop", location: "São Paulo, BR", lastActivity: "Ativa agora", current: true },
  { id: "s2", device: "Safari · iPhone 15", icon: "phone", location: "São Paulo, BR", lastActivity: "Há 2 horas", current: false },
  { id: "s3", device: "Chrome · MacBook Pro", icon: "laptop", location: "Campinas, BR", lastActivity: "Há 1 dia", current: false },
];
