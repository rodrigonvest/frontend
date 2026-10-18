import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "../../../../components/Shell";
import SystemConfigView from "../../../../components/systems/config/SystemConfigView";
import { getRouteById } from "../../../../lib/systems-catalog";

type Params = Promise<{ routeId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = getRouteById((await params).routeId);
  return { title: route ? `Configuração ${route.name} — Copytrix` : "Configuração do Sistema — Copytrix" };
}

export default async function SystemConfigPage({ params }: { params: Params }) {
  const route = getRouteById((await params).routeId);
  if (!route) notFound();

  return (
    <Shell>
      <SystemConfigView route={route} />
    </Shell>
  );
}
