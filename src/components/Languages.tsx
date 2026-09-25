const COLOURS = ["var(--accent)", "var(--ochre)", "var(--olive)", "var(--brick)"];

// Language share as one bar, top three named underneath: the same read as GitHub's own sidebar.
export function Languages({ languages }: { languages: [string, number][] }) {
  if (!languages.length) return null;
  return (
    <div>
      <div className="flex h-1.5 gap-px overflow-hidden rounded-[1px]" aria-hidden="true">
        {languages.map(([name, pct], i) => (
          <span key={name} style={{ width: `${pct}%`, background: COLOURS[i] ?? "var(--muted)" }} />
        ))}
      </div>
      <p className="mt-2 font-mono text-xs text-muted">
        {languages
          .slice(0, 3)
          .map(([name, pct]) => `${name} ${pct.toFixed(0)}%`)
          .join(" · ")}
      </p>
    </div>
  );
}

export const formatDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(iso),
  );
