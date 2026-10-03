"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Lock, X } from "lucide-react";
import { projects } from "@/data/projects";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectMockup } from "@/components/ui/ProjectMockup";
import { cn } from "@/lib/utils";

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <AnimatedSection id="projects">
      <SectionHeading kicker="Projects" title="Selected Projects">
        Tools built for engineering and verification teams, plus a step into interactive medical visualization.
      </SectionHeading>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => {
          // first card is wide; a leftover last card also goes wide so the grid never has a hole
          const wide = i === 0 || (i === projects.length - 1 && (projects.length - 1) % 2 === 1);
          return (
          <Reveal key={p.slug} className={cn(wide && "lg:col-span-2")}>
            <ProjectCard project={p} index={i} large={wide} onOpen={() => setOpenSlug(p.slug)} />
          </Reveal>
          );
        })}
      </div>

      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close details" className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={() => setOpenSlug(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-line bg-surface sm:rounded-[1.75rem]"
            >
              <div className="aspect-[16/8] border-b border-line bg-gradient-to-br from-raised to-bg"><ProjectMockup kind={open.mockup} /></div>
              <button ref={closeRef} type="button" onClick={() => setOpenSlug(null)} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass">
                <X size={18} />
              </button>
              <div className="p-6 sm:p-10">
                <p className="font-mono text-xs text-cyan">{open.tagline}</p>
                <h3 id="project-title" className="mt-2 text-3xl font-semibold tracking-tight">{open.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{open.description}</p>
                {open.context && <p className="mt-2 text-sm text-muted">{open.context}</p>}

                <h4 className="mt-8 font-medium">Key features</h4>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {open.features.map((f) => (
                    <li key={f} className="flex gap-3 text-muted"><Check size={18} className="mt-0.5 shrink-0 text-pulse" />{f}</li>
                  ))}
                </ul>

                <ul className="mt-8 flex flex-wrap gap-2">{open.tech.map((t) => <li key={t} className="tag">{t}</li>)}</ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  {open.github ? (
                    <a href={open.github} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg">View code <ArrowUpRight size={15} /></a>
                  ) : (
                    <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-muted"><Lock size={14} /> Internal project, code not public</span>
                  )}
                  {open.demo && <a href={open.demo} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm">Live demo <ArrowUpRight size={15} /></a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body)}
    </AnimatedSection>
  );
}
