"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { IPanel } from "./IntelPanels";
import { answerFor, chatGreeting, colors, quickQuestions } from "../../lib/intelligence-demo";

type Message = { id: number; role: "ai" | "user"; text: string };

function AiAvatar() {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-full border-2"
      style={{ color: colors.purple, borderColor: colors.purple, background: "radial-gradient(circle at 30% 25%, rgba(167,139,250,.3), #06111d 75%)", boxShadow: "0 0 14px -4px #a78bfa" }}
    >
      <Icon name="sparkles" size={17} />
    </span>
  );
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "ai", text: chatGreeting }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<number | null>(null);
  const idRef = useRef(1);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const send = (raw: string) => {
    const question = raw.trim();
    if (!question || typing) return;
    setMessages((current) => [...current, { id: idRef.current++, role: "user", text: question }]);
    setDraft("");
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, { id: idRef.current++, role: "ai", text: answerFor(question) }]);
      setTyping(false);
    }, 900);
  };

  return { messages, draft, setDraft, typing, send };
}

export type ChatState = ReturnType<typeof useChat>;

export function ChatPanel({ chat, messagesHeight = 250, className }: { chat: ChatState; messagesHeight?: number; className?: string }) {
  const { messages, draft, setDraft, typing, send } = chat;
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <IPanel
      title="Chat com Copytrix AI"
      icon="message"
      iconColor={colors.blue}
      className={className}
      action={
        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-success">
          <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_8px_#12d99e]" />
          Online
        </span>
      }
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <div ref={listRef} role="log" aria-live="polite" aria-label="Conversa com Copytrix AI" className="flex flex-col gap-2.5 overflow-y-auto pr-1" style={{ maxHeight: messagesHeight, minHeight: 180 }}>
          {messages.map((message) =>
            message.role === "ai" ? (
              <div key={message.id} className="flex items-start gap-2.5">
                <AiAvatar />
                <p className="min-w-0 whitespace-pre-line rounded-xl rounded-tl-sm border border-brand/40 bg-brand-soft/40 px-3.5 py-2.5 text-[12.5px] leading-[18px] text-fg">{message.text}</p>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[88%] rounded-xl rounded-tr-sm bg-brand-strong px-3.5 py-2.5 text-[12.5px] leading-[18px] text-white">{message.text}</p>
              </div>
            ),
          )}
          {typing && (
            <div className="flex items-center gap-2.5" aria-label="Copytrix AI está digitando">
              <AiAvatar />
              <span className="flex gap-1 rounded-xl border border-brand/40 bg-brand-soft/40 px-3.5 py-3">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="size-1.5 animate-pulse rounded-full bg-brand" style={{ animationDelay: `${dot * 160}ms` }} />
                ))}
              </span>
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-2" aria-label="Perguntas rápidas">
          {quickQuestions.map((question) => (
            <li key={question}>
              <button
                type="button"
                onClick={() => send(question)}
                disabled={typing}
                className="flex h-8 w-full items-center gap-2 rounded-md border border-brand/40 bg-brand-soft/20 px-2.5 text-left text-[12px] text-fg transition-colors hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="shrink-0 text-brand">
                  <Icon name="info" size={14} />
                </span>
                <span className="truncate">{question}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form
        className="mt-3 flex overflow-hidden rounded-lg border border-line-strong bg-canvas/70 focus-within:border-brand"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <label htmlFor="ai-chat-input" className="sr-only">
          Digite sua pergunta
        </label>
        <input
          id="ai-chat-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault();
          }}
          placeholder="Digite sua pergunta aqui..."
          autoComplete="off"
          className="h-10 min-w-0 flex-1 bg-transparent px-3.5 text-[13px] text-fg outline-none placeholder:text-fg-subtle"
        />
        <button
          type="submit"
          disabled={!draft.trim() || typing}
          aria-label="Enviar pergunta"
          className={cx("flex w-12 items-center justify-center bg-brand-strong text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white disabled:opacity-60")}
        >
          <Icon name="send" size={18} />
        </button>
      </form>
    </IPanel>
  );
}
