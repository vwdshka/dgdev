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
  `/[locale]`; `src/proxy.ts` sends `/` to `/el` for Greek browsers and `/en` for everyone else.
- **Skills carry their evidence.** Each skill has the year I first used it, a line on what I did
  with it, and the projects that use it; a project with a case study links straight to it.
- **Project cards read GitHub.** `src/lib/github.ts` fetches each repo's last push, stars and
  language split from the public API, and pages revalidate once an hour: one list call plus one
  per repo, well inside the 60 requests an hour GitHub allows without a token. If GitHub is down
  or rate-limits the build, the cards render without the live stats instead of failing.
- **Dark first, light on request.** Two autumn palettes, both passing WCAG AA. The theme is a
  `data-theme` attribute set by an inline script before the first paint, so a saved light theme
  doesn't flash dark.
- **Motion respects the reader.** Animations go through `MotionConfig reducedMotion="user"`,
  and the CSS ones (the caret, the background drift) switch off under `prefers-reduced-motion`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/app/[locale]/` | Root layout, home page, and `projects/[slug]` case studies |
| `src/components/` | Header, Hero, Sections, Skills, Projects, Timeline, Diagram |
| `src/lib/` | Content, case studies, i18n helpers, GitHub loader |
| `src/proxy.ts` | Language redirect for `/` |
