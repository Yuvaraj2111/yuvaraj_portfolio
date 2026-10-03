"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * An orbital system around a wireframe core with a live "monitor" trace —
 * a nod to software that runs inside hospital rooms.
 * Pure SVG + DOM; no WebGL, so it stays light on mobile.
 */

const TILT = 0.34; // vertical squash of each orbit → reads as 3D
const C = 300; // centre of the 600×600 viewBox

const orbits = [
  { r: 180, speed: 0.16, labels: ["Python", "Jenkins", "Ruby"] },
  { r: 230, speed: -0.11, labels: ["React", "FastAPI", "MongoDB", "TestRail"] },
  { r: 285, speed: 0.07, labels: ["Next.js", "HDF5", "TypeScript"] },
];

const rand = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};
const particles = Array.from({ length: 34 }, (_, i) => ({
  x: 40 + rand(i) * 520,
  y: 40 + rand(i + 99) * 520,
  r: 0.6 + rand(i + 7) * 1.4,
  d: 2 + rand(i + 3) * 4,
}));

// ECG-like trace across the core
const trace =
  "M 150 300 L 225 300 L 240 300 L 252 282 L 262 300 L 275 300 L 284 238 L 296 348 L 306 300 L 322 300 L 336 286 L 352 300 L 450 300";

export function HeroVisual() {
  const reduce = useReducedMotion();
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const meridianRefs = useRef<(SVGEllipseElement | null)[]>([]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });
  const rotX = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const all = orbits.flatMap((o, oi) => o.labels.map((_, li) => ({ o, oi, phase: (li / o.labels.length) * Math.PI * 2 + oi })));

    const frame = (now: number) => {
      const t = reduce ? 1.2 : (now - start) / 1000;
      all.forEach(({ o, phase }, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const a = phase + t * o.speed;
        const x = C + o.r * Math.cos(a);
        const y = C + o.r * TILT * Math.sin(a);
        const depth = (Math.sin(a) + 1) / 2; // 0 back → 1 front
        el.style.left = `${(x / 600) * 100}%`;
        el.style.top = `${(y / 600) * 100}%`;
        el.style.opacity = String(0.35 + depth * 0.65);
        el.style.transform = `translate(-50%, -50%) scale(${0.78 + depth * 0.3})`;
        el.style.zIndex = depth > 0.5 ? "3" : "1";
      });
      meridianRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = t * 0.35 + (i / meridianRefs.current.length) * Math.PI;
        el.setAttribute("rx", String(Math.abs(Math.cos(a)) * 118));
      });
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - b.left) / b.width) * 2 - 1);
    my.set(((e.clientY - b.top) / b.height) * 2 - 1);
  };

  let li = 0;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }} aria-hidden>
      {/* ambient glow */}
      <div className="absolute inset-[18%] rounded-full bg-cyan/20 blur-[90px]" />
      <div className="absolute inset-[30%] translate-x-[18%] rounded-full bg-violet/25 blur-[80px]" />

      <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative h-full w-full [transform-style:preserve-3d]">
        <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <radialGradient id="core" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="rgb(var(--cyan))" stopOpacity="0.28" />
              <stop offset="70%" stopColor="rgb(var(--violet))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgb(var(--violet))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="traceGrad" x1="150" x2="450" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgb(var(--pulse))" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(var(--pulse))" />
              <stop offset="100%" stopColor="rgb(var(--pulse))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {particles.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="rgb(var(--ink))" opacity={0.25}>
              {!reduce && <animate attributeName="opacity" values="0.05;0.45;0.05" dur={`${p.d}s`} repeatCount="indefinite" />}
            </circle>
          ))}

          {orbits.map((o) => (
            <ellipse key={o.r} cx={C} cy={C} rx={o.r} ry={o.r * TILT} stroke="rgb(var(--cyan))" strokeOpacity="0.22" strokeWidth="1" strokeDasharray={o.r === 230 ? "2 6" : undefined} />
          ))}

          {/* wireframe core */}
          <circle cx={C} cy={C} r={118} fill="url(#core)" stroke="rgb(var(--cyan))" strokeOpacity="0.5" />
          {[-60, -30, 0, 30, 60].map((lat) => {
            const k = Math.cos((lat * Math.PI) / 180);
            return <ellipse key={lat} cx={C} cy={C + 118 * Math.sin((lat * Math.PI) / 180)} rx={118 * k} ry={118 * k * 0.22} stroke="rgb(var(--cyan))" strokeOpacity="0.22" />;
          })}
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} ref={(el) => { meridianRefs.current[i] = el; }} cx={C} cy={C} rx={118} ry={118} stroke="rgb(var(--violet))" strokeOpacity="0.35" />
          ))}

          {/* monitor trace */}
          <path d={trace} stroke="rgb(var(--pulse))" strokeOpacity="0.12" strokeWidth="2" />
          <motion.path
            d={trace}
            stroke="url(#traceGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={reduce ? { pathLength: 1 } : { pathLength: [0, 0.45, 0], pathOffset: [0, 0.3, 1] }}
            transition={{ duration: 2.4, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
          />
        </svg>

        {orbits.map((o) =>
          o.labels.map((label) => {
            const idx = li++;
            return (
              <span
                key={label}
                ref={(el) => { labelRefs.current[idx] = el; }}
                className="glass absolute whitespace-nowrap rounded-full px-3 py-1 font-mono text-[11px] text-ink shadow-[0_8px_30px_-12px_rgb(var(--cyan)/0.5)] sm:text-xs"
                style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              >
                {label}
              </span>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
