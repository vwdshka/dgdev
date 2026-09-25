"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/content";
import { profile } from "@/lib/content";
import type { RepoStats } from "@/lib/github";
import { EASE } from "./Reveal";

const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

const LANG_COLOURS = ["var(--accent)", "var(--ochre)", "var(--olive)", "var(--rust)"];

// Language share as one bar, top three named underneath: the same read as GitHub's own sidebar.
function Languages({ languages }: { languages: [string, number][] }) {
  if (!languages.length) return null;
  const top = languages.slice(0, 3);
  return (
    <div>
      <div className="flex h-1.5 gap-px overflow-hidden rounded-[1px]" aria-hidden="true">
        {languages.map(([name, pct], i) => (
          <span
            key={name}
            style={{ width: `${pct}%`, background: LANG_COLOURS[i] ?? "var(--muted)" }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-xs text-muted">
        {top.map(([name, pct]) => `${name} ${pct.toFixed(0)}%`).join(" · ")}
      </p>
    </div>
  );
}

function Card({ p, stats, i, wide }: { p: Project; stats?: RepoStats; i: number; wide: boolean }) {
  const url = stats?.url ?? (p.repo && `${profile.github}/${p.repo}`);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.56, ease: EASE, delay: (i % 2) * 0.07 }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col rounded-sm border border-line bg-raised p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-[0_12px_32px_-16px_var(--glow),0_2px_0_0_var(--accent)] sm:p-7 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
        <span>{p.year}</span>
        {stats ? (
          <span>updated {date.format(new Date(stats.pushedAt))}{stats.stars > 0 && ` · ★ ${stats.stars}`}</span>
        ) : (
          !p.repo && <span>no public repo yet</span>
        )}
      </div>

      <h3 className="mt-3 font-mono text-xl font-bold tracking-tight sm:text-2xl">{p.name}</h3>

      <div className={wide ? "mt-4 grid gap-x-10 gap-y-6 md:grid-cols-[1.4fr_1fr]" : "mt-4 flex flex-1 flex-col gap-6"}>
        <p className="max-w-[68ch] leading-relaxed">{p.summary}</p>
        <dl className="self-start font-mono text-[13px] md:w-full">
          {p.numbers.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2 py-1">
              <dt className="text-muted">{k}</dt>
              <span aria-hidden="true" className="leader" />
              <dd className="text-right font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
        {p.tags.map((t) => (
          <li key={t} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-line pt-5 [margin-top:max(1.5rem,auto)]">
        <div className="min-w-0 flex-1 basis-40">{stats && <Languages languages={stats.languages} />}</div>
        <div className="flex gap-2 font-mono text-sm">
          {p.site && (
            <a href={p.site} target="_blank" rel="noreferrer" className="rounded-sm border border-line px-3 py-1.5 no-underline transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg">
              live ↗
            </a>
          )}
          {url && (
            <a href={url} target="_blank" rel="noreferrer" className="rounded-sm border border-line px-3 py-1.5 no-underline transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg">
              repo ↗<span className="sr-only"> {p.name} on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectGrid({ projects, stats }: { projects: Project[]; stats: Record<string, RepoStats> }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <Card key={p.name} p={p} i={i} wide={i === 0} stats={p.repo ? stats[p.repo] : undefined} />
      ))}
    </div>
  );
}
