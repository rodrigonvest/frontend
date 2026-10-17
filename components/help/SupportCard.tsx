"use client";
import { useId, useRef, useState } from "react";
import { Icon } from "../Icons";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { Badge, cx } from "../UI";
import {
  ATTACHMENT_MAX_BYTES,
  HELP_IDS,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  SUBJECTS,
  SUPPORT_TEXT,
} from "../../lib/help-data";
import { PaperclipIcon } from "./HelpIcons";
import { HelpSection } from "./HelpSection";
import { FOCUS_RING } from "../billing/BillingPrimitives";

const FIELD =
  "w-full rounded-lg border border-line-strong bg-canvas/60 px-3 text-[13.5px] leading-5 text-fg placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand";

interface Errors {
  subject?: string;
  message?: string;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

export default function SupportCard({ onSent }: { onSent: (subject: string) => void }) {
  const baseId = useId();
  const subjectErrorId = `${baseId}-subject-error`;
  const messageId = `${baseId}-message`;
  const messageErrorId = `${baseId}-message-error`;
  const attachmentErrorId = `${baseId}-attachment-error`;
  const fileInputId = `${baseId}-file`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const reset = () => {
    setSubject("");
    setMessage("");
    setFile(null);
    setErrors({});
    setAttachmentError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = () => {
    const next: Errors = {};
    if (!subject) next.subject = "Selecione um assunto para o seu ticket.";
    if (message.trim().length < MESSAGE_MIN_LENGTH) next.message = `Descreva sua dúvida com pelo menos ${MESSAGE_MIN_LENGTH} caracteres.`;
    setErrors(next);
    if (next.subject) {
      subjectRef.current?.focus();
      return;
    }
    if (next.message) {
      messageRef.current?.focus();
      return;
    }
    onSent(subject);
    reset();
  };

  return (
    <HelpSection id={HELP_IDS.support} title="Fale com o Suporte">
      <p className="mt-2 text-pretty text-[13px] leading-5 text-fg-muted">{SUPPORT_TEXT}</p>
      <form
        noValidate
        className="mt-4 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div>
          <label htmlFor={HELP_IDS.supportSubject} className="mb-1.5 block text-[13px] font-medium text-fg">
            Assunto
          </label>
          <div className="relative">
            <select
              ref={subjectRef}
              id={HELP_IDS.supportSubject}
              value={subject}
              required
              aria-required="true"
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={errors.subject ? subjectErrorId : undefined}
              onChange={(event) => {
                setSubject(event.target.value);
                if (errors.subject) setErrors((current) => ({ ...current, subject: undefined }));
              }}
              className={cx(FIELD, "h-11 appearance-none pr-10", !subject && "text-fg-muted", errors.subject && "border-danger/70")}
            >
              <option value="">Selecione um assunto</option>
              {SUBJECTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="chevronDown" size={16} />
            </span>
          </div>
          {errors.subject && (
            <p id={subjectErrorId} className="mt-1.5 text-[12.5px] text-danger">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={messageId} className="mb-1.5 block text-[13px] font-medium text-fg">
            Mensagem
          </label>
          <textarea
            ref={messageRef}
            id={messageId}
            rows={4}
            value={message}
            maxLength={MESSAGE_MAX_LENGTH}
            required
            aria-required="true"
            placeholder="Descreva sua dúvida ou problema em detalhes..."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? messageErrorId : undefined}
            onChange={(event) => {
              setMessage(event.target.value);
              if (errors.message) setErrors((current) => ({ ...current, message: undefined }));
            }}
            className={cx(FIELD, "min-h-[104px] resize-y py-2.5", errors.message && "border-danger/70")}
          />
          {errors.message && (
            <p id={messageErrorId} className="mt-1.5 text-[12.5px] text-danger">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="min-w-0">
            <input
              ref={fileInputRef}
              id={fileInputId}
              type="file"
              tabIndex={-1}
              className="sr-only"
              accept=".png,.jpg,.jpeg,.pdf,.txt,.log"
              aria-label="Selecionar arquivo para anexar ao ticket"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                if (selected && selected.size > ATTACHMENT_MAX_BYTES) {
                  setFile(null);
                  setAttachmentError(`O arquivo excede o limite de ${formatSize(ATTACHMENT_MAX_BYTES)}.`);
                  event.target.value = "";
                  return;
                }
                setAttachmentError(null);
                setFile(selected);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-describedby={attachmentError ? attachmentErrorId : undefined}
              className={cx(
                "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-line-strong bg-surface/60 px-4 text-left transition-colors hover:border-brand/50 hover:bg-white/[.04] sm:w-auto",
                FOCUS_RING,
              )}
            >
              <span aria-hidden className="text-fg-muted">
                <PaperclipIcon size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-medium text-fg">Anexar arquivo</span>
                <span className="text-[11px] text-fg-muted">(opcional)</span>
              </span>
            </button>
          </div>
          <PrimaryButton type="submit" className="h-12 w-full gap-2.5 px-6 sm:w-auto">
            <Icon name="send" size={17} />
            Enviar Ticket
          </PrimaryButton>
        </div>

        {attachmentError && (
          <p id={attachmentErrorId} role="alert" className="-mt-2 text-[12.5px] text-danger">
            {attachmentError}
          </p>
        )}
        {file && (
          <div className="-mt-1 flex items-center gap-2 rounded-lg border border-line bg-surface/60 py-1.5 pl-3 pr-1.5">
            <span aria-hidden className="text-fg-muted">
              <PaperclipIcon size={15} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-fg">{file.name}</span>
            <Badge>{formatSize(file.size)}</Badge>
            <button
              type="button"
              aria-label={`Remover anexo ${file.name}`}
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className={cx("flex size-9 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-white/[.06] hover:text-fg", FOCUS_RING)}
            >
              <Icon name="x" size={15} />
            </button>
          </div>
        )}
      </form>
    </HelpSection>
  );
}
