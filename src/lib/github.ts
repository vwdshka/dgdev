import { profile } from "./content";

export type RepoStats = {
  url: string;
  stars: number;
  pushedAt: string;
  // [language, share of bytes in %], largest first
  languages: [string, number][];
};

type ApiRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
  languages_url: string;
};

// Unauthenticated GitHub allows 60 requests an hour; with hourly revalidation this page makes
// one list call plus one per featured repo. If GitHub is down or rate-limits us, the cards
// just render without the live stats.
const cache = { next: { revalidate: 3600 } };

export async function getRepoStats(names: string[]): Promise<Record<string, RepoStats>> {
  try {
    const res = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100`, cache);
    if (!res.ok) return {};
    const repos = ((await res.json()) as ApiRepo[]).filter((r) => names.includes(r.name));

    const entries = await Promise.all(
      repos.map(async (r) => {
        const langs: Record<string, number> = await fetch(r.languages_url, cache)
          .then((l) => (l.ok ? l.json() : {}))
          .catch(() => ({}));
        const total = Object.values(langs).reduce((a, b) => a + b, 0);
        const languages = Object.entries(langs)
          .map(([name, bytes]): [string, number] => [name, (bytes / total) * 100])
          .sort((a, b) => b[1] - a[1]);
        const stats: RepoStats = {
          url: r.html_url,
          stars: r.stargazers_count,
          pushedAt: r.pushed_at,
          languages,
        };
        return [r.name, stats] as const;
      }),
    );
    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}
