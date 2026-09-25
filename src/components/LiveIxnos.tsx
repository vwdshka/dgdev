"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { UI } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { IXNOS_META, type IxnosMeta } from "@/lib/ixnos";

function ago(iso: string, locale: Locale) {
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (minutes < 48 * 60) return rtf.format(-Math.round(minutes / 60), "hour");
  return rtf.format(-Math.round(minutes / 1440), "day");
}

// ixnos-data's static edition publishes meta.json (1 KB) and allows any origin, so the hero can
// show the real record count. The build bakes in a value; the browser refreshes it on load.
export function LiveIxnos({ initial, locale, t }: { initial: IxnosMeta | null; locale: Locale; t: UI["live"] }) {
  const [meta, setMeta] = useState(initial);
  // False on the server and during hydration, true after: relative time is only shown in the
  // browser, since the server's "now" would never match the reader's.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    let alive = true;
    fetch(IXNOS_META, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((m: IxnosMeta | null) => alive && m && setMeta(m))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!meta) return null;
  const when = mounted && ago(meta.generatedAt, locale);
  return (
    <Link
      href={`/${locale}/projects/ixnos-data/`}
      transitionTypes={["nav-forward"]}
      className="group mt-6 block rounded-sm border border-line bg-bg/60 px-3.5 py-3 font-mono text-xs no-underline backdrop-blur-sm transition-colors duration-150 hover:border-accent"
    >
      <span className="flex items-center gap-2 uppercase tracking-wide text-muted">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-olive opacity-70 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-olive" />
        </span>
        {t.label} · ixnos-data
        <span aria-hidden="true" className="ml-auto text-accent transition-transform duration-150 group-hover:translate-x-0.5">
          →
        </span>
      </span>
      <span className="mt-2 block text-ink">
        <span className="text-base font-bold">{meta.count.toLocaleString(locale === "el" ? "el-GR" : "en-GB")}</span> {t.records}
      </span>
      <span className="mt-0.5 block min-h-[1.25em] text-muted">{when && `${t.refreshed} ${when}`}</span>
    </Link>
  );
}
