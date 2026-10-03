"use client";
import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return (
    <footer className="relative z-[2] border-t border-line">
      <div className="page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-bold">{profile.monogram}</p>
          <p className="mt-2 text-sm text-muted">Designed with curiosity. Built with precision.</p>
          <p className="mt-1 text-xs text-muted">© {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:text-ink"><LinkedinIcon size={16} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:text-ink"><GithubIcon size={16} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:text-ink"><Mail size={16} /></a>
          <button type="button" onClick={toTop} className="ml-3 inline-flex h-10 items-center gap-2 rounded-full bg-raised px-4 text-sm hover:bg-line">
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
