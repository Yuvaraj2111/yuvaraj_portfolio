"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Database, LayoutTemplate, Server, Workflow, Wrench } from "lucide-react";
import { skills } from "@/data/skills";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const icons = { layout: LayoutTemplate, server: Server, database: Database, workflow: Workflow, wrench: Wrench };

export function Skills() {
  const [focus, setFocus] = useState<number | null>(null);
  return (
    <AnimatedSection id="skills">
      <SectionHeading kicker="Skills" title="My Technical Arsenal" />

      <div className="grid gap-4 md:grid-cols-6">
        {skills.map((g, i) => {
          const Icon = icons[g.icon];
          // first two cards wide, last three narrow → asymmetric grid
          const span = i < 2 ? "md:col-span-3" : "md:col-span-2";
          return (
            <Reveal key={g.title} className={span}>
              <div
                onMouseEnter={() => setFocus(i)}
                onMouseLeave={() => setFocus(null)}
                className={cn(
                  "relative h-full overflow-hidden rounded-3xl border border-line bg-surface/50 p-6 transition-opacity duration-300 sm:p-7",
                  focus !== null && focus !== i && "md:opacity-50"
                )}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl"
                  animate={{ opacity: focus === i ? 1 : 0 }}
                />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-raised/70 text-cyan"><Icon size={18} /></span>
                  <div>
                    <h3 className="font-semibold">{g.title}</h3>
                    <p className="text-sm text-muted">{g.blurb}</p>
                  </div>
                </div>
                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s.name} className="rounded-lg border border-line bg-bg/40 px-3 py-1.5 text-sm transition-colors hover:border-cyan/60 hover:text-cyan">
                      {s.name}
                      {s.level && <span className="ml-2 font-mono text-[10px] text-muted">{s.level}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
