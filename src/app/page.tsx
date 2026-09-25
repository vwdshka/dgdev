import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/Projects";
import { About, Contact, Heading, Skills } from "@/components/Sections";
import { Timeline } from "@/components/Timeline";
import { profile, projects, timeline } from "@/lib/content";
import { getRepoStats } from "@/lib/github";

// Repo stats come from the GitHub API; rebuild the page with fresh ones at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const stats = await getRepoStats(projects.flatMap((p) => (p.repo ? [p.repo] : [])));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <section aria-labelledby="projects" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
          <Heading
            id="projects"
            title="Projects"
            note={
              <a href={profile.github} className="hover:text-accent">
                all repositories ↗
              </a>
            }
          />
          <ProjectGrid projects={projects} stats={stats} />
        </section>
        <section aria-labelledby="experience" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
            <Heading id="experience" title="Experience & education" />
            <Timeline entries={timeline} />
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
