"use client";

import { useEffect, useState } from "react";

// for people without a mail app set up, where mailto: does nothing
export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 2000);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard
          .writeText(email)
          .then(() => setDone(true))
          .catch(() => {})
      }
      className={`inline-flex h-9 items-center gap-2 rounded-sm border px-3 font-mono text-sm transition-colors duration-150 ${
        done ? "border-olive text-olive" : "border-line text-muted hover:border-ink hover:bg-ink hover:text-bg"
      }`}
    >
      {done ? (
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
          <path d="M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1" />
        </svg>
      )}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
