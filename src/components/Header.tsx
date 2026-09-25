"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UI } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const sections = ["about", "skills", "projects", "experience", "contact"] as const;

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private windows may refuse storage; the switch still applies to this page.
  }
}

export function Header({ locale, t }: { locale: Locale; t: UI["nav"] }) {
  const other = locale === "en" ? "el" : "en";
  // Same page in the other language: only the first path segment changes.
  const switchHref = usePathname().replace(/^\/(en|el)/, `/${other}`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md" style={{ viewTransitionName: "site-header" }}>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${locale}/`} transitionTypes={["nav-back"]} className="font-mono text-sm font-bold tracking-tight no-underline">
          dg<span className="text-accent">.</span>dev
        </Link>
        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 font-mono text-[13px] md:flex">
            {sections.map((s) => (
              <li key={s}>
                <Link
                  href={`/${locale}/#${s}`}
                  transitionTypes={["nav-back"]}
                  className="rounded-sm px-2.5 py-1.5 text-muted no-underline transition-colors duration-150 hover:bg-ink hover:text-bg"
                >
                  {t[s]}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/#contact`}
            transitionTypes={["nav-back"]}
            className="rounded-sm px-2.5 py-1.5 font-mono text-[13px] text-muted no-underline hover:text-ink md:hidden"
          >
            {t.contact}
          </Link>
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={t.language}
            title={t.language}
            className="grid h-9 place-items-center rounded-sm border border-line px-2.5 font-mono text-xs font-bold uppercase no-underline transition duration-150 ease-out hover:border-ink hover:bg-ink hover:text-bg active:scale-[0.96]"
          >
            {other}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.theme}
            title={t.theme}
            className="grid size-9 place-items-center rounded-sm border border-line text-ink transition duration-150 ease-out hover:border-ink hover:bg-ink hover:text-bg active:scale-[0.96]"
          >
            <svg className="theme-icon-light size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" strokeLinecap="round" />
            </svg>
            <svg className="theme-icon-dark size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
