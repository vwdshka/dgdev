import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/Projects";
import { About, Heading } from "@/components/Sections";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { about, facts, profile, projects, skills, timeline, ui, works } from "@/lib/content";
import { getRepoStats } from "@/lib/github";
import { isLocale, localize } from "@/lib/i18n";

// Repo stats come from the GitHub API; rebuild the page with fresh ones at most once an hour.
export const revalidate = 3600;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const t = localize(ui, locale);
  const stats = await getRepoStats(projects.flatMap((p) => (p.repo ? [p.repo] : [])));

  return (
    <>
      <Hero t={t.hero} facts={localize(facts, locale)} />
      <About title={t.headings.about} {...localize(about, locale)} />
      <section aria-labelledby="skills" className="border-y border-line bg-raised">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <Heading
            id="skills"
            title={t.headings.skills}
            note={
              <span className="flex items-center gap-1.5">
                <span className="size-2 bg-accent" /> {t.skills.core}
              </span>
            }
          />
          <Skills groups={localize(skills, locale)} works={works} locale={locale} t={t.skills} />
        </div>
      </section>
      <section aria-labelledby="projects" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <Heading
          id="projects"
          title={t.headings.projects}
          note={
            <a href={profile.github} className="hover:text-accent">
              {t.projects.all}
            </a>
          }
        />
        <ProjectGrid projects={localize(projects, locale)} stats={stats} locale={locale} t={t.projects} />
      </section>
      <section aria-labelledby="experience" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <Heading id="experience" title={t.headings.experience} />
          <Timeline entries={localize(timeline, locale)} kinds={t.kinds} />
        </div>
      </section>
    </>
  );
}
