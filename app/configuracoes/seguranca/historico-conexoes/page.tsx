import { redirect } from "next/navigation";

export default function ConfiguracoesConnectionsRedirect() {
  redirect("/settings/security/connection-history");
}
