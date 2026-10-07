import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChannelConfigView from "../../../components/channels/config/ChannelConfigView";
import ConfigLoadError from "../../../components/channels/config/ConfigLoadError";
import { getChannelConfig } from "../../../lib/channel-config-service";
import { toViewModel } from "../../../lib/channel-config";
import { getChannels } from "../../../lib/channels";
import { ChannelIdSchema } from "../../../schemas/channel";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Configuração do Canal | Copytrix" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = ChannelIdSchema.safeParse((await params).id);
  if (!id.success) notFound();

  const [channels, config] = await Promise.all([getChannels(), getChannelConfig(id.data)]);

  if (channels.error) return <ConfigLoadError message={channels.error} />;
  const channel = channels.items.find((c) => c.id === id.data);
  if (!channel) notFound();

  if (!config.ok) {
    if (config.error.kind === "not_found") notFound();
    return <ConfigLoadError message={config.error.message} />;
  }

  const source = channels.source === "demo" || config.source === "demo" ? "demo" : "core";
  return <ChannelConfigView channel={channel} generatedAt={channels.generated_at} initialConfig={toViewModel(config.data)} source={source} />;
}
