import type { Metadata } from "next";
import SmartEntryView from "../../../components/smart-entry/SmartEntryView";

export const metadata: Metadata = {
  title: "Smart Entry — Copytrix",
  description: "Execução inteligente de sinais com filtros avançados e validações em tempo real.",
};

export default function SmartEntryPage() {
  return <SmartEntryView />;
}
