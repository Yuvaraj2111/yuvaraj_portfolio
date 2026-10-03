"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <AnimatedSection id="experience">
      <SectionHeading kicker="Experience" title="Where I've Made an Impact">
        Most of my work happens where reliability is non-negotiable: CI and test infrastructure for clinical infusion systems.
      </SectionHeading>

      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[11px]" aria-hidden />
        <motion.div style={{ scaleY: progress }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-cyan via-violet to-pulse sm:left-[11px]" aria-hidden />

        <div className="space-y-10">
          {experience.map((item) => (
            <Reveal key={item.company + item.roles[0].title} className="relative">
              <span className={cn("absolute -left-8 top-2 grid h-4 w-4 place-items-center rounded-full border sm:-left-12 sm:h-6 sm:w-6", item.featured ? "border-cyan bg-bg" : "border-line bg-bg")} aria-hidden>
                <span className={cn("h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2", item.featured ? "bg-cyan" : "bg-muted")} />
              </span>

              <article className={cn("rounded-3xl border", item.featured ? "border-line bg-surface/60 p-6 sm:p-9" : "border-transparent px-1")}>
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className={cn("font-semibold tracking-tight", item.featured ? "text-2xl sm:text-3xl" : "text-xl")}>{item.company}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted"><MapPin size={13} /> {item.location} <span className="text-line">/</span> {item.type}</p>
                </header>

                <div className="mt-6 space-y-7">
                  {item.roles.map((r) => (
                    <div key={r.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-medium text-ink">{r.title}</h4>
                        <time className="font-mono text-xs text-cyan">{r.start} – {r.end}</time>
                      </div>
                      {r.summary && <p className="mt-1.5 text-muted">{r.summary}</p>}
                      {r.highlights && (
                        <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
                          {r.highlights.map((h) => (
                            <li key={h} className="relative pl-5 text-[15px] leading-relaxed text-muted">
                              <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-sm bg-pulse/80" aria-hidden />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {item.tags && (
                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                    {item.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
