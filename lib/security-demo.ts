export type TwoFactorMethodId = "app" | "sms" | "email";

export const twoFactorMethods: { id: TwoFactorMethodId; title: string; description: string }[] = [
  { id: "app", title: "Google Authenticator", description: "Use o aplicativo Google Authenticator, Authy ou similar." },
  { id: "sms", title: "SMS", description: "Receba códigos de verificação por SMS." },
  { id: "email", title: "E-mail", description: "Receba códigos de verificação por e-mail." },
];

export const verificationCodeDemo = "638 742";
export const secretKeyDemo = "JBSWY3DPEHPK3PXP";

export const setupInstructions = [
  "Abra o aplicativo Google Authenticator",
  "Escaneie o QR Code ou insira a chave manualmente",
  "Digite o código de 6 dígitos para confirmar",
];

export const recoveryCodesDemo: [string[], string[]] = [
  ["2F9K-8D4M-1G7H", "5Q1R-9T3V-6X8Z", "8M2N-4P6C-9J1K"],
  ["7B4D-9F2K-5H8J", "1L6P-3D9M-7Q2R", "9X3Z-1V6T-4B8N"],
];

export const passwordRules = ["Mínimo de 8 caracteres", "Letras maiúsculas e minúsculas", "Números", "Caracteres especiais (!@#$%...)"];

export type ActiveSession = {
  id: string;
  device: string;
  kind: "desktop" | "mobile";
  location: string;
  ip: string;
  date: string;
  current?: boolean;
};

export const activeSessionsDemo: ActiveSession[] = [
  { id: "s1", device: "Windows - Chrome", kind: "desktop", location: "São Paulo, Brasil", ip: "177.54.12.34", date: "Hoje, 10:24", current: true },
  { id: "s2", device: "Android - Chrome", kind: "mobile", location: "São Paulo, Brasil", ip: "177.54.12.34", date: "Ontem, 18:32" },
  { id: "s3", device: "Windows - Edge", kind: "desktop", location: "Rio de Janeiro, Brasil", ip: "201.22.10.45", date: "28/09/2026, 14:11" },
  { id: "s4", device: "Android - App Copytrix", kind: "mobile", location: "São Paulo, Brasil", ip: "177.54.12.34", date: "15/09/2026, 09:45" },
];
