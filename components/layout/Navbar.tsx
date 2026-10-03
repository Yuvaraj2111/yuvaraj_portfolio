"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const ids = navLinks.map((l) => l.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300", scrolled ? "pt-2" : "pt-4")}>
      <nav
        aria-label="Primary"
        className={cn(
          "page flex h-14 items-center justify-between rounded-full border border-transparent transition-all duration-300",
          scrolled && "glass shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)]"
        )}
      >
        <a href="#home" className="flex items-center gap-3 text-lg font-bold tracking-tight" aria-label={`${profile.name}, back to top`}>
          {profile.monogram}
          {profile.available && (
            <span className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[11px] font-normal text-muted md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse" />
              </span>
              {profile.availabilityText}
            </span>
          )}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn("relative z-0 rounded-full px-3 py-1.5 text-sm transition-colors", active === l.id ? "text-ink" : "text-muted hover:text-ink")}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-raised" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={profile.resume} download className="hidden h-9 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg transition hover:bg-cyan hover:text-[#04121a] sm:inline-flex">
            <Download size={14} /> Resume
          </a>
          <button type="button" onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-full border border-line lg:hidden" aria-label="Open menu" aria-expanded={open}>
            <Menu size={16} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 pb-10 pt-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{profile.monogram}</span>
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-line" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className={cn("block py-2 text-4xl font-semibold tracking-tight", active === l.id ? "text-ink" : "text-muted")}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={profile.resume} download className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-medium text-bg">
              <Download size={16} /> Download resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
