import Image from "next/image";
import { CircleDot, Cpu, Dumbbell, Music, Plane, Trophy, Zap, type LucideIcon } from "lucide-react";
import { interests } from "@/data/achievements";
import { AnimatedSection, Reveal } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { plane: Plane, dumbbell: Dumbbell, trophy: Trophy, zap: Zap, "circle-dot": CircleDot, music: Music, cpu: Cpu };
const tints = ["from-cyan/25", "from-violet/25", "from-pulse/20", "from-cyan/15", "from-violet/15", "from-pulse/15", "from-cyan/20"];
// travel tile is large; the rest form a masonry-like grid
const spans = ["sm:col-span-2 sm:row-span-2", "", "", "", "", "sm:col-span-2", "col-span-2"];

export function BeyondCode() {
  return (
    <div className="relative border-y border-line bg-surface/30">
      <AnimatedSection id="beyond">
        <SectionHeading kicker="Beyond the code" title="Life Beyond Development">
          What fills the hours away from the terminal.
        </SectionHeading>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
          {interests.map((it, i) => {
            const Icon = icons[it.icon] ?? Cpu;
            return (
              <Reveal key={it.title} className={cn("group relative overflow-hidden rounded-3xl border border-line", spans[i])}>
                {it.image ? (
                  <Image src={it.image} alt={it.title} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent", tints[i])}>
                    <Icon aria-hidden strokeWidth={1} className="absolute -bottom-6 -right-6 h-40 w-40 text-ink/10 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Icon size={18} className="mb-2 text-cyan" />
                  <h3 className={cn("font-semibold", i === 0 ? "text-2xl" : "text-lg")}>{it.title}</h3>
                  <p className="text-sm text-muted">{it.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  );
}
