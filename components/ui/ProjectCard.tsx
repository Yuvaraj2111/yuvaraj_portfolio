"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/types";
import { ProjectMockup } from "./ProjectMockup";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index, large, onOpen }: { project: Project; index: number; large?: boolean; onOpen: () => void }) {
  return (
    <motion.article
      className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface/60", large && "lg:flex-row")}
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br from-raised/80 to-bg", large && "lg:aspect-auto lg:w-[58%] lg:border-b-0 lg:border-r")}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          {project.image ? (
            <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
          ) : (
            <ProjectMockup kind={project.mockup} />
          )}
        </div>
        <span className="absolute left-4 top-4 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-8", large && "lg:justify-center")}>
        <p className="font-mono text-xs text-cyan">{project.tagline}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => <li key={t} className="tag">{t}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
          <button type="button" onClick={onOpen} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-cyan hover:text-cyan">
            <Plus size={15} className="transition-transform group-hover:rotate-90" /> View details
          </button>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">Code <ArrowUpRight size={14} /></a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">Live demo <ArrowUpRight size={14} /></a>}
        </div>
      </div>
    </motion.article>
  );
}
