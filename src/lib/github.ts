import { profile } from "./content";

export type RepoStats = {
  name: string;
  url: string;
  description: string | null;
  stars: number;
  createdAt: string;
  pushedAt: string;
  // [language, % of bytes], biggest first
  languages: [string, number][];
};

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  created_at: string;
  pushed_at: string;
  languages_url: string;
};

// build time only (static export), the daily workflow run keeps it fresh. 1 call for the list
// + 1 per repo. the pages workflow passes GITHUB_TOKEN so the shared runner ips don't hit the
// 60/hour anonymous limit. if github fails, the cards skip the stats and the archive says so
const init: RequestInit = {
  cache: "force-cache",
  headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
};

async function withLanguages(r: ApiRepo): Promise<RepoStats> {
  const langs: Record<string, number> = await fetch(r.languages_url, init)
    .then((l) => (l.ok ? l.json() : {}))
    .catch(() => ({}));
  const total = Object.values(langs).reduce((a, b) => a + b, 0);
  return {
    name: r.name,
    url: r.html_url,
    description: r.description,
    stars: r.stargazers_count,
    createdAt: r.created_at,
    pushedAt: r.pushed_at,
    languages: Object.entries(langs)
      .map(([name, bytes]): [string, number] => [name, (bytes / total) * 100])
      .sort((a, b) => b[1] - a[1]),
  };
}

/** Own (non-fork) public repos, newest first; null if GitHub couldn't be reached. */
export async function getRepos(only?: string[]): Promise<RepoStats[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100`, init);
    if (!res.ok) return null;
    const repos = ((await res.json()) as ApiRepo[])
      .filter((r) => !r.fork && (!only || only.includes(r.name)))
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
    return await Promise.all(repos.map(withLanguages));
  } catch {
    return null;
  }
}

export async function getRepoStats(names: string[]): Promise<Record<string, RepoStats>> {
  const repos = await getRepos(names);
  return Object.fromEntries((repos ?? []).map((r) => [r.name, r]));
}
