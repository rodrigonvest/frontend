import type { Metadata } from "next";
import SignalFiltersView from "../../../components/signal-filters/SignalFiltersView";

export const metadata: Metadata = {
  title: "Filtros Avançados de Sinais — Copytrix",
  description: "Personalize filtros para receber e executar apenas os melhores sinais.",
};

export default function SignalFiltersPage() {
  return <SignalFiltersView />;
}
