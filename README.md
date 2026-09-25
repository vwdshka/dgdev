# dgdev-portfolio

My portfolio and CV: who I am, what I build, and where I've worked, in English and Greek.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion. Commissioner for text and
JetBrains Mono for labels and dates, both with Greek coverage. Technology logos come from
simple-icons.

## How it works

- **All content is data.** `src/lib/content.ts` holds the profile, skills, projects and timeline;
  `src/lib/cases.ts` holds one case study per featured project. Components only lay it out, so
  updating the CV means editing those two files.
- **Two languages, one file.** Every translatable string is written inline as `{ en, el }`, next
  to the data it belongs to. `localize()` in `src/lib/i18n.ts` collapses the whole tree to one
  language before rendering, so components never see the pairs. Routes live under
  `/[locale]`; `/` is a tiny static page that sends Greek browsers to `/el/` and everyone else
  to `/en/` (GitHub Pages can't redirect by header).
- **Skills carry their evidence.** Each skill has the year I first used it, a line on what I did
  with it, and the projects that use it; a project with a case study links straight to it.
- **Project cards read GitHub at build time.** `src/lib/github.ts` fetches each repo's last
  push, stars and language split from the public API: one list call plus one per repo, well
  inside the 60 requests an hour GitHub allows without a token. A daily scheduled build keeps
  them fresh. If GitHub is down or rate-limits the build, the cards render without the stats
  instead of failing. The `/archive` page lists every public repo the same way, with a one-line
  note from `repoNotes` in `content.ts`. The workflow passes `GITHUB_TOKEN`, so builds on shared
  runners don't run into the anonymous rate limit.
- **Cards turn into case studies.** React's `<ViewTransition>` morphs a project's name and
  numbers from its card into the case study header, and pages slide in the direction you're
  going. Browsers without the View Transitions API just switch pages.
- **Link previews are drawn at build time.** `src/lib/og.tsx` renders a 1200×630 PNG per page
  and language (Greek included) with `next/og`, served from `og.png` routes so the files keep a
  `.png` extension on GitHub Pages.
- **Dark first, light on request.** Two autumn palettes, both passing WCAG AA. The theme is a
  `data-theme` attribute set by an inline script before the first paint, so a saved light theme
  doesn't flash dark.
- **Motion respects the reader.** Animations go through `MotionConfig reducedMotion="user"`,
  and the CSS ones (the caret, the background drift) switch off under `prefers-reduced-motion`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

## Deploying

The site is a static export hosted on GitHub Pages. Once, in the repository: **Settings → Pages →
Source: GitHub Actions**. After that, every push to `main` runs `.github/workflows/pages.yml`,
which builds with the right base path (`/dgdev-portfolio` for a project site, none for a user
site or custom domain) and deploys `out/`. It also rebuilds daily at 05:17 UTC.

## Layout

| Path | What lives there |
| --- | --- |
| `src/app/[locale]/` | Root layout, home page, `projects/[slug]` case studies, `archive`, `og.png` previews |
| `src/app/(root)/` | The language picker at `/` |
| `src/components/` | Header, Hero, Sections, Skills, Projects, Timeline, Diagram |
| `src/lib/` | Content, case studies, i18n helpers, GitHub loader, preview image renderer |
