"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { SkillGroup, UI, works as allWorks } from "@/lib/content";
import type { Locale, Localized } from "@/lib/i18n";
import { pickSkill } from "@/lib/picked-skill";
import { EASE, Reveal } from "./motion";

type Group = Localized<SkillGroup>;
type Skill = Group["items"][number];
type Works = typeof allWorks;

const tone: Record<SkillGroup["tone"], string> = {
  accent: "var(--accent)",
  ochre: "var(--ochre)",
  olive: "var(--olive)",
  brick: "var(--brick)",
};

const file = (name: string) =>
  `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}.md`;

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} />
    </svg>
  );
}

function UsedIn({
  skill,
  works,
  featured,
  locale,
  t,
}: {
  skill: Skill;
  works: Works;
  featured: string[];
  locale: Locale;
  t: UI["skills"];
}) {
  const shown = !skill.used.length || skill.used.some((k) => featured.includes(k));
  const jump = shown && (
    <a href="#projects" className="mt-3 inline-block text-accent no-underline hover:underline">
      {t.jump}
    </a>
  );
  if (!skill.used.length)
    return (
      <>
        <p className="text-muted">{t.everywhere}</p>
        {jump}
      </>
    );
  return (
    <>
      <ul className="space-y-1">
        {skill.used.map((key) => {
          const w = works[key];
          const link = "underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent";
          return (
            <li key={key} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              {w.slug ? (
                <Link href={`/${locale}/projects/${w.slug}/`} transitionTypes={["nav-forward"]} className={link}>
                  {w.name}
                </Link>
              ) : w.href ? (
                <a href={w.href} className={link}>
                  {w.name}
                </a>
              ) : (
                <span>{w.name}</span>
              )}
            </li>
          );
        })}
      </ul>
      {jump}
    </>
  );
}

function Terminal({
  group,
  skill,
  works,
  featured,
  locale,
  t,
}: {
  group: Group;
  skill: Skill;
  works: Works;
  featured: string[];
  locale: Locale;
  t: UI["skills"];
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-bg shadow-[0_24px_48px_-32px_var(--glow)]">
      <div className="relative flex h-9 items-center gap-1.5 border-b border-line px-3">
        <span className="size-2.5 rounded-full bg-brick/70" />
        <span className="size-2.5 rounded-full bg-ochre/70" />
        <span className="size-2.5 rounded-full bg-olive/70" />
        <span className="absolute inset-x-0 text-center font-mono text-[11px] text-muted">~/stack — zsh</span>
      </div>
      <div className="p-5 font-mono text-[13px]" aria-live="polite">
        <p className="truncate">
          <span className="text-accent">~/stack</span> <span aria-hidden="true">$</span> cat {group.group}/{file(skill.name)}
        </p>
        {/* keyed so it remounts and fades in on every pick */}
        <motion.div
          key={skill.name}
          initial={{ opacity: 0.2, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <div className="mt-5 flex items-center gap-3">
            <span
              className="grid size-11 shrink-0 place-items-center rounded-sm border border-line"
              style={{ color: tone[group.tone] }}
            >
              <Icon path={skill.icon} className="size-6" />
            </span>
            <div>
              <h3 className="font-sans text-xl font-bold leading-tight">{skill.name}</h3>
              {skill.core && <p className="text-[11px] uppercase tracking-wide text-accent">{t.core}</p>}
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="uppercase tracking-wide text-muted">{t.since}</span>
            <span aria-hidden="true" className="leader" />
            <span className="font-bold">{skill.since}</span>
          </div>
          <p className="mt-4 font-sans text-[15px] leading-relaxed">{skill.note}</p>
          <p className="mt-5 text-[11px] uppercase tracking-wide text-muted">{t.usedIn}</p>
          <div className="mt-2">
            <UsedIn skill={skill} works={works} featured={featured} locale={locale} t={t} />
          </div>
        </motion.div>
        <p className="mt-5">
          <span className="text-accent">~/stack</span> <span aria-hidden="true">$</span>{" "}
          <span className="caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
        </p>
      </div>
    </div>
  );
}

export function Skills({
  groups,
  works,
  featured,
  locale,
  t,
}: {
  groups: Group[];
  works: Works;
  // work keys of the projects on this page
  featured: string[];
  locale: Locale;
  t: UI["skills"];
}) {
  const [selected, setSelected] = useState(groups[0].items[0].name);
  const group = groups.find((g) => g.items.some((s) => s.name === selected))!;
  const skill = group.items.find((s) => s.name === selected)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_21rem] lg:items-start">
      <div>
        <p className="mb-4 font-mono text-sm text-muted">
          <span className="text-accent">~/stack</span> <span aria-hidden="true">$</span>{" "}
          <span className="text-ink">tree -L 2</span>
          <span className="hidden sm:inline">{`  # ${t.hint}`}</span>
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06} className="overflow-hidden rounded-sm border border-line bg-bg">
              <div
                className="flex items-baseline justify-between border-b border-line px-4 py-3 font-mono text-sm"
                style={{ boxShadow: `inset 0 2px 0 ${tone[g.tone]}` }}
              >
                <span className="font-bold" style={{ color: tone[g.tone] }}>
                  {g.group}/
                </span>
                <span className="text-xs text-muted">
                  {g.items.length} {t.files}
                </span>
              </div>
              <ul className="p-2 font-mono text-[13px]">
                {g.items.map((s, i) => {
                  const on = s.name === selected;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(s.name);
                          pickSkill({ name: s.name, used: s.used });
                        }}
                        aria-pressed={on}
                        className={`group flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left transition-colors duration-150 ${
                          on ? "bg-ink text-bg" : "hover:bg-line/60"
                        }`}
                      >
                        <span aria-hidden="true" className={on ? "opacity-60" : "text-muted"}>
                          {i === g.items.length - 1 ? "└──" : "├──"}
                        </span>
                        <Icon path={s.icon} className="size-4 shrink-0" />
                        <span className={`min-w-0 flex-1 truncate font-sans text-[15px] ${s.core ? "font-semibold" : ""}`}>
                          {s.name}
                        </span>
                        {s.core && (
                          <span className="size-2 shrink-0 bg-accent" title={t.core}>
                            <span className="sr-only">{t.core}</span>
                          </span>
                        )}
                        <span className={`w-9 shrink-0 text-right text-xs ${on ? "opacity-70" : "text-muted"}`}>{s.since}</span>
                      </button>
                      {/* on phones the details open under the row instead of the side panel */}
                      {on && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="ml-4 border-l border-dashed border-line py-3 pl-4 pr-2">
                            <p className="font-sans text-[15px] leading-relaxed">{s.note}</p>
                            <p className="mt-3 text-[11px] uppercase tracking-wide text-muted">{t.usedIn}</p>
                            <div className="mt-1.5">
                              <UsedIn skill={s} works={works} featured={featured} locale={locale} t={t} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="sticky top-20 hidden lg:block">
        <Terminal group={group} skill={skill} works={works} featured={featured} locale={locale} t={t} />
      </div>
    </div>
  );
}
