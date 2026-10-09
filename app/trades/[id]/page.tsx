import type { Metadata } from "next";
import TradeDetailsView from "../../../components/trade-details/TradeDetailsView";

export const metadata: Metadata = {
  title: "Detalhes da Operação",
  description: "Visualize todas as informações desta operação, desde o sinal original até o fechamento.",
};

export default async function TradeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TradeDetailsView id={id} />;
}
