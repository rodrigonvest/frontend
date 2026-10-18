import type { Metadata } from "next";
import Shell from "../../components/Shell";
import AccountView from "../../components/account/AccountView";

export const metadata: Metadata = {
  title: "Minha Conta — Copytrix",
  description: "Gerencie suas informações, segurança e preferências do seu perfil Copytrix.",
};

export default function AccountPage() {
  return (
    <Shell>
      <AccountView />
    </Shell>
  );
}
