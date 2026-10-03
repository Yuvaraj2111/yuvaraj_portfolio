export type Social = { label: string; href: string };

export type Role = {
  title: string;
  start: string; // e.g. "Aug 2023"
  end: string; // e.g. "Present"
  summary?: string;
  highlights?: string[];
};

export type ExperienceItem = {
  company: string;
  type: string; // Full-time, Internship, Part-time
  location: string;
  roles: Role[];
  tags?: string[];
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  icon: "layout" | "server" | "database" | "workflow" | "wrench";
  blurb: string;
  // `level` is optional and only rendered when you set it yourself.
  skills: { name: string; level?: "Working" | "Proficient" | "Expert" }[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  context?: string;
  github?: string; // leave undefined for private / internal work
  demo?: string;
  image?: string; // /images/projects/xyz.png — falls back to a drawn mockup
  mockup: "inventory" | "dashboard" | "pipeline" | "anatomy" | "mobile";
};

export type Achievement = {
  title: string;
  detail: string;
  metric?: { value: number; suffix?: string; label: string };
};

export type Interest = { title: string; note: string; image?: string; icon: string };
