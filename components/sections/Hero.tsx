"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;
const words = profile.headline.split(" ");

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
      {/* background grid + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--line)/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.35)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] animate-drift rounded-full bg-violet/10 blur-[120px]" />

      <div className="page relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-6 font-mono text-xs tracking-[0.2em] text-cyan">
            HELLO, I&apos;M {profile.name.toUpperCase()}
          </motion.p>

          <h1 className="text-balance text-[clamp(2.5rem,5.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease }}>
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.8 }}>
            <p className="mt-8 font-medium text-ink/90">{profile.titles.join("  |  ")}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#projects">Explore My Work</Button>
              <Button href={profile.resume} download variant="ghost">
                <Download size={15} /> Download Resume
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-5 text-sm text-muted">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink"><GithubIcon size={16} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink"><LinkedinIcon size={16} /> LinkedIn</a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-ink"><Mail size={16} /> Email</a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease }}>
          <HeroVisual />
        </motion.div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted hover:text-ink" aria-label="Scroll to About">
        <span className="relative h-9 w-5 rounded-full border border-line">
          <motion.span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-cyan" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </span>
        <ArrowDown size={12} className="sr-only" />
      </a>
    </section>
  );
}
