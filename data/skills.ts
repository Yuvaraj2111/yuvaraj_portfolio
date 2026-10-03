import type { SkillGroup } from "@/types";

const s = (...names: string[]) => names.map((name) => ({ name }));

export const skills: SkillGroup[] = [
  {
    title: "Frontend Development",
    icon: "layout",
    blurb: "Interfaces for dashboards, internal tools and product sites.",
    skills: s("React", "React Native", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "PrimeReact"),
  },
  {
    title: "Backend Development",
    icon: "server",
    blurb: "APIs and services behind the tools.",
    skills: s("Python", "FastAPI", "Django REST Framework", "REST APIs", "Node.js fundamentals"),
  },
  {
    title: "Database",
    icon: "database",
    blurb: "Document and relational storage.",
    skills: s("MongoDB", "SQLite", "SQL"),
  },
  {
    title: "Automation and CI/CD",
    icon: "workflow",
    blurb: "Execution pipelines for regulated medical software.",
    // TODO: add Selenium or other frameworks only if you've used them
    skills: s("Jenkins", "Python Automation", "Ruby", "Test automation frameworks", "TestRail", "Git", "CI/CD workflows"),
  },
  {
    title: "Tools and Engineering",
    icon: "wrench",
    blurb: "Day-to-day engineering kit.",
    skills: s("GitHub", "JIRA", "P4V", "Docker", "VS Code", "MongoDB Compass", "Agile"),
  },
];
