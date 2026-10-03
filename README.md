# Yuvaraj — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide · Geist.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at vercel.com/new (framework is detected automatically).
3. Add environment variables in Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` — your final URL (used by metadata, sitemap, Open Graph).
   - `NEXT_PUBLIC_FORMSPREE_ID` — form ID from formspree.io. Without it, the contact form opens the visitor's email app instead.

## Where to edit content

| What | File |
|---|---|
| Name, email, links, resume path, photo, availability | `data/profile.ts` |
| About text, highlight cards, journey timeline | `data/profile.ts` (`about`) |
| Jobs and roles | `data/experience.ts` |
| Skill groups | `data/skills.ts` |
| Projects (add / remove / reorder) | `data/projects.ts` |
| Achievements, stats, interests | `data/achievements.ts` |
| Colours (dark + light) | `app/globals.css` (`:root` and `.dark`) |

## Resume

`public/resume/Yuvaraj-T-Resume.pdf` is generated from the resume doc and matches the site's content (`data/`).
When the resume changes, update both so the site and the PDF stay in sync.

## Optional extras

- **Project links** — add `github` URLs in `data/projects.ts` for any public repos.
- **Project screenshots** — set `image` on a project to replace the drawn mockup.
- **Interest photos** — drop into `public/images/life/` and set `image` in `data/achievements.ts`.
- **Award year** for the ICU Achiever Award.

## Structure

```
app/            layout, page, globals.css, sitemap, robots, OG image, icon
components/
  layout/       Navbar, Footer, ThemeToggle, ThemeProvider
  sections/     Hero, About, Experience, Skills, Projects, Achievements, BeyondCode, Contact
  ui/           Button, SectionHeading, AnimatedSection, ProjectCard, ProjectMockup, BrandIcons
  visuals/      HeroVisual (orbital system), CustomCursor
data/           all editable content
hooks/          useActiveSection
types/          shared types
```

## Notes

- The hero visual is SVG + DOM, not WebGL — keeps mobile fast. Mouse-tilt on desktop only.
- Every animation respects `prefers-reduced-motion`. The custom cursor only appears on mouse devices.
- Dark is default; the toggle persists the choice.
