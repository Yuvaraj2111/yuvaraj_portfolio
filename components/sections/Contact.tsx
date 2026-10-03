"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Copy, Download, Loader2, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ID;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (f.subject.trim().length < 3) e.subject = "Add a short subject.";
  if (f.message.trim().length < 10) e.message = "Write at least 10 characters.";
  return e;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem("_gotcha") as HTMLInputElement).value) return; // honeypot
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (form.elements.namedItem(Object.keys(errs)[0]) as HTMLElement)?.focus();
      return;
    }
    if (!FORMSPREE) {
      // No form service configured yet → open the visitor's mail app instead
      const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(fields.subject)}&body=${body}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFields({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const input = (k: keyof Fields) =>
    cn(
      "mt-2 w-full rounded-xl border bg-bg/60 px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/20",
      errors[k] ? "border-red-400/80" : "border-line"
    );

  const field = (k: keyof Fields, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="text-sm font-medium">{label}</label>
      {k === "message" ? (
        <textarea id={k} name={k} rows={5} value={fields[k]} onChange={set(k)} className={cn(input(k), "resize-y")} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
      ) : (
        <input id={k} name={k} type={type} value={fields[k]} onChange={set(k)} className={input(k)} autoComplete={k === "name" ? "name" : k === "email" ? "email" : "off"} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
      )}
      {errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-red-400">{errors[k]}</p>}
    </div>
  );

  return (
    <AnimatedSection id="contact">
      <Reveal className="glow-border p-6 sm:p-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <p className="mb-4 flex items-center gap-3 font-mono text-xs text-cyan"><span className="h-px w-8 bg-cyan/60" aria-hidden />Contact</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Let&apos;s Build Something Meaningful</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Have an interesting project, a technical challenge, or an opportunity to collaborate? Let&apos;s connect.
            </p>

            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-bg/40 p-2 pl-4">
                <Mail size={16} className="shrink-0 text-cyan" />
                <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate text-sm hover:text-cyan">{profile.email}</a>
                <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-raised px-3 text-xs" aria-live="polite">
                  {copied ? <><Check size={13} className="text-pulse" /> Copied</> : <><Copy size={13} /> Copy email</>}
                </button>
              </div>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-line bg-bg/40 px-4 py-3 text-sm hover:border-cyan/60">
                <Phone size={16} className="text-cyan" /> {profile.phone}
              </a>
              <div className="flex gap-3">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-bg/40 px-4 py-3 text-sm hover:border-cyan/60"><LinkedinIcon size={16} /> LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-bg/40 px-4 py-3 text-sm hover:border-cyan/60"><GithubIcon size={16} /> GitHub</a>
              </div>
              <a href={profile.resume} download className="flex items-center gap-3 rounded-2xl border border-line bg-bg/40 px-4 py-3 text-sm hover:border-cyan/60">
                <Download size={16} className="text-cyan" /> Download resume (PDF)
              </a>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {field("name", "Name")}
              {field("email", "Email", "email")}
            </div>
            {field("subject", "Subject")}
            {field("message", "Message")}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-bg transition hover:bg-cyan hover:text-[#04121a] disabled:opacity-60">
                {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.p key="ok" role="status" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-pulse">
                    <Check size={16} /> Message sent. I&apos;ll reply by email.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p key="err" role="alert" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} /> Couldn&apos;t send. Try again or use the email above.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </Reveal>
    </AnimatedSection>
  );
}
