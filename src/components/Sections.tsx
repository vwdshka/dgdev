import { profile, type UI } from "@/lib/content";
import { Reveal } from "./motion";

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

export function About({ title, lede, paragraphs }: { title: string; lede: string; paragraphs: string[] }) {
  return (
    <section aria-labelledby="about" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Heading id="about" title={title} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="text-xl font-medium leading-snug sm:text-2xl">{lede}</p>
        </Reveal>
        <Reveal delay={0.08} className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Contact({ t }: { t: UI }) {
  const links: [string, string, string][] = [
    ["Email", profile.email, `mailto:${profile.email}`],
    ["LinkedIn", profile.linkedinHandle, profile.linkedin],
    ["GitHub", profile.githubUser, profile.github],
  ];

  return (
    <footer aria-labelledby="contact" className="border-t border-line bg-raised">
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-24 sm:px-6">
        <Heading id="contact" title={t.headings.contact} />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">{t.contact.blurb}</p>
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
              {links.map(([label, value, href]) => (
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
                <span className="uppercase tracking-wide text-muted">{t.contact.location}</span>
                <span aria-hidden="true" className="leader" />
                <span>{t.contact.place}</span>
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="mt-24 flex flex-col gap-2 border-t border-dashed border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 {profile.name}</span>
          <span>Next.js · Tailwind CSS · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
