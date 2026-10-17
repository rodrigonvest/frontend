import type { Metadata } from "next";
import Shell from "../../components/Shell";
import HelpView from "../../components/help/HelpView";

export const metadata: Metadata = {
  title: "Ajuda & Suporte — Copytrix",
  description: "Encontre respostas, aprenda com tutoriais em vídeo ou fale diretamente com a equipe de suporte do Copytrix.",
};

export default function Page() {
  return (
    <Shell>
      <HelpView />
    </Shell>
  );
}
