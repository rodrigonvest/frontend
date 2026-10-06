"use client";
import { Icon } from "./Icons";
export default function Topbar(){return <header className="copytrix-topbar sticky top-0 z-30 flex h-[70px] items-center border-b border-[#18324a] bg-[#071522]/96 px-[22px] backdrop-blur-xl"><button className="rounded-lg p-2 text-[#aebdcd]"><Icon name="menu" size={20}/></button><div className="ml-auto flex items-center gap-2">
<div className="top-chip online"><span className="dot"/>Copier Online</div>
<div className="top-card"><span className="top-icon tg"><Icon name="telegram" size={17}/></span><div><b>Telegram</b><small>Conectado</small></div></div>
<div className="top-card"><span className="top-icon mt"><Icon name="analytics" size={17}/></span><div><b>MT5</b><small>Conectado</small></div></div>
<div className="top-card plan"><span className="crown">♛</span><div><b>Plano Pro</b><small>Válido até 15/11/2026</small></div></div>
<button className="relative mx-1 p-2 text-[#aebdcd]"><Icon name="bell" size={20}/><span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f13d52] px-1 text-[9px] font-bold">3</span></button>
<div className="flex items-center gap-2"><div className="avatar">R</div><div className="leading-tight"><b className="block text-[12px]">Rodrigo</b><small className="block text-[9px] text-[#7e93a8]">Usuário Pro</small></div><span className="text-[#7e93a8]">⌄</span></div></div></header>}
