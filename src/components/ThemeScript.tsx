"use client";

// Runs while the HTML parses, before the first paint, so a saved light theme doesn't flash dark.
// On the client the type flips to text/plain: React won't execute it there anyway, and this keeps
// it from warning about that (the pattern from Next's "preventing flash" guide).
const THEME_INIT = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_INIT }}
    />
  );
}
