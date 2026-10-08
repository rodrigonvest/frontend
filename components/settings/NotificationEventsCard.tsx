"use client";
import { useState } from "react";
import { BellLogo, EventIcon } from "./NotificationIcons";
import { NotificationCard, NotificationToggle } from "./NotificationFields";
import { notificationChannels, notificationEventsDemo, type NotificationChannelId } from "../../lib/notifications-demo";

export default function NotificationEventsCard() {
  const [events, setEvents] = useState(notificationEventsDemo);

  const toggle = (eventId: string, channel: NotificationChannelId, next: boolean) =>
    setEvents((list) => list.map((event) => (event.id === eventId ? { ...event, channels: { ...event.channels, [channel]: next } } : event)));

  return (
    <NotificationCard
      icon={<BellLogo size={34} />}
      title="Eventos e Notificações"
      description="Escolha quais eventos irão disparar notificações e em quais canais."
      className="h-full"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">Canais de notificação por evento</caption>
          <thead>
            <tr className="text-[12px] text-fg-muted">
              <th scope="col" className="pb-2 pl-1 pr-3 font-normal">
                Evento
              </th>
              {notificationChannels.map((channel) => (
                <th key={channel.id} scope="col" className="w-[84px] pb-2 text-center font-normal">
                  {channel.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-line/70">
                <th scope="row" className="py-[9px] pl-1 pr-3 text-left font-normal">
                  <div className="flex min-w-0 items-center gap-3">
                    <EventIcon id={event.icon} />
                    <span className="w-[132px] shrink-0 text-[12.5px] font-medium text-fg">{event.name}</span>
                    <span className="min-w-0 truncate text-[11.5px] text-fg-muted">{event.description}</span>
                  </div>
                </th>
                {notificationChannels.map((channel) => (
                  <td key={channel.id} className="py-[9px] text-center">
                    <span className="inline-flex">
                      <NotificationToggle
                        size="sm"
                        checked={event.channels[channel.id]}
                        onChange={(next) => toggle(event.id, channel.id, next)}
                        label={`${event.name} via ${channel.label}`}
                      />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NotificationCard>
  );
}
