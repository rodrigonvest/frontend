import { EmailCard, PushCard, TelegramCard, WebhookCard } from "./NotificationChannelCards";
import NotificationEventsCard from "./NotificationEventsCard";
import { AdvancedSettingsCard, TestNotificationCard } from "./NotificationSideCards";

export default function NotificationsTab() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <TelegramCard />
        <EmailCard />
        <PushCard />
        <WebhookCard />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <NotificationEventsCard />
        <div className="flex min-w-0 flex-col gap-3.5">
          <AdvancedSettingsCard />
          <TestNotificationCard />
        </div>
      </div>
    </div>
  );
}
