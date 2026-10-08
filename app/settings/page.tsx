import type { Metadata } from "next";
import SettingsView from "../../components/settings/SettingsView";

export const metadata: Metadata = {
  title: "Configurações Gerais | Copytrix",
  description: "Gerencie as configurações do seu perfil, preferências, segurança, notificações e integrações.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
