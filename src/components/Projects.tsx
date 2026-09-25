"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { profile, type Project, type UI } from "@/lib/content";
import type { RepoStats } from "@/lib/github";
import type { Locale, Localized } from "@/lib/i18n";
import { pickSkill, usePickedSkill } from "@/lib/picked-skill";
import { formatDate, Languages } from "./Languages";
import { EASE, Morph } from "./motion";

// don't replay the fade when coming back from a case study, the morph needs something visible
// to land on
const seen = new Set<string>();

type P = Localized<Project>;

const outline =
  "rounded-sm border border-line px-3 py-1.5 no-underline transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg";

type Card = { p: P; stats?: RepoStats; i: number; wide: boolean; locale: Locale; t: UI["projects"]; lit?: string; dim: boolean };

// lit = the picked skill's name if this project uses it
function Card({ p, stats, i, wide, locale, t, lit, dim }: Card) {
  const url = stats?.url ?? (p.repo && `${profile.github}/${p.repo}`);
  const caseHref = p.slug && `/${locale}/projects/${p.slug}/`;
  const numbers = (
    <dl className="self-start font-mono text-[13px] md:w-full">
      {p.numbers.map(([k, v]) => (
        <div key={k} className="flex items-baseline gap-2 py-1">
          <dt className="text-muted">{k}</dt>
          <span aria-hidden="true" className="leader" />
          <dd className="text-right font-bold">{v}</dd>
        </div>
      ))}
    </dl>
  );
  return (
    <motion.article
      initial={seen.has(p.name) ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => seen.add(p.name)}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.56, ease: EASE, delay: (i % 2) * 0.07 }}
      whileHover={{ y: -4 }}
      // framer sets opacity inline, so dimming goes through filter
      className={`group flex flex-col rounded-sm border bg-raised p-5 transition-[border-color,box-shadow,filter] duration-300 hover:border-accent hover:shadow-[0_12px_32px_-16px_var(--glow),0_2px_0_0_var(--accent)] sm:p-7 ${wide ? "md:col-span-2" : ""} ${lit ? "border-accent shadow-[0_0_0_1px_var(--accent)]" : "border-line"} ${dim ? "[filter:opacity(0.4)_saturate(0.6)]" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
        <span className="flex items-baseline gap-3">
          {p.year}
          {lit && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-sm bg-accent px-1.5 py-px font-bold text-accent-ink"
            >
              {lit}
            </motion.span>
          )}
        </span>
        {stats ? (
          <span>
            {t.updated} {formatDate(stats.pushedAt, locale)}
            {stats.stars > 0 && ` · ★ ${stats.stars}`}
          </span>
        ) : (
          !p.repo && <span>{t.noRepo}</span>
        )}
      </div>

      <h3 className="mt-3 font-mono text-xl font-bold tracking-tight sm:text-2xl">
        {caseHref ? (
          <Link href={caseHref} transitionTypes={["nav-forward"]} className="no-underline hover:text-accent">
            <Morph name={`title-${p.slug}`}>
              <span className="inline-block">{p.name}</span>
            </Morph>
          </Link>
        ) : (
          p.name
        )}
      </h3>

      <div className={wide ? "mt-4 grid gap-x-10 gap-y-6 md:grid-cols-[1.4fr_1fr]" : "mt-4 flex flex-1 flex-col gap-6"}>
        <p className="max-w-[68ch] leading-relaxed">{p.summary}</p>
        {p.slug ? <Morph name={`numbers-${p.slug}`}>{numbers}</Morph> : numbers}
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
        {p.tags.map((tag) => (
          <li key={tag} className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-line pt-5 [margin-top:max(1.5rem,auto)]">
        <div className="min-w-0 flex-1 basis-40">{stats && <Languages languages={stats.languages} />}</div>
        <div className="flex flex-wrap gap-2 font-mono text-sm">
          {caseHref && (
            <Link
              href={caseHref}
              transitionTypes={["nav-forward"]}
              className="rounded-sm bg-accent px-3 py-1.5 font-semibold text-accent-ink no-underline transition duration-150 hover:brightness-110"
            >
              {t.caseStudy} →
            </Link>
          )}
          {p.site && (
            <a href={p.site} target="_blank" rel="noreferrer" className={outline}>
              {t.live} ↗
            </a>
          )}
          {url && (
            <a href={url} target="_blank" rel="noreferrer" className={outline}>
              repo ↗<span className="sr-only"> {p.name} {t.onGithub}</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const fill = (text: string, values: Record<string, string | number>) => text.replace(/\{(\w+)\}/g, (_, k) => String(values[k]));

export function ProjectGrid({ projects, stats, locale, t }: { projects: P[]; stats: Record<string, RepoStats>; locale: Locale; t: UI["projects"] }) {
  const picked = usePickedSkill();
  // empty used list = every project (git)
  const uses = (p: P) => !!picked && (!picked.used.length || picked.used.includes(p.work));
  const count = projects.filter(uses).length;

  return (
    <>
      <AnimatePresence initial={false}>
        {picked && (
          <motion.div
            key="picked"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-dashed border-line px-4 py-3 font-mono text-[13px]" aria-live="polite">
              <span>
                {count
                  ? fill(t.matching, { n: count, total: projects.length, skill: picked.name })
                  : fill(t.noMatch, { skill: picked.name })}
              </span>
              <button type="button" onClick={() => pickSkill(null)} className="rounded-sm border border-line px-2.5 py-1 hover:border-ink hover:bg-ink hover:text-bg">
                {t.showAll} ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Card
            key={p.name}
            p={p}
            i={i}
            wide={i === 0}
            stats={p.repo ? stats[p.repo] : undefined}
            locale={locale}
            t={t}
            lit={uses(p) ? picked!.name : undefined}
            dim={count > 0 && !uses(p)}
          />
        ))}
      </div>
    </>
  );
}
