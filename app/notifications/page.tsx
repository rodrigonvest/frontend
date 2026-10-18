import type { Metadata } from "next";
import NotificationCenterView from "../../components/notification-center/NotificationCenterView";

export const metadata: Metadata = {
  title: "Central de Notificações | Copytrix",
  description: "Acompanhe em tempo real tudo que acontece no seu Copytrix: sinais, operações, sistemas, contas e segurança.",
};

export default function NotificationsPage() {
  return <NotificationCenterView />;
}
