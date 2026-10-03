import type { Project } from "@/types";

/** Add, remove or reorder projects here. Leave github/demo undefined for private work. */
export const projects: Project[] = [
  {
    slug: "inventora",
    title: "Inventora",
    tagline: "Inventory Management System",
    description:
      "An internal inventory management platform designed to streamline hardware tracking, transactions, team-level access, and reporting.",
    tech: ["React", "FastAPI", "MongoDB", "JWT", "PrimeReact"],
    features: [
      "Role-based access control",
      "Manager and admin dashboards",
      "Inventory tracking for infusers, accessories, and servers",
      "Transaction history",
      "Notifications and approval workflows",
      "Advanced filtering and consolidated reporting",
    ],
    context: "Internal tool built at ICU Medical.",
    mockup: "inventory",
  },
  {
    slug: "testrail-analysis",
    title: "TestRail Failure Analysis Dashboard",
    tagline: "Test execution analysis",
    description:
      "A web application designed to simplify test execution analysis, failure categorization, and assignment workflows.",
    tech: ["React", "FastAPI", "Python", "TestRail API"],
    features: [
      "Test run ID-based analysis",
      "Failure categorization",
      "Interactive test case tables",
      "Inline editing",
      "Assignment management",
      "Execution status dashboards",
    ],
    mockup: "dashboard",
  },
  {
    slug: "ci-automation",
    title: "CI Automation and Test Framework Engineering",
    tagline: "Execution infrastructure",
    description:
      "An engineering initiative focused on reliable automated execution and CI infrastructure for medical infusion pump software.",
    tech: ["Python", "Ruby", "Jenkins", "HDF5", "TestRail", "NeuronFramework"],
    features: [
      "Automated execution workflows",
      "CI environment setup",
      "Test result analysis",
      "Failure investigation",
      "Test reporting integration",
      "Execution infrastructure maintenance",
    ],
    context: "PlumDuo and PlumSolo release programmes.",
    mockup: "pipeline",
  },
  {
    slug: "medical-visualization",
    title: "Medical Visualization Prototype",
    tagline: "Interactive anatomy",
    description:
      "A medical visualization prototype focused on creating an engaging landing page and integrating interactive anatomical visualization capabilities.",
    tech: ["Next.js", "React", "Zygote Body"],
    features: [
      "Interactive medical visualization",
      "Modern landing page",
      "Integration with anatomical 3D content",
      "Responsive interface",
    ],
    context: "Managerial ownership of the prototype.",
    mockup: "anatomy",
  },
  {
    slug: "purplebooks",
    title: "PurpleBooks",
    tagline: "E-commerce app",
    description:
      "A full-stack marketplace for buying and selling books, live on Google Play and the web. I built front-end features and ran deployment operations.",
    tech: ["React Native", "Operations"],
    features: [
      "Book listings for buyers and sellers",
      "Android app published on Google Play",
      "Companion website",
      "Deployment and release operations",
    ],
    demo: "https://purplebooks.in",
    mockup: "mobile",
  },
];
