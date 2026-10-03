"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Award, GitMerge, Puzzle, Compass } from "lucide-react";
import { achievements, stats } from "@/data/achievements";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Award, GitMerge, Puzzle, Compass];

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Achievements() {
  return (
    <AnimatedSection id="achievements">
      <SectionHeading kicker="Achievements" title="Milestones That Matter" />

      <Reveal className="mb-6 grid divide-y divide-line rounded-3xl border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="p-7">
            <p className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"><Count to={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={a.title} className={i === 0 ? "relative overflow-hidden rounded-3xl border border-cyan/40 bg-gradient-to-br from-cyan/10 via-surface/60 to-violet/10 p-7" : "rounded-3xl border border-line bg-surface/50 p-7"}>
              <div className="flex items-start justify-between gap-4">
                <Icon size={22} className={i === 0 ? "text-cyan" : "text-muted"} />
                {a.metric && (
                  <p className="text-right">
                    <span className="block text-3xl font-semibold"><Count to={a.metric.value} suffix={a.metric.suffix} /></span>
                    <span className="text-xs text-muted">{a.metric.label}</span>
                  </p>
                )}
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{a.detail}</p>
            </Reveal>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
