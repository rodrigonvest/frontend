"use client";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Shell({ children }: { children: React.ReactNode }) {
  return <div className="copytrix-shell min-h-screen bg-[#06111d] text-white"><Sidebar/><div className="copytrix-workspace min-h-screen"><Topbar/><main className="copytrix-main w-full">{children}</main></div></div>;
}
