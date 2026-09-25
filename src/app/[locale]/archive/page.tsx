import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSlide, Reveal } from "@/components/motion";
import { hiddenRepos, preview, profile, projects, repoNotes, ui } from "@/lib/content";
import { getRepos } from "@/lib/github";
import { isLocale, localize } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/archive">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = localize(ui, locale);
  const title = `${t.archive.title} · ${profile.name}`;
  return { title, description: t.archive.intro, openGraph: { title, description: t.archive.intro, images: preview(`/${locale}/og.png`) } };
}

export default async function Archive({ params }: PageProps<"/[locale]/archive">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = localize(ui, locale);
  const notes = localize(repoNotes, locale);
  const repos = (await getRepos())?.filter((r) => !hiddenRepos.includes(r.name));
  // repos with a case study link to it instead of straight to github
  const slugOf = Object.fromEntries(projects.flatMap((p) => (p.repo && p.slug ? [[p.repo, p.slug]] : [])));

  return (
    <PageSlide>
      <article className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <Link href={`/${locale}/#projects`} transitionTypes={["nav-back"]} className="font-mono text-sm text-muted no-underline hover:text-accent">
          {t.case.back}
        </Link>
        <header className="mt-8 border-b-2 border-ink pb-8">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-none tracking-[-0.03em]">{t.archive.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t.archive.intro}</p>
        </header>

        {repos ? (
          <Reveal>
            <table className="mt-6 w-full border-collapse text-left">
              <thead className="font-mono text-xs uppercase tracking-wide text-muted">
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 font-normal">{t.archive.year}</th>
                  <th className="py-3 pr-4 font-normal">{t.archive.project}</th>
                  <th className="hidden py-3 pr-4 font-normal md:table-cell">{t.archive.builtWith}</th>
                  <th className="hidden py-3 font-normal sm:table-cell">{t.archive.link}</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((r) => {
                  const slug = slugOf[r.name];
                  const note = notes[r.name] ?? r.description;
                  return (
                    <tr key={r.name} className="border-b border-line align-top transition-colors duration-150 hover:bg-raised">
                      <td className="py-4 pr-4 font-mono text-sm text-muted">{r.createdAt.slice(0, 4)}</td>
                      <td className="py-4 pr-4">
                        {slug ? (
                          <Link
                            href={`/${locale}/projects/${slug}/`}
                            transitionTypes={["nav-forward"]}
                            className="font-semibold no-underline hover:text-accent"
                          >
                            {r.name}
                            <span className="ml-2 font-mono text-xs font-normal text-accent">{t.projects.caseStudy} →</span>
                          </Link>
                        ) : (
                          <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold no-underline hover:text-accent">
                            {r.name}
                          </a>
                        )}
                        {note && <p className="mt-1 max-w-md text-sm leading-snug text-muted">{note}</p>}
                      </td>
                      <td className="hidden py-4 pr-4 md:table-cell">
                        <ul className="flex flex-wrap gap-1.5">
                          {r.languages.slice(0, 3).map(([lang]) => (
                            <li key={lang} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs">
                              {lang}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="hidden py-4 font-mono text-sm sm:table-cell">
                        <a href={r.url} target="_blank" rel="noreferrer" className="whitespace-nowrap text-muted no-underline hover:text-accent">
                          github ↗<span className="sr-only"> {r.name}</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
        ) : (
          <p className="mt-8 rounded-sm border border-dashed border-line p-5">
            {t.archive.unavailable}{" "}
            <a href={profile.github} className="text-accent">
              github.com/{profile.githubUser}
            </a>
          </p>
        )}
      </article>
    </PageSlide>
  );
}
