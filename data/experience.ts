import type { ExperienceItem } from "@/types";

/** Kept in sync with the resume (public/resume/Yuvaraj-T-Resume.pdf). */
export const experience: ExperienceItem[] = [
  {
    company: "ICU Medical LLP",
    type: "Full-time · Hybrid",
    location: "Chennai, India",
    featured: true,
    tags: ["Jenkins", "Python", "Ruby", "TestRail", "HDF5", "React", "FastAPI", "MongoDB"],
    roles: [
      {
        title: "Software Engineer",
        start: "Aug 2022",
        end: "Present",
        summary: "CI, test automation and tooling for Plum Duo and Plum Solo infusion pumps and LifeShield Infusion Safety Software.",
        highlights: [
          "Built and maintain Jenkins CI environments for medical infusion pump software, improving build speed and execution reliability.",
          "Took ownership of CI execution activities across multiple PlumDuo and PlumSolo software releases.",
          "Built and enhanced automated testing frameworks and engineering tools.",
          "Performed CI failure analysis and supported formal, regression, patch, and dry-run execution activities.",
          "Contributed to LifeShield Infusion Safety Software, developing validation tools and automation.",
          "Built Inventora, a full-stack inventory system (React, FastAPI, MongoDB) for tracking medical devices, which improved operational efficiency.",
          "Took managerial responsibilities for a medical visualization prototype integrating Zygote Body.",
          "Collaborated with engineering and verification teams to improve execution reliability and workflow efficiency.",
        ],
      },
    ],
  },
  {
    company: "NortonLifeLock",
    type: "Internship",
    location: "Chennai, India",
    tags: ["Monitoring automation", "Incident response"],
    roles: [
      {
        title: "Site Reliability Engineer (Intern)",
        start: "Jan 2022",
        end: "Jun 2022",
        highlights: [
          "Automated system monitoring for the Consumer Tech Ops team, improving operational processes and service reliability.",
          "Supported performance optimization tasks and incident response.",
        ],
      },
    ],
  },
  {
    company: "Encomece",
    type: "Internship",
    location: "India",
    tags: ["React.js"],
    roles: [
      {
        title: "Front-End Developer (Intern)",
        start: "Jul 2021",
        end: "Aug 2021",
        highlights: [
          "Developed and optimized React.js components, improving UI responsiveness and user experience.",
          "Implemented new features and streamlined front-end workflows with the development team.",
        ],
      },
    ],
  },
];
