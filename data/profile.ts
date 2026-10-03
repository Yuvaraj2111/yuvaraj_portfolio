import type { Social } from "@/types";

/**
 * ✏️  Edit this file to change your name, links and contact details.
 * Anything marked TODO still needs your real information.
 */
export const profile = {
  name: "Yuvaraj T",
  firstName: "Yuvaraj",
  monogram: "YU.",
  role: "Software Engineer",
  location: "Chennai, Tamil Nadu, India",
  headline: "Engineering Ideas Into Intelligent Digital Experiences.",
  titles: ["Software Engineer", "Automation Enthusiast", "Full-Stack Developer"],
  intro:
    "Building reliable software, intelligent automation systems, and modern web experiences with a focus on quality, performance, and innovation.",
  email: "uv.yuvaraj21@gmail.com",
  phone: "+91 95511 38588",
  github: "https://github.com/Yuvaraj2111",
  linkedin: "https://www.linkedin.com/in/yuvaraj-t-ba4785201/",
  resume: "/resume/Yuvaraj-T-Resume.pdf", // regenerate from the resume doc when it changes
  photo: "/images/profile.jpg" as string | undefined,
  available: true, // shows the "Open to senior SWE roles" dot in the navbar
  availabilityText: "Open to senior SWE roles",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuvaraj.vercel.app",
};

export const socials: Social[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export const about = {
  paragraphs: [
    "I'm a software engineer passionate about building reliable applications, improving engineering workflows, and solving complex technical challenges.",
    "My experience spans software development, CI automation, test framework engineering, and medical software systems. I enjoy combining engineering precision with creative problem-solving to deliver meaningful solutions.",
  ],
  // From LinkedIn "About"
  quote: "The software I write runs inside hospital rooms. That keeps me honest.",
  highlights: [
    { title: "Software Engineering", text: "Healthcare software for Plum infusion pumps and LifeShield, plus internal full-stack tools." },
    { title: "Test Automation", text: "Frameworks and tooling that catch regressions before verification does." },
    { title: "CI/CD Engineering", text: "Jenkins environments and execution runs across multiple product releases." },
    { title: "Technical Leadership", text: "Managerial ownership of a medical visualization prototype." },
  ],
  // Compact journey (from the resume)
  journey: [
    { year: "2019", text: "Started MCA at CEG, Anna University" },
    { year: "2021", text: "Front-End Developer intern at Encomece" },
    { year: "2022", text: "SRE intern at NortonLifeLock; MCA completed with 84%" },
    { year: "2022", text: "Joined ICU Medical as Software Engineer" },
    { year: "Now", text: "Owning CI execution for Plum Duo and Plum Solo releases" },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
