import type { Metadata } from "next";
import Shell from "../../components/Shell";
import RoadmapView from "../../components/roadmap/RoadmapView";

export const metadata: Metadata = {
  title: "Roadmap — Copytrix",
  description: "Acompanhe o desenvolvimento do Copytrix: o que já foi lançado, o que está em desenvolvimento e o que vem por aí.",
};

export default function Page() {
  return (
    <Shell>
      <RoadmapView />
    </Shell>
  );
}
