import { profile, skills } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Heading({ id, title, note }: { id: string; title: string; note?: React.ReactNode }) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-3">
      <h2 id={id} className="text-2xl font-bold tracking-[-0.015em] sm:text-3xl">
        {title}
      </h2>
      {note && <div className="font-mono text-xs text-muted">{note}</div>}
    </Reveal>
  );
}

export function About() {
  return (
    <section aria-labelledby="about" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Heading id="about" title="About" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="text-xl font-medium leading-snug sm:text-2xl">
            Software engineering graduate from Athens who learned to work fast and carefully on
            the floor of a busy restaurant first.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed">
          <p>
            I graduated in August 2026 with a BSc in Software Engineering from the University of
            Bolton. I studied remotely, which meant the degree fitted around full summer seasons at
            resorts: White Olive in Lindos, Grecotel LuxMe Oasis in the
            Peloponnese and Aristi Mountain Resort in Zagori, where I worked as Σερβίτορος Α&apos;.
          </p>
          <p>
            Service taught me things that carry straight over to code. A full terrace doesn&apos;t
            wait, so you plan the next ten minutes before you move. You check the order before it
            leaves the pass, not after the guest sends it back. And you train the person next to
            you, because the shift only goes as well as its weakest station.
          </p>
          <p>
            Most of what I build starts with a problem I had myself: 60 open tabs, tax XML that
            gets rejected by the server, public spending data nobody can search. I measure the
            data before I model it, write the tests that catch the bug before release, and say
            plainly in the README what the code doesn&apos;t do yet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section aria-labelledby="skills" className="border-y border-line bg-raised">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <Heading
          id="skills"
          title="Skills"
          note={
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="size-2 bg-accent" /> core stack
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 border border-muted" /> used in projects
              </span>
            </span>
          }
        />
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ group, items }, g) => (
            <Reveal key={group} delay={g * 0.07} className="bg-raised p-5">
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wide text-muted">{group}</h3>
              <ul className="space-y-0.5">
                {items.map((s) => (
                  <li
                    key={s.name}
                    className="-mx-2 flex items-center gap-2.5 rounded-sm px-2 py-1.5 transition-colors duration-150 hover:bg-ink hover:text-bg"
                  >
                    <span className={`size-2 shrink-0 ${s.core ? "bg-accent" : "border border-muted"}`} aria-hidden="true" />
                    <span className={s.core ? "font-semibold" : undefined}>{s.name}</span>
                    {s.core && <span className="sr-only">(core)</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const contacts: [string, string, string][] = [
  ["Email", profile.email, `mailto:${profile.email}`],
  ["LinkedIn", profile.linkedinHandle, profile.linkedin],
  ["GitHub", profile.githubUser, profile.github],
];

export function Contact() {
  return (
    <footer aria-labelledby="contact" className="border-t border-line bg-raised">
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-24 sm:px-6">
        <Heading id="contact" title="Contact" />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Open to junior backend and data roles, in Athens or remote in the EU. Email is the
              quickest way to reach me.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-block break-all font-mono text-[clamp(1.2rem,4vw,2.25rem)] font-bold tracking-tight no-underline"
            >
              {profile.email}
              <span className="block h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="font-mono text-sm">
              {contacts.map(([label, value, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-baseline gap-2 py-2 no-underline"
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="uppercase tracking-wide text-muted">{label}</span>
                    <span aria-hidden="true" className="leader" />
                    <span className="group-hover:text-accent group-hover:underline">{value}</span>
                    <span aria-hidden="true" className="text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-baseline gap-2 py-2">
                <span className="uppercase tracking-wide text-muted">Location</span>
                <span aria-hidden="true" className="leader" />
                <span>Kifissia, Athens</span>
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="mt-24 flex flex-col gap-2 border-t border-dashed border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 {profile.nameEn} · {profile.nameEl}</span>
          <span>Next.js · Tailwind CSS · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
