"use client";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function AnimatedSection({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      className={cn("page relative py-24 sm:py-32", className)}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
