import { Reveal } from "./AnimatedSection";

export function SectionHeading({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs text-cyan">
        <span className="h-px w-8 bg-cyan/60" aria-hidden />
        {kicker}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div>}
    </Reveal>
  );
}
