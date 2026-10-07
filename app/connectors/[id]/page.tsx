import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChannelConfigView from "../../../components/channels/config/ChannelConfigView";
import { defaultChannelConfig } from "../../../lib/channel-config";
import { getChannels } from "../../../lib/channels";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Configuração do Canal | Copytrix" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getChannels();
  const channel = data.items.find((c) => c.id === id);
  if (!channel) notFound();

  return <ChannelConfigView channel={channel} generatedAt={data.generated_at} initialConfig={defaultChannelConfig(channel)} />;
}
