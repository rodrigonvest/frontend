import type { Metadata } from "next";
import Shell from "../../../components/Shell";
import AddAccountView from "../../../components/accounts/new/AddAccountView";

export const metadata: Metadata = {
  title: "Adicionar Conta de Trading — Copytrix",
};

export default function AddAccountPage() {
  return (
    <Shell>
      <AddAccountView />
    </Shell>
  );
}
