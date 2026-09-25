# dgdev-portfolio

My portfolio and CV as one page: who I am, what I build, and where I've worked.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion. Commissioner for text and
JetBrains Mono for labels and dates, both with Greek coverage.

## How it works

- **All content lives in `src/lib/content.ts`.** Profile, skills, projects and the timeline are
  plain data; the components only lay it out. Updating the CV means editing one file.
- **Project cards read GitHub at build time.** `src/lib/github.ts` fetches each featured repo's
  last push, stars and language split from the public API, and the page revalidates once an
  hour. That's one list call plus one per repo, well inside the 60 requests an hour GitHub allows
  without a token. If GitHub is down or rate-limits the build, the cards render without the live
  stats instead of failing.
- **Dark first, light on request.** The theme is a `data-theme` attribute set by a small inline
  script before the first paint, so a saved light theme doesn't flash dark. The accent is darker
  in light mode so it still passes WCAG AA on white.
- **Motion respects the reader.** Every animation goes through `MotionConfig reducedMotion="user"`,
  and the CSS animations (the caret, the background drift) switch off under
  `prefers-reduced-motion`.

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
| `src/app/` | Layout, page, global styles and theme tokens |
| `src/components/` | Header, Hero, Sections (about, skills, contact), Projects, Timeline |
| `src/lib/` | Content and the GitHub loader |
