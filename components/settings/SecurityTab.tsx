import PasswordCard from "./PasswordCard";
import QrSetupCard from "./QrSetupCard";
import SessionsCard from "./SessionsCard";
import TwoFactorCard from "./TwoFactorCard";

export default function SecurityTab() {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 lg:grid-cols-2">
      <TwoFactorCard />
      <QrSetupCard />
      <PasswordCard />
      <SessionsCard />
    </div>
  );
}
