import Image from "next/image";
import { Code2, FlaskConical, GitBranch, Users } from "lucide-react";
import { about, profile } from "@/data/profile";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Code2, FlaskConical, GitBranch, Users];

export function About() {
  return (
    <AnimatedSection id="about">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="order-2 lg:order-1">
          {/* Photo frame — set profile.photo to replace the placeholder */}
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] border border-dashed border-line" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-line bg-gradient-to-br from-raised via-surface to-bg">
              {profile.photo ? (
                <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill sizes="(min-width:1024px) 380px, 90vw" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted">
                  <span className="text-7xl font-semibold tracking-tighter text-ink/80">{profile.monogram}</span>
                  <span className="font-mono text-xs">Add photo → /public/images/profile.jpg</span>
                </div>
              )}
              <div className="absolute inset-x-4 bottom-4 glass rounded-xl px-4 py-3 text-sm">
                <p className="font-medium">{profile.role}</p>
                <p className="text-muted">{profile.location}</p>
              </div>
            </div>
          </div>

          <ol className="mx-auto mt-14 max-w-sm space-y-4 border-l border-line pl-6">
            {about.journey.map((j, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-cyan" aria-hidden />
                <span className="font-mono text-xs text-cyan">{j.year}</span>
                <p className="text-sm text-muted">{j.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading kicker="About" title="A Little About Me" />
          <Reveal>
            <blockquote className="mb-8 border-l-2 border-pulse pl-5 text-2xl font-medium leading-snug tracking-tight">
              &ldquo;{about.quote}&rdquo;
            </blockquote>
            {about.paragraphs.map((p) => (
              <p key={p} className="mb-5 max-w-[62ch] text-lg leading-relaxed text-muted">{p}</p>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.highlights.map((h, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={h.title} className="group rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-cyan/50">
                  <Icon size={20} className="mb-4 text-cyan" />
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
