import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "../../../components/Shell";
import SystemDetailsView from "../../../components/system-details/SystemDetailsView";
import { getSystemDisplayName } from "../../../lib/system-details-demo";
import { getRouteById } from "../../../lib/systems-catalog";

type Params = Promise<{ routeId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = getRouteById((await params).routeId);
  return {
    title: route
      ? `Detalhes da Rota / Automação — ${getSystemDisplayName(route)} — Copytrix`
      : "Detalhes da Rota / Automação — Copytrix",
  };
}

export default async function SystemDetailsPage({ params }: { params: Params }) {
  const route = getRouteById((await params).routeId);
  if (!route) notFound();

  return (
    <Shell wide>
      <SystemDetailsView route={route} />
    </Shell>
  );
}
