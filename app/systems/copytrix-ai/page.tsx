import type { Metadata } from "next";
import CopytrixAiView from "../../../components/copytrix-ai/CopytrixAiView";

export const metadata: Metadata = {
  title: "Copytrix AI — Copytrix",
  description: "Seu assistente inteligente para análise, operações e otimização de resultados.",
};

export default function CopytrixAiPage() {
  return <CopytrixAiView />;
}
