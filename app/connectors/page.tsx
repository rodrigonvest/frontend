import type { Metadata } from "next";
import ChannelsView from "../../components/channels/ChannelsView";
import { getChannels } from "../../lib/channels";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Canais Telegram | Copytrix" };

export default async function Page() {
  const data = await getChannels();
  return <ChannelsView data={data} />;
}
