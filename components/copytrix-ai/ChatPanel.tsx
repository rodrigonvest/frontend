"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import {
  CHAT_GREETING,
  CHAT_GREETING_TIME,
  QUICK_ACTIONS,
  aiReply,
  replyForAction,
} from "../../lib/copytrix-ai-data";
import { CopytrixMark } from "./AiPrimitives";

type Message = { id: number; role: "ai" | "user"; text: string; time: string };

const nowLabel = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

function Avatar() {
  return (
    <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
      <CopytrixMark size={20} />
    </span>
  );
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: "ai", text: CHAT_GREETING, time: CHAT_GREETING_TIME }]);
  const [typing, setTyping] = useState(false);
  const nextId = useRef(2);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const send = useCallback((userText: string, reply: string) => {
    const userId = nextId.current++;
    const replyId = nextId.current++;
    setMessages((current) => [...current, { id: userId, role: "user", text: userText, time: nowLabel() }]);
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMessages((current) => [...current, { id: replyId, role: "ai", text: reply, time: nowLabel() }]);
    }, 900);
    timers.current.push(timer);
  }, []);

  return { messages, typing, send };
}

export type ChatState = ReturnType<typeof useChat>;

export default function ChatPanel({ chat }: { chat: ChatState }) {
  const { messages, typing, send } = chat;
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    send(text, aiReply(text));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault();
  };

  const started = messages.length > 1;

  return (
    <section
      aria-label="Chat com Copytrix AI"
      className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface"
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-3.5">
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
          <CopytrixMark size={24} />
        </span>
        <h2 className="min-w-0 flex-1 truncate text-lg font-semibold tracking-tight text-fg">Copytrix AI</h2>
        <span className="flex items-center gap-1.5 text-[12.5px] text-success">
          <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.9)]" />
          Online
        </span>
      </header>

      <div ref={scrollRef} role="log" aria-live="polite" aria-label="Conversa" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) =>
          message.role === "ai" ? (
            <div key={message.id} className="flex items-start gap-2.5">
              <Avatar />
              <div className="min-w-0 max-w-full">
                <p className="whitespace-pre-line rounded-xl rounded-tl-sm border border-brand/25 bg-brand-soft/50 px-3.5 py-3 text-[13px] leading-[1.55] text-fg">
                  {message.text}
                </p>
                <p className="tabular mt-1 text-right text-[11px] text-fg-subtle">{message.time}</p>
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex flex-col items-end">
              <p className="max-w-[85%] whitespace-pre-line break-words rounded-xl rounded-tr-sm bg-brand-strong px-3.5 py-2.5 text-[13px] leading-[1.5] text-white">
                {message.text}
              </p>
              <p className="tabular mt-1 text-[11px] text-fg-subtle">{message.time}</p>
            </div>
          ),
        )}

        {typing && (
          <div className="flex items-center gap-2.5" aria-label="Copytrix AI está digitando">
            <Avatar />
            <span className="flex items-center gap-1 rounded-xl border border-brand/25 bg-brand-soft/50 px-3.5 py-3">
              {[0, 1, 2].map((dot) => (
                <span key={dot} aria-hidden className="size-1.5 animate-pulse rounded-full bg-brand" style={{ animationDelay: `${dot * 160}ms` }} />
              ))}
            </span>
          </div>
        )}

        {!started && (
          <ul className="flex flex-col gap-2 pt-1">
            {QUICK_ACTIONS.map((action) => (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => send(action.label, replyForAction(action.id))}
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg border border-brand/40 bg-surface px-3.5 py-2 text-left text-[13px] text-fg transition-colors hover:border-brand hover:bg-brand-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span aria-hidden className="text-brand">
                    <Icon name={action.icon} size={17} />
                  </span>
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {started && (
        <ul aria-label="Ações rápidas" className="flex gap-2 overflow-x-auto border-t border-line px-4 py-2.5">
          {QUICK_ACTIONS.map((action) => (
            <li key={action.id} className="shrink-0">
              <button
                type="button"
                onClick={() => send(action.label, replyForAction(action.id))}
                className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/40 bg-surface px-3 text-[12px] text-fg-muted transition-colors hover:border-brand hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span aria-hidden className="text-brand">
                  <Icon name={action.icon} size={13} />
                </span>
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="flex items-center gap-2.5 border-t border-line p-4">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Digite sua mensagem..."
          aria-label="Mensagem para o Copytrix AI"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-lg border border-line-strong bg-canvas/60 px-3.5 text-[13px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/50"
        />
        <button
          type="submit"
          aria-label="Enviar mensagem"
          disabled={!draft.trim() || typing}
          className={cx(
            "flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-strong text-white shadow-[0_0_20px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
          )}
        >
          <Icon name="send" size={18} />
        </button>
      </form>
    </section>
  );
}
