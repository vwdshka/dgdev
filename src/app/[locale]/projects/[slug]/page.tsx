import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagram } from "@/components/Diagram";
import { formatDate, Languages } from "@/components/Languages";
import { Morph, PageSlide, Reveal } from "@/components/Reveal";
import { cases } from "@/lib/cases";
import { preview, profile, projects, ui } from "@/lib/content";
import { getRepoStats } from "@/lib/github";
import { isLocale, localize, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

function load(locale: string, slug: string) {
  const c = cases.find((x) => x.slug === slug);
  const p = projects.find((x) => x.slug === slug);
  if (!isLocale(locale) || !c || !p) notFound();
  return { locale: locale as Locale, c: localize(c, locale), p: localize(p, locale), index: cases.indexOf(c) };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const { c, p } = load(locale, slug);
  const title = `${p.name} · ${profile.name}`;
  const images = preview(`/${locale}/projects/${slug}/og.png`);
  return {
    title,
    description: c.tagline,
    openGraph: { type: "article", siteName: "dg.dev", title, description: c.tagline, images },
    twitter: { card: "summary_large_image", images },
  };
}

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Reveal>
        <h2 className="mb-6 border-b border-line pb-3 text-xl font-bold tracking-[-0.01em] sm:text-2xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: l, slug } = await params;
  const { locale, c, p, index } = load(l, slug);
  const t = localize(ui, locale);
  const stats = p.repo ? (await getRepoStats([p.repo]))[p.repo] : undefined;
  const repoUrl = stats?.url ?? (p.repo && `${profile.github}/${p.repo}`);
  const nextCase = cases[(index + 1) % cases.length];
  const next = localize(projects.find((x) => x.slug === nextCase.slug)!, locale);

  return (
    <PageSlide>
      <article className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <Link
          href={`/${locale}/#projects`}
          transitionTypes={["nav-back"]}
          className="font-mono text-sm text-muted no-underline hover:text-accent"
        >
          {t.case.back}
        </Link>

        {/* No fade-in here: the name and numbers arrive by morphing out of the project's card. */}
        <header className="mt-8 border-b-2 border-ink pb-10">
          <p className="font-mono text-xs text-muted">
            {p.year}
            {stats && ` · ${t.projects.updated} ${formatDate(stats.pushedAt, locale)}`}
          </p>
          <h1 className="mt-3 font-mono text-[clamp(2rem,6vw,3.5rem)] font-bold leading-none tracking-tight">
            <Morph name={`title-${slug}`}>
              <span className="inline-block">{p.name}</span>
            </Morph>
          </h1>
          <Reveal>
            <p className="mt-5 max-w-2xl text-xl leading-snug sm:text-2xl">{c.tagline}</p>
          </Reveal>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_17rem]">
          <aside className="space-y-8 lg:sticky lg:top-20 lg:order-last lg:self-start">
            <div>
              <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-wide text-muted">{t.case.numbers}</h2>
              <Morph name={`numbers-${slug}`}>
                <dl className="font-mono text-[13px]">
                  {p.numbers.map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-2 py-1">
                      <dt className="text-muted">{k}</dt>
                      <span aria-hidden="true" className="leader" />
                      <dd className="text-right font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Morph>
            </div>
            <Reveal delay={0.05}>
              <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-wide text-muted">{t.case.stack}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <li key={tag} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs">
                    {tag}
                  </li>
                ))}
              </ul>
              {stats && (
                <div className="mt-5">
                  <Languages languages={stats.languages} />
                </div>
              )}
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-2 font-mono text-sm">
              {repoUrl && (
                <a href={repoUrl} target="_blank" rel="noreferrer" className="rounded-sm bg-accent px-4 py-2 font-semibold text-accent-ink no-underline hover:brightness-110">
                  repo ↗
                </a>
              )}
              {p.site && (
                <a
                  href={p.site}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm border border-line px-4 py-2 no-underline transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg"
                >
                  {t.projects.live} ↗
                </a>
              )}
            </Reveal>
          </aside>

          <div className="min-w-0 space-y-16">
            <Part title={t.case.problem}>
              <Reveal className="max-w-[68ch] space-y-4 text-[17px] leading-relaxed">
                {c.problem.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </Reveal>
            </Part>

            <Part title={t.case.how}>
              <Diagram rows={c.diagram} />
              <Reveal>
                <p className="mt-6 max-w-[68ch] text-[17px] leading-relaxed">{c.diagramNote}</p>
              </Reveal>
            </Part>

            <Part title={t.case.hard}>
              <ol className="divide-y divide-dashed divide-line border-y border-dashed border-line">
                {c.hard.map((h, i) => (
                  <li key={h.title}>
                    <Reveal className="grid gap-2 py-6 sm:grid-cols-[2.5rem_1fr]">
                      <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-lg font-bold leading-snug">{h.title}</h3>
                        <p className="mt-2 max-w-[68ch] leading-relaxed">{h.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </Part>

            <Part title={t.case.decisions}>
              <div className="grid gap-4 sm:grid-cols-2">
                {c.decisions.map((d, i) => (
                  <Reveal key={d.title} delay={(i % 2) * 0.06} className="rounded-sm border border-line bg-raised p-5">
                    <h3 className="font-bold leading-snug">{d.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed">{d.body}</p>
                  </Reveal>
                ))}
              </div>
            </Part>

            <Part title={t.case.notYet}>
              <Reveal>
                <ul className="max-w-[68ch] space-y-2 leading-relaxed">
                  {c.notYet.map((n) => (
                    <li key={n} className="relative pl-5 before:absolute before:left-0 before:text-accent before:content-['–']">
                      {n}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </Part>
          </div>
        </div>

        <Reveal className="mt-24">
          <Link
            href={`/${locale}/projects/${next.slug}/`}
            transitionTypes={["nav-forward"]}
            className="group block rounded-sm border border-line p-6 no-underline transition-colors duration-200 hover:border-accent sm:p-8"
          >
            <span className="font-mono text-xs uppercase tracking-wide text-muted">{t.case.next}</span>
            <span className="mt-2 flex items-center justify-between gap-4">
              <span className="font-mono text-2xl font-bold tracking-tight group-hover:text-accent">{next.name}</span>
              <span aria-hidden="true" className="text-2xl text-accent transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </Reveal>
      </article>
    </PageSlide>
  );
}
